export function groupByArray(xs, key) {
  return xs.reduce(function (rv, x) {
    let v = key instanceof Function ? key(x) : x[key];
    let el = rv.find((r) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({ key: v, values: [x] });
    }
    return rv;
  }, []);
}
export const parseMessageTime = (timeString) => {
  const getTime = timeString?.split(",")[1];
  return getTime.slice(0, 5) + " " + getTime.slice(8);
};
