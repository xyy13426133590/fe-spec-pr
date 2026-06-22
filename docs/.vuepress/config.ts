import { defineConfig4CustomTheme, UserPlugins  } from 'vuepress/config';

export default defineConfig4CustomTheme({
    locales: {},
    base: '/fe-spec-pr/',
    themeConfig: {},
    head: [],
    plugins: <UserPlugins>[],
    extraWatchFiles: ['./vuepress/config.ts']
})