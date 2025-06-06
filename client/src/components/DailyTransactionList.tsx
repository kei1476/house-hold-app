import { Box, Grid2, IconButton, List, ListItem, Stack, Typography } from '@mui/material'
import { Transaction } from '../types';
import IconComponents from './common/CategoryIcons';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface TransactionMenuProps {
  dailyTransactions: Transaction[];
  onSelectTransaction: (dailyTransaction: Transaction) => void;
  deleteTransactions: (transactionId: number) => Promise<void>;
}

const DailyTransactionList = ({dailyTransactions, onSelectTransaction, deleteTransactions}: TransactionMenuProps) => {
  return (
    <Box sx={{  overflowY: "auto" }}>
        <List>
          <Stack spacing={2}>
            {
              dailyTransactions.map((dailyTransaction: Transaction) => (
                <ListItem  sx={{ width: '100%', display:'inline-block', backgroundColor:(theme) => dailyTransaction.type === 'expense' ? theme.palette.expenseColor.light : theme.palette.incomeColor.light, p:2, borderRadius: '4px', boxShadow: 1,position: 'relative'}} >
                  <Grid2 container alignItems={'center'} onClick={() => onSelectTransaction(dailyTransaction)}>
                    <Grid2 spacing={2} flexGrow={1} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography>
                        {IconComponents[dailyTransaction.category_name]}
                      </Typography>
                      <Typography>
                        {dailyTransaction.category_name}
                      </Typography>
                    </Grid2>
                    <Grid2 spacing={2} flexGrow={2}>
                      <Typography>{dailyTransaction.content}</Typography>
                    </Grid2>
                    <Grid2 spacing={2} flexGrow={1}>
                        <Typography textAlign='left' sx={{ wordBreak: 'break-all' }}>¥{dailyTransaction.amount}</Typography>
                    </Grid2>
                    <IconButton sx={{ position: 'absolute', top:2, right:2}} onClick={() => deleteTransactions(dailyTransaction.id)}>
                      <DeleteOutlineIcon fontSize='small'/>
                    </IconButton>
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