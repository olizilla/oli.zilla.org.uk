/**
 * Adds a table of contents to posts with `toc: true` in their frontmatter.
 *
 * Lists the essay's own h2s, and inserts the list just before the first of
 * them, so it starts level with its first entry. Headings inside a box, a
 * <Sheet> or a ledger list (<div class="ledger">), belong to the box rather
 * than the essay's outline, so they're left out. CSS shows the list as a
 * sticky rail in the right margin on wide screens, and as a collapsed
 * "Contents" list on small ones. See post.css.
 */
export default function rehypeToc () {
  return function (tree, file) {
    if (!file.data.astro?.frontmatter?.toc) return

    const items = []
    let index = -1
    let inRawBox = 0
    tree.children.forEach((node, i) => {
      // In .md posts a ledger's <div> arrives as raw HTML around its contents.
      if (node.type === 'raw') {
        const html = node.value.trim()
        if (/^<div\b[^>]*\bclass=["'][^"']*\bledger\b/.test(html)) inRawBox++
        else if (inRawBox && /^<\/div>/.test(html)) inRawBox--
        return
      }
      if (inRawBox || isBox(node)) return
      const found = []
      collectH2s({ children: [node] }, found)
      if (found.length && index === -1) index = i
      items.push(...found)
    })
    if (items.length === 0) return

    tree.children.splice(index, 0, rail(items), collapsed(items))
  }
}

function isBox (node) {
  if (node.type !== 'mdxJsxFlowElement') return false
  if (node.name === 'Sheet') return true
  const cls = node.attributes?.find(a => a.name === 'class' || a.name === 'className')?.value
  return node.name === 'div' && typeof cls === 'string' && /\bledger\b/.test(cls)
}

function collectH2s (node, items) {
  for (const child of node.children ?? []) {
    if (isBox(child)) continue
    if (child.type === 'element' && child.tagName === 'h2' && child.properties?.id) {
      items.push({ id: child.properties.id, text: textOf(child) })
    } else {
      collectH2s(child, items)
    }
  }
}

function textOf (node) {
  if (node.type === 'text') return node.value
  return (node.children ?? []).map(textOf).join('')
}

function list (items) {
  return h('ol', {}, items.map(({ id, text }) =>
    h('li', {}, [h('a', { href: `#${id}` }, [{ type: 'text', value: text }])])
  ))
}

// Wide screens: always open, in the right margin.
function rail (items) {
  return h('nav', { className: ['toc'], ariaLabel: 'Contents' }, [
    h('p', { className: ['toc-label'], ariaHidden: 'true' }, [{ type: 'text', value: 'Contents' }]),
    list(items)
  ])
}

// Small screens: one line until opened.
function collapsed (items) {
  return h('details', { className: ['toc-m'] }, [
    h('summary', {}, [{ type: 'text', value: 'Contents' }]),
    h('nav', { ariaLabel: 'Contents' }, [list(items)])
  ])
}

function h (tagName, properties, children) {
  return { type: 'element', tagName, properties, children }
}
