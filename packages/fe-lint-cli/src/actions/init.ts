/*
 * @Author: xuyunyun 
 * @Date: 2026-06-25 12:24:12
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-25 14:29:05
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/actions/init.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import spawn from 'cross-spawn';
import update from './update';
import npmType from '../utils/npm-type';
import log from '../utils/log';
import conflictResolve from '../utils/conflict-resolve';
import generateTemplate from '../utils/generate-template';
import { PROJECT_TYPES, PKG_NAME } from '../utils/constants';
import type { InitOptions, PKG } from '../types';

let step = 0;

/**
 * 选择项目语言和框架
 * */ 
const chooseEslintType = async (): Promise<string> => {
    const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: `Step ${++step}. 请选择项目语言（JS/TS）和框架（React/Vue）类型`,
        choices: PROJECT_TYPES
    });
    return type;
}

/**
 * 选择是否启用 stylelint
 * @param defaultValue 默认值
 * @returns 是否启用
 */
const chooseEnableStylelint = async (defaultValue: boolean): Promise<boolean> => {
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `Step ${++step}. 是否需要使用 stylelint（若没有样式文件则不需要）`,
        default: defaultValue
    });
    return enable;
}

/**
 * 选择是否启用 markdownlint
 * @returns 是否启用
 */
const chooseEnableMarkdownlint = async (): Promise<boolean> => {  
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `Step ${++step}. 是否需要使用 markdownlint（若没有 markdown 文件则不需要）`,
        default: true
    });
    return enable;
}

/**
 * 选择是否启用 Prettier
 * @returns 是否启用
 */
const chooseEnablePrettier = async (): Promise<boolean> => {  
    const { enable } = await inquirer.prompt({
        type: 'confirm',
        name: 'enable',
        message: `Step ${++step}. 是否需要使用 Prettier（用于代码格式化）`,
        default: true
    });
    return enable;
}

export default  async (options: InitOptions) => {
    const cwd = options.cwd || process.cwd();
    const isTest = process.env.NODE_ENV === 'test';
    const checkVersionUpdate = options.checkVersionUpdate || false;
    const disableNpmInstall = options.disableNpmInstall || false;
    const config: Record<string, any> = {};
    const pkgPath = path.resolve(cwd, 'package.json');
    let pkg: PKG = fs.readJSONSync(pkgPath);

    // 版本检查
    if(!isTest && checkVersionUpdate) {
        await update(false);
    }

    //  初始化 enableESLint，默认为true，无需让用户选择
    if (typeof options.enableESLint === 'boolean') {
        config.enableESLint = options.enableESLint;
    } else {
        config.enableESLint = true;
    }

    //  初始化 eslintType
    if (options.eslintType && PROJECT_TYPES.some((t) => t.value === options.eslintType)) {
        config.eslintType = options.eslintType;
    } else {
        config.eslintType = await chooseEslintType();
    }

    //  初始化 enableStylelint
    if (typeof options.enableStylelint === 'boolean') {
        config.enableStylelint = options.enableStylelint;
    } else {
        config.enableStylelint = await chooseEnableStylelint(!/node/.test(config.eslintType));
    }

    //  初始化 enableMarkdownlint
    if (typeof options.enableMarkdownlint === 'boolean') {
        config.enableMarkdownlint = options.enableMarkdownlint;
    } else {
        config.enableMarkdownlint = await chooseEnableMarkdownlint();
    }

    //  初始化 enablePrettier
    if (typeof options.enablePrettier === 'boolean') {
        config.enablePrettier = options.enablePrettier;
    } else {
        config.enablePrettier = await chooseEnablePrettier();
    }

    // 冲突检测与清理
    if (!isTest) {
        log.info(`Step ${++step}. 检查项目中可能存在依赖于配置冲突`);
        pkg = await conflictResolve(cwd, options.rewriteConfig);
        log.success(`Step ${step}. 冲突检测与清理完成`);

        // 安装 fe-lint-cli 到项目 devDependencies
        if (!options.disableNpmInstall) {
            log.info(`Step ${++step}. 安装依赖`);
            const npm = await npmType;
            spawn.sync(npm, ['i', '-D', PKG_NAME], { stdio: 'inherit', cwd });
            log.success(`Step ${step}. 依赖安装完成`);
        }
    }

    // 更新 package.json
    pkg = fs.readJSONSync(pkgPath);
    // 在 package.json 中写入 scripts
    pkg.scripts = pkg.scripts || {};
    pkg.scripts[`${PKG_NAME}-scan`] = `${PKG_NAME} scan`;
    pkg.scripts[`${PKG_NAME}-fix`] = `${PKG_NAME} fix`;
    // Husky 9 需要 prepare 脚本来初始化钩子
    if (!pkg.scripts.prepare) {
        pkg.scripts.prepare = 'husky';
    }

    // 清理旧版 Husky v3 写法（兼容迁移）
    if (pkg.husky) {
        delete pkg.husky;
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    // git commit 卡点 —— Husky 9 写法：生成 .husky/ 钩子文件
    log.info(`Step ${++step}. 配置 git commit 卡点（Husky 9）`);
    const huskyDir = path.resolve(cwd, '.husky');
    fs.ensureDirSync(huskyDir);

    const preCommitPath = path.resolve(huskyDir, 'pre-commit');
    fs.writeFileSync(preCommitPath, `${PKG_NAME} commit-file-scan\n`, 'utf-8');
    fs.chmodSync(preCommitPath, '755');

    const commitMsgPath = path.resolve(huskyDir, 'commit-msg');
    fs.writeFileSync(commitMsgPath, `${PKG_NAME} commit-msg-scan "$1"\n`, 'utf-8');
    fs.chmodSync(commitMsgPath, '755');

    log.success(`Step ${step}. 配置 git commit 卡点成功`);

    log.info(`Step ${++step}. 生成配置文件`);
    generateTemplate(cwd, config);
    log.success(`Step ${step}. 配置文件生成完成`);

    log.success(`${PKG_NAME}. 初始化完成🎉 :D`);
}
