class CNode {
  birth_time: number;
  depth: number;
  slink: CNode;
  out_edges: Map<string, Edge>;
  in_edges: Array<Edge>;
  constructor(birth_time: number, depth: number) {
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
  birth_time: number;
  text: () => string;
  parent: CNode;
  edge_beg: number;
  edge_len: number;
  child: CNode;

  constructor(
    birth_time: number,
    text: () => string,
    parent: CNode,
    edge_beg: number,
    edge_len: number,
    child: CNode
  ) {
    this.birth_time = birth_time;
    this.text = text;
    this.parent = parent;
    this.edge_beg = edge_beg;
    this.edge_len = edge_len;
    this.child = child;
  }

  charAt(i: number): string {
    return this.text()[this.edge_beg + i];
  }

  get str(): string {
    if (this.edge_len > 0) {
      return this.text().substr(this.edge_beg, this.edge_len);
    } else {
      return this.text().substr(this.edge_beg);
    }
  }

  get len(): number {
    return this.edge_len === -1
      ? this.text().length - this.edge_beg
      : this.edge_len;
  }

  set len(val) {
    this.edge_len = val;
  }

  get is_open(): boolean {
    return this.edge_len === -1;
  }
}

const dummy_node = new CNode(-1, -1);
const dummy_edge = new Edge(-1, () => "", dummy_node, -1, -1, dummy_node);

// TopNode is an implicit node.
// The root node's suffix link points to the top node.
// There is a special edge from the top node to the root node, which we can move any characters.
class TopNode extends CNode {
  root: CNode;
  edge: Edge;
  constructor(root: CNode) {
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
  static create_at_node_state(parent: CNode): State {
    return new State(parent, undefined, undefined);
  }

  parent: CNode;
  edge: Edge;
  match_len: number;
  constructor(parent: CNode, edge: Edge = dummy_edge, match_len: number = 0) {
    if (parent instanceof TopNode) {
      // This is TopNode
      this.edge = parent.edge;
    } else {
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
  move(char: string): State | undefined {
    if (this.parent instanceof TopNode) return new State(this.edge.child);
    const can_move = this.atNode
      ? this.parent.out_edges.has(char)
      : this.edge.charAt(this.match_len) === char;
    // console.log('can_move', can_move)
    if (!can_move) {
      return undefined;
    } else {
      const edge = this.atNode
        ? (this.parent.out_edges.get(char) as Edge)
        : this.edge;
      const match_len = this.atNode ? 0 : this.match_len;
      if (match_len + 1 <= edge.len) {
        return new State(this.parent, edge, match_len + 1);
      } else {
        return State.create_at_node_state(edge.child);
      }
    }
  }
}

class CDAWG {
  text: string;
  nodes: Array<CNode>;
  edges: Array<Edge>;
  root: CNode;
  top_node: TopNode;
  sink: CNode;
  ap: State;
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

  create_node(depth: number): CNode {
    const node = new CNode(this.nodes.length, depth);
    this.nodes.push(node);
    return node;
  }

  create_closed_edge(
    parent: CNode,
    edge_beg: number,
    edge_len: number,
    child: CNode
  ) {
    const edge = new Edge(
      this.edges.length,
      () => this.text,
      parent,
      edge_beg,
      edge_len,
      child
    );
    this.edges.push(edge);
    parent.out_edges.set(this.text[edge_beg], edge);
    return edge;
  }

  create_open_edge(parent: CNode, edge_beg: number) {
    const edge = new Edge(
      this.edges.length,
      () => this.text,
      parent,
      edge_beg,
      -1,
      this.sink
    );
    this.edges.push(edge);
    parent.out_edges.set(this.text[edge_beg], edge);
    return edge;
  }

  // return a state that moved from node with text[beg:beg+len].
  // It is guranteed that we can move node with text[beg:beg+len].
  move_trust(node: CNode, text: string, beg: number, len: number): State {
    const _move_trust = (
      node: CNode,
      text: string,
      beg: number,
      len: number
    ) => {
      const edge = node.out_edges.get(text[beg]) as Edge;
      if (len < edge.len) {
        return new State(node, edge, len);
      } else if (len === edge.len) {
        return State.create_at_node_state(edge.child);
      } else {
        return this.move_trust(
          edge.child,
          text,
          beg + edge.len,
          len - edge.len
        );
      }
    };
    if (len === 0) return new State(node);
    else if (node instanceof TopNode) {
      if (len === 1) return new State(node.root);
      else return _move_trust(node.root, text, beg + 1, len - 1);
    } else return _move_trust(node, text, beg, len);
  }

  // create new node that has out_edges of the give node.
  copy_node(node: CNode, num_in_edge_left: number) {
    const new_node = this.create_node(node.depth - num_in_edge_left);
    const out_edges = Array.from(node.out_edges.entries());
    out_edges.sort(); // for test
    for (const [k, edge] of out_edges) {
      this.create_closed_edge(
        new_node,
        edge.edge_beg,
        edge.edge_len,
        edge.child
      );
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

  split(state: State) {
    const branch_node = this.create_node(state.match_len);
    const in_edge = this.create_closed_edge(
      state.parent,
      state.edge.edge_beg,
      state.match_len,
      branch_node
    );

    state.edge.parent = branch_node;
    if (!state.edge.is_open) state.edge.edge_len -= state.match_len;
    state.edge.edge_beg += state.match_len;
    branch_node.out_edges.set(state.edge.charAt(0), state.edge);

    branch_node.in_edges.push(in_edge);

    return branch_node;
  }

  insert(char: string) {
    console.log();
    this.text += char;
    console.log("insert char[", char, "], text=", this.text);
    if (this.text.length === 1) {
      this.create_open_edge(this.root, 0);
      this.ap = new State(this.root);
      this.sink.slink = this.root;
      return;
    }
    let next_state: State | undefined;
    let prev_branch: CNode | undefined = undefined;
    let prev_destination: CNode | undefined = undefined;
    while ((next_state = this.ap.move(char)) === undefined) {
      console.log("ap", this.ap, this.ap.atNode);
      if (this.ap.atNode) {
        // if there is a previouslly processed node, create suffix link from it to the active point
        if (prev_branch) prev_branch.slink = this.ap.parent;
        prev_branch = this.ap.parent;
        prev_destination = this.sink;

        this.create_open_edge(this.ap.parent, this.text.length - 1);

        this.ap = new State(this.ap.parent.slink);
        console.log("first ap", this.ap);
      } else if (prev_branch && this.ap.edge.child === prev_destination) {
        // if there is a previously processed node (prev_branch) and its destination is equal to the destination of the active point, merge the active point to the prev_branch
        this.ap.edge.child = prev_branch;
        this.ap.edge.len = this.ap.match_len;
        prev_branch.in_edges.push(this.ap.edge);

        this.ap = this.move_trust(
          this.ap.parent.slink,
          this.text,
          this.ap.edge.edge_beg,
          this.ap.match_len
        );
      } else {
        // split and create a new open edge
        const edge_beg = this.ap.edge.edge_beg;
        const edge_len = this.ap.match_len;

        const branch_node = this.split(this.ap);
        if (prev_branch) prev_branch.slink = branch_node;
        prev_branch = branch_node;
        prev_destination = this.ap.edge.child;

        this.create_open_edge(branch_node, this.text.length - 1);
        this.ap = this.move_trust(
          this.ap.parent.slink,
          this.text,
          edge_beg,
          edge_len
        );
      }
    }
    if (prev_branch && this.ap.atNode) prev_branch.slink = this.ap.parent;
    if (
      next_state.atNode &&
      next_state.parent.depth >
        this.ap.parent.depth + (this.ap.atNode ? 1 : this.ap.edge.len)
    ) {
      // we reached next_state with non-primary edge
      const branch_node = this.copy_node(
        next_state.parent,
        next_state.parent.depth -
          (this.ap.parent.depth + (this.ap.atNode ? 1 : this.ap.edge.len))
      );
      next_state = new State(branch_node);
    }
    this.ap = next_state;
    if (this.ap.atNode) {
      this.sink.slink = this.ap.parent;
    } else {
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
      this.ap = this.move_trust(
        this.ap.parent.slink,
        this.text,
        edge_beg,
        match_len
      );
    }
    prev_node.slink = this.ap.parent;
  }

  json(show_suffix_links: boolean = true) {
    const nodes: any = [];
    const edges: any = [];
    const nid = new Map();

    const max_roundness = 0.5;
    const min_roundness = -0.5;
    const roundness = (edge: Edge) => {
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
      if (edge.parent.out_edges.size === 1) return 0.0;
      else
        return (
          min_roundness +
          ((max_roundness - min_roundness) * birth_idx) /
            (edge.parent.out_edges.size - 1)
        );
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
    const set_level_rec = (node: CNode, level: number) => {
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
        id:
          "[" +
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

export const build_cdawg = (text: string, implicit_cdawg: boolean = false) => {
  const cdawg = new CDAWG();
  for (const c of text) {
    cdawg.insert(c);
  }
  if (!implicit_cdawg) {
    cdawg.explicit();
  }
  return cdawg;
};

const main = (text: string) => {
  console.log("text", text);
  const cdawg = build_cdawg(text);
  console.log(cdawg);
  console.log(cdawg.json);
  return cdawg;
};

console.log(require.main === module);
if (require.main === module) {
  main(process.argv.length === 3 ? process.argv[2] : "abcabcaba");
}
