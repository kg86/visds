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

/***/ "./src/vis_sa.ts":
/*!***********************!*\
  !*** ./src/vis_sa.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

class Char {
    constructor(char, isL, idx, lml = false, lms = false) {
        this.char = char;
        this.isL = isL;
        this.idx = idx;
        this.isLML = lml;
        this.isLMS = lms;
    }
}
//let test=range(0, 10)
//console.log(test)
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
function showSA(str, sa) {
    for (let i = 0; i < str.length; i++) {
        console.log(i, sa[i], str.substr(sa[i]), str.charCodeAt(sa[i]));
    }
}
function getSA(str) {
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
            // return rj - ri
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
    //console.log('finish')
    //showSA(str, sa)
}
function setstr() {
    console.log('setstr');
    const input_text = document.getElementById('in_str');
    console.log(input_text.value);
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
                // @ts-ignore
                this.sa = getSA(newv);
            },
        },
    });
    console.log(app);
    console.log(app.chars);
    let str = 'しまうまのしまうまよ$';
    str = 'All About ホームページ作成';
    str = 'mississippi$';
    app.$data.str = str;
    //app.setStr(str)
    console.log(app.chars);
    getSA(str);
    //message.$data.chars = [{char:'a'}, {char:'b'}]
    console.log('hoge');
};
main();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Zpc19zYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7OztBQ2xGQSxNQUFNLElBQUk7SUFPUixZQUNFLElBQVksRUFDWixHQUFZLEVBQ1osR0FBVyxFQUNYLE1BQWUsS0FBSyxFQUNwQixNQUFlLEtBQUs7UUFFcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRztRQUNkLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRztRQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRztRQUNoQixJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUc7SUFDbEIsQ0FBQztDQUNGO0FBRUQsdUJBQXVCO0FBQ3ZCLG1CQUFtQjtBQUVuQix3QkFBd0I7QUFDeEIsU0FBUyxR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Q0FBQyxJQUFJLENBQUM7Z0JBQzNCLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7U0FDRjtLQUNGLENBQUM7SUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7SUFDdEIsSUFBSSxHQUFHLEdBQUcsYUFBYTtJQUN2QixHQUFHLEdBQUcsb0JBQW9CO0lBQzFCLEdBQUcsR0FBRyxjQUFjO0lBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUc7SUFDbkIsaUJBQWlCO0lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDO0lBRVYsZ0RBQWdEO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3JCLENBQUM7QUFDRCxJQUFJLEVBQUUiLCJmaWxlIjoidmlzX3NhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvdmlzX3NhLnRzXCIpO1xuIiwiY2xhc3MgQ2hhciB7XG4gIGNoYXI6IHN0cmluZ1xuICBpc0w6IGJvb2xlYW5cbiAgaWR4OiBudW1iZXJcbiAgaXNMTUw6IGJvb2xlYW5cbiAgaXNMTVM6IGJvb2xlYW5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBjaGFyOiBzdHJpbmcsXG4gICAgaXNMOiBib29sZWFuLFxuICAgIGlkeDogbnVtYmVyLFxuICAgIGxtbDogYm9vbGVhbiA9IGZhbHNlLFxuICAgIGxtczogYm9vbGVhbiA9IGZhbHNlLFxuICApIHtcbiAgICB0aGlzLmNoYXIgPSBjaGFyXG4gICAgdGhpcy5pc0wgPSBpc0xcbiAgICB0aGlzLmlkeCA9IGlkeFxuICAgIHRoaXMuaXNMTUwgPSBsbWxcbiAgICB0aGlzLmlzTE1TID0gbG1zXG4gIH1cbn1cblxuLy9sZXQgdGVzdD1yYW5nZSgwLCAxMClcbi8vY29uc29sZS5sb2codGVzdClcblxuLy8gcmV0dXJuIHRoZSBDaGFyIGFycmF5XG5mdW5jdGlvbiBnZXRDaGFycyhzdHI6IHN0cmluZykge1xuICBsZXQgY2hhcnM6IENoYXJbXSA9IFtdXG4gIGxldCBwcmV2X0wgPSBmYWxzZVxuICBjaGFycy5wdXNoKG5ldyBDaGFyKHN0cltzdHIubGVuZ3RoIC0gMV0sIHByZXZfTCwgc3RyLmxlbmd0aCAtIDEpKVxuICBmb3IgKGxldCBpID0gc3RyLmxlbmd0aCAtIDI7IGkgPj0gMDsgaS0tKSB7XG4gICAgY29uc3QgYyA9IHN0cltpXVxuICAgIGNvbnN0IGlzTDogYm9vbGVhbiA9IGMgPiBzdHJbaSArIDFdIHx8IChjID09IHN0cltpICsgMV0gJiYgcHJldl9MKVxuICAgIGxldCBsbWwgPSBmYWxzZVxuICAgIGxldCBsbXMgPSBmYWxzZVxuICAgIGlmIChpc0wgJiYgKGkgPT0gMCB8fCBzdHJbaSAtIDFdIDwgc3RyW2ldKSkgbG1sID0gdHJ1ZVxuICAgIGlmICghaXNMICYmIChpID09IDAgfHwgc3RyW2kgLSAxXSA+IHN0cltpXSkpIGxtcyA9IHRydWVcbiAgICBjaGFycy5wdXNoKG5ldyBDaGFyKGMsIGlzTCwgaSwgbG1sLCBsbXMpKVxuICAgIHByZXZfTCA9IGlzTFxuICB9XG4gIGNoYXJzLnJldmVyc2UoKVxuICBjb25zb2xlLmxvZygnZ2V0Q2hhcnMnLCBzdHIsIGNoYXJzKVxuICByZXR1cm4gY2hhcnNcbn1cbmZ1bmN0aW9uIHNob3dTQShzdHI6IHN0cmluZywgc2E6IG51bWJlcltdKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc29sZS5sb2coaSwgc2FbaV0sIHN0ci5zdWJzdHIoc2FbaV0pLCBzdHIuY2hhckNvZGVBdChzYVtpXSkpXG4gIH1cbn1cbmZ1bmN0aW9uIGdldFNBKHN0cjogc3RyaW5nKSB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoXG4gIGNvbnN0IHNhID0gbmV3IEFycmF5KG4pXG4gIGNvbnN0IHJhbmsgPSBuZXcgQXJyYXkobilcbiAgY29uc3QgbmV3X3JhbmsgPSBuZXcgQXJyYXkobilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBzYVtpXSA9IGlcbiAgICByYW5rW2ldID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgfVxuICAvL3Nob3dTQShzdHIsIHNhKVxuXG4gIGZvciAobGV0IGsgPSAxOyBrIDwgbjsgayAqPSAyKSB7XG4gICAgZnVuY3Rpb24gY29tcGFyZV9zYShpOiBudW1iZXIsIGo6IG51bWJlcikge1xuICAgICAgaWYgKHJhbmtbaV0gIT0gcmFua1tqXSkgcmV0dXJuIHJhbmtbaV0gLSByYW5rW2pdXG4gICAgICBsZXQgcmkgPSAtMVxuICAgICAgbGV0IHJqID0gLTFcbiAgICAgIGlmIChpICsgayA8IG4pIHJpID0gcmFua1tpICsga11cbiAgICAgIGlmIChqICsgayA8IG4pIHJqID0gcmFua1tqICsga11cbiAgICAgIC8vIHJldHVybiByaiAtIHJpXG4gICAgICByZXR1cm4gcmkgLSByalxuICAgIH1cbiAgICBzYS5zb3J0KGNvbXBhcmVfc2EpXG4gICAgbmV3X3Jhbmtbc2FbMF1dID0gMFxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGNvbXBhcmVfc2Eoc2FbaSAtIDFdLCBzYVtpXSkgPyAxIDogMFxuICAgICAgbmV3X3Jhbmtbc2FbaV1dID0gbmV3X3Jhbmtbc2FbaSAtIDFdXSArIG1hdGNoXG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSByYW5rW2ldID0gbmV3X3JhbmtbaV1cbiAgfVxuICByZXR1cm4gc2FcbiAgLy9jb25zb2xlLmxvZygnZmluaXNoJylcbiAgLy9zaG93U0Eoc3RyLCBzYSlcbn1cblxuZnVuY3Rpb24gc2V0c3RyKCkge1xuICBjb25zb2xlLmxvZygnc2V0c3RyJylcbiAgY29uc3QgaW5wdXRfdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbl9zdHInKSBhcyBIVE1MSW5wdXRFbGVtZW50XG4gIGNvbnNvbGUubG9nKGlucHV0X3RleHQudmFsdWUpXG59XG5cbmNvbnN0IG1haW4gPSAoKSA9PiB7XG4gIC8vIEB0cy1pZ25vcmVcbiAgbGV0IGFwcCA9IG5ldyBWdWUoe1xuICAgIGVsOiAnI2lucHV0X3N0cicsXG4gICAgZGF0YToge1xuICAgICAgc3RyOiAnYWJjZGUnLFxuICAgICAgLy9jaGFyczogWydhJywgJ2InXVxuICAgICAgY2hhcnM6IFtdLFxuICAgICAgc2E6IFtdLFxuICAgIH0sXG4gICAgbWV0aG9kczoge1xuICAgICAgc2V0U3RyOiBmdW5jdGlvbihzdHI6IHN0cmluZykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc3RyID0gc3RyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jaGFycyA9IGdldENoYXJzKHRoaXMuc3RyKVxuICAgICAgfSxcbiAgICAgIHJhbmdlOiBmdW5jdGlvbiByYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcmVzID0gbmV3IEFycmF5KClcbiAgICAgICAgZm9yIChsZXQgaSA9IGZyb207IGkgPCB0bzsgaSsrKSByZXMucHVzaChpKVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9LFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHN0cjogZnVuY3Rpb24obmV3djogc3RyaW5nLCBvbGR2OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3dhdGNoIHN0cicpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5jaGFycyA9IGdldENoYXJzKG5ld3YpXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5zYSA9IGdldFNBKG5ld3YpXG4gICAgICB9LFxuICAgIH0sXG4gIH0pXG4gIGNvbnNvbGUubG9nKGFwcClcbiAgY29uc29sZS5sb2coYXBwLmNoYXJzKVxuICBsZXQgc3RyID0gJ+OBl+OBvuOBhuOBvuOBruOBl+OBvuOBhuOBvuOCiCQnXG4gIHN0ciA9ICdBbGwgQWJvdXQg44Ob44O844Og44Oa44O844K45L2c5oiQJ1xuICBzdHIgPSAnbWlzc2lzc2lwcGkkJ1xuICBhcHAuJGRhdGEuc3RyID0gc3RyXG4gIC8vYXBwLnNldFN0cihzdHIpXG4gIGNvbnNvbGUubG9nKGFwcC5jaGFycylcbiAgZ2V0U0Eoc3RyKVxuXG4gIC8vbWVzc2FnZS4kZGF0YS5jaGFycyA9IFt7Y2hhcjonYSd9LCB7Y2hhcjonYid9XVxuICBjb25zb2xlLmxvZygnaG9nZScpXG59XG5tYWluKClcbiJdLCJzb3VyY2VSb290IjoiIn0=