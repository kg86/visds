import * as vis from "vis-network";

import { parse_rules } from "./dag";
import * as visjs_default_options from "./visjs_default_options";

const options = visjs_default_options.options;
options.layout.hierarchical.direction = "UD";
options.layout.hierarchical.levelSeparation = 45;
options.edges.smooth.enabled = false;

const container = document.getElementById("network") as HTMLElement;
const network = new vis.Network(container, {}, options);
interface Params {
  input_text: string;
}

const load_params_from_url = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let params: Params = {
    input_text: `1 = b
    2 = a
    3 = 2, 1
    4 = 3, 2
    5 = 4, 3
    6 = 5, 4
    7 = 6, 5
    `,
  };

  const urlkey = urlParams.get("input_text");
  if (urlkey !== null) params.input_text = urlkey;
  console.log("load_parms from url", params);
  return params;
};

const load_params_from_html = () => {
  const input_text = (document.getElementById("input_text") as HTMLInputElement)
    .value;
  const params: Params = {
    input_text: input_text,
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
  const implicit_cdawg = document.getElementById(
    "implicit_cdawg"
  ) as HTMLInputElement;
  input_text.value = params.input_text;
};
const redraw = function () {
  // set params to url
  const params = load_params_from_html();
  set_params_to_url(params);

  console.log(parse_rules);
  const dag = parse_rules(params.input_text);
  const json = dag.json_tree;
  console.log(json);
  network.setData(json);
};

const main = () => {
  // set event listener
  const input_text = document.getElementById("input_text") as HTMLElement;
  input_text.addEventListener("input", redraw);
  input_text.addEventListener("propertychange", redraw);

  // load and set parameters
  const params = load_params_from_url();
  set_params_to_html(params);

  redraw();
};

main();
