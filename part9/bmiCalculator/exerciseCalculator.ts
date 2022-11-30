interface ResType {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
interface inpuData {
  arr: number[];
  target: number;
  numberOfWeek?: number;
}

export const calculateExersize = ({ arr, target }: inpuData): ResType => {
  const res: ResType = {
    periodLength: -1,
    trainingDays: -1,
    success: false,
    rating: -1,
    ratingDescription: "",
    target: -1,
    average: -1,
  };
  let trainedDays = 0;
  let sum = 0;
  arr.forEach((ele) => {
    if (ele != 0) {
      sum += ele;
      trainedDays += 1;
    }
  });
  const average = sum / arr.length;
  res.average = average;
  res.periodLength = arr.length;
  res.success = target >= average;
  res.trainingDays = trainedDays;
  res.target = target;
  if (res.success) {
    res.rating = 3;
    res.ratingDescription = "Well done good job";
  } else {
    res.rating = 1;
    res.ratingDescription = "You Should do batter";
  }
  return res;
};

const parseData = (arr: string[]): inpuData => {
  const resInputData: inpuData = {
    target: -1,
    arr: [],
    numberOfWeek: 0,
  };
  resInputData.target = Number(arr[2]);
  resInputData.numberOfWeek = Number(arr[3]);
  if (isNaN(resInputData.target)) {
    throw new Error("Invalid input target should be number");
  }
  if (isNaN(resInputData.numberOfWeek)) {
    throw new Error("Invalid input numberofweeks should be number");
  }
  for (let i = 4; i <= resInputData.numberOfWeek * 7 + 4; i++) {
    const ele = Number(arr[i]);
    if (isNaN(ele)) {
      throw new Error("Invalid input target should be number");
    }
    resInputData.arr.push(ele);
  }
  return resInputData;
};

try {
  const args = process.argv;
  const inputData = parseData(args);
  console.log(calculateExersize(inputData));
} catch (error) {
  console.log(error);
}
