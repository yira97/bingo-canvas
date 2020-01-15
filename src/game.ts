import { CardBoard } from './card_board'
import { BallGenerator,  } from './ball'
import { CardGenerator, CardGenerateConfig } from './card'
import { BallBoard } from './ball_board'

export class Game {
  private _card: CardBoard[] = [new CardBoard(), new CardBoard()]
  private _ball: BallBoard = new BallBoard()


  set_card(alg: CardGenerator, cfg: CardGenerateConfig, n: number) {
    this._card = []
    for (let i = 0; i < n; i++) {
      this._card.push(new CardBoard(alg, cfg))
    }
  }

  set_ball(alg: BallGenerator, cfg: BallGenerator) {
    this._ball.reset(alg, cfg)
  }

  new_round() {
    this._card.forEach(bor => bor.reset())
    this._ball.reset()
  }

  tick() {
    const n = this._ball.call()
    for (let i = 0; i < this._card.length; i++) {
      console.log(`卡片${i + 1}接受报球`)
      this._card[i].get_call(n)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this._card.length; i++) {
      this._card[i].draw(ctx, { x: 350 * i + 100, y: 200 }, 300)
    }
    this._ball.draw(ctx, { x: 50, y: 50 }, 500, 100)
  }
}