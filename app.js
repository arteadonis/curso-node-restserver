// determine the number of apples and oranges that land on Sam's house
function countApplesAndOranges(s, t, a, b, apples, oranges) {
  // Write your code here
  let applesCount = 0;
  let orangeCount = 0;
  for (let i = 0; i < apples.length; i++) {
    if (apples[i] + a >= s && apples[i] <= t) {
      applesCount++;
    }
  }
  for (let i = 0; i < oranges.length; i++) {
    if (oranges[i] + b <= t && oranges[i] >= s) {
      orangeCount++;
    }
  }
  console.log(applesCount);
  console.log(orangeCount);
}
