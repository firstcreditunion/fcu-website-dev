import Link from 'next/link';
import {
  Clock,
  CreditCard,
  Smartphone,
  Banknote,
  ChevronRight,
} from 'lucide-react';
import { FaqSection } from './_components/faq-section';

export const metadata = {
  title: 'Everyday Account | First Credit Union',
  description:
    'The perfect account for your day-to-day purchases. 24/7 access with internet and mobile banking, plus a Mastercard® Debit Card for spending anywhere. No monthly fees.',
};

export default function EverydayAccountPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav
        className="flex gap-1.5 items-center text-xs text-muted-foreground mb-6"
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
        <span className="text-foreground">Everyday Account</span>
      </nav>

      {/* Section: Transactional accounts */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-1.5">
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
            Everyday Account
          </h1>
          <p className="text-[15px] text-fcu-primary-900 leading-relaxed mb-6">
            The perfect account for your day-to-day purchases. 24/7 access with
            internet and mobile banking, plus a Mastercard® Debit Card for
            spending anywhere.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/apply/everyday-account"
              className="inline-flex items-center bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-primary-950 transition-colors"
            >
              Open account online
            </Link>
            <Link
              href="/accounts/everyday-account/learn-more"
              className="inline-flex items-center border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-mint-100 transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
        <div className="hidden md:flex bg-fcu-mint-600 rounded-lg h-40 items-center justify-center text-fcu-primary-950 text-[13px] font-medium border border-fcu-mint-600">
          <svg
            viewBox="0 0 160 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-40 h-[100px]"
            aria-hidden
          >
            <rect
              x="10"
              y="15"
              width="140"
              height="70"
              rx="8"
              fill="currentColor"
              className="text-fcu-primary-950 opacity-90"
            />
            <rect
              x="20"
              y="30"
              width="22"
              height="16"
              rx="3"
              className="fill-fcu-mint-500 opacity-60"
            />
            <text
              x="20"
              y="70"
              fontFamily="sans-serif"
              fontSize="9"
              className="fill-fcu-mint-300 opacity-90"
            >
              FIRST CREDIT UNION
            </text>
            <circle
              cx="128"
              cy="55"
              r="11"
              className="fill-fcu-mint-100 opacity-40"
            />
            <circle
              cx="138"
              cy="55"
              r="11"
              className="fill-fcu-mint-300 opacity-50"
            />
            <text
              x="78"
              y="72"
              fontFamily="sans-serif"
              fontSize="8"
              className="fill-fcu-mint-300 opacity-70"
            >
              MASTERCARD® DEBIT
            </text>
          </svg>
        </div>
      </section>

      {/* Section: What's included */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-1.5">
        What&apos;s included
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
        <article className="bg-card border border-border rounded-lg p-4">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2.5 text-fcu-primary-900">
            <Clock className="w-4 h-4" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            24/7 access
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            Online and mobile banking around the clock
          </p>
        </article>
        <article className="bg-card border border-border rounded-lg p-4">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2.5 text-fcu-primary-900">
            <CreditCard className="w-4 h-4" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            No account fees
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            No monthly or joining fees ever
          </p>
        </article>
        <article className="bg-card border border-border rounded-lg p-4">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2.5 text-fcu-primary-900">
            <Smartphone className="w-4 h-4" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            Mobile banking
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            Manage money from your phone
          </p>
        </article>
        <article className="bg-card border border-border rounded-lg p-4">
          <div className="w-8 h-8 rounded-md bg-fcu-mint-100 flex items-center justify-center mb-2.5 text-fcu-primary-900">
            <Banknote className="w-4 h-4" />
          </div>
          <h3 className="text-[13px] font-medium text-foreground mb-1">
            Wages & direct debits
          </h3>
          <p className="text-xs text-muted-foreground leading-snug">
            Ideal for salary deposits and auto-payments
          </p>
        </article>
      </div>

      {/* Notice bar - DCS */}
      <aside
        className="bg-muted border border-border border-l-4 border-l-fcu-mint-600 rounded-r-md py-2.5 px-3.5 text-[13px] text-muted-foreground leading-snug mb-6"
        role="note"
      >
        <strong className="text-foreground font-medium">
          Depositor Compensation Scheme:
        </strong>{' '}
        From 1 July 2025, this account is covered by the Depositor Compensation
        Scheme.{' '}
        <Link
          href="/important-information/depositor-compensation"
          className="text-fcu-primary-900 font-medium hover:underline"
        >
          Learn more →
        </Link>
      </aside>

      {/* Section: Rates & fees */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-1.5">
        Rates & fees
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <article className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Interest rates
          </h3>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Credit balance</span>
            <span className="font-medium text-fcu-primary-900">0.05% p.a.</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px] last:border-b-0">
            <span className="text-muted-foreground">Overdrawn balance</span>
            <span className="font-medium text-amber-600">20.00% p.a.</span>
          </div>
          <p className="mt-2.5 text-[11px] text-muted-foreground leading-snug">
            Looking for higher returns? See our{' '}
            <Link
              href="/accounts/savings"
              className="text-fcu-primary-900 font-medium hover:underline"
            >
              savings accounts
            </Link>{' '}
            or{' '}
            <Link
              href="/accounts/term-deposits"
              className="text-fcu-primary-900 font-medium hover:underline"
            >
              term deposits
            </Link>
            .
          </p>
        </article>
        <article className="bg-card border border-border rounded-lg p-5">
          <h3 className="text-sm font-medium text-foreground mb-3">
            Transaction fees
          </h3>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">Deposits (all types)</span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-border text-[13px]">
            <span className="text-muted-foreground">
              Cash withdrawal (branch)
            </span>
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
            <span className="text-muted-foreground">Transfers (NZ accounts)</span>
            <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-medium">
              Free
            </span>
          </div>
          <div className="flex justify-between items-center py-1.5 text-[13px]">
            <span className="text-muted-foreground">Disputed transaction</span>
            <span className="font-medium text-foreground">$50.00</span>
          </div>
        </article>
      </div>

      {/* Section: Debit card */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-1.5">
        Debit card
      </p>
      <section className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 items-start bg-card border border-border rounded-lg p-5 mb-6">
        <div>
          <h3 className="text-[15px] font-medium text-foreground mb-2">
            Mastercard® Debit Card
          </h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">
            Use your Everyday Account with a Mastercard Debit Card — spend
            online, in-store, and overseas using your own money. Contactless
            payments supported wherever you see the PayWave symbol.
          </p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground text-xs">
                First card issued
              </span>
              <span className="bg-fcu-mint-100 text-fcu-primary-950 text-[11px] px-2 py-0.5 rounded-md font-medium">
                Free
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground text-xs">
                Replacement card
              </span>
              <span className="text-foreground text-xs font-medium">$13</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground text-xs">
                Admin fee (6-monthly)
              </span>
              <span className="text-foreground text-xs font-medium">$5</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-muted-foreground text-xs">
                Eftpos / contactless
              </span>
              <span className="text-foreground text-xs font-medium">$0.35</span>
            </div>
          </div>
          <Link
            href="/debit-card/fees-features"
            className="text-[13px] text-fcu-primary-900 font-medium hover:underline"
          >
            Full Mastercard fees & features →
          </Link>
        </div>
        <div>
          <div className="bg-gradient-to-br from-fcu-primary-900 to-fcu-mint-600 rounded-xl h-[120px] flex flex-col justify-between p-3.5">
            <div>
              <div className="w-7 h-5 bg-white/30 rounded" />
            </div>
            <div className="flex justify-between items-end">
              <span className="text-xs text-white/90 font-medium">
                First Credit Union
              </span>
              <div className="flex">
                <div
                  className="w-5 h-5 rounded-full bg-[#eb001b] -mr-2"
                  aria-hidden
                />
                <div
                  className="w-5 h-5 rounded-full bg-[#f79e1b] opacity-70"
                  aria-hidden
                />
              </div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2 text-center leading-snug">
            Mastercard® ID Check protects your online purchases
          </p>
        </div>
      </section>

      {/* Section: FAQ */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-1.5">
        Common questions
      </p>
      <div className="mb-6">
        <FaqSection />
      </div>

      {/* Section: Related accounts */}
      <p className="text-[11px] font-medium tracking-wider uppercase text-muted-foreground mb-1.5">
        Other transactional accounts
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6">
        <article className="bg-card border border-border rounded-lg px-5 py-4">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Bill Pay Account
          </h4>
          <p className="text-xs text-muted-foreground leading-snug mb-2.5">
            Keep bill payments separate from everyday spending. Set up automatic
            payments and direct debits.
          </p>
          <Link
            href="/demo/bill-pay-account"
            className="text-xs text-fcu-primary-900 font-medium hover:underline"
          >
            Open an account →
          </Link>
        </article>
        <article className="bg-card border border-border rounded-lg px-5 py-4">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Expense Account
          </h4>
          <p className="text-xs text-muted-foreground leading-snug mb-2.5">
            Manage your budget by keeping expense money separate from your
            everyday funds.
          </p>
          <Link
            href="/demo/expense-account"
            className="text-xs text-fcu-primary-900 font-medium hover:underline"
          >
            Open an account →
          </Link>
        </article>
        <article className="bg-card border border-border rounded-lg px-5 py-4">
          <h4 className="text-sm font-medium text-foreground mb-1.5">
            Special Purpose Account
          </h4>
          <p className="text-xs text-muted-foreground leading-snug mb-2.5">
            Short-term savings goals with funds kept readily available whenever
            you need them.
          </p>
          <Link
            href="/demo/special-purpose-account"
            className="text-xs text-fcu-primary-900 font-medium hover:underline"
          >
            Open an account →
          </Link>
        </article>
      </div>

      {/* Contact CTA */}
      <section
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 rounded-lg border border-fcu-mint-300 bg-fcu-mint-100"
        aria-labelledby="contact-cta-title"
      >
        <div>
          <h3
            id="contact-cta-title"
            className="text-base font-medium text-fcu-primary-950 mb-1"
          >
            Ready to open your Everyday Account?
          </h3>
          <p className="text-[13px] text-fcu-primary-900">
            Apply online in minutes, or call us Monday–Friday. Our team is happy
            to help.
          </p>
        </div>
        <div className="flex gap-2.5 flex-shrink-0">
          <Link
            href="/apply/everyday-account"
            className="inline-flex items-center bg-fcu-primary-900 text-fcu-mint-100 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-primary-950 transition-colors"
          >
            Apply online
          </Link>
          <Link
            href="/contact/branches"
            className="inline-flex items-center border border-fcu-primary-900 text-fcu-primary-900 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-fcu-mint-100 transition-colors"
          >
            Find a branch
          </Link>
        </div>
      </section>
    </div>
  );
}
