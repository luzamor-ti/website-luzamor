import { client } from "../sanity/client";
import { ABOUT_PAGE_QUERY } from "../queries/about";
import { AboutPage } from "../types/about";
import { Member } from "../types/member";
import { Supporter } from "../types/supporter";
import { getFeaturedSupporters } from "./supporterService";
import { getMembersPage } from "./memberService";

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    return await client.fetch(ABOUT_PAGE_QUERY);
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

export async function getAboutPageData() {
  const [aboutPage, supporters, members] = await Promise.all([
    getAboutPage(),
    getFeaturedSupporters(),
    getMembersPage(),
  ]);

  return {
    aboutPage,
    supporters,
    members,
  };
}
