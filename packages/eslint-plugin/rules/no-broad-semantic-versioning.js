/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 10:50:16
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-24 11:01:25
 * @FilePath: /fe-spec-pr/packages/eslint-plugin/rules/no-broad-semantic-versioning.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 禁止使用宽泛的语义化版本号

const path = require('path');

const RULE_NAME = 'no-broad-semantic-versioning';

module.exports = {
    name: RULE_NAME,
    meta: {
        type: 'problem',
        fixable: null,
        messages: {
            noBroadSemanticVersioning: 'The "{{dependencyName}}" is not recommended to use "{{versioning}}"',
        }
    },
    create(context) {
        if (path.basename(context.getFilename()) !== 'package.json') {
            return {};
        }

        const cwd = context.getCwd();

        return {
            Property: function handlerequires(node) {
                if (
                    node.key &&
                    node.key.value &&
                    (node.key.value === 'dependencies' || node.key.value === 'devDependencies') &&
                    node.value &&
                    node.value.properties
                ) {
                    node.value.properties.forEach((property) => {
                        if (property.key && property.key.value) {
                            const dependencyName = property.key.value;
                            const dependencyVersion = property.value.value;
                            if (
                                // *
                                dependencyVersion.indexOf('*') > -1 ||
                                // x.x
                                dependencyVersion.indexOf('x') > -1 ||
                                // > x
                                dependencyVersion.indexOf('>') > -1
                            ) {
                                context.report({
                                    loc: property.loc,
                                    messageId: 'noBroadSemanticVersioning',
                                    data: {
                                        dependencyName,
                                        versioning: dependencyVersion,
                                    },
                                });
                            }
                        }
                    });
                }
            }
        }
    }
}