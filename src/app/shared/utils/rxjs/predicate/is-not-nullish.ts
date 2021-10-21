export function isNotNullish<T>(toCheck: T): toCheck is Exclude<T, null | undefined> {
  return toCheck != null;
}
