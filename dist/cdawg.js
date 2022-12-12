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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cdawg.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/cdawg.ts":
/*!**********************!*\
  !*** ./src/cdawg.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, process) {
Object.defineProperty(exports, "__esModule", { value: true });
class CNode {
    constructor(birth_time, depth) {
        this.birth_time = birth_time;
        this.depth = depth;
        this.slink = this;
        this.out_edges = new Map();
        this.in_edges = [];
    }
    get is_explicit() {
        return this.out_edges.size !== 1;
    }
}
class Edge {
    constructor(birth_time, text, parent, edge_beg, edge_len, child) {
        this.birth_time = birth_time;
        this.text = text;
        this.parent = parent;
        this.edge_beg = edge_beg;
        this.edge_len = edge_len;
        this.child = child;
    }
    charAt(i) {
        return this.text()[this.edge_beg + i];
    }
    get str() {
        if (this.edge_len > 0) {
            return this.text().substr(this.edge_beg, this.edge_len);
        }
        else {
            return this.text().substr(this.edge_beg);
        }
    }
    get len() {
        return this.edge_len === -1
            ? this.text().length - this.edge_beg
            : this.edge_len;
    }
    set len(val) {
        this.edge_len = val;
    }
    get is_open() {
        return this.edge_len === -1;
    }
}
const dummy_node = new CNode(-1, -1);
const dummy_edge = new Edge(-1, () => "", dummy_node, -1, -1, dummy_node);
// TopNode is an implicit node.
// The root node's suffix link points to the top node.
// There is a special edge from the top node to the root node, which we can move any characters.
class TopNode extends CNode {
    constructor(root) {
        super(-1, -1);
        this.root = root;
        this.edge = new Edge(-1, () => "", dummy_node, -1, -1, this.root);
    }
    get atNode() {
        return true;
    }
}
// It represents an implicit node which is located at match_len on an edge.
// If it is at node, edge is an dummy_edge and match_len = 0
class State {
    constructor(parent, edge = dummy_edge, match_len = 0) {
        if (parent instanceof TopNode) {
            // This is TopNode
            this.edge = parent.edge;
        }
        else {
            this.edge = edge;
        }
        this.parent = parent;
        this.match_len = match_len;
    }
    static create_at_node_state(parent) {
        return new State(parent, undefined, undefined);
    }
    get atNode() {
        return this.match_len === 0;
    }
    // return a state that can be moved from the current state with a character char.
    // if cannot, return undefined.
    move(char) {
        if (this.parent instanceof TopNode)
            return new State(this.edge.child);
        const can_move = this.atNode
            ? this.parent.out_edges.has(char)
            : this.edge.charAt(this.match_len) === char;
        // console.log('can_move', can_move)
        if (!can_move) {
            return undefined;
        }
        else {
            const edge = this.atNode
                ? this.parent.out_edges.get(char)
                : this.edge;
            const match_len = this.atNode ? 0 : this.match_len;
            if (match_len + 1 < edge.len) {
                return new State(this.parent, edge, match_len + 1);
            }
            else {
                return State.create_at_node_state(edge.child);
            }
        }
    }
}
class CDAWG {
    constructor() {
        this.text = "";
        this.nodes = [];
        this.edges = [];
        this.root = this.create_node(0);
        this.top_node = new TopNode(this.root);
        this.root.slink = this.top_node;
        this.sink = this.create_node(-1);
        this.ap = new State(this.root, undefined, 0);
    }
    create_node(depth) {
        const node = new CNode(this.nodes.length, depth);
        this.nodes.push(node);
        return node;
    }
    create_closed_edge(parent, edge_beg, edge_len, child) {
        const edge = new Edge(this.edges.length, () => this.text, parent, edge_beg, edge_len, child);
        this.edges.push(edge);
        parent.out_edges.set(this.text[edge_beg], edge);
        return edge;
    }
    create_open_edge(parent, edge_beg) {
        const edge = new Edge(this.edges.length, () => this.text, parent, edge_beg, -1, this.sink);
        this.edges.push(edge);
        parent.out_edges.set(this.text[edge_beg], edge);
        return edge;
    }
    // return a state that moved from node with text[beg:beg+len].
    // It is guranteed that we can move node with text[beg:beg+len].
    move_trust(node, text, beg, len) {
        const _move_trust = (node, text, beg, len) => {
            const edge = node.out_edges.get(text[beg]);
            if (len < edge.len) {
                return new State(node, edge, len);
            }
            else if (len === edge.len) {
                return State.create_at_node_state(edge.child);
            }
            else {
                return this.move_trust(edge.child, text, beg + edge.len, len - edge.len);
            }
        };
        if (len === 0)
            return new State(node);
        else if (node instanceof TopNode) {
            if (len === 1)
                return new State(node.root);
            else
                return _move_trust(node.root, text, beg + 1, len - 1);
        }
        else
            return _move_trust(node, text, beg, len);
    }
    // create new node that has out_edges of the give node.
    copy_node(node, num_in_edge_left) {
        const new_node = this.create_node(node.depth - num_in_edge_left);
        const out_edges = Array.from(node.out_edges.entries());
        out_edges.sort(); // for test
        for (const [k, edge] of out_edges) {
            this.create_closed_edge(new_node, edge.edge_beg, edge.edge_len, edge.child);
        }
        // split in_edges
        new_node.in_edges = node.in_edges.slice(num_in_edge_left);
        node.in_edges = node.in_edges.slice(0, num_in_edge_left);
        new_node.in_edges.forEach((edge) => {
            edge.child = new_node;
        });
        new_node.slink = node.slink;
        node.slink = new_node;
        return new_node;
    }
    split(state) {
        const branch_node = this.create_node(state.match_len);
        const in_edge = this.create_closed_edge(state.parent, state.edge.edge_beg, state.match_len, branch_node);
        state.edge.parent = branch_node;
        if (!state.edge.is_open)
            state.edge.edge_len -= state.match_len;
        state.edge.edge_beg += state.match_len;
        branch_node.out_edges.set(state.edge.charAt(0), state.edge);
        branch_node.in_edges.push(in_edge);
        return branch_node;
    }
    insert(char) {
        console.log();
        console.log("insert char[", char, "]");
        this.text += char;
        if (this.text.length === 1) {
            this.create_open_edge(this.root, 0);
            this.ap = new State(this.root);
            this.sink.slink = this.root;
            return;
        }
        let next_state;
        let prev_branch = undefined;
        let prev_destination = undefined;
        while ((next_state = this.ap.move(char)) === undefined) {
            console.log("ap", this.ap, this.ap.atNode);
            if (this.ap.atNode) {
                // if there is a previouslly processed node, create suffix link from it to the active point
                if (prev_branch)
                    prev_branch.slink = this.ap.parent;
                prev_branch = this.ap.parent;
                prev_destination = this.sink;
                this.create_open_edge(this.ap.parent, this.text.length - 1);
                this.ap = new State(this.ap.parent.slink);
                console.log("first ap", this.ap);
            }
            else if (prev_branch && this.ap.edge.child === prev_destination) {
                // if there is a previously processed node (prev_branch) and its destination is equal to the destination of the active point, merge the active point to the prev_branch
                this.ap.edge.child = prev_branch;
                this.ap.edge.len = this.ap.match_len;
                prev_branch.in_edges.push(this.ap.edge);
                this.ap = this.move_trust(this.ap.parent.slink, this.text, this.ap.edge.edge_beg, this.ap.match_len);
            }
            else {
                // split and create a new open edge
                const edge_beg = this.ap.edge.edge_beg;
                const edge_len = this.ap.match_len;
                const branch_node = this.split(this.ap);
                if (prev_branch)
                    prev_branch.slink = branch_node;
                prev_branch = branch_node;
                prev_destination = this.ap.edge.child;
                this.create_open_edge(branch_node, this.text.length - 1);
                this.ap = this.move_trust(this.ap.parent.slink, this.text, edge_beg, edge_len);
            }
        }
        if (prev_branch && this.ap.atNode)
            prev_branch.slink = this.ap.parent;
        if (next_state.atNode &&
            next_state.parent.depth >
                this.ap.parent.depth + (this.ap.atNode ? 1 : this.ap.edge.len)) {
            // we reached next_state with non-primary edge
            const branch_node = this.copy_node(next_state.parent, next_state.parent.depth -
                (this.ap.parent.depth + (this.ap.atNode ? 1 : this.ap.edge.len)));
            next_state = new State(branch_node);
        }
        this.ap = next_state;
        if (this.ap.atNode) {
            this.sink.slink = this.ap.parent;
        }
        else {
            this.sink.slink = this.sink;
        }
        console.log("insert end, ap is", this.ap);
    }
    /// transforms CDAWG implicit to explicit.
    /// creates a node corresponding to an active node.
    explicit() {
        let prev_node = this.sink;
        while (!this.ap.atNode) {
            const edge_beg = this.ap.edge.edge_beg;
            const match_len = this.ap.match_len;
            const node = this.split(this.ap);
            prev_node.slink = node;
            prev_node = node;
            this.ap = this.move_trust(this.ap.parent.slink, this.text, edge_beg, match_len);
        }
        prev_node.slink = this.ap.parent;
    }
    json(show_suffix_links = true) {
        const nodes = [];
        const edges = [];
        const nid = new Map();
        const max_roundness = 0.5;
        const min_roundness = -0.5;
        const roundness = (edge) => {
            const ebirth = Array.from(edge.parent.out_edges.values()).map((e) => [
                e.birth_time,
                e,
            ]);
            ebirth.sort();
            let birth_idx = -1;
            for (let i = 0; i < ebirth.length; i++) {
                if (ebirth[i][1] === edge) {
                    birth_idx = i;
                }
            }
            if (edge.parent.out_edges.size === 1)
                return 0.0;
            else
                return (min_roundness +
                    ((max_roundness - min_roundness) * birth_idx) /
                        (edge.parent.out_edges.size - 1));
        };
        this.nodes.forEach((node) => {
            const n = {
                label: "" + node.birth_time,
                id: node.birth_time,
                level: -1,
            };
            nid.set(node, node.birth_time);
            nodes.push(n);
        });
        if (show_suffix_links) {
            this.nodes.forEach((node) => {
                if (node.slink != node && node !== this.root) {
                    // if (node.slink && node !== this.root) {
                    const e = {
                        from: nid.get(node),
                        to: nid.get(node.slink),
                        id: "e[" + nid.get(node) + "]-[" + nid.get(node.slink) + "]",
                        dashes: true,
                        // color: { color: node.is_explicit ? '#848484' : '#ff0000' },
                        color: { color: "#848484" },
                        // , label: edge.str
                        font: { align: "top" },
                        smooth: { type: "curvedCW", roundness: 0.4 },
                    };
                    edges.push(e);
                }
            });
        }
        const set_level_rec = (node, level) => {
            const n = nodes[nid.get(node)];
            if (n.level < level) {
                n.level = level;
                node.out_edges.forEach((edge) => {
                    set_level_rec(edge.child, n.level + 1);
                });
            }
        };
        set_level_rec(this.root, 0);
        this.edges.forEach((edge) => {
            const e = {
                from: nid.get(edge.parent),
                to: nid.get(edge.child),
                id: "[" +
                    nid.get(edge.parent) +
                    "(" +
                    edge.len +
                    ")]-[" +
                    nid.get(edge.child) +
                    "]",
                label: edge.str,
                font: { align: "top" },
                smooth: { type: "curvedCW", roundness: roundness(edge) },
            };
            edges.push(e);
        });
        return { nodes, edges };
    }
}
exports.build_cdawg = (text, implicit_cdawg = false) => {
    const cdawg = new CDAWG();
    for (const c of text) {
        cdawg.insert(c);
    }
    if (!implicit_cdawg) {
        cdawg.explicit();
    }
    return cdawg;
};
const main = (text) => {
    console.log("text", text);
    const cdawg = exports.build_cdawg(text);
    console.log(cdawg);
    console.log(cdawg.json);
    return cdawg;
};
console.log(__webpack_require__.c[__webpack_require__.s] === module);
if (__webpack_require__.c[__webpack_require__.s] === module) {
    main(process.argv.length === 3 ? process.argv[2] : "abcabcaba");
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jZGF3Zy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQSxNQUFNLEtBQUs7SUFN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QyxDQUFDO1FBRUgsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFFWSxtQkFBVyxHQUFHLENBQUMsSUFBWSxFQUFFLGlCQUEwQixLQUFLLEVBQUUsRUFBRTtJQUMzRSxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQzFCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ3BCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7SUFDRCxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ25CLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRTtJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxQixNQUFNLEtBQUssR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUFZLEtBQUssTUFBTSxDQUFDLENBQUM7QUFDckMsSUFBSSw0Q0FBWSxLQUFLLE1BQU0sRUFBRTtJQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUNqRSIsImZpbGUiOiJjZGF3Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NkYXdnLnRzXCIpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImNsYXNzIENOb2RlIHtcbiAgYmlydGhfdGltZTogbnVtYmVyO1xuICBkZXB0aDogbnVtYmVyO1xuICBzbGluazogQ05vZGU7XG4gIG91dF9lZGdlczogTWFwPHN0cmluZywgRWRnZT47XG4gIGluX2VkZ2VzOiBBcnJheTxFZGdlPjtcbiAgY29uc3RydWN0b3IoYmlydGhfdGltZTogbnVtYmVyLCBkZXB0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5iaXJ0aF90aW1lID0gYmlydGhfdGltZTtcbiAgICB0aGlzLmRlcHRoID0gZGVwdGg7XG4gICAgdGhpcy5zbGluayA9IHRoaXM7XG4gICAgdGhpcy5vdXRfZWRnZXMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5pbl9lZGdlcyA9IFtdO1xuICB9XG5cbiAgZ2V0IGlzX2V4cGxpY2l0KCkge1xuICAgIHJldHVybiB0aGlzLm91dF9lZGdlcy5zaXplICE9PSAxO1xuICB9XG59XG5cbmNsYXNzIEVkZ2Uge1xuICBiaXJ0aF90aW1lOiBudW1iZXI7XG4gIHRleHQ6ICgpID0+IHN0cmluZztcbiAgcGFyZW50OiBDTm9kZTtcbiAgZWRnZV9iZWc6IG51bWJlcjtcbiAgZWRnZV9sZW46IG51bWJlcjtcbiAgY2hpbGQ6IENOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJpcnRoX3RpbWU6IG51bWJlcixcbiAgICB0ZXh0OiAoKSA9PiBzdHJpbmcsXG4gICAgcGFyZW50OiBDTm9kZSxcbiAgICBlZGdlX2JlZzogbnVtYmVyLFxuICAgIGVkZ2VfbGVuOiBudW1iZXIsXG4gICAgY2hpbGQ6IENOb2RlXG4gICkge1xuICAgIHRoaXMuYmlydGhfdGltZSA9IGJpcnRoX3RpbWU7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLmVkZ2VfYmVnID0gZWRnZV9iZWc7XG4gICAgdGhpcy5lZGdlX2xlbiA9IGVkZ2VfbGVuO1xuICAgIHRoaXMuY2hpbGQgPSBjaGlsZDtcbiAgfVxuXG4gIGNoYXJBdChpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRleHQoKVt0aGlzLmVkZ2VfYmVnICsgaV07XG4gIH1cblxuICBnZXQgc3RyKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZWRnZV9sZW4gPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkuc3Vic3RyKHRoaXMuZWRnZV9iZWcsIHRoaXMuZWRnZV9sZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkuc3Vic3RyKHRoaXMuZWRnZV9iZWcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsZW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlX2xlbiA9PT0gLTFcbiAgICAgID8gdGhpcy50ZXh0KCkubGVuZ3RoIC0gdGhpcy5lZGdlX2JlZ1xuICAgICAgOiB0aGlzLmVkZ2VfbGVuO1xuICB9XG5cbiAgc2V0IGxlbih2YWwpIHtcbiAgICB0aGlzLmVkZ2VfbGVuID0gdmFsO1xuICB9XG5cbiAgZ2V0IGlzX29wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZV9sZW4gPT09IC0xO1xuICB9XG59XG5cbmNvbnN0IGR1bW15X25vZGUgPSBuZXcgQ05vZGUoLTEsIC0xKTtcbmNvbnN0IGR1bW15X2VkZ2UgPSBuZXcgRWRnZSgtMSwgKCkgPT4gXCJcIiwgZHVtbXlfbm9kZSwgLTEsIC0xLCBkdW1teV9ub2RlKTtcblxuLy8gVG9wTm9kZSBpcyBhbiBpbXBsaWNpdCBub2RlLlxuLy8gVGhlIHJvb3Qgbm9kZSdzIHN1ZmZpeCBsaW5rIHBvaW50cyB0byB0aGUgdG9wIG5vZGUuXG4vLyBUaGVyZSBpcyBhIHNwZWNpYWwgZWRnZSBmcm9tIHRoZSB0b3Agbm9kZSB0byB0aGUgcm9vdCBub2RlLCB3aGljaCB3ZSBjYW4gbW92ZSBhbnkgY2hhcmFjdGVycy5cbmNsYXNzIFRvcE5vZGUgZXh0ZW5kcyBDTm9kZSB7XG4gIHJvb3Q6IENOb2RlO1xuICBlZGdlOiBFZGdlO1xuICBjb25zdHJ1Y3Rvcihyb290OiBDTm9kZSkge1xuICAgIHN1cGVyKC0xLCAtMSk7XG4gICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICB0aGlzLmVkZ2UgPSBuZXcgRWRnZSgtMSwgKCkgPT4gXCJcIiwgZHVtbXlfbm9kZSwgLTEsIC0xLCB0aGlzLnJvb3QpO1xuICB9XG5cbiAgZ2V0IGF0Tm9kZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vLyBJdCByZXByZXNlbnRzIGFuIGltcGxpY2l0IG5vZGUgd2hpY2ggaXMgbG9jYXRlZCBhdCBtYXRjaF9sZW4gb24gYW4gZWRnZS5cbi8vIElmIGl0IGlzIGF0IG5vZGUsIGVkZ2UgaXMgYW4gZHVtbXlfZWRnZSBhbmQgbWF0Y2hfbGVuID0gMFxuY2xhc3MgU3RhdGUge1xuICBzdGF0aWMgY3JlYXRlX2F0X25vZGVfc3RhdGUocGFyZW50OiBDTm9kZSk6IFN0YXRlIHtcbiAgICByZXR1cm4gbmV3IFN0YXRlKHBhcmVudCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICB9XG5cbiAgcGFyZW50OiBDTm9kZTtcbiAgZWRnZTogRWRnZTtcbiAgbWF0Y2hfbGVuOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHBhcmVudDogQ05vZGUsIGVkZ2U6IEVkZ2UgPSBkdW1teV9lZGdlLCBtYXRjaF9sZW46IG51bWJlciA9IDApIHtcbiAgICBpZiAocGFyZW50IGluc3RhbmNlb2YgVG9wTm9kZSkge1xuICAgICAgLy8gVGhpcyBpcyBUb3BOb2RlXG4gICAgICB0aGlzLmVkZ2UgPSBwYXJlbnQuZWRnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lZGdlID0gZWRnZTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5tYXRjaF9sZW4gPSBtYXRjaF9sZW47XG4gIH1cblxuICBnZXQgYXROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLm1hdGNoX2xlbiA9PT0gMDtcbiAgfVxuXG4gIC8vIHJldHVybiBhIHN0YXRlIHRoYXQgY2FuIGJlIG1vdmVkIGZyb20gdGhlIGN1cnJlbnQgc3RhdGUgd2l0aCBhIGNoYXJhY3RlciBjaGFyLlxuICAvLyBpZiBjYW5ub3QsIHJldHVybiB1bmRlZmluZWQuXG4gIG1vdmUoY2hhcjogc3RyaW5nKTogU3RhdGUgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnBhcmVudCBpbnN0YW5jZW9mIFRvcE5vZGUpIHJldHVybiBuZXcgU3RhdGUodGhpcy5lZGdlLmNoaWxkKTtcbiAgICBjb25zdCBjYW5fbW92ZSA9IHRoaXMuYXROb2RlXG4gICAgICA/IHRoaXMucGFyZW50Lm91dF9lZGdlcy5oYXMoY2hhcilcbiAgICAgIDogdGhpcy5lZGdlLmNoYXJBdCh0aGlzLm1hdGNoX2xlbikgPT09IGNoYXI7XG4gICAgLy8gY29uc29sZS5sb2coJ2Nhbl9tb3ZlJywgY2FuX21vdmUpXG4gICAgaWYgKCFjYW5fbW92ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZWRnZSA9IHRoaXMuYXROb2RlXG4gICAgICAgID8gKHRoaXMucGFyZW50Lm91dF9lZGdlcy5nZXQoY2hhcikgYXMgRWRnZSlcbiAgICAgICAgOiB0aGlzLmVkZ2U7XG4gICAgICBjb25zdCBtYXRjaF9sZW4gPSB0aGlzLmF0Tm9kZSA/IDAgOiB0aGlzLm1hdGNoX2xlbjtcbiAgICAgIGlmIChtYXRjaF9sZW4gKyAxIDwgZWRnZS5sZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZSh0aGlzLnBhcmVudCwgZWRnZSwgbWF0Y2hfbGVuICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gU3RhdGUuY3JlYXRlX2F0X25vZGVfc3RhdGUoZWRnZS5jaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENEQVdHIHtcbiAgdGV4dDogc3RyaW5nO1xuICBub2RlczogQXJyYXk8Q05vZGU+O1xuICBlZGdlczogQXJyYXk8RWRnZT47XG4gIHJvb3Q6IENOb2RlO1xuICB0b3Bfbm9kZTogVG9wTm9kZTtcbiAgc2luazogQ05vZGU7XG4gIGFwOiBTdGF0ZTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZXh0ID0gXCJcIjtcbiAgICB0aGlzLm5vZGVzID0gW107XG4gICAgdGhpcy5lZGdlcyA9IFtdO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuY3JlYXRlX25vZGUoMCk7XG4gICAgdGhpcy50b3Bfbm9kZSA9IG5ldyBUb3BOb2RlKHRoaXMucm9vdCk7XG4gICAgdGhpcy5yb290LnNsaW5rID0gdGhpcy50b3Bfbm9kZTtcbiAgICB0aGlzLnNpbmsgPSB0aGlzLmNyZWF0ZV9ub2RlKC0xKTtcbiAgICB0aGlzLmFwID0gbmV3IFN0YXRlKHRoaXMucm9vdCwgdW5kZWZpbmVkLCAwKTtcbiAgfVxuXG4gIGNyZWF0ZV9ub2RlKGRlcHRoOiBudW1iZXIpOiBDTm9kZSB7XG4gICAgY29uc3Qgbm9kZSA9IG5ldyBDTm9kZSh0aGlzLm5vZGVzLmxlbmd0aCwgZGVwdGgpO1xuICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNyZWF0ZV9jbG9zZWRfZWRnZShcbiAgICBwYXJlbnQ6IENOb2RlLFxuICAgIGVkZ2VfYmVnOiBudW1iZXIsXG4gICAgZWRnZV9sZW46IG51bWJlcixcbiAgICBjaGlsZDogQ05vZGVcbiAgKSB7XG4gICAgY29uc3QgZWRnZSA9IG5ldyBFZGdlKFxuICAgICAgdGhpcy5lZGdlcy5sZW5ndGgsXG4gICAgICAoKSA9PiB0aGlzLnRleHQsXG4gICAgICBwYXJlbnQsXG4gICAgICBlZGdlX2JlZyxcbiAgICAgIGVkZ2VfbGVuLFxuICAgICAgY2hpbGRcbiAgICApO1xuICAgIHRoaXMuZWRnZXMucHVzaChlZGdlKTtcbiAgICBwYXJlbnQub3V0X2VkZ2VzLnNldCh0aGlzLnRleHRbZWRnZV9iZWddLCBlZGdlKTtcbiAgICByZXR1cm4gZWRnZTtcbiAgfVxuXG4gIGNyZWF0ZV9vcGVuX2VkZ2UocGFyZW50OiBDTm9kZSwgZWRnZV9iZWc6IG51bWJlcikge1xuICAgIGNvbnN0IGVkZ2UgPSBuZXcgRWRnZShcbiAgICAgIHRoaXMuZWRnZXMubGVuZ3RoLFxuICAgICAgKCkgPT4gdGhpcy50ZXh0LFxuICAgICAgcGFyZW50LFxuICAgICAgZWRnZV9iZWcsXG4gICAgICAtMSxcbiAgICAgIHRoaXMuc2lua1xuICAgICk7XG4gICAgdGhpcy5lZGdlcy5wdXNoKGVkZ2UpO1xuICAgIHBhcmVudC5vdXRfZWRnZXMuc2V0KHRoaXMudGV4dFtlZGdlX2JlZ10sIGVkZ2UpO1xuICAgIHJldHVybiBlZGdlO1xuICB9XG5cbiAgLy8gcmV0dXJuIGEgc3RhdGUgdGhhdCBtb3ZlZCBmcm9tIG5vZGUgd2l0aCB0ZXh0W2JlZzpiZWcrbGVuXS5cbiAgLy8gSXQgaXMgZ3VyYW50ZWVkIHRoYXQgd2UgY2FuIG1vdmUgbm9kZSB3aXRoIHRleHRbYmVnOmJlZytsZW5dLlxuICBtb3ZlX3RydXN0KG5vZGU6IENOb2RlLCB0ZXh0OiBzdHJpbmcsIGJlZzogbnVtYmVyLCBsZW46IG51bWJlcik6IFN0YXRlIHtcbiAgICBjb25zdCBfbW92ZV90cnVzdCA9IChcbiAgICAgIG5vZGU6IENOb2RlLFxuICAgICAgdGV4dDogc3RyaW5nLFxuICAgICAgYmVnOiBudW1iZXIsXG4gICAgICBsZW46IG51bWJlclxuICAgICkgPT4ge1xuICAgICAgY29uc3QgZWRnZSA9IG5vZGUub3V0X2VkZ2VzLmdldCh0ZXh0W2JlZ10pIGFzIEVkZ2U7XG4gICAgICBpZiAobGVuIDwgZWRnZS5sZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZShub2RlLCBlZGdlLCBsZW4pO1xuICAgICAgfSBlbHNlIGlmIChsZW4gPT09IGVkZ2UubGVuKSB7XG4gICAgICAgIHJldHVybiBTdGF0ZS5jcmVhdGVfYXRfbm9kZV9zdGF0ZShlZGdlLmNoaWxkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVfdHJ1c3QoXG4gICAgICAgICAgZWRnZS5jaGlsZCxcbiAgICAgICAgICB0ZXh0LFxuICAgICAgICAgIGJlZyArIGVkZ2UubGVuLFxuICAgICAgICAgIGxlbiAtIGVkZ2UubGVuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAobGVuID09PSAwKSByZXR1cm4gbmV3IFN0YXRlKG5vZGUpO1xuICAgIGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBUb3BOb2RlKSB7XG4gICAgICBpZiAobGVuID09PSAxKSByZXR1cm4gbmV3IFN0YXRlKG5vZGUucm9vdCk7XG4gICAgICBlbHNlIHJldHVybiBfbW92ZV90cnVzdChub2RlLnJvb3QsIHRleHQsIGJlZyArIDEsIGxlbiAtIDEpO1xuICAgIH0gZWxzZSByZXR1cm4gX21vdmVfdHJ1c3Qobm9kZSwgdGV4dCwgYmVnLCBsZW4pO1xuICB9XG5cbiAgLy8gY3JlYXRlIG5ldyBub2RlIHRoYXQgaGFzIG91dF9lZGdlcyBvZiB0aGUgZ2l2ZSBub2RlLlxuICBjb3B5X25vZGUobm9kZTogQ05vZGUsIG51bV9pbl9lZGdlX2xlZnQ6IG51bWJlcikge1xuICAgIGNvbnN0IG5ld19ub2RlID0gdGhpcy5jcmVhdGVfbm9kZShub2RlLmRlcHRoIC0gbnVtX2luX2VkZ2VfbGVmdCk7XG4gICAgY29uc3Qgb3V0X2VkZ2VzID0gQXJyYXkuZnJvbShub2RlLm91dF9lZGdlcy5lbnRyaWVzKCkpO1xuICAgIG91dF9lZGdlcy5zb3J0KCk7IC8vIGZvciB0ZXN0XG4gICAgZm9yIChjb25zdCBbaywgZWRnZV0gb2Ygb3V0X2VkZ2VzKSB7XG4gICAgICB0aGlzLmNyZWF0ZV9jbG9zZWRfZWRnZShcbiAgICAgICAgbmV3X25vZGUsXG4gICAgICAgIGVkZ2UuZWRnZV9iZWcsXG4gICAgICAgIGVkZ2UuZWRnZV9sZW4sXG4gICAgICAgIGVkZ2UuY2hpbGRcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIHNwbGl0IGluX2VkZ2VzXG4gICAgbmV3X25vZGUuaW5fZWRnZXMgPSBub2RlLmluX2VkZ2VzLnNsaWNlKG51bV9pbl9lZGdlX2xlZnQpO1xuICAgIG5vZGUuaW5fZWRnZXMgPSBub2RlLmluX2VkZ2VzLnNsaWNlKDAsIG51bV9pbl9lZGdlX2xlZnQpO1xuXG4gICAgbmV3X25vZGUuaW5fZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgZWRnZS5jaGlsZCA9IG5ld19ub2RlO1xuICAgIH0pO1xuXG4gICAgbmV3X25vZGUuc2xpbmsgPSBub2RlLnNsaW5rO1xuICAgIG5vZGUuc2xpbmsgPSBuZXdfbm9kZTtcblxuICAgIHJldHVybiBuZXdfbm9kZTtcbiAgfVxuXG4gIHNwbGl0KHN0YXRlOiBTdGF0ZSkge1xuICAgIGNvbnN0IGJyYW5jaF9ub2RlID0gdGhpcy5jcmVhdGVfbm9kZShzdGF0ZS5tYXRjaF9sZW4pO1xuICAgIGNvbnN0IGluX2VkZ2UgPSB0aGlzLmNyZWF0ZV9jbG9zZWRfZWRnZShcbiAgICAgIHN0YXRlLnBhcmVudCxcbiAgICAgIHN0YXRlLmVkZ2UuZWRnZV9iZWcsXG4gICAgICBzdGF0ZS5tYXRjaF9sZW4sXG4gICAgICBicmFuY2hfbm9kZVxuICAgICk7XG5cbiAgICBzdGF0ZS5lZGdlLnBhcmVudCA9IGJyYW5jaF9ub2RlO1xuICAgIGlmICghc3RhdGUuZWRnZS5pc19vcGVuKSBzdGF0ZS5lZGdlLmVkZ2VfbGVuIC09IHN0YXRlLm1hdGNoX2xlbjtcbiAgICBzdGF0ZS5lZGdlLmVkZ2VfYmVnICs9IHN0YXRlLm1hdGNoX2xlbjtcbiAgICBicmFuY2hfbm9kZS5vdXRfZWRnZXMuc2V0KHN0YXRlLmVkZ2UuY2hhckF0KDApLCBzdGF0ZS5lZGdlKTtcblxuICAgIGJyYW5jaF9ub2RlLmluX2VkZ2VzLnB1c2goaW5fZWRnZSk7XG5cbiAgICByZXR1cm4gYnJhbmNoX25vZGU7XG4gIH1cblxuICBpbnNlcnQoY2hhcjogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coKTtcbiAgICBjb25zb2xlLmxvZyhcImluc2VydCBjaGFyW1wiLCBjaGFyLCBcIl1cIik7XG4gICAgdGhpcy50ZXh0ICs9IGNoYXI7XG4gICAgaWYgKHRoaXMudGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuY3JlYXRlX29wZW5fZWRnZSh0aGlzLnJvb3QsIDApO1xuICAgICAgdGhpcy5hcCA9IG5ldyBTdGF0ZSh0aGlzLnJvb3QpO1xuICAgICAgdGhpcy5zaW5rLnNsaW5rID0gdGhpcy5yb290O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgbmV4dF9zdGF0ZTogU3RhdGUgfCB1bmRlZmluZWQ7XG4gICAgbGV0IHByZXZfYnJhbmNoOiBDTm9kZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJldl9kZXN0aW5hdGlvbjogQ05vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgd2hpbGUgKChuZXh0X3N0YXRlID0gdGhpcy5hcC5tb3ZlKGNoYXIpKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImFwXCIsIHRoaXMuYXAsIHRoaXMuYXAuYXROb2RlKTtcbiAgICAgIGlmICh0aGlzLmFwLmF0Tm9kZSkge1xuICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHByZXZpb3VzbGx5IHByb2Nlc3NlZCBub2RlLCBjcmVhdGUgc3VmZml4IGxpbmsgZnJvbSBpdCB0byB0aGUgYWN0aXZlIHBvaW50XG4gICAgICAgIGlmIChwcmV2X2JyYW5jaCkgcHJldl9icmFuY2guc2xpbmsgPSB0aGlzLmFwLnBhcmVudDtcbiAgICAgICAgcHJldl9icmFuY2ggPSB0aGlzLmFwLnBhcmVudDtcbiAgICAgICAgcHJldl9kZXN0aW5hdGlvbiA9IHRoaXMuc2luaztcblxuICAgICAgICB0aGlzLmNyZWF0ZV9vcGVuX2VkZ2UodGhpcy5hcC5wYXJlbnQsIHRoaXMudGV4dC5sZW5ndGggLSAxKTtcblxuICAgICAgICB0aGlzLmFwID0gbmV3IFN0YXRlKHRoaXMuYXAucGFyZW50LnNsaW5rKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaXJzdCBhcFwiLCB0aGlzLmFwKTtcbiAgICAgIH0gZWxzZSBpZiAocHJldl9icmFuY2ggJiYgdGhpcy5hcC5lZGdlLmNoaWxkID09PSBwcmV2X2Rlc3RpbmF0aW9uKSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgcHJldmlvdXNseSBwcm9jZXNzZWQgbm9kZSAocHJldl9icmFuY2gpIGFuZCBpdHMgZGVzdGluYXRpb24gaXMgZXF1YWwgdG8gdGhlIGRlc3RpbmF0aW9uIG9mIHRoZSBhY3RpdmUgcG9pbnQsIG1lcmdlIHRoZSBhY3RpdmUgcG9pbnQgdG8gdGhlIHByZXZfYnJhbmNoXG4gICAgICAgIHRoaXMuYXAuZWRnZS5jaGlsZCA9IHByZXZfYnJhbmNoO1xuICAgICAgICB0aGlzLmFwLmVkZ2UubGVuID0gdGhpcy5hcC5tYXRjaF9sZW47XG4gICAgICAgIHByZXZfYnJhbmNoLmluX2VkZ2VzLnB1c2godGhpcy5hcC5lZGdlKTtcblxuICAgICAgICB0aGlzLmFwID0gdGhpcy5tb3ZlX3RydXN0KFxuICAgICAgICAgIHRoaXMuYXAucGFyZW50LnNsaW5rLFxuICAgICAgICAgIHRoaXMudGV4dCxcbiAgICAgICAgICB0aGlzLmFwLmVkZ2UuZWRnZV9iZWcsXG4gICAgICAgICAgdGhpcy5hcC5tYXRjaF9sZW5cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNwbGl0IGFuZCBjcmVhdGUgYSBuZXcgb3BlbiBlZGdlXG4gICAgICAgIGNvbnN0IGVkZ2VfYmVnID0gdGhpcy5hcC5lZGdlLmVkZ2VfYmVnO1xuICAgICAgICBjb25zdCBlZGdlX2xlbiA9IHRoaXMuYXAubWF0Y2hfbGVuO1xuXG4gICAgICAgIGNvbnN0IGJyYW5jaF9ub2RlID0gdGhpcy5zcGxpdCh0aGlzLmFwKTtcbiAgICAgICAgaWYgKHByZXZfYnJhbmNoKSBwcmV2X2JyYW5jaC5zbGluayA9IGJyYW5jaF9ub2RlO1xuICAgICAgICBwcmV2X2JyYW5jaCA9IGJyYW5jaF9ub2RlO1xuICAgICAgICBwcmV2X2Rlc3RpbmF0aW9uID0gdGhpcy5hcC5lZGdlLmNoaWxkO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlX29wZW5fZWRnZShicmFuY2hfbm9kZSwgdGhpcy50ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB0aGlzLmFwID0gdGhpcy5tb3ZlX3RydXN0KFxuICAgICAgICAgIHRoaXMuYXAucGFyZW50LnNsaW5rLFxuICAgICAgICAgIHRoaXMudGV4dCxcbiAgICAgICAgICBlZGdlX2JlZyxcbiAgICAgICAgICBlZGdlX2xlblxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJldl9icmFuY2ggJiYgdGhpcy5hcC5hdE5vZGUpIHByZXZfYnJhbmNoLnNsaW5rID0gdGhpcy5hcC5wYXJlbnQ7XG4gICAgaWYgKFxuICAgICAgbmV4dF9zdGF0ZS5hdE5vZGUgJiZcbiAgICAgIG5leHRfc3RhdGUucGFyZW50LmRlcHRoID5cbiAgICAgICAgdGhpcy5hcC5wYXJlbnQuZGVwdGggKyAodGhpcy5hcC5hdE5vZGUgPyAxIDogdGhpcy5hcC5lZGdlLmxlbilcbiAgICApIHtcbiAgICAgIC8vIHdlIHJlYWNoZWQgbmV4dF9zdGF0ZSB3aXRoIG5vbi1wcmltYXJ5IGVkZ2VcbiAgICAgIGNvbnN0IGJyYW5jaF9ub2RlID0gdGhpcy5jb3B5X25vZGUoXG4gICAgICAgIG5leHRfc3RhdGUucGFyZW50LFxuICAgICAgICBuZXh0X3N0YXRlLnBhcmVudC5kZXB0aCAtXG4gICAgICAgICAgKHRoaXMuYXAucGFyZW50LmRlcHRoICsgKHRoaXMuYXAuYXROb2RlID8gMSA6IHRoaXMuYXAuZWRnZS5sZW4pKVxuICAgICAgKTtcbiAgICAgIG5leHRfc3RhdGUgPSBuZXcgU3RhdGUoYnJhbmNoX25vZGUpO1xuICAgIH1cbiAgICB0aGlzLmFwID0gbmV4dF9zdGF0ZTtcbiAgICBpZiAodGhpcy5hcC5hdE5vZGUpIHtcbiAgICAgIHRoaXMuc2luay5zbGluayA9IHRoaXMuYXAucGFyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpbmsuc2xpbmsgPSB0aGlzLnNpbms7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiaW5zZXJ0IGVuZCwgYXAgaXNcIiwgdGhpcy5hcCk7XG4gIH1cblxuICAvLy8gdHJhbnNmb3JtcyBDREFXRyBpbXBsaWNpdCB0byBleHBsaWNpdC5cbiAgLy8vIGNyZWF0ZXMgYSBub2RlIGNvcnJlc3BvbmRpbmcgdG8gYW4gYWN0aXZlIG5vZGUuXG4gIGV4cGxpY2l0KCkge1xuICAgIGxldCBwcmV2X25vZGUgPSB0aGlzLnNpbms7XG4gICAgd2hpbGUgKCF0aGlzLmFwLmF0Tm9kZSkge1xuICAgICAgY29uc3QgZWRnZV9iZWcgPSB0aGlzLmFwLmVkZ2UuZWRnZV9iZWc7XG4gICAgICBjb25zdCBtYXRjaF9sZW4gPSB0aGlzLmFwLm1hdGNoX2xlbjtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnNwbGl0KHRoaXMuYXApO1xuICAgICAgcHJldl9ub2RlLnNsaW5rID0gbm9kZTtcbiAgICAgIHByZXZfbm9kZSA9IG5vZGU7XG4gICAgICB0aGlzLmFwID0gdGhpcy5tb3ZlX3RydXN0KFxuICAgICAgICB0aGlzLmFwLnBhcmVudC5zbGluayxcbiAgICAgICAgdGhpcy50ZXh0LFxuICAgICAgICBlZGdlX2JlZyxcbiAgICAgICAgbWF0Y2hfbGVuXG4gICAgICApO1xuICAgIH1cbiAgICBwcmV2X25vZGUuc2xpbmsgPSB0aGlzLmFwLnBhcmVudDtcbiAgfVxuXG4gIGpzb24oc2hvd19zdWZmaXhfbGlua3M6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgY29uc3Qgbm9kZXM6IGFueSA9IFtdO1xuICAgIGNvbnN0IGVkZ2VzOiBhbnkgPSBbXTtcbiAgICBjb25zdCBuaWQgPSBuZXcgTWFwKCk7XG5cbiAgICBjb25zdCBtYXhfcm91bmRuZXNzID0gMC41O1xuICAgIGNvbnN0IG1pbl9yb3VuZG5lc3MgPSAtMC41O1xuICAgIGNvbnN0IHJvdW5kbmVzcyA9IChlZGdlOiBFZGdlKSA9PiB7XG4gICAgICBjb25zdCBlYmlydGggPSBBcnJheS5mcm9tKGVkZ2UucGFyZW50Lm91dF9lZGdlcy52YWx1ZXMoKSkubWFwKChlKSA9PiBbXG4gICAgICAgIGUuYmlydGhfdGltZSxcbiAgICAgICAgZSxcbiAgICAgIF0pO1xuICAgICAgZWJpcnRoLnNvcnQoKTtcbiAgICAgIGxldCBiaXJ0aF9pZHggPSAtMTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWJpcnRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChlYmlydGhbaV1bMV0gPT09IGVkZ2UpIHtcbiAgICAgICAgICBiaXJ0aF9pZHggPSBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZWRnZS5wYXJlbnQub3V0X2VkZ2VzLnNpemUgPT09IDEpIHJldHVybiAwLjA7XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgbWluX3JvdW5kbmVzcyArXG4gICAgICAgICAgKChtYXhfcm91bmRuZXNzIC0gbWluX3JvdW5kbmVzcykgKiBiaXJ0aF9pZHgpIC9cbiAgICAgICAgICAgIChlZGdlLnBhcmVudC5vdXRfZWRnZXMuc2l6ZSAtIDEpXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgY29uc3QgbiA9IHtcbiAgICAgICAgbGFiZWw6IFwiXCIgKyBub2RlLmJpcnRoX3RpbWUsXG4gICAgICAgIGlkOiBub2RlLmJpcnRoX3RpbWUsXG4gICAgICAgIGxldmVsOiAtMSxcbiAgICAgIH07XG4gICAgICBuaWQuc2V0KG5vZGUsIG5vZGUuYmlydGhfdGltZSk7XG4gICAgICBub2Rlcy5wdXNoKG4pO1xuICAgIH0pO1xuICAgIGlmIChzaG93X3N1ZmZpeF9saW5rcykge1xuICAgICAgdGhpcy5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmIChub2RlLnNsaW5rICE9IG5vZGUgJiYgbm9kZSAhPT0gdGhpcy5yb290KSB7XG4gICAgICAgICAgLy8gaWYgKG5vZGUuc2xpbmsgJiYgbm9kZSAhPT0gdGhpcy5yb290KSB7XG4gICAgICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgICAgIGZyb206IG5pZC5nZXQobm9kZSksXG4gICAgICAgICAgICB0bzogbmlkLmdldChub2RlLnNsaW5rKSxcbiAgICAgICAgICAgIGlkOiBcImVbXCIgKyBuaWQuZ2V0KG5vZGUpICsgXCJdLVtcIiArIG5pZC5nZXQobm9kZS5zbGluaykgKyBcIl1cIixcbiAgICAgICAgICAgIGRhc2hlczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGNvbG9yOiB7IGNvbG9yOiBub2RlLmlzX2V4cGxpY2l0ID8gJyM4NDg0ODQnIDogJyNmZjAwMDAnIH0sXG4gICAgICAgICAgICBjb2xvcjogeyBjb2xvcjogXCIjODQ4NDg0XCIgfSxcbiAgICAgICAgICAgIC8vICwgbGFiZWw6IGVkZ2Uuc3RyXG4gICAgICAgICAgICBmb250OiB7IGFsaWduOiBcInRvcFwiIH0sXG4gICAgICAgICAgICBzbW9vdGg6IHsgdHlwZTogXCJjdXJ2ZWRDV1wiLCByb3VuZG5lc3M6IDAuNCB9LFxuICAgICAgICAgIH07XG4gICAgICAgICAgZWRnZXMucHVzaChlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IHNldF9sZXZlbF9yZWMgPSAobm9kZTogQ05vZGUsIGxldmVsOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG4gPSBub2Rlc1tuaWQuZ2V0KG5vZGUpXTtcbiAgICAgIGlmIChuLmxldmVsIDwgbGV2ZWwpIHtcbiAgICAgICAgbi5sZXZlbCA9IGxldmVsO1xuICAgICAgICBub2RlLm91dF9lZGdlcy5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgICAgICAgc2V0X2xldmVsX3JlYyhlZGdlLmNoaWxkLCBuLmxldmVsICsgMSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgc2V0X2xldmVsX3JlYyh0aGlzLnJvb3QsIDApO1xuXG4gICAgdGhpcy5lZGdlcy5mb3JFYWNoKChlZGdlKSA9PiB7XG4gICAgICBjb25zdCBlID0ge1xuICAgICAgICBmcm9tOiBuaWQuZ2V0KGVkZ2UucGFyZW50KSxcbiAgICAgICAgdG86IG5pZC5nZXQoZWRnZS5jaGlsZCksXG4gICAgICAgIGlkOlxuICAgICAgICAgIFwiW1wiICtcbiAgICAgICAgICBuaWQuZ2V0KGVkZ2UucGFyZW50KSArXG4gICAgICAgICAgXCIoXCIgK1xuICAgICAgICAgIGVkZ2UubGVuICtcbiAgICAgICAgICBcIildLVtcIiArXG4gICAgICAgICAgbmlkLmdldChlZGdlLmNoaWxkKSArXG4gICAgICAgICAgXCJdXCIsXG4gICAgICAgIGxhYmVsOiBlZGdlLnN0cixcbiAgICAgICAgZm9udDogeyBhbGlnbjogXCJ0b3BcIiB9LFxuICAgICAgICBzbW9vdGg6IHsgdHlwZTogXCJjdXJ2ZWRDV1wiLCByb3VuZG5lc3M6IHJvdW5kbmVzcyhlZGdlKSB9LFxuICAgICAgfTtcbiAgICAgIGVkZ2VzLnB1c2goZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBub2RlcywgZWRnZXMgfTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYnVpbGRfY2Rhd2cgPSAodGV4dDogc3RyaW5nLCBpbXBsaWNpdF9jZGF3ZzogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGNkYXdnID0gbmV3IENEQVdHKCk7XG4gIGZvciAoY29uc3QgYyBvZiB0ZXh0KSB7XG4gICAgY2Rhd2cuaW5zZXJ0KGMpO1xuICB9XG4gIGlmICghaW1wbGljaXRfY2Rhd2cpIHtcbiAgICBjZGF3Zy5leHBsaWNpdCgpO1xuICB9XG4gIHJldHVybiBjZGF3Zztcbn07XG5cbmNvbnN0IG1haW4gPSAodGV4dDogc3RyaW5nKSA9PiB7XG4gIGNvbnNvbGUubG9nKFwidGV4dFwiLCB0ZXh0KTtcbiAgY29uc3QgY2Rhd2cgPSBidWlsZF9jZGF3Zyh0ZXh0KTtcbiAgY29uc29sZS5sb2coY2Rhd2cpO1xuICBjb25zb2xlLmxvZyhjZGF3Zy5qc29uKTtcbiAgcmV0dXJuIGNkYXdnO1xufTtcblxuY29uc29sZS5sb2cocmVxdWlyZS5tYWluID09PSBtb2R1bGUpO1xuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gIG1haW4ocHJvY2Vzcy5hcmd2Lmxlbmd0aCA9PT0gMyA/IHByb2Nlc3MuYXJndlsyXSA6IFwiYWJjYWJjYWJhXCIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==