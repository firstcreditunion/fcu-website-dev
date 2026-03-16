import Link from 'next/link';
import { Wallet, Clock, LayoutGrid, CreditCard } from 'lucide-react';
import { ExpenseAccountFaq } from './_components/expense-account-faq';

export const metadata = {
  title: 'Expense Account | First Credit Union',
  description:
    'Take control of your budget with an Expense Account. Keep your expense money separate from everyday funds. No monthly fees. Apply at First Credit Union, Hamilton NZ.',
};

export default function ExpenseAccountPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-6">
      {/* BREADCRUMB */}
      <nav
        className="text-xs text-muted-foreground mb-6 flex gap-1.5 items-center flex-wrap"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="text-muted-foreground no-underline hover:underline">
          Home
        </Link>
        <span aria-hidden>›</span>
        <Link
          href="/demo"
          className="text-muted-foreground no-underline hover:underline"
        >
          Accounts
        </Link>
        <span aria-hidden>›</span>
        <Link
          href="/demo"
          className="text-muted-foreground no-underline hover:underline"
        >
          Transactional
        </Link>
        <span aria-hidden>›</span>
        <span className="opacity-50">Expense Account</span>
      </nav>

      {/* HERO */}
      <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase mb-2">
        Transactional accounts
      </p>
      <div className="bg-fcu-mint-100 border border-fcu-mint-300 rounded-lg p-8 md:p-10 mb-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-block bg-fcu-mint-300 text-fcu-primary-950 text-[11px] font-medium px-2.5 py-1 rounded-md mb-3">
            No monthly fees
          </span>
          <h1 className="text-2xl font-medium text-fcu-primary-950 leading-tight mb-2.5">
            Expense Account
          </h1>
          <p className="text-[15px] text-fcu-primary-900 leading-relaxed mb-6">
            Take control of your budget by keeping your expense money completely
            separate from your everyday funds. A simple, practical way to stay on
            top of what you&apos;re spending.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/contact"
              className="inline-block bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-md no-underline"
            >
              Contact us to open
            </Link>
            <Link
              href="/find-a-branch"
              className="inline-block border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-md no-underline"
            >
              Find a branch
            </Link>
          </div>
        </div>
        {/* BUDGET VISUAL */}
        <div className="bg-white border border-fcu-mint-300 rounded-lg p-5">
          <p className="text-[11px] text-fcu-primary-900 mb-2 font-medium">
            Example — monthly expenses
          </p>
          <div className="flex justify-between text-xs mb-3">
            <span className="text-fcu-primary-950">Rent</span>
            <span className="font-medium text-fcu-primary-950">$1,200</span>
          </div>
          <div className="bg-fcu-mint-100 rounded h-2 mb-3 overflow-hidden">
            <div
              className="h-full rounded bg-fcu-primary-900"
              style={{ width: '80%' }}
            />
          </div>
          <div className="flex justify-between text-xs mb-3">
            <span className="text-fcu-primary-950">Power & internet</span>
            <span className="font-medium text-fcu-primary-950">$180</span>
          </div>
          <div className="bg-fcu-mint-100 rounded h-2 mb-3 overflow-hidden">
            <div
              className="h-full rounded bg-fcu-primary-900"
              style={{ width: '30%' }}
            />
          </div>
          <div className="flex justify-between text-xs mb-3">
            <span className="text-fcu-primary-950">Insurance</span>
            <span className="font-medium text-fcu-primary-950">$95</span>
          </div>
          <div className="bg-fcu-mint-100 rounded h-2 mb-3 overflow-hidden">
            <div
              className="h-full rounded bg-fcu-primary-900"
              style={{ width: '20%' }}
            />
          </div>
          <div className="flex justify-between text-xs mb-3">
            <span className="text-fcu-primary-950">Subscriptions</span>
            <span className="font-medium text-fcu-primary-950">$45</span>
          </div>
          <div className="bg-fcu-mint-100 rounded h-2 mb-3 overflow-hidden">
            <div
              className="h-full rounded bg-fcu-primary-900"
              style={{ width: '10%' }}
            />
          </div>
          <hr className="border-t border-fcu-mint-300 my-2" />
          <div className="flex justify-between text-[13px] font-medium text-fcu-primary-950">
            <span>Total set aside</span>
            <span>$1,520</span>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase mb-2">
        What&apos;s included
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="w-[30px] h-[30px] rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2">
            <Wallet className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            No account fees
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            No monthly or joining fees — ever
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="w-[30px] h-[30px] rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2">
            <Clock className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            24/7 access
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            Online and mobile banking around the clock
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="w-[30px] h-[30px] rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2">
            <LayoutGrid className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            Separate from everyday
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            Distinct account keeps expense funds ringfenced
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="w-[30px] h-[30px] rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2">
            <CreditCard className="w-3.5 h-3.5 text-fcu-primary-900" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            Debit card eligible
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            Link your Mastercard® Debit Card to this account
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase mb-2">
        How it works
      </p>
      <div className="bg-card border border-border rounded-lg p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          <div className="md:pr-4 md:border-r md:border-border pb-4 md:pb-0 md:border-b-0">
            <div className="w-6 h-6 rounded-full bg-fcu-mint-100 text-fcu-primary-900 text-xs font-medium flex items-center justify-center mb-2">
              1
            </div>
            <h4 className="text-[13px] font-medium text-foreground mb-1">
              Open your Expense Account
            </h4>
            <p className="text-xs text-muted-foreground leading-snug">
              Contact us or visit a branch to open an Expense Account alongside
              your existing accounts.
            </p>
          </div>
          <div className="md:px-4 md:border-r md:border-border pb-4 md:pb-0 md:border-b-0">
            <div className="w-6 h-6 rounded-full bg-fcu-mint-100 text-fcu-primary-900 text-xs font-medium flex items-center justify-center mb-2">
              2
            </div>
            <h4 className="text-[13px] font-medium text-foreground mb-1">
              Set up a regular transfer
            </h4>
            <p className="text-xs text-muted-foreground leading-snug">
              Use internet or mobile banking to set up an automatic payment into
              your Expense Account each payday.
            </p>
          </div>
          <div className="md:pl-4">
            <div className="w-6 h-6 rounded-full bg-fcu-mint-100 text-fcu-primary-900 text-xs font-medium flex items-center justify-center mb-2">
              3
            </div>
            <h4 className="text-[13px] font-medium text-foreground mb-1">
              Pay your expenses from it
            </h4>
            <p className="text-xs text-muted-foreground leading-snug">
              Set up direct debits and automatic payments from this account for
              rent, power, insurance, and other regular outgoings.
            </p>
          </div>
        </div>
      </div>

      {/* NOTICE */}
      <div className="rounded-r-md bg-muted border border-border border-l-4 border-l-fcu-mint-600 py-2.5 px-3.5 text-[13px] text-muted-foreground leading-snug mb-6">
        <strong className="text-foreground font-medium">
          Depositor Compensation Scheme:
        </strong>{' '}
        From 1 July 2025, the Expense Account is covered by the Depositor
        Compensation Scheme.{' '}
        <Link
          href="/depositor-compensation"
          className="text-fcu-primary-900 no-underline hover:underline"
        >
          See important information →
        </Link>
      </div>

      {/* RATES & FEES */}
      <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase mb-2">
        Rates & fees
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Interest rates
          </h3>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Credit balance</span>
            <span className="font-medium text-fcu-primary-900">0.05% p.a.</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Overdrawn balance</span>
            <span className="font-medium text-amber-600">20.00% p.a.</span>
          </div>
          <p className="mt-2.5 text-[11px] text-muted-foreground leading-snug">
            Looking for higher returns? Explore our{' '}
            <Link
              href="/demo/savings"
              className="text-fcu-primary-900 no-underline hover:underline"
            >
              savings accounts
            </Link>{' '}
            or{' '}
            <Link
              href="/demo/term-deposits"
              className="text-fcu-primary-900 no-underline hover:underline"
            >
              term deposits
            </Link>
            .
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
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
            <span className="text-muted-foreground">
              Direct debits & bill payments
            </span>
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

      {/* DEBIT CARD STRIP */}
      <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase mb-2">
        Debit card
      </p>
      <div className="bg-card border border-border rounded-lg p-5 mb-6 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
        <div className="w-16 h-[42px] bg-gradient-to-br from-fcu-primary-900 to-fcu-mint-600 rounded-md flex flex-col justify-between p-1.5 px-2 shrink-0">
          <div className="w-3.5 h-2.5 bg-white/35 rounded-sm" />
          <div className="flex">
            <div className="w-2.5 h-2.5 rounded-full bg-[#eb001b] -mr-1" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#f79e1b] opacity-75" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-foreground mb-1">
            Mastercard® Debit Card
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            You can link your Mastercard Debit Card to your Expense Account. Use
            it in-store, online, and with contactless payments. First card
            issued free. Physical card arrives within 7–10 working days — your
            digital card is available immediately via the mobile app.
          </p>
        </div>
        <Link
          href="/demo/debit-card"
          className="text-[13px] font-medium text-fcu-primary-900 no-underline whitespace-nowrap hover:underline"
        >
          View card details →
        </Link>
      </div>

      {/* FAQ */}
      <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase mb-2">
        Common questions
      </p>
      <div className="mb-6">
        <ExpenseAccountFaq />
      </div>

      {/* RELATED ACCOUNTS */}
      <p className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase mb-2">
        Other transactional accounts
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6">
        <div className="bg-card border border-border rounded-lg px-5 py-4">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Everyday Account
          </h4>
          <p className="text-xs text-muted-foreground leading-snug mb-2.5">
            Your main account for day-to-day spending, wages, and 24/7 banking
            access.
          </p>
          <Link
            href="/demo/everyday-account"
            className="text-xs text-fcu-primary-900 font-medium no-underline hover:underline"
          >
            Apply online →
          </Link>
        </div>
        <div className="bg-card border border-border rounded-lg px-5 py-4">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Bill Pay Account
          </h4>
          <p className="text-xs text-muted-foreground leading-snug mb-2.5">
            Keep your bill payments separate from savings and everyday spending.
          </p>
          <Link
            href="/demo/bill-pay-account"
            className="text-xs text-fcu-primary-900 font-medium no-underline hover:underline"
          >
            Open an account →
          </Link>
        </div>
        <div className="bg-card border border-border rounded-lg px-5 py-4">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Special Purpose Account
          </h4>
          <p className="text-xs text-muted-foreground leading-snug mb-2.5">
            Short-term savings goals with funds kept readily available when you
            need them.
          </p>
          <Link
            href="/demo/special-purpose-account"
            className="text-xs text-fcu-primary-900 font-medium no-underline hover:underline"
          >
            Open an account →
          </Link>
        </div>
      </div>

      {/* CONTACT CTA */}
      <div className="bg-fcu-mint-100 border border-fcu-mint-300 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-base font-medium text-fcu-primary-950 mb-1">
            Ready to open an Expense Account?
          </h3>
          <p className="text-[13px] text-fcu-primary-900 leading-snug">
            Contact us by phone or visit a branch — our team will have you set up
            in no time. Call centre open Monday 10am–5pm and Tuesday–Friday
            8am–5pm.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/contact"
            className="inline-block bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-md no-underline"
          >
            Contact us
          </Link>
          <Link
            href="/find-a-branch"
            className="inline-block border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-md no-underline"
          >
            Find a branch
          </Link>
        </div>
      </div>
    </div>
  );
}
