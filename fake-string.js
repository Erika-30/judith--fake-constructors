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

FakeString.prototype.concat = function () {
  //completar
};

FakeString.prototype.indexOf = function () {
  //completar
};

FakeString.prototype.trim = function () {
  //completar
};

FakeString.prototype.split = function () {
  //completar
};
