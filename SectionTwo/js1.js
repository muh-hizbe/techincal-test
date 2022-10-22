let numbers = {
    a: 2,
    b: 4
  };
  
  function result(numbers) {
    /* numbers.b = numbers.b / numbers.a
    numbers.a = numbers.b * numbers.a
    return numbers */
    
    return {
      a: numbers.b,
      b: numbers.a
    }
  }
  console.log(numbers);
  console.log(result(numbers));
  