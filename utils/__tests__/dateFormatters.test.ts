import { describe, it, expect, vi, afterEach } from "vitest";
import { formatDate, isEventPast } from "@/utils/dateFormatters";

// ─────────────────────────────────────────
// Tests for dateFormatters utilities
// ─────────────────────────────────────────

describe("formatDate", () => {
  // ISO string para 15 de abril de 2026, às 14:00 (UTC-3 = 17:00 UTC)
  const dateString = "2026-04-15T17:00:00.000Z";

  it("retorna dateFormatted com mês por extenso em português", () => {
    const result = formatDate(dateString);
    expect(result.dateFormatted).toMatch(/abril/i);
    expect(result.dateFormatted).toMatch(/2026/);
  });

  it("retorna dayNumber com dois dígitos", () => {
    const result = formatDate(dateString);
    expect(result.dayNumber).toMatch(/^\d{2}$/);
  });

  it("retorna monthShort em maiúsculas", () => {
    const result = formatDate(dateString);
    expect(result.monthShort).toBe(result.monthShort.toUpperCase());
    expect(result.monthShort.length).toBeGreaterThanOrEqual(3);
  });

  it("retorna weekday em português", () => {
    const result = formatDate(dateString);
    // Dias da semana em pt-BR
    const weekdays = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ];
    expect(weekdays).toContain(result.weekday);
  });

  it("retorna year como string de 4 dígitos", () => {
    const result = formatDate(dateString);
    expect(result.year).toBe("2026");
    expect(result.year).toMatch(/^\d{4}$/);
  });

  it("retorna timeFormatted no formato HH:MM", () => {
    const result = formatDate(dateString);
    expect(result.timeFormatted).toMatch(/\d{2}:\d{2}/);
  });

  it("retorna todos os campos obrigatórios", () => {
    const result = formatDate(dateString);
    expect(result).toHaveProperty("dateFormatted");
    expect(result).toHaveProperty("timeFormatted");
    expect(result).toHaveProperty("dayNumber");
    expect(result).toHaveProperty("monthShort");
    expect(result).toHaveProperty("weekday");
    expect(result).toHaveProperty("year");
  });

  it("funciona para datas em janeiro", () => {
    const jan = "2026-01-01T12:00:00.000Z";
    const result = formatDate(jan);
    expect(result.dateFormatted).toMatch(/janeiro/i);
    expect(result.year).toBe("2026");
  });

  it("funciona para datas em dezembro", () => {
    const dec = "2026-12-31T12:00:00.000Z";
    const result = formatDate(dec);
    expect(result.dateFormatted).toMatch(/dezembro/i);
    expect(result.year).toBe("2026");
    expect(result.monthShort).toMatch(/dez/i);
  });
});

describe("isEventPast", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("retorna true para data no passado", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-01T12:00:00.000Z"));

    expect(isEventPast("2026-05-01T12:00:00.000Z")).toBe(true);
  });

  it("retorna false para data no futuro", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-01T12:00:00.000Z"));

    expect(isEventPast("2026-06-01T12:00:00.000Z")).toBe(false);
  });

  it("retorna true para data de ontem", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-15T12:00:00.000Z"));

    expect(isEventPast("2026-04-14T12:00:00.000Z")).toBe(true);
  });

  it("retorna false para data de amanhã", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-15T12:00:00.000Z"));

    expect(isEventPast("2026-04-16T12:00:00.000Z")).toBe(false);
  });
});
