import Link from 'next/link'
import {
  ChevronRight,
  PiggyBank,
  Wallet,
  Unlock,
  TrendingUp,
} from 'lucide-react'
import { LoanProviderFaqSection } from './_components/faq-section'

export const metadata = {
  title: 'Loan Provider Account | First Credit Union',
  description:
    'If you get a personal loan with us, you will need to open a Loan Provider Account and save a minimum of $5 per week. Funds remain frozen for the loan duration — so you come out of debt with savings.',
}

export default function LoanProviderAccountPage() {
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
          href="/accounts/savings"
          className="text-muted-foreground hover:text-foreground"
        >
          Savings
        </Link>
        <span aria-hidden className="opacity-50">
          <ChevronRight className="w-3 h-3 inline" />
        </span>
        <span className="text-foreground">Loan Provider Account</span>
      </nav>

      {/* Section label */}
      <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground mb-2">
        Savings accounts
      </p>

      {/* Hero */}
      <section
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 md:p-10 rounded-xl border border-fcu-mint-300 bg-fcu-mint-100 mb-6"
        aria-labelledby="hero-title"
      >
        <div>
          <span className="inline-block bg-fcu-mint-300 text-fcu-primary-950 text-[11px] font-semibold px-2.5 py-1 rounded-md mb-3">
            Come out of debt with savings
          </span>
          <h1
            id="hero-title"
            className="text-[28px] font-semibold text-fcu-primary-950 mb-2.5"
          >
            Loan Provider Account
          </h1>
          <p className="text-[15px] text-fcu-primary-900 leading-relaxed mb-6 max-w-[680px]">
            If you get a personal loan with us, you will need to open a Loan
            Provider Account and save a minimum of $5 per week. Funds remain
            frozen for the loan duration — so you come out of debt with savings.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/loans/apply"
              className="inline-flex items-center bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-fcu-primary-950 transition-colors"
            >
              Apply for a loan
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-fcu-mint-100 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>

        {/* Loan & savings progress visual */}
        <div className="hidden md:flex flex-col gap-2.5 p-5 rounded-xl border border-fcu-mint-300 bg-white">
          <span className="text-[11px] text-fcu-primary-900 font-semibold">
            Example — loan &amp; savings progress
          </span>
          <div>
            <div className="flex justify-between text-xs py-0.5">
              <span className="text-fcu-primary-950 font-medium">
                Loan remaining
              </span>
              <span className="text-fcu-primary-950 font-medium">$4,200</span>
            </div>
            <div className="h-2 rounded bg-fcu-mint-100 overflow-hidden">
              <div
                className="h-full rounded bg-amber-600"
                style={{ width: '42%' }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs py-0.5">
              <span className="text-fcu-primary-950 font-medium">
                Savings built up
              </span>
              <span className="text-fcu-primary-950 font-medium">$520</span>
            </div>
            <div className="h-2 rounded bg-fcu-mint-100 overflow-hidden">
              <div
                className="h-full rounded bg-fcu-primary-900"
                style={{ width: '52%' }}
              />
            </div>
          </div>
          <hr className="border-t border-fcu-mint-300" />
          <div className="flex items-center gap-1.5 text-[11px] text-fcu-primary-950">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
            Loan reduces with each repayment
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-fcu-primary-950">
            <div className="w-1.5 h-1.5 rounded-full bg-fcu-primary-900 shrink-0" />
            Savings grow — unlocked when loan is paid off
          </div>
        </div>
      </section>

      {/* Features */}
      <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground mb-2">
        What&apos;s included
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="w-8 h-8 rounded-lg bg-fcu-mint-100 flex items-center justify-center mb-2">
            <PiggyBank className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-semibold text-foreground mb-0.5">
            Build savings while you repay
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Save a minimum of $5 per week alongside your loan repayments
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="w-8 h-8 rounded-lg bg-fcu-mint-100 flex items-center justify-center mb-2">
            <Wallet className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-semibold text-foreground mb-0.5">
            No account fees
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            No monthly or joining fees on the account
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="w-8 h-8 rounded-lg bg-fcu-mint-100 flex items-center justify-center mb-2">
            <Unlock className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-semibold text-foreground mb-0.5">
            Funds unlock at loan end
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            When your loan is paid off, your savings are released — yours to keep
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="w-8 h-8 rounded-lg bg-fcu-mint-100 flex items-center justify-center mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-semibold text-foreground mb-0.5">
            1.50% p.a. interest
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Your savings earn interest while held in the account
          </p>
        </div>
      </div>

      {/* Amber notice - frozen funds warning */}
      <div className="rounded-r-lg border-l-[3px] border-l-amber-600 border border-amber-200 bg-amber-50 p-3.5 md:px-4 text-[13px] text-amber-800 leading-relaxed mb-6">
        <strong className="font-semibold">
          Important — funds are frozen:
        </strong>{' '}
        The Loan Provider Account is frozen for the duration of your personal
        loan. To withdraw, you must give 14 days notice or pay a $20 early
        withdrawal fee. All withdrawals must be made by{' '}
        <Link href="/contact" className="text-amber-800 underline hover:no-underline">
          contacting us
        </Link>{' '}
        directly.
      </div>

      {/* DCS Notice */}
      <div className="rounded-r-lg border-l-[3px] border-l-fcu-mint-600 border border-border bg-muted/50 p-3.5 md:px-4 text-[13px] text-muted-foreground leading-relaxed mb-6">
        <strong className="text-foreground font-semibold">
          Depositor Compensation Scheme:
        </strong>{' '}
        From 1 July 2025 this account is covered by the Depositor Compensation
        Scheme.{' '}
        <Link href="/important-information" className="text-fcu-primary-900 hover:underline">
          Learn more →
        </Link>
      </div>

      {/* Rates & Fees */}
      <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground mb-2">
        Rates &amp; fees
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Interest rate
          </h3>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Loan Provider Account</span>
            <span className="font-medium text-fcu-primary-900">1.50% p.a.</span>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Rates subject to change. See{' '}
            <Link href="/rates-fees" className="text-fcu-primary-900 hover:underline">
              Rates &amp; Fees
            </Link>{' '}
            for current rates.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Fees</h3>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Monthly account fee</span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-semibold">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">
              Withdrawal with 14 days notice
            </span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-semibold">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 text-[13px]">
            <span className="text-muted-foreground">
              Early withdrawal (without notice)
            </span>
            <span className="font-medium text-foreground">$20.00</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground mb-2">
        Common questions
      </p>
      <div className="mb-6">
        <LoanProviderFaqSection />
      </div>

      {/* Related accounts */}
      <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground mb-2">
        Related
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6">
        <div className="rounded-xl border border-border bg-card p-4 md:px-5">
          <h4 className="text-[13px] font-semibold text-foreground mb-1">
            Personal Loans
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Low-interest personal loans with no application or establishment
            fees.
          </p>
          <Link
            href="/loans/personal"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Learn more →
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 md:px-5">
          <h4 className="text-[13px] font-semibold text-foreground mb-1">
            Online Savings Account
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Flexible savings with 24/7 access and no withdrawal fees. 1.50%
            p.a.
          </p>
          <Link
            href="/accounts/online-savings"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Learn more →
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 md:px-5">
          <h4 className="text-[13px] font-semibold text-foreground mb-1">
            Money Maker Account
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2">
            Tiered savings rates up to 3.00% p.a. with full access to your
            funds.
          </p>
          <Link
            href="/accounts/money-maker"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Learn more →
          </Link>
        </div>
      </div>

      {/* Legal note */}
      <p className="text-[11px] text-muted-foreground leading-relaxed mb-4">
        First Credit Union Incorporated. Not a registered bank. See{' '}
        <Link href="/rates-fees" className="text-fcu-primary-900 hover:underline">
          Rates &amp; Fees
        </Link>{' '}
        for full details. Interest rates subject to change without notice.
      </p>

      {/* Contact CTA */}
      <div className="rounded-xl border border-fcu-mint-300 bg-fcu-mint-100 p-6 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h3 className="text-base font-semibold text-fcu-primary-950 mb-1">
            Interested in a personal loan?
          </h3>
          <p className="text-[13px] text-fcu-primary-900 leading-relaxed">
            Apply online or contact us to find out more. Call centre open
            Monday 10am–5pm and Tuesday–Friday 8am–5pm.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/loans/apply"
            className="inline-flex items-center bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-fcu-primary-950 transition-colors"
          >
            Apply for a loan
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-fcu-mint-100 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  )
}
