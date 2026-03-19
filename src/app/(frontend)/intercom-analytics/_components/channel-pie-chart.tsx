'use client'

import { Pie, PieChart, Cell } from 'recharts'
import type { ChannelBreakdown } from '../data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'

const COLORS = [
  'hsl(221, 83%, 53%)',
  'hsl(262, 83%, 58%)',
  'hsl(330, 81%, 60%)',
  'hsl(25, 95%, 53%)',
]

const chartConfig = {
  count: { label: 'Conversations' },
  'Website Messenger': { label: 'Website Messenger', color: COLORS[0] },
  'Facebook Messenger': { label: 'Facebook Messenger', color: COLORS[1] },
  'Instagram DM': { label: 'Instagram DM', color: COLORS[2] },
  Email: { label: 'Email', color: COLORS[3] },
} satisfies ChartConfig

export function ChannelPieChart({ data }: { data: ChannelBreakdown[] }) {
  const chartData = data.map((d, i) => ({
    name: d.channel,
    value: d.count,
    percentage: d.percentage,
    fill: COLORS[i % COLORS.length],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Channel Distribution</CardTitle>
        <CardDescription>
          Where conversations originate from
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[400px] w-full">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) =>
                    `${name}: ${Number(value).toLocaleString()} conversations`
                  }
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              paddingAngle={2}
              label={({ percentage }) => `${percentage}%`}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
