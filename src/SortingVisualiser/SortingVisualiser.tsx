import React from "react";
import { bubbleSort } from "../sortingAlgorithms/bubbleSort";
import { heapSort } from "../sortingAlgorithms/heapSort";
import { mergeSort } from "../sortingAlgorithms/mergeSort";
import { quickSort } from "../sortingAlgorithms/quickSort";
import { SwapAnimation } from "../types";
import "./SortingVisualiser.css";

interface MyState {
  array: Array<number>;
  timers: any;
}

export class SortingVisualiser extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      array: [],
      timers: [],
    };
  }
  componentDidMount() {
    this.resetArray();
  }
  /** Regenerate the array and clear any existing functions */
  resetArray() {
    const maxHeight = 800;
    const array: Array<number> = [];
    const bars = 35;
    for (let i = 0; i < bars; i++) {
      array.push(randomIntFromInterval(5, maxHeight));
    }
    // clear timers
    for (let i = 0; i < this.state.timers.length; i++) {
      clearTimeout(this.state.timers[i]);
    }
    this.setState({ array: array });
  }

  mergeSort() {
    const t0 = performance.now();
    const { animations } = mergeSort(this.state.array);
    const t1 = performance.now();
    console.log(t1 - t0);
    this.animate(animations);
  }

  bubbleSort() {
    const { animations } = bubbleSort(this.state.array);
    this.animate(animations);
  }

  heapSort() {
    const { animations } = heapSort(this.state.array);
    this.animate(animations);
  }

  quickSort() {
    const { animations } = quickSort(this.state.array);
    this.animate(animations);
  }

  animate(animations: Array<SwapAnimation>) {
    let x;
    let arrayBars: HTMLCollectionOf<HTMLElement> =
      document.getElementsByClassName(
        "array-bar"
      ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < animations.length; i++) {
      x = setTimeout(() => {
        let bar1 = arrayBars[animations[i].comparison[0]];
        let new1 = animations[i].values[0];
        let bar2 = arrayBars[animations[i].comparison[1]];
        let new2 = animations[i].values[1];
        bar1.style.backgroundColor = "turquoise";
        bar1.style.height = `${new1}px`;
        bar1.children[0].innerHTML = new1.toString();
        bar2.style.backgroundColor = "turquoise";
        bar2.style.height = `${new2}px`;
        bar2.children[0].innerHTML = new2.toString();
        setTimeout(() => {
          bar1.style.backgroundColor = "pink";
          bar2.style.backgroundColor = "pink";
        }, 10);
      }, i * 20);
      this.state.timers.push(x);
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div className="array-bar" key={idx} style={{ height: `${value}px` }}>
            <span className="valueSpan">{value}</span>
          </div>
        ))}
        <hr />
        <button onClick={() => this.resetArray()}>Reset Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
      </div>
    );
  }
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
