import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useAppContext } from '../../../contexts/AppContext';
import { calculateDailyTransactions } from '../../../utils/calculateTransactions';
import { Box, Typography } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const {monthlyTransactions} = useAppContext();
  const dailyTransactions = calculateDailyTransactions(monthlyTransactions);
  const labels = Object.keys(dailyTransactions);
  const expense = Object.values(dailyTransactions).map((transaction) => transaction.expense);
  const income = Object.values(dailyTransactions).map((transaction) => transaction.income);
console.log(monthlyTransactions);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: '日別収支',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: '支出',
        data: expense,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: '収入',
        data: income,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Box height={'100%'} p={2}>
      {
        monthlyTransactions.length !== 0 ? 
        (
          <Bar options={options} data={data} />
        ) :
        (
          <Typography textAlign={"center"}>データがありません</Typography>
        )
      }
    </Box>
  )
}

export default BarChart