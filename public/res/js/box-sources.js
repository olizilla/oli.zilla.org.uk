// Show a diagram box's sources in a card below the diagram, pinned to the foot
// of the screen while the diagram is in view, so the diagram stays in view. The card and the box's outline take the colour and dash
// of the box's line, from the data-line-* attributes on its block. Links to #src-<id>, from the diagram's boxes or the
// sources table, open the panel. Its contents are copied from the hidden
// <div id="src-<id>" class="box-sources"> for that box; without this script, a
// link to one reveals it in Chrome (hidden="until-found"). Esc, the close button, or the same box again closes the panel.
(() => {
  const svg = document.querySelector('.letterbox svg a[href*="#src-"]')?.closest('svg')
  if (!svg) return
  const band = svg.closest('.letterbox')

  const panel = document.createElement('aside')
  panel.className = 'box-panel'
  panel.hidden = true
  panel.setAttribute('aria-label', 'Sources for the selected box')
  panel.innerHTML = '<div class="box-panel-head"><strong class="box-panel-title"></strong><button type="button" class="box-panel-close" aria-label="Close">Close</button></div><div class="box-panel-body"></div>'
  // Below the diagram, pinned to the foot of the screen while the diagram is in view.
  band.append(panel)
  const title = panel.querySelector('.box-panel-title')
  const body = panel.querySelector('.box-panel-body')
  let current = null

  const target = (href) => {
    const id = href?.match(/#(src-[\w-]+)$/)?.[1]
    return id && document.getElementById(id)?.classList.contains('box-sources') ? id : null
  }
  // Each linked box outlines in its line's colour and dash, on hover and when selected.
  const lineStyle = (el, details) => {
    el.style.setProperty('--line-colour', details?.dataset.lineColour ?? '')
    el.style.setProperty('--line-dash', details?.dataset.lineDash ?? 'none')
  }
  for (const a of svg.querySelectorAll('a')) {
    const id = target(a.getAttribute('href'))
    if (id) lineStyle(a.closest('g'), document.getElementById(id))
  }

  const mark = (id) => {
    for (const a of svg.querySelectorAll('a')) {
      a.closest('g')?.classList.toggle('selected', target(a.getAttribute('href')) === id)
    }
  }

  function show (id) {
    const details = document.getElementById(id)
    // "EPS on Spine -> FHIR": the box and how its data travels.
    const { title: name, lineShape, lineText } = details.dataset
    if (lineShape) {
      const shape = document.createElement('span')
      shape.className = 'box-panel-shape'
      shape.textContent = lineShape
      shape.style.color = lineText ?? ''
      // A drawn arrow: the arrow character sits small and low in some phone fonts.
      const arrow = () => {
        const span = document.createElement('span')
        span.className = 'box-panel-arrow'
        span.innerHTML = '<svg viewBox="0 0 16 16" role="img" aria-label="to"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        return span
      }
      title.replaceChildren(name, arrow(), shape)
    } else {
      title.textContent = name
    }
    body.replaceChildren(...[...details.children].map((c) => c.cloneNode(true)))
    // Sources open in a new tab, so the diagram stays where it is.
    for (const a of body.querySelectorAll('a[href^="http"]')) { a.target = '_blank'; a.rel = 'noopener' }
    lineStyle(panel, details)
    panel.toggleAttribute('data-dashed', Boolean(details.dataset.lineDash))
    panel.hidden = false
    body.scrollTop = 0
    current = id
    mark(id)
    history.replaceState(null, '', `#${id}`)
  }

  function hide () {
    panel.hidden = true
    current = null
    mark(null)
    history.replaceState(null, '', location.pathname + location.search)
  }

  document.addEventListener('click', (event) => {
    const a = event.target.closest('a')
    const id = target(a?.getAttribute('href'))
    if (!id) return
    event.preventDefault()
    const inDiagram = svg.contains(a)
    if (inDiagram && current === id) return hide()
    show(id)
    if (!inDiagram) band.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
  panel.querySelector('.box-panel-close').addEventListener('click', hide)
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && current) hide() })

  // A link to a box's sources opens its panel, with the diagram in view. The
  // browser scrolls to the link's target itself once the page has loaded, so
  // bring the diagram back after that.
  const initial = target(location.hash)
  if (initial) {
    show(initial)
    // The browser reveals the hidden block it was linked to, once the page has
    // loaded; the card shows it instead, so hide it again then.
    const toDiagram = () => requestAnimationFrame(() => {
      document.getElementById(initial).setAttribute('hidden', 'until-found')
      band.scrollIntoView({ block: 'start' })
    })
    if (document.readyState === 'complete') toDiagram()
    else addEventListener('load', toDiagram, { once: true })
  }
})()
