import { Box, Grid2, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material"
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import FlagIcon from '@mui/icons-material/Flag';
import SavingsIcon from '@mui/icons-material/Savings';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import EditIcon from "@mui/icons-material/Edit";
import { calculateTransactions } from "../utils/calculateTransactions";
import SummaryDetail from "./SummaryDetail";
import UsageBar from "./UsageBar";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const MonthlySummary = () => {
  const {monthlyTransactions, budget, storeUpdateBudget} = useAppContext();
  const theme = useTheme();
	const {income, expense, balance} = calculateTransactions(monthlyTransactions);
  const budgetAmount = budget?.budget_amount ?? 0;
  const budgetUsage = budgetAmount === 0 ? 0 : Number((100 - (((budgetAmount - expense) / budgetAmount) * 100)).toFixed(1));
  const expenseUsage = budgetAmount === 0 ? 0 : Number(((expense/income) * 100).toFixed(1));
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(budgetAmount ?? 0);

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleSave = () => {
    setIsEditing(!isEditing)
    storeUpdateBudget(Number(inputValue), budget?.id);
  }

  useEffect(() => {    
    setInputValue(budgetAmount);
  }, [budgetAmount]);

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
            <UsageBar label='支出率' usage={expenseUsage} defaultColor={"info"} />
          </Box>
        </Box>
      </Grid2>

      <Grid2 size={6} display={"flex"} flexDirection={"column"}>
        <Typography variant="h6" fontWeight={"fontWeightBold"}  textAlign={'center'}>今月の使用状況</Typography>
        <Box sx={{ border: '1px solid', borderRadius: "10px", bgcolor: 'white', p: 1 }}>
          <Box sx={{ color: "black", flexGrow: 1, alignItems: 'center',display: 'flex'}}>
            {/* 予算 */}
            {/* <SummaryDetail color={theme.palette.budgetColor.main} title={'予算'} amount={budget} Icon={FlagIcon} /> */}
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column' }}>
              <Stack direction={"row"} sx={{ color: theme.palette.budgetColor.main }}>
                <FlagIcon />
                <Typography fontWeight={"fontWeightBold"} mr={1}>予算</Typography>
              </Stack>
              {
                isEditing ? (
                  <TextField
                    name="budget"
                    variant="standard"
                    value={inputValue}
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    onBlur={handleSave}
                    size="small"
                    autoFocus
                    sx={{
                      p: 0,
                      fontSize: 12,
                      fontWeight: "bold",
                      maxWidth: "120px",
                      textAlign: "right",
                    }}
                  />
                ) : (
                  <Box component={'div'} sx={{ position: 'relative' }}>
                    <Typography 
                      textAlign={"right"} 
                      variant="h5" 
                      fontWeight={"fontWeightBold"} 
                      sx={{ 
                        wordBreak:"break-word", 
                        fontSize: {xs:".8rem",sm:"1rem", md:"1.2rem"} 
                      }}
                    >
                      ¥{budgetAmount}
                    </Typography>
                    <IconButton
                      onClick={handleEditClick}
                      size="small"
                      sx={{ position: "absolute", top: '-10px', right: '-28px' }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  )
              }
            </Box>
  
            <Box component={'span'} sx={{ fontSize: '40px', mt:2 }}>−</Box>

            {/* 支出 */}
            <SummaryDetail color={theme.palette.expenseColor.main} title={'支出'} amount={expense} Icon={SouthEastIcon} />
            <Box component={'span'} sx={{ fontSize: '40px', mt:2 }}>=</Box>

            {/* 使える額 */}
            <SummaryDetail color={budgetAmount - expense >= 0 ? theme.palette.usageColor.main : theme.palette.expenseColor.main} title={'使える額'} amount={budgetAmount - expense} Icon={BatteryAlertIcon} />
          </Box>

          <Box sx={{ px: { xs: 1, sm: 2 } }}>
            <UsageBar label='予算使用率' usage={budgetUsage} defaultColor="warning" />
          </Box>
        </Box>
      </Grid2>
    </Grid2> 
  )
}

export default MonthlySummary