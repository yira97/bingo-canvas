import { ROW_COUNT, CARD_NUM_COUNT, PER_COL_RANGE, BALL_NUM_FROM, COL_COUNT } from './constant'
import { make_seq_array, shuffle } from './util'

export interface CardPos {
  x: number,
  y: number,
}

export interface CardGenerateConfig { }

export type CardGenerator = (config: CardGenerateConfig) => number[]

function col_min_num(col: number): number {
  const first = BALL_NUM_FROM + (col * PER_COL_RANGE)
  return first
}

function col_max_num(col: number): number {
  const last = col_min_num(col) + PER_COL_RANGE - 1
  return last
}

/**
 * 生成固定顺序的卡片
 */
export function seq_card(cfg: CardGenerateConfig): number[] {
  let res = []
  for (let i = 0; i < COL_COUNT; i++) {
    const first = col_min_num(i)
    for (let j = first; j < first + ROW_COUNT; j++) {
      res.push(j)
    }
  }
  return res
}

/**
 * 生成真正随机的卡片
 */
export const shuffle_card = (cfg: CardGenerateConfig): number[] => {
  let res: number[] = []
  for (let i = 0; i < COL_COUNT; i++) {
    res = res.concat(shuffle(make_seq_array(col_min_num(i), col_max_num(i))).slice(0, 5))
  }
  return res
}

export class Card {
  private _card: number[] = []

  public n(pos: CardPos): number {
    return this._card[pos.y + pos.x * ROW_COUNT]
  }

  public i(n: number): number | undefined {
    let find = false
    let idx = 0
    for (let i = 0; i < this._card.length; i++) {
      if (n === this._card[i]) {
        find = true
        idx = i
      }
    }
    return find ? idx : undefined
  }

  public pos(i: number): CardPos {
    if (i >= 0 && i < this._card.length) {
      return {
        x: Math.floor(i / ROW_COUNT),
        y: i % ROW_COUNT,
      }
    }
    throw new Error("invalid card index")
  }

  constructor(alg: CardGenerator, cfg: CardGenerateConfig) {
    let c = alg(cfg)
    if (!Array.isArray(c)) {
      throw new Error("not an array")
    }
    if (c.length !== CARD_NUM_COUNT) {
      throw new Error(`length is ${c.length}`)
    }
    console.log(`生成卡片: ${c}`)
    this._card = c
  }
}