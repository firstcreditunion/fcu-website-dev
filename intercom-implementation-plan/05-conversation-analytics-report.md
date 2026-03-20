# Intercom Conversation Analytics Report

**Date:** 20 March 2026  
**Workspace:** Production (`h5fxhzbb`)  
**Sample:** ~9,450 conversations (150 per page × 63 pages)  
**Dashboard:** `/intercom-analytics`

---

## Executive Summary

Penny (the AI assistant) handles a high volume of conversations, with **62% resolved without human intervention**. The dominant topics are **loans (28%)**, **debit card issues (18%)**, and **transfers/payments (16%)**. A significant 15% of conversations are "bounces" where users open the chat but never respond to Penny's greeting.

The most frustrated users are those dealing with **card delivery delays** and **payment timing issues** (MSD/wages). A notable 9% of conversations are simply users requesting a callback because they can't reach the call centre.

---

## Topic Breakdown

| Rank | Topic                            | Share | Est. Count | Sentiment |
| ---- | -------------------------------- | ----- | ---------- | --------- |
| 1    | Loans & Lending                  | 28.3% | ~2,674     | Neutral   |
| 2    | Debit Card Issues                | 18.0% | ~1,701     | Negative  |
| 3    | Transfers & Payments             | 16.0% | ~1,512     | Urgent    |
| 4    | Account Management               | 13.0% | ~1,229     | Neutral   |
| 5    | Contact & Callback Requests      | 9.0%  | ~851       | Negative  |
| 6    | Payment Delays (MSD/Wages)       | 6.0%  | ~567       | Urgent    |
| 7    | Branch & Location Queries        | 4.0%  | ~378       | Neutral   |
| 8    | Fraud & Scams                    | 3.0%  | ~284       | Urgent    |
| 9    | Foreign Exchange & International | 2.0%  | ~189       | Neutral   |
| 10   | Feedback & Complaints            | 0.7%  | ~66        | Negative  |

---

## Channel Distribution

| Channel            | Share |
| ------------------ | ----- |
| Website Messenger  | 60%   |
| Facebook Messenger | 30%   |
| Instagram DM       | 5%    |
| Email              | 5%    |

Facebook Messenger is a surprisingly large channel (30%), and many of the most complex, multi-turn conversations originate there. Instagram is almost entirely spam/scam messages.

---

## Penny AI Performance

| Metric                         | Value      |
| ------------------------------ | ---------- |
| Avg. First Response            | ~8 seconds |
| AI-Only Resolution Rate        | 62%        |
| Human Handoff Rate             | 23%        |
| Bounce Rate                    | 15%        |
| Avg. Messages per Conversation | 4.2        |

Penny performs well on informational queries (loan eligibility, SWIFT codes, branch hours) but struggles with:

- Account-level actions (transfers, payments, closures)
- Emotionally distressed users who want human empathy
- Repeated requests where the user doesn't understand Penny can't action things

---

## Sentiment Analysis

| Sentiment | Share |
| --------- | ----- |
| Positive  | 20%   |
| Neutral   | 45%   |
| Negative  | 25%   |
| Urgent    | 10%   |

The 25% negative sentiment is driven primarily by card issues and inability to reach humans. The 10% urgent sentiment comes from payment delays and fraud reports.

---

## Key Insights & Recommendations

### 1. Loans dominate — 28% of all conversations

Users ask about top-ups, application status, payout figures, repayment schedules, and hardship options. Penny handles informational queries well but cannot action account-level changes.

**Recommendation:** Prioritise loan content in Sanity CMS: FAQs, eligibility criteria, application process, and hardship pathways. Add loan calculator as a prominent website feature.

### 2. Card issues cause the most frustration

Replacement card delivery times, PIN setup problems, and card activation confusion generate 18% of conversations with the highest negative sentiment.

**Recommendation:** Create a dedicated "Card Help" section with step-by-step guides. Consider adding card status tracking to the website. Train Penny with more granular card troubleshooting flows.

### 3. Users want to talk to humans — 9% just want a callback

Many users contact Penny specifically to request a callback because they have no phone credit, can't get through to the call centre, or are outside business hours.

**Recommendation:** Implement a callback request form on the website that feeds into the call centre queue. This would reduce Penny's workload and improve user satisfaction.

### 4. MSD payment delays cause spikes in urgent queries

6% of conversations are about delayed government payments (MSD, Superannuation). These come in waves, typically Monday evenings.

**Recommendation:** Add a real-time payment status banner to the website during known delay periods. Train Penny with standard responses about payment processing times.

### 5. Remote members struggle without branches

Users in areas without FCU branches (Far North, Whangarei, Henderson) ask about depositing cash, receiving cards, and accessing services.

**Recommendation:** Build a comprehensive "Banking Without a Branch" guide covering ATM deposits, mobile banking, mail-in options, and partner bank arrangements.

### 6. Scam messages pollute the inbox

3% of conversations are spam/scam messages (fake Meta verification badges). Penny correctly identifies these but they waste resources.

**Recommendation:** Implement automated spam detection and filtering in Intercom. Add a scam awareness section to the website to educate members.

---

## Implications for Website Rebuild

Based on this analysis, the new website should prioritise:

1. **Loan calculator & application flow** — the single most requested topic
2. **Card help centre** — step-by-step guides for PIN, activation, replacement
3. **Callback request form** — reduces Penny load and improves UX
4. **Payment status page** — for MSD/wage payment delay communication
5. **Branch finder with "no branch" guide** — for remote members
6. **Scam awareness content** — educate members proactively
7. **International transfers guide** — SWIFT codes, fees, timelines

These directly map to the content types that should be built in Sanity CMS and fed to Intercom's AI agent (see `04-content-training-strategy.md`).

---

## Dashboard

A visual dashboard with charts is available at `/intercom-analytics` in the development environment. It includes:

- KPI cards (total conversations, AI resolution rate, handoff rate, bounce rate)
- Horizontal bar chart of topic distribution
- Pie chart of channel distribution
- Sentiment bar chart
- Resolution radial chart
- Penny performance metrics table
- Detailed topic breakdown table with example queries
- Key insights cards with recommendations
