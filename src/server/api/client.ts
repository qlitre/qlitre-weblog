import { createClient } from 'microcms-js-sdk' //ES6
import { createMicroCMSClient } from '../utils/microcms'
const ctx = useRuntimeConfig()

// ビルド(プリレンダー)時だけ、レート制限に備えてリトライ付きのクライアントを使う
const client = import.meta.prerender
  ? createMicroCMSClient(ctx.serviceDomain, ctx.apiKey)
  : createClient({
      serviceDomain: ctx.serviceDomain,
      apiKey: ctx.apiKey,
    })

export default client
