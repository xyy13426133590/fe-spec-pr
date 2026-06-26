/*
 * @Author: 许云云 
 * @Date: 2026-06-25 15:17:18
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-25 19:41:18
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/utils/git.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { execa, type Options } from 'execa';

/**
 * 获取此次 commit 修改的文件列表   获取 git 暂存区文件列表（git add 后的文件）
 * @param options 
 * @returns Promise<string[]> - 修改的文件列表  commit-file-scan 用这个列表，避免全量扫描
 */
export const getCommitFiles = async (options: Options = {}): Promise<string[]> => { 
    try {
       const { stdout } = await execa(
        'git', 
        [
            'diff',
            '--staged', // 比较 暂缓区 与 last commit 的差别
             '--diff-filter=ACMR', // 只显示 added、copied、modified、renamed
              '--ignore-submodules',
             '--name-only' // 只显示更改文件的名称
            ], {...options, all: true, cwd: process.cwd() });
        return typeof stdout === 'string' ? stdout.split('\n').filter(Boolean) : [];
    } catch (err) {
        return [];
    }
}

/**
 * 获取未 add 的修改文件数量 获取工作区有改动但未 add 的文件，用于提醒用户
 * @param options 
 * @returns Promise<number> - 未 add 的修改文件数量
 */
export const getAmendFiles = async (options: Options = {}): Promise<string> => {
    try {
        const { stdout } = await execa(
            'git',
            [
                'diff', // 比较 工作区 与 暂缓区的差别
                '--name-only' // 只显示更改文件的名称
            ],
            { ...options, all: true, cwd: process.cwd() }
        );
        return typeof stdout === 'string' ? stdout : '';
    } catch (err) {
        return '';
    }
}