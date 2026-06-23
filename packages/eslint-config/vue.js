/*
 * @Author: 许云云 
 * @Date: 2026-06-23 16:35:09
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-23 16:35:20
 * @FilePath: /fe-spec-pr/packages/eslint-config/vue.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  extends: [
    './index',
    './rules/vue',
  ].map(require.resolve),
  parserOptions: {
    // https://github.com/mysticatea/vue-eslint-parser#parseroptionsparser
    parser: '@babel/eslint-parser',
  },
};