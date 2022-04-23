import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = (props) => {
  <div className="chart">
    {props.dataPoints.map((dataPoint) => (
      <ChartBar
        key={dataPoint.label}
        value={dataPoint.value}
        label={dataPoint.label}
        maxValue={null}
      />
    ))}
  </div>;
};

export default Chart;
