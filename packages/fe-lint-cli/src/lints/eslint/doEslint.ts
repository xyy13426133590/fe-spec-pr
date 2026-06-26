/*
 * @Author: xuyunyun 
 * @Date: 2026-06-25 20:45:40
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-25 21:07:05
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/lints/eslint/doEslint.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LegacyESLint } from 'eslint/use-at-your-own-risk';
import fg from 'fast-glob';
import { extname, join } from 'path';
import { Config, PKG, ScanOptions } from '../../types';
import { ESLINT_FILE_EXT, ESLINT_IGNORE_PATTERN } from '../../utils/constants';
import { formatESLintResults } from './formatESLintResults';
import { getESLintConfig } from './getESLintConfig';

/**
 * 执行 ESLint 检查
*/
export interface DoESLintOptions extends ScanOptions {
    config: Config;
    pkg: PKG;
}

/**
 * 执行 ESLint 检查
 * @param opts - 检查选项
 * @returns 检查结果 
 */
export async function doESLint(opts: DoESLintOptions) {
    let files: string[];
    if (opts.files) {
        // 过滤出符合 ESLint 文件扩展名的文件
        files = opts.files.filter((file) => ESLINT_FILE_EXT.includes(extname(file)));
    } else {
        // 递归查找所有符合 ESLint 文件扩展名的文件
        files = await fg(`**/*.{${ESLINT_FILE_EXT.map((t) => t.replace(/^\./, '')).join(',')}}`, {
            cwd: opts.cwd,
            ignore: ESLINT_IGNORE_PATTERN,
        });
    }
    // 初始化 ESLint
    const eslint = new LegacyESLint(getESLintConfig(opts, opts.pkg, opts.config));
    const reports = await eslint.lintFiles(files);
    if(opts.fix) {
        // 
        await LegacyESLint.outputFixes(reports);
    }

    // 格式化 ESLint 检查结果
    return formatESLintResults(reports, opts.quiet, eslint);
}