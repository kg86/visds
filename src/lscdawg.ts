// Linear-size CDAWG
import { LargeNumberLike } from "crypto";
import { build_lstrie, StrTree } from "./lstrie";

type ElementType<T> = T extends (infer U)[] ? U : never;

class CNode {
  birth_time: number;
  value: number; // value is only used for vertex label
  slink: CNode;
  is_explicit: boolean;
  out_edges: Map<string, Edge>;
  constructor(value: number, birth_time: number, is_explicit: boolean) {
    this.value = value;
    this.birth_time = birth_time;
    this.slink = this;
    this.is_explicit = is_explicit;
    this.out_edges = new Map();
  }
}

class EdgeIdentifier {
  text: string;
  child_birth: number;
  constructor(text: string, child_birth: number) {
    this.text = text;
    this.child_birth = child_birth;
  }
}

class Edge {
  birth_time: number;
  text: string;
  parent: CNode;
  child: CNode;
  constructor(birth_time: number, text: string, parent: CNode, child: CNode) {
    this.birth_time = birth_time;
    this.text = text;
    this.parent = parent;
    this.child = child;
  }
}

class LSCDAWG {
  lstrie: StrTree;
  root: CNode;
  nodes: Array<CNode>;
  edges: Array<Edge>;

  // build this from CDAWG
  constructor(lstrie: StrTree) {
    // obtain a lscdawg by merging isomorphics subtrees of the lstrie
    
    this.nodes = [];
    this.edges = [];
    this.lstrie = lstrie;

    const cdawg_node_map = new Map<string, CNode>();
    const lst_node_correspondence = new Array<CNode | undefined>(lstrie.nodes.length);

    const lst_nodes = lstrie.nodes;
    lst_nodes.sort((a, b) => a.height - b.height);
    let num_explicit_nodes = 0;

    for (const lst_node of lst_nodes) {
      const edge_identifiers = new Array<EdgeIdentifier>();
      for (const child of lst_node.children.values()) {
        const child_node = lst_node_correspondence[child.birth_time]!;
        edge_identifiers.push(new EdgeIdentifier(child.in_edge_label, child_node.birth_time));
      }
      edge_identifiers.sort((a, b) => a.text.localeCompare(b.text));
      const key = JSON.stringify([edge_identifiers, lst_node.is_explicit]);
      let cdawg_node = cdawg_node_map.get(key);
      if (cdawg_node === undefined) {
        cdawg_node = new CNode(num_explicit_nodes, this.nodes.length, lst_node.is_explicit);
        if(lst_node.is_explicit) num_explicit_nodes++;
        cdawg_node_map.set(key, cdawg_node);
        this.nodes.push(cdawg_node);
      }
      cdawg_node.is_explicit ||= lst_node.is_explicit;
      lst_node_correspondence[lst_node.birth_time] = cdawg_node;

      for (const lst_child of lst_node.children.values()) {
        const cdawg_child = lst_node_correspondence[lst_child.birth_time]!;
        if (!cdawg_node.out_edges.has(lst_child.in_edge_label)) {
          const edge = new Edge(lst_child.birth_time, lst_child.in_edge_label, cdawg_node, cdawg_child);
          this.edges.push(edge);
          cdawg_node.out_edges.set(lst_child.in_edge_label, edge);
        }
      }
    }

    for(const node of this.nodes) {
      if (node.is_explicit) {
        node.value = num_explicit_nodes - node.value - 1;
      }
    }

    this.root = lst_node_correspondence[lstrie.root.birth_time]!;

    console.log(Array.from(lstrie.slinks.entries()));
    for (const [from_node, to_node] of Array.from(lstrie.slinks.entries()).concat(
      Array.from(lstrie.elinks.entries())
    )) {
      const from = lst_node_correspondence[from_node.birth_time];
      const to = lst_node_correspondence[to_node.birth_time];
      from!.slink = to!;
    }
  }
  get json() {
    const json_nodes: any = [];
    const json_edges: any = [];
    const cdawg_node_to_json_node = new Map<CNode, number>();

    // create nodes
    const get_json_node = (node: CNode): number => {
      if (!cdawg_node_to_json_node.has(node)) {
        const json_node_id = json_nodes.length;
        const ndic = {
          label: node.is_explicit ? node.value.toString() : "",
          id: json_node_id,
          level: -1,
          color: {
            border: node.is_explicit ? "#2B7CE9" : "#000000",
            background: node.is_explicit ? "#D2E5FF" : "#000000",
          },
        }
        json_nodes.push(ndic);
        cdawg_node_to_json_node.set(node, json_node_id);
      }
      return cdawg_node_to_json_node.get(node)!;
    }
    this.nodes?.forEach(get_json_node);

    // set edge level
    const set_level_rec = (node: CNode, level: number) => {
      const n = json_nodes[cdawg_node_to_json_node.get(node)!];
      if (n.level < level) {
        n.level = level;
        node.out_edges.forEach((edge) => {
          set_level_rec(edge.child, n.level + 1);
        });
      }
    };
    set_level_rec(this.root, 0);

    // set edge roundness
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

    // create edges
    for (const edge of this.edges) {
      const from = get_json_node(edge.parent);
      const to = get_json_node(edge.child);
      const edge_dic = {
        from: from,
        to: to,
        id: from + "->" + to + " (" + edge.text + ")",
        label: edge.text,
        font: { align: "top" },
        color: {
          color: "#2B7CE9",
        },
        smooth: { type: "curvedCW", roundness: roundness(edge) },
      };
      json_edges.push(edge_dic);
    }
    // create slinks
    for(const node of this.nodes) {
      const slink_node = node.slink;
      if(slink_node === node) continue;
      const slink_dic = {
        from: get_json_node(node),
        to: get_json_node(slink_node),
        id: get_json_node(node) + "~>" + get_json_node(slink_node),
        dashes: true,
        color: { color: node.is_explicit ? "#848484" : "#ff0000" },
        smooth: { type: "curvedCW", roundness: 0.4 },
      };
      json_edges.push(slink_dic);
    }
    console.log("json_nodes", json_nodes.length, "json_edges", json_edges.length);
    return { nodes: json_nodes, edges: json_edges };
    // return this.lstrie?.json;
  }
}

export const build_lscdawg = (
    text: string,
    show_suffix_links: boolean,
    show_extended_suffix_links: boolean
) => {
  const lstrie = build_lstrie(text, show_suffix_links, show_extended_suffix_links, false);
  const lscdawg = new LSCDAWG(lstrie);
  return lscdawg;
}

const main = (text: string) => {
  const lscdawg = build_lscdawg(text, false, false);
  console.log(lscdawg.json);
};

if (require.main === module) {
  main(process.argv.length === 3 ? process.argv[2] : "abaabac");
}
