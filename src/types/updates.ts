export interface UpdateMetadata {
  title: string
  date: string
  author: string
  description: string
  version?: string
}

export interface Update {
  slug: string
  metadata: UpdateMetadata
}
