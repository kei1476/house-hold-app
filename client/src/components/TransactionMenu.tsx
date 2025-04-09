import { Box, Stack, Typography } from '@mui/material'
import DailyTransactionList from './DailyTransactionList';
import { Transaction } from '../types';

interface TransactionMenuProps {
  dailyTransactions: Transaction[];
  currentDay: string;
  onSelectTransaction: (dailyTransaction: Transaction) => void;
  deleteTransactions: (transactionId: number) => Promise<void>;
}

const TransactionMenu = ({dailyTransactions, currentDay, onSelectTransaction, deleteTransactions}: TransactionMenuProps) => {
  return (
    <Stack>
      <Box>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" fontWeight={"fontWeightBold"}>{currentDay}の収支</Typography>
        </Box>
      </Box>
      <DailyTransactionList dailyTransactions={dailyTransactions} onSelectTransaction={onSelectTransaction} deleteTransactions={deleteTransactions}/>
    </Stack>
  )
}

export default TransactionMenu