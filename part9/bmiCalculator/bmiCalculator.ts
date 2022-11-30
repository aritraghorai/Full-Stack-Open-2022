interface id {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, mass: number): string => {
  const res = mass / (height * height * 0.01 * 0.01);
  let message: string;
  if (res < 18.5) {
    message = `Underweight(${mass},${height})`;
  } else if (res < 24.5) {
    message = `Normal(${mass},${height})`;
  } else if (res < 29.9) {
    message = `Overweight(${mass},${height})`;
  } else if (res < 34.9) {
    message = `OBESE(${mass},${height})`;
  } else {
    message = `Extremely OBESE(${mass},${height})`;
  }
  return message;
};
const parseData1 = (arr: string[]): id => {
  const height = Number(arr[2]);
  const weight = Number(arr[3]);
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Data Should be number");
  }
  return {
    height,
    weight,
  };
};
try {
  const args1 = process.argv;
  const data = parseData1(args1);
  console.log(calculateBmi(data.height, data.weight));
} catch (error) {
  console.log(error.message);
}
