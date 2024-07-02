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
        // if the active point is at the end of the edge, move to the next node.
        if (this.ap.edge.len === this.ap.match_len) {
            this.ap = new State(this.ap.edge.child);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQVksS0FBSyxNQUFNLENBQUMsQ0FBQztBQUNyQyxJQUFJLDRDQUFZLEtBQUssTUFBTSxFQUFFO0lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQ2pFOzs7Ozs7O1VDeGVEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztVRUpBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmlzZHMvLi9zcmMvY2Rhd2cudHMiLCJ3ZWJwYWNrOi8vdmlzZHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmlzZHMvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly92aXNkcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Zpc2RzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly92aXNkcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ05vZGUge1xuICBiaXJ0aF90aW1lOiBudW1iZXI7XG4gIGRlcHRoOiBudW1iZXI7XG4gIHNsaW5rOiBDTm9kZTtcbiAgb3V0X2VkZ2VzOiBNYXA8c3RyaW5nLCBFZGdlPjtcbiAgaW5fZWRnZXM6IEFycmF5PEVkZ2U+O1xuICBjb25zdHJ1Y3RvcihiaXJ0aF90aW1lOiBudW1iZXIsIGRlcHRoOiBudW1iZXIpIHtcbiAgICB0aGlzLmJpcnRoX3RpbWUgPSBiaXJ0aF90aW1lO1xuICAgIHRoaXMuZGVwdGggPSBkZXB0aDtcbiAgICB0aGlzLnNsaW5rID0gdGhpcztcbiAgICB0aGlzLm91dF9lZGdlcyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLmluX2VkZ2VzID0gW107XG4gIH1cblxuICBnZXQgaXNfZXhwbGljaXQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0X2VkZ2VzLnNpemUgIT09IDE7XG4gIH1cbn1cblxuY2xhc3MgRWRnZSB7XG4gIGJpcnRoX3RpbWU6IG51bWJlcjtcbiAgdGV4dDogKCkgPT4gc3RyaW5nO1xuICBwYXJlbnQ6IENOb2RlO1xuICBlZGdlX2JlZzogbnVtYmVyO1xuICBlZGdlX2xlbjogbnVtYmVyO1xuICBjaGlsZDogQ05vZGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgYmlydGhfdGltZTogbnVtYmVyLFxuICAgIHRleHQ6ICgpID0+IHN0cmluZyxcbiAgICBwYXJlbnQ6IENOb2RlLFxuICAgIGVkZ2VfYmVnOiBudW1iZXIsXG4gICAgZWRnZV9sZW46IG51bWJlcixcbiAgICBjaGlsZDogQ05vZGVcbiAgKSB7XG4gICAgdGhpcy5iaXJ0aF90aW1lID0gYmlydGhfdGltZTtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuZWRnZV9iZWcgPSBlZGdlX2JlZztcbiAgICB0aGlzLmVkZ2VfbGVuID0gZWRnZV9sZW47XG4gICAgdGhpcy5jaGlsZCA9IGNoaWxkO1xuICB9XG5cbiAgY2hhckF0KGk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMudGV4dCgpW3RoaXMuZWRnZV9iZWcgKyBpXTtcbiAgfVxuXG4gIGdldCBzdHIoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5lZGdlX2xlbiA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS5zdWJzdHIodGhpcy5lZGdlX2JlZywgdGhpcy5lZGdlX2xlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS5zdWJzdHIodGhpcy5lZGdlX2JlZyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxlbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVkZ2VfbGVuID09PSAtMVxuICAgICAgPyB0aGlzLnRleHQoKS5sZW5ndGggLSB0aGlzLmVkZ2VfYmVnXG4gICAgICA6IHRoaXMuZWRnZV9sZW47XG4gIH1cblxuICBzZXQgbGVuKHZhbCkge1xuICAgIHRoaXMuZWRnZV9sZW4gPSB2YWw7XG4gIH1cblxuICBnZXQgaXNfb3BlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lZGdlX2xlbiA9PT0gLTE7XG4gIH1cbn1cblxuY29uc3QgZHVtbXlfbm9kZSA9IG5ldyBDTm9kZSgtMSwgLTEpO1xuY29uc3QgZHVtbXlfZWRnZSA9IG5ldyBFZGdlKC0xLCAoKSA9PiBcIlwiLCBkdW1teV9ub2RlLCAtMSwgLTEsIGR1bW15X25vZGUpO1xuXG4vLyBUb3BOb2RlIGlzIGFuIGltcGxpY2l0IG5vZGUuXG4vLyBUaGUgcm9vdCBub2RlJ3Mgc3VmZml4IGxpbmsgcG9pbnRzIHRvIHRoZSB0b3Agbm9kZS5cbi8vIFRoZXJlIGlzIGEgc3BlY2lhbCBlZGdlIGZyb20gdGhlIHRvcCBub2RlIHRvIHRoZSByb290IG5vZGUsIHdoaWNoIHdlIGNhbiBtb3ZlIGFueSBjaGFyYWN0ZXJzLlxuY2xhc3MgVG9wTm9kZSBleHRlbmRzIENOb2RlIHtcbiAgcm9vdDogQ05vZGU7XG4gIGVkZ2U6IEVkZ2U7XG4gIGNvbnN0cnVjdG9yKHJvb3Q6IENOb2RlKSB7XG4gICAgc3VwZXIoLTEsIC0xKTtcbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuZWRnZSA9IG5ldyBFZGdlKC0xLCAoKSA9PiBcIlwiLCBkdW1teV9ub2RlLCAtMSwgLTEsIHRoaXMucm9vdCk7XG4gIH1cblxuICBnZXQgYXROb2RlKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8vIEl0IHJlcHJlc2VudHMgYW4gaW1wbGljaXQgbm9kZSB3aGljaCBpcyBsb2NhdGVkIGF0IG1hdGNoX2xlbiBvbiBhbiBlZGdlLlxuLy8gSWYgaXQgaXMgYXQgbm9kZSwgZWRnZSBpcyBhbiBkdW1teV9lZGdlIGFuZCBtYXRjaF9sZW4gPSAwXG5jbGFzcyBTdGF0ZSB7XG4gIHN0YXRpYyBjcmVhdGVfYXRfbm9kZV9zdGF0ZShwYXJlbnQ6IENOb2RlKTogU3RhdGUge1xuICAgIHJldHVybiBuZXcgU3RhdGUocGFyZW50LCB1bmRlZmluZWQsIHVuZGVmaW5lZCk7XG4gIH1cblxuICBwYXJlbnQ6IENOb2RlO1xuICBlZGdlOiBFZGdlO1xuICBtYXRjaF9sZW46IG51bWJlcjtcbiAgY29uc3RydWN0b3IocGFyZW50OiBDTm9kZSwgZWRnZTogRWRnZSA9IGR1bW15X2VkZ2UsIG1hdGNoX2xlbjogbnVtYmVyID0gMCkge1xuICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBUb3BOb2RlKSB7XG4gICAgICAvLyBUaGlzIGlzIFRvcE5vZGVcbiAgICAgIHRoaXMuZWRnZSA9IHBhcmVudC5lZGdlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVkZ2UgPSBlZGdlO1xuICAgIH1cbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLm1hdGNoX2xlbiA9IG1hdGNoX2xlbjtcbiAgfVxuXG4gIGdldCBhdE5vZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hfbGVuID09PSAwO1xuICB9XG5cbiAgLy8gcmV0dXJuIGEgc3RhdGUgdGhhdCBjYW4gYmUgbW92ZWQgZnJvbSB0aGUgY3VycmVudCBzdGF0ZSB3aXRoIGEgY2hhcmFjdGVyIGNoYXIuXG4gIC8vIGlmIGNhbm5vdCwgcmV0dXJuIHVuZGVmaW5lZC5cbiAgbW92ZShjaGFyOiBzdHJpbmcpOiBTdGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMucGFyZW50IGluc3RhbmNlb2YgVG9wTm9kZSkgcmV0dXJuIG5ldyBTdGF0ZSh0aGlzLmVkZ2UuY2hpbGQpO1xuICAgIGNvbnN0IGNhbl9tb3ZlID0gdGhpcy5hdE5vZGVcbiAgICAgID8gdGhpcy5wYXJlbnQub3V0X2VkZ2VzLmhhcyhjaGFyKVxuICAgICAgOiB0aGlzLmVkZ2UuY2hhckF0KHRoaXMubWF0Y2hfbGVuKSA9PT0gY2hhcjtcbiAgICAvLyBjb25zb2xlLmxvZygnY2FuX21vdmUnLCBjYW5fbW92ZSlcbiAgICBpZiAoIWNhbl9tb3ZlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlZGdlID0gdGhpcy5hdE5vZGVcbiAgICAgICAgPyAodGhpcy5wYXJlbnQub3V0X2VkZ2VzLmdldChjaGFyKSBhcyBFZGdlKVxuICAgICAgICA6IHRoaXMuZWRnZTtcbiAgICAgIGNvbnN0IG1hdGNoX2xlbiA9IHRoaXMuYXROb2RlID8gMCA6IHRoaXMubWF0Y2hfbGVuO1xuICAgICAgaWYgKG1hdGNoX2xlbiArIDEgPD0gZWRnZS5sZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZSh0aGlzLnBhcmVudCwgZWRnZSwgbWF0Y2hfbGVuICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gU3RhdGUuY3JlYXRlX2F0X25vZGVfc3RhdGUoZWRnZS5jaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENEQVdHIHtcbiAgdGV4dDogc3RyaW5nO1xuICBub2RlczogQXJyYXk8Q05vZGU+O1xuICBlZGdlczogQXJyYXk8RWRnZT47XG4gIHJvb3Q6IENOb2RlO1xuICB0b3Bfbm9kZTogVG9wTm9kZTtcbiAgc2luazogQ05vZGU7XG4gIGFwOiBTdGF0ZTtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZXh0ID0gXCJcIjtcbiAgICB0aGlzLm5vZGVzID0gW107XG4gICAgdGhpcy5lZGdlcyA9IFtdO1xuICAgIHRoaXMucm9vdCA9IHRoaXMuY3JlYXRlX25vZGUoMCk7XG4gICAgdGhpcy50b3Bfbm9kZSA9IG5ldyBUb3BOb2RlKHRoaXMucm9vdCk7XG4gICAgdGhpcy5yb290LnNsaW5rID0gdGhpcy50b3Bfbm9kZTtcbiAgICB0aGlzLnNpbmsgPSB0aGlzLmNyZWF0ZV9ub2RlKC0xKTtcbiAgICB0aGlzLmFwID0gbmV3IFN0YXRlKHRoaXMucm9vdCwgdW5kZWZpbmVkLCAwKTtcbiAgfVxuXG4gIGNyZWF0ZV9ub2RlKGRlcHRoOiBudW1iZXIpOiBDTm9kZSB7XG4gICAgY29uc3Qgbm9kZSA9IG5ldyBDTm9kZSh0aGlzLm5vZGVzLmxlbmd0aCwgZGVwdGgpO1xuICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGNyZWF0ZV9jbG9zZWRfZWRnZShcbiAgICBwYXJlbnQ6IENOb2RlLFxuICAgIGVkZ2VfYmVnOiBudW1iZXIsXG4gICAgZWRnZV9sZW46IG51bWJlcixcbiAgICBjaGlsZDogQ05vZGVcbiAgKSB7XG4gICAgY29uc3QgZWRnZSA9IG5ldyBFZGdlKFxuICAgICAgdGhpcy5lZGdlcy5sZW5ndGgsXG4gICAgICAoKSA9PiB0aGlzLnRleHQsXG4gICAgICBwYXJlbnQsXG4gICAgICBlZGdlX2JlZyxcbiAgICAgIGVkZ2VfbGVuLFxuICAgICAgY2hpbGRcbiAgICApO1xuICAgIHRoaXMuZWRnZXMucHVzaChlZGdlKTtcbiAgICBwYXJlbnQub3V0X2VkZ2VzLnNldCh0aGlzLnRleHRbZWRnZV9iZWddLCBlZGdlKTtcbiAgICByZXR1cm4gZWRnZTtcbiAgfVxuXG4gIGNyZWF0ZV9vcGVuX2VkZ2UocGFyZW50OiBDTm9kZSwgZWRnZV9iZWc6IG51bWJlcikge1xuICAgIGNvbnN0IGVkZ2UgPSBuZXcgRWRnZShcbiAgICAgIHRoaXMuZWRnZXMubGVuZ3RoLFxuICAgICAgKCkgPT4gdGhpcy50ZXh0LFxuICAgICAgcGFyZW50LFxuICAgICAgZWRnZV9iZWcsXG4gICAgICAtMSxcbiAgICAgIHRoaXMuc2lua1xuICAgICk7XG4gICAgdGhpcy5lZGdlcy5wdXNoKGVkZ2UpO1xuICAgIHBhcmVudC5vdXRfZWRnZXMuc2V0KHRoaXMudGV4dFtlZGdlX2JlZ10sIGVkZ2UpO1xuICAgIHJldHVybiBlZGdlO1xuICB9XG5cbiAgLy8gcmV0dXJuIGEgc3RhdGUgdGhhdCBtb3ZlZCBmcm9tIG5vZGUgd2l0aCB0ZXh0W2JlZzpiZWcrbGVuXS5cbiAgLy8gSXQgaXMgZ3VyYW50ZWVkIHRoYXQgd2UgY2FuIG1vdmUgbm9kZSB3aXRoIHRleHRbYmVnOmJlZytsZW5dLlxuICBtb3ZlX3RydXN0KG5vZGU6IENOb2RlLCB0ZXh0OiBzdHJpbmcsIGJlZzogbnVtYmVyLCBsZW46IG51bWJlcik6IFN0YXRlIHtcbiAgICBjb25zdCBfbW92ZV90cnVzdCA9IChcbiAgICAgIG5vZGU6IENOb2RlLFxuICAgICAgdGV4dDogc3RyaW5nLFxuICAgICAgYmVnOiBudW1iZXIsXG4gICAgICBsZW46IG51bWJlclxuICAgICkgPT4ge1xuICAgICAgY29uc3QgZWRnZSA9IG5vZGUub3V0X2VkZ2VzLmdldCh0ZXh0W2JlZ10pIGFzIEVkZ2U7XG4gICAgICBpZiAobGVuIDwgZWRnZS5sZW4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdGF0ZShub2RlLCBlZGdlLCBsZW4pO1xuICAgICAgfSBlbHNlIGlmIChsZW4gPT09IGVkZ2UubGVuKSB7XG4gICAgICAgIHJldHVybiBTdGF0ZS5jcmVhdGVfYXRfbm9kZV9zdGF0ZShlZGdlLmNoaWxkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vdmVfdHJ1c3QoXG4gICAgICAgICAgZWRnZS5jaGlsZCxcbiAgICAgICAgICB0ZXh0LFxuICAgICAgICAgIGJlZyArIGVkZ2UubGVuLFxuICAgICAgICAgIGxlbiAtIGVkZ2UubGVuXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAobGVuID09PSAwKSByZXR1cm4gbmV3IFN0YXRlKG5vZGUpO1xuICAgIGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBUb3BOb2RlKSB7XG4gICAgICBpZiAobGVuID09PSAxKSByZXR1cm4gbmV3IFN0YXRlKG5vZGUucm9vdCk7XG4gICAgICBlbHNlIHJldHVybiBfbW92ZV90cnVzdChub2RlLnJvb3QsIHRleHQsIGJlZyArIDEsIGxlbiAtIDEpO1xuICAgIH0gZWxzZSByZXR1cm4gX21vdmVfdHJ1c3Qobm9kZSwgdGV4dCwgYmVnLCBsZW4pO1xuICB9XG5cbiAgLy8gY3JlYXRlIG5ldyBub2RlIHRoYXQgaGFzIG91dF9lZGdlcyBvZiB0aGUgZ2l2ZSBub2RlLlxuICBjb3B5X25vZGUobm9kZTogQ05vZGUsIG51bV9pbl9lZGdlX2xlZnQ6IG51bWJlcikge1xuICAgIGNvbnN0IG5ld19ub2RlID0gdGhpcy5jcmVhdGVfbm9kZShub2RlLmRlcHRoIC0gbnVtX2luX2VkZ2VfbGVmdCk7XG4gICAgY29uc3Qgb3V0X2VkZ2VzID0gQXJyYXkuZnJvbShub2RlLm91dF9lZGdlcy5lbnRyaWVzKCkpO1xuICAgIG91dF9lZGdlcy5zb3J0KCk7IC8vIGZvciB0ZXN0XG4gICAgZm9yIChjb25zdCBbaywgZWRnZV0gb2Ygb3V0X2VkZ2VzKSB7XG4gICAgICB0aGlzLmNyZWF0ZV9jbG9zZWRfZWRnZShcbiAgICAgICAgbmV3X25vZGUsXG4gICAgICAgIGVkZ2UuZWRnZV9iZWcsXG4gICAgICAgIGVkZ2UuZWRnZV9sZW4sXG4gICAgICAgIGVkZ2UuY2hpbGRcbiAgICAgICk7XG4gICAgfVxuICAgIC8vIHNwbGl0IGluX2VkZ2VzXG4gICAgbmV3X25vZGUuaW5fZWRnZXMgPSBub2RlLmluX2VkZ2VzLnNsaWNlKG51bV9pbl9lZGdlX2xlZnQpO1xuICAgIG5vZGUuaW5fZWRnZXMgPSBub2RlLmluX2VkZ2VzLnNsaWNlKDAsIG51bV9pbl9lZGdlX2xlZnQpO1xuXG4gICAgbmV3X25vZGUuaW5fZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgZWRnZS5jaGlsZCA9IG5ld19ub2RlO1xuICAgIH0pO1xuXG4gICAgbmV3X25vZGUuc2xpbmsgPSBub2RlLnNsaW5rO1xuICAgIG5vZGUuc2xpbmsgPSBuZXdfbm9kZTtcblxuICAgIHJldHVybiBuZXdfbm9kZTtcbiAgfVxuXG4gIHNwbGl0KHN0YXRlOiBTdGF0ZSkge1xuICAgIGNvbnN0IGJyYW5jaF9ub2RlID0gdGhpcy5jcmVhdGVfbm9kZShzdGF0ZS5tYXRjaF9sZW4pO1xuICAgIGNvbnN0IGluX2VkZ2UgPSB0aGlzLmNyZWF0ZV9jbG9zZWRfZWRnZShcbiAgICAgIHN0YXRlLnBhcmVudCxcbiAgICAgIHN0YXRlLmVkZ2UuZWRnZV9iZWcsXG4gICAgICBzdGF0ZS5tYXRjaF9sZW4sXG4gICAgICBicmFuY2hfbm9kZVxuICAgICk7XG5cbiAgICBzdGF0ZS5lZGdlLnBhcmVudCA9IGJyYW5jaF9ub2RlO1xuICAgIGlmICghc3RhdGUuZWRnZS5pc19vcGVuKSBzdGF0ZS5lZGdlLmVkZ2VfbGVuIC09IHN0YXRlLm1hdGNoX2xlbjtcbiAgICBzdGF0ZS5lZGdlLmVkZ2VfYmVnICs9IHN0YXRlLm1hdGNoX2xlbjtcbiAgICBicmFuY2hfbm9kZS5vdXRfZWRnZXMuc2V0KHN0YXRlLmVkZ2UuY2hhckF0KDApLCBzdGF0ZS5lZGdlKTtcblxuICAgIGJyYW5jaF9ub2RlLmluX2VkZ2VzLnB1c2goaW5fZWRnZSk7XG5cbiAgICByZXR1cm4gYnJhbmNoX25vZGU7XG4gIH1cblxuICBpbnNlcnQoY2hhcjogc3RyaW5nKSB7XG4gICAgY29uc29sZS5sb2coKTtcbiAgICB0aGlzLnRleHQgKz0gY2hhcjtcbiAgICBjb25zb2xlLmxvZyhcImluc2VydCBjaGFyW1wiLCBjaGFyLCBcIl0sIHRleHQ9XCIsIHRoaXMudGV4dCk7XG4gICAgaWYgKHRoaXMudGV4dC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuY3JlYXRlX29wZW5fZWRnZSh0aGlzLnJvb3QsIDApO1xuICAgICAgdGhpcy5hcCA9IG5ldyBTdGF0ZSh0aGlzLnJvb3QpO1xuICAgICAgdGhpcy5zaW5rLnNsaW5rID0gdGhpcy5yb290O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgbmV4dF9zdGF0ZTogU3RhdGUgfCB1bmRlZmluZWQ7XG4gICAgbGV0IHByZXZfYnJhbmNoOiBDTm9kZSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICBsZXQgcHJldl9kZXN0aW5hdGlvbjogQ05vZGUgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgd2hpbGUgKChuZXh0X3N0YXRlID0gdGhpcy5hcC5tb3ZlKGNoYXIpKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImFwXCIsIHRoaXMuYXAsIHRoaXMuYXAuYXROb2RlKTtcbiAgICAgIGlmICh0aGlzLmFwLmF0Tm9kZSkge1xuICAgICAgICAvLyBpZiB0aGVyZSBpcyBhIHByZXZpb3VzbGx5IHByb2Nlc3NlZCBub2RlLCBjcmVhdGUgc3VmZml4IGxpbmsgZnJvbSBpdCB0byB0aGUgYWN0aXZlIHBvaW50XG4gICAgICAgIGlmIChwcmV2X2JyYW5jaCkgcHJldl9icmFuY2guc2xpbmsgPSB0aGlzLmFwLnBhcmVudDtcbiAgICAgICAgcHJldl9icmFuY2ggPSB0aGlzLmFwLnBhcmVudDtcbiAgICAgICAgcHJldl9kZXN0aW5hdGlvbiA9IHRoaXMuc2luaztcblxuICAgICAgICB0aGlzLmNyZWF0ZV9vcGVuX2VkZ2UodGhpcy5hcC5wYXJlbnQsIHRoaXMudGV4dC5sZW5ndGggLSAxKTtcblxuICAgICAgICB0aGlzLmFwID0gbmV3IFN0YXRlKHRoaXMuYXAucGFyZW50LnNsaW5rKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJmaXJzdCBhcFwiLCB0aGlzLmFwKTtcbiAgICAgIH0gZWxzZSBpZiAocHJldl9icmFuY2ggJiYgdGhpcy5hcC5lZGdlLmNoaWxkID09PSBwcmV2X2Rlc3RpbmF0aW9uKSB7XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIGEgcHJldmlvdXNseSBwcm9jZXNzZWQgbm9kZSAocHJldl9icmFuY2gpIGFuZCBpdHMgZGVzdGluYXRpb24gaXMgZXF1YWwgdG8gdGhlIGRlc3RpbmF0aW9uIG9mIHRoZSBhY3RpdmUgcG9pbnQsIG1lcmdlIHRoZSBhY3RpdmUgcG9pbnQgdG8gdGhlIHByZXZfYnJhbmNoXG4gICAgICAgIHRoaXMuYXAuZWRnZS5jaGlsZCA9IHByZXZfYnJhbmNoO1xuICAgICAgICB0aGlzLmFwLmVkZ2UubGVuID0gdGhpcy5hcC5tYXRjaF9sZW47XG4gICAgICAgIHByZXZfYnJhbmNoLmluX2VkZ2VzLnB1c2godGhpcy5hcC5lZGdlKTtcblxuICAgICAgICB0aGlzLmFwID0gdGhpcy5tb3ZlX3RydXN0KFxuICAgICAgICAgIHRoaXMuYXAucGFyZW50LnNsaW5rLFxuICAgICAgICAgIHRoaXMudGV4dCxcbiAgICAgICAgICB0aGlzLmFwLmVkZ2UuZWRnZV9iZWcsXG4gICAgICAgICAgdGhpcy5hcC5tYXRjaF9sZW5cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNwbGl0IGFuZCBjcmVhdGUgYSBuZXcgb3BlbiBlZGdlXG4gICAgICAgIGNvbnN0IGVkZ2VfYmVnID0gdGhpcy5hcC5lZGdlLmVkZ2VfYmVnO1xuICAgICAgICBjb25zdCBlZGdlX2xlbiA9IHRoaXMuYXAubWF0Y2hfbGVuO1xuXG4gICAgICAgIGNvbnN0IGJyYW5jaF9ub2RlID0gdGhpcy5zcGxpdCh0aGlzLmFwKTtcbiAgICAgICAgaWYgKHByZXZfYnJhbmNoKSBwcmV2X2JyYW5jaC5zbGluayA9IGJyYW5jaF9ub2RlO1xuICAgICAgICBwcmV2X2JyYW5jaCA9IGJyYW5jaF9ub2RlO1xuICAgICAgICBwcmV2X2Rlc3RpbmF0aW9uID0gdGhpcy5hcC5lZGdlLmNoaWxkO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlX29wZW5fZWRnZShicmFuY2hfbm9kZSwgdGhpcy50ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICB0aGlzLmFwID0gdGhpcy5tb3ZlX3RydXN0KFxuICAgICAgICAgIHRoaXMuYXAucGFyZW50LnNsaW5rLFxuICAgICAgICAgIHRoaXMudGV4dCxcbiAgICAgICAgICBlZGdlX2JlZyxcbiAgICAgICAgICBlZGdlX2xlblxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJldl9icmFuY2ggJiYgdGhpcy5hcC5hdE5vZGUpIHByZXZfYnJhbmNoLnNsaW5rID0gdGhpcy5hcC5wYXJlbnQ7XG4gICAgaWYgKFxuICAgICAgbmV4dF9zdGF0ZS5hdE5vZGUgJiZcbiAgICAgIG5leHRfc3RhdGUucGFyZW50LmRlcHRoID5cbiAgICAgICAgdGhpcy5hcC5wYXJlbnQuZGVwdGggKyAodGhpcy5hcC5hdE5vZGUgPyAxIDogdGhpcy5hcC5lZGdlLmxlbilcbiAgICApIHtcbiAgICAgIC8vIHdlIHJlYWNoZWQgbmV4dF9zdGF0ZSB3aXRoIG5vbi1wcmltYXJ5IGVkZ2VcbiAgICAgIGNvbnN0IGJyYW5jaF9ub2RlID0gdGhpcy5jb3B5X25vZGUoXG4gICAgICAgIG5leHRfc3RhdGUucGFyZW50LFxuICAgICAgICBuZXh0X3N0YXRlLnBhcmVudC5kZXB0aCAtXG4gICAgICAgICAgKHRoaXMuYXAucGFyZW50LmRlcHRoICsgKHRoaXMuYXAuYXROb2RlID8gMSA6IHRoaXMuYXAuZWRnZS5sZW4pKVxuICAgICAgKTtcbiAgICAgIG5leHRfc3RhdGUgPSBuZXcgU3RhdGUoYnJhbmNoX25vZGUpO1xuICAgIH1cbiAgICB0aGlzLmFwID0gbmV4dF9zdGF0ZTtcbiAgICBpZiAodGhpcy5hcC5hdE5vZGUpIHtcbiAgICAgIHRoaXMuc2luay5zbGluayA9IHRoaXMuYXAucGFyZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpbmsuc2xpbmsgPSB0aGlzLnNpbms7XG4gICAgfVxuICAgIC8vIGlmIHRoZSBhY3RpdmUgcG9pbnQgaXMgYXQgdGhlIGVuZCBvZiB0aGUgZWRnZSwgbW92ZSB0byB0aGUgbmV4dCBub2RlLlxuICAgIGlmICh0aGlzLmFwLmVkZ2UubGVuID09PSB0aGlzLmFwLm1hdGNoX2xlbikge1xuICAgICAgdGhpcy5hcCA9IG5ldyBTdGF0ZSh0aGlzLmFwLmVkZ2UuY2hpbGQpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcImluc2VydCBlbmQsIGFwIGlzXCIsIHRoaXMuYXApO1xuICB9XG5cbiAgLy8vIHRyYW5zZm9ybXMgQ0RBV0cgaW1wbGljaXQgdG8gZXhwbGljaXQuXG4gIC8vLyBjcmVhdGVzIGEgbm9kZSBjb3JyZXNwb25kaW5nIHRvIGFuIGFjdGl2ZSBub2RlLlxuICBleHBsaWNpdCgpIHtcbiAgICBsZXQgcHJldl9ub2RlID0gdGhpcy5zaW5rO1xuICAgIHdoaWxlICghdGhpcy5hcC5hdE5vZGUpIHtcbiAgICAgIGNvbnN0IGVkZ2VfYmVnID0gdGhpcy5hcC5lZGdlLmVkZ2VfYmVnO1xuICAgICAgY29uc3QgbWF0Y2hfbGVuID0gdGhpcy5hcC5tYXRjaF9sZW47XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5zcGxpdCh0aGlzLmFwKTtcbiAgICAgIHByZXZfbm9kZS5zbGluayA9IG5vZGU7XG4gICAgICBwcmV2X25vZGUgPSBub2RlO1xuICAgICAgdGhpcy5hcCA9IHRoaXMubW92ZV90cnVzdChcbiAgICAgICAgdGhpcy5hcC5wYXJlbnQuc2xpbmssXG4gICAgICAgIHRoaXMudGV4dCxcbiAgICAgICAgZWRnZV9iZWcsXG4gICAgICAgIG1hdGNoX2xlblxuICAgICAgKTtcbiAgICB9XG4gICAgcHJldl9ub2RlLnNsaW5rID0gdGhpcy5hcC5wYXJlbnQ7XG4gIH1cblxuICBqc29uKHNob3dfc3VmZml4X2xpbmtzOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGNvbnN0IG5vZGVzOiBhbnkgPSBbXTtcbiAgICBjb25zdCBlZGdlczogYW55ID0gW107XG4gICAgY29uc3QgbmlkID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3QgbWF4X3JvdW5kbmVzcyA9IDAuNTtcbiAgICBjb25zdCBtaW5fcm91bmRuZXNzID0gLTAuNTtcbiAgICBjb25zdCByb3VuZG5lc3MgPSAoZWRnZTogRWRnZSkgPT4ge1xuICAgICAgY29uc3QgZWJpcnRoID0gQXJyYXkuZnJvbShlZGdlLnBhcmVudC5vdXRfZWRnZXMudmFsdWVzKCkpLm1hcCgoZSkgPT4gW1xuICAgICAgICBlLmJpcnRoX3RpbWUsXG4gICAgICAgIGUsXG4gICAgICBdKTtcbiAgICAgIGViaXJ0aC5zb3J0KCk7XG4gICAgICBsZXQgYmlydGhfaWR4ID0gLTE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGViaXJ0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZWJpcnRoW2ldWzFdID09PSBlZGdlKSB7XG4gICAgICAgICAgYmlydGhfaWR4ID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGVkZ2UucGFyZW50Lm91dF9lZGdlcy5zaXplID09PSAxKSByZXR1cm4gMC4wO1xuICAgICAgZWxzZVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIG1pbl9yb3VuZG5lc3MgK1xuICAgICAgICAgICgobWF4X3JvdW5kbmVzcyAtIG1pbl9yb3VuZG5lc3MpICogYmlydGhfaWR4KSAvXG4gICAgICAgICAgICAoZWRnZS5wYXJlbnQub3V0X2VkZ2VzLnNpemUgLSAxKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGNvbnN0IG4gPSB7XG4gICAgICAgIGxhYmVsOiBcIlwiICsgbm9kZS5iaXJ0aF90aW1lLFxuICAgICAgICBpZDogbm9kZS5iaXJ0aF90aW1lLFxuICAgICAgICBsZXZlbDogLTEsXG4gICAgICB9O1xuICAgICAgbmlkLnNldChub2RlLCBub2RlLmJpcnRoX3RpbWUpO1xuICAgICAgbm9kZXMucHVzaChuKTtcbiAgICB9KTtcbiAgICBpZiAoc2hvd19zdWZmaXhfbGlua3MpIHtcbiAgICAgIHRoaXMubm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBpZiAobm9kZS5zbGluayAhPSBub2RlICYmIG5vZGUgIT09IHRoaXMucm9vdCkge1xuICAgICAgICAgIC8vIGlmIChub2RlLnNsaW5rICYmIG5vZGUgIT09IHRoaXMucm9vdCkge1xuICAgICAgICAgIGNvbnN0IGUgPSB7XG4gICAgICAgICAgICBmcm9tOiBuaWQuZ2V0KG5vZGUpLFxuICAgICAgICAgICAgdG86IG5pZC5nZXQobm9kZS5zbGluayksXG4gICAgICAgICAgICBpZDogXCJlW1wiICsgbmlkLmdldChub2RlKSArIFwiXS1bXCIgKyBuaWQuZ2V0KG5vZGUuc2xpbmspICsgXCJdXCIsXG4gICAgICAgICAgICBkYXNoZXM6IHRydWUsXG4gICAgICAgICAgICAvLyBjb2xvcjogeyBjb2xvcjogbm9kZS5pc19leHBsaWNpdCA/ICcjODQ4NDg0JyA6ICcjZmYwMDAwJyB9LFxuICAgICAgICAgICAgY29sb3I6IHsgY29sb3I6IFwiIzg0ODQ4NFwiIH0sXG4gICAgICAgICAgICAvLyAsIGxhYmVsOiBlZGdlLnN0clxuICAgICAgICAgICAgZm9udDogeyBhbGlnbjogXCJ0b3BcIiB9LFxuICAgICAgICAgICAgc21vb3RoOiB7IHR5cGU6IFwiY3VydmVkQ1dcIiwgcm91bmRuZXNzOiAwLjQgfSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGVkZ2VzLnB1c2goZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBzZXRfbGV2ZWxfcmVjID0gKG5vZGU6IENOb2RlLCBsZXZlbDogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBuID0gbm9kZXNbbmlkLmdldChub2RlKV07XG4gICAgICBpZiAobi5sZXZlbCA8IGxldmVsKSB7XG4gICAgICAgIG4ubGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgbm9kZS5vdXRfZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgICAgIHNldF9sZXZlbF9yZWMoZWRnZS5jaGlsZCwgbi5sZXZlbCArIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHNldF9sZXZlbF9yZWModGhpcy5yb290LCAwKTtcblxuICAgIHRoaXMuZWRnZXMuZm9yRWFjaCgoZWRnZSkgPT4ge1xuICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgZnJvbTogbmlkLmdldChlZGdlLnBhcmVudCksXG4gICAgICAgIHRvOiBuaWQuZ2V0KGVkZ2UuY2hpbGQpLFxuICAgICAgICBpZDpcbiAgICAgICAgICBcIltcIiArXG4gICAgICAgICAgbmlkLmdldChlZGdlLnBhcmVudCkgK1xuICAgICAgICAgIFwiKFwiICtcbiAgICAgICAgICBlZGdlLmxlbiArXG4gICAgICAgICAgXCIpXS1bXCIgK1xuICAgICAgICAgIG5pZC5nZXQoZWRnZS5jaGlsZCkgK1xuICAgICAgICAgIFwiXVwiLFxuICAgICAgICBsYWJlbDogZWRnZS5zdHIsXG4gICAgICAgIGZvbnQ6IHsgYWxpZ246IFwidG9wXCIgfSxcbiAgICAgICAgc21vb3RoOiB7IHR5cGU6IFwiY3VydmVkQ1dcIiwgcm91bmRuZXNzOiByb3VuZG5lc3MoZWRnZSkgfSxcbiAgICAgIH07XG4gICAgICBlZGdlcy5wdXNoKGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHsgbm9kZXMsIGVkZ2VzIH07XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGJ1aWxkX2NkYXdnID0gKHRleHQ6IHN0cmluZywgaW1wbGljaXRfY2Rhd2c6IGJvb2xlYW4gPSBmYWxzZSkgPT4ge1xuICBjb25zdCBjZGF3ZyA9IG5ldyBDREFXRygpO1xuICBmb3IgKGNvbnN0IGMgb2YgdGV4dCkge1xuICAgIGNkYXdnLmluc2VydChjKTtcbiAgfVxuICBpZiAoIWltcGxpY2l0X2NkYXdnKSB7XG4gICAgY2Rhd2cuZXhwbGljaXQoKTtcbiAgfVxuICByZXR1cm4gY2Rhd2c7XG59O1xuXG5jb25zdCBtYWluID0gKHRleHQ6IHN0cmluZykgPT4ge1xuICBjb25zb2xlLmxvZyhcInRleHRcIiwgdGV4dCk7XG4gIGNvbnN0IGNkYXdnID0gYnVpbGRfY2Rhd2codGV4dCk7XG4gIGNvbnNvbGUubG9nKGNkYXdnKTtcbiAgY29uc29sZS5sb2coY2Rhd2cuanNvbik7XG4gIHJldHVybiBjZGF3Zztcbn07XG5cbmNvbnNvbGUubG9nKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKTtcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICBtYWluKHByb2Nlc3MuYXJndi5sZW5ndGggPT09IDMgPyBwcm9jZXNzLmFyZ3ZbMl0gOiBcImFiY2FiY2FiYVwiKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX187XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2Rhd2cudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=