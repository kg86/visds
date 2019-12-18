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
        new_node.in_edges.forEach(edge => {
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
        console.log('insert end, ap is', this.ap);
    }
    json(show_suffix_links = true) {
        const nodes = [];
        const edges = [];
        const nid = new Map();
        const max_roundness = 0.5;
        const min_roundness = -0.5;
        const roundness = (edge) => {
            const ebirth = Array.from(edge.parent.out_edges.values()).map(e => [
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
        this.nodes.forEach(node => {
            const n = {
                label: '' + node.birth_time,
                id: node.birth_time,
                level: -1,
            };
            nid.set(node, node.birth_time);
            nodes.push(n);
        });
        if (show_suffix_links) {
            this.nodes.forEach(node => {
                if (node.slink && node !== this.root) {
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
                node.out_edges.forEach(edge => {
                    set_level_rec(edge.child, n.level + 1);
                });
            }
        };
        set_level_rec(this.root, 0);
        this.edges.forEach(edge => {
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
exports.build_cdawg = (text, show_suffix_links = false) => {
    const cdawg = new CDAWG();
    for (const c of text) {
        cdawg.insert(c);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jZGF3Zy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQSxNQUFNLEtBQUs7SUFN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QUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO0NBQ2hFIiwiZmlsZSI6ImNkYXdnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2Rhd2cudHNcIik7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiY2xhc3MgQ05vZGUge1xuICBiaXJ0aF90aW1lOiBudW1iZXJcbiAgZGVwdGg6IG51bWJlclxuICBzbGluazogQ05vZGVcbiAgb3V0X2VkZ2VzOiBNYXA8c3RyaW5nLCBFZGdlPlxuICBpbl9lZGdlczogQXJyYXk8RWRnZT5cbiAgY29uc3RydWN0b3IoYmlydGhfdGltZTogbnVtYmVyLCBkZXB0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5iaXJ0aF90aW1lID0gYmlydGhfdGltZVxuICAgIHRoaXMuZGVwdGggPSBkZXB0aFxuICAgIHRoaXMuc2xpbmsgPSB0aGlzXG4gICAgdGhpcy5vdXRfZWRnZXMgPSBuZXcgTWFwKClcbiAgICB0aGlzLmluX2VkZ2VzID0gW11cbiAgfVxuXG4gIGdldCBpc19leHBsaWNpdCgpIHtcbiAgICByZXR1cm4gdGhpcy5vdXRfZWRnZXMuc2l6ZSAhPT0gMVxuICB9XG59XG5cbmNsYXNzIEVkZ2Uge1xuICBiaXJ0aF90aW1lOiBudW1iZXJcbiAgdGV4dDogKCkgPT4gc3RyaW5nXG4gIHBhcmVudDogQ05vZGVcbiAgZWRnZV9iZWc6IG51bWJlclxuICBlZGdlX2xlbjogbnVtYmVyXG4gIGNoaWxkOiBDTm9kZVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJpcnRoX3RpbWU6IG51bWJlcixcbiAgICB0ZXh0OiAoKSA9PiBzdHJpbmcsXG4gICAgcGFyZW50OiBDTm9kZSxcbiAgICBlZGdlX2JlZzogbnVtYmVyLFxuICAgIGVkZ2VfbGVuOiBudW1iZXIsXG4gICAgY2hpbGQ6IENOb2RlLFxuICApIHtcbiAgICB0aGlzLmJpcnRoX3RpbWUgPSBiaXJ0aF90aW1lXG4gICAgdGhpcy50ZXh0ID0gdGV4dFxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50XG4gICAgdGhpcy5lZGdlX2JlZyA9IGVkZ2VfYmVnXG4gICAgdGhpcy5lZGdlX2xlbiA9IGVkZ2VfbGVuXG4gICAgdGhpcy5jaGlsZCA9IGNoaWxkXG4gIH1cblxuICBjaGFyQXQoaTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0KClbdGhpcy5lZGdlX2JlZyArIGldXG4gIH1cblxuICBnZXQgc3RyKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZWRnZV9sZW4gPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkuc3Vic3RyKHRoaXMuZWRnZV9iZWcsIHRoaXMuZWRnZV9sZW4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS5zdWJzdHIodGhpcy5lZGdlX2JlZylcbiAgICB9XG4gIH1cblxuICBnZXQgbGVuKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZV9sZW4gPT09IC0xXG4gICAgICA/IHRoaXMudGV4dCgpLmxlbmd0aCAtIHRoaXMuZWRnZV9iZWdcbiAgICAgIDogdGhpcy5lZGdlX2xlblxuICB9XG5cbiAgc2V0IGxlbih2YWwpIHtcbiAgICB0aGlzLmVkZ2VfbGVuID0gdmFsXG4gIH1cblxuICBnZXQgaXNfb3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlX2xlbiA9PT0gLTFcbiAgfVxufVxuXG5jb25zdCBkdW1teV9ub2RlID0gbmV3IENOb2RlKC0xLCAtMSlcbmNvbnN0IGR1bW15X2VkZ2UgPSBuZXcgRWRnZSgtMSwgKCkgPT4gJycsIGR1bW15X25vZGUsIC0xLCAtMSwgZHVtbXlfbm9kZSlcblxuLy8gVG9wTm9kZSBpcyBhbiBpbXBsaWNpdCBub2RlLlxuLy8gVGhlIHJvb3Qgbm9kZSdzIHN1ZmZpeCBsaW5rIHBvaW50cyB0byB0aGUgdG9wIG5vZGUuXG4vLyBUaGVyZSBpcyBhIHNwZWNpYWwgZWRnZSBmcm9tIHRoZSB0b3Agbm9kZSB0byB0aGUgcm9vdCBub2RlLCB3aGljaCB3ZSBjYW4gbW92ZSBhbnkgY2hhcmFjdGVycy5cbmNsYXNzIFRvcE5vZGUgZXh0ZW5kcyBDTm9kZSB7XG4gIHJvb3Q6IENOb2RlXG4gIGVkZ2U6IEVkZ2VcbiAgY29uc3RydWN0b3Iocm9vdDogQ05vZGUpIHtcbiAgICBzdXBlcigtMSwgLTEpXG4gICAgdGhpcy5yb290ID0gcm9vdFxuICAgIHRoaXMuZWRnZSA9IG5ldyBFZGdlKC0xLCAoKSA9PiAnJywgZHVtbXlfbm9kZSwgLTEsIC0xLCB0aGlzLnJvb3QpXG4gIH1cblxuICBnZXQgYXROb2RlKCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cblxuLy8gSXQgcmVwcmVzZW50cyBhbiBpbXBsaWNpdCBub2RlIHdoaWNoIGlzIGxvY2F0ZWQgYXQgbWF0Y2hfbGVuIG9uIGFuIGVkZ2UuXG4vLyBJZiBpdCBpcyBhdCBub2RlLCBlZGdlIGlzIGFuIGR1bW15X2VkZ2UgYW5kIG1hdGNoX2xlbiA9IDBcbmNsYXNzIFN0YXRlIHtcbiAgc3RhdGljIGNyZWF0ZV9hdF9ub2RlX3N0YXRlKHBhcmVudDogQ05vZGUpOiBTdGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBTdGF0ZShwYXJlbnQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuICB9XG5cbiAgcGFyZW50OiBDTm9kZVxuICBlZGdlOiBFZGdlXG4gIG1hdGNoX2xlbjogbnVtYmVyXG4gIGNvbnN0cnVjdG9yKHBhcmVudDogQ05vZGUsIGVkZ2U6IEVkZ2UgPSBkdW1teV9lZGdlLCBtYXRjaF9sZW46IG51bWJlciA9IDApIHtcbiAgICBpZiAocGFyZW50IGluc3RhbmNlb2YgVG9wTm9kZSkge1xuICAgICAgLy8gVGhpcyBpcyBUb3BOb2RlXG4gICAgICB0aGlzLmVkZ2UgPSBwYXJlbnQuZWRnZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVkZ2UgPSBlZGdlXG4gICAgfVxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50XG4gICAgdGhpcy5tYXRjaF9sZW4gPSBtYXRjaF9sZW5cbiAgfVxuXG4gIGdldCBhdE5vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hfbGVuID09PSAwXG4gIH1cblxuICAvLyByZXR1cm4gYSBzdGF0ZSB0aGF0IGNhbiBiZSBtb3ZlZCBmcm9tIHRoZSBjdXJyZW50IHN0YXRlIHdpdGggYSBjaGFyYWN0ZXIgY2hhci5cbiAgLy8gaWYgY2Fubm90LCByZXR1cm4gdW5kZWZpbmVkLlxuICBtb3ZlKGNoYXI6IHN0cmluZyk6IFN0YXRlIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodGhpcy5wYXJlbnQgaW5zdGFuY2VvZiBUb3BOb2RlKSByZXR1cm4gbmV3IFN0YXRlKHRoaXMuZWRnZS5jaGlsZClcbiAgICBjb25zdCBjYW5fbW92ZSA9IHRoaXMuYXROb2RlXG4gICAgICA/IHRoaXMucGFyZW50Lm91dF9lZGdlcy5oYXMoY2hhcilcbiAgICAgIDogdGhpcy5lZGdlLmNoYXJBdCh0aGlzLm1hdGNoX2xlbikgPT09IGNoYXJcbiAgICAvLyBjb25zb2xlLmxvZygnY2FuX21vdmUnLCBjYW5fbW92ZSlcbiAgICBpZiAoIWNhbl9tb3ZlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVkZ2UgPSB0aGlzLmF0Tm9kZVxuICAgICAgICA/ICh0aGlzLnBhcmVudC5vdXRfZWRnZXMuZ2V0KGNoYXIpIGFzIEVkZ2UpXG4gICAgICAgIDogdGhpcy5lZGdlXG4gICAgICBjb25zdCBtYXRjaF9sZW4gPSB0aGlzLmF0Tm9kZSA/IDAgOiB0aGlzLm1hdGNoX2xlblxuICAgICAgaWYgKG1hdGNoX2xlbiArIDEgPCBlZGdlLmxlbikge1xuICAgICAgICByZXR1cm4gbmV3IFN0YXRlKHRoaXMucGFyZW50LCBlZGdlLCBtYXRjaF9sZW4gKyAxKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFN0YXRlLmNyZWF0ZV9hdF9ub2RlX3N0YXRlKGVkZ2UuY2hpbGQpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENEQVdHIHtcbiAgdGV4dDogc3RyaW5nXG4gIG5vZGVzOiBBcnJheTxDTm9kZT5cbiAgZWRnZXM6IEFycmF5PEVkZ2U+XG4gIHJvb3Q6IENOb2RlXG4gIHRvcF9ub2RlOiBUb3BOb2RlXG4gIHNpbms6IENOb2RlXG4gIGFwOiBTdGF0ZVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRleHQgPSAnJ1xuICAgIHRoaXMubm9kZXMgPSBbXVxuICAgIHRoaXMuZWRnZXMgPSBbXVxuICAgIHRoaXMucm9vdCA9IHRoaXMuY3JlYXRlX25vZGUoMClcbiAgICB0aGlzLnRvcF9ub2RlID0gbmV3IFRvcE5vZGUodGhpcy5yb290KVxuICAgIHRoaXMucm9vdC5zbGluayA9IHRoaXMudG9wX25vZGVcbiAgICB0aGlzLnNpbmsgPSB0aGlzLmNyZWF0ZV9ub2RlKC0xKVxuICAgIHRoaXMuYXAgPSBuZXcgU3RhdGUodGhpcy5yb290LCB1bmRlZmluZWQsIDApXG4gIH1cblxuICBjcmVhdGVfbm9kZShkZXB0aDogbnVtYmVyKTogQ05vZGUge1xuICAgIGNvbnN0IG5vZGUgPSBuZXcgQ05vZGUodGhpcy5ub2Rlcy5sZW5ndGgsIGRlcHRoKVxuICAgIHRoaXMubm9kZXMucHVzaChub2RlKVxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBjcmVhdGVfY2xvc2VkX2VkZ2UoXG4gICAgcGFyZW50OiBDTm9kZSxcbiAgICBlZGdlX2JlZzogbnVtYmVyLFxuICAgIGVkZ2VfbGVuOiBudW1iZXIsXG4gICAgY2hpbGQ6IENOb2RlLFxuICApIHtcbiAgICBjb25zdCBlZGdlID0gbmV3IEVkZ2UoXG4gICAgICB0aGlzLmVkZ2VzLmxlbmd0aCxcbiAgICAgICgpID0+IHRoaXMudGV4dCxcbiAgICAgIHBhcmVudCxcbiAgICAgIGVkZ2VfYmVnLFxuICAgICAgZWRnZV9sZW4sXG4gICAgICBjaGlsZCxcbiAgICApXG4gICAgdGhpcy5lZGdlcy5wdXNoKGVkZ2UpXG4gICAgcGFyZW50Lm91dF9lZGdlcy5zZXQodGhpcy50ZXh0W2VkZ2VfYmVnXSwgZWRnZSlcbiAgICByZXR1cm4gZWRnZVxuICB9XG5cbiAgY3JlYXRlX29wZW5fZWRnZShwYXJlbnQ6IENOb2RlLCBlZGdlX2JlZzogbnVtYmVyKSB7XG4gICAgY29uc3QgZWRnZSA9IG5ldyBFZGdlKFxuICAgICAgdGhpcy5lZGdlcy5sZW5ndGgsXG4gICAgICAoKSA9PiB0aGlzLnRleHQsXG4gICAgICBwYXJlbnQsXG4gICAgICBlZGdlX2JlZyxcbiAgICAgIC0xLFxuICAgICAgdGhpcy5zaW5rLFxuICAgIClcbiAgICB0aGlzLmVkZ2VzLnB1c2goZWRnZSlcbiAgICBwYXJlbnQub3V0X2VkZ2VzLnNldCh0aGlzLnRleHRbZWRnZV9iZWddLCBlZGdlKVxuICAgIHJldHVybiBlZGdlXG4gIH1cblxuICAvLyByZXR1cm4gYSBzdGF0ZSB0aGF0IG1vdmVkIGZyb20gbm9kZSB3aXRoIHRleHRbYmVnOmJlZytsZW5dLlxuICAvLyBJdCBpcyBndXJhbnRlZWQgdGhhdCB3ZSBjYW4gbW92ZSBub2RlIHdpdGggdGV4dFtiZWc6YmVnK2xlbl0uXG4gIG1vdmVfdHJ1c3Qobm9kZTogQ05vZGUsIHRleHQ6IHN0cmluZywgYmVnOiBudW1iZXIsIGxlbjogbnVtYmVyKTogU3RhdGUge1xuICAgIGNvbnN0IF9tb3ZlX3RydXN0ID0gKFxuICAgICAgbm9kZTogQ05vZGUsXG4gICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICBiZWc6IG51bWJlcixcbiAgICAgIGxlbjogbnVtYmVyLFxuICAgICkgPT4ge1xuICAgICAgY29uc3QgZWRnZSA9IG5vZGUub3V0X2VkZ2VzLmdldCh0ZXh0W2JlZ10pIGFzIEVkZ2VcbiAgICAgIGlmIChsZW4gPCBlZGdlLmxlbikge1xuICAgICAgICByZXR1cm4gbmV3IFN0YXRlKG5vZGUsIGVkZ2UsIGxlbilcbiAgICAgIH0gZWxzZSBpZiAobGVuID09PSBlZGdlLmxlbikge1xuICAgICAgICByZXR1cm4gU3RhdGUuY3JlYXRlX2F0X25vZGVfc3RhdGUoZWRnZS5jaGlsZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVfdHJ1c3QoZWRnZS5jaGlsZCwgdGV4dCwgYmVnICsgZWRnZS5sZW4sIGxlbiAtIGVkZ2UubGVuKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAobGVuID09PSAwKSByZXR1cm4gbmV3IFN0YXRlKG5vZGUpXG4gICAgZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIFRvcE5vZGUpIHtcbiAgICAgIGlmIChsZW4gPT09IDEpIHJldHVybiBuZXcgU3RhdGUobm9kZS5yb290KVxuICAgICAgZWxzZSByZXR1cm4gX21vdmVfdHJ1c3Qobm9kZS5yb290LCB0ZXh0LCBiZWcgKyAxLCBsZW4gLSAxKVxuICAgIH0gZWxzZSByZXR1cm4gX21vdmVfdHJ1c3Qobm9kZSwgdGV4dCwgYmVnLCBsZW4pXG4gIH1cblxuICAvLyBjcmVhdGUgbmV3IG5vZGUgdGhhdCBoYXMgb3V0X2VkZ2VzIG9mIHRoZSBnaXZlIG5vZGUuXG4gIGNvcHlfbm9kZShub2RlOiBDTm9kZSwgbnVtX2luX2VkZ2VfbGVmdDogbnVtYmVyKSB7XG4gICAgY29uc3QgbmV3X25vZGUgPSB0aGlzLmNyZWF0ZV9ub2RlKG5vZGUuZGVwdGggLSBudW1faW5fZWRnZV9sZWZ0KVxuICAgIGNvbnN0IG91dF9lZGdlcyA9IEFycmF5LmZyb20obm9kZS5vdXRfZWRnZXMuZW50cmllcygpKVxuICAgIG91dF9lZGdlcy5zb3J0KCkgLy8gZm9yIHRlc3RcbiAgICBmb3IgKGNvbnN0IFtrLCBlZGdlXSBvZiBvdXRfZWRnZXMpIHtcbiAgICAgIHRoaXMuY3JlYXRlX2Nsb3NlZF9lZGdlKFxuICAgICAgICBuZXdfbm9kZSxcbiAgICAgICAgZWRnZS5lZGdlX2JlZyxcbiAgICAgICAgZWRnZS5lZGdlX2xlbixcbiAgICAgICAgZWRnZS5jaGlsZCxcbiAgICAgIClcbiAgICB9XG4gICAgLy8gc3BsaXQgaW5fZWRnZXNcbiAgICBuZXdfbm9kZS5pbl9lZGdlcyA9IG5vZGUuaW5fZWRnZXMuc2xpY2UobnVtX2luX2VkZ2VfbGVmdClcbiAgICBub2RlLmluX2VkZ2VzID0gbm9kZS5pbl9lZGdlcy5zbGljZSgwLCBudW1faW5fZWRnZV9sZWZ0KVxuXG4gICAgbmV3X25vZGUuaW5fZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgIGVkZ2UuY2hpbGQgPSBuZXdfbm9kZVxuICAgIH0pXG5cbiAgICBuZXdfbm9kZS5zbGluayA9IG5vZGUuc2xpbmtcbiAgICBub2RlLnNsaW5rID0gbmV3X25vZGVcblxuICAgIHJldHVybiBuZXdfbm9kZVxuICB9XG5cbiAgc3BsaXQoc3RhdGU6IFN0YXRlKSB7XG4gICAgY29uc3QgYnJhbmNoX25vZGUgPSB0aGlzLmNyZWF0ZV9ub2RlKHN0YXRlLm1hdGNoX2xlbilcbiAgICBjb25zdCBpbl9lZGdlID0gdGhpcy5jcmVhdGVfY2xvc2VkX2VkZ2UoXG4gICAgICBzdGF0ZS5wYXJlbnQsXG4gICAgICBzdGF0ZS5lZGdlLmVkZ2VfYmVnLFxuICAgICAgc3RhdGUubWF0Y2hfbGVuLFxuICAgICAgYnJhbmNoX25vZGUsXG4gICAgKVxuXG4gICAgc3RhdGUuZWRnZS5wYXJlbnQgPSBicmFuY2hfbm9kZVxuICAgIGlmICghc3RhdGUuZWRnZS5pc19vcGVuKSBzdGF0ZS5lZGdlLmVkZ2VfbGVuIC09IHN0YXRlLm1hdGNoX2xlblxuICAgIHN0YXRlLmVkZ2UuZWRnZV9iZWcgKz0gc3RhdGUubWF0Y2hfbGVuXG4gICAgYnJhbmNoX25vZGUub3V0X2VkZ2VzLnNldChzdGF0ZS5lZGdlLmNoYXJBdCgwKSwgc3RhdGUuZWRnZSlcblxuICAgIGJyYW5jaF9ub2RlLmluX2VkZ2VzLnB1c2goaW5fZWRnZSlcblxuICAgIHJldHVybiBicmFuY2hfbm9kZVxuICB9XG5cbiAgaW5zZXJ0KGNoYXI6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKClcbiAgICBjb25zb2xlLmxvZygnaW5zZXJ0IGNoYXJbJywgY2hhciwgJ10nKVxuICAgIHRoaXMudGV4dCArPSBjaGFyXG4gICAgaWYgKHRoaXMudGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuY3JlYXRlX29wZW5fZWRnZSh0aGlzLnJvb3QsIDApXG4gICAgICB0aGlzLmFwID0gbmV3IFN0YXRlKHRoaXMucm9vdClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgbmV4dF9zdGF0ZTogU3RhdGUgfCB1bmRlZmluZWRcbiAgICBsZXQgcHJldl9icmFuY2g6IENOb2RlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG4gICAgbGV0IHByZXZfZGVzdGluYXRpb246IENOb2RlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG4gICAgd2hpbGUgKChuZXh0X3N0YXRlID0gdGhpcy5hcC5tb3ZlKGNoYXIpKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZygnYXAnLCB0aGlzLmFwLCB0aGlzLmFwLmF0Tm9kZSlcbiAgICAgIGlmICh0aGlzLmFwLmF0Tm9kZSkge1xuICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHByZXZpb3VzbGx5IHByb2Nlc3NlZCBub2RlLCBjcmVhdGUgc3VmZml4IGxpbmsgZnJvbSBpdCB0byB0aGUgYWN0aXZlIHBvaW50XG4gICAgICAgIGlmIChwcmV2X2JyYW5jaCkgcHJldl9icmFuY2guc2xpbmsgPSB0aGlzLmFwLnBhcmVudFxuICAgICAgICBwcmV2X2JyYW5jaCA9IHRoaXMuYXAucGFyZW50XG4gICAgICAgIHByZXZfZGVzdGluYXRpb24gPSB0aGlzLnNpbmtcblxuICAgICAgICB0aGlzLmNyZWF0ZV9vcGVuX2VkZ2UodGhpcy5hcC5wYXJlbnQsIHRoaXMudGV4dC5sZW5ndGggLSAxKVxuXG4gICAgICAgIHRoaXMuYXAgPSBuZXcgU3RhdGUodGhpcy5hcC5wYXJlbnQuc2xpbmspXG4gICAgICAgIGNvbnNvbGUubG9nKCdmaXJzdCBhcCcsIHRoaXMuYXApXG4gICAgICB9IGVsc2UgaWYgKHByZXZfYnJhbmNoICYmIHRoaXMuYXAuZWRnZS5jaGlsZCA9PT0gcHJldl9kZXN0aW5hdGlvbikge1xuICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHByZXZpb3VzbHkgcHJvY2Vzc2VkIG5vZGUgKHByZXZfYnJhbmNoKSBhbmQgaXRzIGRlc3RpbmF0aW9uIGlzIGVxdWFsIHRvIHRoZSBkZXN0aW5hdGlvbiBvZiB0aGUgYWN0aXZlIHBvaW50LCBtZXJnZSB0aGUgYWN0aXZlIHBvaW50IHRvIHRoZSBwcmV2X2JyYW5jaFxuICAgICAgICB0aGlzLmFwLmVkZ2UuY2hpbGQgPSBwcmV2X2JyYW5jaFxuICAgICAgICB0aGlzLmFwLmVkZ2UubGVuID0gdGhpcy5hcC5tYXRjaF9sZW5cbiAgICAgICAgcHJldl9icmFuY2guaW5fZWRnZXMucHVzaCh0aGlzLmFwLmVkZ2UpXG5cbiAgICAgICAgdGhpcy5hcCA9IHRoaXMubW92ZV90cnVzdChcbiAgICAgICAgICB0aGlzLmFwLnBhcmVudC5zbGluayxcbiAgICAgICAgICB0aGlzLnRleHQsXG4gICAgICAgICAgdGhpcy5hcC5lZGdlLmVkZ2VfYmVnLFxuICAgICAgICAgIHRoaXMuYXAubWF0Y2hfbGVuLFxuICAgICAgICApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzcGxpdCBhbmQgY3JlYXRlIGEgbmV3IG9wZW4gZWRnZVxuICAgICAgICBjb25zdCBlZGdlX2JlZyA9IHRoaXMuYXAuZWRnZS5lZGdlX2JlZ1xuICAgICAgICBjb25zdCBlZGdlX2xlbiA9IHRoaXMuYXAubWF0Y2hfbGVuXG5cbiAgICAgICAgY29uc3QgYnJhbmNoX25vZGUgPSB0aGlzLnNwbGl0KHRoaXMuYXApXG4gICAgICAgIGlmIChwcmV2X2JyYW5jaCkgcHJldl9icmFuY2guc2xpbmsgPSBicmFuY2hfbm9kZVxuICAgICAgICBwcmV2X2JyYW5jaCA9IGJyYW5jaF9ub2RlXG4gICAgICAgIHByZXZfZGVzdGluYXRpb24gPSB0aGlzLmFwLmVkZ2UuY2hpbGRcblxuICAgICAgICB0aGlzLmNyZWF0ZV9vcGVuX2VkZ2UoYnJhbmNoX25vZGUsIHRoaXMudGV4dC5sZW5ndGggLSAxKVxuICAgICAgICB0aGlzLmFwID0gdGhpcy5tb3ZlX3RydXN0KFxuICAgICAgICAgIHRoaXMuYXAucGFyZW50LnNsaW5rLFxuICAgICAgICAgIHRoaXMudGV4dCxcbiAgICAgICAgICBlZGdlX2JlZyxcbiAgICAgICAgICBlZGdlX2xlbixcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJldl9icmFuY2ggJiYgdGhpcy5hcC5hdE5vZGUpIHByZXZfYnJhbmNoLnNsaW5rID0gdGhpcy5hcC5wYXJlbnRcbiAgICBpZiAoXG4gICAgICBuZXh0X3N0YXRlLmF0Tm9kZSAmJlxuICAgICAgbmV4dF9zdGF0ZS5wYXJlbnQuZGVwdGggPlxuICAgICAgICB0aGlzLmFwLnBhcmVudC5kZXB0aCArICh0aGlzLmFwLmF0Tm9kZSA/IDEgOiB0aGlzLmFwLmVkZ2UubGVuKVxuICAgICkge1xuICAgICAgLy8gd2UgcmVhY2hlZCBuZXh0X3N0YXRlIHdpdGggbm9uLXByaW1hcnkgZWRnZVxuICAgICAgY29uc3QgYnJhbmNoX25vZGUgPSB0aGlzLmNvcHlfbm9kZShcbiAgICAgICAgbmV4dF9zdGF0ZS5wYXJlbnQsXG4gICAgICAgIG5leHRfc3RhdGUucGFyZW50LmRlcHRoIC1cbiAgICAgICAgICAodGhpcy5hcC5wYXJlbnQuZGVwdGggKyAodGhpcy5hcC5hdE5vZGUgPyAxIDogdGhpcy5hcC5lZGdlLmxlbikpLFxuICAgICAgKVxuICAgICAgbmV4dF9zdGF0ZSA9IG5ldyBTdGF0ZShicmFuY2hfbm9kZSlcbiAgICB9XG4gICAgdGhpcy5hcCA9IG5leHRfc3RhdGVcbiAgICBjb25zb2xlLmxvZygnaW5zZXJ0IGVuZCwgYXAgaXMnLCB0aGlzLmFwKVxuICB9XG5cbiAganNvbihzaG93X3N1ZmZpeF9saW5rczogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBjb25zdCBub2RlczogYW55ID0gW11cbiAgICBjb25zdCBlZGdlczogYW55ID0gW11cbiAgICBjb25zdCBuaWQgPSBuZXcgTWFwKClcblxuICAgIGNvbnN0IG1heF9yb3VuZG5lc3MgPSAwLjVcbiAgICBjb25zdCBtaW5fcm91bmRuZXNzID0gLTAuNVxuICAgIGNvbnN0IHJvdW5kbmVzcyA9IChlZGdlOiBFZGdlKSA9PiB7XG4gICAgICBjb25zdCBlYmlydGggPSBBcnJheS5mcm9tKGVkZ2UucGFyZW50Lm91dF9lZGdlcy52YWx1ZXMoKSkubWFwKGUgPT4gW1xuICAgICAgICBlLmJpcnRoX3RpbWUsXG4gICAgICAgIGUsXG4gICAgICBdKVxuICAgICAgZWJpcnRoLnNvcnQoKVxuICAgICAgbGV0IGJpcnRoX2lkeCA9IC0xXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGViaXJ0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZWJpcnRoW2ldWzFdID09PSBlZGdlKSB7XG4gICAgICAgICAgYmlydGhfaWR4ID0gaVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZWRnZS5wYXJlbnQub3V0X2VkZ2VzLnNpemUgPT09IDEpIHJldHVybiAwLjBcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICBtaW5fcm91bmRuZXNzICtcbiAgICAgICAgICAoKG1heF9yb3VuZG5lc3MgLSBtaW5fcm91bmRuZXNzKSAqIGJpcnRoX2lkeCkgL1xuICAgICAgICAgICAgKGVkZ2UucGFyZW50Lm91dF9lZGdlcy5zaXplIC0gMSlcbiAgICAgICAgKVxuICAgIH1cblxuICAgIHRoaXMubm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIGNvbnN0IG4gPSB7XG4gICAgICAgIGxhYmVsOiAnJyArIG5vZGUuYmlydGhfdGltZSxcbiAgICAgICAgaWQ6IG5vZGUuYmlydGhfdGltZSxcbiAgICAgICAgbGV2ZWw6IC0xLFxuICAgICAgfVxuICAgICAgbmlkLnNldChub2RlLCBub2RlLmJpcnRoX3RpbWUpXG4gICAgICBub2Rlcy5wdXNoKG4pXG4gICAgfSlcbiAgICBpZiAoc2hvd19zdWZmaXhfbGlua3MpIHtcbiAgICAgIHRoaXMubm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgaWYgKG5vZGUuc2xpbmsgJiYgbm9kZSAhPT0gdGhpcy5yb290KSB7XG4gICAgICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgICAgIGZyb206IG5pZC5nZXQobm9kZSksXG4gICAgICAgICAgICB0bzogbmlkLmdldChub2RlLnNsaW5rKSxcbiAgICAgICAgICAgIGlkOiAnZVsnICsgbmlkLmdldChub2RlKSArICddLVsnICsgbmlkLmdldChub2RlLnNsaW5rKSArICddJyxcbiAgICAgICAgICAgIGRhc2hlczogdHJ1ZSxcbiAgICAgICAgICAgIGNvbG9yOiB7IGNvbG9yOiBub2RlLmlzX2V4cGxpY2l0ID8gJyM4NDg0ODQnIDogJyNmZjAwMDAnIH0sXG4gICAgICAgICAgICAvLyAsIGxhYmVsOiBlZGdlLnN0clxuICAgICAgICAgICAgZm9udDogeyBhbGlnbjogJ3RvcCcgfSxcbiAgICAgICAgICAgIHNtb290aDogeyB0eXBlOiAnY3VydmVkQ1cnLCByb3VuZG5lc3M6IDAuNCB9LFxuICAgICAgICAgIH1cbiAgICAgICAgICBlZGdlcy5wdXNoKGUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbnN0IHNldF9sZXZlbF9yZWMgPSAobm9kZTogQ05vZGUsIGxldmVsOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IG4gPSBub2Rlc1tuaWQuZ2V0KG5vZGUpXVxuICAgICAgaWYgKG4ubGV2ZWwgPCBsZXZlbCkge1xuICAgICAgICBuLmxldmVsID0gbGV2ZWxcbiAgICAgICAgbm9kZS5vdXRfZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgICAgICBzZXRfbGV2ZWxfcmVjKGVkZ2UuY2hpbGQsIG4ubGV2ZWwgKyAxKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgICBzZXRfbGV2ZWxfcmVjKHRoaXMucm9vdCwgMClcblxuICAgIHRoaXMuZWRnZXMuZm9yRWFjaChlZGdlID0+IHtcbiAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgIGZyb206IG5pZC5nZXQoZWRnZS5wYXJlbnQpLFxuICAgICAgICB0bzogbmlkLmdldChlZGdlLmNoaWxkKSxcbiAgICAgICAgaWQ6XG4gICAgICAgICAgJ1snICtcbiAgICAgICAgICBuaWQuZ2V0KGVkZ2UucGFyZW50KSArXG4gICAgICAgICAgJygnICtcbiAgICAgICAgICBlZGdlLmxlbiArXG4gICAgICAgICAgJyldLVsnICtcbiAgICAgICAgICBuaWQuZ2V0KGVkZ2UuY2hpbGQpICtcbiAgICAgICAgICAnXScsXG4gICAgICAgIGxhYmVsOiBlZGdlLnN0cixcbiAgICAgICAgZm9udDogeyBhbGlnbjogJ3RvcCcgfSxcbiAgICAgICAgc21vb3RoOiB7IHR5cGU6ICdjdXJ2ZWRDVycsIHJvdW5kbmVzczogcm91bmRuZXNzKGVkZ2UpIH0sXG4gICAgICB9XG4gICAgICBlZGdlcy5wdXNoKGUpXG4gICAgfSlcblxuICAgIHJldHVybiB7IG5vZGVzLCBlZGdlcyB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkX2NkYXdnID0gKFxuICB0ZXh0OiBzdHJpbmcsXG4gIHNob3dfc3VmZml4X2xpbmtzOiBib29sZWFuID0gZmFsc2UsXG4pID0+IHtcbiAgY29uc3QgY2Rhd2cgPSBuZXcgQ0RBV0coKVxuICBmb3IgKGNvbnN0IGMgb2YgdGV4dCkge1xuICAgIGNkYXdnLmluc2VydChjKVxuICB9XG4gIHJldHVybiBjZGF3Z1xufVxuXG5jb25zdCBtYWluID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICBjb25zb2xlLmxvZygndGV4dCcsIHRleHQpXG4gIGNvbnN0IGNkYXdnID0gYnVpbGRfY2Rhd2codGV4dClcbiAgY29uc29sZS5sb2coY2Rhd2cpXG4gIGNvbnNvbGUubG9nKGNkYXdnLmpzb24pXG4gIHJldHVybiBjZGF3Z1xufVxuXG5jb25zb2xlLmxvZyhyZXF1aXJlLm1haW4gPT09IG1vZHVsZSlcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICBtYWluKHByb2Nlc3MuYXJndi5sZW5ndGggPT09IDMgPyBwcm9jZXNzLmFyZ3ZbMl0gOiAnYWJjYWJjYWJhJylcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=