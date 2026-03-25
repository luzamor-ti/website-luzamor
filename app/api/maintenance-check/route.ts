import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const config = await getGlobalConfiguration();
    return NextResponse.json(
      {
        isUnderMaintenance: config?.isUnderMaintenance || false,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Erro ao buscar configuração de manutenção:", error);
    // Em caso de erro, assume que o site não está em manutenção
    return NextResponse.json(
      {
        isUnderMaintenance: false,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
