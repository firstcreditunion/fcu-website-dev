import Link from 'next/link'
import {
  CreditCard,
  ListChecks,
  Clock,
  Wallet,
} from 'lucide-react'
import { BillPayAccountFaq } from './_components/BillPayAccountFaq'

export const metadata = {
  title: 'Bill Pay Account | First Credit Union',
  description:
    'Keep your regular bill payments in one dedicated place. The Bill Pay Account separates committed payments from everyday spending — no monthly fees, automatic payments, and debit card eligible.',
}

export default function BillPayAccountPage() {
  return (
    <div className="mx-auto max-w-[900px] px-4 py-6">
      {/* BREADCRUMB */}
      <nav
        className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <span aria-hidden className="opacity-50">
          ›
        </span>
        <Link
          href="/accounts"
          className="text-muted-foreground hover:text-foreground"
        >
          Accounts
        </Link>
        <span aria-hidden className="opacity-50">
          ›
        </span>
        <Link
          href="/accounts/transactional-accounts"
          className="text-muted-foreground hover:text-foreground"
        >
          Transactional
        </Link>
        <span aria-hidden className="opacity-50">
          ›
        </span>
        <span className="text-foreground">Bill Pay Account</span>
      </nav>

      {/* HERO */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Transactional accounts
      </p>
      <section
        className="mb-6 grid gap-8 rounded-lg border border-fcu-mint-300 bg-fcu-mint-100 p-8 md:grid-cols-2 md:items-center"
        aria-labelledby="bill-pay-heading"
      >
        <div>
          <span className="mb-3 inline-block rounded-md bg-fcu-mint-300 px-2.5 py-1 text-[11px] font-medium text-fcu-primary-950">
            No monthly fees
          </span>
          <h1
            id="bill-pay-heading"
            className="mb-2.5 text-[26px] font-medium leading-tight text-fcu-primary-950"
          >
            Bill Pay Account
          </h1>
          <p className="mb-6 text-[15px] leading-relaxed text-fcu-primary-900">
            Stop mixing bills with your everyday spending. The Bill Pay Account
            keeps all your regular payments in one dedicated place — so you
            always know what&apos;s committed and what&apos;s yours to spend.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/contact"
              className="inline-block rounded-md bg-fcu-primary-900 px-5 py-2.5 text-sm font-medium text-fcu-mint-100 no-underline hover:bg-fcu-primary-800"
            >
              Contact us to open
            </Link>
            <Link
              href="/branches"
              className="inline-block rounded-md border border-fcu-primary-900 px-5 py-2.5 text-sm font-medium text-fcu-primary-900 no-underline hover:bg-fcu-primary-900/5"
            >
              Find a branch
            </Link>
          </div>
        </div>

        {/* BILL SCHEDULE VISUAL */}
        <div className="hidden flex-col gap-2 rounded-lg border border-fcu-mint-300 bg-white p-5 md:flex">
          <p className="mb-0.5 text-[11px] font-medium text-fcu-primary-900">
            Example — scheduled bills
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-md bg-fcu-mint-100 px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="size-2 shrink-0 rounded-full bg-fcu-primary-900" />
                <div>
                  <div className="text-xs font-medium text-fcu-primary-950">
                    Mortgage / rent
                  </div>
                  <div className="text-[11px] text-fcu-primary-900">
                    Fortnightly AP
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-fcu-mint-300 px-1.5 py-0.5 text-[10px] font-medium text-fcu-primary-950">
                  Auto
                </span>
                <span className="text-[13px] font-medium text-fcu-primary-950">
                  $900
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md bg-fcu-mint-100 px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="size-2 shrink-0 rounded-full bg-fcu-primary-900" />
                <div>
                  <div className="text-xs font-medium text-fcu-primary-950">
                    Power &amp; gas
                  </div>
                  <div className="text-[11px] text-fcu-primary-900">
                    Monthly DD
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-fcu-mint-300 px-1.5 py-0.5 text-[10px] font-medium text-fcu-primary-950">
                  Auto
                </span>
                <span className="text-[13px] font-medium text-fcu-primary-950">
                  $160
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md bg-fcu-mint-100 px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="size-2 shrink-0 rounded-full bg-fcu-primary-900" />
                <div>
                  <div className="text-xs font-medium text-fcu-primary-950">
                    Phone &amp; internet
                  </div>
                  <div className="text-[11px] text-fcu-primary-900">
                    Monthly DD
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-fcu-mint-300 px-1.5 py-0.5 text-[10px] font-medium text-fcu-primary-950">
                  Auto
                </span>
                <span className="text-[13px] font-medium text-fcu-primary-950">
                  $110
                </span>
              </div>
            </div>
          </div>
          <hr className="border-t border-fcu-mint-300" />
          <div className="flex justify-between py-1 text-[13px] font-medium text-fcu-primary-950">
            <span>Committed this month</span>
            <span>$1,170</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        What&apos;s included
      </p>
      <div className="mb-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="mb-2 flex size-[30px] items-center justify-center rounded-md bg-fcu-mint-100 text-fcu-primary-900">
            <CreditCard className="size-3.5" />
          </div>
          <h3 className="mb-1 text-[13px] font-medium text-foreground">
            No account fees
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            No monthly or joining fees — ever
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="mb-2 flex size-[30px] items-center justify-center rounded-md bg-fcu-mint-100 text-fcu-primary-900">
            <ListChecks className="size-3.5" />
          </div>
          <h3 className="mb-1 text-[13px] font-medium text-foreground">
            Bills stay separate
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Dedicated account keeps committed funds ringfenced from savings and
            spending
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="mb-2 flex size-[30px] items-center justify-center rounded-md bg-fcu-mint-100 text-fcu-primary-900">
            <Clock className="size-3.5" />
          </div>
          <h3 className="mb-1 text-[13px] font-medium text-foreground">
            Automatic payments
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Set up APs, direct debits, and bill payments to run automatically
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-4">
          <div className="mb-2 flex size-[30px] items-center justify-center rounded-md bg-fcu-mint-100 text-fcu-primary-900">
            <Wallet className="size-3.5" />
          </div>
          <h3 className="mb-1 text-[13px] font-medium text-foreground">
            Debit card eligible
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Link your Mastercard® Debit Card to this account if needed
          </p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        How it works
      </p>
      <div className="mb-6 rounded-lg border border-border bg-background p-5">
        <div className="grid gap-0 md:grid-cols-3 md:gap-0">
          <div className="border-b border-border px-0 pb-4 last:border-b-0 md:border-b-0 md:border-r md:px-4 md:pb-0 md:pr-4 last:md:border-r-0 last:md:pr-0">
            <div className="mb-2 flex size-6 items-center justify-center rounded-full bg-fcu-mint-100 text-xs font-medium text-fcu-primary-900">
              1
            </div>
            <h4 className="mb-1 text-[13px] font-medium text-foreground">
              Open your Bill Pay Account
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Contact us or visit a branch to open a Bill Pay Account alongside
              your existing accounts.
            </p>
          </div>
          <div className="border-b border-border px-0 pb-4 last:border-b-0 md:border-b-0 md:border-r md:px-4 md:pb-0 md:pr-4 last:md:border-r-0 last:md:pr-0">
            <div className="mb-2 flex size-6 items-center justify-center rounded-full bg-fcu-mint-100 text-xs font-medium text-fcu-primary-900">
              2
            </div>
            <h4 className="mb-1 text-[13px] font-medium text-foreground">
              Fund it each payday
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Set up an automatic payment from your Everyday Account into your
              Bill Pay Account so the money is ready before bills fall due.
            </p>
          </div>
          <div className="border-b border-border px-0 pb-4 last:border-b-0 md:border-b-0 md:border-r md:px-4 md:pb-0 md:pr-4 last:md:border-r-0 last:md:pr-0">
            <div className="mb-2 flex size-6 items-center justify-center rounded-full bg-fcu-mint-100 text-xs font-medium text-fcu-primary-900">
              3
            </div>
            <h4 className="mb-1 text-[13px] font-medium text-foreground">
              Bills pay themselves
            </h4>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Point all your direct debits, automatic payments, and bill
              payments at this account. Your other accounts stay clean and
              unaffected.
            </p>
          </div>
        </div>
      </div>

      {/* DCS NOTICE */}
      <aside
        className="mb-6 rounded-r-md border border-l-4 border-l-fcu-mint-600 border-border bg-muted/50 px-4 py-2.5 text-[13px] leading-relaxed text-muted-foreground"
        role="note"
      >
        <strong className="font-medium text-foreground">
          Depositor Compensation Scheme:
        </strong>{' '}
        From 1 July 2025, the Bill Pay Account is covered by the Depositor
        Compensation Scheme.{' '}
        <Link
          href="/depositor-compensation-scheme"
          className="font-medium text-fcu-primary-900 no-underline hover:underline"
        >
          See important information →
        </Link>
      </aside>

      {/* RATES & FEES */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Rates &amp; fees
      </p>
      <div className="mb-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-background p-5">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Interest rates
          </h3>
          <div className="space-y-0">
            <div className="flex items-center justify-between border-b border-border py-1.5 text-[13px]">
              <span className="text-muted-foreground">Credit balance</span>
              <span className="font-medium text-fcu-primary-900">0.05% p.a.</span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-1.5 text-[13px]">
              <span className="text-muted-foreground">Overdrawn balance</span>
              <span className="font-medium text-amber-600">20.00% p.a.</span>
            </div>
          </div>
          <p className="mt-2.5 text-[11px] leading-relaxed text-muted-foreground">
            Looking for higher returns? Explore our{' '}
            <Link
              href="/accounts/savings-accounts"
              className="text-fcu-primary-900 hover:underline"
            >
              savings accounts
            </Link>{' '}
            or{' '}
            <Link
              href="/accounts/term-deposits"
              className="text-fcu-primary-900 hover:underline"
            >
              term deposits
            </Link>
            .
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background p-5">
          <h3 className="mb-3 text-sm font-medium text-foreground">
            Transaction fees
          </h3>
          <div className="space-y-0">
            <div className="flex items-center justify-between border-b border-border py-1.5 text-[13px]">
              <span className="text-muted-foreground">All deposits</span>
              <span className="rounded-md bg-fcu-mint-100 px-2 py-0.5 text-[11px] font-medium text-fcu-primary-950">
                Free
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-1.5 text-[13px]">
              <span className="text-muted-foreground">
                Cash withdrawal (branch)
              </span>
              <span className="rounded-md bg-fcu-mint-100 px-2 py-0.5 text-[11px] font-medium text-fcu-primary-950">
                Free
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-1.5 text-[13px]">
              <span className="text-muted-foreground">Automatic payments</span>
              <span className="rounded-md bg-fcu-mint-100 px-2 py-0.5 text-[11px] font-medium text-fcu-primary-950">
                Free
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-1.5 text-[13px]">
              <span className="text-muted-foreground">
                Direct debits &amp; bill payments
              </span>
              <span className="rounded-md bg-fcu-mint-100 px-2 py-0.5 text-[11px] font-medium text-fcu-primary-950">
                Free
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-1.5 text-[13px]">
              <span className="text-muted-foreground">NZ bank transfers</span>
              <span className="rounded-md bg-fcu-mint-100 px-2 py-0.5 text-[11px] font-medium text-fcu-primary-950">
                Free
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 text-[13px]">
              <span className="text-muted-foreground">Disputed transaction</span>
              <span className="font-medium text-foreground">$50.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* DEBIT CARD STRIP */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Debit card
      </p>
      <div className="mb-6 grid gap-4 rounded-lg border border-border bg-background p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
        <div className="flex h-[42px] w-16 shrink-0 flex-col justify-between rounded-md bg-linear-to-br from-fcu-primary-900 to-fcu-mint-600 p-1.5">
          <div className="h-2.5 w-3.5 rounded-sm bg-white/35" />
          <div className="flex">
            <div
              className="size-2.5 rounded-full"
              style={{ backgroundColor: '#eb001b', marginRight: -4 }}
            />
            <div
              className="size-2.5 rounded-full opacity-75"
              style={{ backgroundColor: '#f79e1b' }}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-foreground">
            Mastercard® Debit Card
          </h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            You can link your Mastercard Debit Card to your Bill Pay Account. Use
            it in-store, online, and with contactless payments wherever
            Mastercard is accepted. First card issued free. Your digital card is
            available immediately via the mobile app while your physical card is
            on its way.
          </p>
        </div>
        <Link
          href="/debit-card"
          className="whitespace-nowrap text-[13px] font-medium text-fcu-primary-900 no-underline hover:underline"
        >
          View card details →
        </Link>
      </div>

      {/* FAQ */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Common questions
      </p>
      <div className="mb-6">
        <BillPayAccountFaq />
      </div>

      {/* RELATED ACCOUNTS */}
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Other transactional accounts
      </p>
      <div className="mb-6 grid gap-2.5 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-background px-5 py-4">
          <h4 className="mb-1.5 text-sm font-medium text-foreground">
            Everyday Account
          </h4>
          <p className="mb-2.5 text-xs leading-relaxed text-muted-foreground">
            Your main account for day-to-day spending, wages, and 24/7 banking
            access.
          </p>
          <Link
            href="/accounts/transactional-accounts/everyday-account"
            className="text-xs font-medium text-fcu-primary-900 no-underline hover:underline"
          >
            Apply online →
          </Link>
        </div>
        <div className="rounded-lg border border-border bg-background px-5 py-4">
          <h4 className="mb-1.5 text-sm font-medium text-foreground">
            Expense Account
          </h4>
          <p className="mb-2.5 text-xs leading-relaxed text-muted-foreground">
            Set aside money for regular expenses, separate from your everyday
            funds.
          </p>
          <Link
            href="/accounts/transactional-accounts/expense-account"
            className="text-xs font-medium text-fcu-primary-900 no-underline hover:underline"
          >
            Open an account →
          </Link>
        </div>
        <div className="rounded-lg border border-border bg-background px-5 py-4">
          <h4 className="mb-1.5 text-sm font-medium text-foreground">
            Special Purpose Account
          </h4>
          <p className="mb-2.5 text-xs leading-relaxed text-muted-foreground">
            Short-term savings goals with funds kept readily available when you
            need them.
          </p>
          <Link
            href="/accounts/transactional-accounts/special-purpose-account"
            className="text-xs font-medium text-fcu-primary-900 no-underline hover:underline"
          >
            Open an account →
          </Link>
        </div>
      </div>

      {/* CONTACT CTA */}
      <section
        className="flex flex-col gap-6 rounded-lg border border-fcu-mint-300 bg-fcu-mint-100 p-6 md:flex-row md:items-center md:justify-between"
        aria-labelledby="contact-cta-heading"
      >
        <div>
          <h3
            id="contact-cta-heading"
            className="mb-1 text-base font-medium text-fcu-primary-950"
          >
            Ready to open a Bill Pay Account?
          </h3>
          <p className="text-[13px] leading-relaxed text-fcu-primary-900">
            Contact us by phone or visit a branch — our team will have you set up
            quickly. Call centre open Monday 10am–5pm and Tuesday–Friday
            8am–5pm.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-fcu-primary-900 px-5 py-2.5 text-sm font-medium text-fcu-mint-100 no-underline hover:bg-fcu-primary-800"
          >
            Contact us
          </Link>
          <Link
            href="/branches"
            className="inline-block rounded-md border border-fcu-primary-900 px-5 py-2.5 text-sm font-medium text-fcu-primary-900 no-underline hover:bg-fcu-primary-900/5"
          >
            Find a branch
          </Link>
        </div>
      </section>
    </div>
  )
}
