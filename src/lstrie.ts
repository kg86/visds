// Linear Size Suffix Trie

const lcp = (x: string, y: string): number => {
  const n = Math.min(x.length, y.length);
  let i = 0;
  for (; i < n; i++) {
    if (x[i] !== y[i]) break;
  }
  return i;
};

class Node {
  birth_time: number;
  in_edge_label: string;
  children: Map<string, Node>;
  value: number;
  is_explicit: boolean;

  constructor(
    birth_time: number,
    in_edge_label: string,
    value: number,
    explicit: boolean
  ) {
    this.birth_time = birth_time;
    this.in_edge_label = in_edge_label;
    this.children = new Map<string, Node>();
    this.value = value;
    this.is_explicit = explicit;
  }

  get is_leaf(): boolean {
    return this.children.size === 0;
  }

  get height(): number {
    let max = -1;
    for (let child of this.children.values()) {
      max = Math.max(max, child.height);
    }
    return 1 + max;
  }
}

class StrTree {
  root: Node;
  nodes: Array<Node>;
  slinks: Map<Node, Node>;
  elinks: Map<Node, Node>;

  constructor() {
    this.nodes = [];
    this.root = this.create_node("", -1, true);
    this.slinks = new Map();
    this.elinks = new Map();
  }

  create_node(
    in_edge_label: string,
    value: number,
    is_explicit: boolean
  ): Node {
    const node = new Node(this.nodes.length, in_edge_label, value, is_explicit);
    this.nodes.push(node);
    return node;
  }

  find_branch(
    parent: Node,
    text: string,
    match_len_all: number = 0
  ): [Node, Node, number, number] {
    if (text.length === 0 || !parent.children.has(text[0])) {
      return [parent, parent, 0, match_len_all];
    }
    const child = parent.children.get(text[0]) as Node;
    const match_len = lcp(child.in_edge_label, text);
    if (match_len < child.in_edge_label.length) {
      return [parent, child, match_len, match_len_all + match_len];
    } else {
      return this.find_branch(
        child,
        text.substr(match_len),
        match_len_all + match_len
      );
    }
  }

  split(
    parent: Node,
    child: Node,
    match_len: number,
    is_explicit: boolean
  ): Node {
    if (match_len === 0) return child;

    const branch_node = this.create_node(
      child.in_edge_label.substr(0, match_len),
      -1,
      is_explicit
    );
    parent.children.set(branch_node.in_edge_label[0], branch_node);
    child.in_edge_label = child.in_edge_label.substr(match_len);
    branch_node.children.set(child.in_edge_label[0], child);
    return branch_node;
  }

  insert(text: string, i: number, create_implicit_node: boolean) {
    const [parent, child, match_len_edge, match_len_all] = this.find_branch(
      this.root,
      text
    );

    console.log(
      "insert [",
      text,
      "] match_len=",
      match_len_edge,
      " match_len_all=",
      match_len_all
    );
    // check whether or not the point is implicit node.
    if (match_len_all === text.length && !create_implicit_node) return;
    console.log("create_implicit_node", create_implicit_node);
    if (match_len_edge < text.length) {
      const branch_node =
        child === parent
          ? parent
          : this.split(parent, child, match_len_edge, true);
      const leaf = this.create_node(text.substr(match_len_all), i, true);
      branch_node.children.set(leaf.in_edge_label[0], leaf);
    }
  }

  build_suffix_links() {
    const rec = (node: Node, node_label: string, reverse: boolean) => {
      if (node !== this.root) {
        const [parent, child] = this.find_branch(
          this.root,
          node_label.substr(1)
        );
        if (child === parent) {
          if (reverse) this.slinks.set(parent, node);
          else this.slinks.set(node, parent);
        }
      }

      for (const child of node.children.values()) {
        rec(child, node_label + child.in_edge_label, reverse);
      }
    };
    rec(this.root, "", false);
  }

  // chrochemore et al.'s link
  build_extend_suffix_links() {
    // traverse all implicit nodes
    // if there is a suffix link to a explicit node
    // create an implicit node and its suffix link
    const rec = (parent: Node, child: Node, label: string) => {
      for (let i = 1; i < child.in_edge_label.length; i++) {
        const edge_label = label + child.in_edge_label.substr(0, i);
        const edge_label_suf = edge_label.substr(1);
        const [to_parent, to_child, match_len_edge, match_len_all] =
          this.find_branch(this.root, edge_label_suf);
        if (to_child === to_parent && to_parent.is_explicit) {
          // create a node and its suffix link
          const branch_node = this.split(parent, child, i, false);
          this.elinks.set(branch_node, to_parent);
          rec(branch_node, child, edge_label);
          return;
        }
      }
      for (let child_child of child.children.values()) {
        rec(child, child_child, label + child.in_edge_label);
      }
    };
    rec(this.root, this.root, "");
  }

  get json() {
    const nodes: any = [];
    const edges: any = [];
    const nid = new Map();
    const height = this.root.height;
    // if true, use a node depth as level of visnetwork
    // otherwise, use a height, maximum distance to its leafs
    const use_depth = false;

    const create_json_node = (node: Node, depth: number) => {
      if (!nid.has(node)) {
        nid.set(node, nodes.length);
        const ndic = {
          label: node.value === undefined ? "" : "" + node.value,
          id: nid.get(node),
          level: use_depth ? depth : height - node.height,
          shape: node.is_leaf ? "box" : "circle",
          color: {
            border: node.is_explicit ? "#2B7CE9" : "#000000",
            background: node.is_explicit ? "#D2E5FF" : "#000000",
          },
        };
        nodes.push(ndic);
      }
    };
    const rec = (parent: Node, depth: number) => {
      create_json_node(parent, depth);
      const children = Array.from(parent.children.entries());
      children.sort();
      console.log("children", children);
      children.forEach(([key, child]) => {
        create_json_node(child, depth + 1);
        const edge = {
          from: nid.get(parent),
          to: nid.get(child),
          id: nid.get(parent) + "-" + nid.get(child),
          label: child.in_edge_label,
          font: { align: "top" },
          color: {
            color: "#2B7CE9",
          },
        };
        edges.push(edge);
        rec(child, depth + 1);
      });
    };
    rec(this.root, 0);

    // suffix link
    const slinks = [];
    console.log(Array.from(this.slinks.entries()));
    for (const [from_node, to_node] of Array.from(this.slinks.entries()).concat(
      Array.from(this.elinks.entries())
    )) {
      const slink = {
        from: nid.get(from_node),
        to: nid.get(to_node),
        id: "s" + nid.get(from_node) + "-" + nid.get(to_node),
        dashes: true,
        color: { color: from_node.is_explicit ? "#848484" : "#ff0000" },
        smooth: { type: "curvedCW", roundness: 0.4 },
      };
      slinks.push(slink);
    }
    const edges_all = edges.concat(slinks);
    return {
      root: nid.get(this.root),
      nodes,
      edges: edges_all,
    };
  }
}

export const build_lstrie = (
  text: string,
  show_suffix_links: boolean,
  show_extended_suffix_links: boolean,
  create_implicit_node: boolean
) => {
  const lstrie = new StrTree();

  for (let i = 0; i < text.length; i++) {
    lstrie.insert(text.substring(i), i, create_implicit_node);
  }
  if (show_suffix_links) lstrie.build_suffix_links();
  if (show_extended_suffix_links) lstrie.build_extend_suffix_links();
  console.log("eslinks");
  for (const [from, to] of lstrie.elinks.entries()) {
    console.log("eslink[" + from.birth_time + ", " + to.birth_time + "]");
  }
  return lstrie;
};

const main = (text: string) => {
  const lstrie = build_lstrie(text, false, false, false);
  console.log(lstrie.json);
};

if (require.main === module) {
  main(process.argv.length === 3 ? process.argv[2] : "abaabac");
}
