const toCamel = (str) => {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

const isObject = function (obj) {
  return (
    obj === Object(obj) &&
    !Array.isArray(obj) &&
    typeof obj !== "function" &&
    !(obj instanceof Date)
  );
};

function keysToCamel(obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj).forEach((k) => {
      //if key is 'date' and value is a date object, convert it to a string
      if (obj[k] instanceof Date) {
        n[k] = obj[k].toLocaleDateString();
      } else {
        n[toCamel(k)] = keysToCamel(obj[k]);
      }
    });

    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i);
    });
  }

  return obj;
}

module.exports = { keysToCamel };
