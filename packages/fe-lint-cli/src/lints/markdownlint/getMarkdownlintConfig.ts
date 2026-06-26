import path from 'path';
import { globSync } from 'glob';
import type { Options as MarkdownlintOptions } from 'markdownlint';
import { readConfigSync } from 'markdownlint/sync';
import markdownLintConfig from 'xyy-markdownlint-config';
import type { Config, PKG, ScanOptions } from '../../types';

type LintOptions = MarkdownlintOptions & { fix?: boolean };

/**
 * 获取 Markdownlint 配置
 */
export function getMarkdownlintConfig(opts: ScanOptions, pkg: PKG, config: Config): LintOptions {
  const { cwd } = opts;
  const lintConfig: LintOptions = {
    fix: Boolean(opts.fix),
    resultVersion: 3,
  };

  if (config.markdownlintOptions) {
    Object.assign(lintConfig, config.markdownlintOptions);
  } else {
    const lintConfigFiles = globSync('.markdownlint(.@(yaml|yml|json))', { cwd });
    if (lintConfigFiles.length === 0) {
      lintConfig.config = markdownLintConfig;
    } else {
      lintConfig.config = readConfigSync(path.resolve(cwd, lintConfigFiles[0]));
    }
  }

  return lintConfig;
}
