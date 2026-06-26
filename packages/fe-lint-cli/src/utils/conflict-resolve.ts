/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 23:28:24
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-25 12:20:56
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/utils/conflict-resolve.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path';
import fs from 'fs-extra';
import { globSync } from 'glob';
import inquirer from 'inquirer';
import log from '../utils/log';
import { PKG_NAME } from './constants';
import type { PKG } from '../types';

/**
 *  精确匹配的包名，init后由fe-lint-cli 统一托管  需要移除的包名列表
 */
const packageNamesToRemove = [
    '@babel/eslint-parser',
    '@commitlint/cli',
    '@iceworks/spec',
    'babel-eslint',
    'eslint',
    'husky',
    'prettier',
    'stylelint',
    'markdownlint',
    'tslint'
];

/**
 *  按前缀批量移除， 如 eslint-plugin-xxx、 @typescript-eslint/xxx
 */
const packagePrefixesToRemove = [
    '@commitlint/',
    '@typescript-eslint/',
    'eslint-',
    'stylelint-',
    'markdownlint-',
    'commitlint-'
];

/**
 * 扫描项目中应删除的旧 init 配置文件
 * glob 是一个 按通配符模式匹配文件路径 的 Node.js 库，类似终端里的 ls *.js，但能在代码里用。
 * @param cwd - 当前工作目录
 * @returns 应删除的配置文件路径数组
*/
const checkUselessConfig = (cwd: string): string[] => {
    return []
        .concat(globSync('.eslintrc?(.@(json|yaml|yml))', { cwd }))
        .concat(globSync('.prettierrc?(.@(cjs|config.js|config.cjs|yaml|yml|json|json5|toml))', { cwd }))
        .concat(globSync('.stylelintrc?(.@(json|yaml|yml))', { cwd }))
        .concat(globSync('.markdownlint@(rc|.@(json|yaml|yml))', { cwd }))
        .concat(globSync('tslint.@(yaml|yml|json)', { cwd }))
        .concat(globSync('.kylerc?(.@(yaml|yml|json))', { cwd }));
}

export default async (cwd: string, rewriteConfig?: boolean) => {
    // path.join 和 path.resolve 的区别
    // 拼相对路径、glob 的 cwd    path.join
    // 读/写文件前要确定完整路径    path.resolve
    // 第一个参数是 __dirname 或 cwd  两者往往结果相同
    // 只有相对片段、又要绝对路径   用 path.resolve
    // join = 拼路径；resolve = 拼路径并尽量变成基于当前工作目录或已有绝对段的完整绝对路径。
    // 不是同一个意思，但很多场景下写法可以互换；涉及读写文件时，更推荐 path.resolve(cwd, ...)。
    const pkgPath = path.resolve(cwd, 'package.json');
    const pkg: PKG = fs.readJsonSync(pkgPath);

    const allDeps = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})];

    const willRemovePackage = allDeps.filter((name) => {
        return packageNamesToRemove.includes(name) || packagePrefixesToRemove.some((prefix) => name.startsWith(prefix));
    });

    const uselessConfig = checkUselessConfig(cwd);
    const willChangeCount = willRemovePackage.length + uselessConfig.length;

    if (willChangeCount > 0) {
        log.warn(`检测到项目中存在可能与 ${PKG_NAME} 冲突的依赖/配置，为保证正常运行将`);

        if (willRemovePackage.length > 0) {
            log.warn(`移除以下依赖: ${willRemovePackage.join(', ')}`);
        }

        if (uselessConfig.length > 0) {
            log.warn(`移除以下配置文件: ${uselessConfig.join(', ')}`);
        }

        if (typeof rewriteConfig === "undefined") {
            const { isRewrite } = await inquirer.prompt({
                type: 'confirm',
                name: 'isRewrite',
                message: '是否继续？',
                default: true
            });
            if (!isRewrite) {
                process.exit(0);
            }
        } else if (!rewriteConfig) {
            process.exit(0);
        }
    }

    // 删除配置文件
    for (const config of uselessConfig) {
        fs.removeSync(path.resolve(cwd, config));
    }

    // 清理 package.json 中的旧依赖. 修正 package.json
    delete pkg.eslintConfig;
    delete pkg.eslintIgnore;
    delete pkg.stylelint;
    for (const name of willRemovePackage) {
        delete (pkg.dependencies || {})[name];
        delete (pkg.devDependencies || {})[name];
    }
    fs.writeFileSync(path.resolve(cwd, 'package.json'), JSON.stringify(pkg, null, 2));

    return pkg;
};