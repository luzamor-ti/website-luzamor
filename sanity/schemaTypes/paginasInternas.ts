/**
 * Lista centralizada de páginas internas do site.
 * Os valores são os paths completos usados diretamente como href nos componentes.
 *
 * Usado em: hero.ts, secaoHome.ts (campos de URL de botões/links)
 * Atenção: navbar.ts usa sua própria lista com slug simples (sem "/") — manter separado.
 */
export const paginasInternas = [
  { title: "🏠 Home", value: "/" },
  { title: "📋 Sobre Nós", value: "/sobre-nos" },
  { title: "🎯 Projetos", value: "/projetos" },
  { title: "📅 Calendário de Eventos", value: "/calendario-eventos" },
  { title: "📚 Cursos", value: "/cursos" },
  { title: "🏫 Salas de Aula", value: "/salas-aula" },
  { title: "🎤 Auditório", value: "/auditorio" },
  { title: " Diretoria", value: "/diretoria" },
  { title: "🗣️ Palavra do Presidente", value: "/palavra-presidente" },
  { title: "🤝 Patrocinador / Apoiadores", value: "/patrocinador" },
];
