'use client'

import { useRef, useEffect } from "react";
import { Chart, ArcElement, PieController } from "chart.js";

type Props = {
  bonded: number,
  total: number,
}

export default function SupplyChart({ bonded, total }: Props) {

  const canvas = useRef<HTMLCanvasElement>(null)

  const totalSupply = total
  const bondedSupply = bonded
  const unbondedSupply = totalSupply - bondedSupply

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
            data: [bondedSupply, unbondedSupply],
            backgroundColor: [
              'rgba(0, 255, 255, 0.2)',
              'rgba(255, 255, 0, 0.2)',
            ],
            borderColor: [
              'rgba(0, 255, 255, 1)',
              'rgba(255, 255, 0, 1)',
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

  }, [bondedSupply, unbondedSupply])

  return (
    <div>
      <canvas ref={canvas}></canvas>
    </div>
  )
}