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
const dummy_edge = new Edge(-1, () => '', dummy_node, -1, -1, dummy_node);
// TopNode is an implicit node.
// The root node's suffix link points to the top node.
// There is a special edge from the top node to the root node, which we can move any characters.
class TopNode extends CNode {
    constructor(root) {
        super(-1, -1);
        this.root = root;
        this.edge = new Edge(-1, () => '', dummy_node, -1, -1, this.root);
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
        this.text = '';
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
        console.log('insert char[', char, ']');
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
            console.log('ap', this.ap, this.ap.atNode);
            if (this.ap.atNode) {
                // if there is a previouslly processed node, create suffix link from it to the active point
                if (prev_branch)
                    prev_branch.slink = this.ap.parent;
                prev_branch = this.ap.parent;
                prev_destination = this.sink;
                this.create_open_edge(this.ap.parent, this.text.length - 1);
                this.ap = new State(this.ap.parent.slink);
                console.log('first ap', this.ap);
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
        console.log('insert end, ap is', this.ap);
    }
    /// transforms CDAWG implicit to explicit.
    /// creates a node corresponding to an active node.
    explicit() {
        if (!this.ap.atNode) {
            this.sink.slink = this.split(this.ap);
        }
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
                label: '' + node.birth_time,
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
                        id: 'e[' + nid.get(node) + ']-[' + nid.get(node.slink) + ']',
                        dashes: true,
                        color: { color: node.is_explicit ? '#848484' : '#ff0000' },
                        // , label: edge.str
                        font: { align: 'top' },
                        smooth: { type: 'curvedCW', roundness: 0.4 },
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
                id: '[' +
                    nid.get(edge.parent) +
                    '(' +
                    edge.len +
                    ')]-[' +
                    nid.get(edge.child) +
                    ']',
                label: edge.str,
                font: { align: 'top' },
                smooth: { type: 'curvedCW', roundness: roundness(edge) },
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
    console.log('text', text);
    const cdawg = exports.build_cdawg(text);
    console.log(cdawg);
    console.log(cdawg.json);
    return cdawg;
};
console.log(__webpack_require__.c[__webpack_require__.s] === module);
if (__webpack_require__.c[__webpack_require__.s] === module) {
    main(process.argv.length === 3 ? process.argv[2] : 'abcabcaba');
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jZGF3Zy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQSxNQUFNLEtBQUs7SUFN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QyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ2hCO0lBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixLQUFLLENBQUMsUUFBUSxFQUFFO0tBQ2pCO0lBQ0QsT0FBTyxLQUFLO0FBQ2QsQ0FBQztBQUVELE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBWSxFQUFFLEVBQUU7SUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO0lBQ3pCLE1BQU0sS0FBSyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDO0lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUN2QixPQUFPLEtBQUs7QUFDZCxDQUFDO0FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBWSxLQUFLLE1BQU0sQ0FBQztBQUNwQyxJQUFJLDRDQUFZLEtBQUssTUFBTSxFQUFFO0lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztDQUNoRSIsImZpbGUiOiJjZGF3Zy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NkYXdnLnRzXCIpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImNsYXNzIENOb2RlIHtcbiAgYmlydGhfdGltZTogbnVtYmVyXG4gIGRlcHRoOiBudW1iZXJcbiAgc2xpbms6IENOb2RlXG4gIG91dF9lZGdlczogTWFwPHN0cmluZywgRWRnZT5cbiAgaW5fZWRnZXM6IEFycmF5PEVkZ2U+XG4gIGNvbnN0cnVjdG9yKGJpcnRoX3RpbWU6IG51bWJlciwgZGVwdGg6IG51bWJlcikge1xuICAgIHRoaXMuYmlydGhfdGltZSA9IGJpcnRoX3RpbWVcbiAgICB0aGlzLmRlcHRoID0gZGVwdGhcbiAgICB0aGlzLnNsaW5rID0gdGhpc1xuICAgIHRoaXMub3V0X2VkZ2VzID0gbmV3IE1hcCgpXG4gICAgdGhpcy5pbl9lZGdlcyA9IFtdXG4gIH1cblxuICBnZXQgaXNfZXhwbGljaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0X2VkZ2VzLnNpemUgIT09IDFcbiAgfVxufVxuXG5jbGFzcyBFZGdlIHtcbiAgYmlydGhfdGltZTogbnVtYmVyXG4gIHRleHQ6ICgpID0+IHN0cmluZ1xuICBwYXJlbnQ6IENOb2RlXG4gIGVkZ2VfYmVnOiBudW1iZXJcbiAgZWRnZV9sZW46IG51bWJlclxuICBjaGlsZDogQ05vZGVcblxuICBjb25zdHJ1Y3RvcihcbiAgICBiaXJ0aF90aW1lOiBudW1iZXIsXG4gICAgdGV4dDogKCkgPT4gc3RyaW5nLFxuICAgIHBhcmVudDogQ05vZGUsXG4gICAgZWRnZV9iZWc6IG51bWJlcixcbiAgICBlZGdlX2xlbjogbnVtYmVyLFxuICAgIGNoaWxkOiBDTm9kZSxcbiAgKSB7XG4gICAgdGhpcy5iaXJ0aF90aW1lID0gYmlydGhfdGltZVxuICAgIHRoaXMudGV4dCA9IHRleHRcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudFxuICAgIHRoaXMuZWRnZV9iZWcgPSBlZGdlX2JlZ1xuICAgIHRoaXMuZWRnZV9sZW4gPSBlZGdlX2xlblxuICAgIHRoaXMuY2hpbGQgPSBjaGlsZFxuICB9XG5cbiAgY2hhckF0KGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGV4dCgpW3RoaXMuZWRnZV9iZWcgKyBpXVxuICB9XG5cbiAgZ2V0IHN0cigpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmVkZ2VfbGVuID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnN1YnN0cih0aGlzLmVkZ2VfYmVnLCB0aGlzLmVkZ2VfbGVuKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkuc3Vic3RyKHRoaXMuZWRnZV9iZWcpXG4gICAgfVxuICB9XG5cbiAgZ2V0IGxlbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVkZ2VfbGVuID09PSAtMVxuICAgICAgPyB0aGlzLnRleHQoKS5sZW5ndGggLSB0aGlzLmVkZ2VfYmVnXG4gICAgICA6IHRoaXMuZWRnZV9sZW5cbiAgfVxuXG4gIHNldCBsZW4odmFsKSB7XG4gICAgdGhpcy5lZGdlX2xlbiA9IHZhbFxuICB9XG5cbiAgZ2V0IGlzX29wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZV9sZW4gPT09IC0xXG4gIH1cbn1cblxuY29uc3QgZHVtbXlfbm9kZSA9IG5ldyBDTm9kZSgtMSwgLTEpXG5jb25zdCBkdW1teV9lZGdlID0gbmV3IEVkZ2UoLTEsICgpID0+ICcnLCBkdW1teV9ub2RlLCAtMSwgLTEsIGR1bW15X25vZGUpXG5cbi8vIFRvcE5vZGUgaXMgYW4gaW1wbGljaXQgbm9kZS5cbi8vIFRoZSByb290IG5vZGUncyBzdWZmaXggbGluayBwb2ludHMgdG8gdGhlIHRvcCBub2RlLlxuLy8gVGhlcmUgaXMgYSBzcGVjaWFsIGVkZ2UgZnJvbSB0aGUgdG9wIG5vZGUgdG8gdGhlIHJvb3Qgbm9kZSwgd2hpY2ggd2UgY2FuIG1vdmUgYW55IGNoYXJhY3RlcnMuXG5jbGFzcyBUb3BOb2RlIGV4dGVuZHMgQ05vZGUge1xuICByb290OiBDTm9kZVxuICBlZGdlOiBFZGdlXG4gIGNvbnN0cnVjdG9yKHJvb3Q6IENOb2RlKSB7XG4gICAgc3VwZXIoLTEsIC0xKVxuICAgIHRoaXMucm9vdCA9IHJvb3RcbiAgICB0aGlzLmVkZ2UgPSBuZXcgRWRnZSgtMSwgKCkgPT4gJycsIGR1bW15X25vZGUsIC0xLCAtMSwgdGhpcy5yb290KVxuICB9XG5cbiAgZ2V0IGF0Tm9kZSgpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG5cbi8vIEl0IHJlcHJlc2VudHMgYW4gaW1wbGljaXQgbm9kZSB3aGljaCBpcyBsb2NhdGVkIGF0IG1hdGNoX2xlbiBvbiBhbiBlZGdlLlxuLy8gSWYgaXQgaXMgYXQgbm9kZSwgZWRnZSBpcyBhbiBkdW1teV9lZGdlIGFuZCBtYXRjaF9sZW4gPSAwXG5jbGFzcyBTdGF0ZSB7XG4gIHN0YXRpYyBjcmVhdGVfYXRfbm9kZV9zdGF0ZShwYXJlbnQ6IENOb2RlKTogU3RhdGUge1xuICAgIHJldHVybiBuZXcgU3RhdGUocGFyZW50LCB1bmRlZmluZWQsIHVuZGVmaW5lZClcbiAgfVxuXG4gIHBhcmVudDogQ05vZGVcbiAgZWRnZTogRWRnZVxuICBtYXRjaF9sZW46IG51bWJlclxuICBjb25zdHJ1Y3RvcihwYXJlbnQ6IENOb2RlLCBlZGdlOiBFZGdlID0gZHVtbXlfZWRnZSwgbWF0Y2hfbGVuOiBudW1iZXIgPSAwKSB7XG4gICAgaWYgKHBhcmVudCBpbnN0YW5jZW9mIFRvcE5vZGUpIHtcbiAgICAgIC8vIFRoaXMgaXMgVG9wTm9kZVxuICAgICAgdGhpcy5lZGdlID0gcGFyZW50LmVkZ2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lZGdlID0gZWRnZVxuICAgIH1cbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudFxuICAgIHRoaXMubWF0Y2hfbGVuID0gbWF0Y2hfbGVuXG4gIH1cblxuICBnZXQgYXROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLm1hdGNoX2xlbiA9PT0gMFxuICB9XG5cbiAgLy8gcmV0dXJuIGEgc3RhdGUgdGhhdCBjYW4gYmUgbW92ZWQgZnJvbSB0aGUgY3VycmVudCBzdGF0ZSB3aXRoIGEgY2hhcmFjdGVyIGNoYXIuXG4gIC8vIGlmIGNhbm5vdCwgcmV0dXJuIHVuZGVmaW5lZC5cbiAgbW92ZShjaGFyOiBzdHJpbmcpOiBTdGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMucGFyZW50IGluc3RhbmNlb2YgVG9wTm9kZSkgcmV0dXJuIG5ldyBTdGF0ZSh0aGlzLmVkZ2UuY2hpbGQpXG4gICAgY29uc3QgY2FuX21vdmUgPSB0aGlzLmF0Tm9kZVxuICAgICAgPyB0aGlzLnBhcmVudC5vdXRfZWRnZXMuaGFzKGNoYXIpXG4gICAgICA6IHRoaXMuZWRnZS5jaGFyQXQodGhpcy5tYXRjaF9sZW4pID09PSBjaGFyXG4gICAgLy8gY29uc29sZS5sb2coJ2Nhbl9tb3ZlJywgY2FuX21vdmUpXG4gICAgaWYgKCFjYW5fbW92ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlZGdlID0gdGhpcy5hdE5vZGVcbiAgICAgICAgPyAodGhpcy5wYXJlbnQub3V0X2VkZ2VzLmdldChjaGFyKSBhcyBFZGdlKVxuICAgICAgICA6IHRoaXMuZWRnZVxuICAgICAgY29uc3QgbWF0Y2hfbGVuID0gdGhpcy5hdE5vZGUgPyAwIDogdGhpcy5tYXRjaF9sZW5cbiAgICAgIGlmIChtYXRjaF9sZW4gKyAxIDwgZWRnZS5sZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZSh0aGlzLnBhcmVudCwgZWRnZSwgbWF0Y2hfbGVuICsgMSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBTdGF0ZS5jcmVhdGVfYXRfbm9kZV9zdGF0ZShlZGdlLmNoaWxkKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBDREFXRyB7XG4gIHRleHQ6IHN0cmluZ1xuICBub2RlczogQXJyYXk8Q05vZGU+XG4gIGVkZ2VzOiBBcnJheTxFZGdlPlxuICByb290OiBDTm9kZVxuICB0b3Bfbm9kZTogVG9wTm9kZVxuICBzaW5rOiBDTm9kZVxuICBhcDogU3RhdGVcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZXh0ID0gJydcbiAgICB0aGlzLm5vZGVzID0gW11cbiAgICB0aGlzLmVkZ2VzID0gW11cbiAgICB0aGlzLnJvb3QgPSB0aGlzLmNyZWF0ZV9ub2RlKDApXG4gICAgdGhpcy50b3Bfbm9kZSA9IG5ldyBUb3BOb2RlKHRoaXMucm9vdClcbiAgICB0aGlzLnJvb3Quc2xpbmsgPSB0aGlzLnRvcF9ub2RlXG4gICAgdGhpcy5zaW5rID0gdGhpcy5jcmVhdGVfbm9kZSgtMSlcbiAgICB0aGlzLmFwID0gbmV3IFN0YXRlKHRoaXMucm9vdCwgdW5kZWZpbmVkLCAwKVxuICB9XG5cbiAgY3JlYXRlX25vZGUoZGVwdGg6IG51bWJlcik6IENOb2RlIHtcbiAgICBjb25zdCBub2RlID0gbmV3IENOb2RlKHRoaXMubm9kZXMubGVuZ3RoLCBkZXB0aClcbiAgICB0aGlzLm5vZGVzLnB1c2gobm9kZSlcbiAgICByZXR1cm4gbm9kZVxuICB9XG5cbiAgY3JlYXRlX2Nsb3NlZF9lZGdlKFxuICAgIHBhcmVudDogQ05vZGUsXG4gICAgZWRnZV9iZWc6IG51bWJlcixcbiAgICBlZGdlX2xlbjogbnVtYmVyLFxuICAgIGNoaWxkOiBDTm9kZSxcbiAgKSB7XG4gICAgY29uc3QgZWRnZSA9IG5ldyBFZGdlKFxuICAgICAgdGhpcy5lZGdlcy5sZW5ndGgsXG4gICAgICAoKSA9PiB0aGlzLnRleHQsXG4gICAgICBwYXJlbnQsXG4gICAgICBlZGdlX2JlZyxcbiAgICAgIGVkZ2VfbGVuLFxuICAgICAgY2hpbGQsXG4gICAgKVxuICAgIHRoaXMuZWRnZXMucHVzaChlZGdlKVxuICAgIHBhcmVudC5vdXRfZWRnZXMuc2V0KHRoaXMudGV4dFtlZGdlX2JlZ10sIGVkZ2UpXG4gICAgcmV0dXJuIGVkZ2VcbiAgfVxuXG4gIGNyZWF0ZV9vcGVuX2VkZ2UocGFyZW50OiBDTm9kZSwgZWRnZV9iZWc6IG51bWJlcikge1xuICAgIGNvbnN0IGVkZ2UgPSBuZXcgRWRnZShcbiAgICAgIHRoaXMuZWRnZXMubGVuZ3RoLFxuICAgICAgKCkgPT4gdGhpcy50ZXh0LFxuICAgICAgcGFyZW50LFxuICAgICAgZWRnZV9iZWcsXG4gICAgICAtMSxcbiAgICAgIHRoaXMuc2luayxcbiAgICApXG4gICAgdGhpcy5lZGdlcy5wdXNoKGVkZ2UpXG4gICAgcGFyZW50Lm91dF9lZGdlcy5zZXQodGhpcy50ZXh0W2VkZ2VfYmVnXSwgZWRnZSlcbiAgICByZXR1cm4gZWRnZVxuICB9XG5cbiAgLy8gcmV0dXJuIGEgc3RhdGUgdGhhdCBtb3ZlZCBmcm9tIG5vZGUgd2l0aCB0ZXh0W2JlZzpiZWcrbGVuXS5cbiAgLy8gSXQgaXMgZ3VyYW50ZWVkIHRoYXQgd2UgY2FuIG1vdmUgbm9kZSB3aXRoIHRleHRbYmVnOmJlZytsZW5dLlxuICBtb3ZlX3RydXN0KG5vZGU6IENOb2RlLCB0ZXh0OiBzdHJpbmcsIGJlZzogbnVtYmVyLCBsZW46IG51bWJlcik6IFN0YXRlIHtcbiAgICBjb25zdCBfbW92ZV90cnVzdCA9IChcbiAgICAgIG5vZGU6IENOb2RlLFxuICAgICAgdGV4dDogc3RyaW5nLFxuICAgICAgYmVnOiBudW1iZXIsXG4gICAgICBsZW46IG51bWJlcixcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGVkZ2UgPSBub2RlLm91dF9lZGdlcy5nZXQodGV4dFtiZWddKSBhcyBFZGdlXG4gICAgICBpZiAobGVuIDwgZWRnZS5sZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZShub2RlLCBlZGdlLCBsZW4pXG4gICAgICB9IGVsc2UgaWYgKGxlbiA9PT0gZWRnZS5sZW4pIHtcbiAgICAgICAgcmV0dXJuIFN0YXRlLmNyZWF0ZV9hdF9ub2RlX3N0YXRlKGVkZ2UuY2hpbGQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlX3RydXN0KGVkZ2UuY2hpbGQsIHRleHQsIGJlZyArIGVkZ2UubGVuLCBsZW4gLSBlZGdlLmxlbilcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIG5ldyBTdGF0ZShub2RlKVxuICAgIGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBUb3BOb2RlKSB7XG4gICAgICBpZiAobGVuID09PSAxKSByZXR1cm4gbmV3IFN0YXRlKG5vZGUucm9vdClcbiAgICAgIGVsc2UgcmV0dXJuIF9tb3ZlX3RydXN0KG5vZGUucm9vdCwgdGV4dCwgYmVnICsgMSwgbGVuIC0gMSlcbiAgICB9IGVsc2UgcmV0dXJuIF9tb3ZlX3RydXN0KG5vZGUsIHRleHQsIGJlZywgbGVuKVxuICB9XG5cbiAgLy8gY3JlYXRlIG5ldyBub2RlIHRoYXQgaGFzIG91dF9lZGdlcyBvZiB0aGUgZ2l2ZSBub2RlLlxuICBjb3B5X25vZGUobm9kZTogQ05vZGUsIG51bV9pbl9lZGdlX2xlZnQ6IG51bWJlcikge1xuICAgIGNvbnN0IG5ld19ub2RlID0gdGhpcy5jcmVhdGVfbm9kZShub2RlLmRlcHRoIC0gbnVtX2luX2VkZ2VfbGVmdClcbiAgICBjb25zdCBvdXRfZWRnZXMgPSBBcnJheS5mcm9tKG5vZGUub3V0X2VkZ2VzLmVudHJpZXMoKSlcbiAgICBvdXRfZWRnZXMuc29ydCgpIC8vIGZvciB0ZXN0XG4gICAgZm9yIChjb25zdCBbaywgZWRnZV0gb2Ygb3V0X2VkZ2VzKSB7XG4gICAgICB0aGlzLmNyZWF0ZV9jbG9zZWRfZWRnZShcbiAgICAgICAgbmV3X25vZGUsXG4gICAgICAgIGVkZ2UuZWRnZV9iZWcsXG4gICAgICAgIGVkZ2UuZWRnZV9sZW4sXG4gICAgICAgIGVkZ2UuY2hpbGQsXG4gICAgICApXG4gICAgfVxuICAgIC8vIHNwbGl0IGluX2VkZ2VzXG4gICAgbmV3X25vZGUuaW5fZWRnZXMgPSBub2RlLmluX2VkZ2VzLnNsaWNlKG51bV9pbl9lZGdlX2xlZnQpXG4gICAgbm9kZS5pbl9lZGdlcyA9IG5vZGUuaW5fZWRnZXMuc2xpY2UoMCwgbnVtX2luX2VkZ2VfbGVmdClcblxuICAgIG5ld19ub2RlLmluX2VkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgIGVkZ2UuY2hpbGQgPSBuZXdfbm9kZVxuICAgIH0pXG5cbiAgICBuZXdfbm9kZS5zbGluayA9IG5vZGUuc2xpbmtcbiAgICBub2RlLnNsaW5rID0gbmV3X25vZGVcblxuICAgIHJldHVybiBuZXdfbm9kZVxuICB9XG5cbiAgc3BsaXQoc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3QgYnJhbmNoX25vZGUgPSB0aGlzLmNyZWF0ZV9ub2RlKHN0YXRlLm1hdGNoX2xlbilcbiAgICBjb25zdCBpbl9lZGdlID0gdGhpcy5jcmVhdGVfY2xvc2VkX2VkZ2UoXG4gICAgICBzdGF0ZS5wYXJlbnQsXG4gICAgICBzdGF0ZS5lZGdlLmVkZ2VfYmVnLFxuICAgICAgc3RhdGUubWF0Y2hfbGVuLFxuICAgICAgYnJhbmNoX25vZGUsXG4gICAgKVxuXG4gICAgc3RhdGUuZWRnZS5wYXJlbnQgPSBicmFuY2hfbm9kZVxuICAgIGlmICghc3RhdGUuZWRnZS5pc19vcGVuKSBzdGF0ZS5lZGdlLmVkZ2VfbGVuIC09IHN0YXRlLm1hdGNoX2xlblxuICAgIHN0YXRlLmVkZ2UuZWRnZV9iZWcgKz0gc3RhdGUubWF0Y2hfbGVuXG4gICAgYnJhbmNoX25vZGUub3V0X2VkZ2VzLnNldChzdGF0ZS5lZGdlLmNoYXJBdCgwKSwgc3RhdGUuZWRnZSlcblxuICAgIGJyYW5jaF9ub2RlLmluX2VkZ2VzLnB1c2goaW5fZWRnZSlcblxuICAgIHJldHVybiBicmFuY2hfbm9kZVxuICB9XG5cbiAgaW5zZXJ0KGNoYXI6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKClcbiAgICBjb25zb2xlLmxvZygnaW5zZXJ0IGNoYXJbJywgY2hhciwgJ10nKVxuICAgIHRoaXMudGV4dCArPSBjaGFyXG4gICAgaWYgKHRoaXMudGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuY3JlYXRlX29wZW5fZWRnZSh0aGlzLnJvb3QsIDApXG4gICAgICB0aGlzLmFwID0gbmV3IFN0YXRlKHRoaXMucm9vdClcbiAgICAgIHRoaXMuc2luay5zbGluayA9IHRoaXMucm9vdFxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBuZXh0X3N0YXRlOiBTdGF0ZSB8IHVuZGVmaW5lZFxuICAgIGxldCBwcmV2X2JyYW5jaDogQ05vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcbiAgICBsZXQgcHJldl9kZXN0aW5hdGlvbjogQ05vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWRcbiAgICB3aGlsZSAoKG5leHRfc3RhdGUgPSB0aGlzLmFwLm1vdmUoY2hhcikpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhcCcsIHRoaXMuYXAsIHRoaXMuYXAuYXROb2RlKVxuICAgICAgaWYgKHRoaXMuYXAuYXROb2RlKSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgcHJldmlvdXNsbHkgcHJvY2Vzc2VkIG5vZGUsIGNyZWF0ZSBzdWZmaXggbGluayBmcm9tIGl0IHRvIHRoZSBhY3RpdmUgcG9pbnRcbiAgICAgICAgaWYgKHByZXZfYnJhbmNoKSBwcmV2X2JyYW5jaC5zbGluayA9IHRoaXMuYXAucGFyZW50XG4gICAgICAgIHByZXZfYnJhbmNoID0gdGhpcy5hcC5wYXJlbnRcbiAgICAgICAgcHJldl9kZXN0aW5hdGlvbiA9IHRoaXMuc2lua1xuXG4gICAgICAgIHRoaXMuY3JlYXRlX29wZW5fZWRnZSh0aGlzLmFwLnBhcmVudCwgdGhpcy50ZXh0Lmxlbmd0aCAtIDEpXG5cbiAgICAgICAgdGhpcy5hcCA9IG5ldyBTdGF0ZSh0aGlzLmFwLnBhcmVudC5zbGluaylcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpcnN0IGFwJywgdGhpcy5hcClcbiAgICAgIH0gZWxzZSBpZiAocHJldl9icmFuY2ggJiYgdGhpcy5hcC5lZGdlLmNoaWxkID09PSBwcmV2X2Rlc3RpbmF0aW9uKSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgcHJldmlvdXNseSBwcm9jZXNzZWQgbm9kZSAocHJldl9icmFuY2gpIGFuZCBpdHMgZGVzdGluYXRpb24gaXMgZXF1YWwgdG8gdGhlIGRlc3RpbmF0aW9uIG9mIHRoZSBhY3RpdmUgcG9pbnQsIG1lcmdlIHRoZSBhY3RpdmUgcG9pbnQgdG8gdGhlIHByZXZfYnJhbmNoXG4gICAgICAgIHRoaXMuYXAuZWRnZS5jaGlsZCA9IHByZXZfYnJhbmNoXG4gICAgICAgIHRoaXMuYXAuZWRnZS5sZW4gPSB0aGlzLmFwLm1hdGNoX2xlblxuICAgICAgICBwcmV2X2JyYW5jaC5pbl9lZGdlcy5wdXNoKHRoaXMuYXAuZWRnZSlcblxuICAgICAgICB0aGlzLmFwID0gdGhpcy5tb3ZlX3RydXN0KFxuICAgICAgICAgIHRoaXMuYXAucGFyZW50LnNsaW5rLFxuICAgICAgICAgIHRoaXMudGV4dCxcbiAgICAgICAgICB0aGlzLmFwLmVkZ2UuZWRnZV9iZWcsXG4gICAgICAgICAgdGhpcy5hcC5tYXRjaF9sZW4sXG4gICAgICAgIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNwbGl0IGFuZCBjcmVhdGUgYSBuZXcgb3BlbiBlZGdlXG4gICAgICAgIGNvbnN0IGVkZ2VfYmVnID0gdGhpcy5hcC5lZGdlLmVkZ2VfYmVnXG4gICAgICAgIGNvbnN0IGVkZ2VfbGVuID0gdGhpcy5hcC5tYXRjaF9sZW5cblxuICAgICAgICBjb25zdCBicmFuY2hfbm9kZSA9IHRoaXMuc3BsaXQodGhpcy5hcClcbiAgICAgICAgaWYgKHByZXZfYnJhbmNoKSBwcmV2X2JyYW5jaC5zbGluayA9IGJyYW5jaF9ub2RlXG4gICAgICAgIHByZXZfYnJhbmNoID0gYnJhbmNoX25vZGVcbiAgICAgICAgcHJldl9kZXN0aW5hdGlvbiA9IHRoaXMuYXAuZWRnZS5jaGlsZFxuXG4gICAgICAgIHRoaXMuY3JlYXRlX29wZW5fZWRnZShicmFuY2hfbm9kZSwgdGhpcy50ZXh0Lmxlbmd0aCAtIDEpXG4gICAgICAgIHRoaXMuYXAgPSB0aGlzLm1vdmVfdHJ1c3QoXG4gICAgICAgICAgdGhpcy5hcC5wYXJlbnQuc2xpbmssXG4gICAgICAgICAgdGhpcy50ZXh0LFxuICAgICAgICAgIGVkZ2VfYmVnLFxuICAgICAgICAgIGVkZ2VfbGVuLFxuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcmV2X2JyYW5jaCAmJiB0aGlzLmFwLmF0Tm9kZSkgcHJldl9icmFuY2guc2xpbmsgPSB0aGlzLmFwLnBhcmVudFxuICAgIGlmIChcbiAgICAgIG5leHRfc3RhdGUuYXROb2RlICYmXG4gICAgICBuZXh0X3N0YXRlLnBhcmVudC5kZXB0aCA+XG4gICAgICAgIHRoaXMuYXAucGFyZW50LmRlcHRoICsgKHRoaXMuYXAuYXROb2RlID8gMSA6IHRoaXMuYXAuZWRnZS5sZW4pXG4gICAgKSB7XG4gICAgICAvLyB3ZSByZWFjaGVkIG5leHRfc3RhdGUgd2l0aCBub24tcHJpbWFyeSBlZGdlXG4gICAgICBjb25zdCBicmFuY2hfbm9kZSA9IHRoaXMuY29weV9ub2RlKFxuICAgICAgICBuZXh0X3N0YXRlLnBhcmVudCxcbiAgICAgICAgbmV4dF9zdGF0ZS5wYXJlbnQuZGVwdGggLVxuICAgICAgICAgICh0aGlzLmFwLnBhcmVudC5kZXB0aCArICh0aGlzLmFwLmF0Tm9kZSA/IDEgOiB0aGlzLmFwLmVkZ2UubGVuKSksXG4gICAgICApXG4gICAgICBuZXh0X3N0YXRlID0gbmV3IFN0YXRlKGJyYW5jaF9ub2RlKVxuICAgIH1cbiAgICB0aGlzLmFwID0gbmV4dF9zdGF0ZVxuICAgIGlmICh0aGlzLmFwLmF0Tm9kZSkge1xuICAgICAgdGhpcy5zaW5rLnNsaW5rID0gdGhpcy5hcC5wYXJlbnRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaW5rLnNsaW5rID0gdGhpcy5zaW5rXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdpbnNlcnQgZW5kLCBhcCBpcycsIHRoaXMuYXApXG4gIH1cblxuICAvLy8gdHJhbnNmb3JtcyBDREFXRyBpbXBsaWNpdCB0byBleHBsaWNpdC5cbiAgLy8vIGNyZWF0ZXMgYSBub2RlIGNvcnJlc3BvbmRpbmcgdG8gYW4gYWN0aXZlIG5vZGUuXG4gIGV4cGxpY2l0KCkge1xuICAgIGlmICghdGhpcy5hcC5hdE5vZGUpIHtcbiAgICAgIHRoaXMuc2luay5zbGluayA9IHRoaXMuc3BsaXQodGhpcy5hcClcbiAgICB9XG4gIH1cblxuICBqc29uKHNob3dfc3VmZml4X2xpbmtzOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGNvbnN0IG5vZGVzOiBhbnkgPSBbXVxuICAgIGNvbnN0IGVkZ2VzOiBhbnkgPSBbXVxuICAgIGNvbnN0IG5pZCA9IG5ldyBNYXAoKVxuXG4gICAgY29uc3QgbWF4X3JvdW5kbmVzcyA9IDAuNVxuICAgIGNvbnN0IG1pbl9yb3VuZG5lc3MgPSAtMC41XG4gICAgY29uc3Qgcm91bmRuZXNzID0gKGVkZ2U6IEVkZ2UpID0+IHtcbiAgICAgIGNvbnN0IGViaXJ0aCA9IEFycmF5LmZyb20oZWRnZS5wYXJlbnQub3V0X2VkZ2VzLnZhbHVlcygpKS5tYXAoKGUpID0+IFtcbiAgICAgICAgZS5iaXJ0aF90aW1lLFxuICAgICAgICBlLFxuICAgICAgXSlcbiAgICAgIGViaXJ0aC5zb3J0KClcbiAgICAgIGxldCBiaXJ0aF9pZHggPSAtMVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlYmlydGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGViaXJ0aFtpXVsxXSA9PT0gZWRnZSkge1xuICAgICAgICAgIGJpcnRoX2lkeCA9IGlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVkZ2UucGFyZW50Lm91dF9lZGdlcy5zaXplID09PSAxKSByZXR1cm4gMC4wXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgbWluX3JvdW5kbmVzcyArXG4gICAgICAgICAgKChtYXhfcm91bmRuZXNzIC0gbWluX3JvdW5kbmVzcykgKiBiaXJ0aF9pZHgpIC9cbiAgICAgICAgICAgIChlZGdlLnBhcmVudC5vdXRfZWRnZXMuc2l6ZSAtIDEpXG4gICAgICAgIClcbiAgICB9XG5cbiAgICB0aGlzLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGNvbnN0IG4gPSB7XG4gICAgICAgIGxhYmVsOiAnJyArIG5vZGUuYmlydGhfdGltZSxcbiAgICAgICAgaWQ6IG5vZGUuYmlydGhfdGltZSxcbiAgICAgICAgbGV2ZWw6IC0xLFxuICAgICAgfVxuICAgICAgbmlkLnNldChub2RlLCBub2RlLmJpcnRoX3RpbWUpXG4gICAgICBub2Rlcy5wdXNoKG4pXG4gICAgfSlcbiAgICBpZiAoc2hvd19zdWZmaXhfbGlua3MpIHtcbiAgICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS5zbGluayAhPSBub2RlICYmIG5vZGUgIT09IHRoaXMucm9vdCkge1xuICAgICAgICAgIC8vIGlmIChub2RlLnNsaW5rICYmIG5vZGUgIT09IHRoaXMucm9vdCkge1xuICAgICAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgICAgICBmcm9tOiBuaWQuZ2V0KG5vZGUpLFxuICAgICAgICAgICAgdG86IG5pZC5nZXQobm9kZS5zbGluayksXG4gICAgICAgICAgICBpZDogJ2VbJyArIG5pZC5nZXQobm9kZSkgKyAnXS1bJyArIG5pZC5nZXQobm9kZS5zbGluaykgKyAnXScsXG4gICAgICAgICAgICBkYXNoZXM6IHRydWUsXG4gICAgICAgICAgICBjb2xvcjogeyBjb2xvcjogbm9kZS5pc19leHBsaWNpdCA/ICcjODQ4NDg0JyA6ICcjZmYwMDAwJyB9LFxuICAgICAgICAgICAgLy8gLCBsYWJlbDogZWRnZS5zdHJcbiAgICAgICAgICAgIGZvbnQ6IHsgYWxpZ246ICd0b3AnIH0sXG4gICAgICAgICAgICBzbW9vdGg6IHsgdHlwZTogJ2N1cnZlZENXJywgcm91bmRuZXNzOiAwLjQgfSxcbiAgICAgICAgICB9XG4gICAgICAgICAgZWRnZXMucHVzaChlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBjb25zdCBzZXRfbGV2ZWxfcmVjID0gKG5vZGU6IENOb2RlLCBsZXZlbDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuID0gbm9kZXNbbmlkLmdldChub2RlKV1cbiAgICAgIGlmIChuLmxldmVsIDwgbGV2ZWwpIHtcbiAgICAgICAgbi5sZXZlbCA9IGxldmVsXG4gICAgICAgIG5vZGUub3V0X2VkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgICAgICBzZXRfbGV2ZWxfcmVjKGVkZ2UuY2hpbGQsIG4ubGV2ZWwgKyAxKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBzZXRfbGV2ZWxfcmVjKHRoaXMucm9vdCwgMClcblxuICAgIHRoaXMuZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgZnJvbTogbmlkLmdldChlZGdlLnBhcmVudCksXG4gICAgICAgIHRvOiBuaWQuZ2V0KGVkZ2UuY2hpbGQpLFxuICAgICAgICBpZDpcbiAgICAgICAgICAnWycgK1xuICAgICAgICAgIG5pZC5nZXQoZWRnZS5wYXJlbnQpICtcbiAgICAgICAgICAnKCcgK1xuICAgICAgICAgIGVkZ2UubGVuICtcbiAgICAgICAgICAnKV0tWycgK1xuICAgICAgICAgIG5pZC5nZXQoZWRnZS5jaGlsZCkgK1xuICAgICAgICAgICddJyxcbiAgICAgICAgbGFiZWw6IGVkZ2Uuc3RyLFxuICAgICAgICBmb250OiB7IGFsaWduOiAndG9wJyB9LFxuICAgICAgICBzbW9vdGg6IHsgdHlwZTogJ2N1cnZlZENXJywgcm91bmRuZXNzOiByb3VuZG5lc3MoZWRnZSkgfSxcbiAgICAgIH1cbiAgICAgIGVkZ2VzLnB1c2goZSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIHsgbm9kZXMsIGVkZ2VzIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYnVpbGRfY2Rhd2cgPSAodGV4dDogc3RyaW5nLCBpbXBsaWNpdF9jZGF3ZzogYm9vbGVhbiA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IGNkYXdnID0gbmV3IENEQVdHKClcbiAgZm9yIChjb25zdCBjIG9mIHRleHQpIHtcbiAgICBjZGF3Zy5pbnNlcnQoYylcbiAgfVxuICBpZiAoIWltcGxpY2l0X2NkYXdnKSB7XG4gICAgY2Rhd2cuZXhwbGljaXQoKVxuICB9XG4gIHJldHVybiBjZGF3Z1xufVxuXG5jb25zdCBtYWluID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICBjb25zb2xlLmxvZygndGV4dCcsIHRleHQpXG4gIGNvbnN0IGNkYXdnID0gYnVpbGRfY2Rhd2codGV4dClcbiAgY29uc29sZS5sb2coY2Rhd2cpXG4gIGNvbnNvbGUubG9nKGNkYXdnLmpzb24pXG4gIHJldHVybiBjZGF3Z1xufVxuXG5jb25zb2xlLmxvZyhyZXF1aXJlLm1haW4gPT09IG1vZHVsZSlcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICBtYWluKHByb2Nlc3MuYXJndi5sZW5ndGggPT09IDMgPyBwcm9jZXNzLmFyZ3ZbMl0gOiAnYWJjYWJjYWJhJylcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=