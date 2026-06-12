import { auth } from '@clerk/nextjs/server'
import { getProjectHub } from '@/lib/project-hub/queries'
import { HubShell } from './_components/hub-shell'

export const metadata = { title: 'Project Hub — FCU website rebuild', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function ProjectHubPage() {
  await auth.protect()
  const payload = await getProjectHub()
  return <HubShell initial={payload} />
}
