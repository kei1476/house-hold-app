import { Box } from "@mui/material"
import MonthlySummary from "../components/MonthlySummary"
import Calender from "../components/Calender"
import TransactionMenu from "../components/TransactionMenu"
import TransactionForm from "../components/TransactionForm"

const Home = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* カレンダー */}
      <Box sx={{ flexGrow: 1, bgcolor: '#f1f8e9'  }}>
        <MonthlySummary />
        <Calender 
            // today={today} 
            // currentDay={currentDay} 
            // setCurrentDay={setCurrentDay}
            // onDateClick={handleDateClick}
          />
      </Box>

      {/* 入力欄 */}
      <Box>
      <TransactionMenu
        />
        <TransactionForm
        />
      </Box>
    </Box>
  )
}

export default Home