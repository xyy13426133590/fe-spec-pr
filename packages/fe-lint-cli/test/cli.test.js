const path = require('path');
const fs = require('fs-extra');
const { execSync } = require('child_process');
const packageJson = require('../package.json');

const cliPath = path.resolve(__dirname, '../lib/cli.js');

const cli = (args, options = {}) => {
  const { cwd, env } = options;
  return execSync(`node "${cliPath}" ${args.join(' ')}`, {
    cwd,
    env: { ...process.env, ...env },
    encoding: 'utf-8',
  }).trim();
};

test('--version should output right version', () => {
  expect(cli(['--version'])).toBe(packageJson.version);
});

describe("'fix' command", () => {
  const dir = path.resolve(__dirname, './fixtures/autofix');
  const outputFilePath = path.resolve(dir, './temp/temp.js');
  const errorFileContent = fs.readFileSync(path.resolve(dir, './semi-error.js'), 'utf8');
  const expectedFileContent = fs.readFileSync(path.resolve(dir, './semi-expected.js'), 'utf8');

  beforeEach(() => {
    fs.outputFileSync(outputFilePath, errorFileContent, 'utf8');
  });

  test('should autofix problematic code', () => {
    cli(['fix'], { cwd: dir });
    expect(fs.readFileSync(outputFilePath, 'utf8')).toEqual(expectedFileContent);
  });

  afterEach(() => {
    fs.removeSync(path.resolve(dir, './temp'));
  });
});
