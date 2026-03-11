import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Painel de Administração")
    .items([
      // ── PÁGINA INICIAL ────────────────────────────────────────
      S.listItem()
        .title("🏠 Página Inicial")
        .child(
          S.list()
            .title("Página Inicial")
            .items([
              S.documentTypeListItem("hero").title("Banner Principal (Hero)"),
              S.documentTypeListItem("secaoHome").title(
                "Seções da Página Inicial",
              ),
            ]),
        ),

      S.divider(),

      // ── CONTEÚDO ─────────────────────────────────────────────
      S.listItem()
        .title("📋 Conteúdo")
        .child(
          S.list()
            .title("Conteúdo do Site")
            .items([
              S.documentTypeListItem("projeto").title("Projetos"),
              S.documentTypeListItem("evento").title("Eventos"),
              S.documentTypeListItem("curso").title("Cursos"),
              S.documentTypeListItem("faq").title("Perguntas Frequentes (FAQ)"),
            ]),
        ),

      S.divider(),

      // ── EQUIPE ───────────────────────────────────────────────
      S.documentTypeListItem("membro").title("👥 Membros da Equipe"),

      S.divider(),

      // ── PARCEIROS ────────────────────────────────────────────
      S.listItem()
        .title("🤝 Parceiros e Apoiadores")
        .child(
          S.list()
            .title("Parceiros e Apoiadores")
            .items([
              S.documentTypeListItem("apoiador").title(
                "Apoiadores e Patrocinadores",
              ),
              S.documentTypeListItem("incentivador").title(
                "Leis de Incentivo e Editais",
              ),
              S.documentTypeListItem("realizacao").title("Realizações"),
            ]),
        ),

      S.divider(),

      // ── ESPAÇOS ──────────────────────────────────────────────
      S.listItem()
        .title("🏛️ Espaços da Fundação")
        .child(
          S.list()
            .title("Espaços da Fundação")
            .items([
              S.documentTypeListItem("auditorio").title("Auditório"),
              S.documentTypeListItem("salaAula").title("Salas de Aula"),
            ]),
        ),

      S.divider(),

      // ── PÁGINAS DO SITE ──────────────────────────────────────
      S.listItem()
        .title("📄 Páginas do Site")
        .child(
          S.list()
            .title("Páginas do Site")
            .items([
              S.documentTypeListItem("sobreNos").title("Sobre Nós"),
              S.documentTypeListItem("paginaParceiros").title(
                "Parceiros e Apoiadores",
              ),
            ]),
        ),

      S.divider(),

      // ── CONFIGURAÇÕES ────────────────────────────────────────
      S.listItem()
        .title("⚙️ Configurações do Site")
        .child(
          S.list()
            .title("Configurações do Site")
            .items([
              S.documentTypeListItem("configuracaoGlobal").title(
                "Configuração Geral",
              ),
              S.documentTypeListItem("navbar").title("Menu de Navegação"),
              S.documentTypeListItem("rodape").title("Rodapé"),
            ]),
        ),
    ]);
