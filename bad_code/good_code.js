function calculateSum(a, b) {
  const x = 10;

  // Use strict equality (===)
  if (x === 10) {
    return a + b;
  }
  return 0; // Good practice to ensure a consistent return value
}

const result = calculateSum(5, 10);

// We log the result so the linter doesn't complain that 'result' is defined but never used
console.log(result);