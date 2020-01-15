import { isNumber } from "util"
import { make_seq_array, shuffle } from "./util"
import { BALL_NUM_FROM, BALL_NUM_TO, BALL_COUNT } from './constant'

export interface BallGenerateConfig { }

export type BallGenerator = (config: BallGenerateConfig) => number[]

export const seq_ball = (config: BallGenerateConfig): number[] => {
  return make_seq_array(BALL_NUM_FROM, BALL_NUM_TO)
}

export const shuffle_ball = (config: BallGenerateConfig): number[] => {
  return shuffle(seq_ball(config))
}

export class Ball {
  private _ball: number[]
  constructor(alg: BallGenerator, cfg: BallGenerateConfig) {
    let ball = alg(cfg)
    if (!Array.isArray(ball)) {
      throw new Error("not an array")
    }
    if (ball.length !== BALL_COUNT) {
      throw new Error(`length is ${ball.length}`)
    }
    if (ball.some(b => !isNumber(b) || (b - Math.floor(b) > 0))) {
      throw new Error(`invalid ball number`)
    }
    console.log(`生成报球:${ball}`)
    this._ball = ball
  }

  public n(i: number): number {
    if (i > this._ball.length) {
      throw new Error("invalid ball index")
    }
    return this._ball[i]
  }
}