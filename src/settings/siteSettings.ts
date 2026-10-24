export const BLOG_PER_PAGE = 10
export const config = {
    siteName: "Qlitre's Blog",
    siteUrl: "https://qlitre-weblog.com",
    siteDescription: "Pythonを中心にプログラミングの備忘録、チュートリアルを書いています",
    social: {
        repos: "https://github.com/qlitre/qlitre-weblog",
        github: "https://github.com/qlitre",
        twitter: "@kuri_tter",
        twitterProf: "https://twitter.com/kuri_tter",
    },
    postListField: 'id,title,description,tag,publishedAt,revisedAt',
    postDetailField: 'id,title,text,description,keywords,thumbnail,tag,tocVisible,useRepeatBody,repeated,related,publishedAt,revisedAt'
}