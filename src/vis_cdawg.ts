import * as vis from 'vis-network'
// import assert from "power-assert"

import { build_cdawg } from './cdawg'
import * as visjs_default_options from './visjs_default_options'

const options = visjs_default_options.options
options.layout.hierarchical.direction = 'LR'
options.layout.hierarchical.levelSeparation = 255
options.layout.hierarchical.nodeSpacing = 205
options.layout.hierarchical.treeSpacing = 205
options.edges.smooth.type = 'curvedCCW'

const container = document.getElementById('network') as HTMLElement
const network = new vis.Network(container, {}, options)
let networkData = {
  nodes: new vis.DataSet(),
  edges: new vis.DataSet(),
}

const redraw = () => {
  const input_text = (document.getElementById('input_text') as HTMLInputElement)
    .value
  const show_suffix_links = (
    document.getElementById('show_suffix_links') as HTMLInputElement
  ).checked
  const implicit_cdawg = (
    document.getElementById('implicit_cdawg') as HTMLInputElement
  ).checked
  console.log('input_text', input_text)
  console.log('show_suffix_links', show_suffix_links)
  console.log('implicit_cdawg', implicit_cdawg)
  const cdawg = build_cdawg(input_text, implicit_cdawg)
  console.log(cdawg)
  const json = cdawg.json(show_suffix_links)
  console.log(json)
  // network.setData(json)
  networkData = {
    nodes: new vis.DataSet(json.nodes),
    edges: new vis.DataSet(json.edges),
  }
  network.setData(networkData as vis.Data)
}

const main = () => {
  const input_text = document.getElementById('input_text') as HTMLElement
  input_text.addEventListener('input', redraw)
  input_text.addEventListener('propertychange', redraw)
  const show_sl_btn = document.getElementById(
    'show_suffix_links',
  ) as HTMLElement
  show_sl_btn.addEventListener('change', redraw)
  const implicit_cdawg_btn = document.getElementById(
    'implicit_cdawg',
  ) as HTMLElement
  implicit_cdawg_btn.addEventListener('change', redraw)

  network.on('hoverEdge', function (e) {
    console.log('hoverEdge', e)
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 34 } })
  })
  network.on('blurEdge', function (e) {
    console.log('blurEdge', e)
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 14 } })
  })
  redraw()
}
main()
