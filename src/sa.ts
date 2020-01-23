import { lcp } from './strlib'

export const getSA = (str: string): Array<number> => {
  const n = str.length
  const sa = new Array<number>(n)
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
}

function showSA(str: string, sa: number[]) {
  for (let i = 0; i < str.length; i++) {
    console.log(i, sa[i], str.substr(sa[i]), str.charCodeAt(sa[i]))
  }
}

export const getLCP = (str: string, sa: number[]): Array<number> => {
  const lcpa = new Array<number>(str.length)
  lcpa[0] = 0
  for (let i = 1; i < str.length; i++) {
    lcpa[i] = lcp(str.substr(sa[i - 1]), str.substr(sa[i]))
  }
  return lcpa
}
