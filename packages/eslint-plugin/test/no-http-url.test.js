/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 10:34:10
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-24 10:38:28
 * @FilePath: /fe-spec-pr/packages/eslint-plugin/test/no-http-url.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const rule = require('../rules/no-http-url');
const { RuleTester }  = require('eslint');

const ruleTester = new RuleTester();

ruleTester.run('no-http-url', rule, {
    valid: [
        {
            code: 'var url = "https://example.com";'
        }
    ],
    invalid: [
        {
            code: 'var url = "http://example.com";',
            output: 'var url = "http://example.com";',
            errors: [
                {
                    messageId: 'noHttpUrl',
                    data: {
                        url: 'http://example.com'
                    }
                }
            ]
        }
    ]
});