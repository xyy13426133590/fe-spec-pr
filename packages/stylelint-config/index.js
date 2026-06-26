/*
 * @Author: xuyunyun
 * @Date: 2026-06-23 12:24:21
 * @LastEditors: xuyunyun
 * @LastEditTime: 2026-06-23 14:39:29
 * @FilePath: /fe-spec-pr/packages/stylelint-config/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  // 默认告警级别：warning 表示违规时输出警告，不阻断构建
  defaultSeverity: 'warning',

  // 启用 stylelint-scss 插件，以支持 SCSS 语法相关规则
  plugins: ['stylelint-scss'],

  rules: {
    /**
     * Possible errors
     * @link https://stylelint.io/user-guide/rules/#possible-errors
     */
    // 关闭原生 at-rule 未知检查，交由 scss/at-rule-no-unknown 处理
    'at-rule-no-unknown': null,
    // 禁止使用未知的 SCSS at 规则（如 @mixin、@include 等合法规则除外）
    'scss/at-rule-no-unknown': true,
    // 允许空规则块（如占位选择器），不强制报错
    'block-no-empty': null,
    // 禁止无效的十六进制颜色值（如 #fffz）
    'color-no-invalid-hex': true,
    // 禁止空注释（/**/ 内无内容）
    'comment-no-empty': true,
    // 禁止声明块中出现重复属性；允许连续重复但值不同的属性（如 fallback 写法）
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    // 禁止简写属性覆盖相关非简写属性（如 padding 后又写 padding-left）
    'declaration-block-no-shorthand-property-overrides': true,
    // 禁止 font-family 中出现重复的字体名
    'font-family-no-duplicate-names': true,
    // calc() 表达式中运算符两侧必须有空格
    'function-calc-no-unspaced-operator': true,
    // linear-gradient 方向必须使用标准语法（如 to bottom，而非 top）
    'function-linear-gradient-no-nonstandard-direction': true,
    // 禁止在 @keyframes 声明中使用 !important
    'keyframe-declaration-no-important': true,
    // 禁止使用未知的媒体查询特性名
    'media-feature-name-no-unknown': true,
    // 关闭「低特异性选择器不能写在高特异性之后」检查，实际项目中常见且开发者熟悉优先级
    'no-descending-specificity': null,
    // 禁止重复的 @import 规则
    'no-duplicate-at-import-rules': true,
    // 禁止重复的选择器
    'no-duplicate-selectors': true,
    // 允许空样式文件，不报错
    'no-empty-source': null,
    // 禁止多余的分号（如声明末尾双重分号）
    'no-extra-semicolons': true,
    // 禁止无效的双斜杠注释（CSS 标准注释应使用 /* */）
    'no-invalid-double-slash-comments': true,
    // 禁止使用未知的 CSS 属性名
    'property-no-unknown': true,
    // 禁止未知的伪类；忽略 CSS Modules 常用的 :global、:local、:export
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'export'],
      },
    ],
    // 禁止未知的伪元素（如 ::before 合法，::unknown 非法）
    'selector-pseudo-element-no-unknown': true,
    // 禁止字符串中包含换行符
    'string-no-newline': true,
    // 禁止未知的单位；忽略小程序常用的 rpx 单位
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],

    /**
     * Stylistic issues
     * @link https://stylelint.io/user-guide/rules/list#stylistic-issues
     */
    // 缩进使用 2 个空格
    indentation: 2,
    // 多行规则块中，闭合花括号前必须换行
    'block-closing-brace-newline-before': 'always-multi-line',
    // 单行规则块中，闭合花括号前必须有空格（如 .a { color: red; }）
    'block-closing-brace-space-before': 'always-single-line',
    // 多行规则块中，开括号后必须换行
    'block-opening-brace-newline-after': 'always-multi-line',
    // 开括号前必须有空格（如 .selector {）
    'block-opening-brace-space-before': 'always',
    // 单行规则块中，开括号后必须有空格（如 .a { color: red; }）
    'block-opening-brace-space-after': 'always-single-line',
    // 十六进制颜色使用小写字母（如 #abc 而非 #ABC）
    'color-hex-case': 'lower',
    // 十六进制颜色尽量使用简写形式（如 #fff 而非 #ffffff）
    'color-hex-length': 'short',
    // 注释内部首尾必须有空格（如 /* comment */）
    'comment-whitespace-inside': 'always',
    // 冒号前不允许有空格
    'declaration-colon-space-before': 'never',
    // 冒号后必须有空格
    'declaration-colon-space-after': 'always',
    // 单行声明块中最多只能有一条声明
    'declaration-block-single-line-max-declarations': 1,
    // 声明块末尾必须加分号；违反时按 error 级别处理
    'declaration-block-trailing-semicolon': [
      'always',
      {
        severity: 'error',
      },
    ],
    // 长度为 0 时禁止写单位（如 0 而非 0px）；自定义属性值中的 0 可带单位
    'length-zero-no-unit': [
      true,
      {
        ignore: ['custom-properties'],
      },
    ],
    // 每行最大长度为 100 个字符
    'max-line-length': 100,
    // 禁止使用 ID 选择器（值为 0 表示完全禁止）
    'selector-max-id': 0,
    // 单行值列表中，逗号后必须有空格
    'value-list-comma-space-after': 'always-single-line',

    /**
     * stylelint-scss rules
     * @link https://www.npmjs.com/package/stylelint-scss
     */
    // SCSS 双斜杠注释内部必须有空格（如 // comment）
    'scss/double-slash-comment-whitespace-inside': 'always',
  },

  // 忽略 JS/TS 文件，仅对样式文件执行 lint
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
};
