/*
 * @Author: 许云云 
 * @Date: 2026-06-25 19:44:54
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-25 20:06:16
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/lints/eslint/getESLintConfigTYpe.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { globSync } from 'glob';
import type { PKG } from '../../types';

/**
 * 获取 ESLint 配置类型
 * 扫描项目文件 + package.json 依赖，推断 extends 路径
 * @param pkg - 包信息
 * @param cwd - 当前工作目录
 * @returns xyy-eslint-config/index
 * @returns xyy-eslint-config/react
 * @returns xyy-eslint-config/typescript/index
 * @returns xyy-eslint-config/typescript/react
 */
export function getESLintConfigType(pkg: PKG, cwd: string): string {
    const tsFiles = globSync('./!(node_modules)/**/*.@(ts|tsx)', { cwd });
    const reactFiles = globSync('./!(node_modules)/**/*.@(jsx|tsx)', { cwd });
    const vueFiles = globSync('./!(node_modules)/**/*.vue', { cwd });  
    const dependencies = Object.keys(pkg.dependencies || {});
    const language = tsFiles.length > 0 ? 'typescript' : '';
    let dsl = '';

    // dsl判断
    if (reactFiles.length > 0 || dependencies.some(name => /^react(-|$)/.test(name))) {   
        dsl = 'react';
    }else if (vueFiles.length > 0 || dependencies.some(name => /^vue(-|$)/.test(name))) {
        dsl = 'vue';
    } else if (dependencies.some((name) => /^rax(-|$)/.test(name))) {
        dsl = 'rax';
    }
    return (
        'xyy-eslint-config/' +
        `${language}/${dsl}`.replace(/\/$/, '/index').replace(/^\//, '')
    );
}  