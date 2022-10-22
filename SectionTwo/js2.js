let originalData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let numbersOne = [3, 4, 5, 7, 9];
let numbersTwo = [1, 2, 3, 5, 9]

function result(originalData, numbersOne, numbersTwo) {
  let totalValueConcatArray = 0
  let totalDeletedData = 0
  const concatArray = numbersOne.concat(numbersTwo)
  concatArray.map(item => {
    totalValueConcatArray += item
  })
  const deletedData = originalData.filter((item) => !concatArray.includes(item))
  deletedData.map(item => {
    totalDeletedData += item
  })
  console.log('concatArray', concatArray);
  console.log('deletedData', deletedData)
  console.log('totalValueConcatArray', totalValueConcatArray)
  console.log('totalDeletedData', totalDeletedData)
  const finalResult = totalValueConcatArray / totalDeletedData
  console.log('final result', finalResult)
  return finalResult
}
console.log(result(originalData, numbersOne, numbersTwo));