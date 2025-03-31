import { Box, Grid2, List, ListItem, Stack, Typography } from '@mui/material'
import FastfoodIcon from "@mui/icons-material/Fastfood";
import React from 'react'

const DailyTransactionList = () => {
  return (
    <Box>
        <List>
          <Stack spacing={2}>
            <ListItem  sx={{ width: '100%', display:'inline-block', backgroundColor:(theme) => theme.palette.expenseColor.light, p:2, borderRadius: '4px', boxShadow: 1 }} >
              <Grid2 container alignItems={'center'}>
                <Grid2 spacing={2} flexGrow={1}>
                  <FastfoodIcon />食費
                </Grid2>
                <Grid2 spacing={2} flexGrow={1}>
                  <Typography>たまご</Typography>
                </Grid2>
                <Grid2 spacing={2} flexGrow={1}>
                  <Typography textAlign='right' sx={{ wordBreak: 'break-all' }}>¥300</Typography>
                </Grid2>
              </Grid2>
            </ListItem>
          </Stack>
        </List>
      </Box>
  )
}

export default DailyTransactionList