import { Grid2, Paper } from '@mui/material'
import PieChart from '../components/pages/analysis/PieChart'
import Ranking from '../components/pages/analysis/Ranking'
import BarChart from '../components/pages/analysis/BarChart'
import MonthlyDatePicker from '../components/pages/analysis/MonthlyDatePicker'
import { useAppContext } from '../contexts/AppContext'

const Analysis = () => {
  const {currentMonth, setCurrentMonth} = useAppContext()
  const commonPaperStyle = {
    height: { xs: 'auto', md: '400px' },
    display: 'flex',
    flexDirection: 'column',
  }

	return (
		<Grid2 container spacing={{ xs:1, sm:2 }}>
      <Grid2 size={12}>
      <MonthlyDatePicker 
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      </Grid2>
			{/* カテゴリ別円グラフ */}
			<Grid2 size={5}>
        <Paper sx={commonPaperStyle}>
          <PieChart />
        </Paper>
			</Grid2>
			{/* ランキング */}
			<Grid2 size={7}>
        <Paper sx={commonPaperStyle}>
          <Ranking />
        </Paper>
      </Grid2>
			{/* 日別の棒グラフ */}
			<Grid2 size={12}>
        <Paper sx={commonPaperStyle}>
          <BarChart />
        </Paper>
      </Grid2>
		</Grid2>
	)
}

export default Analysis