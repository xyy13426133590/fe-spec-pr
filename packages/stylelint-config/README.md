<!--
 * @Author: 许云云 
 * @Date: 2026-06-23 12:21:34
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-23 14:27:42
 * @FilePath: /fe-spec-pr/packages/stylelint-config/README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `xyy-stylelint-config`

支持配套的 [stylelint 可共享配置](https://stylelint.io/user-guide/configure)。

## 安装

需要先自行安装 [stylelint](https://www.npmjs.com/package/stylelint) 和 [stylelint-scss](https://www.npmjs.com/package/stylelint-scss) 

```bash
npm install stylelint stylelint-scss --save-dev
```

## 使用

在 `.stylelintrc` 中继承本包

```json
{
    "extends": "./packages/stylelint-config/index.js"
}
```