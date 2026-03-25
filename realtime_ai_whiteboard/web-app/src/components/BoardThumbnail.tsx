import { getMockContent } from '../api/mock-board-content';

export function BoardThumbnail({ boardId }: { boardId: string }) {
  const elements = getMockContent(boardId);
  const scale = 160 / 600; // thumbnail height / canvas height
  const scaleX = 280 / 900; // thumbnail width / canvas width

  return (
    <div style={{ height: 160, overflow: 'hidden', background: '#FAFAFA' }}>
      <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="280" height="160" fill="#FAFAFA" />
        {elements.map((el, i) => {
          const x = el.left * scaleX;
          const y = el.top * scale;

          if (el.type === 'circle') {
            const r = (el.radius ?? 30) * scale;
            return (
              <g key={i}>
                <circle
                  cx={x + r}
                  cy={y + r}
                  r={r}
                  fill={el.fill}
                  stroke={el.stroke}
                  strokeWidth={0.5}
                />
                {el.text && (
                  <text
                    x={x + r}
                    y={y + r + 3}
                    fontSize={6}
                    fill={el.fontColor ?? '#374151'}
                    textAnchor="middle"
                  >
                    {el.text.slice(0, 12)}
                  </text>
                )}
              </g>
            );
          }

          const w = (el.width ?? 140) * scaleX;
          const h = (el.height ?? 100) * scale;

          return (
            <g key={i}>
              {el.type !== 'text' && (
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx={2}
                  fill={el.fill}
                  stroke={el.stroke}
                  strokeWidth={0.5}
                />
              )}
              {el.text && (
                <text
                  x={el.type === 'text' ? x : x + 3}
                  y={el.type === 'text' ? y + 8 : y + h / 2 + 3}
                  fontSize={el.type === 'text' ? 5 : 5}
                  fill={el.fontColor ?? '#374151'}
                >
                  {el.text.split('\n')[0].slice(0, 20)}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
