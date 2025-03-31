import { Box, Button, Card, Grid2, List, ListItem, Stack, Typography } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FastfoodIcon from "@mui/icons-material/Fastfood";
import React from 'react'
import { theme } from '../theme/theme';
import DailyTransactionList from './DailyTransactionList';

const TransactionMenu = () => {
  return (
    <Stack>
      {/* <Typography fontWeight={"fontWeightBold"}>日時： 2023-12-31</Typography> */}
      <Box>
        <Box display="flex" alignItems="center">
          <FormatListBulletedIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight={"fontWeightBold"}>2023-12-31の収支</Typography>
        </Box>
      </Box>
      <DailyTransactionList />
    </Stack>
  )
}

export default TransactionMenu