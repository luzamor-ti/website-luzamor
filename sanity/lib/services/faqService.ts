import { client } from "../sanity/client";
import { faqQuery, faqResumoQuery } from "../queries/faq";
import { Faq } from "../types/faq";

export async function getFaq(): Promise<Faq[]> {
  return client.fetch(faqQuery);
}

export async function getFaqResumo(): Promise<Faq[]> {
  return client.fetch(faqResumoQuery);
}
