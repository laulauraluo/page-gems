# Page Gems

**值得收藏的界面。** 一个逐步积累的网页模板集：保留出色的设计细节，用独立实现做成方便改造的模板。

[English](README.md) · **简体中文**

![Orbit 活动首页模板预览](templates/orbit-conference/preview.jpg)

## 模板目录

| 模板 | 包含内容 | 技术栈 |
| --- | --- | --- |
| [Orbit 活动首页](templates/orbit-conference/) | 超大标题、轨道图形、两日日程、参会方式切换、常见问题 | HTML、CSS、JavaScript |

## 本地预览

直接用现代浏览器打开 `index.html`，也可以在仓库目录运行：

```sh
python3 -m http.server 8080
```

访问 [localhost:8080](http://localhost:8080)。无需安装依赖或构建，不请求外部字体，没有运行时依赖；模板本身可以离线使用。

## 改成自己的活动

1. 将 `templates/orbit-conference/` 复制到你的项目。
2. 在 `index.html` 修改活动名称、日程、日期、价格和问答；单独使用模板时也要修改页脚返回目录的链接。
3. 在 `styles.css` 的 `:root` 修改主题颜色；字体使用系统字体。
4. 在 `script.js` 设置 `eventStartsAt`，保留明确的时区偏移。日期已过时显示全零，无效日期显示“date to be announced”。页面中展示的日期需要另外修改。
5. 准备上线时，将 `.register` 的点击逻辑接入自己的报名服务。当前弹窗**只是演示**，不收集个人资料，不处理报名或支付。
6. 发布前，检查修改后的内容在手机、桌面和键盘操作下是否正常。

日程与参会方式标签支持左右方向键、Home 和 End；手机菜单支持 Escape 关闭以及点击链接后关闭。问答使用原生 `details`，报名演示使用原生 `dialog`，遵循减少动态效果偏好。倒计时刻意不使用 ARIA 实时播报，避免每秒打断屏幕阅读器。

## 文件结构

```text
index.html                       模板集首页
README.md / README.zh-CN.md       英文 / 中文说明
templates/
  orbit-conference/
    index.html                   活动内容与独立绘制的内联 SVG
    styles.css                   响应式布局与主题变量
    script.js                    倒计时、导航、标签切换与演示弹窗
    template.json                模板元数据
    INSPIRATION.md               设计参考与实现边界
```

## 设计参考

Orbit 参考了 [GitHub Universe 首页](https://githubuniverse.com/)的视觉语言：超大黑色字体、浅灰绿色画布、鲜绿色强调、细网格线以及紧凑的活动信息。这是**独立实现**，不是提取的网页源码。Orbit 名称、文案、日程和几何 SVG 均为模板演示内容；不包含 GitHub 标志、照片或网站原文。Page Gems 与 GitHub 没有关联，也未获得其背书。

目前这个模板集以私有仓库准备，尚未选定开源许可证；公开开源前再明确对外复用条款。
