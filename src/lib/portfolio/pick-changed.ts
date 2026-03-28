import { isEmpty, isEqual, pickBy } from "lodash";

/**
 * Returns a partial object containing only keys whose values differ from `prev`
 * (deep compare via lodash `isEqual`). Arrays are compared wholesale.
 */
export function pickChangedRecord<T extends Record<string, unknown>>(
  next: T,
  prev: T,
): Partial<T> {
  return pickBy(next, (value, key) => !isEqual(value, prev[key as keyof T])) as Partial<T>;
}

export function hasChanges<T extends Record<string, unknown>>(
  patch: Partial<T>,
): boolean {
  return !isEmpty(patch);
}
