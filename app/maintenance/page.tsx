import { getFreshGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
import { MaintenancePage as MaintenancePageComponent } from "@/components/MaintenancePage";
import { MAINTENANCE_PAGE_FALLBACKS } from "@/constants/textFallbacks";

export const metadata = {
  title: "Manutenção",
  robots: "noindex, nofollow",
};

// Ensure this page is never statically cached — maintenance state must always be fresh.
export const revalidate = 0;

export default async function MaintenancePage() {
  const config = await getFreshGlobalConfiguration();
  const message =
    config?.maintenanceMessage || MAINTENANCE_PAGE_FALLBACKS.message;
  const primaryColor =
    config?.theme?.primaryColor || MAINTENANCE_PAGE_FALLBACKS.primaryColor;

  return (
    <MaintenancePageComponent message={message} primaryColor={primaryColor} />
  );
}
