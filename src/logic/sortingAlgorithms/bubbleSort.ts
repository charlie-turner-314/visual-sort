import { SwapAnimation } from "../../types/types";

export function bubbleSort(array: Array<number>) {
  let animations: Array<SwapAnimation> = [] as Array<SwapAnimation>;
  let n = array.length;
  bubbleSortHelper(array, n, animations);
  return { animations, array };
}

// An optimized version of Bubble Sort
function bubbleSortHelper(
  array: Array<number>,
  n: number,
  animations: Array<SwapAnimation>
) {
  let i, j, swapped;
  for (i = 0; i < n - 1; i++) {
    swapped = false;
    for (j = 0; j < n - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1, animations);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
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
