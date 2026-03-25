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

export function WhiteboardCanvas({ activeTool, boardId, width = 1200, height = 800 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#FAFAFA',
    });
    fabricRef.current = canvas;

    // Load mock content on first render
    if (isMock && boardId && !initialized.current) {
      initialized.current = true;
      const elements = getMockContent(boardId);
      elements.forEach((el) => {
        if (el.type === 'sticky' || el.type === 'rect') {
          const rect = new Rect({
            left: el.left,
            top: el.top,
            width: el.width ?? 140,
            height: el.height ?? 100,
            fill: el.fill,
            stroke: el.stroke,
            strokeWidth: 1,
            rx: 4,
            ry: 4,
          });
          canvas.add(rect);
          if (el.text) {
            const text = new IText(el.text, {
              left: el.left + 10,
              top: el.top + 10,
              fontSize: el.fontSize ?? 13,
              fontFamily: 'Inter, sans-serif',
              fill: el.fontColor ?? '#374151',
              width: (el.width ?? 140) - 20,
            });
            canvas.add(text);
          }
        } else if (el.type === 'circle') {
          const circle = new Circle({
            left: el.left,
            top: el.top,
            radius: el.radius ?? 30,
            fill: el.fill,
            stroke: el.stroke,
            strokeWidth: 1,
          });
          canvas.add(circle);
          if (el.text) {
            const text = new IText(el.text, {
              left: el.left + (el.radius ?? 30) - 25,
              top: el.top + (el.radius ?? 30) - 8,
              fontSize: el.fontSize ?? 13,
              fontFamily: 'Inter, sans-serif',
              fill: el.fontColor ?? '#374151',
            });
            canvas.add(text);
          }
        } else if (el.type === 'text') {
          const text = new IText(el.text ?? '', {
            left: el.left,
            top: el.top,
            fontSize: el.fontSize ?? 16,
            fontFamily: 'Inter, sans-serif',
            fill: el.fontColor ?? '#374151',
          });
          canvas.add(text);
        }
      });
      canvas.renderAll();
    }

    return () => {
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
          const stickyRect = new Rect({
            left: x,
            top: y,
            width: 150,
            height: 150,
            fill: '#FEF3C7',
            stroke: '#F59E0B',
            strokeWidth: 1,
            rx: 4,
            ry: 4,
          });
          const stickyText = new IText('Note', {
            left: x + 12,
            top: y + 12,
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            fill: '#92400E',
          });
          canvas.add(stickyRect);
          canvas.add(stickyText);
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
      const pointer = canvas.getScenePoint(opt.e);
      startPoint.current = { x: pointer.x, y: pointer.y };
    };

    const onMouseUp = (opt: TPointerEventInfo) => {
      if (!startPoint.current) return;
      const pointer = canvas.getScenePoint(opt.e);
      addShape(startPoint.current.x, startPoint.current.y, pointer.x, pointer.y);
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
    <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
