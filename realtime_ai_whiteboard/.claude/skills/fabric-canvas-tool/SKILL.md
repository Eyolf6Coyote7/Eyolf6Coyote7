---
name: fabric-canvas-tool
description: Add or modify a drawing tool in the Fabric.js whiteboard canvas with consistent event wiring, palette, and mock rehydration.
when_to_use:
  - add a new tool / shape / brush to the whiteboard canvas
  - fix 'the Fabric canvas doesn't draw X' / 'tool Y stops after the first click'
  - edit realtime_ai_whiteboard/web-app/src/components/canvas/WhiteboardCanvas.tsx
  - edit realtime_ai_whiteboard/web-app/src/components/canvas/Toolbar.tsx
  - anything mentioning fabric, Canvas, Rect, Circle, IText, Line, freeDrawingBrush, getScenePoint, or the Tool union type.
tech_stack:
  - react
  - fabric.js
  - canvas
  - vite
harness: fe-csr
project: realtime_ai_whiteboard
---

## When to use

Trigger this skill when the user asks to:

- add a new tool / shape / brush to the whiteboard canvas
- fix 'the Fabric canvas doesn't draw X' / 'tool Y stops after the first click'
- edit realtime_ai_whiteboard/web-app/src/components/canvas/WhiteboardCanvas.tsx
- edit realtime_ai_whiteboard/web-app/src/components/canvas/Toolbar.tsx
- anything mentioning fabric, Canvas, Rect, Circle, IText, Line, freeDrawingBrush, getScenePoint, or the Tool union type.

Also trigger when VITE_MOCK=true rehydration of demo shapes is involved - see web-app/src/api/mock-board-content.ts.

## Context

This project uses Fabric.js v7 (not v5/v6). Important v7 specifics already baked into the code:

- Classes are imported by name from 'fabric'.
- Pointer coordinates come from canvas.getScenePoint(opt.e) - do NOT use legacy canvas.getPointer.
- The freehand brush lives on canvas.freeDrawingBrush and only exists after isDrawingMode = true.
- canvas.selection must be manually toggled to activeTool === 'select'.
- Listeners are re-registered on every activeTool change and cleaned up via canvas.off('mouse:down'); canvas.off('mouse:up'). Leaking listeners here causes the 'shape gets created twice' bug.
- When VITE_MOCK=true the canvas is rehydrated from getMockContent(boardId) on mount. Any new tool must also emit a serialisable element type that loadMockElements can re-create.

Canonical file: realtime_ai_whiteboard/web-app/src/components/canvas/WhiteboardCanvas.tsx (lines 1-225).

## Operating instructions

When asked to add a new tool (example: arrow):

1. Extend the Tool union in WhiteboardCanvas.tsx line 5 to include 'arrow'.
2. Add a new case 'arrow': branch inside addShape (lines 112-181). Use the exact colour palette below.
3. Register the tool in the includes guard (line 208).
4. Update Toolbar.tsx to include a button for the new tool.
5. Add a Storybook story variant in Toolbar.stories.tsx.
6. Extend web-app/src/api/mock-board-content.ts so the element round-trips through loadMockElements (lines 16-88).
7. Add/extend a test in web-app/src/components/components.test.tsx.

When fixing a 'shapes get duplicated' bug, verify canvas.off('mouse:down') / canvas.off('mouse:up') are called at the start of the effect AND in the cleanup (lines 206-215).

## Reusable prompts / code patterns

### Standard colour palette (must match)

    FILL_BLUE      #DBEAFE   rect
    FILL_RED       #FEE2E2   circle
    FILL_YELLOW    #FEF3C7   sticky
    STROKE_BLUE    #2563EB
    STROKE_RED     #EF4444
    STROKE_YELLOW  #F59E0B
    STROKE_NEUTRAL #374151
    TEXT_DARK      #191C1D
    TEXT_NEUTRAL   #374151
    TEXT_AMBER     #92400E

### Tool case template (arrow)

    case 'arrow': {
      canvas.add(new Line([x, y, endX, endY], { stroke: '#374151', strokeWidth: 2 }));
      const angle = Math.atan2(endY - y, endX - x);
      const headLen = 12;
      canvas.add(new Line([endX, endY, endX - headLen*Math.cos(angle - Math.PI/6), endY - headLen*Math.sin(angle - Math.PI/6)], { stroke: '#374151', strokeWidth: 2 }));
      canvas.add(new Line([endX, endY, endX - headLen*Math.cos(angle + Math.PI/6), endY - headLen*Math.sin(angle + Math.PI/6)], { stroke: '#374151', strokeWidth: 2 }));
      break;
    }

### Event wiring effect (copy exactly from WhiteboardCanvas.tsx lines 187-216)

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      canvas.selection = activeTool === 'select';
      canvas.isDrawingMode = activeTool === 'freehand';
      if (activeTool === 'freehand' && canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = '#374151';
        canvas.freeDrawingBrush.width = 2;
      }
      const onMouseDown = (opt) => { if (opt.target) return; startPoint.current = { x: canvas.getScenePoint(opt.e).x, y: canvas.getScenePoint(opt.e).y }; };
      const onMouseUp   = (opt) => { if (!startPoint.current) return; const p = canvas.getScenePoint(opt.e); addShape(startPoint.current.x, startPoint.current.y, p.x, p.y); startPoint.current = null; };
      canvas.off('mouse:down');
      canvas.off('mouse:up');
      if (['rect','circle','line','text','sticky','arrow'].includes(activeTool)) {
        canvas.on('mouse:down', onMouseDown);
        canvas.on('mouse:up', onMouseUp);
      }
      return () => { canvas.off('mouse:down'); canvas.off('mouse:up'); };
    }, [activeTool, addShape]);

Minimum shape size floor for click-only creation: use Math.max(w, 40) and Math.max(h, 40) so a single click still produces a visible shape.

## Anti-patterns

- Do NOT use canvas.getPointer(opt.e); Fabric v7 uses canvas.getScenePoint(opt.e).
- Do NOT register mouse:down / mouse:up without first calling canvas.off(...) for the same events.
- Do NOT create React state inside the addShape callback - keep it useCallback(..., [activeTool]).
- Do NOT set canvas.selection = true in non-select modes - it fires a selection rectangle that steals mouse:down.
- Do NOT hard-code colours outside the palette - mock rehydration relies on the palette constants.
- Do NOT add a tool without extending the Tool union AND the includes guard - TypeScript will pass but the tool will silently do nothing.
- Do NOT introduce Y.Map-backed live shapes in this file; CRDT sync belongs in hooks/useYjs.ts - see the yjs-realtime-collab skill.

## References

- realtime_ai_whiteboard/web-app/src/components/canvas/WhiteboardCanvas.tsx:1-225 - canonical canvas component.
- realtime_ai_whiteboard/web-app/src/components/canvas/WhiteboardCanvas.tsx:5 - Tool union.
- realtime_ai_whiteboard/web-app/src/components/canvas/WhiteboardCanvas.tsx:16-88 - loadMockElements mock rehydration.
- realtime_ai_whiteboard/web-app/src/components/canvas/WhiteboardCanvas.tsx:106-185 - addShape switch.
- realtime_ai_whiteboard/web-app/src/components/canvas/WhiteboardCanvas.tsx:187-216 - tool-change effect with off/on listener discipline.
- realtime_ai_whiteboard/web-app/src/components/canvas/Toolbar.tsx - button row.
- realtime_ai_whiteboard/web-app/src/api/mock-board-content.ts - mock element schema.
- realtime_ai_whiteboard/web-app/src/components/components.test.tsx - canvas smoke test.
