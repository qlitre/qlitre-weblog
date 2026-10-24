// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import withNuxt from './.nuxt/eslint.config.mjs'

// フォーマットは Prettier に任せるため、競合するルールを無効にする
export default withNuxt({
  rules: {
    // Home や Toc など1語のコンポーネント名を使っているため
    'vue/multi-word-component-names': 'off',
    // 型ベースの defineProps では省略可能なプロパティは undefined になるため
    'vue/require-default-prop': 'off',
  },
}).append(eslintConfigPrettier)
