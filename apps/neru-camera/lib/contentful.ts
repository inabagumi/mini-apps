import { createClient as createContentfulClient } from "contentful";
import type {
  ContentfulClientApi,
  EntryFieldTypes,
  EntrySkeletonType,
} from "contentful";

export type OverlayEntrySkeleton = EntrySkeletonType<
  {
    keyColor: EntryFieldTypes.Text;
    media: EntryFieldTypes.AssetLink;
    name: EntryFieldTypes.Text;
  },
  "overlay"
>;

export const createClient = (): ContentfulClientApi<undefined> => {
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
    throw new TypeError("The access token is required.");
  }
  if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID) {
    throw new TypeError("The space ID is required.");
  }

  return createContentfulClient({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  });
};
