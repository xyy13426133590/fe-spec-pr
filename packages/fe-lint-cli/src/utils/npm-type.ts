/*
 * @Author: xuyunyun 
 * @Date: 2026-06-24 22:34:39
 * @LastEditors: xuyunyun 
 * @LastEditTime: 2026-06-24 22:47:11
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/utils/npm-type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @Result 'npm' 或 'pnpm'
 */
import { sync as commandExistsSync } from 'command-exists';

// 自动判断用 pnpm 还是 npm， init 安装依赖时用
const promise: Promise<'npm' | 'pnpm'> = new Promise((resolve) => {
    if (!commandExistsSync('pnpm')) {
        return resolve('npm');
    }
    resolve('pnpm');
});

export default promise;