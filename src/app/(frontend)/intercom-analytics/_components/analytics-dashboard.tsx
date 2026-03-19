'use client'

import {
  topicBreakdown,
  channelBreakdown,
  resolutionMetrics,
  pennyPerformance,
  sentimentDistribution,
  keyInsights,
  totalConversations,
} from '../data'
import { TopicBarChart } from './topic-bar-chart'
import { ChannelPieChart } from './channel-pie-chart'
import { SentimentChart } from './sentiment-chart'
import { ResolutionRadialChart } from './resolution-radial-chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Minus,
  Lightbulb,
  AlertTriangle,
  Bot,
  Users,
} from 'lucide-react'

const trendIcon = {
  up: <TrendingUp className="size-4 text-emerald-600" />,
  down: <TrendingDown className="size-4 text-emerald-600" />,
  stable: <Minus className="size-4 text-gray-400" />,
}

const sentimentColor = {
  positive: 'bg-emerald-100 text-emerald-800',
  neutral: 'bg-gray-100 text-gray-800',
  negative: 'bg-red-100 text-red-800',
  urgent: 'bg-amber-100 text-amber-800',
}

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      {/* KPI Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          icon={<MessageSquare className="size-5 text-blue-600" />}
          label="Total Conversations"
          value={totalConversations.toLocaleString()}
          sub="Across 63 pages"
        />
        <KPICard
          icon={<Bot className="size-5 text-violet-600" />}
          label="AI Resolution Rate"
          value="62%"
          sub="Resolved without human"
        />
        <KPICard
          icon={<Users className="size-5 text-amber-600" />}
          label="Human Handoff"
          value="23%"
          sub="Escalated to team"
        />
        <KPICard
          icon={<AlertTriangle className="size-5 text-red-600" />}
          label="Bounce Rate"
          value="15%"
          sub="No user response"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopicBarChart data={topicBreakdown} />
        <ChannelPieChart data={channelBreakdown} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SentimentChart data={sentimentDistribution} />
        <ResolutionRadialChart data={resolutionMetrics} />
      </div>

      {/* Penny Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="size-5 text-violet-600" />
            Penny AI Performance
          </CardTitle>
          <CardDescription>
            Key metrics from Penny&apos;s handling of conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pennyPerformance.map((row) => (
                <TableRow key={row.metric}>
                  <TableCell className="font-medium">{row.metric}</TableCell>
                  <TableCell className="tabular-nums">{row.value}</TableCell>
                  <TableCell>{trendIcon[row.trend]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Topic Detail Table */}
      <Card>
        <CardHeader>
          <CardTitle>Conversation Topics — Detailed Breakdown</CardTitle>
          <CardDescription>
            What users are asking Penny, ranked by volume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Topic</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="text-right">Share</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead className="min-w-[300px]">Example Queries</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topicBreakdown.map((row) => (
                <TableRow key={row.topic}>
                  <TableCell className="font-medium">{row.topic}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.count}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {row.percentage}%
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${sentimentColor[row.sentiment]}`}
                    >
                      {row.sentiment}
                    </span>
                  </TableCell>
                  <TableCell>
                    <ul className="list-inside list-disc space-y-0.5 text-xs text-gray-600">
                      {row.examples.slice(0, 3).map((ex) => (
                        <li key={ex}>{ex}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="size-5 text-amber-500" />
            Key Insights &amp; Recommendations
          </CardTitle>
          <CardDescription>
            Actionable findings from the conversation analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {keyInsights.map((insight) => (
              <div
                key={insight.title}
                className="rounded-lg border border-gray-200 bg-white p-5"
              >
                <h3 className="text-sm font-semibold text-gray-900">
                  {insight.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {insight.description}
                </p>
                <div className="mt-3 rounded-md bg-blue-50 px-3 py-2">
                  <p className="text-xs font-medium text-blue-800">
                    Recommendation
                  </p>
                  <p className="mt-0.5 text-xs text-blue-700">
                    {insight.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function KPICard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub: string
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold tabular-nums text-gray-900">
            {value}
          </p>
          <p className="text-xs text-gray-500">{sub}</p>
        </div>
      </CardContent>
    </Card>
  )
}
