'use client'

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import type { ConversationTopic } from '../data'
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
} from '@/components/ui/chart'

const chartConfig = {
  percentage: {
    label: 'Share',
    color: 'hsl(221, 83%, 53%)',
  },
} satisfies ChartConfig

export function TopicBarChart({ data }: { data: ConversationTopic[] }) {
  const chartData = data.map((d) => ({
    topic: d.topic.length > 20 ? d.topic.slice(0, 18) + '…' : d.topic,
    fullTopic: d.topic,
    percentage: d.percentage,
    count: d.count,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Topics</CardTitle>
        <CardDescription>
          What users ask Penny about, by share of total conversations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 0, right: 16, top: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="topic"
              type="category"
              width={140}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) =>
                    `${item.payload.fullTopic}: ${value}% (${item.payload.count} conversations)`
                  }
                />
              }
            />
            <Bar
              dataKey="percentage"
              fill="var(--color-percentage)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
