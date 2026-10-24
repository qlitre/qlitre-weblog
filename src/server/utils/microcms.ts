import { createClient } from 'microcms-js-sdk'

// レート制限(429)やサーバーエラー(5xx)のときのリトライ設定。待ち時間は 100ms → 200ms → 400ms と倍々に増やす
const BASE_DELAY_MS = 100
const MAX_RETRIES = 3

const isRetryable = (err: unknown) => {
    const status = (err as { status?: number })?.status
    return status === 429 || (status !== undefined && status >= 500)
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 失敗したらエクスポネンシャルバックオフでリトライする
export const withRetry = async <T>(fn: () => Promise<T>): Promise<T> => {
    for (let i = 0; ; i++) {
        try {
            return await fn()
        } catch (err) {
            if (i >= MAX_RETRIES || !isRetryable(err)) throw err
            await sleep(BASE_DELAY_MS * 2 ** i)
        }
    }
}

// 全メソッドを withRetry で包んだ microCMS クライアントを作る
export const createMicroCMSClient = (serviceDomain: string, apiKey: string) => {
    const client = createClient({ serviceDomain, apiKey })
    return new Proxy(client, {
        get(target, prop, receiver) {
            const value = Reflect.get(target, prop, receiver)
            if (typeof value !== 'function') return value
            return (...args: unknown[]) => withRetry(() => value.apply(target, args))
        },
    })
}
