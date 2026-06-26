/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 10:14:02
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-24 10:19:38
 * @FilePath: /fe-spec-pr/packages/eslint-plugin/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const requireAll = require('require-all');

exports.rules = requireAll({
    dirname: path.resolve(__dirname, 'rules')
});

exports.configs = requireAll({
    dirname: path.resolve(__dirname, 'configs')
});

exports.processors = {
    '.json': {
        preprocess: (text) => {
            // Convert JSON to JavaScript object
            return [`module.exports = ${text};`];
        },
    }
}