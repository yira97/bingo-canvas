import { ROW_COUNT } from './constant'
import { Card, CardGenerator, CardGenerateConfig, shuffle_card } from './card'
import { isNumber } from 'util'
import { Point, find_inner_margin } from './point'

const DEFAULT_CARD_GEN = shuffle_card

export class CardBoard {
  private _card: Card = new Card(DEFAULT_CARD_GEN, {})
  private _daub: number[] = []
  private _called: number[] = []

  public reset(alg: CardGenerator = DEFAULT_CARD_GEN, cfg: CardGenerateConfig = {}) {
    this._called = []
    this._daub = []
    this._card = new Card(alg, cfg)
  }

  constructor(alg: CardGenerator = DEFAULT_CARD_GEN, cfg: CardGenerateConfig = {}) {
    this.reset(alg, cfg)
  }

  draw(ctx: CanvasRenderingContext2D, pos: Point, size: number) {
    pos = find_inner_margin(pos)
    this.draw_bingo_board(ctx, pos, size)
    this.draw_card_number(ctx, pos, size)
    this.draw_daub(ctx, pos, size)
  }

  get_call(n: number) {
    console.log(`收到报球: ${n}`)
    this._called.push(n)
    if (this._card.i(n)) {
      this._daub.push(n)
    }
  }

  daub(y: number, x: number) {
    if (isNumber(y) && isNumber(x) && y - Math.floor(y) === 0 && x - Math.floor(x) === 0 && y >= 0 && y <= 4 && x >= 0 && x <= 4) {
      this._daub.push(this._card.n({ x: x, y: y }))
    }
  }

  private draw_card_number(ctx: CanvasRenderingContext2D, pos: Point, size: number) {
    // TODO: FIX ROW_COUNT
    const cell_width = size / ROW_COUNT
    ctx.textAlign = 'center'
    ctx.font = '16px Arial'
    for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < ROW_COUNT; j++) {
        ctx.fillText(
          `${this._card.n({ y: j, x: i })}`,
          (pos.x + i * cell_width) + cell_width / 2,
          (pos.y + j * cell_width) + cell_width / 2,
        )
      }
    }
  }

  private draw_bingo_board(ctx: CanvasRenderingContext2D, pos: Point, size: number) {
    // TODO: FIX ROW_COUNT
    const cell_width = size / ROW_COUNT

    ctx.beginPath();
    for (let i = 0; i < size; i += cell_width) {
      for (let j = 0; j < size; j += cell_width) {
        ctx.rect(pos.x + i, pos.y + j, cell_width, cell_width)
        ctx.moveTo(pos.x + i, pos.y + j)
      }
    }
    ctx.stroke();
  }

  private draw_daub(ctx: CanvasRenderingContext2D, pos: Point, size: number) {
    const cell_width = size / ROW_COUNT

    ctx.beginPath();
    this._daub.forEach(daub_n => {
      const i = this._card.i(daub_n)
      console.log(i)
      if (!i) return
      const card_pos = this._card.pos(i)
      const real_pos = {
        x: pos.x + card_pos.x * cell_width,
        y: pos.y + card_pos.y * cell_width,
      }
      ctx.beginPath()
      ctx.fillRect(real_pos.x, real_pos.y, cell_width, cell_width)
      ctx.stroke()
    })
  }
}