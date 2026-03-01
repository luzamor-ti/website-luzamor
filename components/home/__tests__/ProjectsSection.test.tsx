import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { Project } from "@/sanity/lib/types/project";
import { HomeSection } from "@/sanity/lib/types/homeSection";

describe("ProjectsSection", () => {
  const mockProjects: Project[] = [
    {
      _id: "1",
      title: "Project 1",
      slug: { current: "project-1" },
      shortDescription: "Description for project 1",
      category: "Education",
      raisedAmount: 5000,
      goalAmount: 10000,
    },
    {
      _id: "2",
      title: "Project 2",
      slug: { current: "project-2" },
      shortDescription: "Description for project 2",
      category: "Health",
      raisedAmount: 8000,
      goalAmount: 15000,
    },
  ] as Project[];

  const mockSection: HomeSection = {
    _id: "section-1",
    tag: "Nossos Projetos",
    title: "Conheça nossos projetos",
    description: "Veja os projetos que estamos desenvolvendo",
  } as HomeSection;

  it("renders projects correctly", () => {
    render(<ProjectsSection data={mockProjects} section={mockSection} />);

    expect(screen.getByText("Project 1")).toBeInTheDocument();
    expect(screen.getByText("Project 2")).toBeInTheDocument();
  });

  it("renders section header with data", () => {
    render(<ProjectsSection data={mockProjects} section={mockSection} />);

    expect(screen.getByText("Nossos Projetos")).toBeInTheDocument();
    expect(screen.getByText("Conheça nossos projetos")).toBeInTheDocument();
  });

  it("uses fallback text when section is null", () => {
    render(<ProjectsSection data={mockProjects} section={null} />);

    expect(screen.getByText("Projetos")).toBeInTheDocument();
  });

  it("renders project descriptions", () => {
    render(<ProjectsSection data={mockProjects} section={mockSection} />);

    expect(screen.getByText("Description for project 1")).toBeInTheDocument();
    expect(screen.getByText("Description for project 2")).toBeInTheDocument();
  });

  it("renders project categories", () => {
    render(<ProjectsSection data={mockProjects} section={mockSection} />);

    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
  });

  it("formats currency correctly", () => {
    render(<ProjectsSection data={mockProjects} section={mockSection} />);

    // Brazilian currency format
    expect(screen.getByText(/R\$\s*5\.000,00/)).toBeInTheDocument();
    expect(screen.getByText(/R\$\s*8\.000,00/)).toBeInTheDocument();
  });

  it("renders null when no projects", () => {
    const { container } = render(
      <ProjectsSection data={[]} section={mockSection} />,
    );

    // Component returns null when there are no projects
    expect(container.firstChild).toBeNull();
  });
});
