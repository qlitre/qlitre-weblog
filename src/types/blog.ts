import type { MicroCMSListContent, MicroCMSListResponse } from 'microcms-js-sdk'
import type { MicroCMSImage } from 'microcms-js-sdk'

export type Tag = {
  name: string
  sortOrder: number
} & MicroCMSListContent

export type TagList = MicroCMSListResponse<Tag>

export type AmazonLink = {
  title: string
  image: MicroCMSImage
  url: string
}

export type RichEditor = {
  body: string
}

export type Body = {
  fieldId: 'richEditor' | 'amazonLink'
} & RichEditor &
  AmazonLink

export type Post = {
  title: string
  description: string
  keywords: string
  thumbnail: MicroCMSImage
  tag: Tag[]
  tocVisible: boolean
  text: string
  related: Post[]
  useRepeatBody: boolean
  repeated: Body[]
} & MicroCMSListContent

export type PostList = MicroCMSListResponse<Post>
