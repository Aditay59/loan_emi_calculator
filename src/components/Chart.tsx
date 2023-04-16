import React, { useRef, useEffect, FC} from 'react';
import Chart from 'chart.js/auto';

interface Props {
  totalInterest: number;
  loanAmount: number;
}

const PiChart:FC<Props> = ({totalInterest,loanAmount}:Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Total Interest', 'Principal Loan Amount'],
          datasets: [
            {
              data: [totalInterest, loanAmount],
              backgroundColor: ['#FF6D60', '#F7D060'],
              borderWidth: 0,
            },
          ],
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [totalInterest, loanAmount]);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = Chart.getChart(chartRef.current);
      if (chartInstance) {
        chartInstance.data.datasets[0].data[0] = totalInterest;
        chartInstance.data.datasets[0].data[1] = loanAmount;
        chartInstance.update();
      }
    }
  }, [totalInterest, loanAmount]);

  return (
      <canvas ref={chartRef} id='myChart' width='300' height='300'></canvas>
  );
};

export default PiChart;
