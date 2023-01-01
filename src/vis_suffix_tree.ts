import { DataSet, Network } from "vis-network/standalone";
import { suffix_tree } from "./suffix_tree";
import * as visjs_default_options from "./visjs_default_options";

const options = visjs_default_options.options;
const container = document.getElementById("network") as HTMLElement;
const network = new Network(container, {}, options);
let networkData = {
  nodes: new DataSet([]),
  edges: new DataSet([]),
};

let stree = suffix_tree("", false);

interface Params {
  input_text: string;
  show_suffix_links: boolean;
}

const load_params_from_url = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let params: Params = {
    input_text: "cocoa",
    show_suffix_links: true,
  };

  const urlkey = urlParams.get("input_text");
  if (urlkey !== null) params.input_text = urlkey;
  params.show_suffix_links = urlParams.get("show_suffix_links") === "true";
  return params;
};

const load_params_from_html = () => {
  const input_text = (document.getElementById("input_text") as HTMLInputElement)
    .value;
  const show_suffix_links = (
    document.getElementById("show_suffix_links") as HTMLInputElement
  ).checked;
  const params: Params = {
    input_text: input_text,
    show_suffix_links: show_suffix_links,
  };
  return params;
};

const set_params_to_url = (params: Params) => {
  const url = new URL(window.location.toString());
  for (let key of Object.keys(params)) {
    url.searchParams.set(key, params[key as keyof Params].toString());
  }
  history.replaceState({}, "", url.toString());
};

const set_params_to_html = (params: Params) => {
  const input_text = document.getElementById("input_text") as HTMLInputElement;
  const show_suffix_links = document.getElementById(
    "show_suffix_links"
  ) as HTMLInputElement;
  const implicit_cdawg = document.getElementById(
    "implicit_cdawg"
  ) as HTMLInputElement;
  input_text.value = params.input_text;
  show_suffix_links.checked = params.show_suffix_links;
};

const redraw = () => {
  // set params to url
  const params = load_params_from_html();
  set_params_to_url(params);

  console.log("input_text", params.input_text);
  console.log("show_suffix_links", params.show_suffix_links);
  stree = suffix_tree(params.input_text, params.show_suffix_links);
  console.log("st", stree);
  const json = stree.json();
  console.log("json", json);
  networkData = {
    nodes: new DataSet(json.nodes),
    edges: new DataSet(json.edges),
  };
  network.setData(networkData);
};

const show_node_str = (nid: number | null) => {
  const elm = document.getElementById("node_str") as HTMLElement;
  const nstr = nid ? node_str(nid) : "";
  elm.innerText = nstr;
};

/**
 * Make a map from node id to the string from root to the node.
 */
const make_nstr = (): Map<number, string> => {
  const json = stree.json();
  const map = new Map<number, string>();
  const rec = (nid: number, prefix: string) => {
    map.set(nid, prefix);
    for (let edge of json.edges) {
      if (edge.from !== nid) continue;
      rec(edge.to, prefix + edge.label);
    }
  };
  rec(json.root, "");
  return map;
};

const node_str = (nid: number): string => {
  const nstr = make_nstr();
  return nstr.get(nid) as string;
};

const main = () => {
  // set event listener
  const input_text = document.getElementById("input_text") as HTMLElement;
  input_text.addEventListener("input", redraw);
  input_text.addEventListener("propertychange", redraw);
  const show_sl_btn = document.getElementById(
    "show_suffix_links"
  ) as HTMLElement;
  show_sl_btn.addEventListener("change", redraw);
  network.on("hoverEdge", (e) => {
    console.log("hoverEdge", e);
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 34 } });
    // @ts-ignore
    const nid = networkData.edges.get(e.edge).to;
    show_node_str(nid);
  });
  network.on("blurEdge", (e) => {
    console.log("blurEdge");
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 14 } });
    show_node_str(null);
  });
  network.on("hoverNode", (n) => {
    show_node_str(n.node);
  });
  network.on("blurNode", (n) => {
    show_node_str(null);
  });

  // load and set parameters
  const params = load_params_from_url();
  set_params_to_html(params);

  redraw();
};

main();
