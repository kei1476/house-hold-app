import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { TransactionFormSchemaType } from '../validations'

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  storeTransactions: (transaction: TransactionFormSchemaType) => Promise<void>;
  deleteTransactions: (transactionId: number) => Promise<void>;
}

const Home = ({ monthlyTransactions, setCurrentMonth, storeTransactions, deleteTransactions }: HomeProps) => {
  const today = format(new Date(), 'yyyy-MM-dd')
  const [currentDay, setCurrentDay] = useState(today);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const dailyTransactions = monthlyTransactions
    .filter((monthlyTransaction: Transaction) => format(monthlyTransaction.date, 'yyyy-MM-dd') === currentDay);

  const onSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  }

  return (
    <Box sx={{ display: "flex" }}>
      {/* 画面幅狭くなると右側コンテンツは非表示なのでflex:growで指定 */}
      <Box sx={{  flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calender 
          today={today}
          currentDay={currentDay}
          monthlyTransactions={monthlyTransactions} 
          setCurrentMonth={setCurrentMonth} 
          setCurrentDay={setCurrentDay}
        />
      </Box>

      <Box width={300} ml={2}>
        <TransactionForm currentDay={currentDay} storeTransactions={storeTransactions} selectedTransaction={selectedTransaction}/>
        <TransactionMenu currentDay={currentDay} dailyTransactions={dailyTransactions} onSelectTransaction={onSelectTransaction} deleteTransactions={deleteTransactions} />
      </Box>
    </Box>
  )
}

export default Home