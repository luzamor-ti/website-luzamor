import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Formata data de evento para exibição
 * Extrai informações comuns usadas em múltiplos componentes
 */
export interface EventDateFormatted {
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

/**
 * Formata uma data de evento para todos os formatos comuns
 * @param dateString - String ISO da data do evento
 * @returns Objeto com todas as formatações comuns
 */
export function formatEventDate(dateString: string): EventDateFormatted {
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

/**
 * Verifica se um evento já passou
 * @param dateString - String ISO da data do evento
 * @returns true se o evento já passou
 */
export function isEventPast(dateString: string): boolean {
  return new Date(dateString) < new Date();
}
