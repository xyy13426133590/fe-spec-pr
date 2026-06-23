/*
 * @Author: 许云云 
 * @Date: 2026-06-23 16:21:00
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-23 16:21:08
 * @FilePath: /fe-spec-pr/packages/eslint-config/rules/jsx-a11y.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 本文件的规则由 eslint-plugin-jsx-a11y 提供
 * @link https://github.com/evcohen/eslint-plugin-jsx-a11y
 */

module.exports = {
  plugins: ['jsx-a11y'],
  rules: {
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'jsx-a11y/aria-props': 'warn',
    'jsx-a11y/aria-proptypes': 'warn',
    'jsx-a11y/aria-unsupported-elements': 'warn',
    'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }], // ignoreNonDom 为 true 时不检查用户自定义元素
    'jsx-a11y/role-has-required-aria-props': 'warn',
    'jsx-a11y/role-supports-aria-props': 'warn',
    'jsx-a11y/iframe-has-title': 'warn',
    'jsx-a11y/no-access-key': 'warn',
    'jsx-a11y/no-distracting-elements': 'warn',
    'jsx-a11y/scope': 'warn',
  },
};
