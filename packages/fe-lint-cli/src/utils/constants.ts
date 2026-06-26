/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 21:52:09
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-25 15:16:27
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/utils/constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @result 集中管理包名、版本、项目类型选项，避免硬编码。
 */
import path from 'path';
import fs from 'fs-extra';

// 获取 package.json 中的配置
const pkg: Record<string, unknown> = JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'));

// 包名
export const PKG_NAME: string = pkg.name as string; 

// 包版本
export const PKG_VERSION: string = pkg.version as string; 

// init 时让用户选择的项目类型
export const PROJECT_TYPES: Array<{name: string; value: string}> = [
    {
        name: 'JavaScript 基础项目',
        value: 'index'
    },
    {
        name: 'TypeScript 基础项目',
        value: 'typescript'
    },
    {
        name: 'React 基础项目（JavaScript）',
        value: 'react'
    },
    {
        name: 'React 基础项目（TypeScript）',
        value: 'typescript/react'
    },
    {
        name: 'Vue 基础项目（JavaScript）',
        value: 'vue'
    },
    {
        name: 'Vue 基础项目（TypeScript）',
        value: 'typescript/vue'
    },
    {
        name: 'Rax 基础项目（JavaScript）',
        value: 'rax'
    },
    {
        name: 'Rax 基础项目（TypeScript）',
        value: 'typescript/rax'
    },
    {
        name: 'Node.js 基础项目（JavaScript）',
        value: 'node'
    },
    {
        name: 'Node.js 基础项目（TypeScript）',
        value: 'typescript/node'
    },
    {
        name: '使用 ES5 及之前版本的 JavaScript 老项目',
        value: 'es5'
    }
]

// eslint 扫描文件扩展名
export const ESLINT_FILE_EXT: string[] = ['.js', '.ts', '.jsx', '.tsx', '.vue'];    

/**
 * eslint 扫描忽略的文件或文件目录
 * 需要同步到 config/.eslintignore.ejs
 * */ 
export const ESLINT_IGNORE_PATTERN: string[] = [
    'node_modules', 
    'dist', 
    'build',
    'coverage',
    'es',
    'lib',
    '**/*.min.js',
    '**/*-min.js',
    '**/*.bundle.js'
];

// stylelint 扫描文件扩展名
export const STYLELINT_FILE_EXT: string[] = ['.css', '.scss', '.sass', '.less'];

// stylelint 扫描忽略的文件或文件目录
export const STYLELINT_IGNORE_PATTERN: string[] = [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    'es/',
    'lib/',
    '**/*.min.css',
    '**/*-min.css',
    '**/*.bundle.css'
];

// markdownLint 扫描文件扩展名
export const MARKDOWN_LINT_FILE_EXT: string[] = ['.md'];

// markdownLint 扫描忽略的文件或文件目录
export const MARKDOWN_LINT_IGNORE_PATTERN: string[] = [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    'es/',
    'lib/',
];

// 兼容旧命名
export const MARKDOWN_FILE_EXT = MARKDOWN_LINT_FILE_EXT;
export const MARKDOWN_IGNORE_PATTERN = MARKDOWN_LINT_IGNORE_PATTERN;

// Prettier 扫描文件扩展名
export const PRETTIER_FILE_EXT: string[] = [...ESLINT_FILE_EXT, ...STYLELINT_FILE_EXT, ...MARKDOWN_FILE_EXT]; 

// Prettier 扫描忽略的文件或文件目录
export const PRETTIER_IGNORE_PATTERN: string[] = [
    'node_modules/**/*',
    'dist/**/*',
    'build/**/*',
    'coverage/**/*',
    'es/**/*',
    'lib/**/*',
];

export const UNICODE = {
    success: '\u2714',
    failure: '\u2716'
};