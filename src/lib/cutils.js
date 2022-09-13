export const BILLION = 1000000000;

export const mapBlockTypeToColor = (bType) => {
  let theMap = {
    Genesis: "#2fe329",
    Coinbase: "#f7a705",
  };

  if (theMap[bType] != "") {
    return theMap[bType];
  }
  return "#ffffff";
};

export const hash6c = (s) => {
  return s.substring(0, 6);
};

export const hash16c = (s) => {
  return s.substring(0, 16);
};

export const hash32c = (s) => {
  return s.substring(0, 32);
};

export const convertBPaiToPai = (v) => {
  return v / 1000000000;
};

export const convertBPaiToPaiInt = (v) => {
  return Math.trunc(v / 1000000000);
};

export const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const getColorCode = (x) => {
  return hash6c(keccak256(x).toString("hex"));
};

export const shortBech16 = (s) => {
  return s.substring(0, 5) + "..." + s.substring(48, s.length);
};

export const arrayRemove = (array, item, attrName) => {
  console.log("typeof(item)", typeof array[0]);
  if (typeof array[0] === "object") {
    var index = array.findIndex((e) => e[attrName] === item);
    console.log(" found in index ", index);
    array.splice(index, 1);
    return array;
  } else {
    var new_array = [];
    new_array = array.filter((ar) => ar != item);
    return new_array;
  }
};

export const arrayContains = (array, item) => {
  return array.indexOf(item) > -1;
};
