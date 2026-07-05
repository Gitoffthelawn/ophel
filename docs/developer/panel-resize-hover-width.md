# 面板拖拽改宽与悬停临时加宽方案

## 背景

用户已经可以在 `Settings -> General -> Panel -> Panel Width` 中调整 Ophel 面板宽度，但这是一个持久设置，不能覆盖“临时想多读几行大纲/会话/提示词文本，读完后让主聊天区恢复可视空间”的场景。

用户提出的两个交互诉求需要拆开处理：

- 持久改宽：通过面板上的拖拽手柄直接调整面板宽度，不必进入设置页。
- 临时加宽：鼠标悬停在面板时自动扩大宽度，移开后恢复常规宽度，用于快速扫读长文本。

## 目标

- 在主面板内提供宽度拖拽手柄，拖拽结束后写入现有 `panel.width` 设置。
- 新增可选设置，允许面板悬停时临时加宽。
- 悬停临时加宽只影响 Ophel 面板自身，不写入持久宽度。
- 与扩展版和油猴脚本共用一套 React/Shadow DOM 实现，不依赖扩展专属 API。
- 保持现有边缘吸附、启动器预览、主题系统和自定义样式能力。

## 非目标

- 不新增第二套面板布局或浏览器原生 sidebar。
- 不在第一版支持触摸设备上的悬停加宽。
- 不让悬停临时加宽触发页面智能避让，否则主聊天内容会随鼠标进出反复跳动。
- 不改变现有设置页中的面板宽度滑块语义。

## 设置结构

在 `Settings["panel"]` 中新增两个字段：

```ts
resizeOnHover: boolean
hoverWidth: number
```

默认值：

```ts
resizeOnHover: false
hoverWidth: 520
```

兼容策略：

- `normalizePanelSettings()` 为旧数据补默认值。
- 备份/恢复继续复用 `settings` store 的结构化归一化逻辑。
- Options 页面在面板设置卡片中新增开关和悬停宽度滑块。
- 新增文案必须同步 `src/locales/*/index.ts` 的 11 种语言。

## 面板宽度计算

`MainPanel` 中保留持久宽度：

```ts
const basePanelWidth = currentSettings.panel?.width ?? 320
```

运行时宽度按以下规则得到：

```ts
const panelWidth =
  shouldUseHoverWidth ? Math.max(basePanelWidth, hoverWidth) : basePanelWidth
```

`shouldUseHoverWidth` 必须同时满足：

- `resizeOnHover === true`
- 设备支持 hover 和 fine pointer：`(hover: hover) and (pointer: fine)`
- 非启动器预览态
- 非边缘吸附模式
- 面板处于 hover/focus/拖拽外的正常展开态

运行时写入：

- `style.width = panelWidth`
- `--panel-width = panelWidth`
- `--panel-base-width = basePanelWidth`

其中 `--panel-width` 继续服务当前面板定位和边缘吸附 CSS；悬停临时加宽不进入智能避让数据源，避免页面内容反复重排。

## 拖拽改宽

在面板靠近屏幕中线的一侧渲染 `.gh-panel-resize-handle`：

- 右侧默认位置时，手柄在面板左边缘，向左拖动变宽。
- 左侧默认位置时，手柄在面板右边缘，向右拖动变宽。
- 拖拽期间直接更新本地 `draftWidth`，保证反馈即时。
- 拖拽结束后写入 `panel.width`，并清空草稿宽度。
- 宽度限制沿用设置页滑块：`240px` 到 `600px`。

拖拽事件使用 Pointer Events，在 Shadow DOM 内完成：

1. `pointerdown` 记录起点、起始宽度和左右方向，并调用 `setPointerCapture()`。
2. `pointermove` 计算下一宽度，使用 `requestAnimationFrame` 合并更新。
3. `pointerup` / `pointercancel` 写入设置并清理事件状态。

需要阻止事件冒泡到面板拖拽逻辑，避免拖宽和拖动面板同时触发。

## 悬停临时加宽

悬停加宽不能只依赖 CSS `:hover`。历史问题表明 Portal、输入法候选栏和高层级覆盖元素可能让 CSS hover 状态突然失效。实现应使用 JS 状态：

- `onMouseEnter` / `onMouseLeave` 更新面板 hover 状态。
- `focusin` / `focusout` 保持键盘操作时的加宽状态。
- `mouseleave` 后延迟收回，减少视觉抖动。
- 打开 Ophel 菜单或对话框时，如果交互层仍在，保持当前宽度直到交互结束。

第一版不新增 hover 加宽快捷键；需要临时隐藏面板仍使用现有幽灵模式和边缘吸附能力。

## 样式与主题

- 样式放在 `src/style.css`，通过现有 `getStyle()` 注入 Plasmo Shadow DOM。
- 手柄颜色使用 `--gh-border`、`--gh-text-tertiary`、`--gh-primary`、`--gh-hover`。
- 手柄默认低干扰，只在 hover/focus/dragging 时增强可见性。
- 支持 `prefers-reduced-motion`，禁用宽度过渡。
- 不新增主题变量，避免扩展 24 套主题配置。

## 与现有功能的关系

- `useDraggable`：resize handle 必须阻止冒泡，不进入 header 拖动逻辑。
- Edge Snap：第一版不启用 hover 临时加宽，避免与边缘 peek 行为竞争。
- Launcher Peek：第一版不启用 hover 临时加宽，保持启动器预览位置计算稳定。
- Smart Avoidance：拖拽持久改宽会更新 `panel.width`，由现有布局监听同步；悬停临时加宽不作为避让输入。
- 油猴脚本：使用 DOM、Pointer Events、Zustand settings store 和 CSS，油猴构建可复用。

## 验证清单

- 设置页能显示并保存“悬停时加宽”和“悬停宽度”。
- 拖拽手柄在左右默认位置下方向正确，宽度限制在 `240px` 到 `600px`。
- 拖拽结束后刷新页面仍保留新宽度。
- 开启悬停加宽后，普通悬浮面板 mouse enter 加宽、mouse leave 收回。
- 关闭悬停加宽后，mouse enter 不改变宽度。
- Edge Snap 和 Launcher Peek 不启用临时加宽。
- 浅色/深色主题下手柄可见但不抢主操作。
- `pnpm format:check`、`pnpm lint:check`、`pnpm typecheck`、`pnpm build`、`pnpm build:userscript` 通过。
