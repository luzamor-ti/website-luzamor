import { client } from "../sanity/client";
import {
  membersHomeQuery,
  membersPageQuery,
  wordsOfPresidentPageQuery,
  boardMembersQuery,
} from "../queries/member";
import { Member } from "../types/member";

export async function getMembersHome(): Promise<Member[]> {
  return client.fetch(membersHomeQuery);
}

export async function getMembersPage(): Promise<Member[]> {
  return client.fetch(membersPageQuery);
}

export async function getWordsOfPresident(): Promise<Member> {
  return client.fetch(wordsOfPresidentPageQuery);
}

export async function getBoardMembers(): Promise<Member[]> {
  try {
    return await client.fetch(boardMembersQuery);
  } catch (error) {
    console.error("[memberService] Failed to fetch board members:", error);
    return [];
  }
}
