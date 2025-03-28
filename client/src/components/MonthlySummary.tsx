import { Card, CardContent, Grid2, Stack, Typography } from "@mui/material"
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import FlagIcon from '@mui/icons-material/Flag';
import SavingsIcon from '@mui/icons-material/Savings';

const MonthlySummary = () => {
  return (
    <Grid2 container spacing={{ xs:1, sm:2 }} mb={2}>
      {/* 収入 */}
      <Grid2 size={3} display={"flex"} flexDirection={"column"}>
        <Card sx={{ bgcolor: (theme) => theme.palette.incomeColor.main, color:"white", borderRadius:"10px", flexGrow:1 }}>
          <CardContent sx={{ padding:{xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
							<NorthEastIcon sx={{ fontSize:"2rem" }} />
              <Typography>収入</Typography>
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
              ¥350000
            </Typography>
          </CardContent>
        </Card>
      </Grid2>

      {/* 支出 */}
      <Grid2 size={3} display={"flex"} flexDirection={"column"}>
          <Card sx={{ bgcolor: (theme) => theme.palette.expenseColor.main, color:"white", borderRadius:"10px", flexGrow:1 }}>
            <CardContent sx={{ padding:{xs: 1, sm: 2} }}>
              <Stack direction={"row"}>
								<SouthEastIcon sx={{ fontSize:"2rem" }} />
                <Typography>支出</Typography>
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
                ¥200000
              </Typography>
            </CardContent>
          </Card>
      </Grid2>

      {/* 残高 */}
      <Grid2 size={3} display={"flex"} flexDirection={"column"}>
        <Card sx={{ bgcolor: (theme) => theme.palette.balanceColor.main, color:"white", borderRadius:"10px", flexGrow:1 }}>
          <CardContent sx={{ padding:{xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
              <SavingsIcon sx={{ fontSize:"2rem" }} />
              <Typography>残高</Typography>
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
              ¥100000
            </Typography>
          </CardContent>
        </Card>
      </Grid2>

      {/* 予算 */}
      <Grid2 size={3} display={"flex"} flexDirection={"column"}>
        <Card sx={{ bgcolor: (theme) => theme.palette.budgetColor.main, color:"white", borderRadius:"10px", flexGrow:1 }}>
          <CardContent sx={{ padding:{xs: 1, sm: 2} }}>
            <Stack direction={"row"}>
              <FlagIcon sx={{ fontSize:"2rem" }} />
              <Typography>予算</Typography>
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
              ¥100000
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2> 
  )
}

export default MonthlySummary