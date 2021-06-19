export interface SwapAnimation {
  /** The indexes of the original array being compared*/
  comparison: [number, number];
  /** The values to assign to comparison*/
  values: [number, number];
}

export interface IndexValue {
  /** The index of this value in the unsorted array*/
  index: number;
  /** The value */
  value: number;
}
