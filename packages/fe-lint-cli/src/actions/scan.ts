/*
 * @Author: 许云云 
 * @Date: 2026-06-25 21:31:43
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-25 21:54:57
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/actions/scan.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE;
 */
import fs from 'fs-extra';
import path from 'path';
import { doESLint, doMarkdownlint, doPrettier, doStylelint } from '../lints';
import type { Config, PKG, ScanOptions, ScanReport, ScanResult } from '../types';
import { PKG_NAME } from '../utils/constants';

export default async (opts: ScanOptions): Promise<ScanReport> => {
    const { cwd, fix, outputReport, config: scanConfig } = opts;

    // 读取配置文件
    const readConfigFile = (pth: string): any => {
        const localPath = path.resolve(cwd, pth);
        return fs.existsSync(localPath) ? require(localPath) : {};
    };
    const pkg: PKG = readConfigFile('package.json');
    const config: Config = scanConfig || readConfigFile(`${PKG_NAME}.config.js`);
    const runErrors: Error[] = [];
    let results: ScanResult[] = [];

    // 运行 Prettier
    if (fix && config.enablePrettier) {
        await doPrettier(opts);
    }

    // eslint
    if (config.enableESLint) {
        try {
            const eslintresults = await doESLint({ ...opts, pkg, config });
            results = [...results, ...eslintresults];
        } catch (error: any) {
            runErrors.push(error);
        }
    }

    // stylelint
    if (config.enableStylelint) {
        try {
            const stylelintResults = await doStylelint({ ...opts, pkg, config });
            results = [...results, ...stylelintResults];
        } catch (error: any) {
            runErrors.push(error);
        }
    }

    // markdownlint
    if (config.enableMarkdownlint) {
        try {
            const markdownlintResults = await doMarkdownlint({ ...opts, pkg, config });
            results = [...results, ...markdownlintResults];
        } catch (error: any) {
            runErrors.push(error);
        }
    }

    // 输出报告
    if (outputReport) {
        const reportPath = path.resolve(process.cwd(), `./${PKG_NAME}-report.json`);
        fs.outputFile(reportPath, JSON.stringify({ results, runErrors }, null, 2), () => {});
    }

    return {
        results,
        errorCount: results.reduce((count, { errorCount }) => count + errorCount, 0),
        warningCount: results.reduce((count, { warningCount }) => count + warningCount, 0),
        runErrors
    }

}