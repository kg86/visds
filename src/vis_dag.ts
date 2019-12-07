import * as vis from 'vis-network'

import { parse_rules } from './dag'
import * as visjs_default_options from './visjs_default_options'

const options = visjs_default_options.options
options.layout.hierarchical.direction = 'UD'
options.layout.hierarchical.levelSeparation = 45
options.edges.smooth.enabled = false

const container = document.getElementById('network') as HTMLElement
const network = new vis.Network(container, {}, options)
const redraw = function() {
  const input_text = (document.getElementById('input_text') as HTMLInputElement)
    .value
  console.log('input_text', input_text)
  console.log(parse_rules)
  const dag = parse_rules(input_text)
  const json = dag.json_tree
  console.log(json)
  network.setData(json)
}

const main = () => {
  console.log('vis_sufixtree.ts main')
  const input_text = document.getElementById('input_text') as HTMLElement
  input_text.addEventListener('input', redraw)
  input_text.addEventListener('propertychange', redraw)
  redraw()
}

main()
// network.on('hoverEdge', function(e) {
//   console.log(e)
//   this.body.data.edges.update({ id: e.edge, font: { size: 34 } })
// })
// network.on('blurEdge', function(e) {
//   console.log(e)
//   this.body.data.edges.update({ id: e.edge, font: { size: 14 } })
// })

// $('#input_text').on('input', redraw)
// $(document).ready(() => {
//   redraw()
// })
