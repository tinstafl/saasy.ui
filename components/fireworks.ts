import confetti, { Options } from "canvas-confetti"

const count = 50

export const celebrate = () => {
  const bang = (duration: number, options?: Options) => {
    const defaults: Options = {
      particleCount: 100,
      origin: { x: 0.5, y: 0 },
      shapes: [ "square" ],
      colors: [ "#DF43F7", "#1268F9" ],
    }

    confetti({
      ...defaults,
      ...options,
      ticks: duration * 1000,
    })
  }

  bang(0.25, { spread: 26, startVelocity: 55 })
  bang(0.2, { spread: 60 })
  bang(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
  bang(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
  bang(0.1, { spread: 120, startVelocity: 45 })
}

export const fireworks = () => {
  bang(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  bang(0.2, {
    spread: 60,
  })
  bang(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  })
  bang(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  })
  bang(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}

function bang(particleRatio: number, opts: {
  spread: number,
  decay?: number,
  scalar?: number,
  startVelocity?: number
}) {
  confetti({
    ...opts,
    colors: [ "#DF43F7", "#1268F9" ],
    particleCount: Math.floor(count * particleRatio)
  })
}
