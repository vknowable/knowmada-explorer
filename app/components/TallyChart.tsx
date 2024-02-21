'use client'

import { useRef, useEffect } from "react";
import { Chart, ArcElement, PieController } from "chart.js";

type Props = {
  yay: number,
  nay: number,
  abstain: number,
  total: number,
}

export default function TallyChart({ yay, nay, abstain, total }: Props) {

  const canvas = useRef<HTMLCanvasElement>(null)

  const no_vote = total - (yay + nay + abstain)

  useEffect(() => {
    const ctx = canvas.current
    if (ctx === null) return

    Chart.register(PieController)
    Chart.register(ArcElement)
    const chartStatus = Chart.getChart(ctx)
    if (chartStatus) chartStatus.destroy()
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [yay, nay, abstain, no_vote],
            backgroundColor: [
              'rgba(59, 168, 59, 0.8)',
              'rgba(171, 41, 41, 0.8)',
              'rgba(51, 83, 158, 0.8)',
              'rgba(100, 100, 100, 0.2)',
            ],
            borderColor: [
              'rgba(59, 168, 59, 1)',
              'rgba(171, 41, 41, 1)',
              'rgba(51, 83, 158, 1)',
              'rgba(100, 100, 100, 0.8)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        circumference: 180,
        rotation: -90,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false,
            text: '',
          },
        },
      },
    });

  }, [yay, nay, abstain, no_vote])

  return (
    <div>
      <canvas ref={canvas}></canvas>
    </div>
  )
}