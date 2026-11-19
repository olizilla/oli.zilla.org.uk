/**
 * Adds a table of contents to posts with `toc: true` in their frontmatter.
 *
 * Lists every h2, including one that titles a <Sheet>, and inserts the list
 * just before the first of them, so it starts level with its first entry. CSS
 * shows it as a sticky rail in the right margin on wide screens, and as a
 * collapsed "Contents" list on small ones. See base.css.
 */
export default function rehypeToc () {
  return function (tree, file) {
    if (!file.data.astro?.frontmatter?.toc) return

    const items = []
    collectH2s(tree, items)
    if (items.length === 0) return

    const index = tree.children.findIndex(n => {
      const found = []
      collectH2s({ children: [n] }, found)
      return found.length > 0
    })

    tree.children.splice(index, 0, rail(items), collapsed(items))
  }
}

function collectH2s (node, items) {
  for (const child of node.children ?? []) {
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
