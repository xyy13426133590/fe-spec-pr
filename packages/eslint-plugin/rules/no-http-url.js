/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 10:20:38
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-24 10:33:41
 * @FilePath: /fe-spec-pr/packages/eslint-plugin/rules/no-http-url.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 禁止使用 HTTP URL

const RULE_NAME = 'no-http-url';

module.exports = {
    name: RULE_NAME,
    meta: {
        type: 'suggestion',
        fixable: null,
        messages: {
            noHttpUrl: 'Recommended "{{url}}" switch to HTTPS URLs'
        }
    },
    create(context) {
        return {
            // 检查字面量节点
            Literal(node) {
                if (node.value && typeof node.value === 'string' && node.value.startsWith('http://')) {
                    context.report({
                        node,
                        messageId: 'noHttpUrl',
                        data: {
                            url: node.value
                        }
                    });
                }
            }
        }
    }
}