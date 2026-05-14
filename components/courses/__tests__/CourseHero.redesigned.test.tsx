import { describe, it, vi } from "vitest";
import { PortableTextBlock } from "next-sanity";

/**
 * Phase 2: CourseHero component tests - REDESIGNED
 * Hero now shows:
 * - Course title + description (Portable Text) inline
 * - NO teacher seal (removed bottom-left professor photo/name)
 * - Min-age display (if provided)
 * - Blur background maintained (same fotoCapa)
 * - Resized hero height (smaller than current)
 */

vi.mock("@/utils/buildSanityImageUrl", () => ({
  buildSanityImageUrl: (ref?: string) =>
    ref ? `https://cdn.sanity.io/images/${ref}` : "",
}));

vi.mock("@portabletext/react", () => ({
  PortableText: ({ value }: { value: PortableTextBlock[] }) => (
    <div data-testid="portable-text">
      {value.map((block: PortableTextBlock, idx: number) => {
        const blockWithChildren = block as PortableTextBlock & {
          children?: Array<{ text?: string }>;
        };
        return (
          <p key={idx}>{blockWithChildren.children?.[0]?.text || ""}</p>
        );
      })}
    </div>
  ),
}));

describe("CourseHero - Redesigned (Phase 2)", () => {
  describe("Title and Description Rendering", () => {
    it.todo("renders course title");

    it.todo("renders course description using PortableText component");

    it.todo("does NOT render teacher seal (bottom-left professor photo/name)");

    it.todo("renders 'Curso' tag at top");
  });

  describe("Min-Age Display", () => {
    it.todo("displays minAge when provided (e.g., 'Idade mínima: 14 anos')");

    it.todo("displays correct age value: 'Idade mínima: {minAge} ano(s)'");

    it.todo("does NOT display min-age when minAge is 0");

    it.todo("does NOT display min-age when minAge is undefined/null");

    it.todo("uses conditional rendering for min-age section");
  });

  describe("Cover Photo and Blur Background", () => {
    it.todo("renders cover photo when provided");

    it.todo("maintains blur background effect on image");

    it.todo("maintains blur CSS class (e.g., blur-sm or similar)");

    it.todo("uses alt text from photo object");

    it.todo("renders fallback when photo not provided");
  });

  describe("Sizing and Layout", () => {
    it.todo(
      "hero height is reduced compared to current version (e.g., h-96 or h-80)",
    );

    it.todo("description text is readable and well-positioned in hero");

    it.todo("title + description fill available space without overflow");

    it.todo("layout is vertically centered or bottom-aligned");
  });

  describe("Mobile Responsiveness", () => {
    it.todo("renders correctly on mobile (small screens)");

    it.todo("description text size adjusts for mobile");

    it.todo("min-age displays on mobile");

    it.todo("no teacher seal means more space for course info on mobile");
  });

  describe("Props Interface", () => {
    it.todo("accepts title prop (string, required)");

    it.todo("accepts description prop (PortableTextBlock[], required)");

    it.todo("accepts coverPhoto prop (SanityImageSource, optional)");

    it.todo("accepts minAge prop (number, optional)");

    it.todo("does NOT accept teacher-related props (no seal rendering)");
  });

  describe("Accessibility", () => {
    it.todo("alt text provided for cover image");

    it.todo("semantic HTML structure (heading, section tags)");

    it.todo("text contrast sufficient on blur background");

    it.todo("no missing role attributes");
  });

  describe("Backward Compatibility", () => {
    it.todo("still works with existing Course data structure");

    it.todo(
      "fallback for courses without minAge (doesn't render min-age section)",
    );

    it.todo("fallback for courses without cover photo");
  });

  describe("Animation and Motion (if applicable)", () => {
    it.todo(
      "no animation or uses Framer Motion variants from lib/animations.ts",
    );

    it.todo("animations are GPU-optimized (transform/opacity)");
  });
});
