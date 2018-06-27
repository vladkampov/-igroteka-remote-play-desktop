export default function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((total, key) => {
    const value = obj[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      Object.assign(total, { [prefixedKey]: value });
    } else {
      Object.assign(total, flattenObject(value, prefixedKey));
    }

    return total;
  }, {});
}
