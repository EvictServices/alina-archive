import { redirect } from 'next/navigation'
import { getUpdates } from '@/lib/updates'

interface UpdatePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const updates = await getUpdates()
  return updates.map((update) => ({
    slug: update.slug,
  }))
}

export async function generateMetadata({ params }: UpdatePageProps) {
  const { slug } = await params
  const updates = await getUpdates()
  const update = updates.find((u) => u.slug === slug)

  if (!update) {
    return {
      title: 'Update Not Found',
    }
  }

  return {
    title: `${update.metadata.title} - Updates - Evict`,
    description: update.metadata.description,
  }
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params
  redirect(`/updates?update=${slug}`)
}
