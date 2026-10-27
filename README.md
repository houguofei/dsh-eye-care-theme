# dsh-eye-care-theme

[English](README.en.md) | **中文**

<img src="icon.svg" width="76" height="76" alt="dsh-eye-care-theme icon">

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（DSH）Web GUI 用的护眼主题。

DSH 原本只有「浅色 / 深色 / 跟随系统」三档。这个插件在结构不变的浅色主题之上加了一整套**暖色纸感配色**：去掉纯白的刺眼感，压掉蓝光，把强调色和状态色的饱和度一起降下来，长时间盯着对话和代码不那么累。它是一等公民的第三方主题（走 `ctx.theme.register`），不是往页面上糊一层滤镜。

## 特性

- **第三套外观**：`eye-care` 主题，`colorScheme: light`，覆盖 Harness 的 `--dsw-*` 设计 token，而不是改组件样式，所以设置、插件页、代码块、菜单、diff 都一起变暖。
- **两个入口**
  - 设置 → 通用 → **护眼模式**（紧跟「外观」下方）——一个显式开关，带说明文字；
  - 侧栏底部 → **眼睛图标**——一键切换，开启时瞳孔实心并染青绿，关闭时变回描边；侧栏折叠成轨道时自动换成 36px 尺寸。
- **不会丢状态**：开关状态和你开启前的原偏好（浅色 / 深色 / 跟随系统）存在本机 `localStorage`，刷新或重开窗口自动恢复。
- **不和内置外观打架**：你只要去「外观」里选浅色或深色，护眼模式立刻退出，两个入口永远一致。
- **随插件生命周期清理**：主题、样式、字典、槽位注册全部由 `ctx.effect` 持有，卸载插件即完整回退，不留残留 token。

## 安装

本仓库就是 DSH 的 bundle 包根（`package.json` 里的 `dsh.bundle.patch` + `dsh.client`）。

```bash
git clone https://github.com/houguofei/dsh-eye-care-theme
```

然后在 DSH 里把克隆下来的目录作为插件安装——对 agent 说「把 `<克隆路径>` 装成插件」，它会走插件管理器的 `install_bundle`，把这个 bundle 加进当前 profile。安装后刷新一次页面即可看到开关。

> 尚未发布到 npm。等发布后可以直接按包名 `dsh-eye-care-theme` 安装，无需克隆。

## 使用

- 点侧栏底部的眼睛图标，或进 设置 → 通用 → 护眼模式。
- 关闭护眼会回到你开启前的那个外观（比如原来是深色就回深色）。
- 卸载插件（插件管理器里的 `remove_bundle`）后，`localStorage` 里的两个键可以随手清掉：`dsh-eye-care:enabled`、`dsh-eye-care:previous`。

## 配色

| 用途 | token | 内置浅色 | 护眼 |
| --- | --- | --- | --- |
| 应用背景 | `--dsw-alias-bg-base` ← `--dsw-static-neutral-bluish-00` | `#ffffff` | `#fbf7ee` |
| 侧栏 | `--dsw-specific-sidebar-fill` | `#f9fafb` | `#f5efe2` |
| 模块 / 浮层底 | `--dsw-alias-bg-module-platform` | `#f5f6f7` | `#f1ebdd` |
| 主文字 | `--dsw-alias-label-primary` | `#0f1115` | `#23201a` |
| 次要文字 | `--dsw-alias-label-secondary` | `#61666b` | `#5e5747` |
| 链接 / 品牌点 | `--dsw-static-deepseek-500` | `#4176e6` | `#4a8177` |
| 代码块底 | `--dsw-alias-markdown-code-block` | `#f9fafb` | `#f5efe2` |
| 成功 | `--dsw-alias-state-success-primary` | `#22c55e` | `#4f9a68` |
| 错误 | `--dsw-alias-state-error-primary` | `#ec1313` | `#bf4b45` |

思路：Harness 的 alias 层几乎都从 `--dsw-static-*` 色阶取色，所以直接重写这些色阶（暖灰阶 + 柔化强调色 + 降饱和状态色）就能整站一致地变暖；再补上少数写死的 alias 值（菜单材质、边框 alpha、diff 底色）和代码高亮色，避免出现「米黄底 + 冷灰零件」的割裂。

## 实现要点

| 关注点 | 做法 |
| --- | --- |
| 主题注册 | `ctx.theme.register({ id: 'eye-care', colorScheme: 'light', tokens })`，随插件释放 |
| 设置入口 | `settings.general.item`，`id: 'eye-care'`，`order: 10.5` |
| 侧栏入口 | `sidebar.footer.action`，`id: 'eye-care'`，`order: 10`，按 ownerProps `wide` 切换尺寸 |
| 偏好持久化 | `localStorage`（第三方主题 id 不进 DSH 内置设置 schema） |
| 文案 | 通过 Client locale 服务注册 `zh` / `en` 字典 |

## 已知限制

- DSH 的内置 bootstrap 会先按已保存的浅色/深色画首屏，插件加载后才切到护眼，启动时会有一次很短的配色过渡。
- 偏好按浏览器存储；换浏览器或清站点数据后需要重新开启（内置的浅色/深色偏好不受影响）。
- 只改设计 token，组件里硬编码的颜色（个别图标、内嵌第三方内容）不会跟着变。
- 护眼是浅色系主题；在深色偏好下开启会明显变亮，属预期行为。

## 开发

```
client.js        浏览器半：主题 token 表、样式、两个槽位注册、localStorage 同步
index.js         Host 半：无运行时资源，仅占位
cordis.patch.yml bundle 补丁：插入 eye-care-theme 一行
package.json     bundle 清单（dsh.bundle.patch + dsh.client）
locale/          插件管理器里显示的标题与描述（zh / en）
icon.svg         插件图标
```

- 改配色：只动 `client.js` 顶部的 `TOKENS` 对象，键是 CSS 自定义属性名，值是单个 CSS 值（主题已经声明 `colorScheme: 'light'`，所以不需要 light/dark 成对值）。
- 语法自检：`node --check client.js && node --check index.js`。

## License

[MIT](LICENSE)
