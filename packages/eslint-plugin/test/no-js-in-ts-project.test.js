/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 11:07:51
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-24 11:08:04
 * @FilePath: /fe-spec-pr/packages/eslint-plugin/test/no-js-in-ts-project.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const rule = require('../rules/no-js-in-ts-project');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('no-js-in-ts-project', rule, {
  valid: [
    {
      filename: 'index.ts',
      code: '',
    },
    {
      filename: '.stylelintrc.js',
      code: '',
    },
    {
      filename: 'home.ts',
      code: '',
    },
  ],

  invalid: [
    {
      filename: 'home.js',
      code: '',
      errors: [
        {
          message: 'The "home.js" is not recommended in TS project',
        },
      ],
    },
  ],
});
