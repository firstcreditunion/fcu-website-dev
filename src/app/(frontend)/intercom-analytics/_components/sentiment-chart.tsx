'use client'

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts'
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
  count: { label: 'Conversations' },
  positive: { label: 'Positive', color: 'hsl(152, 69%, 41%)' },
  neutral: { label: 'Neutral', color: 'hsl(215, 14%, 60%)' },
  negative: { label: 'Negative', color: 'hsl(0, 72%, 51%)' },
  urgent: { label: 'Urgent', color: 'hsl(38, 92%, 50%)' },
} satisfies ChartConfig

const COLORS: Record<string, string> = {
  Positive: 'hsl(152, 69%, 41%)',
  Neutral: 'hsl(215, 14%, 60%)',
  Negative: 'hsl(0, 72%, 51%)',
  Urgent: 'hsl(38, 92%, 50%)',
}

export function SentimentChart({
  data,
}: {
  data: { sentiment: string; count: number; percentage: number }[]
}) {
  const chartData = data.map((d) => ({
    ...d,
    fill: COLORS[d.sentiment] ?? 'hsl(215, 14%, 60%)',
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Sentiment</CardTitle>
        <CardDescription>
          Emotional tone of user messages across all conversations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData} margin={{ left: 0, right: 16 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sentiment"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) =>
                    `${item.payload.sentiment}: ${Number(value).toLocaleString()} (${item.payload.percentage}%)`
                  }
                />
              }
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {chartData.map((entry) => (
                <Bar
                  key={entry.sentiment}
                  dataKey="count"
                  fill={entry.fill}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
