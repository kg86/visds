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
            res[sa[i]] = 'normal';
        }
        else {
            if (sa[i] === 0 || sa[i - 1] === 0)
                res[sa[i]] = 'irreducible';
            else if (str[sa[i] - 1] !== str[sa[i - 1] - 1])
                res[sa[i]] = 'irreducible';
            else
                res[sa[i]] = 'reducible';
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
const main = () => {
    // @ts-ignore
    let app = new Vue({
        el: '#input_str',
        data: {
            str: 'abcde',
            sa: [],
            rank: [],
            lcpa: [],
            reducible: [],
            ctype: [],
            arr_idx: 0,
            arr_idx_checked: false,
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
        },
        watch: {
            str: function (newv, oldv) {
                console.log('watch str');
                const sa = sa_1.getSA(newv);
                // @ts-ignore
                this.sa = sa;
                const rank = new Array(newv.length);
                for (let i = 0; i < sa.length; i++)
                    rank[sa[i]] = i;
                // @ts-ignore
                this.rank = rank;
                // @ts-ignore
                console.log('lcp', sa_1.getLCP(newv, sa));
                // @ts-ignore
                this.lcpa = sa_1.getLCP(newv, sa);
                // @ts-ignore
                this.reducible = getReducible(newv, sa);
                // @ts-ignore
                this.ctype = getCharType(newv, sa);
                // @ts-ignore
                console.log('reducible', this.reducible);
                // @ts-ignore
                console.log('ctype', this.ctype);
            },
            arr_idx_checked: function (newv, oldv) {
                // @ts-ignore
                this.arr_idx = newv ? 1 : 0;
            }
        },
    });
    const str = 'mississippi$';
    app.$data.str = str;
    console.log(app.chars);
    sa_1.getSA(str);
};
main();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJsaWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19sY3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHdFQUE4QjtBQUVqQixhQUFLLEdBQUcsQ0FBQyxHQUFXLEVBQWlCLEVBQUU7SUFDbEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU07SUFDcEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQVMsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0IsS0FBSyxJQUFJLENBQUMs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OlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdmlzX2xjcC50c1wiKTtcbiIsImltcG9ydCB7IGxjcCB9IGZyb20gJy4vc3RybGliJ1xuXG5leHBvcnQgY29uc3QgZ2V0U0EgPSAoc3RyOiBzdHJpbmcpOiBBcnJheTxudW1iZXI+ID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGhcbiAgY29uc3Qgc2EgPSBuZXcgQXJyYXk8bnVtYmVyPihuKVxuICBjb25zdCByYW5rID0gbmV3IEFycmF5KG4pXG4gIGNvbnN0IG5ld19yYW5rID0gbmV3IEFycmF5KG4pXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgc2FbaV0gPSBpXG4gICAgcmFua1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gIH1cbiAgLy9zaG93U0Eoc3RyLCBzYSlcblxuICBmb3IgKGxldCBrID0gMTsgayA8IG47IGsgKj0gMikge1xuICAgIGZ1bmN0aW9uIGNvbXBhcmVfc2EoaTogbnVtYmVyLCBqOiBudW1iZXIpIHtcbiAgICAgIGlmIChyYW5rW2ldICE9IHJhbmtbal0pIHJldHVybiByYW5rW2ldIC0gcmFua1tqXVxuICAgICAgbGV0IHJpID0gLTFcbiAgICAgIGxldCByaiA9IC0xXG4gICAgICBpZiAoaSArIGsgPCBuKSByaSA9IHJhbmtbaSArIGtdXG4gICAgICBpZiAoaiArIGsgPCBuKSByaiA9IHJhbmtbaiArIGtdXG4gICAgICByZXR1cm4gcmkgLSByalxuICAgIH1cbiAgICBzYS5zb3J0KGNvbXBhcmVfc2EpXG4gICAgbmV3X3Jhbmtbc2FbMF1dID0gMFxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGNvbXBhcmVfc2Eoc2FbaSAtIDFdLCBzYVtpXSkgPyAxIDogMFxuICAgICAgbmV3X3Jhbmtbc2FbaV1dID0gbmV3X3Jhbmtbc2FbaSAtIDFdXSArIG1hdGNoXG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSByYW5rW2ldID0gbmV3X3JhbmtbaV1cbiAgfVxuICByZXR1cm4gc2Fcbn1cblxuZnVuY3Rpb24gc2hvd1NBKHN0cjogc3RyaW5nLCBzYTogbnVtYmVyW10pIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zb2xlLmxvZyhpLCBzYVtpXSwgc3RyLnN1YnN0cihzYVtpXSksIHN0ci5jaGFyQ29kZUF0KHNhW2ldKSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TENQID0gKHN0cjogc3RyaW5nLCBzYTogbnVtYmVyW10pOiBBcnJheTxudW1iZXI+ID0+IHtcbiAgY29uc3QgbGNwYSA9IG5ldyBBcnJheTxudW1iZXI+KHN0ci5sZW5ndGgpXG4gIGxjcGFbMF0gPSAwXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgbGNwYVtpXSA9IGxjcChzdHIuc3Vic3RyKHNhW2kgLSAxXSksIHN0ci5zdWJzdHIoc2FbaV0pKVxuICB9XG4gIHJldHVybiBsY3BhXG59XG4iLCJleHBvcnQgY29uc3QgbGNwID0gKHg6IHN0cmluZywgeTogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgY29uc3QgbiA9IE1hdGgubWluKHgubGVuZ3RoLCB5Lmxlbmd0aClcbiAgbGV0IGkgPSAwXG4gIGZvciAoOyBpIDwgbjsgaSsrKSB7XG4gICAgaWYgKHhbaV0gIT09IHlbaV0pIGJyZWFrXG4gIH1cbiAgcmV0dXJuIGlcbn1cbiIsImltcG9ydCB7IGxjcCB9IGZyb20gJy4vc3RybGliJ1xuaW1wb3J0IHsgZ2V0U0EsIGdldExDUCB9IGZyb20gJy4vc2EnXG5cbi8qKlxuICogcmV0dXJuIGNoYXJhY3RlciB0eXBlIGFycmF5IGBjdHlwZWBcbiAqIGN0eXBlW2ldID0gJ25vcm1hbCcgaWYgbGNwW3JhbmtbaV1dPT09MFxuICogY3R5cGVbaV0gPSAncmVkdWNpYmxlJyBpZiBsY3BbcmFua1tpXV0gPiAwICYmIEJXVFtyYW5rW2ldXSA9PT0gQldUW3JhbmtbaV0tMV1cbiAqIGN0eXBlW2ldID0gJ2lycmVkdWNpYmxlJyBvdGhlcndpc2VcbiAqIEBwYXJhbSBzdHJcbiAqIEBwYXJhbSBzYVxuICovXG5jb25zdCBnZXRDaGFyVHlwZSA9IChzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKTogc3RyaW5nW10gPT4ge1xuICBjb25zdCBuID0gc3RyLmxlbmd0aFxuICBjb25zdCByZXMgPSBBcnJheTxzdHJpbmc+KG4pXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgaWYgKHN0cltzYVtpXV0gIT09IHN0cltzYVtpIC0gMV1dKSB7XG4gICAgICByZXNbc2FbaV1dID0gJ25vcm1hbCdcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNhW2ldID09PSAwIHx8IHNhW2kgLSAxXSA9PT0gMCkgcmVzW3NhW2ldXSA9ICdpcnJlZHVjaWJsZSdcbiAgICAgIGVsc2UgaWYgKHN0cltzYVtpXSAtIDFdICE9PSBzdHJbc2FbaSAtIDFdIC0gMV0pIHJlc1tzYVtpXV0gPSAnaXJyZWR1Y2libGUnXG4gICAgICBlbHNlIHJlc1tzYVtpXV0gPSAncmVkdWNpYmxlJ1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IGdldFJlZHVjaWJsZSA9IChzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKTogYm9vbGVhbltdID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGhcbiAgY29uc3QgcmVzID0gQXJyYXk8Ym9vbGVhbj4obilcbiAgcmVzW3NhWzBdXSA9IGZhbHNlXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgaWYgKHNhW2ldID09PSAwIHx8IHNhW2kgLSAxXSA9PT0gMCkgcmVzW3NhW2ldXSA9IGZhbHNlXG4gICAgZWxzZSBpZiAoc3RyW3NhW2ldIC0gMV0gPT09IHN0cltzYVtpIC0gMV0gLSAxXSkgcmVzW3NhW2ldXSA9IGZhbHNlXG4gICAgZWxzZSByZXNbc2FbaV1dID0gdHJ1ZVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgLy8gQHRzLWlnbm9yZVxuICBsZXQgYXBwID0gbmV3IFZ1ZSh7XG4gICAgZWw6ICcjaW5wdXRfc3RyJyxcbiAgICBkYXRhOiB7XG4gICAgICBzdHI6ICdhYmNkZScsXG4gICAgICBzYTogW10sXG4gICAgICByYW5rOiBbXSxcbiAgICAgIGxjcGE6IFtdLFxuICAgICAgcmVkdWNpYmxlOiBbXSxcbiAgICAgIGN0eXBlOiBbXSxcbiAgICAgIGFycl9pZHg6IDAsXG4gICAgICBhcnJfaWR4X2NoZWNrZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgc2V0U3RyOiBmdW5jdGlvbihzdHI6IHN0cmluZykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc3RyID0gc3RyXG4gICAgICB9LFxuICAgICAgcmFuZ2U6IGZ1bmN0aW9uIHJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICAgICAgICBjb25zdCByZXMgPSBuZXcgQXJyYXkoKVxuICAgICAgICBmb3IgKGxldCBpID0gZnJvbTsgaSA8IHRvOyBpKyspIHJlcy5wdXNoKGkpXG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgc3RyOiBmdW5jdGlvbihuZXd2OiBzdHJpbmcsIG9sZHY6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnd2F0Y2ggc3RyJylcbiAgICAgICAgY29uc3Qgc2EgPSBnZXRTQShuZXd2KVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2EgPSBzYVxuICAgICAgICBjb25zdCByYW5rID0gbmV3IEFycmF5PG51bWJlcj4obmV3di5sZW5ndGgpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2EubGVuZ3RoOyBpKyspIHJhbmtbc2FbaV1dID0gaVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMucmFuayA9IHJhbmtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zb2xlLmxvZygnbGNwJywgZ2V0TENQKG5ld3YsIHNhKSlcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmxjcGEgPSBnZXRMQ1AobmV3diwgc2EpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5yZWR1Y2libGUgPSBnZXRSZWR1Y2libGUobmV3diwgc2EpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jdHlwZSA9IGdldENoYXJUeXBlKG5ld3YsIHNhKVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWR1Y2libGUnLCB0aGlzLnJlZHVjaWJsZSlcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zb2xlLmxvZygnY3R5cGUnLCB0aGlzLmN0eXBlKVxuICAgICAgfSxcbiAgICAgIGFycl9pZHhfY2hlY2tlZDogZnVuY3Rpb24gKG5ld3Y6IGJvb2xlYW4sIG9sZHY6IGJvb2xlYW4pIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmFycl9pZHggPSBuZXd2ID8gMSA6IDBcbiAgICAgIH1cbiAgICB9LFxuICB9KVxuICBjb25zdCBzdHIgPSAnbWlzc2lzc2lwcGkkJ1xuICBhcHAuJGRhdGEuc3RyID0gc3RyXG4gIGNvbnNvbGUubG9nKGFwcC5jaGFycylcbiAgZ2V0U0Eoc3RyKVxufVxuXG5tYWluKClcbiJdLCJzb3VyY2VSb290IjoiIn0=