export interface DocMetadata {
  title: string
  description: string
  category: string
  order?: number
  lastUpdated?: string
}

export interface Doc {
  slug: string
  metadata: DocMetadata
}
