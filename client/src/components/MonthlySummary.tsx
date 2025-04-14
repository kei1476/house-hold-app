import { Box, Grid2, Typography, useTheme } from "@mui/material"
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import FlagIcon from '@mui/icons-material/Flag';
import SavingsIcon from '@mui/icons-material/Savings';
import { Transaction } from "../types";
import { calculateTransactions } from "../utils/calculateTransactions";
import SummaryDetail from "./SummaryDetail";
import UsageBar from "./UsageBar";
interface MonthlySummaryProps {
	monthlyTransactions: Transaction[];
}

const MonthlySummary = ({ monthlyTransactions }: MonthlySummaryProps) => {
  const theme = useTheme();
	const {income, expense, balance} = calculateTransactions(monthlyTransactions);
  const budget = 10000;
  const budgetUsage = Number((100 - (((budget - expense) / budget) * 100)).toFixed(1));
  const expenseUsage = Number(((expense/income) * 100).toFixed(1));

  return (
    <Grid2 container spacing={{ xs:1, sm:2 }} mb={2} sx={{ p:1 }}>
      <Grid2 size={6} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight={"fontWeightBold"} textAlign={'center'}>今月の収支</Typography>
        <Box sx={{ border: '1px solid', borderRadius: "10px", bgcolor: 'white', p: 1 }}>
          <Box sx={{ color: "black", flexGrow: 1, alignItems: 'center',display: 'flex'}}>
            {/* 収入 */}
            <SummaryDetail color={theme.palette.incomeColor.main} title={'収入'} amount={income} Icon={NorthEastIcon} />

            <Box component={'span'} sx={{ fontSize: '40px', mt:2  }}>−</Box>

            {/* 支出 */}
            <SummaryDetail color={theme.palette.expenseColor.main} title={'支出'} amount={expense} Icon={SouthEastIcon} />

            <Box component={'span'} sx={{ fontSize: '40px', mt:2 }}>=</Box>

            {/* 残高 */}
            <SummaryDetail color={theme.palette.balanceColor.main} title={'残高'} amount={balance} Icon={SavingsIcon} /> 
          </Box>

          <Box sx={{ px: { xs: 1, sm: 2 } }}>
            <UsageBar usage={expenseUsage} defaultColor={"primary"} />
          </Box>
        </Box>
      </Grid2>

      <Grid2 size={6} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight={"fontWeightBold"}  textAlign={'center'}>今月の使用状況</Typography>
        <Box sx={{ border: '1px solid', borderRadius: "10px", bgcolor: 'white', p: 1 }}>
          <Box sx={{ color: "black", flexGrow: 1, alignItems: 'center',display: 'flex'}}>
            {/* 予算 */}
            <SummaryDetail color={theme.palette.budgetColor.main} title={'予算'} amount={budget} Icon={FlagIcon} />
            <Box component={'span'} sx={{ fontSize: '40px', mt:2 }}>−</Box>

            {/* 支出 */}
            <SummaryDetail color={theme.palette.expenseColor.main} title={'支出'} amount={expense} Icon={SouthEastIcon} />
            <Box component={'span'} sx={{ fontSize: '40px', mt:2 }}>=</Box>

            {/* 使える額 */}
            <SummaryDetail color={budget - expense >= 0 ? 'black' : theme.palette.expenseColor.main} title={'使える額'} amount={budget - expense} Icon={NorthEastIcon} />
          </Box>

          <Box sx={{ px: { xs: 1, sm: 2 } }}>
            <UsageBar usage={budgetUsage} defaultColor="secondary" />
          </Box>
        </Box>
      </Grid2>
    </Grid2> 
  )
}

export default MonthlySummary