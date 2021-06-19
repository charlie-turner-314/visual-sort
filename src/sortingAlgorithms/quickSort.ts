import { SwapAnimation } from "../types";

export function quickSort(array: number[]) {
  let animations: SwapAnimation[] = [] as SwapAnimation[];
  quickSortHelper(array, 0, array.length - 1, animations);
  return { animations, array };
}

function quickSortHelper(
  array: number[],
  low: number,
  high: number,
  animations: SwapAnimation[]
) {
  if (low < high) {
    let partitionIndex = partition(array, low, high, animations);
    quickSortHelper(array, low, partitionIndex - 1, animations);
    quickSortHelper(array, partitionIndex + 1, high, animations);
  }
}

function partition(
  array: number[],
  low: number,
  high: number,
  animations: SwapAnimation[]
) {
  const pivot = array[high];

  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (array[j] < pivot) {
      i++;
      swap(array, i, j, animations);
    }
  }
  swap(array, i + 1, high, animations);
  return i + 1;
}

function swap(
  array: Array<number>,
  xp: number,
  yp: number,
  animations: Array<SwapAnimation>
) {
  var temp = array[xp];
  animations.push({ comparison: [xp, yp], values: [array[yp], temp] });
  array[xp] = array[yp];
  array[yp] = temp;
}
