declare module 'markdownlint' {
  export interface LintError {
    lineNumber: number;
    ruleNames: string[];
    ruleDescription: string;
    ruleInformation: string;
    errorDetail: string | null;
    errorContext: string | null;
    errorRange: [number, number] | null;
    fixInfo: unknown;
    severity: string;
  }

  export type LintResults = Record<string, LintError[]>;

  export interface Options {
    config?: unknown;
    customRules?: unknown;
    files?: string[];
    frontMatter?: unknown;
    handleRuleFailures?: boolean;
    markdownItFactory?: unknown;
    noInlineConfig?: boolean;
    resultVersion?: number;
  }

  export function applyFixes(input: string, fixes: LintError[]): string;
}

declare module 'markdownlint/promise' {
  import type { LintResults, Options } from 'markdownlint';

  export function lint(options: Options): Promise<LintResults>;
}

declare module 'markdownlint/sync' {
  import type { LintResults, Options } from 'markdownlint';

  export function lint(options: Options): LintResults;
  export function readConfigSync(configPath: string): unknown;
}

declare module 'stylelint' {
  export interface LinterOptions {
    cwd?: string;
    config?: unknown;
    configFile?: string;
    configBasedir?: string;
    ignoreDisables?: boolean;
    ignorePath?: string;
    ignorePattern?: string[];
    allowEmptyInput?: boolean;
    reportNeedlessDisables?: boolean;
    fix?: boolean;
    files?: string | string[];
    [key: string]: unknown;
  }

  export interface Warning {
    line: number;
    column: number;
    rule: string;
    severity: string;
    text: string;
  }

  export interface LintResult {
    source?: string;
    warnings: Warning[];
    deprecations: unknown[];
    invalidOptionWarnings: unknown[];
    parseErrors: unknown[];
    errored?: boolean;
    ignored?: boolean;
  }

  export interface LinterResult {
    results: LintResult[];
    report: string;
    errored: boolean;
  }

  export function lint(options: LinterOptions): Promise<LinterResult>;
}
