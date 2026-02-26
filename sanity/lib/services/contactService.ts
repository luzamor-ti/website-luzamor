import { client } from "../sanity/client";
import { contatoQuery, contatosQuery } from "../queries/contact";
import { Contact } from "../types/contact";

export async function getContact(): Promise<Contact | null> {
  return client.fetch(contatoQuery);
}

export async function getContacts(): Promise<Contact[]> {
  return client.fetch(contatosQuery);
}
