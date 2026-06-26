/*
 * @Author: 许云云 
 * @Date: 2026-06-25 20:07:18
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-25 20:34:26
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/lints/eslint/getESLintConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ESLint } from 'eslint';
import fs from 'fs-extra';
import { globSync } from 'glob';
import path from 'path';
import type { Config, PKG, ScanOptions } from '../../types';
import { ESLINT_FILE_EXT } from '../../utils/constants';
import { getESLintConfigType } from './getESLintConfigType';

/**
 * 获取 ESLint 配置
 * @param opts - 扫描选项
 * @param pkg - 包信息
 * @param config - 配置信息
 * @returns ESLint 配置（eslintrc 老 API，对应 @types/eslint@9 的 LegacyOptions）
 */
export function getESLintConfig(opts: ScanOptions, pkg: PKG, config: Config): ESLint.LegacyOptions {
    const { cwd, fix, ignore } = opts;
    const lintConfig: ESLint.LegacyOptions = {
        cwd,
        fix,
        ignore,
        extensions: ESLINT_FILE_EXT,
        errorOnUnmatchedPattern: false,
    };
    if (config.eslintOptions) {
        // 若用户传入了eslintOptions，则用用户的
        Object.assign(lintConfig, config.eslintOptions);
    } else {
        // 根据扫描目录下有无lintrc文件，若无则使用默认的lint配置
        const lintConfigFiles = globSync('.eslintrc?(.@(js|yaml|yml|json))', { cwd });
        if (lintConfigFiles.length === 0 && !pkg.eslintConfig) {
            // 如果没有找到lint配置文件，且包中也没有配置，则使用默认的lint配置
            lintConfig.resolvePluginsRelativeTo = path.resolve(__dirname, '../..');
            lintConfig.useEslintrc = false;
            lintConfig.baseConfig = {
                extends: [
                    getESLintConfigType(pkg, cwd),
                    // eslint 不再管格式化问题，直接使用 prettier 进行格式化
                    ...(config.enablePrettier ? ['prettier'] : []),
                ],
            };
        }

        // 根据扫描目录下有无lintignore文件，若无则使用默认的 ignore配置
        const lintIgnoreFile = path.resolve(cwd, '.eslintignore');
        if (!fs.existsSync(lintIgnoreFile) && !pkg.eslintIgnore) {
            // 如果没有找到lintignore文件，则使用默认的ignore配置
            lintConfig.ignorePath = path.resolve(__dirname, '../config/_eslintignore.ejs');
        }
    }
    return lintConfig;
}