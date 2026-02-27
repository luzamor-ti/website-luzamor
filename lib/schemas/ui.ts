import { z } from "zod";

/**
 * Zod Schemas for UI Components
 * These schemas validate props for UI components and provide type safety
 */

// ===== Button Component =====
export const buttonVariantSchema = z.enum([
  "primary",
  "secondary",
  "outline",
  "ghost",
]);
export const buttonSizeSchema = z.enum(["sm", "md", "lg"]);

export const buttonPropsSchema = z.object({
  children: z.any(),
  href: z.string().optional(),
  onClick: z.function().optional(),
  variant: buttonVariantSchema.default("primary"),
  size: buttonSizeSchema.default("md"),
  fullWidth: z.boolean().default(false),
  showArrow: z.boolean().default(false),
  className: z.string().default(""),
});

export type ButtonProps = z.infer<typeof buttonPropsSchema>;

// ===== Card Component =====
export const cardPaddingSchema = z.enum(["sm", "md", "lg"]);

export const cardPropsSchema = z.object({
  children: z.any(),
  className: z.string().default(""),
  hover: z.boolean().default(true),
  padding: cardPaddingSchema.default("md"),
});

export type CardProps = z.infer<typeof cardPropsSchema>;

// ===== Typography - Heading =====
export const headingLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

export const headingPropsSchema = z.object({
  children: z.any(),
  level: headingLevelSchema.default(2),
  className: z.string().default(""),
});

export type HeadingProps = z.infer<typeof headingPropsSchema>;

// ===== Typography - Text =====
export const textVariantSchema = z.enum(["body", "small", "large", "muted"]);

export const textPropsSchema = z.object({
  children: z.any(),
  variant: textVariantSchema.default("body"),
  className: z.string().default(""),
});

export type TextProps = z.infer<typeof textPropsSchema>;

// ===== Section Component =====
export const sectionPropsSchema = z.object({
  children: z.any(),
  className: z.string().default(""),
  id: z.string().optional(),
});

export type SectionProps = z.infer<typeof sectionPropsSchema>;

// ===== LinkButton Component =====
export const linkButtonVariantSchema = z.enum(["primary", "default"]);

export const linkButtonPropsSchema = z.object({
  children: z.any(),
  href: z.string(),
  variant: linkButtonVariantSchema.default("primary"),
  className: z.string().default(""),
  showArrow: z.boolean().default(false),
});

export type LinkButtonProps = z.infer<typeof linkButtonPropsSchema>;

// ===== Icon Component =====
export const iconSizeSchema = z.enum(["sm", "md", "lg", "xl"]);

export const iconPropsSchema = z.object({
  name: z.string(),
  size: iconSizeSchema.default("md"),
  className: z.string().default(""),
});

export type IconProps = z.infer<typeof iconPropsSchema>;

// ===== Grid Component =====
export const gridColumnsSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

export const gridGapSchema = z.enum(["sm", "md", "lg"]);

export const gridPropsSchema = z.object({
  children: z.any(),
  columns: gridColumnsSchema.default(3),
  gap: gridGapSchema.default("md"),
  className: z.string().default(""),
});

export type GridProps = z.infer<typeof gridPropsSchema>;

// ===== Accordion Component =====
export const accordionItemSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const accordionPropsSchema = z.object({
  items: z.array(accordionItemSchema),
  className: z.string().default(""),
});

export type AccordionProps = z.infer<typeof accordionPropsSchema>;
