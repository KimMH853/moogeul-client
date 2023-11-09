// import React from "react";
// import HeatMap from "react-heatmap-grid";

// const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);

// // Display only even labels
// const xLabelsVisibility = new Array(24)
//   .fill(0)
//   .map((_, i) => (i % 2 === 0 ? true : false));

// const yLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const data = new Array(yLabels.length)
//   .fill(0)
//   .map(() =>
//     new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
//   );

// export default function Report() {
//   return (
//     <div style={{ fontSize: "13px" }}>
//       <HeatMap
//         xLabels={xLabels}
//         yLabels={yLabels}
//         xLabelsLocation={"bottom"}
//         xLabelsVisibility={xLabelsVisibility}
//         xLabelWidth={60}
//         data={data}
//         squares
//         height={45}
//         onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
//         cellStyle={(background, value, min, max, data, x, y) => ({
//           background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
//           fontSize: "11.5px",
//           color: "#444"
//         })}
//         cellRender={value => value && <div>{value}</div>}
//       />
//     </div>
//   );
// }
import React from 'react';
import Heatmap from 'react-heatmap-grid';

const data = [
  [0, 0, 5],
  [1, 0, 10],
  [2, 0, 15],
  [0, 1, 20],
  [1, 1, 25],
  [2, 1, 30],
  // 다른 데이터 포인트를 추가할 수 있습니다.
];

const xLabels = ['Category 1', 'Category 2', 'Category 3'];
const yLabels = ['Label 1', 'Label 2'];

const Report = () => {
  return (
    <div>
      <h1>React Heatmap Grid Example</h1>
      <Heatmap
        xLabels={xLabels}
        yLabels={yLabels}
        data={data}
        xLabelWidth={60}
        xLabelFontSize="12px"
        yLabelWidth={80}
        yLabelFontSize="12px"
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: `rgb(0, 128, ${256 - (value / max) * 256})`,
          fontSize: '11px',
        })}
      />
    </div>
  );
};

export default Report;