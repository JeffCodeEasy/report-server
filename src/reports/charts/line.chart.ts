import { CHART_COLORS, chartJsToImage, numbers, transparentize } from "src/helpers/chart-utils";

export const getLineChart = async (): Promise<string>=> {
    const data = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
  datasets: [
    {
      label: 'Movimiento de inventario',
      data: numbers({count: 6, min: -100, max: 100}),
      borderColor: CHART_COLORS[0],
      backgroundColor: transparentize(CHART_COLORS[0], 0.5),
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15
    }
  ]
};

    const config = {
        type: 'line',
        data: data,
       
    };

    return chartJsToImage(config, {width: 500, height: 200});
}