// import * as vis from 'visjs-network'
import * as vis from 'vis-network'
import { suffix_tree } from './suffix_tree'
import * as visjs_default_options from './visjs_default_options'

const options = visjs_default_options.options
const container = document.getElementById('network') as HTMLElement
const network = new vis.Network(container, {}, options)
let networkData: vis.Data = {}

const redraw = () => {
  const input_text = (document.getElementById('input_text') as HTMLInputElement)
    .value
  const show_suffix_links = (document.getElementById(
    'show_suffix_links',
  ) as HTMLInputElement).checked
  console.log('input_text', input_text)
  console.log('show_suffix_links', show_suffix_links)
  const st = suffix_tree(input_text, show_suffix_links)
  console.log('st', st)
  const json = st.json()
  console.log('json', json)
  networkData = {
    nodes: new vis.DataSet(json.nodes),
    edges: new vis.DataSet(json.edges),
  }
  network.setData(networkData)
}

const main = () => {
  const input_text = document.getElementById('input_text') as HTMLElement
  input_text.addEventListener('input', redraw)
  input_text.addEventListener('propertychange', redraw)
  const show_sl_btn = document.getElementById(
    'show_suffix_links',
  ) as HTMLElement
  show_sl_btn.addEventListener('change', redraw)
  network.on('hoverEdge', e => {
    console.log('hoverEdge', e)
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 34 } })
  })
  network.on('blurEdge', e => {
    console.log('blurEdge', e)
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 14 } })
  })
  redraw()
}

main()
