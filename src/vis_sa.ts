import { getLCP, getSA } from "./sa";
class Char {
  char: string;
  isL: boolean;
  idx: number;
  isLML: boolean;
  isLMS: boolean;

  constructor(
    char: string,
    isL: boolean,
    idx: number,
    lml: boolean = false,
    lms: boolean = false
  ) {
    this.char = char;
    this.isL = isL;
    this.idx = idx;
    this.isLML = lml;
    this.isLMS = lms;
  }
}

// return the Char array
function getChars(str: string) {
  let chars: Char[] = [];
  let prev_L = false;
  chars.push(new Char(str[str.length - 1], prev_L, str.length - 1));
  for (let i = str.length - 2; i >= 0; i--) {
    const c = str[i];
    const isL: boolean = c > str[i + 1] || (c == str[i + 1] && prev_L);
    let lml = false;
    let lms = false;
    if (isL && (i == 0 || str[i - 1] < str[i])) lml = true;
    if (!isL && (i == 0 || str[i - 1] > str[i])) lms = true;
    chars.push(new Char(c, isL, i, lml, lms));
    prev_L = isL;
  }
  chars.reverse();
  console.log("getChars", str, chars);
  return chars;
}

interface Params {
  str: string;
  arr_idx_checked: boolean;
}

const load_params_from_url = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let params: Params = {
    str: "mississippi$",
    arr_idx_checked: false,
  };

  const urlkey = urlParams.get("str");
  if (urlkey !== null) params.str = urlkey;
  params.arr_idx_checked = urlParams.get("arr_idx_checked") === "true";
  return params;
};

const main = () => {
  // @ts-ignore
  let app = new Vue({
    el: "#input_str",
    data: {
      str: "",
      chars: [],
      sa: [],
      lcpa: [],
      arr_idx: 0,
      arr_idx_checked: false,
    },
    methods: {
      setStr: function (str: string) {
        // @ts-ignore
        this.str = str;
        // @ts-ignore
        this.chars = getChars(this.str);
      },
      range: function range(from: number, to: number) {
        const res = new Array();
        for (let i = from; i < to; i++) res.push(i);
        return res;
      },
      set_params_to_url: function () {
        const params: Params = {
          // @ts-ignore
          str: this.str,
          // @ts-ignore
          arr_idx_checked: this.arr_idx,
        };
        const url = new URL(window.location.toString());
        for (let key of Object.keys(params)) {
          url.searchParams.set(key, params[key as keyof Params].toString());
        }
        history.pushState({}, "", url);
      },
    },
    watch: {
      str: function (newv: string, oldv: string) {
        console.log("watch str");
        // @ts-ignore
        this.chars = getChars(newv);
        const sa = getSA(newv);
        // @ts-ignore
        this.sa = sa;
        // @ts-ignore
        console.log("lcp", getLCP(newv, sa));
        // @ts-ignore
        this.lcpa = getLCP(newv, sa);
        // @ts-ignore
        this.set_params_to_url();
      },
      arr_idx_checked: function (newv: boolean, oldv: boolean) {
        // @ts-ignore
        this.arr_idx = newv ? 1 : 0;
        // @ts-ignore
        this.set_params_to_url();
      },
    },
  });
  const params = load_params_from_url();
  app.$data.str = params.str;
  app.$data.arr_idx_checked = params.arr_idx_checked;
  console.log(app.chars);
};

main();
