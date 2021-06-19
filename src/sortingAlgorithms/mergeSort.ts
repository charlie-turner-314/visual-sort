import { IndexValue, SwapAnimation } from "../types";

export function mergeSort(array: Array<number>) {
  let animations: Array<SwapAnimation> = [] as Array<SwapAnimation>;
  mergeSorter(array, 0, array.length - 1, animations);
  return { animations, array };
}

function merge(
  array: Array<number>,
  startIndex: number,
  middleIndex: number,
  endIndex: number,
  animations: Array<SwapAnimation>
) {
  let lower: Array<IndexValue> = [{}] as Array<IndexValue>;
  let upper: Array<IndexValue> = [{}] as Array<IndexValue>;
  let k = startIndex;
  let i;
  let j;

  for (i = 0; k <= middleIndex; i++, k++) {
    lower[i] = { index: k, value: array[k] };
  }
  for (j = 0; k <= endIndex; j++, k++) {
    upper[j] = { index: k, value: array[k] };
  }
  k = startIndex;
  for (j = i = 0; i < lower.length && j < upper.length; ) {
    let comparisonIds: [number, number] = [k, upper[j].index];
    let newValues: [number, number] = [0, 0];
    if (lower[i].value < upper[j].value) {
      array[k] = lower[i].value;
      newValues = [lower[i].value, upper[j].value];
      i++;
    } else {
      array[k] = upper[j].value;
      newValues = [upper[j].value, lower[i].value];
      j++;
    }
    animations.push({ comparison: comparisonIds, values: newValues });
    k++;
  }

  while (i < lower.length) {
    animations.push({
      comparison: [k, k],
      values: [lower[i].value, lower[i].value],
    });
    array[k++] = lower[i++].value;
  }
  while (j < upper.length) {
    animations.push({
      comparison: [k, k],
      values: [upper[j].value, upper[j].value],
    });
    array[k++] = upper[j++].value;
  }
}

function mergeSorter(
  array: Array<number>,
  startIndex: number,
  endIndex: number,
  animations: Array<SwapAnimation>
) {
  if (startIndex < endIndex) {
    let middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSorter(array, startIndex, middleIndex, animations);
    mergeSorter(array, middleIndex + 1, endIndex, animations);
    merge(array, startIndex, middleIndex, endIndex, animations);
  }
}
