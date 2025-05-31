import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { useAppContext } from '../../../contexts/AppContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const {monthlyTransactions} = useAppContext();
  const [currentType, setCurrentType] = useState('expense');

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const sumsGroupedByCategory = monthlyTransactions
    .filter((transaction) => transaction.type === currentType)
    .reduce<Record<string, number>>((acc, transaction) => {
      if(acc[transaction.category_name] === undefined) acc[transaction.category_name] = 0;
      acc[transaction.category_name] += transaction.amount;
      return acc;
    },{});

    const labels = Object.keys(sumsGroupedByCategory);
    const values = Object.values(sumsGroupedByCategory);

  const data = {
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField select label="収支タイプを選択" fullWidth value={currentType} onChange={(e) => setCurrentType(e.target.value)}>
          <MenuItem value={'income'}>収入</MenuItem>
          <MenuItem value={'expense'}>支出</MenuItem>
        </TextField>
        <Box
          sx={{
            width: { xs: 200, md: 300 },
            height: { xs: 200, md: 300 },
          }}
        >
          {
            monthlyTransactions.length !== 0 ? (
              <Pie data={data} options={options} />
            ) : (
              <Typography sx={{ mt: 2, textAlign: 'center' }}>データがありません</Typography>
            )
          }
        </Box>
      </Box>
  )
}

export default PieChart