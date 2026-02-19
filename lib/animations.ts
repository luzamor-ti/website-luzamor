"use client";

import { Variants } from "framer-motion";

// ==========================================
// ANIMAÇÕES OTIMIZADAS (GPU-ACCELERATED)
// ==========================================

/**
 * Fade In - Entrada simples
 * Usa apenas opacity e transform (GPU-accelerated)
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Slide Up - Entrada com movimento vertical
 * Usa transform e opacity
 */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Slide In From Left - Entrada da esquerda
 */
export const slideInFromLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Slide In From Right - Entrada da direita
 */
export const slideInFromRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Scale In - Aparecimento com escala
 * Usa transform scale e opacity
 */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Stagger Container - Container para animar filhos em sequência
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

/**
 * Stagger Item - Item dentro de stagger container
 */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Hover Lift - Efeito de levantamento ao hover
 */
export const hoverLiftVariants: Variants = {
  initial: { y: 0 },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/**
 * Hover Scale - Efeito de escala ao hover
 */
export const hoverScaleVariants: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/**
 * Number Counter Animation
 * Para animar contadores de números
 */
export const numberCounterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Scroll Reveal - Revela elemento ao entrar na viewport
 * Requer IntersectionObserver
 */
export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

/**
 * Parallax leve - Movimento sutil ao scroll
 * Use com ViewportScroll hook
 */
export const parallaxVariants: Variants = {
  initial: { y: 0 },
  animate: { y: 10, transition: { duration: 0.5 } },
};

// ==========================================
// CONFIGURAÇÕES DE TRANSIÇÃO
// ==========================================

export const easeConfig = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  spring: { type: "spring", stiffness: 100, damping: 15 },
  bouncy: { type: "spring", stiffness: 120, damping: 12 },
};

// ==========================================
// DELAY PRESETS
// ==========================================

export const delayPresets = {
  none: 0,
  xs: 0.1,
  sm: 0.2,
  md: 0.3,
  lg: 0.4,
  xl: 0.5,
};
