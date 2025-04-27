import { Box, Button } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { ja } from 'date-fns/locale'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import React from 'react'
import { addMonths } from 'date-fns'

interface MonthlyDatePickerProps {
  currentMonth: Date,
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

const MonthlyDatePicker = ({currentMonth, setCurrentMonth}: MonthlyDatePickerProps) => {
  const handlePreMonth = () => {
    const preMonth = addMonths(currentMonth, -1);
    setCurrentMonth(preMonth);
  }
  const handleNextMonth = () => {
    const preMonth = addMonths(currentMonth, +1);
    setCurrentMonth(preMonth);
  }

  const handleDateChange = (newDate: Date | null) => {
    if(newDate) setCurrentMonth(newDate);
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Button color={'error'} variant="contained" onClick={handlePreMonth}>先月</Button>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja} dateFormats={{ normalDate: 'yyyy年MM月' }}>
        <DatePicker 
          sx={{ mx: 2}} 
          value={currentMonth}
          label='年月を選択'
          views={['year', 'month']}
          format='yyyy年MM月'
          slotProps={{ 
            toolbar: {
              toolbarFormat: 'yyyy年MM月'
            }
          }}
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <Button color={'primary'} variant="contained" onClick={handleNextMonth}>次月</Button>
    </Box>
  )
}

export default MonthlyDatePicker