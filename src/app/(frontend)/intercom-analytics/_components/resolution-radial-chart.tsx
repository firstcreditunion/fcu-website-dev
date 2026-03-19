'use client'

import { RadialBar, RadialBarChart, PolarAngleAxis } from 'recharts'
import type { ResolutionMetric } from '../data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'

const COLORS = ['hsl(221, 83%, 53%)', 'hsl(38, 92%, 50%)', 'hsl(215, 14%, 75%)']

const chartConfig = {
  value: { label: 'Percentage' },
} satisfies ChartConfig

export function ResolutionRadialChart({ data }: { data: ResolutionMetric[] }) {
  const chartData = data.map((d, i) => ({
    name: d.label,
    value: d.value,
    fill: COLORS[i % COLORS.length],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resolution Breakdown</CardTitle>
        <CardDescription>How conversations are resolved</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='mx-auto h-[300px] w-full'
        >
          <RadialBarChart
            cx='50%'
            cy='50%'
            innerRadius='30%'
            outerRadius='90%'
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type='number'
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              dataKey='value'
              cornerRadius={6}
              background={{ fill: 'hsl(0, 0%, 95%)' }}
            />
          </RadialBarChart>
        </ChartContainer>
        <div className='mt-2 flex flex-wrap justify-center gap-4'>
          {data.map((d, i) => (
            <div key={d.label} className='flex items-center gap-2 text-sm'>
              <span
                className='inline-block size-3 rounded-full'
                style={{ backgroundColor: COLORS[i] }}
              />
              <span className='font-medium'>{d.label}</span>
              <span className='tabular-nums text-gray-500'>{d.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
