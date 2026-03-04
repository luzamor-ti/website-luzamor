export const routesPath = {
  home: "/",
  about: "/sobre-nos",
  projects: "/projetos",
  contact: "/contato",
  courses: "/cursos",
  events: "/calendario-eventos",
  classrooms: "/salas-aula",
  auditorium: "/auditorio",
  board: "/diretoria",
  presidentWord: "/palavra-presidente",
  sponsor: "/patrocinador",
} as const;

export type RoutePath = (typeof routesPath)[keyof typeof routesPath];
