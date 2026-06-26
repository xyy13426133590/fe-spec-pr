/*
 * @Author: xuyunyun 
 * @Date: 2026-06-25 20:47:39
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-25 21:24:43
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/lints/eslint/formatESLintResults.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LegacyESLint } from 'eslint/use-at-your-own-risk';
import type { ESLint } from 'eslint';
import type { ScanResult } from '../../types';

/**
 * 格式化 ESLint 检查结果
 * @param results - ESLint 检查结果
 * @param quiet - 是否只报告错误信息
 * @param eslint - ESLint 实例
 * @returns 格式化后的检查结果 统一输出格式
 */
export function formatESLintResults(
    results: ESLint.LintResult[],
    quiet: boolean,
    eslint: LegacyESLint,
): ScanResult[] {
    const rulesMeta = eslint.getRulesMetaForResults(results);
    return results
        .filter(({ warningCount, errorCount }) => errorCount || warningCount)
        .map(({ filePath, messages, errorCount, warningCount, fixableErrorCount, fixableWarningCount }) => ({
            filePath,
            errorCount, 
            warningCount : quiet ? 0 : warningCount,
            fixableErrorCount,
            fixableWarningCount: quiet ? 0 : fixableWarningCount,
            // 格式化消息
            messages: messages.map(({ line = 0, column = 0, ruleId, message, fatal, severity }) => ({
                line,
                column,
                rule: ruleId,
                url: rulesMeta[ruleId]?.docs?.url || '',
                message: message.replace(/([^ ])\.$/u, '$1'),
                errored: fatal || severity === 2
            }))
            .filter(({ errored }) => quiet ? errored : true)
        }))

}