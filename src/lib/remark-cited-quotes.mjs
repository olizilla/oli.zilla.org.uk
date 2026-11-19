/**
 * A quote that ends with an attribution line becomes a cited quote:
 *
 *   > We ransomed our dignity to the clouds
 *   >
 *   > — Tom Stoppard, *Rosencrantz and Guildenstern are dead*
 *
 * When a blockquote's last paragraph starts with a dash (—, –, or an escaped
 * \-), that paragraph becomes the quote's <footer>, without the dash. The
 * source can be a link: `> — [Name](https://…)`. Styled in post.css.
 */
const DASH = /^\s*[—–-]\s+/

export default function remarkCitedQuotes () {
  return function (tree) {
    walk(tree)
  }
}

function walk (node) {
  for (const child of node.children ?? []) {
    if (child.type === 'blockquote') cite(child)
    walk(child)
  }
}

function cite (quote) {
  const last = quote.children.at(-1)
  if (quote.children.length < 2 || last?.type !== 'paragraph') return
  const first = last.children[0]
  if (first?.type !== 'text' || !DASH.test(first.value)) return
  first.value = first.value.replace(DASH, '')
  last.data = { ...last.data, hName: 'footer' }
}
