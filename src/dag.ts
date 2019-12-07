import * as assert from 'power-assert'

class DAG {
  rules: Map<string, Array<string>>
  root: string
  height: Map<string, number>
  is_finalize: boolean
  constructor() {
    this.rules = new Map()
    this.root = ''
    this.height = new Map()
    this.is_finalize = false
  }
  add(rule: Array<string>) {
    assert(!this.is_finalize)
    // this.rules[rule[0]] = rule.slice(1)
    this.rules.set(rule[0], rule.slice(1))
  }

  is_leaf(id: string): boolean {
    return this.rules.get(id) === undefined
  }

  calcheight() {
    const rec = (id: string): number => {
      if (!this.height.has(id)) {
        if (this.is_leaf(id)) {
          this.height.set(id, 1)
        } else {
          const rule = this.rules.get(id) as string[]
          this.height.set(id, 1 + Math.max(...rule.map(rec)))
        }
      }
      return this.height.get(id) as number
    }
    rec(this.root)
  }

  make_leaf_rules() {
    Array.from(this.rules.keys()).forEach(node_id => {
      if ((this.rules.get(node_id) as string[]).length == 1) {
        const child_id = (this.rules.get(node_id) as string[])[0]
        this.rules.set(child_id, [])
      }
    })
  }

  finalize() {
    console.log('finalize values', this.rules.values())
    this.root =
      '' + Math.max(...Array.from(this.rules.keys()).map(x => parseInt(x)))
    this.calcheight()
    this.make_leaf_rules()
    this.is_finalize = true
  }

  get json_tree() {
    if (!this.is_finalize) this.finalize()
    const nodes: any[] = []
    const edges: any[] = []
    interface NodeType {
      id: string
      level: number
      label: string
    }

    const rec = (node_id: string, child_idx: number, parent: NodeType) => {
      const id =
        parent.id.substr(0, parent.id.length - 1) +
        (node_id == this.root ? '' : '-') +
        node_id +
        '(c' +
        child_idx +
        ')' +
        ']'
      const node = {
        id: id,
        level: parent.level + 1,
        label: node_id,
      }
      nodes.push(node)

      const rule = this.rules.get(node_id) as string[]
      for (
        let child_idx = 0;
        // child_idx < this.rules.get(node_id).length;
        child_idx < rule.length;
        child_idx++
      ) {
        const child = rec(rule[child_idx], child_idx, node)
        const edge = {
          from: node.id,
          to: child.id,
          id: `${node.id}-${child.id}`,
          //, label: child.to_edge_label
          font: { align: 'top' },
        }
        edges.push(edge)
      }
      return node
    }
    const dummy_parent = {
      id: 'n[]',
      level: 0,
      label: 'dummy',
    }
    rec(this.root, 0, dummy_parent)

    return { nodes: nodes, edges: edges }
  }

  get json() {
    if (!this.is_finalize) this.finalize()
    const nodes: any[] = []
    const edges: any[] = []

    Array.from(this.rules.entries()).forEach(([parent, children]) => {
      // internal node
      const node = {
        id: parent,
        level: this.height.get(parent),
        label: parent,
      }
      nodes.push(node)

      // edge
      children.forEach(child => {
        const edge = {
          from: parent,
          to: child,
          id: `${parent}-${child}`,
          //, label: child.to_edge_label
          font: { align: 'top' },
        }
        edges.push(edge)
      })
    })

    return { nodes: nodes, edges: edges }
  }
}

export const parse_rules = (text: string): DAG => {
  // function parse_rules(text) {
  const lines = text.split(/\r\n|\r|\n/)
  const dag = new DAG()
  lines.forEach(line => {
    line = line.trim().replace(/[=,\s]+/g, ',')
    const tokens = line.split(/[,]/)
    if (tokens.length >= 2) {
      console.log(tokens)
      dag.add(tokens)
    }
    // assert(rules[tokens[0]] === undefined)
    // tokens.forEach((token) => {
    //   assert(token.match(/^\d+$/) !== null)
    // })
    // rules[tokens[0]] = tokens.slice(1)
  })
  dag.finalize()
  return dag
}

function main() {
  const text = '1, a\n2, b\n3, 1, 1\n'
  const dag = parse_rules(text)
  console.log(dag)
  console.log(dag.json_tree)
}

main()
