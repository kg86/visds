import * as vis from "vis-network";

import { build_lstrie } from "./lstrie";
import * as visjs_default_options from "./visjs_default_options";

const options = visjs_default_options.options;
const container = document.getElementById("network") as HTMLElement;
const network = new vis.Network(container, {}, options);
let networkData = {
  nodes: new vis.DataSet(),
  edges: new vis.DataSet(),
};

interface Params {
  input_text: string;
  show_suffix_links: boolean;
  show_extended_suffix_links: boolean;
  create_implicit_node: boolean;
}

const load_params_from_url = () => {
  const queryString = window.location.search;
  // console.log('querystring', queryString)
  const urlParams = new URLSearchParams(queryString);
  let params: Params = {
    input_text: "cocoa",
    show_suffix_links: true,
    show_extended_suffix_links: true,
    create_implicit_node: false,
  };
  const keys = ["input_text", "show_suffix_links", "implicit_cdawg"];
  const undefined_values = ["", "true", "true"];
  for (let key of keys) {
    const urlkey = urlParams.get(key);
  }

  const urlkey = urlParams.get("input_text");
  if (urlkey !== null) params.input_text = urlkey;
  params.show_suffix_links = urlParams.get("show_suffix_links") === "true";
  params.show_extended_suffix_links =
    urlParams.get("show_extended_suffix_links") === "true";
  params.create_implicit_node =
    urlParams.get("create_implicit_node") === "true";
  params.create_implicit_node = true;
  return params;
};

const load_params_from_html = () => {
  const input_text = (document.getElementById("input_text") as HTMLInputElement)
    .value;
  const show_suffix_links = (
    document.getElementById("show_suffix_links") as HTMLInputElement
  ).checked;
  const show_extend_suffix_links = (
    document.getElementById("show_extended_suffix_links") as HTMLInputElement
  ).checked;
  const create_implicit_node = (
    document.getElementById("create_implicit_node") as HTMLInputElement
  ).checked;
  const params: Params = {
    input_text: input_text,
    show_suffix_links: show_suffix_links,
    show_extended_suffix_links: show_extend_suffix_links,
    create_implicit_node: create_implicit_node,
  };
  return params;
};

const set_params_to_url = (params: Params) => {
  const url = new URL(window.location.toString());
  for (let key of Object.keys(params)) {
    url.searchParams.set(key, params[key as keyof Params].toString());
  }
  history.pushState({}, "", url.toString());
};

const set_params_to_html = (params: Params) => {
  const input_text = document.getElementById("input_text") as HTMLInputElement;
  const show_suffix_links = document.getElementById(
    "show_suffix_links"
  ) as HTMLInputElement;
  const show_extended_suffix_links = document.getElementById(
    "show_extended_suffix_links"
  ) as HTMLInputElement;
  const create_implicit_node = document.getElementById(
    "create_implicit_node"
  ) as HTMLInputElement;
  input_text.value = params.input_text;
  show_suffix_links.checked = params.show_suffix_links;
  show_extended_suffix_links.checked = params.show_extended_suffix_links;
  create_implicit_node.checked = params.create_implicit_node;
};

const redraw = () => {
  // load and set parameters
  const params = load_params_from_html();
  set_params_to_url(params);
  console.log("params", params);

  const lstrie = build_lstrie(
    params.input_text,
    params.show_suffix_links,
    params.show_extended_suffix_links,
    params.create_implicit_node
  );
  console.log(lstrie);
  const json = lstrie.json;
  console.log(json);
  network.setData(json);
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
  const show_esl_btn = document.getElementById(
    "show_extended_suffix_links"
  ) as HTMLElement;
  show_esl_btn.addEventListener("change", redraw);
  const create_inode_btn = document.getElementById(
    "create_implicit_node"
  ) as HTMLElement;
  create_inode_btn.addEventListener("change", redraw);

  network.on("hoverEdge", function (e) {
    console.log("hoverEdge", e);
    // console.log('networkData.edges', networkData.edges.get(e.edge))
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 34 } });
  });
  network.on("blurEdge", function (e) {
    console.log("blurEdge", e);
    // @ts-ignore
    networkData.edges.update({ id: e.edge, font: { size: 14 } });
  });

  // load and set parameters
  const params = load_params_from_url();
  set_params_to_html(params);

  redraw();
};
main();
