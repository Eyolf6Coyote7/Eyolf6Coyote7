import { useEffect, useRef, useState } from 'react';
import { Canvas, Rect, Circle, IText, Line, Path, type TPointerEventInfo } from 'fabric';

export type Tool = 'select' | 'rect' | 'circle' | 'line' | 'text' | 'sticky' | 'freehand';

interface Props {
  activeTool: Tool;
  width?: number;
  height?: number;
}

export function WhiteboardCanvas({ activeTool, width = 1200, height = 800 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const startPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#FAFAFA',
      selection: activeTool === 'select',
    });
    fabricRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, [width, height]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    canvas.selection = activeTool === 'select';
    canvas.isDrawingMode = activeTool === 'freehand';

    if (activeTool === 'freehand' && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = '#374151';
      canvas.freeDrawingBrush.width = 2;
    }

    canvas.off('mouse:down');
    canvas.off('mouse:up');

    if (['rect', 'circle', 'line', 'text', 'sticky'].includes(activeTool)) {
      canvas.on('mouse:down', (opt: TPointerEventInfo) => {
        if (opt.target) return;
        const pointer = canvas.getScenePoint(opt.e);
        startPoint.current = { x: pointer.x, y: pointer.y };
        setIsDrawing(true);
      });

      canvas.on('mouse:up', (opt: TPointerEventInfo) => {
        if (!startPoint.current || !isDrawing) return;
        const pointer = canvas.getScenePoint(opt.e);
        const { x, y } = startPoint.current;
        const w = Math.abs(pointer.x - x);
        const h = Math.abs(pointer.y - y);

        let obj;
        switch (activeTool) {
          case 'rect':
            obj = new Rect({
              left: Math.min(x, pointer.x),
              top: Math.min(y, pointer.y),
              width: Math.max(w, 40),
              height: Math.max(h, 40),
              fill: '#DBEAFE',
              stroke: '#2563EB',
              strokeWidth: 1,
              rx: 4,
              ry: 4,
            });
            break;
          case 'circle':
            obj = new Circle({
              left: Math.min(x, pointer.x),
              top: Math.min(y, pointer.y),
              radius: Math.max(w, h, 20) / 2,
              fill: '#FEE2E2',
              stroke: '#EF4444',
              strokeWidth: 1,
            });
            break;
          case 'line':
            obj = new Line([x, y, pointer.x, pointer.y], {
              stroke: '#374151',
              strokeWidth: 2,
            });
            break;
          case 'text':
            obj = new IText('Type here', {
              left: x,
              top: y,
              fontSize: 16,
              fontFamily: 'Inter, sans-serif',
              fill: '#191C1D',
            });
            break;
          case 'sticky':
            obj = new Rect({
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
            canvas.add(obj);
            const text = new IText('Note', {
              left: x + 12,
              top: y + 12,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              fill: '#92400E',
              width: 126,
            });
            canvas.add(text);
            canvas.renderAll();
            startPoint.current = null;
            setIsDrawing(false);
            return;
        }

        if (obj) {
          canvas.add(obj);
          canvas.renderAll();
        }

        startPoint.current = null;
        setIsDrawing(false);
      });
    }
  }, [activeTool, isDrawing]);

  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: 8, overflow: 'hidden' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
