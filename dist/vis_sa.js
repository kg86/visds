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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/vis_sa.ts");
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

/***/ "./src/vis_sa.ts":
/*!***********************!*\
  !*** ./src/vis_sa.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sa_1 = __webpack_require__(/*! ./sa */ "./src/sa.ts");
class Char {
    constructor(char, isL, idx, lml = false, lms = false) {
        this.char = char;
        this.isL = isL;
        this.idx = idx;
        this.isLML = lml;
        this.isLMS = lms;
    }
}
// return the Char array
function getChars(str) {
    let chars = [];
    let prev_L = false;
    chars.push(new Char(str[str.length - 1], prev_L, str.length - 1));
    for (let i = str.length - 2; i >= 0; i--) {
        const c = str[i];
        const isL = c > str[i + 1] || (c == str[i + 1] && prev_L);
        let lml = false;
        let lms = false;
        if (isL && (i == 0 || str[i - 1] < str[i]))
            lml = true;
        if (!isL && (i == 0 || str[i - 1] > str[i]))
            lms = true;
        chars.push(new Char(c, isL, i, lml, lms));
        prev_L = isL;
    }
    chars.reverse();
    console.log("getChars", str, chars);
    return chars;
}
const load_params_from_url = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let params = {
        str: "mississippi$",
        arr_idx_checked: false,
    };
    const urlkey = urlParams.get("str");
    if (urlkey !== null)
        params.str = urlkey;
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
            setStr: function (str) {
                // @ts-ignore
                this.str = str;
                // @ts-ignore
                this.chars = getChars(this.str);
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
                // @ts-ignore
                this.chars = getChars(newv);
                const sa = sa_1.getSA(newv);
                // @ts-ignore
                this.sa = sa;
                // @ts-ignore
                console.log("lcp", sa_1.getLCP(newv, sa));
                // @ts-ignore
                this.lcpa = sa_1.getLCP(newv, sa);
                // @ts-ignore
                this.set_params_to_url();
            },
            arr_idx_checked: function (newv, oldv) {
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJsaWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19zYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsd0VBQStCO0FBRWxCLGFBQUssR0FBRyxDQUFDLEdBQVcsRUFBaUIsRUFBRTtJQUNsRCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ3JCLE1BQU0sRUFBRSxHQUFHLElBQUksS0FBSyxDQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFCLE1BQU0sUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lB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RyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLE1BQU0sRUFBRSxHQUFHLFVBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsYUFBYTtnQkFDYixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztnQkFDYixhQUFhO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDckMsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUNELGVBQWUsRUFBRSxVQUFVLElBQWEsRUFBRSxJQUFhO2dCQUNyRCxhQUFhO2dCQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsYUFBYTtnQkFDYixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMzQixDQUFDO1NBQ0Y7S0FDRixDQUFDLENBQUM7SUFDSCxNQUFNLE1BQU0sR0FBRyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3RDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDM0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUM7QUFFRixJQUFJLEVBQUUsQ0FBQyIsImZpbGUiOiJ2aXNfc2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy92aXNfc2EudHNcIik7XG4iLCJpbXBvcnQgeyBsY3AgfSBmcm9tIFwiLi9zdHJsaWJcIjtcblxuZXhwb3J0IGNvbnN0IGdldFNBID0gKHN0cjogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCBzYSA9IG5ldyBBcnJheTxudW1iZXI+KG4pO1xuICBjb25zdCByYW5rID0gbmV3IEFycmF5KG4pO1xuICBjb25zdCBuZXdfcmFuayA9IG5ldyBBcnJheShuKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBzYVtpXSA9IGk7XG4gICAgcmFua1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIC8vc2hvd1NBKHN0ciwgc2EpXG5cbiAgZm9yIChsZXQgayA9IDE7IGsgPCBuOyBrICo9IDIpIHtcbiAgICBmdW5jdGlvbiBjb21wYXJlX3NhKGk6IG51bWJlciwgajogbnVtYmVyKSB7XG4gICAgICBpZiAocmFua1tpXSAhPSByYW5rW2pdKSByZXR1cm4gcmFua1tpXSAtIHJhbmtbal07XG4gICAgICBsZXQgcmkgPSAtMTtcbiAgICAgIGxldCByaiA9IC0xO1xuICAgICAgaWYgKGkgKyBrIDwgbikgcmkgPSByYW5rW2kgKyBrXTtcbiAgICAgIGlmIChqICsgayA8IG4pIHJqID0gcmFua1tqICsga107XG4gICAgICByZXR1cm4gcmkgLSByajtcbiAgICB9XG4gICAgc2Euc29ydChjb21wYXJlX3NhKTtcbiAgICBuZXdfcmFua1tzYVswXV0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGNvbXBhcmVfc2Eoc2FbaSAtIDFdLCBzYVtpXSkgPyAxIDogMDtcbiAgICAgIG5ld19yYW5rW3NhW2ldXSA9IG5ld19yYW5rW3NhW2kgLSAxXV0gKyBtYXRjaDtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHJhbmtbaV0gPSBuZXdfcmFua1tpXTtcbiAgfVxuICByZXR1cm4gc2E7XG59O1xuXG5mdW5jdGlvbiBzaG93U0Eoc3RyOiBzdHJpbmcsIHNhOiBudW1iZXJbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKGksIHNhW2ldLCBzdHIuc3Vic3RyKHNhW2ldKSwgc3RyLmNoYXJDb2RlQXQoc2FbaV0pKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TENQID0gKHN0cjogc3RyaW5nLCBzYTogbnVtYmVyW10pOiBBcnJheTxudW1iZXI+ID0+IHtcbiAgY29uc3QgbGNwYSA9IG5ldyBBcnJheTxudW1iZXI+KHN0ci5sZW5ndGgpO1xuICBsY3BhWzBdID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBsY3BhW2ldID0gbGNwKHN0ci5zdWJzdHIoc2FbaSAtIDFdKSwgc3RyLnN1YnN0cihzYVtpXSkpO1xuICB9XG4gIHJldHVybiBsY3BhO1xufTtcbiIsImV4cG9ydCBjb25zdCBsY3AgPSAoeDogc3RyaW5nLCB5OiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBuID0gTWF0aC5taW4oeC5sZW5ndGgsIHkubGVuZ3RoKTtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgIGlmICh4W2ldICE9PSB5W2ldKSBicmVhaztcbiAgfVxuICByZXR1cm4gaTtcbn07XG4iLCJpbXBvcnQgeyBnZXRMQ1AsIGdldFNBIH0gZnJvbSBcIi4vc2FcIjtcbmNsYXNzIENoYXIge1xuICBjaGFyOiBzdHJpbmc7XG4gIGlzTDogYm9vbGVhbjtcbiAgaWR4OiBudW1iZXI7XG4gIGlzTE1MOiBib29sZWFuO1xuICBpc0xNUzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjaGFyOiBzdHJpbmcsXG4gICAgaXNMOiBib29sZWFuLFxuICAgIGlkeDogbnVtYmVyLFxuICAgIGxtbDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGxtczogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHRoaXMuY2hhciA9IGNoYXI7XG4gICAgdGhpcy5pc0wgPSBpc0w7XG4gICAgdGhpcy5pZHggPSBpZHg7XG4gICAgdGhpcy5pc0xNTCA9IGxtbDtcbiAgICB0aGlzLmlzTE1TID0gbG1zO1xuICB9XG59XG5cbi8vIHJldHVybiB0aGUgQ2hhciBhcnJheVxuZnVuY3Rpb24gZ2V0Q2hhcnMoc3RyOiBzdHJpbmcpIHtcbiAgbGV0IGNoYXJzOiBDaGFyW10gPSBbXTtcbiAgbGV0IHByZXZfTCA9IGZhbHNlO1xuICBjaGFycy5wdXNoKG5ldyBDaGFyKHN0cltzdHIubGVuZ3RoIC0gMV0sIHByZXZfTCwgc3RyLmxlbmd0aCAtIDEpKTtcbiAgZm9yIChsZXQgaSA9IHN0ci5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IGMgPSBzdHJbaV07XG4gICAgY29uc3QgaXNMOiBib29sZWFuID0gYyA+IHN0cltpICsgMV0gfHwgKGMgPT0gc3RyW2kgKyAxXSAmJiBwcmV2X0wpO1xuICAgIGxldCBsbWwgPSBmYWxzZTtcbiAgICBsZXQgbG1zID0gZmFsc2U7XG4gICAgaWYgKGlzTCAmJiAoaSA9PSAwIHx8IHN0cltpIC0gMV0gPCBzdHJbaV0pKSBsbWwgPSB0cnVlO1xuICAgIGlmICghaXNMICYmIChpID09IDAgfHwgc3RyW2kgLSAxXSA+IHN0cltpXSkpIGxtcyA9IHRydWU7XG4gICAgY2hhcnMucHVzaChuZXcgQ2hhcihjLCBpc0wsIGksIGxtbCwgbG1zKSk7XG4gICAgcHJldl9MID0gaXNMO1xuICB9XG4gIGNoYXJzLnJldmVyc2UoKTtcbiAgY29uc29sZS5sb2coXCJnZXRDaGFyc1wiLCBzdHIsIGNoYXJzKTtcbiAgcmV0dXJuIGNoYXJzO1xufVxuXG5pbnRlcmZhY2UgUGFyYW1zIHtcbiAgc3RyOiBzdHJpbmc7XG4gIGFycl9pZHhfY2hlY2tlZDogYm9vbGVhbjtcbn1cblxuY29uc3QgbG9hZF9wYXJhbXNfZnJvbV91cmwgPSAoKSA9PiB7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcbiAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeVN0cmluZyk7XG4gIGxldCBwYXJhbXM6IFBhcmFtcyA9IHtcbiAgICBzdHI6IFwibWlzc2lzc2lwcGkkXCIsXG4gICAgYXJyX2lkeF9jaGVja2VkOiBmYWxzZSxcbiAgfTtcblxuICBjb25zdCB1cmxrZXkgPSB1cmxQYXJhbXMuZ2V0KFwic3RyXCIpO1xuICBpZiAodXJsa2V5ICE9PSBudWxsKSBwYXJhbXMuc3RyID0gdXJsa2V5O1xuICBwYXJhbXMuYXJyX2lkeF9jaGVja2VkID0gdXJsUGFyYW1zLmdldChcImFycl9pZHhfY2hlY2tlZFwiKSA9PT0gXCJ0cnVlXCI7XG4gIHJldHVybiBwYXJhbXM7XG59O1xuXG5jb25zdCBtYWluID0gKCkgPT4ge1xuICAvLyBAdHMtaWdub3JlXG4gIGxldCBhcHAgPSBuZXcgVnVlKHtcbiAgICBlbDogXCIjaW5wdXRfc3RyXCIsXG4gICAgZGF0YToge1xuICAgICAgc3RyOiBcIlwiLFxuICAgICAgY2hhcnM6IFtdLFxuICAgICAgc2E6IFtdLFxuICAgICAgbGNwYTogW10sXG4gICAgICBhcnJfaWR4OiAwLFxuICAgICAgYXJyX2lkeF9jaGVja2VkOiBmYWxzZSxcbiAgICB9LFxuICAgIG1ldGhvZHM6IHtcbiAgICAgIHNldFN0cjogZnVuY3Rpb24gKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zdHIgPSBzdHI7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jaGFycyA9IGdldENoYXJzKHRoaXMuc3RyKTtcbiAgICAgIH0sXG4gICAgICByYW5nZTogZnVuY3Rpb24gcmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gZnJvbTsgaSA8IHRvOyBpKyspIHJlcy5wdXNoKGkpO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSxcbiAgICAgIHNldF9wYXJhbXNfdG9fdXJsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHBhcmFtczogUGFyYW1zID0ge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBzdHI6IHRoaXMuc3RyLFxuICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICBhcnJfaWR4X2NoZWNrZWQ6IHRoaXMuYXJyX2lkeCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24udG9TdHJpbmcoKSk7XG4gICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhwYXJhbXMpKSB7XG4gICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5zZXQoa2V5LCBwYXJhbXNba2V5IGFzIGtleW9mIFBhcmFtc10udG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sIFwiXCIsIHVybC50b1N0cmluZygpKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgc3RyOiBmdW5jdGlvbiAobmV3djogc3RyaW5nLCBvbGR2OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJ3YXRjaCBzdHJcIik7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jaGFycyA9IGdldENoYXJzKG5ld3YpO1xuICAgICAgICBjb25zdCBzYSA9IGdldFNBKG5ld3YpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2EgPSBzYTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zb2xlLmxvZyhcImxjcFwiLCBnZXRMQ1AobmV3diwgc2EpKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmxjcGEgPSBnZXRMQ1AobmV3diwgc2EpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2V0X3BhcmFtc190b191cmwoKTtcbiAgICAgIH0sXG4gICAgICBhcnJfaWR4X2NoZWNrZWQ6IGZ1bmN0aW9uIChuZXd2OiBib29sZWFuLCBvbGR2OiBib29sZWFuKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5hcnJfaWR4ID0gbmV3diA/IDEgOiAwO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2V0X3BhcmFtc190b191cmwoKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG4gIGNvbnN0IHBhcmFtcyA9IGxvYWRfcGFyYW1zX2Zyb21fdXJsKCk7XG4gIGFwcC4kZGF0YS5zdHIgPSBwYXJhbXMuc3RyO1xuICBhcHAuJGRhdGEuYXJyX2lkeF9jaGVja2VkID0gcGFyYW1zLmFycl9pZHhfY2hlY2tlZDtcbiAgY29uc29sZS5sb2coYXBwLmNoYXJzKTtcbn07XG5cbm1haW4oKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=