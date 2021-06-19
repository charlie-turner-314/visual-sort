import { SwapAnimation } from "../../types/types";

export function heapSort(array: number[]) {
  let animations = [] as SwapAnimation[];
  heapSortHelper(array, animations);
  return { animations, array };
}

function heapSortHelper(array: number[], animations: SwapAnimation[]) {
  let heapSize = array.length;
  //build the heap (rearrange)
  for (let i = Math.floor(heapSize / 2 - 1); i >= 0; i--) {
    maxHeapify(array, heapSize, i, animations);
  }
  for (let i = heapSize - 1; i > 0; i--) {
    //move current root to end
    swap(array, 0, i, animations);
    // heapify the reduced heap
    maxHeapify(array, i, 0, animations);
  }
}

function maxHeapify(
  /** To heapify a subtree rooted with node i, which is an index in array[] */
  array: number[],
  heapSize: number,
  i: number,
  animations: SwapAnimation[]
) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;
  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }
  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }
  if (largest !== i) {
    swap(array, i, largest, animations);
    maxHeapify(array, heapSize, largest, animations);
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
