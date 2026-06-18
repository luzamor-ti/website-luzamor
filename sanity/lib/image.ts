import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidSanityImage = (image: any): boolean => {
  if (!image) return false;

  // Check if it's a valid Sanity image object with asset
  // Asset can be:
  // 1. Unexpanded reference: { _ref: "image-xxx", _type: "reference" }
  // 2. Expanded object: { _id: "xxx", url: "...", ... }
  return (
    typeof image === "object" &&
    image.asset &&
    typeof image.asset === "object" &&
    (image.asset._ref || image.asset._id || image.asset.url)
  );
};
