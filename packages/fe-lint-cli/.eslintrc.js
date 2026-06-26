/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 21:14:28
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-24 21:17:15
 * @FilePath: /fe-spec-pr/packages/lint-cli/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    extends: ['xyy-eslint-config/typescript/node', 'prettier'],
    rules: {
        '@typescript-eslint/no-require-imports': 0,
        'no-console': 0
    }
}