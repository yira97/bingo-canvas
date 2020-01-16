import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useInterval } from './hooks/useInterval';
import { Game, GameCommand } from './game'
import * as cfg from './config'
import { useEventListener } from './hooks/useEventListener';





function App() {
  const main_canva = React.useRef<HTMLCanvasElement>(null)
  const canvasize = React.useRef({ w: 0, h: 0 }).current
  const game = React.useRef(new Game()).current
  const [game_frame, set_game_frame] = useState(0)

  const init_main_plot = (canva: HTMLCanvasElement) => {
    const bd = document.querySelector('body')
    if (bd === null) return
    let height = bd.clientHeight
    let width = bd.clientWidth
    canva.height = height
    canva.width = width
    game.set_size(width, height)
    canvasize.w = width
    canvasize.h = height
    console.log(`初始化canvas`)
  }

  const clear_main_plot = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasize.w, canvasize.h)
  }

  useInterval(() => {
    game.tick()
    set_game_frame(game_frame + 1)
  }, cfg.REDRAW_INTERVAL)

  const clickhandle = useCallback((e: MouseEvent) => {
    console.log(e.clientX)
    console.log(e.clientY)
  }, [])
  useEventListener<MouseEvent>('click', clickhandle)

  useEffect(() => {
    let canva = main_canva.current
    if (!canva) return
    if (canvasize.h === 0) {
      init_main_plot(canva)
      return
    }
    let ctx = canva.getContext('2d')
    if (!ctx) return
    clear_main_plot(ctx)
    game.draw(ctx)
  }, [game_frame])

  return (
    <>
      <div className='app' style={{ height: "100vh" }}>
        <canvas id='main' ref={main_canva} ></canvas>
      </div>
      <div>
        <button onClick={() => game.send(GameCommand.START)}>启动</button>
        <button onClick={() => game.send(GameCommand.STOP)}> 停止</button>
        <button onClick={() => game.send(GameCommand.RESET)}>重置</button>
      </div>
    </>
  );
}

export default App;
