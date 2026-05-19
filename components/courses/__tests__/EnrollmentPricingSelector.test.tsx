import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EnrollmentPricingSelector } from "@/components/courses/EnrollmentPricingSelector";

describe("EnrollmentPricingSelector", () => {
  const options = [
    {
      title: "Aulas Individuais",
      free: false,
      price: 150,
      details: "Atendimento personalizado",
    },
    {
      title: "Aulas em Grupo",
      free: false,
      price: 80,
      details: "Turma reduzida",
    },
    {
      title: "Aula Experimental Individual",
      free: true,
      details: "Primeira aula gratuita",
    },
    {
      title: "Aula Experimental em Grupo",
      free: true,
      details: "Primeiro encontro gratuito",
    },
  ];

  it("renders the pricing options as a radio group", () => {
    render(<EnrollmentPricingSelector options={options} />);

    expect(screen.getByText(/selecione a modalidade/i)).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(4);
    expect(screen.getByRole("radio", { name: /aulas individuais/i })).toBeChecked();
    expect(screen.getByText("R$ 150,00")).toBeInTheDocument();
    expect(screen.getAllByText("Gratuito")).toHaveLength(2);
  });

  it("selects another option and calls the callback", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <EnrollmentPricingSelector options={options} onSelect={onSelect} />,
    );

    await user.click(screen.getByRole("radio", { name: /aulas em grupo/i }));

    expect(screen.getByRole("radio", { name: /aulas em grupo/i })).toBeChecked();
    expect(onSelect).toHaveBeenCalledWith(options[1]);
  });

  it("returns null when there are no options", () => {
    const { container } = render(<EnrollmentPricingSelector options={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
