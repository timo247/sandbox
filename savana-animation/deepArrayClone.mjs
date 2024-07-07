export function cloneDeepArray(array) {
  return array.map((element) => {
    if (Array.isArray(element)) {
      // If element is an array, clone it in a recursive way
      return cloneDeepArray(element);
    } else if (typeof element === 'object' && element !== null) {
      // If element is an object, clone it in a recursive way
      return cloneDeepObject(element);
    } else {
      return element;
    }
  });
}

export function cloneDeepObject(obj) {
  let clone = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        // If the prop is an array, clone it in a recursive way
        clone[key] = cloneDeepArray(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Si la propriété est un obj, cloner de manière récursive
        clone[key] = cloneDeepObject(obj[key]);
      } else {
        clone[key] = obj[key];
      }
    }
  }
  return clone;
}

function testDeepCloning() {
  // Exemple of use :
  var tableauOriginal = [
    1,
    'hello',
    { prop1: 'valeur1', prop2: [2, 4, 6] },
    [3, { nested: 'obj' }],
  ];
  var tableauClone = cloneDeepArray(tableauOriginal);

  tableauClone[2].prop2.push(8);
  console.log(tableauClone);
  console.log(tableauOriginal);
}

//testDeepCloning();
