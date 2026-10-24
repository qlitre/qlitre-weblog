import type { Post } from '../types/blog'
import { config } from '../settings/siteSettings'

export const useDetailHead = (post: Post) => {
  return useHead({
    title: post.title,
    link: [
      {
        rel: 'canonical',
        href: `${config.siteUrl}/${post.id}`,
      },
    ],
    meta: [
      { name: 'description', content: post.description },
      { name: 'keyword', content: post.keywords },
      { property: 'og:url', content: `${config.siteUrl}/${post.id}/` },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:title',
        content: `${post.title} | Qlitre`,
      },
      {
        property: 'og:description',
        content: post.description,
      },
      {
        property: 'og:site_name',
        content: config.siteName,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:site',
        content: config.social.twitter,
      },
    ],
  })
}
