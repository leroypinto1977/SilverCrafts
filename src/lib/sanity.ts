import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Validate required environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable");
}
if (!dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET environment variable");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-29",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

// Helper function for image URLs
export function urlFor(source: any) {
  return builder.image(source);
}
