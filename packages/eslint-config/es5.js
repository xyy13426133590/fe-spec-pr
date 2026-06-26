/*
 * @Author: xuyunyun 
 * @Date: 2026-06-23 16:32:08
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-23 16:32:17
 * @FilePath: /fe-spec-pr/packages/eslint-config/es5.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  extends: [
    './rules/base/best-practices',
    './rules/base/possible-errors',
    './rules/base/style',
    './rules/base/variables',
    './rules/es5',
  ].map(require.resolve),
  root: true,
};