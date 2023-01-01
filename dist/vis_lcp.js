/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sa.ts":
/*!*******************!*\
  !*** ./src/sa.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getLCP = exports.getSA = void 0;
const strlib_1 = __webpack_require__(/*! ./strlib */ "./src/strlib.ts");
const getSA = (str) => {
    const n = str.length;
    const sa = new Array(n);
    const rank = new Array(n);
    const new_rank = new Array(n);
    for (let i = 0; i < str.length; i++) {
        sa[i] = i;
        rank[i] = str.charCodeAt(i);
    }
    //showSA(str, sa)
    for (let k = 1; k < n; k *= 2) {
        function compare_sa(i, j) {
            if (rank[i] != rank[j])
                return rank[i] - rank[j];
            let ri = -1;
            let rj = -1;
            if (i + k < n)
                ri = rank[i + k];
            if (j + k < n)
                rj = rank[j + k];
            return ri - rj;
        }
        sa.sort(compare_sa);
        new_rank[sa[0]] = 0;
        for (let i = 1; i < n; i++) {
            const match = compare_sa(sa[i - 1], sa[i]) ? 1 : 0;
            new_rank[sa[i]] = new_rank[sa[i - 1]] + match;
        }
        for (let i = 0; i < n; i++)
            rank[i] = new_rank[i];
    }
    return sa;
};
exports.getSA = getSA;
function showSA(str, sa) {
    for (let i = 0; i < str.length; i++) {
        console.log(i, sa[i], str.substr(sa[i]), str.charCodeAt(sa[i]));
    }
}
const getLCP = (str, sa) => {
    const lcpa = new Array(str.length);
    lcpa[0] = 0;
    for (let i = 1; i < str.length; i++) {
        lcpa[i] = (0, strlib_1.lcp)(str.substr(sa[i - 1]), str.substr(sa[i]));
    }
    return lcpa;
};
exports.getLCP = getLCP;


/***/ }),

/***/ "./src/strlib.ts":
/*!***********************!*\
  !*** ./src/strlib.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lcp = void 0;
const lcp = (x, y) => {
    const n = Math.min(x.length, y.length);
    let i = 0;
    for (; i < n; i++) {
        if (x[i] !== y[i])
            break;
    }
    return i;
};
exports.lcp = lcp;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!************************!*\
  !*** ./src/vis_lcp.ts ***!
  \************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const sa_1 = __webpack_require__(/*! ./sa */ "./src/sa.ts");
/**
 * return character type array `ctype`
 * ctype[i] = 'normal' if lcp[rank[i]]===0
 * ctype[i] = 'reducible' if lcp[rank[i]] > 0 && BWT[rank[i]] === BWT[rank[i]-1]
 * ctype[i] = 'irreducible' otherwise
 * @param str
 * @param sa
 */
const getCharType = (str, sa) => {
    const n = str.length;
    const res = Array(n);
    for (let i = 0; i < n; i++) {
        if (str[sa[i]] !== str[sa[i - 1]]) {
            res[sa[i]] = "normal";
        }
        else {
            if (sa[i] === 0 || sa[i - 1] === 0)
                res[sa[i]] = "irreducible";
            else if (str[sa[i] - 1] !== str[sa[i - 1] - 1])
                res[sa[i]] = "irreducible";
            else
                res[sa[i]] = "reducible";
        }
    }
    return res;
};
const getReducible = (str, sa) => {
    const n = str.length;
    const res = Array(n);
    res[sa[0]] = false;
    for (let i = 1; i < n; i++) {
        if (sa[i] === 0 || sa[i - 1] === 0)
            res[sa[i]] = false;
        else if (str[sa[i] - 1] === str[sa[i - 1] - 1])
            res[sa[i]] = false;
        else
            res[sa[i]] = true;
    }
    return res;
};
const load_params_from_url = () => {
    const queryString = window.location.search;
    // console.log('querystring', queryString)
    const urlParams = new URLSearchParams(queryString);
    let params = {
        str: "mississippi$",
        arr_idx_checked: false,
        color_lcp: true,
    };
    const urlkey = urlParams.get("str");
    if (urlkey !== null)
        params.str = urlkey;
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
            setStr: function (str) {
                // @ts-ignore
                this.str = str;
            },
            range: function range(from, to) {
                const res = new Array();
                for (let i = from; i < to; i++)
                    res.push(i);
                return res;
            },
            set_params_to_url: function () {
                const params = {
                    // @ts-ignore
                    str: this.str,
                    // @ts-ignore
                    arr_idx_checked: this.arr_idx,
                    // @ts-ignore
                    color_lcp: this.color_lcp,
                };
                const url = new URL(window.location.toString());
                for (let key of Object.keys(params)) {
                    url.searchParams.set(key, params[key].toString());
                }
                history.replaceState({}, "", url.toString());
            },
        },
        watch: {
            str: function (newv, oldv) {
                console.log("watch str");
                const sa = (0, sa_1.getSA)(newv);
                // @ts-ignore
                this.sa = sa;
                const rank = new Array(newv.length);
                for (let i = 0; i < sa.length; i++)
                    rank[sa[i]] = i;
                // @ts-ignore
                this.rank = rank;
                // @ts-ignore
                console.log("lcp", (0, sa_1.getLCP)(newv, sa));
                // @ts-ignore
                this.lcpa = (0, sa_1.getLCP)(newv, sa);
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
            arr_idx_checked: function (newv, oldv) {
                // @ts-ignore
                this.arr_idx = newv ? 1 : 0;
                // @ts-ignore
                this.set_params_to_url();
            },
            color_lcp: function (newv, oldv) {
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7Z0JBQ3RCLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDM0IsQ0FBQztTQUNGO0tBQ0YsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxNQUFNLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztJQUN0QyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQzNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDbkQsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Zpc2RzLy4vc3JjL3NhLnRzIiwid2VicGFjazovL3Zpc2RzLy4vc3JjL3N0cmxpYi50cyIsIndlYnBhY2s6Ly92aXNkcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92aXNkcy8uL3NyYy92aXNfbGNwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGxjcCB9IGZyb20gXCIuL3N0cmxpYlwiO1xuXG5leHBvcnQgY29uc3QgZ2V0U0EgPSAoc3RyOiBzdHJpbmcpOiBBcnJheTxudW1iZXI+ID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gIGNvbnN0IHNhID0gbmV3IEFycmF5PG51bWJlcj4obik7XG4gIGNvbnN0IHJhbmsgPSBuZXcgQXJyYXkobik7XG4gIGNvbnN0IG5ld19yYW5rID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHNhW2ldID0gaTtcbiAgICByYW5rW2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gIH1cbiAgLy9zaG93U0Eoc3RyLCBzYSlcblxuICBmb3IgKGxldCBrID0gMTsgayA8IG47IGsgKj0gMikge1xuICAgIGZ1bmN0aW9uIGNvbXBhcmVfc2EoaTogbnVtYmVyLCBqOiBudW1iZXIpIHtcbiAgICAgIGlmIChyYW5rW2ldICE9IHJhbmtbal0pIHJldHVybiByYW5rW2ldIC0gcmFua1tqXTtcbiAgICAgIGxldCByaSA9IC0xO1xuICAgICAgbGV0IHJqID0gLTE7XG4gICAgICBpZiAoaSArIGsgPCBuKSByaSA9IHJhbmtbaSArIGtdO1xuICAgICAgaWYgKGogKyBrIDwgbikgcmogPSByYW5rW2ogKyBrXTtcbiAgICAgIHJldHVybiByaSAtIHJqO1xuICAgIH1cbiAgICBzYS5zb3J0KGNvbXBhcmVfc2EpO1xuICAgIG5ld19yYW5rW3NhWzBdXSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gY29tcGFyZV9zYShzYVtpIC0gMV0sIHNhW2ldKSA/IDEgOiAwO1xuICAgICAgbmV3X3Jhbmtbc2FbaV1dID0gbmV3X3Jhbmtbc2FbaSAtIDFdXSArIG1hdGNoO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgcmFua1tpXSA9IG5ld19yYW5rW2ldO1xuICB9XG4gIHJldHVybiBzYTtcbn07XG5cbmZ1bmN0aW9uIHNob3dTQShzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc29sZS5sb2coaSwgc2FbaV0sIHN0ci5zdWJzdHIoc2FbaV0pLCBzdHIuY2hhckNvZGVBdChzYVtpXSkpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRMQ1AgPSAoc3RyOiBzdHJpbmcsIHNhOiBudW1iZXJbXSk6IEFycmF5PG51bWJlcj4gPT4ge1xuICBjb25zdCBsY3BhID0gbmV3IEFycmF5PG51bWJlcj4oc3RyLmxlbmd0aCk7XG4gIGxjcGFbMF0gPSAwO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGxjcGFbaV0gPSBsY3Aoc3RyLnN1YnN0cihzYVtpIC0gMV0pLCBzdHIuc3Vic3RyKHNhW2ldKSk7XG4gIH1cbiAgcmV0dXJuIGxjcGE7XG59O1xuIiwiZXhwb3J0IGNvbnN0IGxjcCA9ICh4OiBzdHJpbmcsIHk6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gIGNvbnN0IG4gPSBNYXRoLm1pbih4Lmxlbmd0aCwgeS5sZW5ndGgpO1xuICBsZXQgaSA9IDA7XG4gIGZvciAoOyBpIDwgbjsgaSsrKSB7XG4gICAgaWYgKHhbaV0gIT09IHlbaV0pIGJyZWFrO1xuICB9XG4gIHJldHVybiBpO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgeyBnZXRMQ1AsIGdldFNBIH0gZnJvbSBcIi4vc2FcIjtcblxuLyoqXG4gKiByZXR1cm4gY2hhcmFjdGVyIHR5cGUgYXJyYXkgYGN0eXBlYFxuICogY3R5cGVbaV0gPSAnbm9ybWFsJyBpZiBsY3BbcmFua1tpXV09PT0wXG4gKiBjdHlwZVtpXSA9ICdyZWR1Y2libGUnIGlmIGxjcFtyYW5rW2ldXSA+IDAgJiYgQldUW3JhbmtbaV1dID09PSBCV1RbcmFua1tpXS0xXVxuICogY3R5cGVbaV0gPSAnaXJyZWR1Y2libGUnIG90aGVyd2lzZVxuICogQHBhcmFtIHN0clxuICogQHBhcmFtIHNhXG4gKi9cbmNvbnN0IGdldENoYXJUeXBlID0gKHN0cjogc3RyaW5nLCBzYTogbnVtYmVyW10pOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCByZXMgPSBBcnJheTxzdHJpbmc+KG4pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGlmIChzdHJbc2FbaV1dICE9PSBzdHJbc2FbaSAtIDFdXSkge1xuICAgICAgcmVzW3NhW2ldXSA9IFwibm9ybWFsXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzYVtpXSA9PT0gMCB8fCBzYVtpIC0gMV0gPT09IDApIHJlc1tzYVtpXV0gPSBcImlycmVkdWNpYmxlXCI7XG4gICAgICBlbHNlIGlmIChzdHJbc2FbaV0gLSAxXSAhPT0gc3RyW3NhW2kgLSAxXSAtIDFdKVxuICAgICAgICByZXNbc2FbaV1dID0gXCJpcnJlZHVjaWJsZVwiO1xuICAgICAgZWxzZSByZXNbc2FbaV1dID0gXCJyZWR1Y2libGVcIjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGdldFJlZHVjaWJsZSA9IChzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKTogYm9vbGVhbltdID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gIGNvbnN0IHJlcyA9IEFycmF5PGJvb2xlYW4+KG4pO1xuICByZXNbc2FbMF1dID0gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgaWYgKHNhW2ldID09PSAwIHx8IHNhW2kgLSAxXSA9PT0gMCkgcmVzW3NhW2ldXSA9IGZhbHNlO1xuICAgIGVsc2UgaWYgKHN0cltzYVtpXSAtIDFdID09PSBzdHJbc2FbaSAtIDFdIC0gMV0pIHJlc1tzYVtpXV0gPSBmYWxzZTtcbiAgICBlbHNlIHJlc1tzYVtpXV0gPSB0cnVlO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5pbnRlcmZhY2UgUGFyYW1zIHtcbiAgc3RyOiBzdHJpbmc7XG4gIGFycl9pZHhfY2hlY2tlZDogYm9vbGVhbjtcbiAgY29sb3JfbGNwOiBib29sZWFuO1xufVxuXG5jb25zdCBsb2FkX3BhcmFtc19mcm9tX3VybCA9ICgpID0+IHtcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAvLyBjb25zb2xlLmxvZygncXVlcnlzdHJpbmcnLCBxdWVyeVN0cmluZylcbiAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVN0cmluZyk7XG4gIGxldCBwYXJhbXM6IFBhcmFtcyA9IHtcbiAgICBzdHI6IFwibWlzc2lzc2lwcGkkXCIsXG4gICAgYXJyX2lkeF9jaGVja2VkOiBmYWxzZSxcbiAgICBjb2xvcl9sY3A6IHRydWUsXG4gIH07XG5cbiAgY29uc3QgdXJsa2V5ID0gdXJsUGFyYW1zLmdldChcInN0clwiKTtcbiAgaWYgKHVybGtleSAhPT0gbnVsbCkgcGFyYW1zLnN0ciA9IHVybGtleTtcbiAgcGFyYW1zLmFycl9pZHhfY2hlY2tlZCA9IHVybFBhcmFtcy5nZXQoXCJhcnJfaWR4X2NoZWNrZWRcIikgPT09IFwidHJ1ZVwiO1xuICBwYXJhbXMuY29sb3JfbGNwID0gdXJsUGFyYW1zLmdldChcImNvbG9yX2xjcFwiKSA9PT0gXCJ0cnVlXCI7XG4gIHJldHVybiBwYXJhbXM7XG59O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICAvLyBAdHMtaWdub3JlXG4gIGxldCBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogXCIjaW5wdXRfc3RyXCIsXG4gICAgZGF0YToge1xuICAgICAgc3RyOiBcIlwiLFxuICAgICAgc2E6IFtdLFxuICAgICAgcmFuazogW10sXG4gICAgICBsY3BhOiBbXSxcbiAgICAgIHJlZHVjaWJsZTogW10sXG4gICAgICBjdHlwZTogW10sXG4gICAgICBhcnJfaWR4OiAwLFxuICAgICAgYXJyX2lkeF9jaGVja2VkOiBmYWxzZSxcbiAgICAgIGNvbG9yX2xjcDogdHJ1ZSxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHNldFN0cjogZnVuY3Rpb24gKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgICB9LFxuICAgICAgcmFuZ2U6IGZ1bmN0aW9uIHJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICAgICAgICBjb25zdCByZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGZyb207IGkgPCB0bzsgaSsrKSByZXMucHVzaChpKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0sXG4gICAgICBzZXRfcGFyYW1zX3RvX3VybDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBwYXJhbXM6IFBhcmFtcyA9IHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgc3RyOiB0aGlzLnN0cixcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgYXJyX2lkeF9jaGVja2VkOiB0aGlzLmFycl9pZHgsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGNvbG9yX2xjcDogdGhpcy5jb2xvcl9sY3AsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgcGFyYW1zW2tleSBhcyBrZXlvZiBQYXJhbXNdLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCB1cmwudG9TdHJpbmcoKSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHN0cjogZnVuY3Rpb24gKG5ld3Y6IHN0cmluZywgb2xkdjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwid2F0Y2ggc3RyXCIpO1xuICAgICAgICBjb25zdCBzYSA9IGdldFNBKG5ld3YpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2EgPSBzYTtcbiAgICAgICAgY29uc3QgcmFuayA9IG5ldyBBcnJheTxudW1iZXI+KG5ld3YubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYS5sZW5ndGg7IGkrKykgcmFua1tzYVtpXV0gPSBpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMucmFuayA9IHJhbms7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc29sZS5sb2coXCJsY3BcIiwgZ2V0TENQKG5ld3YsIHNhKSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5sY3BhID0gZ2V0TENQKG5ld3YsIHNhKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnJlZHVjaWJsZSA9IGdldFJlZHVjaWJsZShuZXd2LCBzYSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jdHlwZSA9IGdldENoYXJUeXBlKG5ld3YsIHNhKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zb2xlLmxvZyhcInJlZHVjaWJsZVwiLCB0aGlzLnJlZHVjaWJsZSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc29sZS5sb2coXCJjdHlwZVwiLCB0aGlzLmN0eXBlKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldF9wYXJhbXNfdG9fdXJsKCk7XG4gICAgICB9LFxuICAgICAgYXJyX2lkeF9jaGVja2VkOiBmdW5jdGlvbiAobmV3djogYm9vbGVhbiwgb2xkdjogYm9vbGVhbikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuYXJyX2lkeCA9IG5ld3YgPyAxIDogMDtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldF9wYXJhbXNfdG9fdXJsKCk7XG4gICAgICB9LFxuICAgICAgY29sb3JfbGNwOiBmdW5jdGlvbiAobmV3djogYm9vbGVhbiwgb2xkdjogYm9vbGVhbikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY29sb3JfbGNwID0gbmV3djtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldF9wYXJhbXNfdG9fdXJsKCk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuICBjb25zdCBwYXJhbXMgPSBsb2FkX3BhcmFtc19mcm9tX3VybCgpO1xuICBhcHAuJGRhdGEuc3RyID0gcGFyYW1zLnN0cjtcbiAgYXBwLiRkYXRhLmFycl9pZHhfY2hlY2tlZCA9IHBhcmFtcy5hcnJfaWR4X2NoZWNrZWQ7XG4gIGFwcC4kZGF0YS5jb2xvcl9sY3AgPSBwYXJhbXMuY29sb3JfbGNwO1xuICBjb25zb2xlLmxvZyhhcHAuY2hhcnMpO1xufTtcblxubWFpbigpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9