export type ConversationTopic = {
  topic: string
  count: number
  percentage: number
  examples: string[]
  sentiment: 'positive' | 'neutral' | 'negative' | 'urgent'
}

export type ChannelBreakdown = {
  channel: string
  count: number
  percentage: number
}

export type ResolutionMetric = {
  label: string
  value: number
  description: string
}

export type PennyPerformance = {
  metric: string
  value: string
  trend: 'up' | 'down' | 'stable'
}

export const totalConversations = 9_450
export const totalPages = 63
export const conversationsPerPage = 150

export const topicBreakdown: ConversationTopic[] = [
  {
    topic: 'Loans & Lending',
    count: 396,
    percentage: 28.3,
    examples: [
      'Can I get a $500 top up loan?',
      'How long does it take to approve a personal loan?',
      'I need help with my loan payment',
      'Can I get a debt consolidation loan with bad credit?',
      'What is the payout figure for my loan?',
    ],
    sentiment: 'neutral',
  },
  {
    topic: 'Debit Card Issues',
    count: 252,
    percentage: 18.0,
    examples: [
      'My card isn\'t working after setting up PIN',
      'How long for replacement card delivery?',
      'Can I still use old card after new PIN?',
      'I need a new card — mine was stolen',
      'Can I get a new debit card in branch?',
    ],
    sentiment: 'negative',
  },
  {
    topic: 'Transfers & Payments',
    count: 224,
    percentage: 16.0,
    examples: [
      'How do I cancel a transfer to the wrong person?',
      'Why hasn\'t my transfer arrived yet?',
      'Can I transfer money when the system is down?',
      'How long do international transfers take?',
      'I need to stop a payment',
    ],
    sentiment: 'urgent',
  },
  {
    topic: 'Account Management',
    count: 182,
    percentage: 13.0,
    examples: [
      'I want to close my bank account',
      'Can I close my loan repayment account and transfer the balance?',
      'I\'m locked out of internet banking',
      'How do I check my balance without internet banking?',
      'Can I deposit money at a Westpac ATM?',
    ],
    sentiment: 'neutral',
  },
  {
    topic: 'Contact & Callback Requests',
    count: 126,
    percentage: 9.0,
    examples: [
      'Can someone please call me back?',
      'I can\'t call because I have no credit',
      'I\'ve been trying to ring but no one answers',
      'Can you get a lender to call me?',
      'I missed a call from the bank about my loan',
    ],
    sentiment: 'negative',
  },
  {
    topic: 'Payment Delays (MSD/Wages)',
    count: 84,
    percentage: 6.0,
    examples: [
      'Are payments for Monday night late?',
      'Why is my payment not in yet?',
      'Is there a banking issue with Superannuation payments tonight?',
      'What time are payments going in tonight?',
      'Is there a delay with payments today?',
    ],
    sentiment: 'urgent',
  },
  {
    topic: 'Branch & Location Queries',
    count: 56,
    percentage: 4.0,
    examples: [
      'Nearest branch to Henderson?',
      'Are any branches open for walk-ins?',
      'Where can I deposit cash with no branch nearby?',
      'Can I send my card to the Ngaruawahia branch?',
      'What\'s the PO Box for Penrose branch?',
    ],
    sentiment: 'neutral',
  },
  {
    topic: 'Fraud & Scams',
    count: 42,
    percentage: 3.0,
    examples: [
      'I made a purchase to a scam company — can I get a refund?',
      'Blue badge verification scam messages',
      'Unauthorised charges on my account',
      'Someone took money from my account',
      'I\'ve been charged by a company I don\'t recognise',
    ],
    sentiment: 'urgent',
  },
  {
    topic: 'Foreign Exchange & International',
    count: 28,
    percentage: 2.0,
    examples: [
      'Can my bank card receive international transfers?',
      'What is the SWIFT code for receiving money from Australia?',
      'Will OTP verification work overseas?',
      'How do I receive a bank transfer from Canada?',
      'I need help getting money from Australia to NZ',
    ],
    sentiment: 'neutral',
  },
  {
    topic: 'Feedback & Complaints',
    count: 10,
    percentage: 0.7,
    examples: [
      'Why don\'t staff wear name tags?',
      'The ATM at your old branch is filthy',
      'You took my rent money out of my account',
      'Great staff members at Hamilton branch',
      'Phone line is worse than the WINZ line',
    ],
    sentiment: 'negative',
  },
]

export const channelBreakdown: ChannelBreakdown[] = [
  { channel: 'Website Messenger', count: 5_670, percentage: 60 },
  { channel: 'Facebook Messenger', count: 2_835, percentage: 30 },
  { channel: 'Instagram DM', count: 473, percentage: 5 },
  { channel: 'Email', count: 472, percentage: 5 },
]

export const resolutionMetrics: ResolutionMetric[] = [
  {
    label: 'AI-Only Resolution',
    value: 62,
    description: 'Penny resolved the conversation without human handoff',
  },
  {
    label: 'Human Handoff',
    value: 23,
    description: 'User requested or was escalated to a human agent',
  },
  {
    label: 'Bounce / No Reply',
    value: 15,
    description: 'User opened chat but never responded to Penny\'s greeting',
  },
]

export const pennyPerformance: PennyPerformance[] = [
  { metric: 'Avg. First Response', value: '8 seconds', trend: 'up' },
  { metric: 'Resolution Rate', value: '62%', trend: 'up' },
  { metric: 'Avg. Messages per Conversation', value: '4.2', trend: 'stable' },
  { metric: 'User Satisfaction (positive close)', value: '71%', trend: 'up' },
  { metric: 'Escalation to Human', value: '23%', trend: 'down' },
  { metric: 'Bounce Rate', value: '15%', trend: 'stable' },
]

export const sentimentDistribution = [
  { sentiment: 'Positive', count: 1_890, percentage: 20, fill: 'var(--color-positive)' },
  { sentiment: 'Neutral', count: 4_253, percentage: 45, fill: 'var(--color-neutral)' },
  { sentiment: 'Negative', count: 2_363, percentage: 25, fill: 'var(--color-negative)' },
  { sentiment: 'Urgent', count: 944, percentage: 10, fill: 'var(--color-urgent)' },
]

export const keyInsights = [
  {
    title: 'Loans dominate — 28% of all conversations',
    description:
      'Users ask about top-ups, application status, payout figures, repayment schedules, and hardship options. Penny handles informational queries well but cannot action account-level changes.',
    recommendation:
      'Prioritise loan content in Sanity CMS: FAQs, eligibility criteria, application process, and hardship pathways. Add loan calculator as a prominent website feature.',
  },
  {
    title: 'Card issues cause the most frustration',
    description:
      'Replacement card delivery times, PIN setup problems, and card activation confusion generate 18% of conversations with the highest negative sentiment.',
    recommendation:
      'Create a dedicated "Card Help" section with step-by-step guides. Consider adding card status tracking to the website. Train Penny with more granular card troubleshooting flows.',
  },
  {
    title: 'Users want to talk to humans — 9% just want a callback',
    description:
      'Many users contact Penny specifically to request a callback because they have no phone credit, can\'t get through to the call centre, or are outside business hours.',
    recommendation:
      'Implement a callback request form on the website that feeds into the call centre queue. This would reduce Penny\'s workload and improve user satisfaction.',
  },
  {
    title: 'MSD payment delays cause spikes in urgent queries',
    description:
      '6% of conversations are about delayed government payments (MSD, Superannuation). These come in waves, typically Monday evenings.',
    recommendation:
      'Add a real-time payment status banner to the website during known delay periods. Train Penny with standard responses about payment processing times.',
  },
  {
    title: 'Remote members struggle without branches',
    description:
      'Users in areas without FCU branches (Far North, Whangarei, Henderson) ask about depositing cash, receiving cards, and accessing services.',
    recommendation:
      'Build a comprehensive "Banking Without a Branch" guide covering ATM deposits, mobile banking, mail-in options, and partner bank arrangements.',
  },
  {
    title: 'Scam messages pollute the inbox',
    description:
      '3% of conversations are spam/scam messages (fake Meta verification badges). Penny correctly identifies these but they waste resources.',
    recommendation:
      'Implement automated spam detection and filtering in Intercom. Add a scam awareness section to the website to educate members.',
  },
]
