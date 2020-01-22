class Char {
  char: string
  isL: boolean
  idx: number
  isLML: boolean
  isLMS: boolean

  constructor(
    char: string,
    isL: boolean,
    idx: number,
    lml: boolean = false,
    lms: boolean = false,
  ) {
    this.char = char
    this.isL = isL
    this.idx = idx
    this.isLML = lml
    this.isLMS = lms
  }
}

//let test=range(0, 10)
//console.log(test)

// return the Char array
function getChars(str: string) {
  let chars: Char[] = []
  let prev_L = false
  chars.push(new Char(str[str.length - 1], prev_L, str.length - 1))
  for (let i = str.length - 2; i >= 0; i--) {
    const c = str[i]
    const isL: boolean = c > str[i + 1] || (c == str[i + 1] && prev_L)
    let lml = false
    let lms = false
    if (isL && (i == 0 || str[i - 1] < str[i])) lml = true
    if (!isL && (i == 0 || str[i - 1] > str[i])) lms = true
    chars.push(new Char(c, isL, i, lml, lms))
    prev_L = isL
  }
  chars.reverse()
  console.log('getChars', str, chars)
  return chars
}
function showSA(str: string, sa: number[]) {
  for (let i = 0; i < str.length; i++) {
    console.log(i, sa[i], str.substr(sa[i]), str.charCodeAt(sa[i]))
  }
}
function getSA(str: string) {
  const n = str.length
  const sa = new Array(n)
  const rank = new Array(n)
  const new_rank = new Array(n)
  for (let i = 0; i < str.length; i++) {
    sa[i] = i
    rank[i] = str.charCodeAt(i)
  }
  //showSA(str, sa)

  for (let k = 1; k < n; k *= 2) {
    function compare_sa(i: number, j: number) {
      if (rank[i] != rank[j]) return rank[i] - rank[j]
      let ri = -1
      let rj = -1
      if (i + k < n) ri = rank[i + k]
      if (j + k < n) rj = rank[j + k]
      // return rj - ri
      return ri - rj
    }
    sa.sort(compare_sa)
    new_rank[sa[0]] = 0
    for (let i = 1; i < n; i++) {
      const match = compare_sa(sa[i - 1], sa[i]) ? 1 : 0
      new_rank[sa[i]] = new_rank[sa[i - 1]] + match
    }
    for (let i = 0; i < n; i++) rank[i] = new_rank[i]
  }
  return sa
  //console.log('finish')
  //showSA(str, sa)
}

function setstr() {
  console.log('setstr')
  const input_text = document.getElementById('in_str') as HTMLInputElement
  console.log(input_text.value)
}

const main = () => {
  // @ts-ignore
  let app = new Vue({
    el: '#input_str',
    data: {
      str: 'abcde',
      //chars: ['a', 'b']
      chars: [],
      sa: [],
    },
    methods: {
      setStr: function(str: string) {
        // @ts-ignore
        this.str = str
        // @ts-ignore
        this.chars = getChars(this.str)
      },
      range: function range(from: number, to: number) {
        const res = new Array()
        for (let i = from; i < to; i++) res.push(i)
        return res
      },
    },
    watch: {
      str: function(newv: string, oldv: string) {
        console.log('watch str')
        // @ts-ignore
        this.chars = getChars(newv)
        // @ts-ignore
        this.sa = getSA(newv)
      },
    },
  })
  console.log(app)
  console.log(app.chars)
  let str = 'しまうまのしまうまよ$'
  str = 'All About ホームページ作成'
  str = 'mississippi$'
  app.$data.str = str
  //app.setStr(str)
  console.log(app.chars)
  getSA(str)

  //message.$data.chars = [{char:'a'}, {char:'b'}]
  console.log('hoge')
}
main()
