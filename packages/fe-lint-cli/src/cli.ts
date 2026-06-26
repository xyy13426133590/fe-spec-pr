#!/usr/bin/env node
/*
 * @Author: xuyunyun 
 * @Date: 2026-06-25 13:56:33
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-25 22:10:04
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/cli.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { program } from 'commander';
import path from 'path';
import init from './actions/init';
import update from './actions/update';
import generateTemplate from './utils/generate-template';
import scan from './actions/scan';
import printReport from './utils/print-report';
import log from './utils/log';
import ora from 'ora';
import { getCommitFiles, getAmendFiles } from './utils/git';
import spawn from 'cross-spawn';
import { execSync } from 'child_process';
import { globSync } from 'glob';
import fs from 'fs-extra';
import npmType from './utils/npm-type';
import { PKG_VERSION, PKG_NAME } from './utils/constants';

const cwd = process.cwd();

/** 有 lint 配置但没 node_modules 时自动 install */
const installDepsIfThereNo = async () => {
    const lintConfigFiles: string[] = [
        ...globSync('.eslintrc?(.@(js|yaml|yml|json))', { cwd }),
        ...globSync('.stylelintrc?(.@(js|yaml|yml|json))', { cwd }),
        ...globSync('.markdownlint(.@(yaml|yml|json))', { cwd }),
    ];
    const nodeModulesPath = path.resolve(cwd, 'node_modules');

    if (!fs.existsSync(nodeModulesPath) && lintConfigFiles.length > 0) {
        const npm = await npmType;
        log.info(`使用项目 Lint 配置，检测到项目未安装依赖，将进行安装（执行 ${npm} install）`);
        execSync(`cd ${cwd} && ${npm} i`, { stdio: 'inherit' });
    }
};

program
    .version(PKG_VERSION)
    .description(`${PKG_VERSION} 是前端编码规范工程化 的配套 Lint 工具，提供简单的 CLI 和 Node.js API，让项目能够一键接入、一键扫描、一键修复、一键升级，并为项目配置 git commit 卡点，降低项目实施规范的成本`);

program
    .command('init')
    .description('一键接入：为项目初始化规范工具和配置，可以根据项目类型和需求进行定制')
    .option('--vscode', '写入.vscode/setting.json配置')
    .action(async (cmd) => {
        if (cmd.vscode) {
            const configPath = path.resolve(cwd, `${PKG_NAME}.config.js`);
            generateTemplate(cwd, require(configPath), true);

        } else {
            await init({
                cwd,
                checkVersionUpdate: true
            });
        }
    });


program
    .command('scan')
    .option('-q, --quiet', '仅报告 error')
    .option('-o, --output-report', '输出 JSON 报告')
    .option('-i, --include <dir>', '扫描目录')
    .action(async (cmd) => {
        await installDepsIfThereNo();
        const checking = ora();
        checking.start(`执行 ${PKG_NAME} 代码检查`);
        const report = await scan({
            cwd,
            fix: false,
            include: cmd.include || cwd,
            quiet: Boolean(cmd.quiet),
            outputReport: Boolean(cmd.outputReport),
        });
        checking[report.errorCount > 0 ? 'fail' : report.warningCount > 0 ? 'warn' : 'succeed']();
        if (report.results.length) printReport(report.results, false);
        report.runErrors.forEach((e) => console.error(e));
        if (report.errorCount > 0) process.exitCode = 1;
    });

program
    .command('fix')
    .option('-i, --include <dir>', '修复目录')
    .action(async (cmd) => {
        await installDepsIfThereNo();
        const checking = ora();
        checking.start(`执行 ${PKG_NAME} 代码修复`);
        const { results } = await scan({ cwd, fix: true, include: cmd.include || cwd });
        checking.succeed();
        if (results.length) printReport(results, true);
    });

program
    .command('commit-file-scan')
    .option('-s, --strict', 'warning 也阻断提交')
    .action(async (cmd) => {
        await installDepsIfThereNo();
        const unstaged = await getAmendFiles({ cwd });
        if (unstaged) log.warn(`未 add 的改动:\n${unstaged}`);

        const checking = ora();
        checking.start('commit 文件检查');
        const files = await getCommitFiles({ cwd });
        const report = await scan({ cwd, include: cwd, files, quiet: !cmd.strict });
        if (report.errorCount > 0 || (cmd.strict && report.warningCount > 0)) {
            checking.fail();
            printReport(report.results, false);
            process.exit(1);
        }
        checking.succeed();
    });

program
    .command('commit-msg-scan')
    .argument('[msgPath]', 'Git commit message 文件路径（由 Husky 钩子传入 $1）')
    .action((msgPath: string) => {
        // Husky 9 通过 $1 传入 commit message 文件路径（通常为 .git/COMMIT_EDITMSG）
        const editPath = msgPath || process.env.HUSKY_GIT_PARAMS || '.git/COMMIT_EDITMSG';
        const r = spawn.sync('commitlint', ['--edit', editPath], { stdio: 'inherit' });
        if (r.status !== 0) process.exit(r.status || 1);
    });


program
    .command('update')
    .description(`更新 ${PKG_NAME} 至最新版本`)
    .action(() => {
        update(true);
    });

program.parse(process.argv);
