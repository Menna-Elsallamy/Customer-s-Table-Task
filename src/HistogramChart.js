import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const HistogramChart = ({ transactions1, transactions2 }) => {
  const aggregateTransactions = [...transactions1, ...transactions2];

  const histogramData = aggregateTransactions.reduce((acc, transaction) => {
    const amount = Math.floor(transaction.amount / 10) * 10;
    const existing = acc.find(item => item.range === `${amount}-${amount + 10}`);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ range: `${amount}-${amount + 10}`, count: 1 });
    }
    return acc;
  }, []);

  return (
    <BarChart width={600} height={300} data={histogramData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default HistogramChart;

