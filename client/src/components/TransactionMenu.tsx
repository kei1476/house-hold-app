import { Box, Stack, Typography } from '@mui/material'
import DailyTransactionList from './DailyTransactionList';
import { Transaction } from '../types';

interface TransactionMenuProps {
  dailyTransactions: Transaction[];
  currentDay: string;
}

const TransactionMenu = ({dailyTransactions, currentDay}: TransactionMenuProps) => {
  return (
    <Stack>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" fontWeight={"fontWeightBold"}>{currentDay}の収支</Typography>
        </Box>
      </Box>
      <DailyTransactionList dailyTransactions={dailyTransactions}/>
    </Stack>
  )
}

export default TransactionMenu