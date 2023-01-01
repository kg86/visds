import { DataSet, Network } from "vis-network/standalone";
import { DAWG } from "./dawg";
import * as visjs_default_options from "./visjs_default_options";

const options = visjs_default_options.options;
const container = document.getElementById("network") as HTMLElement;
const network = new Network(container, {}, options);
let networkData = {
  nodes: new DataSet([]),
  edges: new DataSet([]),
};
let dawg = new DAWG();

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
  console.log("setparams");
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

const redraw = function () {
  // set params to url
  const params = load_params_from_html();
  set_params_to_url(params);

  dawg = new DAWG();
  for (let i = 0; i < params.input_text.length; i++) {
    dawg.insert(params.input_text[i]);
  }
  const json = dawg.json(params.show_suffix_links);
  console.log("json", json);
  networkData = {
    nodes: new DataSet(json.nodes),
    edges: new DataSet(json.edges),
  };
  network.setData(networkData);
};

/**
 * Make a map from node id to the strings from root to the node.
 */
// const make_node_strs = (): Map<number, Set<string>> => {
const make_node_strs = (): Map<number, string[]> => {
  const json = dawg.json();
  const map = new Map<number, string[]>();
  // const map = new Map<number, Set<string>>();
  // const map = new Map<number, Set<string>>();
  const children = (nid: number) => {
    let res = [];
    for (let edge of json.edges) {
      if (edge.id[0] === "s") continue;
      if (edge.from !== nid) continue;
      res.push(edge);
    }
    return res;
  };
  const rec = (nid: number, prefix: string) => {
    if (!map.has(nid)) {
      // map.set(nid, new Set());
      map.set(nid, []);
    }
    map.get(nid)!.push(prefix);
    for (let edge of children(nid)) {
      if (edge.from !== nid) continue;
      rec(edge.to, prefix + edge.label);
    }
  };
  rec(json.root, "");
  for (let [k, v] of map.entries()) {
    v.sort((a, b) => {
      return b.length - a.length;
    });
  }
  return map;
};

const show_node_str = (nid: number | null) => {
  const elm = document.getElementById("node_str") as HTMLElement;
  let text = "";
  if (nid !== null) {
    const nstrs = make_node_strs();
    for (let nstr of nstrs.get(nid)!) {
      text += "<p>" + nstr + "</p>";
    }
  }
  elm.innerHTML = text;
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

  network.on("hoverEdge", function (e) {
    console.log("hoverEdge", e);
    // console.log('networkData.edges', networkData.edges.get(e.edge))
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 34 } });
    // @ts-ignore
    const nid = networkData.edges.get(e.edge).to;
    show_node_str(nid);
  });
  network.on("blurEdge", function (e) {
    console.log("blurEdge", e);
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 14 } });
    // show_node_str(null);
  });
  network.on("hoverNode", (n) => {
    show_node_str(n.node);
  });
  network.on("blurNode", (n) => {
    // show_node_str(null);
  });

  // load and set parameters
  const params = load_params_from_url();
  set_params_to_html(params);

  redraw();
};

main();
