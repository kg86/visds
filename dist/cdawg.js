/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cdawg.ts":
/*!**********************!*\
  !*** ./src/cdawg.ts ***!
  \**********************/
/***/ ((module, exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build_cdawg = void 0;
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
    static create_at_node_state(parent) {
        return new State(parent, undefined, undefined);
    }
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
            if (match_len + 1 <= edge.len) {
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
        this.text += char;
        console.log("insert char[", char, "], text=", this.text);
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
const build_cdawg = (text, implicit_cdawg = false) => {
    const cdawg = new CDAWG();
    for (const c of text) {
        cdawg.insert(c);
    }
    if (!implicit_cdawg) {
        cdawg.explicit();
    }
    return cdawg;
};
exports.build_cdawg = build_cdawg;
const main = (text) => {
    console.log("text", text);
    const cdawg = (0, exports.build_cdawg)(text);
    console.log(cdawg);
    console.log(cdawg.json);
    return cdawg;
};
console.log(__webpack_require__.c[__webpack_require__.s] === module);
if (__webpack_require__.c[__webpack_require__.s] === module) {
    main(process.argv.length === 3 ? process.argv[2] : "abcabcaba");
}


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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = "./src/cdawg.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUNqRTs7Ozs7OztVQ3BlRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVKQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Zpc2RzLy4vc3JjL2NkYXdnLnRzIiwid2VicGFjazovL3Zpc2RzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Zpc2RzL3dlYnBhY2svcnVudGltZS9ub2RlIG1vZHVsZSBkZWNvcmF0b3IiLCJ3ZWJwYWNrOi8vdmlzZHMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly92aXNkcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdmlzZHMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENOb2RlIHtcbiAgYmlydGhfdGltZTogbnVtYmVyO1xuICBkZXB0aDogbnVtYmVyO1xuICBzbGluazogQ05vZGU7XG4gIG91dF9lZGdlczogTWFwPHN0cmluZywgRWRnZT47XG4gIGluX2VkZ2VzOiBBcnJheTxFZGdlPjtcbiAgY29uc3RydWN0b3IoYmlydGhfdGltZTogbnVtYmVyLCBkZXB0aDogbnVtYmVyKSB7XG4gICAgdGhpcy5iaXJ0aF90aW1lID0gYmlydGhfdGltZTtcbiAgICB0aGlzLmRlcHRoID0gZGVwdGg7XG4gICAgdGhpcy5zbGluayA9IHRoaXM7XG4gICAgdGhpcy5vdXRfZWRnZXMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5pbl9lZGdlcyA9IFtdO1xuICB9XG5cbiAgZ2V0IGlzX2V4cGxpY2l0KCkge1xuICAgIHJldHVybiB0aGlzLm91dF9lZGdlcy5zaXplICE9PSAxO1xuICB9XG59XG5cbmNsYXNzIEVkZ2Uge1xuICBiaXJ0aF90aW1lOiBudW1iZXI7XG4gIHRleHQ6ICgpID0+IHN0cmluZztcbiAgcGFyZW50OiBDTm9kZTtcbiAgZWRnZV9iZWc6IG51bWJlcjtcbiAgZWRnZV9sZW46IG51bWJlcjtcbiAgY2hpbGQ6IENOb2RlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGJpcnRoX3RpbWU6IG51bWJlcixcbiAgICB0ZXh0OiAoKSA9PiBzdHJpbmcsXG4gICAgcGFyZW50OiBDTm9kZSxcbiAgICBlZGdlX2JlZzogbnVtYmVyLFxuICAgIGVkZ2VfbGVuOiBudW1iZXIsXG4gICAgY2hpbGQ6IENOb2RlXG4gICkge1xuICAgIHRoaXMuYmlydGhfdGltZSA9IGJpcnRoX3RpbWU7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLmVkZ2VfYmVnID0gZWRnZV9iZWc7XG4gICAgdGhpcy5lZGdlX2xlbiA9IGVkZ2VfbGVuO1xuICAgIHRoaXMuY2hpbGQgPSBjaGlsZDtcbiAgfVxuXG4gIGNoYXJBdChpOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRleHQoKVt0aGlzLmVkZ2VfYmVnICsgaV07XG4gIH1cblxuICBnZXQgc3RyKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMuZWRnZV9sZW4gPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkuc3Vic3RyKHRoaXMuZWRnZV9iZWcsIHRoaXMuZWRnZV9sZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkuc3Vic3RyKHRoaXMuZWRnZV9iZWcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsZW4oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlX2xlbiA9PT0gLTFcbiAgICAgID8gdGhpcy50ZXh0KCkubGVuZ3RoIC0gdGhpcy5lZGdlX2JlZ1xuICAgICAgOiB0aGlzLmVkZ2VfbGVuO1xuICB9XG5cbiAgc2V0IGxlbih2YWwpIHtcbiAgICB0aGlzLmVkZ2VfbGVuID0gdmFsO1xuICB9XG5cbiAgZ2V0IGlzX29wZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZWRnZV9sZW4gPT09IC0xO1xuICB9XG59XG5cbmNvbnN0IGR1bW15X25vZGUgPSBuZXcgQ05vZGUoLTEsIC0xKTtcbmNvbnN0IGR1bW15X2VkZ2UgPSBuZXcgRWRnZSgtMSwgKCkgPT4gXCJcIiwgZHVtbXlfbm9kZSwgLTEsIC0xLCBkdW1teV9ub2RlKTtcblxuLy8gVG9wTm9kZSBpcyBhbiBpbXBsaWNpdCBub2RlLlxuLy8gVGhlIHJvb3Qgbm9kZSdzIHN1ZmZpeCBsaW5rIHBvaW50cyB0byB0aGUgdG9wIG5vZGUuXG4vLyBUaGVyZSBpcyBhIHNwZWNpYWwgZWRnZSBmcm9tIHRoZSB0b3Agbm9kZSB0byB0aGUgcm9vdCBub2RlLCB3aGljaCB3ZSBjYW4gbW92ZSBhbnkgY2hhcmFjdGVycy5cbmNsYXNzIFRvcE5vZGUgZXh0ZW5kcyBDTm9kZSB7XG4gIHJvb3Q6IENOb2RlO1xuICBlZGdlOiBFZGdlO1xuICBjb25zdHJ1Y3Rvcihyb290OiBDTm9kZSkge1xuICAgIHN1cGVyKC0xLCAtMSk7XG4gICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICB0aGlzLmVkZ2UgPSBuZXcgRWRnZSgtMSwgKCkgPT4gXCJcIiwgZHVtbXlfbm9kZSwgLTEsIC0xLCB0aGlzLnJvb3QpO1xuICB9XG5cbiAgZ2V0IGF0Tm9kZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG4vLyBJdCByZXByZXNlbnRzIGFuIGltcGxpY2l0IG5vZGUgd2hpY2ggaXMgbG9jYXRlZCBhdCBtYXRjaF9sZW4gb24gYW4gZWRnZS5cbi8vIElmIGl0IGlzIGF0IG5vZGUsIGVkZ2UgaXMgYW4gZHVtbXlfZWRnZSBhbmQgbWF0Y2hfbGVuID0gMFxuY2xhc3MgU3RhdGUge1xuICBzdGF0aWMgY3JlYXRlX2F0X25vZGVfc3RhdGUocGFyZW50OiBDTm9kZSk6IFN0YXRlIHtcbiAgICByZXR1cm4gbmV3IFN0YXRlKHBhcmVudCwgdW5kZWZpbmVkLCB1bmRlZmluZWQpO1xuICB9XG5cbiAgcGFyZW50OiBDTm9kZTtcbiAgZWRnZTogRWRnZTtcbiAgbWF0Y2hfbGVuOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKHBhcmVudDogQ05vZGUsIGVkZ2U6IEVkZ2UgPSBkdW1teV9lZGdlLCBtYXRjaF9sZW46IG51bWJlciA9IDApIHtcbiAgICBpZiAocGFyZW50IGluc3RhbmNlb2YgVG9wTm9kZSkge1xuICAgICAgLy8gVGhpcyBpcyBUb3BOb2RlXG4gICAgICB0aGlzLmVkZ2UgPSBwYXJlbnQuZWRnZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lZGdlID0gZWRnZTtcbiAgICB9XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5tYXRjaF9sZW4gPSBtYXRjaF9sZW47XG4gIH1cblxuICBnZXQgYXROb2RlKCkge1xuICAgIHJldHVybiB0aGlzLm1hdGNoX2xlbiA9PT0gMDtcbiAgfVxuXG4gIC8vIHJldHVybiBhIHN0YXRlIHRoYXQgY2FuIGJlIG1vdmVkIGZyb20gdGhlIGN1cnJlbnQgc3RhdGUgd2l0aCBhIGNoYXJhY3RlciBjaGFyLlxuICAvLyBpZiBjYW5ub3QsIHJldHVybiB1bmRlZmluZWQuXG4gIG1vdmUoY2hhcjogc3RyaW5nKTogU3RhdGUgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnBhcmVudCBpbnN0YW5jZW9mIFRvcE5vZGUpIHJldHVybiBuZXcgU3RhdGUodGhpcy5lZGdlLmNoaWxkKTtcbiAgICBjb25zdCBjYW5fbW92ZSA9IHRoaXMuYXROb2RlXG4gICAgICA/IHRoaXMucGFyZW50Lm91dF9lZGdlcy5oYXMoY2hhcilcbiAgICAgIDogdGhpcy5lZGdlLmNoYXJBdCh0aGlzLm1hdGNoX2xlbikgPT09IGNoYXI7XG4gICAgLy8gY29uc29sZS5sb2coJ2Nhbl9tb3ZlJywgY2FuX21vdmUpXG4gICAgaWYgKCFjYW5fbW92ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZWRnZSA9IHRoaXMuYXROb2RlXG4gICAgICAgID8gKHRoaXMucGFyZW50Lm91dF9lZGdlcy5nZXQoY2hhcikgYXMgRWRnZSlcbiAgICAgICAgOiB0aGlzLmVkZ2U7XG4gICAgICBjb25zdCBtYXRjaF9sZW4gPSB0aGlzLmF0Tm9kZSA/IDAgOiB0aGlzLm1hdGNoX2xlbjtcbiAgICAgIGlmIChtYXRjaF9sZW4gKyAxIDw9IGVkZ2UubGVuKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RhdGUodGhpcy5wYXJlbnQsIGVkZ2UsIG1hdGNoX2xlbiArIDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFN0YXRlLmNyZWF0ZV9hdF9ub2RlX3N0YXRlKGVkZ2UuY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBDREFXRyB7XG4gIHRleHQ6IHN0cmluZztcbiAgbm9kZXM6IEFycmF5PENOb2RlPjtcbiAgZWRnZXM6IEFycmF5PEVkZ2U+O1xuICByb290OiBDTm9kZTtcbiAgdG9wX25vZGU6IFRvcE5vZGU7XG4gIHNpbms6IENOb2RlO1xuICBhcDogU3RhdGU7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGV4dCA9IFwiXCI7XG4gICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIHRoaXMuZWRnZXMgPSBbXTtcbiAgICB0aGlzLnJvb3QgPSB0aGlzLmNyZWF0ZV9ub2RlKDApO1xuICAgIHRoaXMudG9wX25vZGUgPSBuZXcgVG9wTm9kZSh0aGlzLnJvb3QpO1xuICAgIHRoaXMucm9vdC5zbGluayA9IHRoaXMudG9wX25vZGU7XG4gICAgdGhpcy5zaW5rID0gdGhpcy5jcmVhdGVfbm9kZSgtMSk7XG4gICAgdGhpcy5hcCA9IG5ldyBTdGF0ZSh0aGlzLnJvb3QsIHVuZGVmaW5lZCwgMCk7XG4gIH1cblxuICBjcmVhdGVfbm9kZShkZXB0aDogbnVtYmVyKTogQ05vZGUge1xuICAgIGNvbnN0IG5vZGUgPSBuZXcgQ05vZGUodGhpcy5ub2Rlcy5sZW5ndGgsIGRlcHRoKTtcbiAgICB0aGlzLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICBjcmVhdGVfY2xvc2VkX2VkZ2UoXG4gICAgcGFyZW50OiBDTm9kZSxcbiAgICBlZGdlX2JlZzogbnVtYmVyLFxuICAgIGVkZ2VfbGVuOiBudW1iZXIsXG4gICAgY2hpbGQ6IENOb2RlXG4gICkge1xuICAgIGNvbnN0IGVkZ2UgPSBuZXcgRWRnZShcbiAgICAgIHRoaXMuZWRnZXMubGVuZ3RoLFxuICAgICAgKCkgPT4gdGhpcy50ZXh0LFxuICAgICAgcGFyZW50LFxuICAgICAgZWRnZV9iZWcsXG4gICAgICBlZGdlX2xlbixcbiAgICAgIGNoaWxkXG4gICAgKTtcbiAgICB0aGlzLmVkZ2VzLnB1c2goZWRnZSk7XG4gICAgcGFyZW50Lm91dF9lZGdlcy5zZXQodGhpcy50ZXh0W2VkZ2VfYmVnXSwgZWRnZSk7XG4gICAgcmV0dXJuIGVkZ2U7XG4gIH1cblxuICBjcmVhdGVfb3Blbl9lZGdlKHBhcmVudDogQ05vZGUsIGVkZ2VfYmVnOiBudW1iZXIpIHtcbiAgICBjb25zdCBlZGdlID0gbmV3IEVkZ2UoXG4gICAgICB0aGlzLmVkZ2VzLmxlbmd0aCxcbiAgICAgICgpID0+IHRoaXMudGV4dCxcbiAgICAgIHBhcmVudCxcbiAgICAgIGVkZ2VfYmVnLFxuICAgICAgLTEsXG4gICAgICB0aGlzLnNpbmtcbiAgICApO1xuICAgIHRoaXMuZWRnZXMucHVzaChlZGdlKTtcbiAgICBwYXJlbnQub3V0X2VkZ2VzLnNldCh0aGlzLnRleHRbZWRnZV9iZWddLCBlZGdlKTtcbiAgICByZXR1cm4gZWRnZTtcbiAgfVxuXG4gIC8vIHJldHVybiBhIHN0YXRlIHRoYXQgbW92ZWQgZnJvbSBub2RlIHdpdGggdGV4dFtiZWc6YmVnK2xlbl0uXG4gIC8vIEl0IGlzIGd1cmFudGVlZCB0aGF0IHdlIGNhbiBtb3ZlIG5vZGUgd2l0aCB0ZXh0W2JlZzpiZWcrbGVuXS5cbiAgbW92ZV90cnVzdChub2RlOiBDTm9kZSwgdGV4dDogc3RyaW5nLCBiZWc6IG51bWJlciwgbGVuOiBudW1iZXIpOiBTdGF0ZSB7XG4gICAgY29uc3QgX21vdmVfdHJ1c3QgPSAoXG4gICAgICBub2RlOiBDTm9kZSxcbiAgICAgIHRleHQ6IHN0cmluZyxcbiAgICAgIGJlZzogbnVtYmVyLFxuICAgICAgbGVuOiBudW1iZXJcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGVkZ2UgPSBub2RlLm91dF9lZGdlcy5nZXQodGV4dFtiZWddKSBhcyBFZGdlO1xuICAgICAgaWYgKGxlbiA8IGVkZ2UubGVuKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RhdGUobm9kZSwgZWRnZSwgbGVuKTtcbiAgICAgIH0gZWxzZSBpZiAobGVuID09PSBlZGdlLmxlbikge1xuICAgICAgICByZXR1cm4gU3RhdGUuY3JlYXRlX2F0X25vZGVfc3RhdGUoZWRnZS5jaGlsZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5tb3ZlX3RydXN0KFxuICAgICAgICAgIGVkZ2UuY2hpbGQsXG4gICAgICAgICAgdGV4dCxcbiAgICAgICAgICBiZWcgKyBlZGdlLmxlbixcbiAgICAgICAgICBsZW4gLSBlZGdlLmxlblxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIG5ldyBTdGF0ZShub2RlKTtcbiAgICBlbHNlIGlmIChub2RlIGluc3RhbmNlb2YgVG9wTm9kZSkge1xuICAgICAgaWYgKGxlbiA9PT0gMSkgcmV0dXJuIG5ldyBTdGF0ZShub2RlLnJvb3QpO1xuICAgICAgZWxzZSByZXR1cm4gX21vdmVfdHJ1c3Qobm9kZS5yb290LCB0ZXh0LCBiZWcgKyAxLCBsZW4gLSAxKTtcbiAgICB9IGVsc2UgcmV0dXJuIF9tb3ZlX3RydXN0KG5vZGUsIHRleHQsIGJlZywgbGVuKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBuZXcgbm9kZSB0aGF0IGhhcyBvdXRfZWRnZXMgb2YgdGhlIGdpdmUgbm9kZS5cbiAgY29weV9ub2RlKG5vZGU6IENOb2RlLCBudW1faW5fZWRnZV9sZWZ0OiBudW1iZXIpIHtcbiAgICBjb25zdCBuZXdfbm9kZSA9IHRoaXMuY3JlYXRlX25vZGUobm9kZS5kZXB0aCAtIG51bV9pbl9lZGdlX2xlZnQpO1xuICAgIGNvbnN0IG91dF9lZGdlcyA9IEFycmF5LmZyb20obm9kZS5vdXRfZWRnZXMuZW50cmllcygpKTtcbiAgICBvdXRfZWRnZXMuc29ydCgpOyAvLyBmb3IgdGVzdFxuICAgIGZvciAoY29uc3QgW2ssIGVkZ2VdIG9mIG91dF9lZGdlcykge1xuICAgICAgdGhpcy5jcmVhdGVfY2xvc2VkX2VkZ2UoXG4gICAgICAgIG5ld19ub2RlLFxuICAgICAgICBlZGdlLmVkZ2VfYmVnLFxuICAgICAgICBlZGdlLmVkZ2VfbGVuLFxuICAgICAgICBlZGdlLmNoaWxkXG4gICAgICApO1xuICAgIH1cbiAgICAvLyBzcGxpdCBpbl9lZGdlc1xuICAgIG5ld19ub2RlLmluX2VkZ2VzID0gbm9kZS5pbl9lZGdlcy5zbGljZShudW1faW5fZWRnZV9sZWZ0KTtcbiAgICBub2RlLmluX2VkZ2VzID0gbm9kZS5pbl9lZGdlcy5zbGljZSgwLCBudW1faW5fZWRnZV9sZWZ0KTtcblxuICAgIG5ld19ub2RlLmluX2VkZ2VzLmZvckVhY2goKGVkZ2UpID0+IHtcbiAgICAgIGVkZ2UuY2hpbGQgPSBuZXdfbm9kZTtcbiAgICB9KTtcblxuICAgIG5ld19ub2RlLnNsaW5rID0gbm9kZS5zbGluaztcbiAgICBub2RlLnNsaW5rID0gbmV3X25vZGU7XG5cbiAgICByZXR1cm4gbmV3X25vZGU7XG4gIH1cblxuICBzcGxpdChzdGF0ZTogU3RhdGUpIHtcbiAgICBjb25zdCBicmFuY2hfbm9kZSA9IHRoaXMuY3JlYXRlX25vZGUoc3RhdGUubWF0Y2hfbGVuKTtcbiAgICBjb25zdCBpbl9lZGdlID0gdGhpcy5jcmVhdGVfY2xvc2VkX2VkZ2UoXG4gICAgICBzdGF0ZS5wYXJlbnQsXG4gICAgICBzdGF0ZS5lZGdlLmVkZ2VfYmVnLFxuICAgICAgc3RhdGUubWF0Y2hfbGVuLFxuICAgICAgYnJhbmNoX25vZGVcbiAgICApO1xuXG4gICAgc3RhdGUuZWRnZS5wYXJlbnQgPSBicmFuY2hfbm9kZTtcbiAgICBpZiAoIXN0YXRlLmVkZ2UuaXNfb3Blbikgc3RhdGUuZWRnZS5lZGdlX2xlbiAtPSBzdGF0ZS5tYXRjaF9sZW47XG4gICAgc3RhdGUuZWRnZS5lZGdlX2JlZyArPSBzdGF0ZS5tYXRjaF9sZW47XG4gICAgYnJhbmNoX25vZGUub3V0X2VkZ2VzLnNldChzdGF0ZS5lZGdlLmNoYXJBdCgwKSwgc3RhdGUuZWRnZSk7XG5cbiAgICBicmFuY2hfbm9kZS5pbl9lZGdlcy5wdXNoKGluX2VkZ2UpO1xuXG4gICAgcmV0dXJuIGJyYW5jaF9ub2RlO1xuICB9XG5cbiAgaW5zZXJ0KGNoYXI6IHN0cmluZykge1xuICAgIGNvbnNvbGUubG9nKCk7XG4gICAgdGhpcy50ZXh0ICs9IGNoYXI7XG4gICAgY29uc29sZS5sb2coXCJpbnNlcnQgY2hhcltcIiwgY2hhciwgXCJdLCB0ZXh0PVwiLCB0aGlzLnRleHQpO1xuICAgIGlmICh0aGlzLnRleHQubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLmNyZWF0ZV9vcGVuX2VkZ2UodGhpcy5yb290LCAwKTtcbiAgICAgIHRoaXMuYXAgPSBuZXcgU3RhdGUodGhpcy5yb290KTtcbiAgICAgIHRoaXMuc2luay5zbGluayA9IHRoaXMucm9vdDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IG5leHRfc3RhdGU6IFN0YXRlIHwgdW5kZWZpbmVkO1xuICAgIGxldCBwcmV2X2JyYW5jaDogQ05vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgbGV0IHByZXZfZGVzdGluYXRpb246IENOb2RlIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIHdoaWxlICgobmV4dF9zdGF0ZSA9IHRoaXMuYXAubW92ZShjaGFyKSkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc29sZS5sb2coXCJhcFwiLCB0aGlzLmFwLCB0aGlzLmFwLmF0Tm9kZSk7XG4gICAgICBpZiAodGhpcy5hcC5hdE5vZGUpIHtcbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgYSBwcmV2aW91c2xseSBwcm9jZXNzZWQgbm9kZSwgY3JlYXRlIHN1ZmZpeCBsaW5rIGZyb20gaXQgdG8gdGhlIGFjdGl2ZSBwb2ludFxuICAgICAgICBpZiAocHJldl9icmFuY2gpIHByZXZfYnJhbmNoLnNsaW5rID0gdGhpcy5hcC5wYXJlbnQ7XG4gICAgICAgIHByZXZfYnJhbmNoID0gdGhpcy5hcC5wYXJlbnQ7XG4gICAgICAgIHByZXZfZGVzdGluYXRpb24gPSB0aGlzLnNpbms7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVfb3Blbl9lZGdlKHRoaXMuYXAucGFyZW50LCB0aGlzLnRleHQubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgdGhpcy5hcCA9IG5ldyBTdGF0ZSh0aGlzLmFwLnBhcmVudC5zbGluayk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZmlyc3QgYXBcIiwgdGhpcy5hcCk7XG4gICAgICB9IGVsc2UgaWYgKHByZXZfYnJhbmNoICYmIHRoaXMuYXAuZWRnZS5jaGlsZCA9PT0gcHJldl9kZXN0aW5hdGlvbikge1xuICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHByZXZpb3VzbHkgcHJvY2Vzc2VkIG5vZGUgKHByZXZfYnJhbmNoKSBhbmQgaXRzIGRlc3RpbmF0aW9uIGlzIGVxdWFsIHRvIHRoZSBkZXN0aW5hdGlvbiBvZiB0aGUgYWN0aXZlIHBvaW50LCBtZXJnZSB0aGUgYWN0aXZlIHBvaW50IHRvIHRoZSBwcmV2X2JyYW5jaFxuICAgICAgICB0aGlzLmFwLmVkZ2UuY2hpbGQgPSBwcmV2X2JyYW5jaDtcbiAgICAgICAgdGhpcy5hcC5lZGdlLmxlbiA9IHRoaXMuYXAubWF0Y2hfbGVuO1xuICAgICAgICBwcmV2X2JyYW5jaC5pbl9lZGdlcy5wdXNoKHRoaXMuYXAuZWRnZSk7XG5cbiAgICAgICAgdGhpcy5hcCA9IHRoaXMubW92ZV90cnVzdChcbiAgICAgICAgICB0aGlzLmFwLnBhcmVudC5zbGluayxcbiAgICAgICAgICB0aGlzLnRleHQsXG4gICAgICAgICAgdGhpcy5hcC5lZGdlLmVkZ2VfYmVnLFxuICAgICAgICAgIHRoaXMuYXAubWF0Y2hfbGVuXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzcGxpdCBhbmQgY3JlYXRlIGEgbmV3IG9wZW4gZWRnZVxuICAgICAgICBjb25zdCBlZGdlX2JlZyA9IHRoaXMuYXAuZWRnZS5lZGdlX2JlZztcbiAgICAgICAgY29uc3QgZWRnZV9sZW4gPSB0aGlzLmFwLm1hdGNoX2xlbjtcblxuICAgICAgICBjb25zdCBicmFuY2hfbm9kZSA9IHRoaXMuc3BsaXQodGhpcy5hcCk7XG4gICAgICAgIGlmIChwcmV2X2JyYW5jaCkgcHJldl9icmFuY2guc2xpbmsgPSBicmFuY2hfbm9kZTtcbiAgICAgICAgcHJldl9icmFuY2ggPSBicmFuY2hfbm9kZTtcbiAgICAgICAgcHJldl9kZXN0aW5hdGlvbiA9IHRoaXMuYXAuZWRnZS5jaGlsZDtcblxuICAgICAgICB0aGlzLmNyZWF0ZV9vcGVuX2VkZ2UoYnJhbmNoX25vZGUsIHRoaXMudGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgdGhpcy5hcCA9IHRoaXMubW92ZV90cnVzdChcbiAgICAgICAgICB0aGlzLmFwLnBhcmVudC5zbGluayxcbiAgICAgICAgICB0aGlzLnRleHQsXG4gICAgICAgICAgZWRnZV9iZWcsXG4gICAgICAgICAgZWRnZV9sZW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByZXZfYnJhbmNoICYmIHRoaXMuYXAuYXROb2RlKSBwcmV2X2JyYW5jaC5zbGluayA9IHRoaXMuYXAucGFyZW50O1xuICAgIGlmIChcbiAgICAgIG5leHRfc3RhdGUuYXROb2RlICYmXG4gICAgICBuZXh0X3N0YXRlLnBhcmVudC5kZXB0aCA+XG4gICAgICAgIHRoaXMuYXAucGFyZW50LmRlcHRoICsgKHRoaXMuYXAuYXROb2RlID8gMSA6IHRoaXMuYXAuZWRnZS5sZW4pXG4gICAgKSB7XG4gICAgICAvLyB3ZSByZWFjaGVkIG5leHRfc3RhdGUgd2l0aCBub24tcHJpbWFyeSBlZGdlXG4gICAgICBjb25zdCBicmFuY2hfbm9kZSA9IHRoaXMuY29weV9ub2RlKFxuICAgICAgICBuZXh0X3N0YXRlLnBhcmVudCxcbiAgICAgICAgbmV4dF9zdGF0ZS5wYXJlbnQuZGVwdGggLVxuICAgICAgICAgICh0aGlzLmFwLnBhcmVudC5kZXB0aCArICh0aGlzLmFwLmF0Tm9kZSA/IDEgOiB0aGlzLmFwLmVkZ2UubGVuKSlcbiAgICAgICk7XG4gICAgICBuZXh0X3N0YXRlID0gbmV3IFN0YXRlKGJyYW5jaF9ub2RlKTtcbiAgICB9XG4gICAgdGhpcy5hcCA9IG5leHRfc3RhdGU7XG4gICAgaWYgKHRoaXMuYXAuYXROb2RlKSB7XG4gICAgICB0aGlzLnNpbmsuc2xpbmsgPSB0aGlzLmFwLnBhcmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaW5rLnNsaW5rID0gdGhpcy5zaW5rO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcImluc2VydCBlbmQsIGFwIGlzXCIsIHRoaXMuYXApO1xuICB9XG5cbiAgLy8vIHRyYW5zZm9ybXMgQ0RBV0cgaW1wbGljaXQgdG8gZXhwbGljaXQuXG4gIC8vLyBjcmVhdGVzIGEgbm9kZSBjb3JyZXNwb25kaW5nIHRvIGFuIGFjdGl2ZSBub2RlLlxuICBleHBsaWNpdCgpIHtcbiAgICBsZXQgcHJldl9ub2RlID0gdGhpcy5zaW5rO1xuICAgIHdoaWxlICghdGhpcy5hcC5hdE5vZGUpIHtcbiAgICAgIGNvbnN0IGVkZ2VfYmVnID0gdGhpcy5hcC5lZGdlLmVkZ2VfYmVnO1xuICAgICAgY29uc3QgbWF0Y2hfbGVuID0gdGhpcy5hcC5tYXRjaF9sZW47XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5zcGxpdCh0aGlzLmFwKTtcbiAgICAgIHByZXZfbm9kZS5zbGluayA9IG5vZGU7XG4gICAgICBwcmV2X25vZGUgPSBub2RlO1xuICAgICAgdGhpcy5hcCA9IHRoaXMubW92ZV90cnVzdChcbiAgICAgICAgdGhpcy5hcC5wYXJlbnQuc2xpbmssXG4gICAgICAgIHRoaXMudGV4dCxcbiAgICAgICAgZWRnZV9iZWcsXG4gICAgICAgIG1hdGNoX2xlblxuICAgICAgKTtcbiAgICB9XG4gICAgcHJldl9ub2RlLnNsaW5rID0gdGhpcy5hcC5wYXJlbnQ7XG4gIH1cblxuICBqc29uKHNob3dfc3VmZml4X2xpbmtzOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGNvbnN0IG5vZGVzOiBhbnkgPSBbXTtcbiAgICBjb25zdCBlZGdlczogYW55ID0gW107XG4gICAgY29uc3QgbmlkID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3QgbWF4X3JvdW5kbmVzcyA9IDAuNTtcbiAgICBjb25zdCBtaW5fcm91bmRuZXNzID0gLTAuNTtcbiAgICBjb25zdCByb3VuZG5lc3MgPSAoZWRnZTogRWRnZSkgPT4ge1xuICAgICAgY29uc3QgZWJpcnRoID0gQXJyYXkuZnJvbShlZGdlLnBhcmVudC5vdXRfZWRnZXMudmFsdWVzKCkpLm1hcCgoZSkgPT4gW1xuICAgICAgICBlLmJpcnRoX3RpbWUsXG4gICAgICAgIGUsXG4gICAgICBdKTtcbiAgICAgIGViaXJ0aC5zb3J0KCk7XG4gICAgICBsZXQgYmlydGhfaWR4ID0gLTE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGViaXJ0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZWJpcnRoW2ldWzFdID09PSBlZGdlKSB7XG4gICAgICAgICAgYmlydGhfaWR4ID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVkZ2UucGFyZW50Lm91dF9lZGdlcy5zaXplID09PSAxKSByZXR1cm4gMC4wO1xuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIG1pbl9yb3VuZG5lc3MgK1xuICAgICAgICAgICgobWF4X3JvdW5kbmVzcyAtIG1pbl9yb3VuZG5lc3MpICogYmlydGhfaWR4KSAvXG4gICAgICAgICAgICAoZWRnZS5wYXJlbnQub3V0X2VkZ2VzLnNpemUgLSAxKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGNvbnN0IG4gPSB7XG4gICAgICAgIGxhYmVsOiBcIlwiICsgbm9kZS5iaXJ0aF90aW1lLFxuICAgICAgICBpZDogbm9kZS5iaXJ0aF90aW1lLFxuICAgICAgICBsZXZlbDogLTEsXG4gICAgICB9O1xuICAgICAgbmlkLnNldChub2RlLCBub2RlLmJpcnRoX3RpbWUpO1xuICAgICAgbm9kZXMucHVzaChuKTtcbiAgICB9KTtcbiAgICBpZiAoc2hvd19zdWZmaXhfbGlua3MpIHtcbiAgICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS5zbGluayAhPSBub2RlICYmIG5vZGUgIT09IHRoaXMucm9vdCkge1xuICAgICAgICAgIC8vIGlmIChub2RlLnNsaW5rICYmIG5vZGUgIT09IHRoaXMucm9vdCkge1xuICAgICAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgICAgICBmcm9tOiBuaWQuZ2V0KG5vZGUpLFxuICAgICAgICAgICAgdG86IG5pZC5nZXQobm9kZS5zbGluayksXG4gICAgICAgICAgICBpZDogXCJlW1wiICsgbmlkLmdldChub2RlKSArIFwiXS1bXCIgKyBuaWQuZ2V0KG5vZGUuc2xpbmspICsgXCJdXCIsXG4gICAgICAgICAgICBkYXNoZXM6IHRydWUsXG4gICAgICAgICAgICAvLyBjb2xvcjogeyBjb2xvcjogbm9kZS5pc19leHBsaWNpdCA/ICcjODQ4NDg0JyA6ICcjZmYwMDAwJyB9LFxuICAgICAgICAgICAgY29sb3I6IHsgY29sb3I6IFwiIzg0ODQ4NFwiIH0sXG4gICAgICAgICAgICAvLyAsIGxhYmVsOiBlZGdlLnN0clxuICAgICAgICAgICAgZm9udDogeyBhbGlnbjogXCJ0b3BcIiB9LFxuICAgICAgICAgICAgc21vb3RoOiB7IHR5cGU6IFwiY3VydmVkQ1dcIiwgcm91bmRuZXNzOiAwLjQgfSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGVkZ2VzLnB1c2goZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBzZXRfbGV2ZWxfcmVjID0gKG5vZGU6IENOb2RlLCBsZXZlbDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuID0gbm9kZXNbbmlkLmdldChub2RlKV07XG4gICAgICBpZiAobi5sZXZlbCA8IGxldmVsKSB7XG4gICAgICAgIG4ubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgbm9kZS5vdXRfZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgICAgIHNldF9sZXZlbF9yZWMoZWRnZS5jaGlsZCwgbi5sZXZlbCArIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHNldF9sZXZlbF9yZWModGhpcy5yb290LCAwKTtcblxuICAgIHRoaXMuZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgZnJvbTogbmlkLmdldChlZGdlLnBhcmVudCksXG4gICAgICAgIHRvOiBuaWQuZ2V0KGVkZ2UuY2hpbGQpLFxuICAgICAgICBpZDpcbiAgICAgICAgICBcIltcIiArXG4gICAgICAgICAgbmlkLmdldChlZGdlLnBhcmVudCkgK1xuICAgICAgICAgIFwiKFwiICtcbiAgICAgICAgICBlZGdlLmxlbiArXG4gICAgICAgICAgXCIpXS1bXCIgK1xuICAgICAgICAgIG5pZC5nZXQoZWRnZS5jaGlsZCkgK1xuICAgICAgICAgIFwiXVwiLFxuICAgICAgICBsYWJlbDogZWRnZS5zdHIsXG4gICAgICAgIGZvbnQ6IHsgYWxpZ246IFwidG9wXCIgfSxcbiAgICAgICAgc21vb3RoOiB7IHR5cGU6IFwiY3VydmVkQ1dcIiwgcm91bmRuZXNzOiByb3VuZG5lc3MoZWRnZSkgfSxcbiAgICAgIH07XG4gICAgICBlZGdlcy5wdXNoKGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgbm9kZXMsIGVkZ2VzIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkX2NkYXdnID0gKHRleHQ6IHN0cmluZywgaW1wbGljaXRfY2Rhd2c6IGJvb2xlYW4gPSBmYWxzZSkgPT4ge1xuICBjb25zdCBjZGF3ZyA9IG5ldyBDREFXRygpO1xuICBmb3IgKGNvbnN0IGMgb2YgdGV4dCkge1xuICAgIGNkYXdnLmluc2VydChjKTtcbiAgfVxuICBpZiAoIWltcGxpY2l0X2NkYXdnKSB7XG4gICAgY2Rhd2cuZXhwbGljaXQoKTtcbiAgfVxuICByZXR1cm4gY2Rhd2c7XG59O1xuXG5jb25zdCBtYWluID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICBjb25zb2xlLmxvZyhcInRleHRcIiwgdGV4dCk7XG4gIGNvbnN0IGNkYXdnID0gYnVpbGRfY2Rhd2codGV4dCk7XG4gIGNvbnNvbGUubG9nKGNkYXdnKTtcbiAgY29uc29sZS5sb2coY2Rhd2cuanNvbik7XG4gIHJldHVybiBjZGF3Zztcbn07XG5cbmNvbnNvbGUubG9nKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKTtcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICBtYWluKHByb2Nlc3MuYXJndi5sZW5ndGggPT09IDMgPyBwcm9jZXNzLmFyZ3ZbMl0gOiBcImFiY2FiY2FiYVwiKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2Rhd2cudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=