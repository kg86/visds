const lcp = (x: string, y: string): number => {
  const n = Math.min(x.length, y.length)
  let i = 0
  for (; i < n; i++) {
    if (x[i] !== y[i]) break
  }
  return i
}

class Node {
  to_edge_label: string
  children: Map<string, Node>
  birth_time: number
  value: number

  constructor(birth_time: number, to_edge_label: string, value: number) {
    this.to_edge_label = to_edge_label
    this.children = new Map()
    this.birth_time = birth_time
    this.value = value
  }
  get is_leaf(): boolean {
    return Object.keys(this.children).length === 0
  }

  get depth(): number {
    if (this.children.size === 0) return 0
    else
      return Math.max(
        ...Array.from(this.children.values()).map(child => child.depth),
      )
  }
}

class StrTree {
  nodes: Array<Node>
  root: Node
  slinks: Map<Node, Node>
  constructor() {
    this.nodes = []
    this.root = this.create_node('root')
    this.slinks = new Map()
  }

  create_node(to_edge_label: string, value: number = -1): Node {
    const node = new Node(this.nodes.length, to_edge_label, value)
    this.nodes.push(node)
    return node
  }

  /**
   * split the edge at match_len, and return the branch node
   *
   * @param {Node} parent - parent node of the edge being splitted.
   * @param {Node} child - child node of the edge being splitted.
   * @param {number} match_len - the position of the edge being splitted from parent.
   */
  split(parent: Node, child: Node, match_len: number): Node {
    if (match_len === 0) return child
    console.assert(
      match_len < child.to_edge_label.length,
      match_len.toString(),
      child.to_edge_label.length,
    )
    const branch_node = this.create_node(
      child.to_edge_label.substr(0, match_len),
    )
    parent.children.set(branch_node.to_edge_label[0], branch_node)
    child.to_edge_label = child.to_edge_label.substr(match_len)
    branch_node.children.set(child.to_edge_label[0], child)
    return branch_node
  }

  find_branch(
    parent: Node,
    text: string,
    match_len_all: number = 0,
  ): [Node, Node | null, number, number] {
    if (text.length === 0 || parent.children.get(text[0]) === undefined) {
      return [parent, null, 0, match_len_all]
    }
    const child = parent.children.get(text[0]) as Node
    const match_len = lcp(child.to_edge_label, text)
    if (match_len < child.to_edge_label.length) {
      return [parent, child, match_len, match_len_all + match_len]
    } else {
      return this.find_branch(
        child,
        text.substr(match_len),
        match_len_all + match_len,
      )
    }
  }

  insert(text: string, value: number) {
    const [parent, child, match_len, match_len_all] = this.find_branch(
      this.root,
      text,
    )
    // console.log('insert', text, parent, child, match_len, match_len_all)
    if (match_len_all < text.length) {
      const branch_node =
        child === null ? parent : this.split(parent, child, match_len)
      const leaf = this.create_node(text.substr(match_len_all), value)
      branch_node.children.set(leaf.to_edge_label[0], leaf)
    }
  }

  print_tree(node: Node = this.root, pre: string = '') {
    console.log(pre + ' ' + node.to_edge_label + ': ' + node.birth_time)
    node.children.forEach(child => this.print_tree(child, pre + '--'))
  }

  build_suffix_links(
    node?: Node,
    node_label?: string,
    reverse: boolean = false,
  ) {
    if (node === undefined || node_label === undefined) {
      node = this.root
      node_label = ''
      this.slinks = new Map()
    }
    if (node !== this.root) {
      const [parent, child] = this.find_branch(this.root, node_label.substr(1))
      if (child === null) {
        if (reverse) this.slinks.set(parent, node)
        else this.slinks.set(node, parent)
      }
    }

    node.children.forEach(child =>
      this.build_suffix_links(child, node_label + child.to_edge_label, reverse),
    )
  }

  json() {
    const nodes: any[] = []
    interface EdgeT {
      from: number
      to: number
      id: string
      label: string
      font: any
    }
    let edges: any[] = []
    const nid = new Map()
    const create_json_node = (node: Node, level: number) => {
      if (!nid.has(node)) {
        nid.set(node, nodes.length)
        const ndic = {
          label: node.value === -1 ? '' : '' + node.value,
          id: nid.get(node),
          level,
          shape: node.is_leaf ? 'box' : undefined,
        }
        nodes.push(ndic)
      }
    }
    const rec = (parent: Node, level: number) => {
      create_json_node(parent, level)
      parent.children.forEach(child => {
        create_json_node(child, level + 1)
        const edge = {
          from: nid.get(parent),
          to: nid.get(child),
          id: nid.get(parent) + '-' + nid.get(child),
          label: child.to_edge_label,
          font: { align: 'top' },
        }
        edges.push(edge)
        rec(child, level + 1)
      })
    }
    rec(this.root, 0)

    // compute suffix links
    const slinks = []
    for (const [from_node, to_node] of this.slinks.entries()) {
      const slink = {
        from: nid.get(from_node),
        to: nid.get(to_node),
        id: 's' + nid.get(from_node) + '-' + nid.get(to_node),
        dashes: true,
        color: { color: '#ff0000' },
        smooth: { type: 'curvedCW', roundness: 0.4 },
      }
      slinks.push(slink)
    }
    edges = edges.concat(slinks)
    return { root: nid.get(this.root), nodes, edges }
  }
}

export function suffix_tree(text: string) {
  const st = new StrTree()
  for (let i = 0; i < text.length; i++) {
    st.insert(text.substr(i), i)
  }
  st.build_suffix_links()
  return st
}

const main = (text: string) => {
  const st = new StrTree()
  for (let i = 0; i < text.length; i++) {
    console.log(i, 'insert', text.substr(i))
    st.insert(text.substr(i), i)
    st.print_tree()
  }
  console.log(st.json())
}

if (require.main === module) {
  if (process.argv.length === 3) {
    main(process.argv[2])
  } else {
    const usage =
      process.argv[1] +
      ' input_str\n' +
      '\tbuild suffix tree of input_str and show the structure in json format.'
    console.log(usage)
  }
}
