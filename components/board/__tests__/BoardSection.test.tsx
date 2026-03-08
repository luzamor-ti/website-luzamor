import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BoardSection } from "@/components/board/BoardSection";
import { Member } from "@/sanity/lib/types/member";

// ─────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────

function makeMember(overrides: Partial<Member> & { _id: string }): Member {
  return {
    name: "Test Member",
    role: "Membro",
    ...overrides,
  };
}

const mockPhoto = {
  _type: "image" as const,
  asset: { _ref: "image-test-ref", _type: "reference" as const },
};

const presidentMember = makeMember({
  _id: "m-president",
  name: "Ana Silva",
  role: "Presidente",
  roleType: "presidente",
  photo: mockPhoto,
  shortBio: "Líder da fundação há 10 anos.",
});

const vicePresidentMember = makeMember({
  _id: "m-vice",
  name: "Carlos Souza",
  role: "Vice-Presidente",
  roleType: "vice-presidente",
  photo: mockPhoto,
  shortBio: "Vice-presidente dedicado.",
});

const directorMember = makeMember({
  _id: "m-director",
  name: "Maria Lima",
  role: "Diretora de Projetos",
  roleType: "diretor",
  photo: mockPhoto,
  shortBio: "Diretora de projetos culturais.",
});

const memberWithoutBio = makeMember({
  _id: "m-no-bio",
  name: "Pedro Costa",
  role: "Conselheiro",
  roleType: "conselheiro",
});

const memberWithAlt = makeMember({
  _id: "m-with-alt",
  name: "Sofia Reis",
  role: "Secretária",
  roleType: "secretario",
  alt: "Foto de Sofia Reis, Secretária da Fundação",
  photo: mockPhoto,
  shortBio: "Secretária da fundação.",
});

// ─────────────────────────────────────────
// Tests
// ─────────────────────────────────────────

describe("BoardSection", () => {
  describe("empty state", () => {
    it("shows empty message when no members are provided", () => {
      render(<BoardSection members={[]} />);
      expect(
        screen.getByText("Nenhum membro da diretoria cadastrado ainda."),
      ).toBeInTheDocument();
    });
  });

  describe("group rendering and order", () => {
    it("renders each group label", () => {
      render(
        <BoardSection
          members={[presidentMember, vicePresidentMember, directorMember]}
        />,
      );
      // Group headings appear inside <h2> elements
      const headings = screen.getAllByRole("heading", { level: 2 });
      const headingTexts = headings.map((h) => h.textContent);
      expect(headingTexts).toContain("Presidência");
      expect(headingTexts).toContain("Vice-Presidência");
      expect(headingTexts).toContain("Diretoria Executiva");
    });

    it("renders member names within their groups", () => {
      render(
        <BoardSection members={[presidentMember, directorMember, memberWithoutBio]} />,
      );
      expect(screen.getByText("Ana Silva")).toBeInTheDocument();
      expect(screen.getByText("Maria Lima")).toBeInTheDocument();
      expect(screen.getByText("Pedro Costa")).toBeInTheDocument();
    });

    it("renders Presidência before other groups", () => {
      render(
        <BoardSection members={[directorMember, presidentMember]} />,
      );
      const groups = screen.getAllByRole("heading", { level: 2 });
      const groupLabels = groups.map((h) => h.textContent);
      const presidenciaIdx = groupLabels.indexOf("Presidência");
      const diretoriaIdx = groupLabels.indexOf("Diretoria Executiva");
      expect(presidenciaIdx).toBeLessThan(diretoriaIdx);
    });
  });

  describe("member card accessibility", () => {
    it("has role=button and tabIndex=0 for members with bio", () => {
      render(<BoardSection members={[presidentMember]} />);
      const card = screen.getByRole("button", {
        name: /Ver perfil de Ana Silva/i,
      });
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute("tabindex", "0");
    });

    it("does not have role=button for members without bio", () => {
      render(<BoardSection members={[memberWithoutBio]} />);
      expect(
        screen.queryByRole("button", { name: /Ver perfil de Pedro Costa/i }),
      ).not.toBeInTheDocument();
    });

    it("opens member detail on keyboard Enter press", () => {
      render(<BoardSection members={[presidentMember]} />);
      const card = screen.getByRole("button", {
        name: /Ver perfil de Ana Silva/i,
      });
      fireEvent.keyDown(card, { key: "Enter", code: "Enter" });
      expect(screen.getByText("Voltar para a diretoria")).toBeInTheDocument();
    });

    it("opens member detail on keyboard Space press", () => {
      render(<BoardSection members={[presidentMember]} />);
      const card = screen.getByRole("button", {
        name: /Ver perfil de Ana Silva/i,
      });
      fireEvent.keyDown(card, { key: " ", code: "Space" });
      expect(screen.getByText("Voltar para a diretoria")).toBeInTheDocument();
    });
  });

  describe("member selection and detail view", () => {
    it("shows member detail when a card is clicked", () => {
      render(<BoardSection members={[presidentMember]} />);
      fireEvent.click(
        screen.getByRole("button", { name: /Ver perfil de Ana Silva/i }),
      );
      expect(screen.getByText("Ana Silva")).toBeInTheDocument();
      expect(screen.getByText("Líder da fundação há 10 anos.")).toBeInTheDocument();
      expect(screen.getByText("Voltar para a diretoria")).toBeInTheDocument();
    });

    it("returns to board grid when back button is clicked", () => {
      render(<BoardSection members={[presidentMember, directorMember]} />);
      fireEvent.click(
        screen.getByRole("button", { name: /Ver perfil de Ana Silva/i }),
      );
      fireEvent.click(screen.getByText("Voltar para a diretoria"));
      const headings = screen.getAllByRole("heading", { level: 2 });
      const headingTexts = headings.map((h) => h.textContent);
      expect(headingTexts).toContain("Presidência");
      expect(headingTexts).toContain("Diretoria Executiva");
    });

    it("does not open detail for member without bio on click", () => {
      render(<BoardSection members={[memberWithoutBio]} />);
      // memberWithoutBio has no bio, so card is not clickable (no role=button)
      expect(
        screen.queryByText("Voltar para a diretoria"),
      ).not.toBeInTheDocument();
    });
  });

  describe("president CTA", () => {
    it("shows Palavra do Presidente CTA for president (roleType=presidente)", () => {
      render(<BoardSection members={[presidentMember]} />);
      fireEvent.click(
        screen.getByRole("button", { name: /Ver perfil de Ana Silva/i }),
      );
      expect(
        screen.getByText("Leia a Palavra do Presidente"),
      ).toBeInTheDocument();
    });

    it("does NOT show Palavra do Presidente CTA for vice-president", () => {
      render(<BoardSection members={[vicePresidentMember]} />);
      fireEvent.click(
        screen.getByRole("button", { name: /Ver perfil de Carlos Souza/i }),
      );
      expect(
        screen.queryByText("Leia a Palavra do Presidente"),
      ).not.toBeInTheDocument();
    });

    it("does NOT show Palavra do Presidente CTA for other roles", () => {
      render(<BoardSection members={[directorMember]} />);
      fireEvent.click(
        screen.getByRole("button", { name: /Ver perfil de Maria Lima/i }),
      );
      expect(
        screen.queryByText("Leia a Palavra do Presidente"),
      ).not.toBeInTheDocument();
    });
  });

  describe("image alt text", () => {
    it("uses member.alt when available for image alt text", () => {
      render(<BoardSection members={[memberWithAlt]} />);
      // Open detail view to check detail image alt
      fireEvent.click(
        screen.getByRole("button", { name: /Ver perfil de Sofia Reis/i }),
      );
      const imgs = screen.getAllByRole("img");
      const hasAltField = imgs.some(
        (el) => el.getAttribute("alt") === memberWithAlt.alt,
      );
      expect(hasAltField).toBe(true);
    });

    it("falls back to member.name for image alt when alt field is absent", () => {
      render(<BoardSection members={[presidentMember]} />);
      // In the card list, the image alt should be the member's name
      const imgs = screen.getAllByRole("img");
      const hasFallbackAlt = imgs.some(
        (el) => el.getAttribute("alt") === presidentMember.name,
      );
      expect(hasFallbackAlt).toBe(true);
    });
  });
});
