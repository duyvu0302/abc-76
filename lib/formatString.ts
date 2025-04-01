export default function formatString(str: unknown): string {
  if (typeof str !== "string") {
    return "";
  }

  const normalizedStr = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-]/g, "") // Allow hyphens in addition to alphanumeric characters
    .toLowerCase();

  return normalizedStr || "";
}
