// Converts a string into a URL-friendly slug:
// lowercase, trimmed, spaces -> hyphens, non-alphanumeric (except hyphen) stripped.
const slugify = (text) => {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/[^a-z0-9-]/g, "") // strip non-alphanumeric except hyphen
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
};

// Given a base slug and an async checker that resolves true if a slug is taken,
// returns a unique slug, appending -2, -3, ... on collision.
const generateUniqueSlug = async (base, existsFn) => {
  let slug = slugify(base);
  if (!slug) slug = "item";

  let candidate = slug;
  let counter = 2;
  while (await existsFn(candidate)) {
    candidate = `${slug}-${counter}`;
    counter++;
  }
  return candidate;
};

module.exports = { slugify, generateUniqueSlug };
