/*
 * @Author: 许云云 
 * @Date: 2026-06-24 11:05:27
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-24 11:05:37
 * @FilePath: /fe-spec-pr/packages/eslint-plugin/rules/no-js-in-ts-project.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');

const RULE_NAME = 'no-js-in-ts-project';

const JS_REG = /\.jsx?$/;

const DEFAULT_WHITE_LIST = [
  'commitlint.config.js',
  'eslintrc.js',
  'prettierrc.js',
  'stylelintrc.js',
];

module.exports = {
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    fixable: null,
    messages: {
      noJSInTSProject: 'The "{{fileName}}" is not recommended in TS project',
    },
  },

  create(context) {
    const fileName = context.getFilename();
    const extName = path.extname(fileName);
    const ruleOptions = context.options[0] || {};
    let { whiteList = [], autoMerge = true } = ruleOptions;
    if (whiteList.length === 0) {
      whiteList = DEFAULT_WHITE_LIST;
    } else if (autoMerge) {
      whiteList = [...new Set([...DEFAULT_WHITE_LIST, ...whiteList])];
    }
    const whiteListReg = new RegExp(`(${whiteList.join('|')})$`);

    if (!whiteListReg.test(fileName) && JS_REG.test(extName)) {
      context.report({
        loc: {
          start: {
            line: 0,
            column: 0,
          },
          end: {
            line: 0,
            column: 0,
          },
        },
        messageId: 'noJSInTSProject',
        data: {
          fileName,
        },
      });
    }

    // Necessary
    return {};
  },
};
