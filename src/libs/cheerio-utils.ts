import * as cheerio from 'cheerio'

export const getToc = (body: string) => {
  const $toc = cheerio.load(body)
  const headings = $toc('h1,h2,h3').toArray()
  const toc = headings.map((data) => ({
    /**@ts-ignore */
    text: data.children[0].data,
    id: data.attribs.id,
    name: data.name,
  }))
  return toc
}
