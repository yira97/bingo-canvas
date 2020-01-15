import { make_seq_array, array_swap } from '../src/util'

test('make_seq_array', () => {
  // 1 to 7
  const res1 = make_seq_array(1, 7)
  expect(res1.length).toBe(7)
  for (let i = 0; i < 7; i++) {
    expect(res1[i]).toBe<number>(i + 1)
  }

  // 15 to 10
  const res2 = make_seq_array(15, 10)
  expect(res2.length).toBe(6)
  for (let i = 0; i <= 5; i++) {
    expect(res2[i]).toBe<number>(15 - i)
  }

  // 100
  const res3 = make_seq_array(100, 100)
  expect(res3.length).toBe(1)
  expect(res3[0]).toBe(100)
})

test('array_swap', () => {
  const a = [1, 2, 3, 4, 5]
  array_swap(a, 1, 3)
  expect(a).toStrictEqual([1, 4, 3, 2, 5])
})