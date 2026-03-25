import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";
import { MaintenancePage as MaintenancePageComponent } from "@/components/MaintenancePage";

export const metadata = {
  title: "Manutenção",
  robots: "noindex, nofollow",
};

export default async function MaintenancePage() {
  const config = await getGlobalConfiguration();
  const message =
    config?.maintenanceMessage ||
    "Desculpe! O site está em manutenção. Em breve estaremos de volta.";
  const primaryColor = config?.theme?.primaryColor || "#00B749";

  return (
    <MaintenancePageComponent message={message} primaryColor={primaryColor} />
  );
}
