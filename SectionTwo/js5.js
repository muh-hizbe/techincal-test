const students = [
  {
    firstName: 'Kai',
    lastName: 'Lyons'
  },
  {
    firstName: 'Belle',
    lastName: 'Norton'
  },
  {
    firstName: 'Finnley',
    lastName: 'Rennie'
  },
  {
    firstName: 'Tatiana',
    lastName: 'Dickerson'
  },
  {
    firstName: 'Peyton',
    lastName: 'Gardner'
  },
];

const groups = 3;

function result2(students, groups) {
  let sortedStudents = students.sort((a, b) => {
    const itemA = a.firstName
    const itemB = b.firstName

    if (itemA > itemB) {
      return 1
    }
    if (itemA < itemB) {
      return -1
    }
    return 0
  })

  const chunks = [];
  while (sortedStudents.length) {
    console.log("groups1", groups);
    const chunkSize = Math.ceil(sortedStudents.length / (groups--));
    console.log("groups", groups);
    console.log("chunkSize", chunkSize);
    console.log("sortedStudents.length", sortedStudents.length);
    const chunk = sortedStudents.slice(0, chunkSize);
    chunks.push(chunk);
    sortedStudents = sortedStudents.slice(chunkSize);
  }

  return chunks;
}

console.log(result2(students, groups));
