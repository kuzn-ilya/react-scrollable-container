// tslint:disable:no-any
export const cancelAnimationFrame: (handle: number) => void =
  (global as any).cancelAnimationFrame    ||
  (global as any).webkitCancelAnimationFrame ||
  (global as any).mozCancelAnimationFrame    ||
  (global as any).oCancelAnimationFrame      ||
  (global as any).msCancelAnimationFrame     ||
  (global as any).clearTimeout;
