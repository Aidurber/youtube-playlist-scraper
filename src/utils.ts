/**
 * Check whether something is an object
 * @param obj - Value to check
 */
const isObject = (obj: any): boolean => obj && typeof obj === "object";

/**
 * Deeply merge two objects, merging the right-most down
 *
 * @export
 * @param {...object[]} objects
 * @returns
 */
export function mergeDeep(...objects: object[]) {
  return objects.reduce(
    (prev: Record<string, any>, obj: Record<string, any>) => {
      const keys = Object.keys(obj);
      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];
        const pVal = prev[key];
        const oVal = obj[key];
        if (Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = [...pVal, ...oVal];
        } else if (isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal);
        } else {
          prev[key] = oVal;
        }
      }
      return prev;
    },
    {}
  );
}
