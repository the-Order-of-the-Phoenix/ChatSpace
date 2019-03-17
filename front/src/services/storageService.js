const storageService = {};

storageService.set = function(name, value) {
  let valueStr = "";
  if (value === undefined || value === null) {
    localStorage.removeItem(name);
  } else {
    valueStr = JSON.stringify(value);
    localStorage.setItem(name, valueStr);
  }
};

storageService.get = function(name, defaultValue) {
  let valueStr = localStorage.getItem(name);
  let value;
  try {
    value = JSON.parse(valueStr);
  } catch (e) {
    value = valueStr;
  }
  return value || defaultValue;
};

export default storageService;
