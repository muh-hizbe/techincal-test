const data = [
  {
    firstName: 'Adi',
    lastName: 'Nugroho',
    age: 25
  },
  {
    firstName: 'Deddy',
    lastName: 'rose',
    age: 25
  },
];

function result(data) {
  let result = []
  const keys = Object.keys(data[0])

  for (let i = 0; i < keys.length; i++) {
    const keyName = keys[i];
    let isDifferentValue = false

    for (const item of data) {
      isDifferentValue = !data.every(itm => itm[keyName] === item[keyName]);
    }
    
    if (isDifferentValue) {
      result.push(keyName)
    }
  }
  return result
}
console.log(result(data));
