import React, { useEffect, useMemo, useState } from 'react';
import { useInterval } from './hooks/useInterval';
import { Game } from './game'
import * as cfg from './config'



const init_main_plot = (canva: HTMLCanvasElement) => {
  canva.height = cfg.DEFAULT_MAIN_PLOT_HEIGHT
  canva.width = cfg.DEFAULT_MAIN_PLOT_WIDTH
}

const get_ctx = (canva: HTMLCanvasElement): CanvasRenderingContext2D | undefined => {
  let ctx = canva.getContext('2d')
  if (ctx === null) return undefined
  return ctx
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
    init_main_plot(canva)
    let ctx = get_ctx(canva)
    if (!ctx) return
    ctx.clearRect(0,0,cfg.DEFAULT_MAIN_PLOT_HEIGHT,cfg.DEFAULT_MAIN_PLOT_HEIGHT)
    game.draw(ctx)
  }, [game, game_frame])

  return (
    <div className="App">
      <canvas id="main" ref={mainPlot}>
      </canvas>
    </div>
  );
}

export default App;
