// Constructor function
function FakeString(string) {
  this.length = 0;
  this.PrimitiveValue = string;

  for (const caracter of string) {
    this[this.length] = caracter;
    this.length++;
  }
}

// Métodos compartidos

FakeString.prototype.charAt = function (index) {
  // Establecer valores por defecto y manejar casos especiales
  if (index === undefined || isNaN(index)) index = 0;
  if (index < 0 || index >= this.length) return "";

  return this[index];
};

FakeString.prototype.substring = function (indexStart, indexEnd) {
  // Establecer valores por defecto y manejar casos especiales
  if (indexStart < 0 || isNaN(indexStart)) indexStart = 0;
  if (indexEnd === undefined || indexEnd > this.length) indexEnd = this.length;
  if (indexEnd < 0 || isNaN(indexEnd)) indexEnd = 0;
  if (indexStart > indexEnd) {
    let temp = indexStart;
    indexStart = indexEnd;
    indexEnd = temp;
  }

  let result = "";

  for (let i = indexStart; i < indexEnd; i++) {
    result += this[i];
  }

  return result;
};

FakeString.prototype.slice = function (start, end) {
  if (start === undefined || isNaN(start)) start = 0;
  if (end === undefined) end = this.length;
  if (isNaN(end)) end = 0;
  if (start < 0) start = this.length + start;
  if (end < 0) end = this.length + end;
  if (end > this.length) end = this.length;

  if (end < start || start > this.length) return "";

  let result = "";
  for (let index = start; index < end; index++) {
    result += this[index];
  }

  return result;
};

FakeString.prototype.repeat = function (count = 0) {
  if (count === 0 || this.length === 0) return "";

  let result = "";
  for (let i = 0; i < count; i++) {
    result += this.PrimitiveValue;
  }

  return result;
};

FakeString.prototype.includes = function (searchString, position = 0) {
  // Manejar casos especiales
  if (searchString.length === 0) return true;
  if (position < 0 || isNaN(position)) position = 0;
  if (position > this.length) return false;

  // Empezamos a buscar desde la posición dada
  for (let i = position; i <= this.length - searchString.length; i++) {
    let subcadena = this.substring(i, i + searchString.length);
    if (subcadena === searchString) {
      return true;
    }
  }

  return false;
};


FakeString.prototype.concat = function(...strings) {
  let result = this.primitiveValue;

  for (const argumentValue of strings) {
    if (typeof argumentValue === 'string') {
      result += argumentValue;
    }
  }

  return result;
};


FakeString.prototype.indexOf = function(searchValue, fromIndex = 0) {
  if (searchValue === "") {
    return 0;
  }

  if (fromIndex < 0) {
    fromIndex = 0;
  } else if (fromIndex >= this.length) {
    return -1;
  }

  for (let i = fromIndex; i < this.length; i++) {
    let subStr = '';
    for (let j = 0; j < searchValue.length; j++) {
      if (i + j < this.length) {
        subStr += this[i + j];
      } else {
        break;
      }
    }
    if (subStr === searchValue) {
      return i;
    }
  }

  return -1;
};

FakeString.prototype.trim = function() {
  let start = 0;
  let end = this.length - 1;

  while (start <= end && this[start] === ' ') {
    start++;
  }

  while (end >= start && this[end] === ' ') {
    end--;
  }

  let trimmedString = '';
  for (let i = start; i <= end; i++) {
    trimmedString += this[i];
  }

  return trimmedString;
};

FakeString.prototype.split = function(delimiter, limit) {
  let result = [];
  let temporaryString = '';

  if (delimiter === undefined || delimiter === '') {
    return this.length === 0 ? [] : [this.primitiveValue];
  }

  let delimiterIndex = 0;
  let matchCount = 0;

  for (let i = 0; i < this.length; i++) {
    if (this[i] === delimiter[delimiterIndex]) {
      if (delimiterIndex === delimiter.length - 1) {
        result.push(temporaryString);
        temporaryString = '';
        delimiterIndex = 0;
        matchCount++;

        if (limit !== undefined && matchCount === limit) {
          return result;
        }
      } else {
        delimiterIndex++;
      }
    } else {
      temporaryString += (delimiterIndex > 0 ? delimiter.slice(0, delimiterIndex) : '') + this[i];
      delimiterIndex = 0;
    }
  }

  if (temporaryString !== '' || delimiterIndex > 0) {
    result.push(temporaryString);
  }

  return result;
};
