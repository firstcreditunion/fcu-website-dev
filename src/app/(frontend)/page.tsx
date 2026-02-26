import { ComingSoon } from '@/components/coming-soon'

export default function Home() {
  return (
    <ComingSoon
      title="Welcome to First Credit Union"
      isHomepage
      description="We are building something amazing. Our new website is under development and will be launching soon with a fresh experience for our members."
      highlightWords={['something amazing', 'launching soon']}
    />
  )
}
