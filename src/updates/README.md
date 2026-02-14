# Updates Directory

This directory contains MDX files for the updates page.

## Adding a New Update

1. Create a new `.mdx` file with the naming format: `YYYY-MM-DD-slug.mdx`
   - Example: `2026-02-14-search-improvements.mdx`

2. Add metadata at the top of the file:
```mdx
export const metadata = {
  title: 'Your Update Title',
  date: 'YYYY-MM-DD',
  author: 'Evict Team',
  description: 'Brief description of the update'
}

# Your Update Title

Your content here...
```

3. Register the update in `/src/lib/updates.ts`:
```typescript
{
  slug: 'YYYY-MM-DD-slug',
  metadata: {
    title: 'Your Update Title',
    date: 'YYYY-MM-DD',
    author: 'Evict Team',
    description: 'Brief description of the update'
  }
}
```

## MDX Features

You can use all standard Markdown features plus React components:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Lists**: Ordered and unordered
- **Code blocks**: Inline `code` and fenced code blocks
- **Links**: `[text](url)`
- **Emphasis**: `**bold**`, `*italic*`
- **Blockquotes**: `> quote`

All elements are automatically styled to match the site's design.
