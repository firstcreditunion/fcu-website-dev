import Link from 'next/link'
import {
  ChevronRight,
  Wallet,
  Clock,
  Star,
  CreditCard,
  Plane,
  ShoppingBag,
  Calendar,
  Shield,
  Gift,
  MapPin,
  Check,
  Minus,
} from 'lucide-react'
import { SpecialPurposeFaqSection } from './_components/faq-section'

export const metadata = {
  title: 'Special Purpose Account | First Credit Union',
  description:
    'Save for something specific and keep it separate. The Special Purpose Account is designed for short-term goals where you need the money set aside but still readily accessible when the time comes. No monthly fees.',
}

export default function SpecialPurposeAccountPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav
        className="flex gap-1.5 items-center flex-wrap text-xs text-muted-foreground mb-6"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <span aria-hidden className="opacity-50">
          <ChevronRight className="w-3 h-3 inline" />
        </span>
        <Link
          href="/accounts"
          className="text-muted-foreground hover:text-foreground"
        >
          Accounts
        </Link>
        <span aria-hidden className="opacity-50">
          <ChevronRight className="w-3 h-3 inline" />
        </span>
        <Link
          href="/accounts/transactional"
          className="text-muted-foreground hover:text-foreground"
        >
          Transactional
        </Link>
        <span aria-hidden className="opacity-50">
          <ChevronRight className="w-3 h-3 inline" />
        </span>
        <span className="text-foreground">Special Purpose Account</span>
      </nav>

      {/* Section label */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Transactional accounts
      </p>

      {/* Hero */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-10 rounded-lg border border-fcu-mint-300 bg-fcu-mint-100 mb-6"
        aria-labelledby="hero-title"
      >
        <div>
          <span className="inline-block bg-fcu-mint-300 text-fcu-primary-950 text-[11px] font-medium px-2.5 py-1 rounded-md mb-3">
            No monthly fees
          </span>
          <h1
            id="hero-title"
            className="text-[26px] font-medium text-fcu-primary-950 leading-snug mb-2.5"
          >
            Special Purpose Account
          </h1>
          <p className="text-[15px] text-fcu-primary-900 leading-relaxed mb-6">
            Save for something specific and keep it separate. The Special Purpose
            Account is designed for short-term goals where you need the money set
            aside but still readily accessible when the time comes.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-primary-950 transition-colors"
            >
              Contact us to open
            </Link>
            <Link
              href="/branches"
              className="inline-flex items-center border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-mint-100 transition-colors"
            >
              Find a branch
            </Link>
          </div>
        </div>

        {/* Goal tracker visual */}
        <div className="hidden md:flex flex-col gap-3.5 p-5 rounded-lg border border-fcu-mint-300 bg-white">
          <span className="text-[11px] text-fcu-primary-900 font-medium">
            Example — savings goals
          </span>
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs font-medium text-fcu-primary-950">
                Holiday fund
              </span>
              <span className="text-[11px] text-fcu-primary-900">
                $1,850 of $3,000
              </span>
            </div>
            <div className="h-1.5 rounded bg-fcu-mint-100 overflow-hidden">
              <div
                className="h-full rounded bg-fcu-primary-900"
                style={{ width: '62%' }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[11px] text-fcu-primary-900">
              <span>62% there</span>
              <span>Est. 4 months</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs font-medium text-fcu-primary-950">
                New laptop
              </span>
              <span className="text-[11px] text-fcu-primary-900">
                $720 of $1,200
              </span>
            </div>
            <div className="h-1.5 rounded bg-fcu-mint-100 overflow-hidden">
              <div
                className="h-full rounded bg-fcu-primary-900"
                style={{ width: '60%' }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[11px] text-fcu-primary-900">
              <span>60% there</span>
              <span>Est. 2 months</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-xs font-medium text-fcu-primary-950">
                Emergency buffer
              </span>
              <span className="text-[11px] text-fcu-primary-900">
                $500 of $500
              </span>
            </div>
            <div className="h-1.5 rounded bg-fcu-mint-100 overflow-hidden">
              <div
                className="h-full rounded bg-fcu-primary-900"
                style={{ width: '100%' }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[11px] text-fcu-primary-900">
              <span className="text-fcu-primary-900 font-medium">
                Goal reached
              </span>
              <span>Ready to use</span>
            </div>
          </div>
          <hr className="border-t border-fcu-mint-300" />
          <div className="flex items-center gap-1.5 text-[11px] text-fcu-primary-900">
            <div className="w-1.5 h-1.5 rounded-full bg-fcu-primary-900 shrink-0" />
            Funds accessible whenever you need them
          </div>
        </div>
      </section>

      {/* Features */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        What&apos;s included
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2">
            <Wallet className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            No account fees
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            No monthly or joining fees — ever
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2">
            <Clock className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            Funds stay accessible
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Access your money whenever you need it — no lock-in periods
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2">
            <Star className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            Goal-focused saving
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Keep short-term savings ringfenced from everyday spending
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2">
            <CreditCard className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            Debit card eligible
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Link your Mastercard® Debit Card to this account
          </p>
        </div>
      </div>

      {/* Use cases */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        What do people use it for?
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 mb-6">
        <div className="rounded-lg border border-border bg-card p-4 md:px-5 flex flex-col gap-1.5">
          <div className="w-7 h-7 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-0.5">
            <Plane className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h4 className="text-[13px] font-medium text-foreground">
            Holiday savings
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Set aside a regular amount each payday toward your next trip, ready to
            access when you need to book.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5 flex flex-col gap-1.5">
          <div className="w-7 h-7 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-0.5">
            <ShoppingBag className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h4 className="text-[13px] font-medium text-foreground">
            Big purchases
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Save up for a new appliance, laptop, or car accessory without
            dipping into your everyday account.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5 flex flex-col gap-1.5">
          <div className="w-7 h-7 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-0.5">
            <Calendar className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h4 className="text-[13px] font-medium text-foreground">
            Seasonal costs
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Spread Christmas, back-to-school, or annual registration costs
            throughout the year so they don&apos;t hit all at once.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5 flex flex-col gap-1.5">
          <div className="w-7 h-7 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-0.5">
            <Shield className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h4 className="text-[13px] font-medium text-foreground">
            Emergency buffer
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Keep a small buffer separate from your main accounts for unexpected
            costs — car repairs, medical bills, and the like.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5 flex flex-col gap-1.5">
          <div className="w-7 h-7 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-0.5">
            <Gift className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h4 className="text-[13px] font-medium text-foreground">
            Event planning
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Save toward a wedding, birthday celebration, or family event without
            disrupting your regular budget.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5 flex flex-col gap-1.5">
          <div className="w-7 h-7 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h4 className="text-[13px] font-medium text-foreground">
            Moving costs
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Build up funds ahead of a move — bond, removalists, and setup costs
            — all in one dedicated place.
          </p>
        </div>
      </div>

      {/* SPA vs Savings comparison */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Which account is right for me?
      </p>
      <div className="rounded-lg border border-border bg-card p-5 mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">
          Special Purpose Account vs savings accounts
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr>
                <th className="text-[11px] font-medium text-muted-foreground text-left pb-2 border-b border-border w-[40%]">
                  Feature
                </th>
                <th className="text-[11px] font-medium text-fcu-primary-950 text-center pb-2 border-b border-border w-[30%]">
                  Special Purpose Account
                </th>
                <th className="text-[11px] font-medium text-muted-foreground text-center pb-2 border-b border-border w-[30%]">
                  Money Maker / Online Savings
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 border-b border-border text-muted-foreground">
                  Funds accessible anytime
                </td>
                <td className="py-2 border-b border-border text-center bg-fcu-mint-100">
                  <Check className="w-3.5 h-3.5 text-fcu-primary-900 inline" />
                </td>
                <td className="py-2 border-b border-border text-center text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-fcu-primary-900 inline" />
                </td>
              </tr>
              <tr>
                <td className="py-2 border-b border-border text-muted-foreground">
                  No monthly fees
                </td>
                <td className="py-2 border-b border-border text-center bg-fcu-mint-100">
                  <Check className="w-3.5 h-3.5 text-fcu-primary-900 inline" />
                </td>
                <td className="py-2 border-b border-border text-center text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-fcu-primary-900 inline" />
                </td>
              </tr>
              <tr>
                <td className="py-2 border-b border-border text-muted-foreground">
                  Debit card eligible
                </td>
                <td className="py-2 border-b border-border text-center bg-fcu-mint-100">
                  <Check className="w-3.5 h-3.5 text-fcu-primary-900 inline" />
                </td>
                <td className="py-2 border-b border-border text-center text-muted-foreground">
                  <Minus className="w-3.5 h-3.5 inline opacity-50" />
                </td>
              </tr>
              <tr>
                <td className="py-2 border-b border-border text-muted-foreground">
                  Higher interest rate
                </td>
                <td className="py-2 border-b border-border text-center bg-fcu-mint-100">
                  <Minus className="w-3.5 h-3.5 inline opacity-50" />
                </td>
                <td className="py-2 border-b border-border text-center text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-fcu-primary-900 inline" />
                </td>
              </tr>
              <tr>
                <td className="py-2 border-b border-border text-muted-foreground">
                  Best for short-term goals
                </td>
                <td className="py-2 border-b border-border text-center bg-fcu-mint-100">
                  <Check className="w-3.5 h-3.5 text-fcu-primary-900 inline" />
                </td>
                <td className="py-2 border-b border-border text-center text-muted-foreground">
                  <Minus className="w-3.5 h-3.5 inline opacity-50" />
                </td>
              </tr>
              <tr>
                <td className="py-2 text-muted-foreground">
                  Staff-assisted withdrawal fee
                </td>
                <td className="py-2 text-center bg-fcu-mint-100">
                  <Minus className="w-3.5 h-3.5 inline opacity-50" />
                </td>
                <td className="py-2 text-center text-muted-foreground text-xs font-medium">
                  $5 (1 free/month)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-[11px] text-muted-foreground leading-relaxed">
          Saving long-term or want higher returns? Explore our{' '}
          <Link href="/accounts/savings" className="text-fcu-primary-900 hover:underline">
            savings accounts
          </Link>{' '}
          or{' '}
          <Link href="/accounts/term-deposits" className="text-fcu-primary-900 hover:underline">
            term deposits
          </Link>
          .
        </p>
      </div>

      {/* DCS Notice */}
      <div className="rounded-r-md border-l-[3px] border-l-fcu-mint-600 border border-border bg-muted/50 p-3.5 md:px-4 text-[13px] text-muted-foreground leading-relaxed mb-6">
        <strong className="text-foreground font-medium">
          Depositor Compensation Scheme:
        </strong>{' '}
        From 1 July 2025, the Special Purpose Account is covered by the
        Depositor Compensation Scheme.{' '}
        <Link href="/important-information" className="text-fcu-primary-900 hover:underline">
          See important information →
        </Link>
      </div>

      {/* Rates & Fees */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Rates &amp; fees
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Interest rates
          </h3>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Credit balance</span>
            <span className="font-medium text-fcu-primary-900">0.05% p.a.</span>
          </div>
          <div className="flex justify-between items-center py-1.5 text-[13px]">
            <span className="text-muted-foreground">Overdrawn balance</span>
            <span className="font-medium text-amber-600">20.00% p.a.</span>
          </div>
          <p className="mt-2.5 text-[11px] text-muted-foreground leading-relaxed">
            Want a higher rate on your savings? Explore our{' '}
            <Link href="/accounts/money-maker" className="text-fcu-primary-900 hover:underline">
              Money Maker Account
            </Link>{' '}
            (up to 3.00% p.a.) or{' '}
            <Link href="/accounts/term-deposits" className="text-fcu-primary-900 hover:underline">
              term deposits
            </Link>
            .
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Transaction fees
          </h3>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">All deposits</span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Cash withdrawal (branch)</span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Automatic payments</span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Direct debits &amp; bill payments</span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">NZ bank transfers</span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 text-[13px]">
            <span className="text-muted-foreground">Disputed transaction</span>
            <span className="font-medium text-foreground">$50.00</span>
          </div>
        </div>
      </div>

      {/* Debit card strip */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Debit card
      </p>
      <div className="rounded-lg border border-border bg-card p-5 mb-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
        <div className="w-16 h-11 rounded-md bg-linear-to-br from-fcu-primary-900 to-fcu-mint-600 flex flex-col justify-between p-1.5 px-2 shrink-0">
          <div className="w-3.5 h-2.5 rounded-sm bg-white/35" />
          <div className="flex">
            <div className="w-2.5 h-2.5 rounded-full bg-[#eb001b] -mr-1" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] opacity-75" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground mb-0.5">
            Mastercard® Debit Card
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Link your Mastercard Debit Card directly to your Special Purpose
            Account for easy access to your funds when your goal is reached. Use
            it in-store, online, and with contactless payments. First card
            issued free.
          </p>
        </div>
        <Link
          href="/debit-card"
          className="text-[13px] font-medium text-fcu-primary-900 hover:underline whitespace-nowrap"
        >
          View card details →
        </Link>
      </div>

      {/* FAQ */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Common questions
      </p>
      <div className="mb-6">
        <SpecialPurposeFaqSection />
      </div>

      {/* Related accounts */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Other transactional accounts
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6">
        <div className="rounded-lg border border-border bg-card p-4 md:px-5">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Everyday Account
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            Your main account for day-to-day spending, wages, and 24/7 banking
            access.
          </p>
          <Link
            href="/demo/everyday-account"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Apply online →
          </Link>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Bill Pay Account
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            Keep recurring bill payments separate from your savings and everyday
            spending.
          </p>
          <Link
            href="/demo/bill-pay-account"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Open an account →
          </Link>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Expense Account
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            Set aside money for regular expenses, separate from your everyday
            funds.
          </p>
          <Link
            href="/demo/expense-account"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Open an account →
          </Link>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="rounded-lg border border-fcu-mint-300 bg-fcu-mint-100 p-6 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h3 className="text-base font-medium text-fcu-primary-950 mb-1">
            Ready to open a Special Purpose Account?
          </h3>
          <p className="text-[13px] text-fcu-primary-900 leading-relaxed">
            Contact us by phone or visit a branch — our team will have you set
            up in no time. Call centre open Monday 10am–5pm and Tuesday–Friday
            8am–5pm.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-primary-950 transition-colors"
          >
            Contact us
          </Link>
          <Link
            href="/branches"
            className="inline-flex items-center border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-mint-100 transition-colors"
          >
            Find a branch
          </Link>
        </div>
      </div>
    </div>
  )
}
