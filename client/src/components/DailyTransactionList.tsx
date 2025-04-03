import { Box, Grid2, List, ListItem, Stack, Typography } from '@mui/material'
import { Transaction } from '../types';
import IconComponents from './common/CategoryIcons';

interface TransactionMenuProps {
  dailyTransactions: Transaction[];
}

const DailyTransactionList = ({dailyTransactions}: TransactionMenuProps) => {
  return (
    <Box sx={{  overflowY: "auto" }}>
        <List>
          <Stack spacing={2}>
            {
              dailyTransactions.map((dailyTransaction: Transaction) => (
                <ListItem  sx={{ width: '100%', display:'inline-block', backgroundColor:(theme) => dailyTransaction.type === 'expense' ? theme.palette.expenseColor.light : theme.palette.incomeColor.light, p:2, borderRadius: '4px', boxShadow: 1 }} >
                  <Grid2 container alignItems={'center'}>
                    <Grid2 spacing={2} flexGrow={1}>
                      {IconComponents[dailyTransaction.category_name]}{dailyTransaction.category_name}
                    </Grid2>
                    <Grid2 spacing={2} flexGrow={1}>
                      <Typography>{dailyTransaction.content}</Typography>
                    </Grid2>
                    <Grid2 spacing={2} flexGrow={1}>
                      <Typography textAlign='right' sx={{ wordBreak: 'break-all' }}>¥{dailyTransaction.amount}</Typography>
                    </Grid2>
                  </Grid2>
                </ListItem>
              ))
            }
          </Stack>
        </List>
      </Box>
  )
}

export default DailyTransactionList