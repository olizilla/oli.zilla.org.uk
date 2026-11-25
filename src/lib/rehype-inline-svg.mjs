/**
 * Puts an SVG's markup into the page in place of an <img> marked data-inline, so
 * the links inside it work: an SVG shown with <img> is a picture, and its links
 * can't be followed.
 *
 *   <img data-inline src="/res/img/posts/diagram.svg" alt="What it shows" />
 *
 * The file is read from public/ when the site is built. The alt text becomes the
 * SVG's aria-label. The SVG is wrapped in <div class="inline-svg">, so a wide
 * one can scroll sideways on its own (see post.css). An <img> without
 * data-inline, or not an SVG, is left alone.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const MARKED_IMG = /<img\b(?=[^>]*\sdata-inline\b)[^>]*>/g

export default function rehypeInlineSvg () {
  return function (tree) {
    walk(tree)
  }
}

function walk (node) {
  // In .md posts raw HTML arrives as text; in .mdx as elements.
  if (node.type === 'raw' && node.value.includes('data-inline')) {
    node.value = node.value.replace(MARKED_IMG, (tag) => inline(tag, attribute(tag, 'src'), attribute(tag, 'alt')))
  }
  node.children?.forEach((child, i) => {
    if (child.type === 'element' && child.tagName === 'img' && child.properties?.dataInline !== undefined) {
      const svg = inline(null, child.properties.src, child.properties.alt)
      if (svg) node.children[i] = { type: 'raw', value: svg }
      return
    }
    walk(child)
  })
}

function inline (tag, src, alt) {
  if (!src || !src.endsWith('.svg')) return tag
  const svg = readFileSync(join(process.cwd(), 'public', src), 'utf8')
  const labelled = alt ? svg.replace(/<svg\b/, `<svg aria-label="${escape(alt)}"`) : svg
  return `<div class="inline-svg">${labelled}</div>`
}

function attribute (tag, name) {
  return tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]
}

function escape (text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}
