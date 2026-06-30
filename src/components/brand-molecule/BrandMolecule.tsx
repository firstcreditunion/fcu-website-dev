// src/components/brand-molecule/BrandMolecule.tsx
'use client'

import { useEffect, useId, useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'
import { Drawer } from 'vaul'
import { MoleculeWheel } from './MoleculeWheel'
import { MoleculeDetail } from './MoleculeDetail'
import { MoleculeA11yList } from './MoleculeA11yList'
import { useIsMobile, useIsDesktop } from './lib/use-is-mobile'
import type { MoleculeData, MoleculeMotionProps } from './lib/types'

const HERO_EASE = [0.22, 0.61, 0.36, 1] as const

const GROUP_COLORS = ['#e07b1e', '#2e93bd', '#8fc24e']
// left%, top%, size(px), colorIndex — fixed so SSR + client first paint match.
const MOTE_DEFS: [number, number, number, number][] = [
  [12, 18, 5, 0], [78, 12, 4, 1], [40, 30, 3, 2], [88, 44, 5, 2], [22, 62, 4, 1],
  [62, 74, 6, 0], [8, 84, 3, 2], [92, 80, 4, 1], [50, 8, 3, 0], [33, 90, 4, 0],
  [70, 55, 3, 2], [16, 45, 4, 1], [84, 22, 3, 0], [46, 52, 3, 1],
]

export function BrandMolecule({
  data,
  ambientLife = true,
  scrollParallax = true,
  cursorLight = true,
  entranceDirection = 'clockwise',
  hubPulse = true,
  motes = true,
  microPolish = true,
}: { data: MoleculeData } & MoleculeMotionProps) {
  const reduceRaw = useReducedMotion()
  // `null` on server + first client paint → treat as "not reduced" so markup matches;
  // resolves to a boolean after mount.
  const reduce = reduceRaw === true
  const isMobile = useIsMobile()
  const isDesktop = useIsDesktop()
  const titleId = useId()

  const [active, setActive] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  // Paused until mount so the entrance build runs after hydration (SSR-safe).
  const [entered, setEntered] = useState(false)

  const selectedSeg = data.segments.find((s) => s.key === selected) ?? null
  const selectedGroup = selectedSeg ? data.groups.find((g) => g.key === selectedSeg.groupKey) : null
  const activeKey = active ?? selected
  const hasSelection = !!selectedSeg

  // ── refs + motion values ────────────────────────────────────────────────
  const stageRef = useRef<HTMLDivElement | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const wheelColRef = useRef<HTMLDivElement | null>(null)

  // Pointer parallax of the inner wheel group (spring-smoothed).
  const pX = useMotionValue(0)
  const pY = useMotionValue(0)
  const parallaxX = useSpring(pX, { stiffness: 120, damping: 18, mass: 0.4 })
  const parallaxY = useSpring(pY, { stiffness: 120, damping: 18, mass: 0.4 })

  // Cursor-following glow offset from centre.
  const gX = useMotionValue(0)
  const gY = useMotionValue(0)
  const glowX = useSpring(gX, { stiffness: 120, damping: 20, mass: 0.5 })
  const glowY = useSpring(gY, { stiffness: 120, damping: 20, mass: 0.5 })

  // Scroll parallax depth (hero drifts with, stage drifts against — gently).
  const heroY = useMotionValue(0)
  const stageY = useMotionValue(0)

  useEffect(() => {
    if (reduce) return
    const t = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(t)
  }, [reduce])

  // micro-polish attribute drives the close-button hover/press CSS.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const on = microPolish && !reduce
    document.documentElement.setAttribute('data-bm-microp', on ? 'on' : 'off')
    return () => document.documentElement.removeAttribute('data-bm-microp')
  }, [microPolish, reduce])

  // Scroll parallax.
  useEffect(() => {
    if (!scrollParallax || reduce) {
      heroY.set(0); stageY.set(0)
      return
    }
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop || 0
        heroY.set(+(y * 0.05).toFixed(1))
        stageY.set(+(-y * 0.03).toFixed(1))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [scrollParallax, reduce, heroY, stageY])

  // ── handlers ────────────────────────────────────────────────────────────
  const onSelect = (k: string) => setSelected((cur) => (cur === k ? null : k))
  const closePanel = () => setSelected(null)

  const onWheelPointerMove = (e: React.PointerEvent) => {
    if (!ambientLife || reduce || isMobile || selected) return
    const el = wheelColRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    pX.set(+(nx * 12).toFixed(2))
    pY.set(+(ny * 9).toFixed(2))
  }
  const onWheelLeave = () => { pX.set(0); pY.set(0) }

  const onStageMove = (e: React.PointerEvent) => {
    if (!cursorLight || !isDesktop || reduce) return
    const host = stageRef.current
    if (!host) return
    const r = host.getBoundingClientRect()
    const cx = (e.clientX - r.left) / r.width - 0.5
    const cy = (e.clientY - r.top) / r.height - 0.5
    gX.set(+(cx * 120).toFixed(1))
    gY.set(+(cy * 108).toFixed(1))
  }
  const onStageLeave = () => { gX.set(0); gY.set(0) }

  const breathing = ambientLife && !reduce && !activeKey && !selected
  const sheetOpen = !isDesktop && hasSelection

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-surface">
      {/* brand-tinted background wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 84% at 50% -6%, oklch(93.67% .039 227.71) 0%, transparent 56%)',
        }}
      />

      {/* full-screen floating motes layer (behind <main>) */}
      {motes && !reduce && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {MOTE_DEFS.map((mdef, i) => {
            const [left, top, size, ci] = mdef
            const dur = 14 + (i % 5) * 3
            const delay = -(i * 1.7)
            const mx = (i % 2 ? 1 : -1) * (8 + (i % 4) * 4)
            const my = (i % 3 ? -1 : 1) * (10 + (i % 3) * 5)
            return (
              <span
                key={'mote' + i}
                data-bm-anim
                style={{
                  position: 'absolute',
                  left: `${left}%`, top: `${top}%`,
                  width: size, height: size,
                  borderRadius: '50%', background: GROUP_COLORS[ci], opacity: 0.14,
                  filter: 'blur(.5px)',
                  ['--mx' as string]: `${mx}px`, ['--my' as string]: `${my}px`,
                  animation: `bm-drift ${dur}s ease-in-out ${delay}s infinite`,
                }}
              />
            )
          })}
        </div>
      )}

      <main
        className="relative z-[1] mx-auto"
        style={{
          maxWidth: 'min(1340px, 95vw)',
          padding: 'clamp(30px,5vw,68px) clamp(18px,4vw,40px) clamp(56px,8vw,104px)',
        }}
      >
        {/* hero */}
        <motion.header
          ref={heroRef}
          style={{ y: heroY, maxWidth: 780, margin: '0 auto clamp(26px,4.5vw,54px)', textAlign: 'center' }}
        >
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: HERO_EASE }}
            className="font-semibold text-foreground"
            style={{ margin: '0', fontSize: 'clamp(33px,5.2vw,54px)', lineHeight: 1.04, letterSpacing: '-.022em' }}
          >
            {data.title}
          </motion.h1>
          {data.intro ? (
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: HERO_EASE, delay: 0.08 }}
              className="text-foreground-muted"
              style={{ margin: '20px auto 0', maxWidth: '60ch', fontSize: 'clamp(16px,2.1vw,19px)', lineHeight: 1.62 }}
            >
              {data.intro}
            </motion.p>
          ) : null}
        </motion.header>

        {/* stage */}
        <motion.section
          ref={stageRef}
          onPointerMove={onStageMove}
          onPointerLeave={onStageLeave}
          style={{ y: stageY, display: 'flex', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', gap: 'clamp(20px,3vw,44px)' }}
        >
          {/* wheel column */}
          <div
            ref={wheelColRef}
            onPointerLeave={onWheelLeave}
            style={{ position: 'relative', flex: '1 1 auto', minWidth: 0, maxWidth: 900, margin: '0 auto' }}
          >
            {/* soft glow (doubles as cursor-following light) */}
            <motion.div
              aria-hidden="true"
              style={{
                position: 'absolute', left: '50%', top: '48%',
                x: cursorLight && !reduce ? glowX : 0,
                y: cursorLight && !reduce ? glowY : 0,
                translateX: '-50%', translateY: '-50%',
                width: '84%', aspectRatio: '1 / 1', borderRadius: '50%',
                background: 'radial-gradient(closest-side, oklch(70.61% .128 219.78 / .14), transparent 72%)',
                filter: 'blur(8px)', zIndex: 0, pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <MoleculeWheel
                data={data}
                activeKey={activeKey}
                compact={isMobile}
                entered={entered}
                reduce={reduce}
                entranceDirection={entranceDirection}
                hubPulse={hubPulse}
                breathing={breathing}
                parallaxX={parallaxX as MotionValue<number>}
                parallaxY={parallaxY as MotionValue<number>}
                onFocus={setActive}
                onSelect={onSelect}
                onPointerMoveCapture={onWheelPointerMove}
              />
            </div>
          </div>

          {/* desktop detail column (≥1024) — reserves space so opening causes no shift */}
          {isDesktop && (
            <aside style={{ flex: '0 0 360px', alignSelf: 'center' }}>
              <AnimatePresence mode="wait" initial={false}>
                {selectedSeg && selectedGroup ? (
                  <motion.div
                    key={selectedSeg.key}
                    initial={reduce ? false : { opacity: 0, x: 22, scale: 0.985 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, x: 22, scale: 0.985 }}
                    transition={{ duration: 0.5, ease: HERO_EASE }}
                    className="rounded-[18px] border border-border bg-card shadow-[var(--shadow-xl)]"
                    style={{ padding: '26px 24px' }}
                  >
                    <MoleculeDetail
                      segment={selectedSeg}
                      groupLabel={selectedGroup.label}
                      onClose={closePanel}
                      animate={!reduce}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="prompt"
                    initial={false}
                    animate={{ opacity: 1 }}
                    className="rounded-[18px] border border-dashed border-border bg-surface-muted"
                    style={{ padding: '26px 24px' }}
                  >
                    {/* `--foreground-muted` (not the spec's `--fg-subtle`): subtle on
                        `surface-muted` lands at 4.33:1 for 11px bold, just under AA 4.5.
                        Muted is one ramp-step darker and clears it, preserving the look. */}
                    <div className="flex items-center gap-[10px] text-[11px] font-bold uppercase text-foreground-muted" style={{ letterSpacing: '.15em' }}>
                      <span
                        aria-hidden="true"
                        data-bm-anim
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: 'var(--primary)', animation: reduce ? 'none' : 'bm-pulse 2.4s ease-in-out infinite' }}
                      />
                      Explore
                    </div>
                    <h2 className="font-semibold text-foreground" style={{ margin: '14px 0 0', fontSize: 19, letterSpacing: '-.01em' }}>
                      Pick a segment
                    </h2>
                    <p className="text-foreground-muted" style={{ margin: '9px 0 0', fontSize: 14, lineHeight: 1.55 }}>
                      Hover any part of the molecule to bring it into focus, then click to open its story.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </aside>
          )}
        </motion.section>

        <MoleculeA11yList data={data} />
      </main>

      {/* bottom sheet (<1024) */}
      <Drawer.Root open={sheetOpen} onOpenChange={(o) => !o && setSelected(null)}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-[60]"
            style={{ background: 'oklch(20% .02 220 / .42)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }}
          />
          <Drawer.Content
            className="fixed inset-x-0 bottom-0 z-[61] bg-card"
            style={{
              borderTopLeftRadius: 24, borderTopRightRadius: 24,
              padding: '8px 20px max(22px, env(safe-area-inset-bottom)) 20px',
              boxShadow: '0 -14px 44px -10px oklch(20% .02 220 / .3)',
            }}
          >
            <Drawer.Title id={titleId} className="sr-only">{selectedSeg?.annotationTitle ?? 'Segment detail'}</Drawer.Title>
            <Drawer.Description className="sr-only">Details for the selected brand molecule segment.</Drawer.Description>
            <div className="mx-auto mb-4 mt-2 h-[5px] w-[42px] rounded-full bg-border" />
            {selectedSeg && selectedGroup && (
              <div style={{ padding: '0 4px 6px' }}>
                <MoleculeDetail
                  segment={selectedSeg}
                  groupLabel={selectedGroup.label}
                  onClose={closePanel}
                  animate={!reduce}
                />
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  )
}
