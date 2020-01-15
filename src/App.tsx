import React, { useEffect, useState, useMemo } from 'react';
import { useInterval } from './hooks/useInterval';
import { Game, GameCommand } from './game'
import * as cfg from './config'

enum FullScreen {
  true,
}

const init_main_plot = (canva: HTMLCanvasElement, fullscreen: FullScreen) => {
  const bd = document.querySelector('body')
  let width = cfg.DEFAULT_MAIN_PLOT_WIDTH
  let height = cfg.DEFAULT_MAIN_PLOT_HEIGHT
  if (fullscreen === FullScreen.true && bd !== null) {
    height = bd.clientHeight
    width = bd.clientWidth
  }
  canva.height = height
  canva.width = width
  return [width, height]
}

const clear_main_plot = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, cfg.DEFAULT_MAIN_PLOT_HEIGHT, cfg.DEFAULT_MAIN_PLOT_HEIGHT)
}

function App() {
  const mainPlot = React.useRef<HTMLCanvasElement>(null)
  const game = useMemo(() => new Game(), [])
  const [game_frame, set_game_frame] = useState(0)

  useInterval(() => {
    game.tick()
    set_game_frame(game_frame + 1)
  }, cfg.BALLCALL_SEC)

  useEffect(() => {
    let canva = mainPlot.current
    if (!canva) return
    const [width, height] = init_main_plot(canva, FullScreen.true)
    game.set_size(width, height)
    let ctx = canva.getContext('2d')
    if (!ctx) return
    clear_main_plot(ctx)
    game.draw(ctx)
  }, [game_frame, game])

  return (
    <>
      <div>
        <button onClick={() => game.send(GameCommand.START)}>启动</button>
        <button onClick={() => game.send(GameCommand.STOP)}> 停止</button>
        <button onClick={() => game.send(GameCommand.RESET)}>重置</button>
      </div>
      <div className='app' style={{ height: "100vh" }}>
        <canvas id='main' ref={mainPlot} ></canvas>
      </div>
    </>
  );
}

export default App;
