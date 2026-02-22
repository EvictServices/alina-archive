import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-light text-white mb-6 shimmer-text">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-light text-white mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-light text-white mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-white/80 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-white/80 mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-white/80 mb-4 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-white/80">
        {children}
      </li>
    ),
    code: ({ children }) => (
      <code className="bg-[#5f828d]/10 text-[#5f828d] px-2 py-1 rounded text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-white/[0.02] border border-[#5f828d]/20 rounded-xl p-4 overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-[#5f828d] hover:text-[#5f828d]/80 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#5f828d]/40 pl-4 italic text-white/70 mb-4">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="border-t border-white/10 my-8" />
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-white/90">
        {children}
      </em>
    ),
    ...components,
  }
}
