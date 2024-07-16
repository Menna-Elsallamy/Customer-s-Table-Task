// TransactionChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const TransactionChart = ({ transactions }) => {
  const dates = transactions.map(transaction => transaction.date);
  const amounts = transactions.map(transaction => transaction.amount);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Transaction Amount',
        data: amounts,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: dates,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default TransactionChart;
