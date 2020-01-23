import { lcp } from './strlib'
import { getSA, getLCP } from './sa'
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

const main = () => {
  // @ts-ignore
  let app = new Vue({
    el: '#input_str',
    data: {
      str: 'abcde',
      //chars: ['a', 'b']
      chars: [],
      sa: [],
      lcpa: [],
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
        const sa = getSA(newv)
        // @ts-ignore
        this.sa = sa
        // @ts-ignore
        console.log('lcp', getLCP(newv, sa))
        // @ts-ignore
        this.lcpa = getLCP(newv, sa)
      },
    },
  })
  const str = 'mississippi$'
  app.$data.str = str
  console.log(app.chars)
  getSA(str)
}

main()
