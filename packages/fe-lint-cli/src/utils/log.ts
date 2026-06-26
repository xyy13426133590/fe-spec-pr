/*
 * @Author: 许云云 
 * @Date: 2026-06-24 22:28:08
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-25 09:23:07
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/utils/log.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @result 统一终端输出颜色，init 各步骤提示更清晰。
 */
import chalk from 'chalk';

const { red, green, yellow, blue } = chalk;

export default {
    success(text: string) {
        console.log(green(text));
    },
    error(text: string) {
        console.log(red(text));
    },
    warn(text: string) {
        console.log(yellow(text));
    },
    info(text: string) {
        console.log(blue(text));
    }
}