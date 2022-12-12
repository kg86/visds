/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/vis_lcp.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/sa.ts":
/*!*******************!*\
  !*** ./src/sa.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const strlib_1 = __webpack_require__(/*! ./strlib */ "./src/strlib.ts");
exports.getSA = (str) => {
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
function showSA(str, sa) {
    for (let i = 0; i < str.length; i++) {
        console.log(i, sa[i], str.substr(sa[i]), str.charCodeAt(sa[i]));
    }
}
exports.getLCP = (str, sa) => {
    const lcpa = new Array(str.length);
    lcpa[0] = 0;
    for (let i = 1; i < str.length; i++) {
        lcpa[i] = strlib_1.lcp(str.substr(sa[i - 1]), str.substr(sa[i]));
    }
    return lcpa;
};


/***/ }),

/***/ "./src/strlib.ts":
/*!***********************!*\
  !*** ./src/strlib.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lcp = (x, y) => {
    const n = Math.min(x.length, y.length);
    let i = 0;
    for (; i < n; i++) {
        if (x[i] !== y[i])
            break;
    }
    return i;
};


/***/ }),

/***/ "./src/vis_lcp.ts":
/*!************************!*\
  !*** ./src/vis_lcp.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
                history.pushState({}, "", url.toString());
            },
        },
        watch: {
            str: function (newv, oldv) {
                console.log("watch str");
                const sa = sa_1.getSA(newv);
                // @ts-ignore
                this.sa = sa;
                const rank = new Array(newv.length);
                for (let i = 0; i < sa.length; i++)
                    rank[sa[i]] = i;
                // @ts-ignore
                this.rank = rank;
                // @ts-ignore
                console.log("lcp", sa_1.getLCP(newv, sa));
                // @ts-ignore
                this.lcpa = sa_1.getLCP(newv, sa);
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJsaWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19sY3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHdFQUErQjtBQUVsQixhQUFLLEdBQUcsQ0FBQyxHQUFXLEVBQWlCLEVBQUU7SUFDbEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNyQixNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoQyxNQUFNLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDN0I7SUFDRCxpQkFBaUI7SUFFakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzdCLFNBQVMsVUFBVSxDQUFDLENBQVMsRUFBRSxDQUFTO1lBQ3RDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQyxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNELEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDL0M7UUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkQ7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGLFNBQVMsTUFBTSxDQUFDLEdBQVcsRUFBRSxFQUFZO0lBQ3ZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqRTtBQUNILENBQUM7QUFFWSxjQUFNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBWSxFQUFpQixFQUFFO0lBQ2pFLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFTLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFlBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekQ7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDOUNXLFdBQUcsR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQVUsRUFBRTtJQUNsRCxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUUsTUFBTTtLQUMxQjtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNQRiw0REFBcUM7QUFFckM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQVksRUFBWSxFQUFFO0lBQzFELE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDckIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDMUIsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7aUJBQzFELElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7O2dCQUN4QixHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDO1NBQy9CO0tBQ0Y7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQztBQUVGLE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQVksRUFBYSxFQUFFO0lBQzVELE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDckIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMxQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUNsRCxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzs7WUFDOUQsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztLQUN4QjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBUUYsTUFBTSxvQkFBb0IsR0FBRyxHQUFHLEVBQUU7SUFDaEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFDM0MsMENBQTBDO0lBQzFDLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELElBQUksTUFBTSxHQUFXO1FBQ25CLEdBQUcsRUFBRSxjQUFjO1FBQ25CLGVBQWUsRUFBRSxLQUFLO1FBQ3RCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLElBQUksTUFBTSxLQUFLLElBQUk7UUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUN6QyxNQUFNLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxNQUFNLENBQUM7SUFDckUsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLE1BQU0sQ0FBQztJQUN6RCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUM7QUFFRixNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7SUFDaEIsYUFBYTtJQUNiLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ2hCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLElBQUksRUFBRTtZQUNKLEdBQUcsRUFBRSxFQUFFO1lBQ1AsRUFBRSxFQUFFLEVBQUU7WUFDTixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsU0FBUyxFQUFFLEVBQUU7WUFDYixLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRSxDQUFDO1lBQ1YsZUFBZSxFQUFFLEtBQUs7WUFDdEIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxPQUFPLEVBQUU7WUFDUCxNQUFNLEVBQUUsVUFBVSxHQUFXO2dCQUMzQixhQUFhO2dCQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxLQUFLLEVBQUUsU0FBUyxLQUFLLENBQUMsSUFBWSxFQUFFLEVBQVU7Z0JBQzVDLE1BQU0sR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFO29CQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQztZQUNELGlCQUFpQixFQUFFO2dCQUNqQixNQUFNLE1BQU0sR0FBVztvQkFDckIsYUFBYTtvQkFDYixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7b0JBQ2IsYUFBYTtvQkFDYixlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQzdCLGFBQWE7b0JBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2lCQUMxQixDQUFDO2dCQUNGLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEQsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNuQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQW1CLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2lCQUNuRTtnQkFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDNUMsQ0FBQztTQUNGO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsR0FBRyxFQUFFLFVBQVUsSUFBWSxFQUFFLElBQVk7Z0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxHQUFHLFVBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsYUFBYTtnQkFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDYixNQUFNLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtvQkFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNwRCxhQUFhO2dCQUNiLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixhQUFhO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckMsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QyxhQUFhO2dCQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkMsYUFBYTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pDLGFBQWE7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxhQUFhO2dCQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUM7WUFDRCxlQUFlLEVBQUUsVUFBVSxJQUFhLEVBQUUsSUFBYTtnQkFDckQsYUFBYTtnQkFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUNELFNBQVMsRUFBRSxVQUFVLElBQWEsRUFBRSxJQUFhO2dCQUMvQyxhQUFhO2dCQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixhQUFhO2dCQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUM7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUNILE1BQU0sTUFBTSxHQUFHLG9CQUFvQixFQUFFLENBQUM7SUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUMzQixHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ25ELEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDO0FBRUYsSUFBSSxFQUFFLENBQUMiLCJmaWxlIjoidmlzX2xjcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Zpc19sY3AudHNcIik7XG4iLCJpbXBvcnQgeyBsY3AgfSBmcm9tIFwiLi9zdHJsaWJcIjtcblxuZXhwb3J0IGNvbnN0IGdldFNBID0gKHN0cjogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCBzYSA9IG5ldyBBcnJheTxudW1iZXI+KG4pO1xuICBjb25zdCByYW5rID0gbmV3IEFycmF5KG4pO1xuICBjb25zdCBuZXdfcmFuayA9IG5ldyBBcnJheShuKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBzYVtpXSA9IGk7XG4gICAgcmFua1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIC8vc2hvd1NBKHN0ciwgc2EpXG5cbiAgZm9yIChsZXQgayA9IDE7IGsgPCBuOyBrICo9IDIpIHtcbiAgICBmdW5jdGlvbiBjb21wYXJlX3NhKGk6IG51bWJlciwgajogbnVtYmVyKSB7XG4gICAgICBpZiAocmFua1tpXSAhPSByYW5rW2pdKSByZXR1cm4gcmFua1tpXSAtIHJhbmtbal07XG4gICAgICBsZXQgcmkgPSAtMTtcbiAgICAgIGxldCByaiA9IC0xO1xuICAgICAgaWYgKGkgKyBrIDwgbikgcmkgPSByYW5rW2kgKyBrXTtcbiAgICAgIGlmIChqICsgayA8IG4pIHJqID0gcmFua1tqICsga107XG4gICAgICByZXR1cm4gcmkgLSByajtcbiAgICB9XG4gICAgc2Euc29ydChjb21wYXJlX3NhKTtcbiAgICBuZXdfcmFua1tzYVswXV0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGNvbXBhcmVfc2Eoc2FbaSAtIDFdLCBzYVtpXSkgPyAxIDogMDtcbiAgICAgIG5ld19yYW5rW3NhW2ldXSA9IG5ld19yYW5rW3NhW2kgLSAxXV0gKyBtYXRjaDtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHJhbmtbaV0gPSBuZXdfcmFua1tpXTtcbiAgfVxuICByZXR1cm4gc2E7XG59O1xuXG5mdW5jdGlvbiBzaG93U0Eoc3RyOiBzdHJpbmcsIHNhOiBudW1iZXJbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKGksIHNhW2ldLCBzdHIuc3Vic3RyKHNhW2ldKSwgc3RyLmNoYXJDb2RlQXQoc2FbaV0pKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TENQID0gKHN0cjogc3RyaW5nLCBzYTogbnVtYmVyW10pOiBBcnJheTxudW1iZXI+ID0+IHtcbiAgY29uc3QgbGNwYSA9IG5ldyBBcnJheTxudW1iZXI+KHN0ci5sZW5ndGgpO1xuICBsY3BhWzBdID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBsY3BhW2ldID0gbGNwKHN0ci5zdWJzdHIoc2FbaSAtIDFdKSwgc3RyLnN1YnN0cihzYVtpXSkpO1xuICB9XG4gIHJldHVybiBsY3BhO1xufTtcbiIsImV4cG9ydCBjb25zdCBsY3AgPSAoeDogc3RyaW5nLCB5OiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBuID0gTWF0aC5taW4oeC5sZW5ndGgsIHkubGVuZ3RoKTtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgIGlmICh4W2ldICE9PSB5W2ldKSBicmVhaztcbiAgfVxuICByZXR1cm4gaTtcbn07XG4iLCJpbXBvcnQgeyBnZXRMQ1AsIGdldFNBIH0gZnJvbSBcIi4vc2FcIjtcblxuLyoqXG4gKiByZXR1cm4gY2hhcmFjdGVyIHR5cGUgYXJyYXkgYGN0eXBlYFxuICogY3R5cGVbaV0gPSAnbm9ybWFsJyBpZiBsY3BbcmFua1tpXV09PT0wXG4gKiBjdHlwZVtpXSA9ICdyZWR1Y2libGUnIGlmIGxjcFtyYW5rW2ldXSA+IDAgJiYgQldUW3JhbmtbaV1dID09PSBCV1RbcmFua1tpXS0xXVxuICogY3R5cGVbaV0gPSAnaXJyZWR1Y2libGUnIG90aGVyd2lzZVxuICogQHBhcmFtIHN0clxuICogQHBhcmFtIHNhXG4gKi9cbmNvbnN0IGdldENoYXJUeXBlID0gKHN0cjogc3RyaW5nLCBzYTogbnVtYmVyW10pOiBzdHJpbmdbXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCByZXMgPSBBcnJheTxzdHJpbmc+KG4pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGlmIChzdHJbc2FbaV1dICE9PSBzdHJbc2FbaSAtIDFdXSkge1xuICAgICAgcmVzW3NhW2ldXSA9IFwibm9ybWFsXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzYVtpXSA9PT0gMCB8fCBzYVtpIC0gMV0gPT09IDApIHJlc1tzYVtpXV0gPSBcImlycmVkdWNpYmxlXCI7XG4gICAgICBlbHNlIGlmIChzdHJbc2FbaV0gLSAxXSAhPT0gc3RyW3NhW2kgLSAxXSAtIDFdKVxuICAgICAgICByZXNbc2FbaV1dID0gXCJpcnJlZHVjaWJsZVwiO1xuICAgICAgZWxzZSByZXNbc2FbaV1dID0gXCJyZWR1Y2libGVcIjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG5cbmNvbnN0IGdldFJlZHVjaWJsZSA9IChzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKTogYm9vbGVhbltdID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGg7XG4gIGNvbnN0IHJlcyA9IEFycmF5PGJvb2xlYW4+KG4pO1xuICByZXNbc2FbMF1dID0gZmFsc2U7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgaWYgKHNhW2ldID09PSAwIHx8IHNhW2kgLSAxXSA9PT0gMCkgcmVzW3NhW2ldXSA9IGZhbHNlO1xuICAgIGVsc2UgaWYgKHN0cltzYVtpXSAtIDFdID09PSBzdHJbc2FbaSAtIDFdIC0gMV0pIHJlc1tzYVtpXV0gPSBmYWxzZTtcbiAgICBlbHNlIHJlc1tzYVtpXV0gPSB0cnVlO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5pbnRlcmZhY2UgUGFyYW1zIHtcbiAgc3RyOiBzdHJpbmc7XG4gIGFycl9pZHhfY2hlY2tlZDogYm9vbGVhbjtcbiAgY29sb3JfbGNwOiBib29sZWFuO1xufVxuXG5jb25zdCBsb2FkX3BhcmFtc19mcm9tX3VybCA9ICgpID0+IHtcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xuICAvLyBjb25zb2xlLmxvZygncXVlcnlzdHJpbmcnLCBxdWVyeVN0cmluZylcbiAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVN0cmluZyk7XG4gIGxldCBwYXJhbXM6IFBhcmFtcyA9IHtcbiAgICBzdHI6IFwibWlzc2lzc2lwcGkkXCIsXG4gICAgYXJyX2lkeF9jaGVja2VkOiBmYWxzZSxcbiAgICBjb2xvcl9sY3A6IHRydWUsXG4gIH07XG5cbiAgY29uc3QgdXJsa2V5ID0gdXJsUGFyYW1zLmdldChcInN0clwiKTtcbiAgaWYgKHVybGtleSAhPT0gbnVsbCkgcGFyYW1zLnN0ciA9IHVybGtleTtcbiAgcGFyYW1zLmFycl9pZHhfY2hlY2tlZCA9IHVybFBhcmFtcy5nZXQoXCJhcnJfaWR4X2NoZWNrZWRcIikgPT09IFwidHJ1ZVwiO1xuICBwYXJhbXMuY29sb3JfbGNwID0gdXJsUGFyYW1zLmdldChcImNvbG9yX2xjcFwiKSA9PT0gXCJ0cnVlXCI7XG4gIHJldHVybiBwYXJhbXM7XG59O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICAvLyBAdHMtaWdub3JlXG4gIGxldCBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogXCIjaW5wdXRfc3RyXCIsXG4gICAgZGF0YToge1xuICAgICAgc3RyOiBcIlwiLFxuICAgICAgc2E6IFtdLFxuICAgICAgcmFuazogW10sXG4gICAgICBsY3BhOiBbXSxcbiAgICAgIHJlZHVjaWJsZTogW10sXG4gICAgICBjdHlwZTogW10sXG4gICAgICBhcnJfaWR4OiAwLFxuICAgICAgYXJyX2lkeF9jaGVja2VkOiBmYWxzZSxcbiAgICAgIGNvbG9yX2xjcDogdHJ1ZSxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHNldFN0cjogZnVuY3Rpb24gKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgICB9LFxuICAgICAgcmFuZ2U6IGZ1bmN0aW9uIHJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICAgICAgICBjb25zdCByZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGZyb207IGkgPCB0bzsgaSsrKSByZXMucHVzaChpKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0sXG4gICAgICBzZXRfcGFyYW1zX3RvX3VybDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBwYXJhbXM6IFBhcmFtcyA9IHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgc3RyOiB0aGlzLnN0cixcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgYXJyX2lkeF9jaGVja2VkOiB0aGlzLmFycl9pZHgsXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIGNvbG9yX2xjcDogdGhpcy5jb2xvcl9sY3AsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgcGFyYW1zW2tleSBhcyBrZXlvZiBQYXJhbXNdLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBcIlwiLCB1cmwudG9TdHJpbmcoKSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHN0cjogZnVuY3Rpb24gKG5ld3Y6IHN0cmluZywgb2xkdjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwid2F0Y2ggc3RyXCIpO1xuICAgICAgICBjb25zdCBzYSA9IGdldFNBKG5ld3YpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2EgPSBzYTtcbiAgICAgICAgY29uc3QgcmFuayA9IG5ldyBBcnJheTxudW1iZXI+KG5ld3YubGVuZ3RoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYS5sZW5ndGg7IGkrKykgcmFua1tzYVtpXV0gPSBpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMucmFuayA9IHJhbms7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc29sZS5sb2coXCJsY3BcIiwgZ2V0TENQKG5ld3YsIHNhKSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5sY3BhID0gZ2V0TENQKG5ld3YsIHNhKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnJlZHVjaWJsZSA9IGdldFJlZHVjaWJsZShuZXd2LCBzYSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jdHlwZSA9IGdldENoYXJUeXBlKG5ld3YsIHNhKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zb2xlLmxvZyhcInJlZHVjaWJsZVwiLCB0aGlzLnJlZHVjaWJsZSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc29sZS5sb2coXCJjdHlwZVwiLCB0aGlzLmN0eXBlKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldF9wYXJhbXNfdG9fdXJsKCk7XG4gICAgICB9LFxuICAgICAgYXJyX2lkeF9jaGVja2VkOiBmdW5jdGlvbiAobmV3djogYm9vbGVhbiwgb2xkdjogYm9vbGVhbikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuYXJyX2lkeCA9IG5ld3YgPyAxIDogMDtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldF9wYXJhbXNfdG9fdXJsKCk7XG4gICAgICB9LFxuICAgICAgY29sb3JfbGNwOiBmdW5jdGlvbiAobmV3djogYm9vbGVhbiwgb2xkdjogYm9vbGVhbikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY29sb3JfbGNwID0gbmV3djtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldF9wYXJhbXNfdG9fdXJsKCk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuICBjb25zdCBwYXJhbXMgPSBsb2FkX3BhcmFtc19mcm9tX3VybCgpO1xuICBhcHAuJGRhdGEuc3RyID0gcGFyYW1zLnN0cjtcbiAgYXBwLiRkYXRhLmFycl9pZHhfY2hlY2tlZCA9IHBhcmFtcy5hcnJfaWR4X2NoZWNrZWQ7XG4gIGFwcC4kZGF0YS5jb2xvcl9sY3AgPSBwYXJhbXMuY29sb3JfbGNwO1xuICBjb25zb2xlLmxvZyhhcHAuY2hhcnMpO1xufTtcblxubWFpbigpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==