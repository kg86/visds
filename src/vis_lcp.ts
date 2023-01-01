import { getLCP, getSA } from "./sa";

/**
 * return character type array `ctype`
 * ctype[i] = 'normal' if lcp[rank[i]]===0
 * ctype[i] = 'reducible' if lcp[rank[i]] > 0 && BWT[rank[i]] === BWT[rank[i]-1]
 * ctype[i] = 'irreducible' otherwise
 * @param str
 * @param sa
 */
const getCharType = (str: string, sa: number[]): string[] => {
  const n = str.length;
  const res = Array<string>(n);
  for (let i = 0; i < n; i++) {
    if (str[sa[i]] !== str[sa[i - 1]]) {
      res[sa[i]] = "normal";
    } else {
      if (sa[i] === 0 || sa[i - 1] === 0) res[sa[i]] = "irreducible";
      else if (str[sa[i] - 1] !== str[sa[i - 1] - 1])
        res[sa[i]] = "irreducible";
      else res[sa[i]] = "reducible";
    }
  }
  return res;
};

const getReducible = (str: string, sa: number[]): boolean[] => {
  const n = str.length;
  const res = Array<boolean>(n);
  res[sa[0]] = false;
  for (let i = 1; i < n; i++) {
    if (sa[i] === 0 || sa[i - 1] === 0) res[sa[i]] = false;
    else if (str[sa[i] - 1] === str[sa[i - 1] - 1]) res[sa[i]] = false;
    else res[sa[i]] = true;
  }
  return res;
};

interface Params {
  str: string;
  arr_idx_checked: boolean;
  color_lcp: boolean;
}

const load_params_from_url = () => {
  const queryString = window.location.search;
  // console.log('querystring', queryString)
  const urlParams = new URLSearchParams(queryString);
  let params: Params = {
    str: "mississippi$",
    arr_idx_checked: false,
    color_lcp: true,
  };

  const urlkey = urlParams.get("str");
  if (urlkey !== null) params.str = urlkey;
  params.arr_idx_checked = urlParams.get("arr_idx_checked") === "true";
  params.color_lcp = urlParams.get("color_lcp") === "true";
  return params;
};

const main = () => {
  // @ts-ignore
  let app = new Vue({
    el: "#input_str",
    data: {
      str: "",
      sa: [],
      rank: [],
      lcpa: [],
      reducible: [],
      ctype: [],
      arr_idx: 0,
      arr_idx_checked: false,
      color_lcp: true,
    },
    methods: {
      setStr: function (str: string) {
        // @ts-ignore
        this.str = str;
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
          // @ts-ignore
          color_lcp: this.color_lcp,
        };
        const url = new URL(window.location.toString());
        for (let key of Object.keys(params)) {
          url.searchParams.set(key, params[key as keyof Params].toString());
        }
        history.replaceState({}, "", url.toString());
      },
    },
    watch: {
      str: function (newv: string, oldv: string) {
        console.log("watch str");
        const sa = getSA(newv);
        // @ts-ignore
        this.sa = sa;
        const rank = new Array<number>(newv.length);
        for (let i = 0; i < sa.length; i++) rank[sa[i]] = i;
        // @ts-ignore
        this.rank = rank;
        // @ts-ignore
        console.log("lcp", getLCP(newv, sa));
        // @ts-ignore
        this.lcpa = getLCP(newv, sa);
        // @ts-ignore
        this.reducible = getReducible(newv, sa);
        // @ts-ignore
        this.ctype = getCharType(newv, sa);
        // @ts-ignore
        console.log("reducible", this.reducible);
        // @ts-ignore
        console.log("ctype", this.ctype);
        // @ts-ignore
        this.set_params_to_url();
      },
      arr_idx_checked: function (newv: boolean, oldv: boolean) {
        // @ts-ignore
        this.arr_idx = newv ? 1 : 0;
        // @ts-ignore
        this.set_params_to_url();
      },
      color_lcp: function (newv: boolean, oldv: boolean) {
        // @ts-ignore
        this.color_lcp = newv;
        // @ts-ignore
        this.set_params_to_url();
      },
    },
  });
  const params = load_params_from_url();
  app.$data.str = params.str;
  app.$data.arr_idx_checked = params.arr_idx_checked;
  app.$data.color_lcp = params.color_lcp;
  console.log(app.chars);
};

main();
