/*
 * @Author: 许云云 
 * @Date: 2026-06-24 10:57:29
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-24 10:59:51
 * @FilePath: /fe-spec-pr/packages/eslint-plugin/test/no-broad-semantic-versioning.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const rule = require('../rules/no-broad-semantic-versioning');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('no-broad-semantic-versioning', rule, {
  valid: [
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'encode-fe-eslint-plugin': '^0.0.5' },
      })}`,
    },
    {
      filename: 'package.js',
      code: 'var t = 1',
    },
  ],

  invalid: [
    {
      filename: 'package.json',
      code: `module.exports = ${JSON.stringify({
        devDependencies: { 'encode-fe-eslint-plugin': '*' },
      })}`,
      errors: [
        {
          message: 'The "encode-fe-eslint-plugin" is not recommended to use "*"',
        },
      ],
    },
  ],
});
