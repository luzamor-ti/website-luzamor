import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseEnrollment } from "@/components/courses/CourseEnrollment";
import { Course } from "@/sanity/lib/types/course";

describe("CourseEnrollment", () => {
  const enrollment: Course["enrollment"] = {
    active: true,
    whatsapp: "5511999999999",
    messageText: "Olá, gostaria de me inscrever no curso",
    buttonText: "Inscreva-se agora",
  };

  it("renders the configured CTA text", () => {
    render(<CourseEnrollment enrollment={enrollment} />);

    expect(screen.getByText("saiba mais")).toBeInTheDocument();
  });

  it("builds the WhatsApp URL using the course message", () => {
    render(<CourseEnrollment enrollment={enrollment} />);

    const link = screen.getByRole("link", { name: "saiba mais" });

    expect(link).toHaveAttribute(
      "href",
      `https://wa.me/${enrollment.whatsapp}?text=${encodeURIComponent(
        enrollment.messageText || "",
      )}`,
    );
  });

  it("falls back to the default CTA text when none is provided", () => {
    const withoutButton = { ...enrollment };
    delete withoutButton.buttonText;

    render(<CourseEnrollment enrollment={withoutButton} />);

    expect(screen.getByText("saiba mais")).toBeInTheDocument();
  });

  it("uses the global WhatsApp number when the course does not define one", () => {
    const withoutWhatsapp = { ...enrollment };
    delete withoutWhatsapp.whatsapp;

    render(
      <CourseEnrollment
        enrollment={withoutWhatsapp}
        globalWhatsapp="5511888888888"
      />,
    );

    const link = screen.getByRole("link", { name: "saiba mais" });

    expect(link).toHaveAttribute(
      "href",
      `https://wa.me/5511888888888?text=${encodeURIComponent(
        enrollment.messageText || "",
      )}`,
    );
  });
});
