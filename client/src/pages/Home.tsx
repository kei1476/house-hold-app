import { Box } from '@mui/material'
import { useMemo, useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { useAppContext } from '../contexts/AppContext'

const Home = () => {
  const today = format(new Date(), 'yyyy-MM-dd')
  const [currentDay, setCurrentDay] = useState(today);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const {monthlyTransactions, deleteTransactions} = useAppContext();

  const dailyTransactions = useMemo(() => {
    return monthlyTransactions
      .filter((monthlyTransaction: Transaction) => format(monthlyTransaction.date, 'yyyy-MM-dd') === currentDay);
  },[monthlyTransactions, currentDay]);

  const onSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* 画面幅狭くなると右側コンテンツは非表示なのでflex:growで指定 */}
      <Box sx={{  flexGrow: 1 }}>
        <MonthlySummary />
        <Calender 
          today={today}
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
          setSelectedTransaction={setSelectedTransaction}
        />
      </Box>

      <Box width={300} ml={2}>
        <TransactionForm 
          currentDay={currentDay} 
          selectedTransaction={selectedTransaction}
        />
        <TransactionMenu currentDay={currentDay} dailyTransactions={dailyTransactions} onSelectTransaction={onSelectTransaction} deleteTransactions={deleteTransactions} />
      </Box>
    </Box>
  )
}

export default Home