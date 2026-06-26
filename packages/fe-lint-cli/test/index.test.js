const path = require('path');
const fs = require('fs-extra');
const { init } = require('../lib/index');

describe('init', () => {
  const templatePath = path.resolve(__dirname, './fixtures/template/init');
  const outputPath = path.resolve(__dirname, './fixtures/template/temp');

  beforeEach(() => {
    fs.copySync(templatePath, outputPath);
  });

  test('node api init should work as expected', async () => {
    await init({
      cwd: outputPath,
      checkVersionUpdate: false,
      eslintType: 'index',
      enableStylelint: true,
      enableMarkdownlint: true,
      enablePrettier: true,
      disableNpmInstall: true,
    });

    const pkg = require(`${outputPath}/package.json`);

    expect(pkg.scripts['fe-lint-cli-scan']).toBe('fe-lint-cli scan');
    expect(pkg.scripts['fe-lint-cli-fix']).toBe('fe-lint-cli fix');
    expect(pkg.scripts.prepare).toBe('husky');
    // Husky 9: 钩子写入 .husky/ 文件，不再使用 pkg.husky.hooks
    expect(fs.existsSync(path.join(outputPath, '.husky', 'pre-commit'))).toBe(true);
    expect(fs.existsSync(path.join(outputPath, '.husky', 'commit-msg'))).toBe(true);
    expect(fs.readFileSync(path.join(outputPath, '.husky', 'pre-commit'), 'utf8').trim()).toBe('fe-lint-cli commit-file-scan');
    expect(fs.readFileSync(path.join(outputPath, '.husky', 'commit-msg'), 'utf8').trim()).toBe('fe-lint-cli commit-msg-scan "$1"');
    expect(fs.existsSync(path.join(outputPath, '.eslintrc.js'))).toBe(true);
    expect(fs.existsSync(path.join(outputPath, 'fe-lint-cli.config.js'))).toBe(true);
  });

  afterEach(() => {
    fs.removeSync(outputPath);
  });
});
