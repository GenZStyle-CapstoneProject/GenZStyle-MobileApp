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
  const timeArr = getTime.split(":");
  const messageTime = `${timeArr[0]}:${timeArr[1]} ${
    timeArr[0] >= 12 ? "PM" : "AM"
  }`;

  return messageTime;
};
