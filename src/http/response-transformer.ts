const DATE_FIELD = /(?:^|_)(?:at|date|time)$/i;

/** Convert API values to the client-facing key and date conventions. */
export function transformResponse(value: unknown): unknown {
  return transformValue(value);
}

function transformValue(value: unknown, key?: string): unknown {
  if (key && DATE_FIELD.test(key) && typeof value === "string") return new Date(value);
  if (Array.isArray(value)) return value.map((item) => transformValue(item));
  if (typeof value !== "object" || value === null) return value;

  return Object.fromEntries(
    Object.entries(value).map(([name, item]) => [toCamelCase(name), transformValue(item, name)]),
  );
}

/** Convert snake_case names to lowerCamelCase. */
function toCamelCase(name: string): string {
  return name.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}
