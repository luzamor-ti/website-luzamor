import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  buildEventCTA,
  getCTAButtonText,
  handleEventCTAClick,
} from "@/utils/eventCta";
import { EVENT_DETAIL_FALLBACKS } from "@/constants/textFallbacks";
import { createMockEvent } from "@/components/events/__tests__/eventMocks";

// ─────────────────────────────────────────
// Tests for eventCta utilities
// ─────────────────────────────────────────

const base = createMockEvent();

describe("buildEventCTA — fallback (CTA desabilitado)", () => {
  it("retorna href do WhatsApp global quando cta.enabled é false", () => {
    const event = createMockEvent({ cta: { enabled: false } });
    const result = buildEventCTA(event);

    expect(result.href).toContain("wa.me");
    expect(result.href).toContain(EVENT_DETAIL_FALLBACKS.globalWhatsapp);
    expect(result.isExternal).toBe(true);
  });

  it("inclui título do evento na mensagem do WhatsApp fallback", () => {
    const event = createMockEvent({ cta: { enabled: false } });
    const result = buildEventCTA(event);

    expect(result.href).toContain(encodeURIComponent(event.title));
  });

  it("retorna href do WhatsApp global quando cta é undefined", () => {
    const event = createMockEvent({ cta: undefined });
    const result = buildEventCTA(event);

    expect(result.href).toContain("wa.me");
    expect(result.isExternal).toBe(true);
  });
});

describe("buildEventCTA — tipo 'link'", () => {
  it("retorna o link informado", () => {
    const event = createMockEvent({
      cta: { enabled: true, type: "link", link: "https://example.com/ticket" },
    });
    const result = buildEventCTA(event);

    expect(result.href).toBe("https://example.com/ticket");
    expect(result.isExternal).toBe(true);
  });

  it("retorna '#' quando link não está preenchido", () => {
    const event = createMockEvent({
      cta: { enabled: true, type: "link", link: undefined },
    });
    const result = buildEventCTA(event);

    expect(result.href).toBe("#");
  });
});

describe("buildEventCTA — tipo 'whatsapp'", () => {
  it("usa número do evento quando fornecido", () => {
    const event = createMockEvent({
      cta: {
        enabled: true,
        type: "whatsapp",
        whatsapp: "5511888888888",
        whatsappMessage: "Quero participar!",
      },
    });
    const result = buildEventCTA(event);

    expect(result.href).toContain("wa.me/5511888888888");
    expect(result.href).toContain(encodeURIComponent("Quero participar!"));
    expect(result.isExternal).toBe(true);
  });

  it("usa número global quando whatsapp não está preenchido", () => {
    const event = createMockEvent({
      cta: { enabled: true, type: "whatsapp", whatsapp: undefined },
    });
    const result = buildEventCTA(event);

    expect(result.href).toContain(EVENT_DETAIL_FALLBACKS.globalWhatsapp);
  });

  it("usa mensagem padrão com título do evento quando whatsappMessage é undefined", () => {
    const event = createMockEvent({
      cta: {
        enabled: true,
        type: "whatsapp",
        whatsapp: "5511888888888",
        whatsappMessage: undefined,
      },
    });
    const result = buildEventCTA(event);

    expect(result.href).toContain(encodeURIComponent(event.title));
  });
});

describe("buildEventCTA — tipo 'email'", () => {
  it("retorna href mailto com e-mail do evento", () => {
    const event = createMockEvent({
      cta: {
        enabled: true,
        type: "email",
        email: "contato@fundacao.org",
      },
    });
    const result = buildEventCTA(event);

    expect(result.href).toContain("mailto:contato@fundacao.org");
    expect(result.href).toContain("subject=");
    expect(result.href).toContain(encodeURIComponent(event.title));
    expect(result.isExternal).toBe(false);
  });
});

describe("getCTAButtonText", () => {
  it("retorna buttonText do evento quando definido", () => {
    const event = createMockEvent({
      cta: { enabled: true, buttonText: "Garanta sua vaga!" },
    });
    expect(getCTAButtonText(event)).toBe("Garanta sua vaga!");
  });

  it("retorna fallback quando buttonText é undefined", () => {
    const event = createMockEvent({
      cta: { enabled: true, buttonText: undefined },
    });
    expect(getCTAButtonText(event)).toBe(EVENT_DETAIL_FALLBACKS.ctaButtonText);
  });

  it("retorna fallback quando cta é undefined", () => {
    const event = createMockEvent({ cta: undefined });
    expect(getCTAButtonText(event)).toBe(EVENT_DETAIL_FALLBACKS.ctaButtonText);
  });
});

describe("handleEventCTAClick", () => {
  let windowOpenSpy: ReturnType<typeof vi.spyOn>;
  let windowLocationHref: string;

  beforeEach(() => {
    windowOpenSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    // Mock window.location.href setter
    Object.defineProperty(window, "location", {
      value: {
        href: "",
        assign: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("abre WhatsApp global quando cta não está habilitado", () => {
    const event = createMockEvent({ cta: { enabled: false } });
    handleEventCTAClick(event);

    expect(windowOpenSpy).toHaveBeenCalledOnce();
    const [url, target] = windowOpenSpy.mock.calls[0];
    expect(url).toContain("wa.me");
    expect(url).toContain(EVENT_DETAIL_FALLBACKS.globalWhatsapp);
    expect(target).toBe("_blank");
  });

  it("abre link externo para tipo 'link'", () => {
    const event = createMockEvent({
      cta: { enabled: true, type: "link", link: "https://event.com" },
    });
    handleEventCTAClick(event);

    expect(windowOpenSpy).toHaveBeenCalledWith("https://event.com", "_blank");
  });

  it("não abre janela quando tipo é 'link' e link está vazio", () => {
    const event = createMockEvent({
      cta: { enabled: true, type: "link", link: undefined },
    });
    handleEventCTAClick(event);

    expect(windowOpenSpy).not.toHaveBeenCalled();
  });

  it("abre WhatsApp correto para tipo 'whatsapp'", () => {
    const event = createMockEvent({
      cta: {
        enabled: true,
        type: "whatsapp",
        whatsapp: "5511777777777",
        whatsappMessage: "Olá!",
      },
    });
    handleEventCTAClick(event);

    expect(windowOpenSpy).toHaveBeenCalledOnce();
    const [url, target] = windowOpenSpy.mock.calls[0];
    expect(url).toContain("wa.me/5511777777777");
    expect(target).toBe("_blank");
  });

  it("define window.location.href para tipo 'email'", () => {
    const event = createMockEvent({
      cta: {
        enabled: true,
        type: "email",
        email: "inscricao@fundacao.org",
      },
    });
    handleEventCTAClick(event);

    expect(window.location.href).toContain("mailto:inscricao@fundacao.org");
  });
});
