import Link from 'next/link'
import {
  ChevronRight,
  Wallet,
  Clock,
  Smartphone,
  CreditCard,
} from 'lucide-react'
import { TransactionalAccountsFaqSection } from './_components/faq-section'

export const metadata = {
  title: 'Transactional Accounts | First Credit Union',
  description:
    'Whether you need an account for day-to-day spending or to keep your bills separate, our transactional accounts are designed to make managing your money easy — with no monthly fees and 24/7 access.',
}

export default function TransactionalAccountsPage() {
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
        <span className="text-foreground">Transactional Accounts</span>
      </nav>

      {/* Section label */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Bank accounts
      </p>

      {/* Hero */}
      <section
        className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center p-8 md:p-10 rounded-lg border border-fcu-mint-300 bg-fcu-mint-100 mb-6"
        aria-labelledby="hero-title"
      >
        <div>
          <h1
            id="hero-title"
            className="text-[28px] font-medium text-fcu-primary-950 leading-snug mb-2.5"
          >
            Transactional Accounts
          </h1>
          <p className="text-[15px] text-fcu-primary-900 leading-relaxed mb-6 max-w-[520px]">
            Whether you need an account for day-to-day spending or to keep your
            bills separate, our transactional accounts are designed to make
            managing your money easy — with no monthly fees and 24/7 access.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/apply"
              className="inline-flex items-center bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-primary-950 transition-colors"
            >
              Become a member
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-mint-100 transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2.5 shrink-0">
          <div className="rounded-lg border border-fcu-mint-300 bg-white p-2.5 px-4 text-center min-w-[140px]">
            <div className="text-xl font-medium text-fcu-primary-950">$0</div>
            <div className="text-[11px] text-fcu-primary-900 mt-0.5">
              Monthly fees
            </div>
          </div>
          <div className="rounded-lg border border-fcu-mint-300 bg-white p-2.5 px-4 text-center min-w-[140px]">
            <div className="text-xl font-medium text-fcu-primary-950">24/7</div>
            <div className="text-[11px] text-fcu-primary-900 mt-0.5">
              Online &amp; mobile access
            </div>
          </div>
          <div className="rounded-lg border border-fcu-mint-300 bg-white p-2.5 px-4 text-center min-w-[140px]">
            <div className="text-xl font-medium text-fcu-primary-950">4</div>
            <div className="text-[11px] text-fcu-primary-900 mt-0.5">
              Account types
            </div>
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center">
            <Wallet className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground">
            No monthly fees
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            No account or joining fees — ever
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center">
            <Clock className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground">
            Free branch transactions
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Cash withdrawals &amp; deposits at the counter
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center">
            <Smartphone className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground">
            Mobile &amp; internet banking
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Manage your money anywhere, anytime
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 flex flex-col gap-2">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center">
            <CreditCard className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground">
            Mastercard® Debit Card
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Pay anywhere Mastercard is accepted
          </p>
        </div>
      </div>

      {/* DCS Notice */}
      <div className="rounded-r-md border-l-[3px] border-l-fcu-mint-600 border border-border bg-muted/50 p-3.5 md:px-4 text-[13px] text-muted-foreground leading-relaxed mb-6">
        <strong className="text-foreground font-medium">
          Depositor Compensation Scheme:
        </strong>{' '}
        From 1 July 2025, all transactional accounts are covered by the
        Depositor Compensation Scheme.{' '}
        <Link href="/important-information" className="text-fcu-primary-900 hover:underline">
          See important information →
        </Link>
      </div>

      {/* Account cards */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Choose an account to suit your needs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {/* Featured: Everyday Account */}
        <div className="relative rounded-lg border-2 border-fcu-mint-600 bg-card p-5 flex flex-col gap-2.5">
          <div className="absolute -top-px right-3.5 bg-fcu-mint-600 text-fcu-mint-100 text-[10px] font-medium px-2.5 py-0.5 rounded-b-md">
            Most popular
          </div>
          <h3 className="text-[15px] font-medium text-foreground">
            Everyday Account
          </h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">
            The perfect account for day-to-day purchases. Use it for wages,
            direct debits, automatic payments, and everyday spending — with 24/7
            internet and mobile banking access.
          </p>
          <div className="flex gap-1.5 flex-wrap mt-0.5">
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Wages &amp; salary
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Direct debits
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Debit card eligible
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border text-xs text-muted-foreground">
            <span>Credit interest rate</span>
            <span className="font-medium text-fcu-primary-900 text-[13px]">
              0.05% p.a.
            </span>
          </div>
          <Link
            href="/demo/everyday-account"
            className="inline-flex justify-center items-center bg-fcu-primary-900 text-fcu-mint-100 text-[13px] font-medium px-4 py-2 rounded-md hover:bg-fcu-primary-950 transition-colors"
          >
            Apply online
          </Link>
        </div>

        {/* Bill Pay Account */}
        <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-2.5">
          <h3 className="text-[15px] font-medium text-foreground">
            Bill Pay Account
          </h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">
            Keep your bill payments completely separate from your savings and
            everyday spending. Ideal for setting up automatic payments and
            direct debits for recurring bills.
          </p>
          <div className="flex gap-1.5 flex-wrap mt-0.5">
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Automatic payments
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Direct debits
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Debit card eligible
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border text-xs text-muted-foreground">
            <span>Credit interest rate</span>
            <span className="font-medium text-fcu-primary-900 text-[13px]">
              0.05% p.a.
            </span>
          </div>
          <Link
            href="/demo/bill-pay-account"
            className="inline-flex justify-center items-center border border-border text-foreground text-[13px] font-medium px-4 py-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Open an account
          </Link>
        </div>

        {/* Expense Account */}
        <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-2.5">
          <h3 className="text-[15px] font-medium text-foreground">
            Expense Account
          </h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">
            Manage your budget more easily by keeping money for expenses
            separate from your everyday funds. A practical tool for staying on
            top of regular outgoings.
          </p>
          <div className="flex gap-1.5 flex-wrap mt-0.5">
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Budget management
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Debit card eligible
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border text-xs text-muted-foreground">
            <span>Credit interest rate</span>
            <span className="font-medium text-fcu-primary-900 text-[13px]">
              0.05% p.a.
            </span>
          </div>
          <Link
            href="/demo/expense-account"
            className="inline-flex justify-center items-center border border-border text-foreground text-[13px] font-medium px-4 py-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Open an account
          </Link>
        </div>

        {/* Special Purpose Account */}
        <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-2.5">
          <h3 className="text-[15px] font-medium text-foreground">
            Special Purpose Account
          </h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">
            Short-term savings goals where your funds remain readily available.
            Perfect for setting aside money for a specific purpose while
            keeping it accessible when you need it.
          </p>
          <div className="flex gap-1.5 flex-wrap mt-0.5">
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Short-term goals
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-md bg-fcu-mint-100 text-fcu-primary-950 font-medium">
              Debit card eligible
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border text-xs text-muted-foreground">
            <span>Credit interest rate</span>
            <span className="font-medium text-fcu-primary-900 text-[13px]">
              0.05% p.a.
            </span>
          </div>
          <Link
            href="/demo/special-purpose-account"
            className="inline-flex justify-center items-center border border-border text-foreground text-[13px] font-medium px-4 py-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            Open an account
          </Link>
        </div>
      </div>

      {/* Debit card strip */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Payments
      </p>
      <div className="rounded-lg border border-border bg-card p-5 mb-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
        <div className="w-16 h-11 rounded-md bg-linear-to-br from-fcu-primary-900 to-fcu-mint-600 flex flex-col justify-between p-1.5 px-2 shrink-0">
          <div className="w-3.5 h-2.5 rounded-sm bg-white/35" />
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#eb001b] -mr-1" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] opacity-75" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground mb-0.5">
            Mastercard® Debit Card
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Link your debit card to any eligible transactional account. Use it
            in-store, online, overseas, and with contactless payments. First
            card issued free. Protected by Mastercard® ID Check for secure
            online shopping.
          </p>
        </div>
        <Link
          href="/debit-card"
          className="text-[13px] font-medium text-fcu-primary-900 hover:underline whitespace-nowrap"
        >
          View card details →
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
            <span className="text-muted-foreground">Everyday Account (credit)</span>
            <span className="font-medium text-fcu-primary-900">0.05% p.a.</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Bill Pay Account</span>
            <span className="font-medium text-fcu-primary-900">0.05% p.a.</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Expense Account</span>
            <span className="font-medium text-fcu-primary-900">0.05% p.a.</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Special Purpose Account</span>
            <span className="font-medium text-fcu-primary-900">0.05% p.a.</span>
          </div>
          <div className="flex justify-between items-center py-1.5 text-[13px]">
            <span className="text-muted-foreground">Overdrawn balance</span>
            <span className="font-medium text-amber-600">20.00% p.a.</span>
          </div>
          <p className="mt-2.5 text-[11px] text-muted-foreground leading-relaxed">
            Want higher returns? Explore our{' '}
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
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Internet &amp; phone banking</span>
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

      {/* Ways to bank */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Ways to bank
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6">
        <div className="rounded-lg border border-border bg-card p-4 md:px-5">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Mobile banking
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            Manage your accounts on the go. Download the FCU app from the Apple
            App Store or Google Play. View balances, make payments, manage
            cards, and set up your PIN.
          </p>
          <Link
            href="/mobile-banking"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Learn more →
          </Link>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Internet banking
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            Full account access from your browser — anywhere, anytime. Set up
            automatic payments, transfer funds, and view your statement
            history.
          </p>
          <Link
            href="/internet-banking"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Learn more →
          </Link>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:px-5">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            In branch
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5">
            Visit your nearest branch for cash transactions, account setup, card
            ordering, and face-to-face support from our team.
          </p>
          <Link
            href="/branches"
            className="text-xs font-medium text-fcu-primary-900 hover:underline"
          >
            Find a branch →
          </Link>
        </div>
        <div className="rounded-md border border-border bg-muted/50 p-3 px-4 text-xs text-muted-foreground leading-relaxed col-span-full mt-2.5">
          <strong className="text-foreground font-medium">
            Online &amp; mobile banking payment limits:
          </strong>{' '}
          Limits vary by member. New accounts opened from 1 June 2025 have a
          daily payment limit of NZD 2,000. Contact us to discuss your limit.
        </div>
      </div>

      {/* FAQ */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-2">
        Common questions
      </p>
      <div className="mb-6">
        <TransactionalAccountsFaqSection />
      </div>

      {/* Contact CTA */}
      <div className="rounded-lg border border-fcu-mint-300 bg-fcu-mint-100 p-6 flex flex-col md:flex-row justify-between items-start gap-6">
        <div>
          <h3 className="text-base font-medium text-fcu-primary-950 mb-1">
            Ready to open an account?
          </h3>
          <p className="text-[13px] text-fcu-primary-900 leading-relaxed">
            New members can apply online. Existing members can contact us or
            visit a branch to add an account. Our call centre is open Monday
            10am–5pm and Tuesday–Friday 8am–5pm.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/apply"
            className="inline-flex items-center bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-primary-950 transition-colors"
          >
            Become a member
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
