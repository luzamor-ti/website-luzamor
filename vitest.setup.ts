import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
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
  default: ({
    src,
    alt,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fill: _fill,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    priority: _priority,
    ...props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) => {
    // Filter out Next.js specific boolean props that shouldn't be passed to <img>
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
vi.mock("framer-motion", () => {
  // Props that are specific to framer-motion and should not be passed to DOM elements
  const motionProps = new Set([
    "initial",
    "animate",
    "exit",
    "variants",
    "transition",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView",
    "drag",
    "dragConstraints",
    "dragElastic",
    "dragMomentum",
    "onDragStart",
    "onDragEnd",
    "onDrag",
    "layout",
    "layoutId",
    "viewport",
    "onViewportEnter",
    "onViewportLeave",
  ]);

  return {
    motion: new Proxy(
      {},
      {
        get:
          (_target, prop) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ({ children, ...props }: any) => {
            // Filter out motion-specific props
            const domProps = Object.keys(props).reduce(
              (acc, key) => {
                if (!motionProps.has(key)) {
                  acc[key] = props[key];
                }
                return acc;
              },
              {} as Record<string, unknown>,
            );
            return createElement(prop as string, domProps, children);
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
  };
});

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

// Suppress known React warnings in test environment
const originalError = console.error;
beforeEach(() => {
  console.error = (...args: unknown[]) => {
    const message = args[0];
    if (
      typeof message === "string" &&
      (message.includes("React does not recognize the") ||
        message.includes("Received `true` for a non-boolean attribute"))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterEach(() => {
  console.error = originalError;
});
