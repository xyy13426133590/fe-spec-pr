import fs from 'fs-extra';
import { globSync } from 'glob';
import path from 'path';
import type { LinterOptions } from 'stylelint';
import type { Config, PKG, ScanOptions } from '../../types';
import { STYLELINT_IGNORE_PATTERN } from '../../utils/constants';

/**
 * 获取 Stylelint 配置
 */
export function getStylelintConfig(
  opts: ScanOptions,
  pkg: PKG,
  config: Config,
): LinterOptions {
  const { cwd, fix } = opts;
  if (config.enableStylelint === false) return {};

  const lintConfig: LinterOptions = {
    fix: Boolean(fix),
    allowEmptyInput: true,
  };

  if (config.stylelintOptions) {
    Object.assign(lintConfig, config.stylelintOptions);
  } else {
    const lintConfigFiles = globSync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd });
    if (lintConfigFiles.length === 0 && !pkg.stylelint) {
      lintConfig.config = {
        extends: 'xyy-stylelint-config',
      };
    }

    const ignoreFilePath = path.resolve(cwd, '.stylelintignore');
    if (!fs.existsSync(ignoreFilePath)) {
      lintConfig.ignorePattern = STYLELINT_IGNORE_PATTERN;
    }
  }

  return lintConfig;
}
