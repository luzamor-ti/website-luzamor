import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const config = await getGlobalConfiguration();
    return NextResponse.json({
      isUnderMaintenance: config?.isUnderMaintenance || false,
    });
  } catch (error) {
    console.error("Erro ao buscar configuração de manutenção:", error);
    // Em caso de erro, assume que o site não está em manutenção
    return NextResponse.json({
      isUnderMaintenance: false,
    });
  }
}
