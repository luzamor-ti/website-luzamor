import { client } from "../sanity/client";
import { faqQuery, faqResumoQuery } from "../queries/faq";
import { Faq } from "../types/faq";

export async function getFaqs(): Promise<Faq[]> {
  return client.fetch(faqQuery);
}

export async function getFaqSummary(): Promise<Faq[]> {
  return client.fetch(faqResumoQuery);
}
