import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calender from '../components/Calender'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'

interface HomeProps {
  monthlyTransactions: Transaction[];
}

const Home = ({ monthlyTransactions }: HomeProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* 画面幅狭くなると右側コンテンツは非表示なのでflex:growで指定 */}
      <Box sx={{  flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calender/>
      </Box>

      <Box>
        <TransactionMenu />
        <TransactionForm/>
      </Box>
    </Box>
  )
}

export default Home