import { DataSet, Network } from "vis-network/standalone";
import { DAWG } from "./dawg";
import * as visjs_default_options from "./visjs_default_options";

const options = visjs_default_options.options;
const container = document.getElementById("network") as HTMLElement;
const network = new Network(container, {}, options);
let networkData = {};

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
  history.pushState({}, "", url.toString());
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

  const dawg = new DAWG();
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
