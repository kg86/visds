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
    console.log('getChars', str, chars);
    return chars;
}
const main = () => {
    // @ts-ignore
    let app = new Vue({
        el: '#input_str',
        data: {
            str: 'abcde',
            //chars: ['a', 'b']
            chars: [],
            sa: [],
            lcpa: [],
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
        },
        watch: {
            str: function (newv, oldv) {
                console.log('watch str');
                // @ts-ignore
                this.chars = getChars(newv);
                const sa = sa_1.getSA(newv);
                // @ts-ignore
                this.sa = sa;
                // @ts-ignore
                console.log('lcp', sa_1.getLCP(newv, sa));
                // @ts-ignore
                this.lcpa = sa_1.getLCP(newv, sa);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJsaWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19zYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsd0VBQThCO0FBRWpCLGFBQUssR0FBRyxDQUFDLEdBQVcsRUFBaUIsRUFBRTtJQUNsRCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTTtJQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBUyxDQUFDLENBQUM7SUFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3QixLQUFLLElBQUksQ0FBQyxH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RyxHQUFHLGNBQWM7SUFDMUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRztJQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDdEIsVUFBSyxDQUFDLEdBQUcsQ0FBQztBQUNaLENBQUM7QUFFRCxJQUFJLEVBQUUiLCJmaWxlIjoidmlzX3NhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdmlzX3NhLnRzXCIpO1xuIiwiaW1wb3J0IHsgbGNwIH0gZnJvbSAnLi9zdHJsaWInXG5cbmV4cG9ydCBjb25zdCBnZXRTQSA9IChzdHI6IHN0cmluZyk6IEFycmF5PG51bWJlcj4gPT4ge1xuICBjb25zdCBuID0gc3RyLmxlbmd0aFxuICBjb25zdCBzYSA9IG5ldyBBcnJheTxudW1iZXI+KG4pXG4gIGNvbnN0IHJhbmsgPSBuZXcgQXJyYXkobilcbiAgY29uc3QgbmV3X3JhbmsgPSBuZXcgQXJyYXkobilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBzYVtpXSA9IGlcbiAgICByYW5rW2ldID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgfVxuICAvL3Nob3dTQShzdHIsIHNhKVxuXG4gIGZvciAobGV0IGsgPSAxOyBrIDwgbjsgayAqPSAyKSB7XG4gICAgZnVuY3Rpb24gY29tcGFyZV9zYShpOiBudW1iZXIsIGo6IG51bWJlcikge1xuICAgICAgaWYgKHJhbmtbaV0gIT0gcmFua1tqXSkgcmV0dXJuIHJhbmtbaV0gLSByYW5rW2pdXG4gICAgICBsZXQgcmkgPSAtMVxuICAgICAgbGV0IHJqID0gLTFcbiAgICAgIGlmIChpICsgayA8IG4pIHJpID0gcmFua1tpICsga11cbiAgICAgIGlmIChqICsgayA8IG4pIHJqID0gcmFua1tqICsga11cbiAgICAgIHJldHVybiByaSAtIHJqXG4gICAgfVxuICAgIHNhLnNvcnQoY29tcGFyZV9zYSlcbiAgICBuZXdfcmFua1tzYVswXV0gPSAwXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBuOyBpKyspIHtcbiAgICAgIGNvbnN0IG1hdGNoID0gY29tcGFyZV9zYShzYVtpIC0gMV0sIHNhW2ldKSA/IDEgOiAwXG4gICAgICBuZXdfcmFua1tzYVtpXV0gPSBuZXdfcmFua1tzYVtpIC0gMV1dICsgbWF0Y2hcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHJhbmtbaV0gPSBuZXdfcmFua1tpXVxuICB9XG4gIHJldHVybiBzYVxufVxuXG5mdW5jdGlvbiBzaG93U0Eoc3RyOiBzdHJpbmcsIHNhOiBudW1iZXJbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKGksIHNhW2ldLCBzdHIuc3Vic3RyKHNhW2ldKSwgc3RyLmNoYXJDb2RlQXQoc2FbaV0pKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRMQ1AgPSAoc3RyOiBzdHJpbmcsIHNhOiBudW1iZXJbXSk6IEFycmF5PG51bWJlcj4gPT4ge1xuICBjb25zdCBsY3BhID0gbmV3IEFycmF5PG51bWJlcj4oc3RyLmxlbmd0aClcbiAgbGNwYVswXSA9IDBcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBsY3BhW2ldID0gbGNwKHN0ci5zdWJzdHIoc2FbaSAtIDFdKSwgc3RyLnN1YnN0cihzYVtpXSkpXG4gIH1cbiAgcmV0dXJuIGxjcGFcbn1cbiIsImV4cG9ydCBjb25zdCBsY3AgPSAoeDogc3RyaW5nLCB5OiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBuID0gTWF0aC5taW4oeC5sZW5ndGgsIHkubGVuZ3RoKVxuICBsZXQgaSA9IDBcbiAgZm9yICg7IGkgPCBuOyBpKyspIHtcbiAgICBpZiAoeFtpXSAhPT0geVtpXSkgYnJlYWtcbiAgfVxuICByZXR1cm4gaVxufVxuIiwiaW1wb3J0IHsgbGNwIH0gZnJvbSAnLi9zdHJsaWInXG5pbXBvcnQgeyBnZXRTQSwgZ2V0TENQIH0gZnJvbSAnLi9zYSdcbmNsYXNzIENoYXIge1xuICBjaGFyOiBzdHJpbmdcbiAgaXNMOiBib29sZWFuXG4gIGlkeDogbnVtYmVyXG4gIGlzTE1MOiBib29sZWFuXG4gIGlzTE1TOiBib29sZWFuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2hhcjogc3RyaW5nLFxuICAgIGlzTDogYm9vbGVhbixcbiAgICBpZHg6IG51bWJlcixcbiAgICBsbWw6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBsbXM6IGJvb2xlYW4gPSBmYWxzZSxcbiAgKSB7XG4gICAgdGhpcy5jaGFyID0gY2hhclxuICAgIHRoaXMuaXNMID0gaXNMXG4gICAgdGhpcy5pZHggPSBpZHhcbiAgICB0aGlzLmlzTE1MID0gbG1sXG4gICAgdGhpcy5pc0xNUyA9IGxtc1xuICB9XG59XG5cbi8vIHJldHVybiB0aGUgQ2hhciBhcnJheVxuZnVuY3Rpb24gZ2V0Q2hhcnMoc3RyOiBzdHJpbmcpIHtcbiAgbGV0IGNoYXJzOiBDaGFyW10gPSBbXVxuICBsZXQgcHJldl9MID0gZmFsc2VcbiAgY2hhcnMucHVzaChuZXcgQ2hhcihzdHJbc3RyLmxlbmd0aCAtIDFdLCBwcmV2X0wsIHN0ci5sZW5ndGggLSAxKSlcbiAgZm9yIChsZXQgaSA9IHN0ci5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgIGNvbnN0IGMgPSBzdHJbaV1cbiAgICBjb25zdCBpc0w6IGJvb2xlYW4gPSBjID4gc3RyW2kgKyAxXSB8fCAoYyA9PSBzdHJbaSArIDFdICYmIHByZXZfTClcbiAgICBsZXQgbG1sID0gZmFsc2VcbiAgICBsZXQgbG1zID0gZmFsc2VcbiAgICBpZiAoaXNMICYmIChpID09IDAgfHwgc3RyW2kgLSAxXSA8IHN0cltpXSkpIGxtbCA9IHRydWVcbiAgICBpZiAoIWlzTCAmJiAoaSA9PSAwIHx8IHN0cltpIC0gMV0gPiBzdHJbaV0pKSBsbXMgPSB0cnVlXG4gICAgY2hhcnMucHVzaChuZXcgQ2hhcihjLCBpc0wsIGksIGxtbCwgbG1zKSlcbiAgICBwcmV2X0wgPSBpc0xcbiAgfVxuICBjaGFycy5yZXZlcnNlKClcbiAgY29uc29sZS5sb2coJ2dldENoYXJzJywgc3RyLCBjaGFycylcbiAgcmV0dXJuIGNoYXJzXG59XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgbGV0IGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI2lucHV0X3N0cicsXG4gICAgZGF0YToge1xuICAgICAgc3RyOiAnYWJjZGUnLFxuICAgICAgLy9jaGFyczogWydhJywgJ2InXVxuICAgICAgY2hhcnM6IFtdLFxuICAgICAgc2E6IFtdLFxuICAgICAgbGNwYTogW10sXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBzZXRTdHI6IGZ1bmN0aW9uKHN0cjogc3RyaW5nKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zdHIgPSBzdHJcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmNoYXJzID0gZ2V0Q2hhcnModGhpcy5zdHIpXG4gICAgICB9LFxuICAgICAgcmFuZ2U6IGZ1bmN0aW9uIHJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICAgICAgICBjb25zdCByZXMgPSBuZXcgQXJyYXkoKVxuICAgICAgICBmb3IgKGxldCBpID0gZnJvbTsgaSA8IHRvOyBpKyspIHJlcy5wdXNoKGkpXG4gICAgICAgIHJldHVybiByZXNcbiAgICAgIH0sXG4gICAgfSxcbiAgICB3YXRjaDoge1xuICAgICAgc3RyOiBmdW5jdGlvbihuZXd2OiBzdHJpbmcsIG9sZHY6IHN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnd2F0Y2ggc3RyJylcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmNoYXJzID0gZ2V0Q2hhcnMobmV3dilcbiAgICAgICAgY29uc3Qgc2EgPSBnZXRTQShuZXd2KVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc2EgPSBzYVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnNvbGUubG9nKCdsY3AnLCBnZXRMQ1AobmV3diwgc2EpKVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMubGNwYSA9IGdldExDUChuZXd2LCBzYSlcbiAgICAgIH0sXG4gICAgfSxcbiAgfSlcbiAgY29uc3Qgc3RyID0gJ21pc3Npc3NpcHBpJCdcbiAgYXBwLiRkYXRhLnN0ciA9IHN0clxuICBjb25zb2xlLmxvZyhhcHAuY2hhcnMpXG4gIGdldFNBKHN0cilcbn1cblxubWFpbigpXG4iXSwic291cmNlUm9vdCI6IiJ9