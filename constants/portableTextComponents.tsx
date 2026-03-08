import { PortableTextComponents } from "next-sanity";

/**
 * Custom PortableText components
 * - Blocks H1 and H2 (renders as H3)
 * - Applies proper styling and spacing
 * - Maintains user formatting from CMS
 */
export const portableTextComponents: PortableTextComponents = {
  block: {
    // Headings - H1 and H2 are converted to H3
    h1: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3 text-gray-900 leading-tight">
        {children}
      </h3>
    ),
    h2: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3 text-gray-900 leading-tight">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold mt-6 mb-3 text-gray-900 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-gray-800 mt-5 mb-2 leading-tight">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base md:text-lg font-semibold text-gray-800 mt-4 mb-2 leading-snug">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-medium text-gray-700 mt-3 mb-1.5 leading-snug">
        {children}
      </h6>
    ),
    // Paragraphs with increased spacing
    normal: ({ children }) => (
      <p className="text-base text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 italic text-gray-600 bg-gray-50 rounded-r">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Bold
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    // Italic
    em: ({ children }) => <em className="italic">{children}</em>,
    // Underline
    underline: ({ children }) => <u className="underline">{children}</u>,
    // Links
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline font-medium transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    // Bulleted lists
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1.5 mb-4 text-gray-700">
        {children}
      </ul>
    ),
    // Numbered lists
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1.5 mb-4 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
  },
};
