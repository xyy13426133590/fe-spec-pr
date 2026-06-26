# fe-lint-cli

> 前端编码规范工程化脚手架，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡点。

## 安装

```sh
npm install fe-lint-cli --save-dev
# 或全局安装
npm install fe-lint-cli -g
```

## CLI 命令

| 命令 | 说明 |
|------|------|
| `fe-lint-cli init` | 一键接入：初始化规范工具和配置 |
| `fe-lint-cli scan` | 一键扫描：对项目进行代码规范问题扫描 |
| `fe-lint-cli fix` | 一键修复：自动修复可修复的规范问题 |
| `fe-lint-cli update` | 升级 fe-lint-cli 至最新版本 |
| `fe-lint-cli commit-file-scan` | git commit 时扫描提交文件（由 Husky 钩子调用） |
| `fe-lint-cli commit-msg-scan` | git commit 时检查 commit message（由 Husky 钩子调用） |

## 快速上手

在项目根目录执行 `init` 命令，按照提示完成配置：

```sh
fe-lint-cli init
```

init 会自动完成以下操作：

1. 检测并解决已有 lint 配置冲突
2. 安装 `fe-lint-cli` 到 devDependencies
3. 在 `package.json` 中写入 `fe-lint-cli-scan` / `fe-lint-cli-fix` 脚本
4. 生成 `.husky/pre-commit` 和 `.husky/commit-msg` 钩子文件（Husky 9）
5. 生成 `.eslintrc.js`、`.stylelintrc.js`、`.markdownlint.json`、`fe-lint-cli.config.js` 等配置文件

## 配置文件

init 完成后会在项目根目录生成 `fe-lint-cli.config.js`：

```js
module.exports = {
  enableESLint: true,        // 是否启用 ESLint
  enableStylelint: true,     // 是否启用 Stylelint
  enableMarkdownlint: true,  // 是否启用 Markdownlint
  enablePrettier: false,     // 是否启用 Prettier
};
```

## Node.js API

```js
const { init, scan } = require('fe-lint-cli');

// 初始化
await init({
  cwd: process.cwd(),
  eslintType: 'typescript',
  enableStylelint: true,
  enableMarkdownlint: true,
  enablePrettier: false,
  disableNpmInstall: false,
});

// 扫描
const report = await scan({
  cwd: process.cwd(),
  include: process.cwd(),
  quiet: false,
});
console.log(report.errorCount, report.warningCount);
```

## 配套规范包

| 包名 | 说明 |
|------|------|
| [xyy-eslint-config](https://www.npmjs.com/package/xyy-eslint-config) | ESLint 规范配置 |
| [xyy-eslint-plugin](https://www.npmjs.com/package/xyy-eslint-plugin) | 自定义 ESLint 插件 |
| [xyy-stylelint-config](https://www.npmjs.com/package/xyy-stylelint-config) | Stylelint 规范配置 |
| [xyy-markdownlint-config](https://www.npmjs.com/package/xyy-markdownlint-config) | Markdownlint 规范配置 |
| [xyy-commitlint-config](https://www.npmjs.com/package/xyy-commitlint-config) | Commitlint 规范配置 |
