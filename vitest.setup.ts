import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { createElement } from "react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createElement("img", { src, alt, ...props } as any);
  },
}));

// Mock Sanity Image URL
vi.mock("@/sanity/lib/image", () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({
        url: () => "https://cdn.sanity.io/images/test/300x300.jpg",
      }),
    }),
    url: () => "https://cdn.sanity.io/images/test/placeholder.jpg",
  }),
}));

// Mock buildSanityImageUrl utility
vi.mock("@/utils/buildSanityImageUrl", () => ({
  buildSanityImageUrl: (ref?: string) =>
    ref ? "https://cdn.sanity.io/images/test/mock-image.jpg" : "",
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_target, prop) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...props }: any) => {
          return createElement(prop as string, props, children);
        },
    },
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
  useScroll: () => ({
    scrollYProgress: { get: () => 0, set: vi.fn() },
    scrollY: { get: () => 0, set: vi.fn() },
  }),
}));

// Mock @portabletext/react
vi.mock("@portabletext/react", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PortableText: ({ value }: any) => {
    if (!value || !Array.isArray(value)) return null;
    return (
      value
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((block: any) => {
          if (block.children) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return block.children.map((child: any) => child.text).join("");
          }
          return "";
        })
        .join(" ")
    );
  },
}));
