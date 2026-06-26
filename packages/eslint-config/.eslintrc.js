/*
 * @Author: xuyunyun 
 * @Date: 2026-06-23 16:05:56
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-23 16:07:37
 * @FilePath: /fe-spec-pr/packages/eslint-config/.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
    extends: ['./index'].map(require.resolve)
}