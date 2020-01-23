import { lcp } from './strlib'
import { getSA, getLCP } from './sa'

/**
 * return character type array `ctype`
 * ctype[i] = 'normal' if lcp[rank[i]]===0
 * ctype[i] = 'reducible' if lcp[rank[i]] > 0 && BWT[rank[i]] === BWT[rank[i]-1]
 * ctype[i] = 'irreducible' otherwise
 * @param str
 * @param sa
 */
const getCharType = (str: string, sa: number[]): string[] => {
  const n = str.length
  const res = Array<string>(n)
  res[0] = 'normal'
  for (let i = 1; i < n; i++) {
    if (str[sa[i]] !== str[sa[i - 1]]) {
      res[sa[i]] = 'normal'
    } else {
      if (sa[i] === 0 || sa[i - 1] === 0) res[sa[i]] = 'irreducible'
      else if (str[sa[i] - 1] === str[sa[i - 1] - 1]) res[sa[i]] = 'irreducible'
      else res[sa[i]] = 'reducible'
    }
  }
  return res
}

const getReducible = (str: string, sa: number[]): boolean[] => {
  const n = str.length
  const res = Array<boolean>(n)
  res[sa[0]] = false
  for (let i = 1; i < n; i++) {
    if (sa[i] === 0 || sa[i - 1] === 0) res[sa[i]] = false
    else if (str[sa[i] - 1] === str[sa[i - 1] - 1]) res[sa[i]] = false
    else res[sa[i]] = true
  }
  return res
}

const main = () => {
  // @ts-ignore
  let app = new Vue({
    el: '#input_str',
    data: {
      str: 'abcde',
      sa: [],
      rank: [],
      lcpa: [],
      reducible: [],
      ctype: [],
    },
    methods: {
      setStr: function(str: string) {
        // @ts-ignore
        this.str = str
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
        const sa = getSA(newv)
        // @ts-ignore
        this.sa = sa
        const rank = new Array<number>(newv.length)
        for (let i = 0; i < sa.length; i++) rank[sa[i]] = i
        // @ts-ignore
        this.rank = rank
        // @ts-ignore
        console.log('lcp', getLCP(newv, sa))
        // @ts-ignore
        this.lcpa = getLCP(newv, sa)
        // @ts-ignore
        this.reducible = getReducible(newv, sa)
        // @ts-ignore
        this.ctype = getCharType(newv, sa)
        // @ts-ignore
        console.log('reducible', this.reducible)
        // @ts-ignore
        console.log('ctype', this.ctype)
      },
    },
  })
  const str = 'mississippi$'
  app.$data.str = str
  console.log(app.chars)
  getSA(str)
}

main()
