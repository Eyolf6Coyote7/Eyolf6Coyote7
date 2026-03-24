# Screen: Admin Dashboard

> Route: `/admin` | Platform: Web | Figma Page: Screens — Admin Dashboard

## Stitch Prompt

Desktop web page, 1440px width.

An admin analytics dashboard for an enterprise workflow system. Desktop viewport 1440x900px. Standard layout with top bar (64px, includes an "Admin" badge — small pill bg #409EFF text white next to the logo, and a "Switch to Portal" text link on the right side of the top bar) and admin side nav (220px).

**Admin side nav** (220px, same structure as employee nav but different items): "Dashboard" (active, blue highlight), "User Management" (users icon), "Workflow Templates" (settings icon), "Audit Log" (scroll icon), "Feature Toggles" (flag icon), "Remote Config" (sliders icon). Each item 48px height, 14px text. Active item has #ECF5FF background and #409EFF text with 4px blue left border.

**Main content area** (background #F5F7FA, padding 24px):

**Page header** (flex row, justify-between): Left: "Admin Dashboard" in 20px bold #303133, subtitle "System overview and analytics" in 14px #909399. Right: date range selector (200px, "Last 30 days" selected, calendar icon, dropdown with options: 7 days, 30 days, 90 days, Custom).

**Row 1 — KPI Cards** (4 cards, equal width, 16px gap): Each card is white, radius 8px, shadow, padding 20px. Each card has a colored left border (4px).

Card 1: blue left border (#409EFF). "Avg. Turnaround" label in 14px #909399. Value "6.2 hours" in 28px bold #303133. Trend: green down arrow with "↓ 12% vs last month" in 12px #67C23A. Small sparkline chart (60px wide, 24px tall) in blue showing a downward trend.

Card 2: yellow left border (#E6A23C). "Pending Requests" label. Value "23" in 28px bold #E6A23C. Trend: red up arrow "↑ 8%" in 12px #F56C6C. Sparkline in yellow showing upward trend.

Card 3: green left border (#67C23A). "Completed This Month" label. Value "342" in 28px bold #303133. Trend: green up arrow "↑ 15%" in 12px #67C23A. Sparkline in green upward.

Card 4: red left border (#F56C6C). "Escalated" label. Value "7" in 28px bold #F56C6C. Trend: red up arrow "↑ 3" in 12px #F56C6C. Small warning icon.

**Row 2 — Charts** (below KPI cards, 16px gap, two charts side by side, 50% each, 16px gap between): Each chart in a white card, radius 8px, shadow, padding 20px.

Chart 1: "Request Volume" title (16px bold #303133). Below, a bar chart (ECharts style) showing daily request counts over 30 days. X-axis: dates. Y-axis: count 0-30. Bars are #409EFF for submitted, lighter blue #A0CFFF for completed, stacked. Legend at top-right: "Submitted" / "Completed" with colored squares.

Chart 2: "Turnaround Time Trend" title. Below, a line chart showing average turnaround time over 30 days. X-axis: dates. Y-axis: hours 0-24. Line is #409EFF with area fill gradient (blue to transparent). A red dashed horizontal line at 8h labeled "SLA Target" (#F56C6C).

**Row 3 — Bottom cards** (below charts, 16px gap, two cards side by side, 50% each):

Card left: "Top Bottlenecks" title. A horizontal bar chart showing the 5 slowest approval steps: "Director Approval (avg 4.2h)", "Finance Review (avg 3.1h)", etc. Bars are gradient from #E6A23C to #F56C6C (longer bars are more red).

Card right: "Request by Type" title. A donut chart (ECharts) with segments: Leave 35% (#409EFF), Purchase 25% (#67C23A), Travel 20% (#E6A23C), Equipment 12% (#F56C6C), Other 8% (#909399). Center text shows total "342". Legend below with colored dots and labels.

## Design Tokens

| Token | Value |
|-------|-------|
| KPI card left border | 4px colored |
| KPI value size | 28px bold |
| KPI label size | 14px #909399 |
| KPI trend positive | #67C23A |
| KPI trend negative | #F56C6C |
| Sparkline height | 24px |
| Chart card padding | 20px |
| Chart height | ~280px |
| Bar chart primary | #409EFF |
| Bar chart secondary | #A0CFFF |
| SLA line color | #F56C6C dashed |
| Donut chart colors | #409EFF, #67C23A, #E6A23C, #F56C6C, #909399 |
| Date selector width | 200px |
| Admin badge | bg #409EFF, text white, radius 10px |

## States to Generate

1. **Default** — All KPI cards, charts, and bottom cards populated with data
2. **Loading** — KPI cards show skeleton numbers, chart areas show pulsing gray rectangles
3. **Date range changed** — "Last 7 days" selected, charts show compressed data range, KPIs show updated values
4. **Alert state** — Escalated KPI card has a pulsing red glow border, value "15" (high), alert icon

## Style Direction

- Data-driven dashboard for administrators who need system health at a glance
- KPI cards with sparklines give trend context alongside raw numbers
- ECharts for all chart visualizations — consistent charting library
- SLA target line on turnaround chart makes compliance visible
- Bottleneck chart helps admins identify process improvement areas
- Donut chart for composition, bar chart for volume, line chart for trends
- Professional analytics aesthetic — no decorative elements

## Acceptance Criteria

- [ ] Admin badge visible in top bar with "Switch to Portal" link
- [ ] Admin side nav with 6 items, Dashboard active
- [ ] 4 KPI cards with colored left borders, large values, trend arrows, sparklines
- [ ] Request volume bar chart (stacked: submitted/completed)
- [ ] Turnaround time line chart with SLA target line
- [ ] Bottleneck horizontal bar chart
- [ ] Request by type donut chart with legend
- [ ] Date range selector in header
- [ ] All charts use ECharts styling
