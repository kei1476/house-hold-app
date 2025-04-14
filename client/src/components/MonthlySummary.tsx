import { Box, Grid2, LinearProgress, Stack, Typography, useTheme } from "@mui/material"
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import FlagIcon from '@mui/icons-material/Flag';
import SavingsIcon from '@mui/icons-material/Savings';
import { Transaction } from "../types";
import { calculateTransactions } from "../utils/calculateTransactions";
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
          <Box sx={{ 
            color: "black", 
            flexGrow: 1, 
            alignItems: 'center',
            display: 'flex',
          }}>
            {/* 収入 */}
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column' }}>
              <Stack direction={"row"} sx={{ color: (theme) => theme.palette.incomeColor.main }}>
                <NorthEastIcon sx={{ fontSize:"1.6rem" }} />
                <Typography fontWeight={"fontWeightBold"} mr={1}>収入</Typography>
              </Stack>
                <Typography 
                  textAlign={"right"} 
                  variant="h5" 
                  fontWeight={"fontWeightBold"} 
                  sx={{ 
                    wordBreak:"break-word", 
                    fontSize: {xs:".8rem",sm:"1rem", md:"1.2rem"} 
                  }}
                  display={'block'}
                >
                  ¥{income}
                </Typography>
            </Box>

            <Box component={'span'} sx={{ fontSize: '40px', mt:2  }}>−</Box>

            {/* 支出 */}
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column' }}>
              <Stack direction={"row"} sx={{ color: (theme) => theme.palette.expenseColor.main }}>
                <SouthEastIcon sx={{ fontSize:"1.6rem"}} />
                <Typography fontWeight={"fontWeightBold"} mr={1}>支出</Typography>
              </Stack>
              <Typography 
                textAlign={"right"} 
                variant="h5" 
                fontWeight={"fontWeightBold"} 
                sx={{ 
                  wordBreak:"break-word", 
                  fontSize: {xs:".8rem",sm:"1rem", md:"1.2rem"} 
                }}
              >
                ¥{expense}
              </Typography>
            </Box>

            <Box component={'span'} sx={{ fontSize: '40px', mt:2 }}>=</Box>

            {/* 残高 */}
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column' }}>
              <Stack direction={"row"} sx={{  color: (theme) => theme.palette.balanceColor.main }}>
                <SavingsIcon sx={{ fontSize:"1.6rem" }} />
                <Typography fontWeight={"fontWeightBold"} mr={1}>残高</Typography>
              </Stack>
              <Typography 
                textAlign={"right"} 
                variant="h5" 
                fontWeight={"fontWeightBold"} 
                sx={{ 
                  wordBreak:"break-word", 
                  fontSize: {xs:".8rem",sm:"1rem", md:"1.2rem"} 
                }}
              >
                ¥{balance}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ px:{xs: 1, sm: 2} }}>
            <Typography 
              variant="h5" 
              fontWeight={"fontWeightBold"} 
              sx={{ 
                wordBreak:"break-word", 
                fontSize: {xs:".6rem",sm:".8rem"},
              }}
            >
              支出率{expenseUsage}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              color={ expenseUsage >= 90 ? 'error' : 'primary'} 
              value={expenseUsage >= 100 ? 100 : expenseUsage} 
              sx={{height: 8, borderRadius: 1,  color: (theme) => theme.palette.usageColor.main}}
            />
          </Box>
        </Box>
      </Grid2>

      <Grid2 size={6} display={"flex"} flexDirection={"column"}>
        {/* 予算 */}
        <Typography variant="h6" fontWeight={"fontWeightBold"}  textAlign={'center'}>今月の使用状況</Typography>
        <Box sx={{ border: '1px solid', borderRadius: "10px", bgcolor: 'white', p: 1 }}>
          <Box sx={{ 
            color: "black", 
            flexGrow: 1, 
            alignItems: 'center',
            display: 'flex',
          }}>
            {/* 予算 */}
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column'}}>
              <Stack direction={"row"} sx={{ color: (theme) => theme.palette.budgetColor.main }}>
                <FlagIcon sx={{ fontSize:"1.6rem" }} />
                <Typography fontWeight={"fontWeightBold"} mr={1}>予算</Typography>
              </Stack>
                <Typography 
                  textAlign={"right"} 
                  variant="h5" 
                  fontWeight={"fontWeightBold"} 
                  sx={{ 
                    wordBreak:"break-word", 
                    fontSize: {xs:".8rem",sm:"1rem", md:"1.2rem"} 
                  }}
                  display={'block'}
                >
                  ¥{budget}
                </Typography>
            </Box>

            <Box component={'span'} sx={{ fontSize: '40px', mt:2 }}>−</Box>

            {/* 支出 */}
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column' }}>
              <Stack direction={"row"} sx={{ color: (theme) => theme.palette.expenseColor.main }}>
                <SouthEastIcon sx={{ fontSize:"1.6rem"}} />
                <Typography fontWeight={"fontWeightBold"} mr={1}>支出</Typography>
              </Stack>
              <Typography 
                textAlign={"right"} 
                variant="h5" 
                fontWeight={"fontWeightBold"} 
                sx={{ 
                  wordBreak:"break-word", 
                  fontSize: {xs:".8rem",sm:"1rem", md:"1.2rem"} 
                }}
              >
                ¥{expense}
              </Typography>
            </Box>

            <Box component={'span'} sx={{ fontSize: '40px', mt:2 }}>=</Box>

            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column'}}>
              <Typography fontWeight={"fontWeightBold"} mr={1}>使える額</Typography>
                <Typography 
                  textAlign={"right"} 
                  variant="h5" 
                  fontWeight={"fontWeightBold"} 
                  sx={{ 
                    wordBreak:"break-word", 
                    fontSize: {xs:".8rem",sm:"1rem", md:"1.2rem"},
                    mr: {xs: 1, sm: 2},
                    color: budget - expense >= 0 ? 'black' : theme.palette.expenseColor.main
                  }}
                >
                  ¥{budget - expense}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ px:{xs: 1, sm: 2} }}>
            <Typography 
              variant="h5" 
              fontWeight={"fontWeightBold"} 
              sx={{ 
                wordBreak:"break-word", 
                fontSize: {xs:".6rem",sm:".8rem"},
              }}
            >
              予算使用率{budgetUsage}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              color={ budgetUsage >= 90 ? 'error' : 'secondary'} 
              value={budgetUsage >= 100 ? 100 : budgetUsage} 
              sx={{height: 8, borderRadius: 1,  color: (theme) => theme.palette.usageColor.main}}
            />
          </Box>
        </Box>
      </Grid2>
    </Grid2> 
  )
}

export default MonthlySummary