import { Ball, BallGenerator, seq_ball, BallGenerateConfig, shuffle_ball } from "./ball";
import { Point, find_inner_margin } from './point'
import { BALL_NUM_IN_BOARD, BALL_COUNT } from './constant'

const DEFAULT_BALL_GEN = shuffle_ball

export class BallBoard {
  private _ball: Ball = new Ball(DEFAULT_BALL_GEN, {})
  private _current_idx: number = 0
  private _end: boolean = false

  is_continue(): boolean {
    return !this._end
  }

  reset(alg: BallGenerator = DEFAULT_BALL_GEN, cfg: BallGenerateConfig = {}) {
    this._ball = new Ball(alg, cfg)
    this._current_idx = 0
    this._end = false
  }

  constructor(alg: BallGenerator = DEFAULT_BALL_GEN, cfg: BallGenerateConfig = {}) {
    this.reset(alg, cfg)
  }

  draw(ctx: CanvasRenderingContext2D, pos: Point, width: number, height: number) {
    const cell_pos = this.get_board_pos(width, height)
    const actual_pos = find_inner_margin({
      x: pos.x + cell_pos.pos.x,
      y: pos.y + cell_pos.pos.y,
    })
    this.draw_ball_board(ctx, actual_pos, cell_pos.cell)
    this.draw_ball_board_num(ctx, actual_pos, cell_pos.cell)
  }

  private get_board_pos(width: number, height: number): { pos: Point, cell: number } {
    // 假设是横着单行绘制
    let r = { pos: { x: 0, y: 0 }, cell: 0 }
    r.cell = (width / BALL_NUM_IN_BOARD) < height ? width / BALL_NUM_IN_BOARD : height
    r.pos.x = (width - r.cell * 5) / 2
    r.pos.y = (height - r.cell) / 2
    return r
  }

  private draw_ball_board(ctx: CanvasRenderingContext2D, pos: Point, cell: number) {
    // 假设是横着单行绘制
    ctx.beginPath()
    for (let i = 0; i < BALL_NUM_IN_BOARD; i++) {
      ctx.rect(pos.x + (i * cell), pos.y, cell, cell)
    }
    ctx.stroke();
  }

  private draw_ball_board_num(ctx: CanvasRenderingContext2D, pos: Point, cell: number) {
    ctx.font = '16px Arial'
    ctx.textAlign = 'center'
    for (let i = 0; i < BALL_NUM_IN_BOARD; i++) {
      if (this._current_idx - i - 1 >= 0) {
        ctx.fillText(
          `${this._ball.n(this._current_idx - i - 1)}`,
          (pos.x + i * cell) + (cell / 2),
          pos.y + (cell / 2),
        )
      }
    }
  }

  call(): number {
    let n = this._ball.n(this._current_idx)
    if (this._current_idx + 1 < BALL_COUNT) {
      this._current_idx++
    } else {
      this._end = true
    }
    console.log(`叫球: ${n}`)
    return n
  }
}