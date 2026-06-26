/*
 * @Author: xuyunyun 
 * @Date: 2026-06-25 11:14:41
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-25 14:34:53
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/utils/generate-template.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path';
import fs from 'fs-extra';
import { globSync } from 'glob';
import _ from 'lodash';
import ejs from 'ejs';
import { ESLINT_IGNORE_PATTERN, STYLELINT_IGNORE_PATTERN, STYLELINT_FILE_EXT,
    MARKDOWN_IGNORE_PATTERN
 } from './constants';


/**
 * vscode 配置合并
 * @param filepath - VS Code 配置文件的路径
 * @param content - 新的 VS Code 配置内容
 * @returns 合并后的 VS Code 配置内容
 */
const mergeVSCodeConfig = (filepath: string, content: string) => {
    // 不需要merge
    if(!fs.existsSync(filepath)) {
        return content;
    }

    try {
        const targetData = fs.readJSONSync(filepath);
        const sourceData = JSON.parse(content);
        return JSON.stringify(_.mergeWith(targetData, sourceData, (target, source) => {
            if (_.isArray(target) && _.isArray(source)) {
                return [...new Set([...target, ...source])];
            }
        }), null, 2);   
    } catch (error) {
        return '';
    }

}

 /**
  * 将config 目录下的所有 .ejs 渲染到用户项目
  * @param cwd - 用户项目的根目录
  * @param data - 传递给 EJS 模板的数据. data init 问答结果 { eslintType, enablePrettier, ... }
  * @param vscode - 是否生成 VS Code 配置
 */
 export default (cwd: string, data: Record<string, unknown>, vscode?: boolean) => {
    // 编译后 __dirname 指向 lib/utils，模板在 lib/config
    const templatePath = path.resolve(__dirname, '../config');
    const templates = globSync(`${ vscode ? '.vscode/' : '' }**/*.ejs`, { cwd: templatePath });

    for(const name of templates) {
        const filepath = path.resolve(cwd, name.replace(/\.ejs$/, '').replace(/^_/, '.'));

        let content = ejs.render(fs.readFileSync(path.resolve(templatePath, name), 'utf-8'), {
            eslintIgnores: ESLINT_IGNORE_PATTERN,
            stylelintExt: STYLELINT_FILE_EXT,
            stylelintIgnores: STYLELINT_IGNORE_PATTERN,
            markdownLintIgnores: MARKDOWN_IGNORE_PATTERN,
            ...data
        });

        // 合并 vscode config
        if(/^_vscode/.test(name)) {
            content = mergeVSCodeConfig(filepath, content);
        }

        // 跳过空文件
        if(!content.trim()) {
            continue;
        }

        fs.outputFileSync(filepath, content, 'utf-8');
    }
 }