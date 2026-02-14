# Documentation

This directory contains the MDX documentation files for Evict.

## Adding New Documentation

1. Create a new `.mdx` file in this directory
2. Add the document entry to `/src/lib/docs.ts`
3. Write your documentation using MDX syntax
4. The document will automatically appear in the docs sidebar

## MDX Syntax

MDX allows you to use JSX in markdown files. You can:

- Use standard markdown syntax
- Import and use React components
- Create interactive documentation

## Metadata

Each document should be registered in `/src/lib/docs.ts` with:

- `slug` - URL-friendly identifier
- `title` - Document title
- `description` - Brief description
- `category` - Grouping category
- `order` - Sort order (optional)
- `lastUpdated` - Last update date (optional)
