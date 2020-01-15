import { seq_card } from '../src/card'
import { CARD_NUM_COUNT, ROW_COUNT, BALL_NUM_FROM, COL_COUNT, PER_COL_RANGE } from '../src/constant'
import { make_seq_array } from '../src/util'

test('seq_card', () => {
  const res = seq_card({})

  expect(res.length).toBe(CARD_NUM_COUNT)

  let true_res: number[] = []
  for (let i = 0; i < COL_COUNT; i++) {
    const first = BALL_NUM_FROM + (i * PER_COL_RANGE)
    true_res = true_res.concat(make_seq_array(first, first + ROW_COUNT - 1))
  }
  expect(res).toStrictEqual(true_res)

})