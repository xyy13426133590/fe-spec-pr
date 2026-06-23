/*
 * @Author: 许云云 
 * @Date: 2026-06-23 12:21:34
 * @LastEditors: 许云云 
 * @LastEditTime: 2026-06-23 15:36:38
 * @FilePath: /fe-spec-pr/packages/stylelint-config/__tests__/stylelint-config.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const assert = require('assert');
// const stylelint = require('stylelint'); // stylelint17版本就不兼容这样写，改成下面动态导入的方式
const path = require('path');

describe('test/stylelint-config.test.js', () => {
    it('Validate default', async () => {
        const { default: stylelint } = await import('stylelint');
        const filePaths = [path.join(__dirname, './fixtures/index.css')];
        const result = await stylelint.lint({
            configFile: path.join(__dirname, '..', 'index.js'),
            files: filePaths,
            fix: false
        });

        if(result && result.errored) {
            const filesResult = JSON.parse(result.report || '[]') || [];
            filesResult.forEach((fileResult) => {
                console.log(`============ ${filePaths} ============`);
                console.log('css', fileResult.warnings);
            });
            assert.ok(filesResult.length !== 0);
        }

    });

    it('Validate less', async () => {
        const { default: stylelint } = await import('stylelint');
        const filePaths = [path.join(__dirname, './fixtures/less-test.less')];
        const result = await stylelint.lint({
            configFile: path.join(__dirname, '..', 'index.js'),
            files: filePaths,
            fix: false
        });

        if(result && result.errored) {
            const filesResult = JSON.parse(result.report || '[]') || [];
            filesResult.forEach((fileResult) => {
                console.log(`============ ${filePaths} ============`);
                console.log('less', fileResult.warnings);
            });
            assert.ok(filesResult.length !== 0);
        }

    });

    it('Validate scss', async () => {
        const { default: stylelint } = await import('stylelint');
        const filePaths = [path.join(__dirname, './fixtures/sass-test.scss')];
        const result = await stylelint.lint({
            configFile: path.join(__dirname, '..', 'index.js'),
            files: filePaths,
            fix: false
        });

        if(result && result.errored) {
            const filesResult = JSON.parse(result.report || '[]') || [];
            filesResult.forEach((fileResult) => {
                console.log(`============ ${filePaths} ============`);
                console.log('scss', fileResult.warnings);
            });
            assert.ok(filesResult.length !== 0);
        }

    });

    it('Validate css-module', async () => {
        const { default: stylelint } = await import('stylelint');
        const filePaths = [path.join(__dirname, './fixtures/css-module.scss')];
        const result = await stylelint.lint({
            configFile: path.join(__dirname, '..', 'index.js'),
            files: filePaths,
            fix: false
        });

        if(result && result.errored) {
            const filesResult = JSON.parse(result.report || '[]') || [];
            filesResult.forEach((fileResult) => {
                console.log(`============ ${filePaths} ============`);
                console.log('css-module', fileResult.warnings);
            });
            assert.ok(filesResult.length !== 0);
        }

    });
})
