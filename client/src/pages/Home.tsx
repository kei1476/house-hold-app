import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), 'yyyy-MM-dd')
  const [currentDay, setCurrentDay] = useState(today);

  const dailyTransactions = monthlyTransactions
    .filter((monthlyTransaction: Transaction) => format(monthlyTransaction.date, 'yyyy-MM-dd') === currentDay);

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
        <TransactionForm />
        <TransactionMenu currentDay={currentDay} dailyTransactions={dailyTransactions} />
      </Box>
    </Box>
  )
}

export default Home