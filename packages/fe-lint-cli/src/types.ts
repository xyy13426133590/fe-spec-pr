/*
 * @Author: 许云云 
 * @Date: 2026-06-24 21:23:08
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-25 15:13:27
 * @FilePath: /fe-spec-pr/packages/lint-cli/src/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * 
 */
import { ESLint } from 'eslint';
import type { LintResults as MarkdownlintLintResults, Options as MarkdownlintOptions } from 'markdownlint';
import type stylelint from 'stylelint';

/**
 * package.json 的简化类型
 * init 时会读写 dependencies / devDependencies / husky / scripts
 */
export interface PKG {
    name?: string;
    scripts?: Record<string, string>;
    husky?: {
        hooks?: Record<string, string>;
    },
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    eslintConfig?: unknown;
    eslintIgnore?: string[];
    stylelint?: unknown;
    [key: string]: unknown;
}

/**
 * init options
*/
export interface InitOptions {
    // 项目根目录，默认process.cwd()
    cwd: string;
    // 是否检查并升级 fe-lint-cli 的版本
    checkVersionUpdate: boolean;
    // 是否需要自动重写 init 配置
    rewriteConfig?: boolean;
    // eslint 类型
    eslintType?: string;
    // 是否启用 ESLint
    enableESLint?: boolean;
    // 是否启用 Stylelint
    enableStylelint?: boolean;
    // 是否启用 Markdownlint
    enableMarkdownlint?: boolean;
    // 是否启用 Prettier
    enablePrettier?: boolean;
    // 是否禁用自动在初始化完成后安装依赖
    disableNpmInstall?: boolean;
}

/**
 * scan / fix 时读取的用户配置
*/
export interface Config {
    // 是否启用 ESLint
    enableESLint?: boolean;
    // 是否启用 stylelint
    enableStylelint?: boolean;
    // 是否启用 markdown lint
    enableMarkdownlint?: boolean;
    // 是否启用 prettier
    enablePrettier?: boolean;
    // ESLint 配置项（eslintrc 老 API）
    eslintOptions?: ESLint.LegacyOptions;
    // stylelint 配置项
    stylelintOptions?: stylelint.LinterOptions;
    // markdownlint 配置项
    markdownlintOptions?: MarkdownlintOptions;
}

/**
 * scan / fix 时的选项
*/
export interface ScanOptions {
    cwd: string;
    include: string;
    files?: string[];
    quiet?: boolean;
    ignore?: boolean;
    fix?: boolean;
    outputReport?: boolean;
    config?: Config;
}

/**
 * 单文件 lint 结果（由各 format*Results 产出）
 */
export interface ScanResult {
    filePath: string;
    errorCount: number;
    warningCount: number;
    fixableErrorCount: number;
    fixableWarningCount: number;
    messages: Array<{
        line: number;
        column: number;
        rule: string;
        url: string;
        message: string;
        errored: boolean;
    }>;
}

export interface ScanReport {
    results: ScanResult[];
    errorCount: number;
    warningCount: number;
    runErrors: Error[];
}

export interface IGetLintConfig {
  (options: ScanOptions, pkg: PKG, config: Config): ESLint.LegacyOptions;

  (options: ScanOptions, pkg: PKG, config: Config): stylelint.LinterOptions;

  (options: ScanOptions, pkg: PKG, config: Config): MarkdownlintOptions;
}

export interface IFormatResults {
  (results: ESLint.LintResult[], quiet: boolean): ScanResult[];
  (results: stylelint.LintResult[], quiet: boolean): ScanResult[];
  (results: MarkdownlintLintResults, quiet: boolean): ScanResult[];
}