import { Box, Stack, Typography} from "@mui/material"

interface SummaryDetailProps {
  color: string,
  title: string,
  amount: number,
  Icon: React.ComponentType
}
const SummaryDetail = ({color, title, amount, Icon}: SummaryDetailProps) => {
  return (
    <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'column' }}>
      <Stack direction={"row"} sx={{ color: color }}>
        <Icon />
        <Typography fontWeight={"fontWeightBold"} mr={1}>{title}</Typography>
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
        ¥{amount}
      </Typography>
    </Box>
  )
}

export default SummaryDetail