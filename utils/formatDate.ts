import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface DateFormatted {
  /** Data completa formatada: "01 de Janeiro, 2024" */
  dateFormatted: string;
  /** Hora formatada: "14:30" */
  timeFormatted: string;
  /** Dia do mês: "01" */
  dayNumber: string;
  /** Mês abreviado: "JAN" */
  monthShort: string;
  /** Dia da semana: "segunda-feira" */
  weekday: string;
  /** Ano: "2024" */
  year: string;
}

export function formatDate(dateString: string): DateFormatted {
  const eventDate = new Date(dateString);

  return {
    dateFormatted: format(eventDate, "dd 'de' MMMM, yyyy", { locale: ptBR }),
    timeFormatted: eventDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    dayNumber: format(eventDate, "dd", { locale: ptBR }),
    monthShort: format(eventDate, "MMM", { locale: ptBR }).toUpperCase(),
    weekday: format(eventDate, "EEEE", { locale: ptBR }),
    year: format(eventDate, "yyyy", { locale: ptBR }),
  };
}
