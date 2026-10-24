// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import withNuxt from './.nuxt/eslint.config.mjs'

// フォーマットは Prettier に任せるため、競合するルールを無効にする
export default withNuxt().append(eslintConfigPrettier)
