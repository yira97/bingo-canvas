import { CardBoard } from './card_board'
import { BallGenerator, } from './ball'
import { CardGenerator, CardGenerateConfig } from './card'
import { BallBoard } from './ball_board'

export enum GameCommand {
  STOP,
  START,
  RESET,
}

export class Game {
  private _card: CardBoard[] = []
  private _ball: BallBoard = new BallBoard()
  private _cmd_queue: GameCommand[] = []
  private _card_num = 3
  private _game_pause = true
  public _width: number = 0
  public _height: number = 0

  constructor() {
    for (let i = 0; i < this._card_num; i++) {
      this._card.push(new CardBoard())
    }
  }

  set_size(width: number, height: number) {
    this._width = width
    this._height = height
  }

  private set_card(alg: CardGenerator, cfg: CardGenerateConfig, n: number) {
    this._card = []
    for (let i = 0; i < n; i++) {
      this._card.push(new CardBoard(alg, cfg))
    }
  }

  private set_ball(alg: BallGenerator, cfg: BallGenerator) {
    this._ball.reset(alg, cfg)
  }

  private new_round() {
    this._card.forEach(bor => bor.reset())
    this._ball.reset()
  }

  send(m: GameCommand) {
    this._cmd_queue.push(m)
  }

  private exec_command() {
    const c = this._cmd_queue.shift()
    if (c === undefined) return
    switch (c) {
      case GameCommand.STOP:
        this._game_pause = true
        break;
      case GameCommand.START:
        this._game_pause = false
        break;
      case GameCommand.RESET:
        this.new_round()
        break;
      default:
        break;
    }
  }

  tick() {
    this.exec_command()
    if (this._game_pause) return
    if (this._ball.is_continue()) {
      const n = this._ball.call()

      for (let i = 0; i < this._card.length; i++) {
        this._card[i].get_call(n)
      }
    } else {
      console.log(`game over`)
      this._game_pause = true
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let base = this._height > this._width ? this._width / 5 : this._height / 5
    for (let i = 0; i < this._card.length; i++) {
      let cell = base
      let remain = this._width - (this._card.length * cell)
      let margin = remain / 3
      let in_margin = remain / 1.5 / (this._card.length - 1)

      this._card[i].draw(ctx, { x: margin / 2 + (cell * i + i * in_margin), y: base }, cell)
    }
    this._ball.draw(ctx, { x: (this._width - base) / 2, y: base / 5 }, base, base / 5)
  }
}
