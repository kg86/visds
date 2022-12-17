import { DataSet } from "vis-data/esnext";
import { Network } from "vis-network/esnext";
import { build_cdawg } from "./cdawg";
import * as visjs_default_options from "./visjs_default_options";

const options = visjs_default_options.options;
options.layout.hierarchical.direction = "LR";
options.layout.hierarchical.levelSeparation = 255;
options.layout.hierarchical.nodeSpacing = 205;
options.layout.hierarchical.treeSpacing = 205;
options.edges.smooth.type = "curvedCCW";

const container = document.getElementById("network") as HTMLElement;
const network = new Network(container, {}, options);
let networkData = {};

interface Params {
  input_text: string;
  show_suffix_links: boolean;
  implicit_cdawg: boolean;
}

const load_params_from_url = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let params: Params = {
    input_text: "abcabcaba",
    show_suffix_links: true,
    implicit_cdawg: true,
  };

  const urlkey = urlParams.get("input_text");
  if (urlkey !== null) params.input_text = urlkey;
  params.show_suffix_links = urlParams.get("show_suffix_links") === "true";
  params.implicit_cdawg = urlParams.get("implicit_cdawg") === "true";
  return params;
};

const load_params_from_html = () => {
  const input_text = (document.getElementById("input_text") as HTMLInputElement)
    .value;
  const show_suffix_links = (
    document.getElementById("show_suffix_links") as HTMLInputElement
  ).checked;
  const implicit_cdawg = (
    document.getElementById("implicit_cdawg") as HTMLInputElement
  ).checked;
  const params: Params = {
    input_text: input_text,
    show_suffix_links: show_suffix_links,
    implicit_cdawg: implicit_cdawg,
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
  implicit_cdawg.checked = params.implicit_cdawg;
};

const redraw = () => {
  // load and set parameters
  const url = new URL(window.location.toString());
  const params = load_params_from_html();
  set_params_to_url(params);

  const cdawg = build_cdawg(params.input_text, params.implicit_cdawg);
  console.log(cdawg);
  const json = cdawg.json(params.show_suffix_links);
  console.log(json);
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
  const implicit_cdawg_btn = document.getElementById(
    "implicit_cdawg"
  ) as HTMLElement;
  implicit_cdawg_btn.addEventListener("change", redraw);

  network.on("hoverEdge", function (e) {
    console.log("hoverEdge", e);
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
