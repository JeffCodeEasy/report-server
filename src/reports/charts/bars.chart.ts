import { CHART_COLORS, chartJsToImage, months, numbers, transparentize } from "src/helpers/chart-utils";

export const getBarsChart = async (): Promise<string>=> {

    const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = months({count: 7});
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Fully Rounded',
      data: numbers(NUMBER_CFG),
      borderColor: CHART_COLORS[2],
      backgroundColor: transparentize(CHART_COLORS[2], 0.5),
      borderWidth: 2,
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
    },
    {
      label: 'Small Radius',
      data: numbers(NUMBER_CFG),
      borderColor: CHART_COLORS[0],
      backgroundColor: transparentize(CHART_COLORS[0], 0.5),
      borderWidth: 2,
      borderRadius: 5,
      borderSkipped: false,
    }
  ]
};

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
            }
        },
    };

    return chartJsToImage(config, );
}