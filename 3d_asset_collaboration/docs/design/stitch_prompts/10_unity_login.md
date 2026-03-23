# Screen: Unity Login

> Platform: Unity (Desktop) | Figma Page: Screens — Unity

## Stitch Prompt

A simple API key login screen for the Unity desktop client. DARK theme throughout — this matches the Unity Editor aesthetic. Desktop 1920x1080.

**Full-screen background**: Solid #1A1A2E (very dark navy). Subtle gradient: slightly lighter (#1E1E3A) in the center fading to #1A1A2E at edges, creating a soft vignette effect.

**Center card** (440px wide, dark card background #252547, border-radius 12px, border 1px rgba(255,255,255,0.08), shadow 0 16px 48px rgba(0,0,0,0.4)):

Padding 40px inside the card.

1. **Logo area** (centered): A stylized 3D cube icon in indigo (#6366F1), 48x48px, with a subtle glow effect (box-shadow 0 0 20px rgba(99,102,241,0.3)). Below: "AssetHub 3D" in bold 24px white (#F9FAFB) Inter. Below that: "Unity Client" in 14px #9CA3AF.

2. **Divider**: 1px line rgba(255,255,255,0.08), full width, 24px vertical margin.

3. **API Key input**:
   - Label: "API Key" in bold 12px #9CA3AF (uppercase, letter-spacing 1px).
   - Input field: full width, 48px height, #1A1A2E background, border 1px rgba(255,255,255,0.12), border-radius 8px. Left icon: key icon in #6B7280. Placeholder: "sk-xxxx-xxxx-xxxx" in monospace, #4B5563. Text color when filled: #E5E7EB monospace.
   - Focus state: border 1px #6366F1, subtle glow (box-shadow 0 0 8px rgba(99,102,241,0.2)).

4. **Remember checkbox**: Left-aligned, 16px top margin. Checkbox (indigo when checked) + "Remember this key" in 14px #9CA3AF.

5. **Connect button**: Full width, 48px height, indigo (#6366F1) background, white text "Connect" bold 14px, border-radius 8px. Hover: #7C3AED (lighter purple). Active: #4F46E5 (darker).

6. **Help text** (24px top margin): "Enter your API key from Account Settings on the web portal." in 12px #6B7280, centered. "Get API Key" link in #6366F1 with underline.

7. **Version footer** (bottom of card): "v1.0.0 · AssetHub 3D Unity Client" in 10px #4B5563, centered.

**Background decoration** (very subtle): Faint wireframe 3D grid lines in rgba(99,102,241,0.05) across the background, suggesting a 3D coordinate space.

## Design Tokens

| Token | Value |
|-------|-------|
| Screen bg | #1A1A2E |
| Card bg | #252547 |
| Card width | 440px |
| Card padding | 40px |
| Card radius | 12px |
| Card border | 1px rgba(255,255,255,0.08) |
| Card shadow | 0 16px 48px rgba(0,0,0,0.4) |
| Input bg | #1A1A2E |
| Input border | 1px rgba(255,255,255,0.12) |
| Input focus border | 1px #6366F1 |
| Input height | 48px |
| Input text | #E5E7EB |
| Input placeholder | #4B5563 |
| Button bg | #6366F1 |
| Button hover | #7C3AED |
| Text primary | #F9FAFB |
| Text secondary | #9CA3AF |
| Text muted | #6B7280 |
| Text dim | #4B5563 |
| Glow | 0 0 20px rgba(99,102,241,0.3) |

## States to Generate

1. **Default** — Empty API key input, Connect button enabled, dark theme
2. **Input focused** — API key field has indigo border glow, cursor blinking
3. **Loading** — Connect button shows spinner, text "Connecting...", input disabled
4. **Error** — Red border on input (#EF4444), error message "Invalid API key — check your key and try again" in 14px #EF4444 below input
5. **Success** — Brief green (#10B981) border flash on input, checkmark icon replaces spinner, "Connected!" text before transitioning

## Style Direction

- Dark theme is mandatory — this runs inside or alongside the Unity Editor
- The card floats on a deep navy background, creating focus without distraction
- Indigo glow effects add visual polish without being garish
- Monospace API key input feels technical and appropriate for developer tooling
- Minimal UI — just the essentials to authenticate
- The wireframe grid background subtly reinforces the 3D spatial context
- Professional, developer-friendly, no unnecessary ornamentation

## Acceptance Criteria

- [ ] Full dark theme: #1A1A2E background, #252547 card
- [ ] Centered login card with logo, title, "Unity Client" subtitle
- [ ] API Key input: monospace, dark bg, indigo focus glow
- [ ] Remember checkbox
- [ ] Connect button in indigo
- [ ] Help text with "Get API Key" link
- [ ] Version number footer
- [ ] Subtle wireframe grid background decoration
- [ ] No light theme elements anywhere
