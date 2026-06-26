/*
 * @Author: 许云云 
 * @Date: 2026-06-24 22:48:01
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-25 14:29:23
 * @FilePath: /fe-spec-pr/packages/fe-lint-cli/src/actions/update.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @Result init 开始前可选检查 CLI 是否有新版本；fe-lint-cli update 也会用到。
 */
import { execSync } from 'child_process';
import ora from 'ora';
import log from '../utils/log';
import npmType from '../utils/npm-type';
import { PKG_NAME, PKG_VERSION } from '../utils/constants';

/**
 * 检查最新版本号
*/
const checkLatestVersion = async () => {
    const npm = await npmType;
    const latestVersion = execSync(`${npm} view ${PKG_NAME} version`).toString('utf-8').trim();

    if(PKG_VERSION === latestVersion) {
        return null;
    }

    const local = PKG_VERSION.split('.').map(Number);
    const latest = latestVersion.split('.').map(Number);

    // 依次比较版本号每一位大小，如：x.y.z
    for(let i = 0; i < local.length; i++) {
        if(local[i] > latest[i]) {
            return null;
        }
        if(local[i] < latest[i]) {
            return latestVersion;
        }
    }
    return null;
}

/**
 * 检查包的版本
 * @param install  - true=自动全局安装最新包
*/
export default async (install: boolean = true) => {
    const checking = ora(`[${PKG_NAME}] 正在检查最新版本...`);
    checking.start();

    try{
        const npm = await npmType;
        const latestVersion = await checkLatestVersion();
        checking.stop();

        if(latestVersion && install) {
           const updating = ora(`[${PKG_NAME}] 升级至 ${latestVersion}`);
           updating.start();
           execSync(`${npm} install -g ${PKG_NAME}`);
           updating.succeed();
        } else if (latestVersion) {
          log.warn(`最新版本: ${latestVersion}，当前版本: ${PKG_VERSION}。可执行：${npm} install -g ${PKG_NAME}@latest`);
        }else if (install) {
            log.info(`当前版本: ${PKG_VERSION}，已是最新版本`);
        }
    }catch(err) {
        checking.stop();
        log.warn(`检查最新版本时发生错误: ${(err as Error).message}`);
    }
}

