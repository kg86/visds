class Node {
  birth_time: number;
  depth: number;
  children: Map<string, Node>;
  slink: Node;
  constructor(
    birth_time: number,
    depth: number,
    children: Map<string, Node> | undefined = undefined,
    slink: Node | undefined = undefined
  ) {
    this.birth_time = birth_time;
    this.depth = depth;
    this.children = new Map();
    if (children !== undefined) {
      for (const [k, v] of children.entries()) {
        this.children.set(k, v);
      }
    }
    this.slink = slink ? slink : this;
  }
}

// SuperNode is a virtual node such that
// it is a node pointing root's suffix link
// it can be moved to root by any characters.
class SuperNode extends Node {
  depth: number;
  children: any;
  constructor(root: Node) {
    super(-1, -1);
    this.depth = -1;
    this.children = { get: undefined };
    root.slink = this;
    this.children.get = (char: string) => {
      return root;
    };
    this.children.has = (char: string) => {
      return true;
    };
  }
}

export class DAWG {
  nodes: Array<Node>;
  root: Node;
  tail: Node;
  supernode: SuperNode;
  constructor() {
    this.nodes = [];
    this.root = this.create_node(0);
    this.tail = this.root;
    this.supernode = new SuperNode(this.root);
  }

  create_node(depth: number): Node {
    const node = new Node(this.nodes.length, depth);
    this.nodes.push(node);
    return node;
  }

  copy_node(node: Node) {
    const new_node = new Node(
      this.nodes.length,
      node.depth,
      node.children,
      node.slink
    );
    this.nodes.push(new_node);
    return new_node;
  }

  insert(char: string) {
    let cur = this.tail;
    this.tail = this.create_node(this.tail.depth + 1);
    while (!cur.children.has(char)) {
      // console.log('cur', cur)
      cur.children.set(char, this.tail);
      cur = cur.slink as Node;
    }
    const child = cur.children.get(char) as Node;
    if (cur.depth + 1 === child.depth) {
      this.tail.slink = child;
    } else {
      const new_node = this.copy_node(child);
      new_node.depth = cur.depth + 1;
      cur.children.set(char, new_node);
      this.tail.slink = new_node;
      child.slink = new_node;

      cur = cur.slink;
      while (cur.depth + 1 < (cur.children.get(char) as Node).depth) {
        cur.children.set(char, new_node);
        cur = cur.slink;
      }
    }
  }

  json(show_suffix_links: boolean = true) {
    const nodes: any[] = [];
    let edges: any[] = [];
    const nid = new Map();
    let max_diff_depth = 0;
    const min_roundness = 0.2;
    const max_roundness = 0.5;
    this.nodes.forEach((node) => {
      max_diff_depth = Math.max(max_diff_depth, node.depth);
    });
    const roundness = (diff_depth: number) => {
      return (
        min_roundness +
        ((max_roundness - min_roundness) * diff_depth) / max_diff_depth
      );
    };

    const create_json_node = (node: Node) => {
      // console.log('json_node', node, nid[node], nid)
      if (!nid.has(node)) {
        nid.set(node, node.birth_time);
        const ndic = {
          label: "" + nid.get(node),
          id: nid.get(node),
          level: node.depth,
        };
        nodes.push(ndic);
      }
    };
    this.nodes.forEach((from_node) => {
      create_json_node(from_node);
      from_node.children.forEach((to_node, label) => {
        create_json_node(to_node);
        const diff_depth = Math.abs(to_node.depth - from_node.depth);
        const edge = {
          from: nid.get(from_node),
          to: nid.get(to_node),
          id: nid.get(from_node) + "-" + nid.get(to_node),
          label: label,
          font: { align: "top" },
          smooth: { type: "curvedCW", roundness: roundness(diff_depth) },
        };
        edges.push(edge);
      });
    });

    // suffix link
    if (show_suffix_links) {
      const slinks = [];
      for (const from_node of this.nodes) {
        if (from_node === this.root) continue;
        const to_node = from_node.slink;
        console.log("from_node", from_node);
        const diff_depth = Math.abs(to_node.depth - from_node.depth);
        const slink = {
          from: nid.get(from_node),
          to: nid.get(to_node),
          id: "s" + nid.get(from_node) + "-" + nid.get(to_node),
          dashes: true,
          // color: { color: '#848484' },
          color: { color: "#ff0000" },
          smooth: { type: "curvedCW", roundness: roundness(diff_depth) },
        };
        slinks.push(slink);
      }
      edges = edges.concat(slinks);
    }
    return { root: nid.get(this.root), nodes: nodes, edges: edges };
  }
  buld_suffix_links() {}
}

function main(text: string) {
  const dawg = new DAWG();
  for (let i = 0; i < text.length; i++) {
    dawg.insert(text[i]);
  }
  console.log(dawg);
  console.log(dawg.json);
}

if (require.main === module) {
  if (process.argv.length === 3) {
    main(process.argv[2]);
  } else {
    const usage =
      process.argv[1] +
      " input_str\n" +
      "\tbuild suffix tree of input_str and show the structure in json format.";
    console.log(usage);
  }
}
