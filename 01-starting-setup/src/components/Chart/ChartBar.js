import "./ChartBar.css";

const ChartBar = (props) => {
  let barHeightFill = "0%";

  if (props.maxValue > 0) {
    barHeightFill = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  <div className="chart-bar">
    <div className="chart-bar__inner">
      <div className="chart-bar__fill" style={{ height: barHeightFill }}></div>
    </div>
    <div className="chart-bar__label">{props.label}</div>
  </div>;
};
