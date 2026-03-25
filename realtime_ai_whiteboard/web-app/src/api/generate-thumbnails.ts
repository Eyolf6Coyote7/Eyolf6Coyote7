import { Canvas, Rect, Circle, IText, Line } from 'fabric';
import { getMockContent, MOCK_BOARD_CONTENT } from './mock-board-content';
import { setThumbnail } from './thumbnail-cache';

const W = 900;
const H = 600;

export function preGenerateThumbnails() {
  const boardIds = Object.keys(MOCK_BOARD_CONTENT);

  boardIds.forEach((boardId) => {
    const offscreen = document.createElement('canvas');
    offscreen.width = W;
    offscreen.height = H;

    const canvas = new Canvas(offscreen, { width: W, height: H, backgroundColor: '#FAFAFA' });
    const elements = getMockContent(boardId);

    elements.forEach((el) => {
      const x = el.left * W;
      const y = el.top * H;

      if (el.type === 'line' && el.x2 !== undefined && el.y2 !== undefined) {
        canvas.add(
          new Line([x, y, el.x2 * W, el.y2 * H], {
            stroke: el.stroke ?? '#9CA3AF',
            strokeWidth: 1.5,
          }),
        );
      } else if (el.type === 'sticky' || el.type === 'rect') {
        const elW = (el.width ?? 0.15) * W;
        const elH = (el.height ?? 0.1) * H;
        canvas.add(
          new Rect({
            left: x,
            top: y,
            width: elW,
            height: elH,
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
              left: x + 10,
              top: y + 10,
              fontSize: el.fontSize ?? 13,
              fontFamily: 'Inter, sans-serif',
              fill: el.fontColor ?? '#374151',
            }),
          );
        }
      } else if (el.type === 'circle') {
        const r = (el.radius ?? 0.05) * Math.min(W, H);
        canvas.add(
          new Circle({
            left: x,
            top: y,
            radius: r,
            fill: el.fill,
            stroke: el.stroke,
            strokeWidth: 1,
          }),
        );
        if (el.text) {
          canvas.add(
            new IText(el.text, {
              left: x + r - 20,
              top: y + r - 8,
              fontSize: el.fontSize ?? 13,
              fontFamily: 'Inter, sans-serif',
              fill: el.fontColor ?? '#374151',
            }),
          );
        }
      } else if (el.type === 'text') {
        canvas.add(
          new IText(el.text ?? '', {
            left: x,
            top: y,
            fontSize: el.fontSize ?? 16,
            fontFamily: 'Inter, sans-serif',
            fill: el.fontColor ?? '#374151',
          }),
        );
      }
    });

    canvas.renderAll();
    const dataUrl = canvas.toDataURL({ format: 'png', multiplier: 0.3 });
    setThumbnail(boardId, dataUrl);
    canvas.dispose();
  });
}
