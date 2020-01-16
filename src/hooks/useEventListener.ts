import { useEffect, useRef } from 'react';

export function useEventListener<T extends Event>(event_name: string, handler: (e: T) => void, element = window) {
  const savedHandler = useRef<(e: T) => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  // Set up the listener
  useEffect(() => {
    // 确保元素支持 addEventListener
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    // 创建事件监听调用存储在 ref 的处理方法
    const eventListener = (e: Event) => {
      if (savedHandler.current === undefined) return
      savedHandler.current(e as T);
    }

    // 添加事件监听
    element.addEventListener(event_name, eventListener);

    // 清除的时候移除事件监听
    return () => {
      element.removeEventListener(event_name, eventListener);
    };

  }, [event_name, element]);
}