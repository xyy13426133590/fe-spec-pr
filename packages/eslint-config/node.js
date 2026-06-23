/*
 * @Author: 许云云 
 * @Date: 2026-06-23 16:33:42
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-23 16:33:49
 * @FilePath: /fe-spec-pr/packages/eslint-config/node.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  extends: [
    './index',
    './rules/node',
  ].map(require.resolve),
};