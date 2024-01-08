function FakeString(string) {
  let index = 0;
  this.length = 0;
  this.primitiveValue = string;
  for (const letra of string) { 
    this[index] = letra;   
    index++;
    this.length++;
  }
}
FakeString.prototype.charAt = function (index) {
    if (index === undefined || isNaN(index)) index = 0;
    if (index < 0 || index >= this.length) return "";
    return this[index];
    }

    FakeString.prototype.concat = function(...strings) {
      // Comenzar con el valor primitivo del objeto FakeString actual.
      let result = this.primitiveValue;
    
      // Iterar a través de cada argumento proporcionado.
      for (const argumentValue of strings) {
        // Asegurarse de que el argumento es una cadena antes de la concatenación.
        if (typeof argumentValue === 'string') {
          result += argumentValue;
        }
      }
    
      // Devolver el nuevo string concatenado.
      return result;
    };

    FakeString.prototype.indexOf = function(searchValue, fromIndex = 0) {
      // Verificar si searchValue es una cadena vacía
      if (searchValue === "") {
        return 0;
      }
    
      // Ajustar fromIndex si es negativo o mayor que la longitud del string
      if (fromIndex < 0) {
        fromIndex = 0;
      } else if (fromIndex >= this.length) {
        return -1;
      }
    
      // Bucle principal para buscar searchValue en el string
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
    
      // Devolver -1 si searchValue no se encuentra en el string
      return -1;
    };
    
    
    FakeString.prototype.trim = function() {
      let inicio = 0;
      let fin = this.length - 1;
    
      // Eliminar espacios en blanco del inicio
      while (inicio <= fin && this[inicio] === ' ') {
        inicio++;
      }
    
      // Eliminar espacios en blanco del final
      while (fin >= inicio && this[fin] === ' ') {
        fin--;
      }
    
      // Construir y devolver el nuevo string
      let trimmedString = '';
      for (let i = inicio; i <= fin; i++) {
        trimmedString += this[i];
      }
    
      return trimmedString;
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
  let currentString = '';

  // Caso especial: delimitador no proporcionado o cadena vacía
  if (delimiter === undefined || delimiter === '') {
    return this.length === 0 ? [] : [this.primitiveValue];
  }

  let delimiterIndex = 0;
  let matchCount = 0;

  // Iterar a través de cada carácter en FakeString
  for (let i = 0; i < this.length; i++) {
    if (this[i] === delimiter[delimiterIndex]) {
      if (delimiterIndex === delimiter.length - 1) {
        // Se encontró una coincidencia completa del delimitador
        result.push(currentString);
        currentString = '';
        delimiterIndex = 0;
        matchCount++;

        // Verificar el límite
        if (limit !== undefined && matchCount === limit) {
          return result;
        }
      } else {
        delimiterIndex++;
      }
    } else {
      currentString += (delimiterIndex > 0 ? delimiter.slice(0, delimiterIndex) : '') + this[i];
      delimiterIndex = 0;
    }
  }

  // Agregar la última subcadena si existe
  if (currentString !== '' || delimiterIndex > 0) {
    result.push(currentString);
  }

  return result;
};


let fake = new FakeString("Codeable");
console.log(fake[2]);
let concatFake = fake.concat(" ","the"," ", "best"," ","School"," ");
console.log(concatFake);
let indexOfConcatFake = concatFake.indexOf("the",);
console.log(indexOfConcatFake);
let trimFake = concatFake.trim();
console.log(trimFake);


let cadena = new String("Codeabla the best School  ");
console.log(cadena.indexOf("the",));
console.log(cadena.trim());


const erika = new FakeString("          erika huis     ");
console.log(erika)
console.log(erika.length);
console.log(erika.indexOf("s"));
let trimedName = erika.trim();

console.log(trimedName);
console.log(trimedName.length);
console.log(trimedName.indexOf("s"));

