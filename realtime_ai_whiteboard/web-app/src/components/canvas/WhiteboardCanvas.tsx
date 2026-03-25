import { useEffect, useRef, useCallback } from 'react';
import { Canvas, Rect, Circle, IText, Line, type TPointerEventInfo } from 'fabric';
import { getMockContent } from '../../api/mock-board-content';

export type Tool = 'select' | 'rect' | 'circle' | 'line' | 'text' | 'sticky' | 'freehand';

const isMock = import.meta.env.VITE_MOCK === 'true';

interface Props {
  activeTool: Tool;
  boardId?: string;
  width?: number;
  height?: number;
}

function loadMockElements(canvas: Canvas, boardId: string) {
  const elements = getMockContent(boardId);
  elements.forEach((el) => {
    if (el.type === 'line' && el.x2 != null && el.y2 != null) {
      canvas.add(
        new Line([el.left, el.top, el.x2, el.y2], {
          stroke: el.stroke ?? '#9CA3AF',
          strokeWidth: 1.5,
          selectable: false,
        }),
      );
    } else if (el.type === 'sticky' || el.type === 'rect') {
      canvas.add(
        new Rect({
          left: el.left,
          top: el.top,
          width: el.width ?? 120,
          height: el.height ?? 60,
          fill: el.fill,
          stroke: el.stroke,
          strokeWidth: 1,
          rx: 4,
          ry: 4,
        }),
      );
      if (el.text) {
        canvas.add(
          new IText(el.text, {
            left: el.left + 10,
            top: el.top + 10,
            fontSize: el.fontSize ?? 12,
            fontFamily: 'Inter, sans-serif',
            fill: el.fontColor ?? '#374151',
          }),
        );
      }
    } else if (el.type === 'circle') {
      const r = el.radius ?? 20;
      canvas.add(
        new Circle({
          left: el.left,
          top: el.top,
          radius: r,
          fill: el.fill,
          stroke: el.stroke,
          strokeWidth: 1,
        }),
      );
      if (el.text) {
        canvas.add(
          new IText(el.text, {
            left: el.left + r - 15,
            top: el.top + r - 8,
            fontSize: el.fontSize ?? 12,
            fontFamily: 'Inter, sans-serif',
            fill: el.fontColor ?? '#374151',
          }),
        );
      }
    } else if (el.type === 'text') {
      canvas.add(
        new IText(el.text ?? '', {
          left: el.left,
          top: el.top,
          fontSize: el.fontSize ?? 14,
          fontFamily: 'Inter, sans-serif',
          fill: el.fontColor ?? '#374151',
        }),
      );
    }
  });
  canvas.renderAll();
}

export function WhiteboardCanvas({ activeTool, boardId, width = 900, height = 600 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const startPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, { width, height, backgroundColor: '#FAFAFA' });
    fabricRef.current = canvas;
    if (isMock && boardId) loadMockElements(canvas, boardId);
    return () => {
      fabricRef.current = null;
      canvas.dispose();
    };
  }, [width, height, boardId]);

  const addShape = useCallback(
    (x: number, y: number, endX: number, endY: number) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const w = Math.abs(endX - x);
      const h = Math.abs(endY - y);
      switch (activeTool) {
        case 'rect':
          canvas.add(
            new Rect({
              left: Math.min(x, endX),
              top: Math.min(y, endY),
              width: Math.max(w, 40),
              height: Math.max(h, 40),
              fill: '#DBEAFE',
              stroke: '#2563EB',
              strokeWidth: 1,
              rx: 4,
              ry: 4,
            }),
          );
          break;
        case 'circle':
          canvas.add(
            new Circle({
              left: Math.min(x, endX),
              top: Math.min(y, endY),
              radius: Math.max(w, h, 20) / 2,
              fill: '#FEE2E2',
              stroke: '#EF4444',
              strokeWidth: 1,
            }),
          );
          break;
        case 'line':
          canvas.add(new Line([x, y, endX, endY], { stroke: '#374151', strokeWidth: 2 }));
          break;
        case 'text':
          canvas.add(
            new IText('Type here', {
              left: x,
              top: y,
              fontSize: 16,
              fontFamily: 'Inter, sans-serif',
              fill: '#191C1D',
            }),
          );
          break;
        case 'sticky': {
          canvas.add(
            new Rect({
              left: x,
              top: y,
              width: 150,
              height: 100,
              fill: '#FEF3C7',
              stroke: '#F59E0B',
              strokeWidth: 1,
              rx: 4,
              ry: 4,
            }),
          );
          canvas.add(
            new IText('Note', {
              left: x + 12,
              top: y + 12,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              fill: '#92400E',
            }),
          );
          break;
        }
        default:
          break;
      }
      canvas.renderAll();
    },
    [activeTool],
  );

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.selection = activeTool === 'select';
    canvas.isDrawingMode = activeTool === 'freehand';
    if (activeTool === 'freehand' && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = '#374151';
      canvas.freeDrawingBrush.width = 2;
    }
    const onMouseDown = (opt: TPointerEventInfo) => {
      if (opt.target) return;
      startPoint.current = { x: canvas.getScenePoint(opt.e).x, y: canvas.getScenePoint(opt.e).y };
    };
    const onMouseUp = (opt: TPointerEventInfo) => {
      if (!startPoint.current) return;
      const p = canvas.getScenePoint(opt.e);
      addShape(startPoint.current.x, startPoint.current.y, p.x, p.y);
      startPoint.current = null;
    };
    canvas.off('mouse:down');
    canvas.off('mouse:up');
    if (['rect', 'circle', 'line', 'text', 'sticky'].includes(activeTool)) {
      canvas.on('mouse:down', onMouseDown);
      canvas.on('mouse:up', onMouseUp);
    }
    return () => {
      canvas.off('mouse:down');
      canvas.off('mouse:up');
    };
  }, [activeTool, addShape]);

  return (
    <div
      style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden', maxWidth: '100%' }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
