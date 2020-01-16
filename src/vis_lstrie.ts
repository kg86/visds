import * as vis from 'vis-network'

import { build_lstrie } from './lstrie'
import * as visjs_default_options from './visjs_default_options'

const options = visjs_default_options.options
const container = document.getElementById('network') as HTMLElement
const network = new vis.Network(container, {}, options)
let networkData = {
  nodes: new vis.DataSet(),
  edges: new vis.DataSet(),
}

const redraw = () => {
  const input_text = (document.getElementById('input_text') as HTMLInputElement)
    .value
  const show_suffix_links = (document.getElementById(
    'show_suffix_links',
  ) as HTMLInputElement).checked
  const show_extended_suffix_links = (document.getElementById(
    'show_extended_suffix_links',
  ) as HTMLInputElement).checked
  const create_implicit_node = (document.getElementById(
    'create_implicit_node',
  ) as HTMLInputElement).checked
  console.log('input_text', input_text)
  console.log('show_suffix_links', show_suffix_links)
  console.log('show_extended_suffix_links', show_extended_suffix_links)

  const lstrie = build_lstrie(
    input_text,
    show_suffix_links,
    show_extended_suffix_links,
    create_implicit_node,
  )
  console.log(lstrie)
  const json = lstrie.json
  console.log(json)
  network.setData(json)
}

const main = () => {
  const input_text = document.getElementById('input_text') as HTMLElement
  input_text.addEventListener('input', redraw)
  input_text.addEventListener('propertychange', redraw)
  const show_sl_btn = document.getElementById(
    'show_suffix_links',
  ) as HTMLElement
  show_sl_btn.addEventListener('change', redraw)
  const show_esl_btn = document.getElementById(
    'show_extended_suffix_links',
  ) as HTMLElement
  show_esl_btn.addEventListener('change', redraw)
  const create_inode_btn = document.getElementById(
    'create_implicit_node',
  ) as HTMLElement
  create_inode_btn.addEventListener('change', redraw)

  network.on('hoverEdge', function(e) {
    console.log('hoverEdge', e)
    // console.log('networkData.edges', networkData.edges.get(e.edge))
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 34 } })
  })
  network.on('blurEdge', function(e) {
    console.log('blurEdge', e)
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 14 } })
  })
  redraw()
}
main()
