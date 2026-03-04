import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EventsTabNavigation } from "@/components/page-templates/calendario-eventos/EventsTabNavigation";
import { useState } from "react";
import type { EventsTab, EventsView } from "@/components/page-templates/calendario-eventos/EventsTabNavigation";

const meta = {
  title: "Events/EventsTabNavigation",
  component: EventsTabNavigation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navegação por abas (Próximos/Passados) e toggle de visualização (Lista/Calendário). Mobile-first com full-width tabs em mobile e compact em desktop. Touch-friendly com min-height de 44px.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    activeTab: {
      control: "select",
      options: ["upcoming", "past"],
      description: "Aba ativa: 'upcoming' ou 'past'",
    },
    onTabChange: {
      description: "Callback quando troca de aba",
    },
    activeView: {
      control: "select",
      options: ["list", "calendar"],
      description: "Visualização ativa: 'list' ou 'calendar'",
    },
    onViewChange: {
      description: "Callback quando troca de visualização",
    },
  },
} satisfies Meta<typeof EventsTabNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper com estado para interatividade
const InteractiveWrapper = (args: {
  initialTab?: EventsTab;
  initialView?: EventsView;
}) => {
  const [activeTab, setActiveTab] = useState<EventsTab>(args.initialTab || "upcoming");
  const [activeView, setActiveView] = useState<EventsView>(args.initialView || "list");

  return (
    <div className="max-w-6xl mx-auto">
      <EventsTabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-700">
          <strong>Aba Ativa:</strong> {activeTab === "upcoming" ? "Próximos Eventos" : "Eventos Passados"}
        </p>
        <p className="text-gray-700 mt-2">
          <strong>Visualização:</strong> {activeView === "list" ? "Lista" : "Calendário"}
        </p>
      </div>
    </div>
  );
};

export const ProximosEventosLista: Story = {
  args: {
    activeTab: "upcoming",
    onTabChange: () => {},
    activeView: "list",
    onViewChange: () => {},
  },
};

export const EventosPassadosLista: Story = {
  args: {
    activeTab: "past",
    onTabChange: () => {},
    activeView: "list",
    onViewChange: () => {},
  },
};

export const ProximosEventosCalendario: Story = {
  args: {
    activeTab: "upcoming",
    onTabChange: () => {},
    activeView: "calendar",
    onViewChange: () => {},
  },
};

export const EventosPassadosCalendario: Story = {
  args: {
    activeTab: "past",
    onTabChange: () => {},
    activeView: "calendar",
    onViewChange: () => {},
  },
};

export const Interativo: Story = {
  args: {
    activeTab: "upcoming",
    onTabChange: () => {},
    activeView: "list",
    onViewChange: () => {},
  },
  render: () => <InteractiveWrapper />,
};

export const MobileView: Story = {
  args: {
    activeTab: "upcoming",
    onTabChange: () => {},
    activeView: "list",
    onViewChange: () => {},
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const TabletView: Story = {
  args: {
    activeTab: "upcoming",
    onTabChange: () => {},
    activeView: "list",
    onViewChange: () => {},
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

export const InterativoMobile: Story = {
  args: {
    activeTab: "past",
    onTabChange: () => {},
    activeView: "calendar",
    onViewChange: () => {},
  },
  render: () => <InteractiveWrapper initialTab="past" initialView="calendar" />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
