/*
 * @Author: 许云云 
 * @Date: 2026-06-24 11:17:14
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-24 11:19:00
 * @FilePath: /fe-spec-pr/packages/eslint-plugin/configs/recommended.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Recommended ESLint configuration
module.exports = {
  plugins: ['xyy-eslint-plugin'],
  rules: {
    'xyy-eslint-plugin/no-secret-info': 'error',
    'xyy-eslint-plugin/no-js-in-ts-project': 'warn',
    'xyy-eslint-plugin/no-http-url': 'warn',
    'xyy-eslint-plugin/no-broad-semantic-versioning': 'error'
  },
};