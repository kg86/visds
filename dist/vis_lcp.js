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
    res[0] = 'normal';
    for (let i = 1; i < n; i++) {
        if (str[sa[i]] !== str[sa[i - 1]]) {
            res[sa[i]] = 'normal';
        }
        else {
            if (sa[i] === 0 || sa[i - 1] === 0)
                res[sa[i]] = 'irreducible';
            else if (str[sa[i] - 1] === str[sa[i - 1] - 1])
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJsaWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19sY3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHdFQUE4QjtBQUVqQixhQUFLLEdBQUcsQ0FBQyxHQUFXLEVBQWlCLEVBQUU7SUFDbEQsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU07SUFDcEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQVMsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN6QixNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDN0IsS0FBSyxJQUFJLENBQUMs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QUMsTUFBTSxFQUFFLENBQUMsRUFBRTtvQkFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFDbkQsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUk7Z0JBQ2hCLGFBQWE7Z0JBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDcEMsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUM1QixhQUFhO2dCQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ3ZDLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDbEMsYUFBYTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUN4QyxhQUFhO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDbEMsQ0FBQztTQUNGO0tBQ0YsQ0FBQztJQUNGLE1BQU0sR0FBRyxHQUFHLGNBQWM7SUFDMUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRztJQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDdEIsVUFBSyxDQUFDLEdBQUcsQ0FBQztBQUNaLENBQUM7QUFFRCxJQUFJLEVBQUUiLCJmaWxlIjoidmlzX2xjcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3Zpc19sY3AudHNcIik7XG4iLCJpbXBvcnQgeyBsY3AgfSBmcm9tICcuL3N0cmxpYidcblxuZXhwb3J0IGNvbnN0IGdldFNBID0gKHN0cjogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoXG4gIGNvbnN0IHNhID0gbmV3IEFycmF5PG51bWJlcj4obilcbiAgY29uc3QgcmFuayA9IG5ldyBBcnJheShuKVxuICBjb25zdCBuZXdfcmFuayA9IG5ldyBBcnJheShuKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHNhW2ldID0gaVxuICAgIHJhbmtbaV0gPSBzdHIuY2hhckNvZGVBdChpKVxuICB9XG4gIC8vc2hvd1NBKHN0ciwgc2EpXG5cbiAgZm9yIChsZXQgayA9IDE7IGsgPCBuOyBrICo9IDIpIHtcbiAgICBmdW5jdGlvbiBjb21wYXJlX3NhKGk6IG51bWJlciwgajogbnVtYmVyKSB7XG4gICAgICBpZiAocmFua1tpXSAhPSByYW5rW2pdKSByZXR1cm4gcmFua1tpXSAtIHJhbmtbal1cbiAgICAgIGxldCByaSA9IC0xXG4gICAgICBsZXQgcmogPSAtMVxuICAgICAgaWYgKGkgKyBrIDwgbikgcmkgPSByYW5rW2kgKyBrXVxuICAgICAgaWYgKGogKyBrIDwgbikgcmogPSByYW5rW2ogKyBrXVxuICAgICAgcmV0dXJuIHJpIC0gcmpcbiAgICB9XG4gICAgc2Euc29ydChjb21wYXJlX3NhKVxuICAgIG5ld19yYW5rW3NhWzBdXSA9IDBcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgY29uc3QgbWF0Y2ggPSBjb21wYXJlX3NhKHNhW2kgLSAxXSwgc2FbaV0pID8gMSA6IDBcbiAgICAgIG5ld19yYW5rW3NhW2ldXSA9IG5ld19yYW5rW3NhW2kgLSAxXV0gKyBtYXRjaFxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgcmFua1tpXSA9IG5ld19yYW5rW2ldXG4gIH1cbiAgcmV0dXJuIHNhXG59XG5cbmZ1bmN0aW9uIHNob3dTQShzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc29sZS5sb2coaSwgc2FbaV0sIHN0ci5zdWJzdHIoc2FbaV0pLCBzdHIuY2hhckNvZGVBdChzYVtpXSkpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldExDUCA9IChzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKTogQXJyYXk8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IGxjcGEgPSBuZXcgQXJyYXk8bnVtYmVyPihzdHIubGVuZ3RoKVxuICBsY3BhWzBdID0gMFxuICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGxjcGFbaV0gPSBsY3Aoc3RyLnN1YnN0cihzYVtpIC0gMV0pLCBzdHIuc3Vic3RyKHNhW2ldKSlcbiAgfVxuICByZXR1cm4gbGNwYVxufVxuIiwiZXhwb3J0IGNvbnN0IGxjcCA9ICh4OiBzdHJpbmcsIHk6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gIGNvbnN0IG4gPSBNYXRoLm1pbih4Lmxlbmd0aCwgeS5sZW5ndGgpXG4gIGxldCBpID0gMFxuICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgIGlmICh4W2ldICE9PSB5W2ldKSBicmVha1xuICB9XG4gIHJldHVybiBpXG59XG4iLCJpbXBvcnQgeyBsY3AgfSBmcm9tICcuL3N0cmxpYidcbmltcG9ydCB7IGdldFNBLCBnZXRMQ1AgfSBmcm9tICcuL3NhJ1xuXG4vKipcbiAqIHJldHVybiBjaGFyYWN0ZXIgdHlwZSBhcnJheSBgY3R5cGVgXG4gKiBjdHlwZVtpXSA9ICdub3JtYWwnIGlmIGxjcFtyYW5rW2ldXT09PTBcbiAqIGN0eXBlW2ldID0gJ3JlZHVjaWJsZScgaWYgbGNwW3JhbmtbaV1dID4gMCAmJiBCV1RbcmFua1tpXV0gPT09IEJXVFtyYW5rW2ldLTFdXG4gKiBjdHlwZVtpXSA9ICdpcnJlZHVjaWJsZScgb3RoZXJ3aXNlXG4gKiBAcGFyYW0gc3RyXG4gKiBAcGFyYW0gc2FcbiAqL1xuY29uc3QgZ2V0Q2hhclR5cGUgPSAoc3RyOiBzdHJpbmcsIHNhOiBudW1iZXJbXSk6IHN0cmluZ1tdID0+IHtcbiAgY29uc3QgbiA9IHN0ci5sZW5ndGhcbiAgY29uc3QgcmVzID0gQXJyYXk8c3RyaW5nPihuKVxuICByZXNbMF0gPSAnbm9ybWFsJ1xuICBmb3IgKGxldCBpID0gMTsgaSA8IG47IGkrKykge1xuICAgIGlmIChzdHJbc2FbaV1dICE9PSBzdHJbc2FbaSAtIDFdXSkge1xuICAgICAgcmVzW3NhW2ldXSA9ICdub3JtYWwnXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzYVtpXSA9PT0gMCB8fCBzYVtpIC0gMV0gPT09IDApIHJlc1tzYVtpXV0gPSAnaXJyZWR1Y2libGUnXG4gICAgICBlbHNlIGlmIChzdHJbc2FbaV0gLSAxXSA9PT0gc3RyW3NhW2kgLSAxXSAtIDFdKSByZXNbc2FbaV1dID0gJ2lycmVkdWNpYmxlJ1xuICAgICAgZWxzZSByZXNbc2FbaV1dID0gJ3JlZHVjaWJsZSdcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5jb25zdCBnZXRSZWR1Y2libGUgPSAoc3RyOiBzdHJpbmcsIHNhOiBudW1iZXJbXSk6IGJvb2xlYW5bXSA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoXG4gIGNvbnN0IHJlcyA9IEFycmF5PGJvb2xlYW4+KG4pXG4gIHJlc1tzYVswXV0gPSBmYWxzZVxuICBmb3IgKGxldCBpID0gMTsgaSA8IG47IGkrKykge1xuICAgIGlmIChzYVtpXSA9PT0gMCB8fCBzYVtpIC0gMV0gPT09IDApIHJlc1tzYVtpXV0gPSBmYWxzZVxuICAgIGVsc2UgaWYgKHN0cltzYVtpXSAtIDFdID09PSBzdHJbc2FbaSAtIDFdIC0gMV0pIHJlc1tzYVtpXV0gPSBmYWxzZVxuICAgIGVsc2UgcmVzW3NhW2ldXSA9IHRydWVcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgbGV0IGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI2lucHV0X3N0cicsXG4gICAgZGF0YToge1xuICAgICAgc3RyOiAnYWJjZGUnLFxuICAgICAgc2E6IFtdLFxuICAgICAgcmFuazogW10sXG4gICAgICBsY3BhOiBbXSxcbiAgICAgIHJlZHVjaWJsZTogW10sXG4gICAgICBjdHlwZTogW10sXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBzZXRTdHI6IGZ1bmN0aW9uKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zdHIgPSBzdHJcbiAgICAgIH0sXG4gICAgICByYW5nZTogZnVuY3Rpb24gcmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IG5ldyBBcnJheSgpXG4gICAgICAgIGZvciAobGV0IGkgPSBmcm9tOyBpIDwgdG87IGkrKykgcmVzLnB1c2goaSlcbiAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgfSxcbiAgICB9LFxuICAgIHdhdGNoOiB7XG4gICAgICBzdHI6IGZ1bmN0aW9uKG5ld3Y6IHN0cmluZywgb2xkdjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3YXRjaCBzdHInKVxuICAgICAgICBjb25zdCBzYSA9IGdldFNBKG5ld3YpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zYSA9IHNhXG4gICAgICAgIGNvbnN0IHJhbmsgPSBuZXcgQXJyYXk8bnVtYmVyPihuZXd2Lmxlbmd0aClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzYS5sZW5ndGg7IGkrKykgcmFua1tzYVtpXV0gPSBpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5yYW5rID0gcmFua1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnNvbGUubG9nKCdsY3AnLCBnZXRMQ1AobmV3diwgc2EpKVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMubGNwYSA9IGdldExDUChuZXd2LCBzYSlcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnJlZHVjaWJsZSA9IGdldFJlZHVjaWJsZShuZXd2LCBzYSlcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmN0eXBlID0gZ2V0Q2hhclR5cGUobmV3diwgc2EpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc29sZS5sb2coJ3JlZHVjaWJsZScsIHRoaXMucmVkdWNpYmxlKVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnNvbGUubG9nKCdjdHlwZScsIHRoaXMuY3R5cGUpXG4gICAgICB9LFxuICAgIH0sXG4gIH0pXG4gIGNvbnN0IHN0ciA9ICdtaXNzaXNzaXBwaSQnXG4gIGFwcC4kZGF0YS5zdHIgPSBzdHJcbiAgY29uc29sZS5sb2coYXBwLmNoYXJzKVxuICBnZXRTQShzdHIpXG59XG5cbm1haW4oKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==