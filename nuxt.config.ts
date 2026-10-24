const { API_KEY, SERVICE_DOMAIN, GA_ADSENSE_ID } = process.env;
import prismjsModule from 'vite-plugin-prismjs'
import { createClient } from 'microcms-js-sdk'; //ES6

// CJSパッケージのため default が二重になる場合がある
const prismjs = (prismjsModule as any).default ?? prismjsModule

export default defineNuxtConfig({
    srcDir: 'src/',
    serverDir: 'src/server',
    dir: { public: 'src/public' },
    ssr: true,
    runtimeConfig: {
        apiKey: API_KEY,
        serviceDomain: SERVICE_DOMAIN
    },
    css: ['~/assets/scss/reset.scss', '~/assets/scss/common.scss',],
    hooks: {
        async "nitro:config"(nitroConfig) {
            if (nitroConfig.dev) {
                return;
            }
            nitroConfig.prerender.ignore = ['/draft', '/search']
            nitroConfig.prerender.crawlLinks = false
            // microCMS のレート制限(429)を避けるため、リクエスト間隔を空ける
            nitroConfig.prerender.concurrency = 1
            nitroConfig.prerender.interval = 500

            const limit = 10
            const client = createClient({
                serviceDomain: SERVICE_DOMAIN,
                apiKey: API_KEY,
            })
            const data = await client.getList(
                {
                    endpoint: 'post',
                    queries: {
                        limit: 0,
                        fields: 'id'
                    }
                }
            )
            const totalCount = data.totalCount
            const perRequestCount = 50
            const reqCount = Math.ceil(totalCount / perRequestCount)
            const allPostData = []
            for (let i = 0; i < reqCount; i++) {
                const offset = i * perRequestCount
                const data = await client.getList(
                    {
                        endpoint: 'post',
                        queries: {
                            limit: perRequestCount,
                            offset: offset,
                            fields: 'id,tag'
                        }
                    })
                for (const elm of data.contents) {
                    allPostData.push(elm)
                }
            }
            // タグに紐づいている記事の数
            const tagCount: Record<string, number> = {}
            // 記事を繰り返す
            for (const elm of allPostData) {
                const slug = elm.id
                const tags = elm.tag
                // 記事の数をカウントアップ
                for (const tag of tags) {
                    if (tagCount[tag.id]) {
                        tagCount[tag.id]++
                    } else {
                        tagCount[tag.id] = 1
                    }
                }
                // 記事詳細をルートに加える
                nitroConfig.prerender.routes.push(`/${slug}`)
            }
            // ページ数をルートに加える
            const pageCount = Math.ceil(totalCount / limit)
            for (let p = 1; p < pageCount + 1; p++) {
                nitroConfig.prerender.routes.push(`/page/${p}`)
            }
            // タグごとにページ数を計算してルートに加える
            for (const tagId in tagCount) {
                const cnt = tagCount[tagId]
                const tagPageCount = Math.ceil(cnt / limit)
                for (let p = 1; p < tagPageCount + 1; p++) {
                    nitroConfig.prerender.routes.push(`/tags/${tagId}/page/${p}`)
                }
            }
            nitroConfig.prerender.routes.push('/')
        },
    },
    app: {
        layoutTransition: { name: 'layout', mode: 'default' },
        pageTransition: { name: 'page', mode: 'default' }
    },
    modules: [
        ['@nuxtjs/google-adsense', { id: GA_ADSENSE_ID },],
    ],
    'google-adsense': {
        pageLevelAds: true,
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    api: "modern-compiler"
                },
                sass: {
                    api: "modern-compiler",
                },
            }
        },
        plugins: [
            prismjs({
                languages: ['cpp',
                    'javascript',
                    'bash',
                    'dart',
                    'sql',
                    'css',
                    'html',
                    'java',
                    'json',
                    'sass',
                    'scss',
                    'c',
                    'log',
                    'swift',
                    'md',
                    'nginx',
                    'yaml',
                    'xml',
                    'shell',
                    'ts',
                    'python',
                    'django'
                ],
                theme: "tomorrow",
                css: true
            })
        ]
    },
    compatibilityDate: '2024-10-14',

})