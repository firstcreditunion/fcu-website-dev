// import { useState, useEffect, useRef } from 'react'

// /* ─────────────────────────────────────────────
//    iPhone Mockup Hero — App Landing Page
//    Inspired by Wishapp + Wallet hero sections
//    ───────────────────────────────────────────── */

// const FONT_LINK =
//   'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Space+Mono:wght@400;700&display=swap'

// // ── Fake App Screen Content ──────────────────
// function AppScreen() {
//   const tasks = [
//     {
//       label: 'Design system audit',
//       done: true,
//       tag: 'Design',
//       color: '#6366f1',
//     },
//     { label: 'Build checkout flow', done: false, tag: 'Dev', color: '#06b6d4' },
//     {
//       label: 'User testing round 2',
//       done: false,
//       tag: 'Research',
//       color: '#f59e0b',
//     },
//     {
//       label: 'Launch marketing site',
//       done: false,
//       tag: 'Marketing',
//       color: '#ec4899',
//     },
//   ]

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '100%',
//         background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
//         fontFamily: "'DM Sans', sans-serif",
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column',
//       }}
//     >
//       {/* Status bar */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '12px 24px 8px',
//           fontSize: '12px',
//           fontWeight: 600,
//           color: '#1e293b',
//         }}
//       >
//         <span>9:41</span>
//         <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
//           <svg width='16' height='12' viewBox='0 0 16 12' fill='none'>
//             <rect x='0' y='6' width='3' height='6' rx='1' fill='#1e293b' />
//             <rect x='4.5' y='4' width='3' height='8' rx='1' fill='#1e293b' />
//             <rect x='9' y='1.5' width='3' height='10.5' rx='1' fill='#1e293b' />
//             <rect
//               x='13.5'
//               y='0'
//               width='2.5'
//               height='12'
//               rx='1'
//               fill='#1e293b'
//               opacity='0.3'
//             />
//           </svg>
//           <svg width='16' height='12' viewBox='0 0 16 12' fill='#1e293b'>
//             <rect
//               x='0'
//               y='3'
//               width='14'
//               height='8'
//               rx='2'
//               stroke='#1e293b'
//               strokeWidth='1'
//               fill='none'
//             />
//             <rect x='1.5' y='4.5' width='9' height='5' rx='1' fill='#1e293b' />
//             <rect
//               x='14.5'
//               y='5.5'
//               width='1.5'
//               height='3'
//               rx='0.5'
//               fill='#1e293b'
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Header */}
//       <div style={{ padding: '8px 20px 16px' }}>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}
//         >
//           <div>
//             <p
//               style={{
//                 margin: 0,
//                 fontSize: '11px',
//                 color: '#94a3b8',
//                 fontWeight: 500,
//                 letterSpacing: '0.05em',
//                 textTransform: 'uppercase',
//               }}
//             >
//               Good morning
//             </p>
//             <h2
//               style={{
//                 margin: '2px 0 0',
//                 fontSize: '20px',
//                 fontWeight: 700,
//                 color: '#0f172a',
//               }}
//             >
//               Isaac
//             </h2>
//           </div>
//           <div
//             style={{
//               width: '36px',
//               height: '36px',
//               borderRadius: '50%',
//               background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: '#fff',
//               fontSize: '14px',
//               fontWeight: 700,
//               boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
//             }}
//           >
//             I
//           </div>
//         </div>
//       </div>

//       {/* Progress card */}
//       <div style={{ padding: '0 20px', marginBottom: '16px' }}>
//         <div
//           style={{
//             background:
//               'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
//             borderRadius: '16px',
//             padding: '16px 18px',
//             boxShadow: '0 8px 24px rgba(99,102,241,0.25)',
//             color: '#fff',
//           }}
//         >
//           <div
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: '10px',
//             }}
//           >
//             <span style={{ fontSize: '12px', fontWeight: 500, opacity: 0.85 }}>
//               Today's Progress
//             </span>
//             <span style={{ fontSize: '20px', fontWeight: 700 }}>25%</span>
//           </div>
//           <div
//             style={{
//               width: '100%',
//               height: '6px',
//               background: 'rgba(255,255,255,0.2)',
//               borderRadius: '3px',
//               overflow: 'hidden',
//             }}
//           >
//             <div
//               style={{
//                 width: '25%',
//                 height: '100%',
//                 background: '#fff',
//                 borderRadius: '3px',
//                 transition: 'width 1s ease',
//               }}
//             />
//           </div>
//           <p style={{ margin: '8px 0 0', fontSize: '11px', opacity: 0.75 }}>
//             1 of 4 tasks completed
//           </p>
//         </div>
//       </div>

//       {/* Task list */}
//       <div style={{ padding: '0 20px', flex: 1 }}>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: '10px',
//           }}
//         >
//           <h3
//             style={{
//               margin: 0,
//               fontSize: '14px',
//               fontWeight: 700,
//               color: '#0f172a',
//             }}
//           >
//             Tasks
//           </h3>
//           <span
//             style={{
//               fontSize: '11px',
//               color: '#6366f1',
//               fontWeight: 600,
//               cursor: 'pointer',
//             }}
//           >
//             + Add
//           </span>
//         </div>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//           {tasks.map((t, i) => (
//             <div
//               key={i}
//               style={{
//                 background: '#fff',
//                 borderRadius: '12px',
//                 padding: '12px 14px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 boxShadow:
//                   '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
//                 opacity: t.done ? 0.55 : 1,
//               }}
//             >
//               <div
//                 style={{
//                   width: '20px',
//                   height: '20px',
//                   borderRadius: '6px',
//                   flexShrink: 0,
//                   border: t.done ? 'none' : '2px solid #d1d5db',
//                   background: t.done
//                     ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
//                     : 'transparent',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 {t.done && (
//                   <svg width='12' height='12' viewBox='0 0 12 12' fill='none'>
//                     <path
//                       d='M2.5 6L5 8.5L9.5 3.5'
//                       stroke='#fff'
//                       strokeWidth='1.5'
//                       strokeLinecap='round'
//                       strokeLinejoin='round'
//                     />
//                   </svg>
//                 )}
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <p
//                   style={{
//                     margin: 0,
//                     fontSize: '13px',
//                     fontWeight: 500,
//                     color: '#1e293b',
//                     textDecoration: t.done ? 'line-through' : 'none',
//                   }}
//                 >
//                   {t.label}
//                 </p>
//               </div>
//               <span
//                 style={{
//                   fontSize: '9px',
//                   fontWeight: 600,
//                   color: t.color,
//                   background: `${t.color}15`,
//                   padding: '3px 8px',
//                   borderRadius: '6px',
//                   letterSpacing: '0.02em',
//                 }}
//               >
//                 {t.tag}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom nav */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-around',
//           alignItems: 'center',
//           padding: '10px 20px 20px',
//           borderTop: '1px solid #e2e8f0',
//           background: 'rgba(248,250,252,0.9)',
//           backdropFilter: 'blur(10px)',
//         }}
//       >
//         {['Home', 'Search', 'Stats', 'Profile'].map((item, i) => (
//           <div
//             key={i}
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               gap: '2px',
//               opacity: i === 0 ? 1 : 0.4,
//             }}
//           >
//             <div
//               style={{
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '5px',
//                 background: i === 0 ? '#6366f1' : '#94a3b8',
//                 opacity: i === 0 ? 1 : 0.4,
//               }}
//             />
//             <span
//               style={{
//                 fontSize: '9px',
//                 fontWeight: 600,
//                 color: i === 0 ? '#6366f1' : '#94a3b8',
//               }}
//             >
//               {item}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // ── iPhone Frame Component ───────────────────
// function IPhoneFrame({ children, tilt = true }) {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
//   const frameRef = useRef(null)

//   useEffect(() => {
//     if (!tilt) return
//     const handleMouseMove = (e) => {
//       if (!frameRef.current) return
//       const rect = frameRef.current.getBoundingClientRect()
//       const cx = rect.left + rect.width / 2
//       const cy = rect.top + rect.height / 2
//       const x = ((e.clientX - cx) / (rect.width / 2)) * 8
//       const y = ((e.clientY - cy) / (rect.height / 2)) * -8
//       setMousePos({
//         x: Math.max(-8, Math.min(8, x)),
//         y: Math.max(-8, Math.min(8, y)),
//       })
//     }
//     window.addEventListener('mousemove', handleMouseMove)
//     return () => window.removeEventListener('mousemove', handleMouseMove)
//   }, [tilt])

//   return (
//     <div
//       ref={frameRef}
//       style={{
//         position: 'relative',
//         width: '280px',
//         height: '570px',
//         borderRadius: '44px',
//         background:
//           'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
//         padding: '10px',
//         boxShadow: `
//           0 0 0 1px rgba(255,255,255,0.08),
//           0 25px 60px -12px rgba(0,0,0,0.5),
//           0 40px 80px -20px rgba(99,102,241,0.15),
//           inset 0 1px 0 rgba(255,255,255,0.1),
//           inset 0 -1px 0 rgba(0,0,0,0.3)
//         `,
//         transform: tilt
//           ? `perspective(1200px) rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg) scale(1)`
//           : 'perspective(1200px) rotateY(-6deg) rotateX(4deg)',
//         transition: tilt
//           ? 'transform 0.15s ease-out'
//           : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
//         transformStyle: 'preserve-3d',
//         willChange: 'transform',
//       }}
//     >
//       {/* Notch / Dynamic Island */}
//       <div
//         style={{
//           position: 'absolute',
//           top: '12px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           width: '90px',
//           height: '26px',
//           borderRadius: '13px',
//           background: '#000',
//           zIndex: 20,
//           boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
//         }}
//       >
//         <div
//           style={{
//             position: 'absolute',
//             right: '18px',
//             top: '50%',
//             transform: 'translateY(-50%)',
//             width: '8px',
//             height: '8px',
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, #1a1a3e 30%, #0d0d1a 70%)',
//             boxShadow: 'inset 0 0 2px rgba(99,102,241,0.3)',
//           }}
//         />
//       </div>

//       {/* Screen */}
//       <div
//         style={{
//           width: '100%',
//           height: '100%',
//           borderRadius: '36px',
//           overflow: 'hidden',
//           position: 'relative',
//           background: '#f8fafc',
//         }}
//       >
//         {children}
//       </div>

//       {/* Side button (right) */}
//       <div
//         style={{
//           position: 'absolute',
//           right: '-2px',
//           top: '120px',
//           width: '3px',
//           height: '55px',
//           borderRadius: '0 2px 2px 0',
//           background: 'linear-gradient(180deg, #2a2a4a, #1a1a2e)',
//           boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
//         }}
//       />
//       {/* Volume buttons (left) */}
//       <div
//         style={{
//           position: 'absolute',
//           left: '-2px',
//           top: '100px',
//           width: '3px',
//           height: '28px',
//           borderRadius: '2px 0 0 2px',
//           background: 'linear-gradient(180deg, #2a2a4a, #1a1a2e)',
//           boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
//         }}
//       />
//       <div
//         style={{
//           position: 'absolute',
//           left: '-2px',
//           top: '140px',
//           width: '3px',
//           height: '45px',
//           borderRadius: '2px 0 0 2px',
//           background: 'linear-gradient(180deg, #2a2a4a, #1a1a2e)',
//           boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
//         }}
//       />

//       {/* Reflection overlay */}
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           borderRadius: '44px',
//           background:
//             'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)',
//           pointerEvents: 'none',
//           zIndex: 10,
//         }}
//       />
//     </div>
//   )
// }

// // ── Floating Orbs Background ─────────────────
// function FloatingOrbs() {
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         inset: 0,
//         overflow: 'hidden',
//         pointerEvents: 'none',
//       }}
//     >
//       <div
//         style={{
//           position: 'absolute',
//           width: '500px',
//           height: '500px',
//           borderRadius: '50%',
//           background:
//             'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
//           top: '-100px',
//           right: '-100px',
//           animation: 'orbFloat1 12s ease-in-out infinite',
//         }}
//       />
//       <div
//         style={{
//           position: 'absolute',
//           width: '400px',
//           height: '400px',
//           borderRadius: '50%',
//           background:
//             'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
//           bottom: '-50px',
//           left: '-80px',
//           animation: 'orbFloat2 15s ease-in-out infinite',
//         }}
//       />
//       <div
//         style={{
//           position: 'absolute',
//           width: '300px',
//           height: '300px',
//           borderRadius: '50%',
//           background:
//             'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
//           top: '40%',
//           left: '30%',
//           animation: 'orbFloat3 10s ease-in-out infinite',
//         }}
//       />
//     </div>
//   )
// }

// // ── Main Hero Component ──────────────────────
// export default function IPhoneHero() {
//   const [loaded, setLoaded] = useState(false)
//   useEffect(() => {
//     const link = document.createElement('link')
//     link.href = FONT_LINK
//     link.rel = 'stylesheet'
//     document.head.appendChild(link)
//     setTimeout(() => setLoaded(true), 100)
//   }, [])

//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         background:
//           'linear-gradient(160deg, #0f0a1a 0%, #1a1035 30%, #0d1b2a 60%, #0a0f1a 100%)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontFamily: "'DM Sans', sans-serif",
//         padding: '40px 24px',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >
//       <style>{`
//         @keyframes orbFloat1 {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(-30px, 20px) scale(1.1); }
//         }
//         @keyframes orbFloat2 {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(20px, -30px) scale(1.05); }
//         }
//         @keyframes orbFloat3 {
//           0%, 100% { transform: translate(0, 0) scale(1); }
//           50% { transform: translate(-20px, -20px) scale(1.15); }
//         }
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes phoneReveal {
//           from { opacity: 0; transform: perspective(1200px) rotateY(-20deg) rotateX(8deg) translateY(40px) scale(0.9); }
//           to { opacity: 1; transform: perspective(1200px) rotateY(-6deg) rotateX(4deg) translateY(0) scale(1); }
//         }
//         @keyframes shimmer {
//           0% { background-position: -200% center; }
//           100% { background-position: 200% center; }
//         }
//       `}</style>

//       <FloatingOrbs />

//       {/* Grain overlay */}
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           background:
//             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
//           pointerEvents: 'none',
//           zIndex: 1,
//         }}
//       />

//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '80px',
//           maxWidth: '1100px',
//           width: '100%',
//           position: 'relative',
//           zIndex: 2,
//           flexWrap: 'wrap',
//         }}
//       >
//         {/* Left: Copy */}
//         <div
//           style={{
//             flex: '1 1 400px',
//             maxWidth: '480px',
//             animation: loaded ? 'fadeInUp 0.8s ease-out forwards' : 'none',
//             opacity: loaded ? 1 : 0,
//           }}
//         >
//           <div
//             style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '8px',
//               background: 'rgba(99,102,241,0.12)',
//               border: '1px solid rgba(99,102,241,0.2)',
//               borderRadius: '24px',
//               padding: '6px 16px',
//               marginBottom: '24px',
//             }}
//           >
//             <div
//               style={{
//                 width: '6px',
//                 height: '6px',
//                 borderRadius: '50%',
//                 background: '#6366f1',
//                 boxShadow: '0 0 8px rgba(99,102,241,0.6)',
//               }}
//             />
//             <span
//               style={{
//                 fontSize: '13px',
//                 fontWeight: 500,
//                 color: '#a5b4fc',
//                 letterSpacing: '0.03em',
//               }}
//             >
//               Now in public beta
//             </span>
//           </div>

//           <h1
//             style={{
//               fontSize: 'clamp(36px, 5vw, 56px)',
//               fontWeight: 700,
//               lineHeight: 1.1,
//               margin: '0 0 20px',
//               letterSpacing: '-0.02em',
//               background:
//                 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 50%, #f8fafc 100%)',
//               backgroundSize: '200% auto',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               animation: 'shimmer 6s linear infinite',
//             }}
//           >
//             Ship your goals,
//             <br />
//             not just dreams.
//           </h1>

//           <p
//             style={{
//               fontSize: '17px',
//               lineHeight: 1.65,
//               color: '#94a3b8',
//               margin: '0 0 36px',
//               maxWidth: '400px',
//             }}
//           >
//             Track tasks, hit deadlines, and stay accountable with an app that
//             actually gets out of your way.
//           </p>

//           <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
//             <button
//               style={{
//                 background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '14px',
//                 padding: '14px 32px',
//                 fontSize: '15px',
//                 fontWeight: 600,
//                 cursor: 'pointer',
//                 fontFamily: 'inherit',
//                 boxShadow:
//                   '0 4px 20px rgba(99,102,241,0.35), 0 1px 3px rgba(0,0,0,0.2)',
//                 transition: 'all 0.2s ease',
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.transform = 'translateY(-2px)'
//                 e.target.style.boxShadow =
//                   '0 8px 30px rgba(99,102,241,0.45), 0 2px 6px rgba(0,0,0,0.2)'
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.transform = 'translateY(0)'
//                 e.target.style.boxShadow =
//                   '0 4px 20px rgba(99,102,241,0.35), 0 1px 3px rgba(0,0,0,0.2)'
//               }}
//             >
//               Download now
//             </button>
//             <button
//               style={{
//                 background: 'rgba(255,255,255,0.06)',
//                 color: '#e2e8f0',
//                 border: '1px solid rgba(255,255,255,0.12)',
//                 borderRadius: '14px',
//                 padding: '14px 32px',
//                 fontSize: '15px',
//                 fontWeight: 500,
//                 cursor: 'pointer',
//                 fontFamily: 'inherit',
//                 backdropFilter: 'blur(10px)',
//                 transition: 'all 0.2s ease',
//               }}
//               onMouseOver={(e) => {
//                 e.target.style.background = 'rgba(255,255,255,0.1)'
//                 e.target.style.borderColor = 'rgba(255,255,255,0.2)'
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.background = 'rgba(255,255,255,0.06)'
//                 e.target.style.borderColor = 'rgba(255,255,255,0.12)'
//               }}
//             >
//               Launch webapp
//             </button>
//           </div>

//           {/* Social proof */}
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '12px',
//               marginTop: '36px',
//               padding: '16px 0',
//               borderTop: '1px solid rgba(255,255,255,0.06)',
//             }}
//           >
//             <div style={{ display: 'flex' }}>
//               {['#6366f1', '#ec4899', '#06b6d4', '#f59e0b'].map((c, i) => (
//                 <div
//                   key={i}
//                   style={{
//                     width: '28px',
//                     height: '28px',
//                     borderRadius: '50%',
//                     background: `linear-gradient(135deg, ${c}, ${c}cc)`,
//                     border: '2px solid #0f0a1a',
//                     marginLeft: i > 0 ? '-8px' : 0,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: '10px',
//                     fontWeight: 700,
//                     color: '#fff',
//                   }}
//                 >
//                   {String.fromCharCode(65 + i)}
//                 </div>
//               ))}
//             </div>
//             <div>
//               <p
//                 style={{
//                   margin: 0,
//                   fontSize: '13px',
//                   fontWeight: 600,
//                   color: '#e2e8f0',
//                 }}
//               >
//                 2,400+ early adopters
//               </p>
//               <p
//                 style={{
//                   margin: '1px 0 0',
//                   fontSize: '11px',
//                   color: '#64748b',
//                 }}
//               >
//                 Rated 4.9 on the App Store
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right: iPhone Mockup */}
//         <div
//           style={{
//             flex: '0 0 auto',
//             animation: loaded
//               ? 'phoneReveal 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards'
//               : 'none',
//             opacity: loaded ? 1 : 0,
//             position: 'relative',
//           }}
//         >
//           {/* Glow behind phone */}
//           <div
//             style={{
//               position: 'absolute',
//               width: '350px',
//               height: '350px',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               background:
//                 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
//               borderRadius: '50%',
//               filter: 'blur(40px)',
//               zIndex: -1,
//             }}
//           />

//           <IPhoneFrame>
//             <AppScreen />
//           </IPhoneFrame>
//         </div>
//       </div>
//     </div>
//   )
// }
