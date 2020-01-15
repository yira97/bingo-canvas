export function make_seq_array(from: number, to: number): number[] {
  let res = []
  if (from === to) return [from]
  let up = to - from > 0
  let pace = up ? 1 : -1
  for (let i = from; i !== to; i += pace) {
    res.push(i)
  }
  res.push(to)
  return res
}

export const array_swap = <T>(arr: Array<T>, i: number, j: number) => {
  const t = arr[i]
  arr[i] = arr[j]
  arr[j] = t
}

export const shuffle = <T>(arr: Array<T>): Array<T> => {
  arr = arr.slice(0)
  for (let i = 0; i < arr.length; i++) {
    const idxb = Math.floor(Math.random() * arr.length)
    const idxa = Math.floor(Math.random() * arr.length)
    if (idxa !== idxb) {
      array_swap(arr, idxa, idxb)
    }
  }
  return arr
}