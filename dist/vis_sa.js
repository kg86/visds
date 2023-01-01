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
/*!***********************!*\
  !*** ./src/vis_sa.ts ***!
  \***********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
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
                history.replaceState({}, "", url.toString());
            },
        },
        watch: {
            str: function (newv, oldv) {
                console.log("watch str");
                // @ts-ignore
                this.chars = getChars(newv);
                const sa = (0, sa_1.getSA)(newv);
                // @ts-ignore
                this.sa = sa;
                // @ts-ignore
                console.log("lcp", (0, sa_1.getLCP)(newv, sa));
                // @ts-ignore
                this.lcpa = (0, sa_1.getLCP)(newv, sa);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixhQUFhO2dCQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUM7U0FDRjtLQUNGLENBQUMsQ0FBQztJQUNILE1BQU0sTUFBTSxHQUFHLG9CQUFvQixFQUFFLENBQUM7SUFDdEMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUMzQixHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUVGLElBQUksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlzZHMvLi9zcmMvc2EudHMiLCJ3ZWJwYWNrOi8vdmlzZHMvLi9zcmMvc3RybGliLnRzIiwid2VicGFjazovL3Zpc2RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Zpc2RzLy4vc3JjL3Zpc19zYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsY3AgfSBmcm9tIFwiLi9zdHJsaWJcIjtcblxuZXhwb3J0IGNvbnN0IGdldFNBID0gKHN0cjogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiA9PiB7XG4gIGNvbnN0IG4gPSBzdHIubGVuZ3RoO1xuICBjb25zdCBzYSA9IG5ldyBBcnJheTxudW1iZXI+KG4pO1xuICBjb25zdCByYW5rID0gbmV3IEFycmF5KG4pO1xuICBjb25zdCBuZXdfcmFuayA9IG5ldyBBcnJheShuKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBzYVtpXSA9IGk7XG4gICAgcmFua1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIC8vc2hvd1NBKHN0ciwgc2EpXG5cbiAgZm9yIChsZXQgayA9IDE7IGsgPCBuOyBrICo9IDIpIHtcbiAgICBmdW5jdGlvbiBjb21wYXJlX3NhKGk6IG51bWJlciwgajogbnVtYmVyKSB7XG4gICAgICBpZiAocmFua1tpXSAhPSByYW5rW2pdKSByZXR1cm4gcmFua1tpXSAtIHJhbmtbal07XG4gICAgICBsZXQgcmkgPSAtMTtcbiAgICAgIGxldCByaiA9IC0xO1xuICAgICAgaWYgKGkgKyBrIDwgbikgcmkgPSByYW5rW2kgKyBrXTtcbiAgICAgIGlmIChqICsgayA8IG4pIHJqID0gcmFua1tqICsga107XG4gICAgICByZXR1cm4gcmkgLSByajtcbiAgICB9XG4gICAgc2Euc29ydChjb21wYXJlX3NhKTtcbiAgICBuZXdfcmFua1tzYVswXV0gPSAwO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgICBjb25zdCBtYXRjaCA9IGNvbXBhcmVfc2Eoc2FbaSAtIDFdLCBzYVtpXSkgPyAxIDogMDtcbiAgICAgIG5ld19yYW5rW3NhW2ldXSA9IG5ld19yYW5rW3NhW2kgLSAxXV0gKyBtYXRjaDtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHJhbmtbaV0gPSBuZXdfcmFua1tpXTtcbiAgfVxuICByZXR1cm4gc2E7XG59O1xuXG5mdW5jdGlvbiBzaG93U0Eoc3RyOiBzdHJpbmcsIHNhOiBudW1iZXJbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKGksIHNhW2ldLCBzdHIuc3Vic3RyKHNhW2ldKSwgc3RyLmNoYXJDb2RlQXQoc2FbaV0pKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0TENQID0gKHN0cjogc3RyaW5nLCBzYTogbnVtYmVyW10pOiBBcnJheTxudW1iZXI+ID0+IHtcbiAgY29uc3QgbGNwYSA9IG5ldyBBcnJheTxudW1iZXI+KHN0ci5sZW5ndGgpO1xuICBsY3BhWzBdID0gMDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBsY3BhW2ldID0gbGNwKHN0ci5zdWJzdHIoc2FbaSAtIDFdKSwgc3RyLnN1YnN0cihzYVtpXSkpO1xuICB9XG4gIHJldHVybiBsY3BhO1xufTtcbiIsImV4cG9ydCBjb25zdCBsY3AgPSAoeDogc3RyaW5nLCB5OiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICBjb25zdCBuID0gTWF0aC5taW4oeC5sZW5ndGgsIHkubGVuZ3RoKTtcbiAgbGV0IGkgPSAwO1xuICBmb3IgKDsgaSA8IG47IGkrKykge1xuICAgIGlmICh4W2ldICE9PSB5W2ldKSBicmVhaztcbiAgfVxuICByZXR1cm4gaTtcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IHsgZ2V0TENQLCBnZXRTQSB9IGZyb20gXCIuL3NhXCI7XG5jbGFzcyBDaGFyIHtcbiAgY2hhcjogc3RyaW5nO1xuICBpc0w6IGJvb2xlYW47XG4gIGlkeDogbnVtYmVyO1xuICBpc0xNTDogYm9vbGVhbjtcbiAgaXNMTVM6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2hhcjogc3RyaW5nLFxuICAgIGlzTDogYm9vbGVhbixcbiAgICBpZHg6IG51bWJlcixcbiAgICBsbWw6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICBsbXM6IGJvb2xlYW4gPSBmYWxzZVxuICApIHtcbiAgICB0aGlzLmNoYXIgPSBjaGFyO1xuICAgIHRoaXMuaXNMID0gaXNMO1xuICAgIHRoaXMuaWR4ID0gaWR4O1xuICAgIHRoaXMuaXNMTUwgPSBsbWw7XG4gICAgdGhpcy5pc0xNUyA9IGxtcztcbiAgfVxufVxuXG4vLyByZXR1cm4gdGhlIENoYXIgYXJyYXlcbmZ1bmN0aW9uIGdldENoYXJzKHN0cjogc3RyaW5nKSB7XG4gIGxldCBjaGFyczogQ2hhcltdID0gW107XG4gIGxldCBwcmV2X0wgPSBmYWxzZTtcbiAgY2hhcnMucHVzaChuZXcgQ2hhcihzdHJbc3RyLmxlbmd0aCAtIDFdLCBwcmV2X0wsIHN0ci5sZW5ndGggLSAxKSk7XG4gIGZvciAobGV0IGkgPSBzdHIubGVuZ3RoIC0gMjsgaSA+PSAwOyBpLS0pIHtcbiAgICBjb25zdCBjID0gc3RyW2ldO1xuICAgIGNvbnN0IGlzTDogYm9vbGVhbiA9IGMgPiBzdHJbaSArIDFdIHx8IChjID09IHN0cltpICsgMV0gJiYgcHJldl9MKTtcbiAgICBsZXQgbG1sID0gZmFsc2U7XG4gICAgbGV0IGxtcyA9IGZhbHNlO1xuICAgIGlmIChpc0wgJiYgKGkgPT0gMCB8fCBzdHJbaSAtIDFdIDwgc3RyW2ldKSkgbG1sID0gdHJ1ZTtcbiAgICBpZiAoIWlzTCAmJiAoaSA9PSAwIHx8IHN0cltpIC0gMV0gPiBzdHJbaV0pKSBsbXMgPSB0cnVlO1xuICAgIGNoYXJzLnB1c2gobmV3IENoYXIoYywgaXNMLCBpLCBsbWwsIGxtcykpO1xuICAgIHByZXZfTCA9IGlzTDtcbiAgfVxuICBjaGFycy5yZXZlcnNlKCk7XG4gIGNvbnNvbGUubG9nKFwiZ2V0Q2hhcnNcIiwgc3RyLCBjaGFycyk7XG4gIHJldHVybiBjaGFycztcbn1cblxuaW50ZXJmYWNlIFBhcmFtcyB7XG4gIHN0cjogc3RyaW5nO1xuICBhcnJfaWR4X2NoZWNrZWQ6IGJvb2xlYW47XG59XG5cbmNvbnN0IGxvYWRfcGFyYW1zX2Zyb21fdXJsID0gKCkgPT4ge1xuICBjb25zdCBxdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XG4gIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMocXVlcnlTdHJpbmcpO1xuICBsZXQgcGFyYW1zOiBQYXJhbXMgPSB7XG4gICAgc3RyOiBcIm1pc3Npc3NpcHBpJFwiLFxuICAgIGFycl9pZHhfY2hlY2tlZDogZmFsc2UsXG4gIH07XG5cbiAgY29uc3QgdXJsa2V5ID0gdXJsUGFyYW1zLmdldChcInN0clwiKTtcbiAgaWYgKHVybGtleSAhPT0gbnVsbCkgcGFyYW1zLnN0ciA9IHVybGtleTtcbiAgcGFyYW1zLmFycl9pZHhfY2hlY2tlZCA9IHVybFBhcmFtcy5nZXQoXCJhcnJfaWR4X2NoZWNrZWRcIikgPT09IFwidHJ1ZVwiO1xuICByZXR1cm4gcGFyYW1zO1xufTtcblxuY29uc3QgbWFpbiA9ICgpID0+IHtcbiAgLy8gQHRzLWlnbm9yZVxuICBsZXQgYXBwID0gbmV3IFZ1ZSh7XG4gICAgZWw6IFwiI2lucHV0X3N0clwiLFxuICAgIGRhdGE6IHtcbiAgICAgIHN0cjogXCJcIixcbiAgICAgIGNoYXJzOiBbXSxcbiAgICAgIHNhOiBbXSxcbiAgICAgIGxjcGE6IFtdLFxuICAgICAgYXJyX2lkeDogMCxcbiAgICAgIGFycl9pZHhfY2hlY2tlZDogZmFsc2UsXG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICBzZXRTdHI6IGZ1bmN0aW9uIChzdHI6IHN0cmluZykge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuc3RyID0gc3RyO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY2hhcnMgPSBnZXRDaGFycyh0aGlzLnN0cik7XG4gICAgICB9LFxuICAgICAgcmFuZ2U6IGZ1bmN0aW9uIHJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlcikge1xuICAgICAgICBjb25zdCByZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGZyb207IGkgPCB0bzsgaSsrKSByZXMucHVzaChpKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0sXG4gICAgICBzZXRfcGFyYW1zX3RvX3VybDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBwYXJhbXM6IFBhcmFtcyA9IHtcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgc3RyOiB0aGlzLnN0cixcbiAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgYXJyX2lkeF9jaGVja2VkOiB0aGlzLmFycl9pZHgsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLnRvU3RyaW5nKCkpO1xuICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMocGFyYW1zKSkge1xuICAgICAgICAgIHVybC5zZWFyY2hQYXJhbXMuc2V0KGtleSwgcGFyYW1zW2tleSBhcyBrZXlvZiBQYXJhbXNdLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBcIlwiLCB1cmwudG9TdHJpbmcoKSk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgIHN0cjogZnVuY3Rpb24gKG5ld3Y6IHN0cmluZywgb2xkdjogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwid2F0Y2ggc3RyXCIpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuY2hhcnMgPSBnZXRDaGFycyhuZXd2KTtcbiAgICAgICAgY29uc3Qgc2EgPSBnZXRTQShuZXd2KTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNhID0gc2E7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc29sZS5sb2coXCJsY3BcIiwgZ2V0TENQKG5ld3YsIHNhKSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5sY3BhID0gZ2V0TENQKG5ld3YsIHNhKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldF9wYXJhbXNfdG9fdXJsKCk7XG4gICAgICB9LFxuICAgICAgYXJyX2lkeF9jaGVja2VkOiBmdW5jdGlvbiAobmV3djogYm9vbGVhbiwgb2xkdjogYm9vbGVhbikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHRoaXMuYXJyX2lkeCA9IG5ld3YgPyAxIDogMDtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB0aGlzLnNldF9wYXJhbXNfdG9fdXJsKCk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuICBjb25zdCBwYXJhbXMgPSBsb2FkX3BhcmFtc19mcm9tX3VybCgpO1xuICBhcHAuJGRhdGEuc3RyID0gcGFyYW1zLnN0cjtcbiAgYXBwLiRkYXRhLmFycl9pZHhfY2hlY2tlZCA9IHBhcmFtcy5hcnJfaWR4X2NoZWNrZWQ7XG4gIGNvbnNvbGUubG9nKGFwcC5jaGFycyk7XG59O1xuXG5tYWluKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=