import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas que não devem ser bloqueadas pela manutenção
  const excludedPaths = [
    "/maintenance",
    "/fundacao-cms",
    "/api",
    "/_next",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
    "/illustrations",
    "/public",
  ];

  // Verifica se a rota atual é uma das excluídas
  const isExcludedPath = excludedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (!isExcludedPath) {
    try {
      // Busca a configuração global
      const response = await fetch(
        `${request.nextUrl.origin}/api/maintenance-check`,
        {
          method: "GET",
          headers: {
            "X-Skip-Middleware": "true",
          },
        },
      );

      if (response.ok) {
        const data = await response.json();

        // Se o site está em manutenção, redireciona
        if (data.isUnderMaintenance) {
          return NextResponse.redirect(new URL("/maintenance", request.url));
        }
      }
    } catch (error) {
      // Em caso de erro, permite o acesso normal
      console.error("Erro ao verificar status de manutenção:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
