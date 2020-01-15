import { seq_ball } from '../src/ball'
import { BALL_COUNT, ROW_COUNT, BALL_NUM_FROM } from '../src/constant'

test('seq-ball', () => {
  const ball = seq_ball({})
  expect(ball.length).toBe(BALL_COUNT)
  for (let i = 0; i < BALL_COUNT; i++) {
    expect(ball[i]).toBe(BALL_NUM_FROM + i)
  }
})