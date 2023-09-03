export function subtractionLike(valueLikes = 0) {
  const value = valueLikes - 1;

  if (value <= 0) {
    return 0;
  } else {
    return value;
  }
}
