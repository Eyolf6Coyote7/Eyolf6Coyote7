import { useEffect, useRef, useCallback } from 'react';
import { Canvas, Rect, Circle, IText, Line, type TPointerEventInfo } from 'fabric';

export type Tool = 'select' | 'rect' | 'circle' | 'line' | 'text' | 'sticky' | 'freehand';

interface Props {
  activeTool: Tool;
  width?: number;
  height?: number;
}

export function WhiteboardCanvas({ activeTool, width = 1200, height = 800 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const startPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#FAFAFA',
    });
    fabricRef.current = canvas;
    return () => {
      canvas.dispose();
    };
  }, [width, height]);

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
          canvas.add(
            new Line([x, y, endX, endY], {
              stroke: '#374151',
              strokeWidth: 2,
            }),
          );
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
