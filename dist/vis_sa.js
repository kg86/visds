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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhLnRzIiwid2VicGFjazovLy8uL3NyYy9zdHJsaWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19zYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsd0VBQThCO0FBRWpCLGFBQUssR0FBRyxDQUFDLEdBQVcsRUFBaUIsRUFBRTtJQUNsRCxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTTtJQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBUyxDQUFDLENBQUM7SUFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3QixLQUFLLElBQUksQ0FBQyxH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QztZQUM5QixDQUFDO1lBQ0QsZUFBZSxFQUFFLFVBQVUsSUFBYSxFQUFFLElBQWE7Z0JBQ3JELGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixDQUFDO1NBQ0Y7S0FDRixDQUFDO0lBQ0YsTUFBTSxHQUFHLEdBQUcsY0FBYztJQUMxQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHO0lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUN0QixVQUFLLENBQUMsR0FBRyxDQUFDO0FBQ1osQ0FBQztBQUVELElBQUksRUFBRSIsImZpbGUiOiJ2aXNfc2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy92aXNfc2EudHNcIik7XG4iLCJpbXBvcnQgeyBsY3AgfSBmcm9tICcuL3N0cmxpYidcblxuZXhwb3J0IGNvbnN0IGdldFNBID0gKHN0cjogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoXG4gIGNvbnN0IHNhID0gbmV3IEFycmF5PG51bWJlcj4obilcbiAgY29uc3QgcmFuayA9IG5ldyBBcnJheShuKVxuICBjb25zdCBuZXdfcmFuayA9IG5ldyBBcnJheShuKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHNhW2ldID0gaVxuICAgIHJhbmtbaV0gPSBzdHIuY2hhckNvZGVBdChpKVxuICB9XG4gIC8vc2hvd1NBKHN0ciwgc2EpXG5cbiAgZm9yIChsZXQgayA9IDE7IGsgPCBuOyBrICo9IDIpIHtcbiAgICBmdW5jdGlvbiBjb21wYXJlX3NhKGk6IG51bWJlciwgajogbnVtYmVyKSB7XG4gICAgICBpZiAocmFua1tpXSAhPSByYW5rW2pdKSByZXR1cm4gcmFua1tpXSAtIHJhbmtbal1cbiAgICAgIGxldCByaSA9IC0xXG4gICAgICBsZXQgcmogPSAtMVxuICAgICAgaWYgKGkgKyBrIDwgbikgcmkgPSByYW5rW2kgKyBrXVxuICAgICAgaWYgKGogKyBrIDwgbikgcmogPSByYW5rW2ogKyBrXVxuICAgICAgcmV0dXJuIHJpIC0gcmpcbiAgICB9XG4gICAgc2Euc29ydChjb21wYXJlX3NhKVxuICAgIG5ld19yYW5rW3NhWzBdXSA9IDBcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IG47IGkrKykge1xuICAgICAgY29uc3QgbWF0Y2ggPSBjb21wYXJlX3NhKHNhW2kgLSAxXSwgc2FbaV0pID8gMSA6IDBcbiAgICAgIG5ld19yYW5rW3NhW2ldXSA9IG5ld19yYW5rW3NhW2kgLSAxXV0gKyBtYXRjaFxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykgcmFua1tpXSA9IG5ld19yYW5rW2ldXG4gIH1cbiAgcmV0dXJuIHNhXG59XG5cbmZ1bmN0aW9uIHNob3dTQShzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc29sZS5sb2coaSwgc2FbaV0sIHN0ci5zdWJzdHIoc2FbaV0pLCBzdHIuY2hhckNvZGVBdChzYVtpXSkpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldExDUCA9IChzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKTogQXJyYXk8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IGxjcGEgPSBuZXcgQXJyYXk8bnVtYmVyPihzdHIubGVuZ3RoKVxuICBsY3BhWzBdID0gMFxuICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGxjcGFbaV0gPSBsY3Aoc3RyLnN1YnN0cihzYVtpIC0gMV0pLCBzdHIuc3Vic3RyKHNhW2ldKSlcbiAgfVxuICByZXR1cm4gbGNwYVxufVxuIiwiZXhwb3J0IGNvbnN0IGxjcCA9ICh4OiBzdHJpbmcsIHk6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gIGNvbnN0IG4gPSBNYXRoLm1pbih4Lmxlbmd0aCwgeS5sZW5ndGgpXG4gIGxldCBpID0gMFxuICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgIGlmICh4W2ldICE9PSB5W2ldKSBicmVha1xuICB9XG4gIHJldHVybiBpXG59XG4iLCJpbXBvcnQgeyBsY3AgfSBmcm9tICcuL3N0cmxpYidcbmltcG9ydCB7IGdldFNBLCBnZXRMQ1AgfSBmcm9tICcuL3NhJ1xuY2xhc3MgQ2hhciB7XG4gIGNoYXI6IHN0cmluZ1xuICBpc0w6IGJvb2xlYW5cbiAgaWR4OiBudW1iZXJcbiAgaXNMTUw6IGJvb2xlYW5cbiAgaXNMTVM6IGJvb2xlYW5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBjaGFyOiBzdHJpbmcsXG4gICAgaXNMOiBib29sZWFuLFxuICAgIGlkeDogbnVtYmVyLFxuICAgIGxtbDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGxtczogYm9vbGVhbiA9IGZhbHNlLFxuICApIHtcbiAgICB0aGlzLmNoYXIgPSBjaGFyXG4gICAgdGhpcy5pc0wgPSBpc0xcbiAgICB0aGlzLmlkeCA9IGlkeFxuICAgIHRoaXMuaXNMTUwgPSBsbWxcbiAgICB0aGlzLmlzTE1TID0gbG1zXG4gIH1cbn1cblxuLy8gcmV0dXJuIHRoZSBDaGFyIGFycmF5XG5mdW5jdGlvbiBnZXRDaGFycyhzdHI6IHN0cmluZykge1xuICBsZXQgY2hhcnM6IENoYXJbXSA9IFtdXG4gIGxldCBwcmV2X0wgPSBmYWxzZVxuICBjaGFycy5wdXNoKG5ldyBDaGFyKHN0cltzdHIubGVuZ3RoIC0gMV0sIHByZXZfTCwgc3RyLmxlbmd0aCAtIDEpKVxuICBmb3IgKGxldCBpID0gc3RyLmxlbmd0aCAtIDI7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgYyA9IHN0cltpXVxuICAgIGNvbnN0IGlzTDogYm9vbGVhbiA9IGMgPiBzdHJbaSArIDFdIHx8IChjID09IHN0cltpICsgMV0gJiYgcHJldl9MKVxuICAgIGxldCBsbWwgPSBmYWxzZVxuICAgIGxldCBsbXMgPSBmYWxzZVxuICAgIGlmIChpc0wgJiYgKGkgPT0gMCB8fCBzdHJbaSAtIDFdIDwgc3RyW2ldKSkgbG1sID0gdHJ1ZVxuICAgIGlmICghaXNMICYmIChpID09IDAgfHwgc3RyW2kgLSAxXSA+IHN0cltpXSkpIGxtcyA9IHRydWVcbiAgICBjaGFycy5wdXNoKG5ldyBDaGFyKGMsIGlzTCwgaSwgbG1sLCBsbXMpKVxuICAgIHByZXZfTCA9IGlzTFxuICB9XG4gIGNoYXJzLnJldmVyc2UoKVxuICBjb25zb2xlLmxvZygnZ2V0Q2hhcnMnLCBzdHIsIGNoYXJzKVxuICByZXR1cm4gY2hhcnNcbn1cblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgLy8gQHRzLWlnbm9yZVxuICBsZXQgYXBwID0gbmV3IFZ1ZSh7XG4gICAgZWw6ICcjaW5wdXRfc3RyJyxcbiAgICBkYXRhOiB7XG4gICAgICBzdHI6ICdhYmNkZScsXG4gICAgICAvL2NoYXJzOiBbJ2EnLCAnYiddXG4gICAgICBjaGFyczogW10sXG4gICAgICBzYTogW10sXG4gICAgICBsY3BhOiBbXSxcbiAgICAgIGFycl9pZHg6IDAsXG4gICAgICBhcnJfaWR4X2NoZWNrZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgc2V0U3RyOiBmdW5jdGlvbihzdHI6IHN0cmluZykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc3RyID0gc3RyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jaGFycyA9IGdldENoYXJzKHRoaXMuc3RyKVxuICAgICAgfSxcbiAgICAgIHJhbmdlOiBmdW5jdGlvbiByYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcmVzID0gbmV3IEFycmF5KClcbiAgICAgICAgZm9yIChsZXQgaSA9IGZyb207IGkgPCB0bzsgaSsrKSByZXMucHVzaChpKVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9LFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHN0cjogZnVuY3Rpb24obmV3djogc3RyaW5nLCBvbGR2OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3dhdGNoIHN0cicpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jaGFycyA9IGdldENoYXJzKG5ld3YpXG4gICAgICAgIGNvbnN0IHNhID0gZ2V0U0EobmV3dilcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNhID0gc2FcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zb2xlLmxvZygnbGNwJywgZ2V0TENQKG5ld3YsIHNhKSlcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLmxjcGEgPSBnZXRMQ1AobmV3diwgc2EpXG4gICAgICB9LFxuICAgICAgYXJyX2lkeF9jaGVja2VkOiBmdW5jdGlvbiAobmV3djogYm9vbGVhbiwgb2xkdjogYm9vbGVhbikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuYXJyX2lkeCA9IG5ld3YgPyAxIDogMFxuICAgICAgfVxuICAgIH0sXG4gIH0pXG4gIGNvbnN0IHN0ciA9ICdtaXNzaXNzaXBwaSQnXG4gIGFwcC4kZGF0YS5zdHIgPSBzdHJcbiAgY29uc29sZS5sb2coYXBwLmNoYXJzKVxuICBnZXRTQShzdHIpXG59XG5cbm1haW4oKVxuIl0sInNvdXJjZVJvb3QiOiIifQ==