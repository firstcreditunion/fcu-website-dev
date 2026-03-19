import type { Metadata } from 'next'
import { AnalyticsDashboard } from './_components/analytics-dashboard'

export const metadata: Metadata = {
  title: 'Intercom Analytics — Penny Conversation Insights',
  description:
    'Deep analysis of Intercom conversations with Penny AI assistant for First Credit Union',
}

export default function IntercomAnalyticsPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Penny Conversation Analytics
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Deep analysis of {(9_450).toLocaleString()} production conversations
            from the First Credit Union Intercom workspace.
          </p>
        </header>
        <AnalyticsDashboard />
      </div>
    </main>
  )
}
