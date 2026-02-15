import { redirect } from 'next/navigation'
import { getDocs } from '@/lib/docs'

interface DocPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const docs = await getDocs()
  return docs.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: DocPageProps) {
  const { slug } = await params
  const docs = await getDocs()
  const doc = docs.find((d) => d.slug === slug)

  if (!doc) {
    return {
      title: 'Documentation Not Found',
    }
  }

  return {
    title: `${doc.metadata.title} - Documentation - Evict`,
    description: doc.metadata.description,
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params
  redirect(`/docs?doc=${slug}`)
}
