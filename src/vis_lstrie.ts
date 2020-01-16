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
  console.log('input_text', input_text)

  const lstrie = build_lstrie(input_text)
  console.log(lstrie)
  const json = lstrie.json
  console.log(json)
  network.setData(json)
}

const main = () => {
  const input_text = document.getElementById('input_text') as HTMLElement
  input_text.addEventListener('input', redraw)
  input_text.addEventListener('propertychange', redraw)

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
