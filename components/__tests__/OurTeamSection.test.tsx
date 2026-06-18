             /* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { OurTeamSection } from "../about";

vi.mock("@/sanity/lib/image", () => ({
  urlFor: vi.fn().mockReturnValue({
    width: vi.fn().mockReturnValue({
      height: vi.fn().mockReturnValue({
        url: vi.fn().mockReturnValue("https://cdn.sanity.io/images/mock-url"),
      }),
      url: vi.fn().mockReturnValue("https://cdn.sanity.io/images/mock-url"),
    }),
    url: vi.fn().mockReturnValue("https://cdn.sanity.io/images/mock-url"),
  }),
  isValidSanityImage: vi.fn().mockReturnValue(true),
}));

describe("OurTeamSection (imagemGrupo + diretoria)", () => {
  it("renders group image when imagemGrupo present and hides individual photos for non-directoria", () => {
    const data = {
      tag: "Nosso Time",
      titulo: "Pessoas dedicadas à transformação",
      descricao: [
        {
          _type: "block",
          _key: "a1",
          children: [{ _type: "span", _key: "s1", text: "Conheça a equipe" }],
          markDefs: [],
          style: "normal",
        },
      ],
      imagemGrupo: {
        _type: "image",
        asset: { _ref: "image-group" },
        alt: "Grupo",
      },
    };

    const members = [
      { _id: "1", name: "Member A", diretoria: false },
      {
        _id: "2",
        name: "Director B",
        diretoria: true,
        photo: { _type: "image", asset: { _ref: "img-b" } },
      },
    ];

    render(<OurTeamSection data={data as any} members={members as any} />);

    const groupImg = screen.getByAltText(/grupo/i);
    expect(groupImg).toBeInTheDocument();

    const memberA = screen.queryByAltText(/member a/i);
    expect(memberA).toBeNull();

    const director = screen.getByAltText(/director b/i);
    expect(director).toBeInTheDocument();
  });
});
