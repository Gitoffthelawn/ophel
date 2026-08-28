# 【开源推广】Ophel Atlas 1.2：AI 对话大纲导航 + 插件式“热插拔”适配，支持任意AI聊天站点

#### 本帖使用社区开源推广，符合推广要求。我申明并遵循社区要求的以下内容：
* **我的帖子已经打上 #开源推广 标签：** 是
* **我的开源项目完整开源，无未开源部分：** 是
* **我的开源项目已链接认可 LINUX DO 社区：** 是
* **我帖子内的项目介绍，AI生成、润色内容部分已截图发出：** 是
* **以上选择我承诺是永久有效的，接受社区和佬友监督：** 是

*以下为项目介绍正文内容，AI生成、润色内容已使用截图方式发出*

---

## 开源地址

https://github.com/urzeye/ophel

<a href="https://chromewebstore.google.com/detail/ai-chat-organizer-outline/lpcohdfbomkgepfladogodgeoppclakd"><img src="https://img.shields.io/chrome-web-store/users/lpcohdfbomkgepfladogodgeoppclakd?logo=google-chrome&logoColor=white&label=Chrome%20Web%20Store&color=4285F4&labelColor=4285F4" alt="Chrome Web Store"></a> <a href="https://microsoftedge.microsoft.com/addons/detail/ophel-atlas-ai-chat-navi/ffpenkdeifijngifjmbbpijfpdhlolga"><img src="https://img.shields.io/badge/Edge_Add--ons-0078D7?logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI5NnB4IiBoZWlnaHQ9Ijk2cHgiPjxwYXRoIGZpbGw9IiMxZTg4ZTUiIGQ9Ik00MC42OSwzNS40MmMtOS4xNSwxMS44OC0yMS40MSw4LjgtMjYuMjMsNi4xIGMtNy4zNS00LjExLTEyLjUtMTMuNjgtOS40NC0yMy4yNWMwLjktMi44MiwyLjI3LTUuMjMsMy45OC03LjIzYzEuNjcsMC4xMywzLjY1LDAuMTMsNi0wLjA0YzE0LTEsMTgsMTEsMTcsMTQgYy0wLjUxLDEuNTMtMi4zMiwyLjAyLTMuOTcsMi4xM2MwLjE2LTAuMjIsMC4zNi0wLjU0LDAuNjQtMS4wMmMwLjg3LTEuNTQsMC45OC00LjQ5LTEuNzMtNi4yN2MtMi42MS0xLjctNS40My0wLjY1LTYuODgsMS4yOCBjLTEuNDUsMS45Mi0wLjg4LDQuODEtMC4zNyw2LjA5YzIuMiw1LjUyLDYuMjYsNi45NSw5LjAyLDcuNzhjMi43NiwwLjgzLDYuODYsMC43MSw5LjA1LTAuMTljMi4xOC0wLjkxLDIuOC0xLjQzLDMuMjItMC45NyBDNDEuNDEsMzQuMjksNDEuMTEsMzQuODIsNDAuNjksMzUuNDJ6Ii8%2BPHBhdGggZmlsbD0iIzBkNDdhMSIgZD0iTTQwLjczMiwzNS40MmMtMy40OCw0LjUyLTcuNDEsNi44Ny0xMS4yMSw3LjkxIGMtMC4wMywwLjAxLTAuMDYsMC4wMS0wLjA4LDAuMDJjLTIuMiwwLjQyLTMuOTUsMC4wOC01Ljg1LTAuMjljLTMuMDktMC42LTcuMzUtNC4wMS04LjM4LTEwLjE4Yy0wLjg4LTUuMzEsMS42My05LjgxLDUuNTktMTIuNTQgYy0wLjI2LDAuMjQtMC40OSwwLjUtMC43LDAuNzhjLTEuNDUsMS45Mi0wLjg4LDQuODEtMC4zNyw2LjA5YzIuMiw1LjUyLDYuMjYsNi45NSw5LjAyLDcuNzhjMi43NiwwLjgzLDYuODYsMC43MSw5LjA1LTAuMTkgYzIuMTgtMC45MSwyLjgtMS40MywzLjIyLTAuOTdDNDEuNDUyLDM0LjI5LDQxLjE1MiwzNC44Miw0MC43MzIsMzUuNDJ6Ii8%2BPHBhdGggZmlsbD0iIzAwZTVmZiIgZD0iTTI2Ljk0LDQuMjVjMC4wMiwwLjI2LDAuMDMsMC41NCwwLjAzLDAuODFjMCwzLjc4LTEuNzUsNy4xNC00LjQ4LDkuMzIgYy0xLjAyLTAuNTItMi4yMS0wLjk0LTMuNjUtMS4yMmMtNC4wNy0wLjc4LTEwLjYzLDEuMS0xMy4zLDUuNzdjLTAuODgsMS41My0xLjI1LDMuMS0xLjQxLDQuNTVjMC4wNC0xLjcxLDAuMzMtMy40NiwwLjg5LTUuMjEgQzguMzEsOC4wMSwxNy44NiwzLjA1LDI2Ljk0LDQuMjV6Ii8%2BPHBhdGggZmlsbD0iIzAwZTY3NiIgZD0iTTQxLjQsMjcuODljLTIuNzYsMi43OC02LjI3LDIuODYtOC42NywyLjczIGMtMi40MS0wLjEyLTMuNTktMC44Mi00LjY5LTEuNWMtMS4xMS0wLjY5LTAuNDgtMS4zNy0wLjM3LTEuNTJjMC4xMS0wLjE1LDAuMzgtMC40MSwxLTEuNDljMC4yOS0wLjUxLDAuNS0xLjE4LDAuNTQtMS45MSBjNC42Mi0zLjQzLDcuOTYtOC40OSw5LjE2LTE0LjM0YzIuOTIsMi45NSw0LjMsNi4yMSw0Ljc5LDcuNjFDNDQuMDQsMTkuOTksNDQuNzEsMjQuNTYsNDEuNCwyNy44OXoiLz48cGF0aCBmaWxsPSIjMWRlOWI2IiBkPSJNMzguMzcsOS44NXYwLjAxYy0xLjIsNS44NS00LjU0LDEwLjkxLTkuMTYsMTQuMzRjMC4wMy0wLjQyLDAtMC44Ny0wLjEtMS4zMiBjMC0wLjAyLTAuMDEtMC4wNC0wLjAxLTAuMDVjLTAuMjUtMS40Ny0wLjk5LTMuMzMtMi4yMi00Ljc3Yy0xLjIyLTEuNDQtMi41Mi0yLjczLTQuMzktMy42OGMyLjczLTIuMTgsNC40OC01LjU0LDQuNDgtOS4zMiBjMC0wLjI3LTAuMDEtMC41NS0wLjAzLTAuODFjMC40LDAuMDUsMC43OSwwLjExLDEuMTksMC4xOUMzMi43NCw1LjMzLDM2LjA0LDcuNDksMzguMzcsOS44NXoiLz48L3N2Zz4=&style=flat" alt="Edge Add-ons"></a> <a href="https://addons.mozilla.org/firefox/addon/ophel-ai-chat-enhancer/"><img src="https://img.shields.io/amo/users/ophel-ai-chat-enhancer?logo=firefox&logoColor=white&label=Firefox%20Add-ons&color=FF7139&labelColor=FF7139" alt="Firefox Add-ons"></a> <a href="https://greasyfork.org/scripts/563646-ophel-ai-chat-page-enhancer"><img src="https://img.shields.io/greasyfork/dt/563646?logo=tampermonkey&logoColor=white&label=Greasy%20Fork&color=black&labelColor=black" alt="Greasy Fork"></a> <a href="https://scriptcat.org/script-show-page/6519"><img src="https://img.shields.io/badge/ScriptCat-脚本猫-FF5722?style=flat" alt="ScriptCat"></a>


> 完全开源、无任何广告、零数据收集
> 同时提供浏览器扩展与油猴脚本两种形态

![image|690x462, 100%](upload://tjnn24jOG9NkQt5XvSTcMT4Q06p.png)

---

## 为什么写这个插件

~~站里大佬估计很多都习惯终端或者桌面版客户端了，不过偶尔还是得用网页端嘛 😂~~

我自己日常查资料或者看方案，经常在网页端一聊就是几十上百轮，动辄几万字，对话长了之后有几个地方特别折磨：
1. **翻历史记录很难找到**：想找前面第几轮提的某个要求或者某段代码，鼠标滚轮得死命往上搓，经常滑过头或者眼花找半天
2. **导出不爽**：直接网页全选复制，代码块格式乱了，公式格式直接丢了，思考过程跟正文混成一团，图片也没法一起存下来

之前只内置支持了15个主流的站点，总有佬友要求支持某个网站，还需要硬编码进行适配、发版、等待审核，流程太长而且过于依赖作者适配，所以这次 1.2 版本干脆把架构重写了，把站点适配做成了类似规则订阅的机制

---

## 1.2 最大的改动：规则化解耦

这是 1.2 版本最核心的改变，我把站点适配能力做成了独立的 JSON 规则，有点像广告拦截插件的规则订阅

|已安装 | 自定义绑定 | 在线适配库与调试|
|--- | --- | ---|
|![已安装|521x499, 50%](upload://5wg94a7hQEhOzYy9ujtYHP6lOhr.png) | ![自定义|582x500, 50%](upload://i0GRdIE59iRqrN1WvHaciKmto2w.png) | ![已适配|141x500, 50%](upload://rYsAbauaX75oEeVTylroPGjmA7z.jpeg)|


### 1. 站点改版不用等商店审核

像 ChatGPT、Claude、DeepSeek、Gemini、Kimi、豆包、千问这些官方站，如果前端改了 DOM结构，直接在云端更新个 JSON 规则补丁，插件打开自动拉取生效，不用等 Chrome / Edge 卡在审核好几天

### 2. 纯静态 JSON 规则，安全干净

不走任何远程脚本或者 eval 执行，所有规则都是纯 JSON 配置（只需要写 CSS 选择器和功能开关），不用担心安全风险

### 3. 支持自建站与自定义域名绑定

很多佬友内网部署了开源 WebUI、DeepSeek Harness等，比如：
- `http://192.168.1.100:3000` (Open WebUI)
- 自己解析的私人二级域名

现在只要在**设置 -> 适配中心**，把对应规则绑定到你的内网IP或域名，自建的站点上也能使用完整的大纲导航、导出与其他快捷工具

### 4. 随手写个规则就能支持新网站

如果你在用什么冷门站点或者新出了的什么平台，不需要去改插件源码，写几十行的 JSON 规则导入就能用：

```json
{
  "id": "my-custom-ai",
  "name": "My Custom AI",
  "version": 1,
  "minAppVersion": "1.2.0",
  "matches": ["https://my-ai-site.com/*"],
  "capabilities": ["outline", "outline-user-queries", "export-basic", "width", "zen"],
  "selectors": {
    "responseContainer": ".chat-message-list",
    "userQuery": ".user-message-bubble",
    "textarea": "textarea#prompt-input"
  }
}
```

验证好后直接向GitHub仓库提个 PR，等合并后其他用户也能一键下载使用

---

## 核心能力

### 1. 自动生成实时大纲导航，找内容不用费劲滚动鼠标

![实时大纲导航|690x388](https://cdn3.ldstatic.com/original/4X/1/b/6/1b6cd6e5ad6d5d991d3d81cc2e51550c67228c7f.webp)

~~原谅我懒，没有重新录屏，把上古UI版本的图直接拿出来了~~

- **提问 & 回答目录大纲**：把每轮提问、回答里的多级标题和思考过程都抽成树状大纲，点击跳转
- **位置实时高亮**：网页滚动到哪，右边大纲就自动跟到对应位置
- **点击平滑跳转**：点大纲直接跳转过去，自动记录跳转前位置，还可以一键返回刚才看的地方
- **独立文档大纲**：像 Claude Artifacts、Gemini 深度研究这种带独立canvas面板的，也有专门的 Tab 大纲

---

### 2. 对话导出与会话管理

|功能 | 效果图|
|--- | ---|
|导出控制 |![导出控制|387x500, 75%](upload://5jB3HrwqpiAKoOnuIgrV6UgJTPh.png) |
|分段导出 | ![分段导出|559x500, 75%](upload://itbOCcpTZ3KtXy8Ej9KaWTHu1Wf.png)|

- **会话管理**：支持文件夹、多标签层级的会话同步与管理，自动从源站点同步数据
- **自包含 HTML 导出**：导出一个纯静态 HTML 文件，页面样式全部内嵌，支持暗黑模式、公式渲染、代码一键复制，思考过程默认折叠，适合用来分享或者归档
- **结构化 Markdown 导出**：过滤掉网页上的杂乱标签，保留完整的代码块语言和思考块
- **ZIP 图片离线打包**：包含对话内生成的配图与附件
- **分段导出**：支持只导出部分对话，导出前自动加载全量对话，不遗漏每一轮消息


---

### 3. Prompt 词库与变量模板

![提示词预览|564x499](upload://tLHepSS52o9ZjzAFzqnbPW5NINV.jpeg)


- **变量模板**：支持 `{{变量名}}` 占位符（如 `请帮我审查这段 {{语言}} 代码，重点关注 {{安全项}}`），点击插入时弹出自适应的多行输入框，快速填空
- **按平台智能筛选**：可以为 Prompt 打上平台标签（ChatGPT / Claude / DeepSeek 等），多平台切换自动筛选
- **快速发送**：常用的提示词直接点一下插入输入框，不用到处翻剪贴板，还支持双击发送、批量排队插入与执行
- **引用回复与提示词链**：链式发送提示词，自由编排

---

### 4. 沉浸阅读与其他细节增强

![主题切换|690x338](upload://hVLR653hK6eTZJU9TGXxNdPhfHW.webp)

- **宽屏 / 禅模式**：一键隐藏不重要的侧边栏和冗余装饰，最大化展示内容阅读区域
- **智能避让**：悬浮面板展开时自动给原生页面预留出安全空间，避免遮挡输入框和网页原有元素
- **流式滚动锁定**：当 AI 在持续生成时，锁定当前页面的滚动条，不会强行把对话拉到屏幕最底部，方便边生成边看前文
- **阅读历史恢复**：打开对话自动恢复到上次阅读的位置
- **LaTeX 公式 / 表格一键复制**：阅读学术公式或数据表格时，直接提取源码或一键转为 Markdown 表格
- **标签页增强**：自动重命名浏览器标签页，状态、模型、标题一目了然
- **AI生成完成后通知**：回复完成后发送桌面通知与提示音
- **多主题适配**：面板支持与宿主页面主题联动，内置多套精心调优的配色


---

## 📸 更多功能截图

<details>
<summary>📐 查看更多界面与功能截图</summary>

<br/>

![大纲与多轮会话](https://cdn3.ldstatic.com/original/4X/6/f/2/6f2ec1ccd6696af5b7dad7e1e65258a6a49a2dcb.jpeg)
![会话管理](https://cdn3.ldstatic.com/original/4X/e/9/5/e9540d8aa42cb4e2f4477d7b5faaf0d7a434b883.jpeg)
![基本设置|684x500](upload://7FQFsOoffL6YpEOAHA7eCrh6iOv.png)
![功能模块|690x484](upload://y0VCeC7W7iUHeVAzOvCH8EcTvDZ.png)
![权限管理|690x497](upload://ytnmaHiH6uZSbTi8NgAWCeFICyV.png)


</details>

---

## 最后

这项目一开始是我自己嫌网页端看长对话太累手搓的小玩意，一步步打磨到现在支持十几个主流站点、支持热插拔插件、支持双端分发，离不开社区里很多朋友的反馈。

大家在平时使用中有任何 bug、新站点适配需求、或者有更好的交互想法，可以直接去 GitHub 提 [Issue](https://github.com/urzeye/ophel/issues) / [PR](https://github.com/urzeye/ophel/pulls)
如果你手头有需要适配的站点，欢迎提交issue；有写好的自用站点 JSON 适配包，也非常欢迎提交到仓库，给更多佬友共享！

如果觉得插件对你的工作和学习有所帮助，欢迎前往 GitHub 给个 **Star 🌟**，感谢！
