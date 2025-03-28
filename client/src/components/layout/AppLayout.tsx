import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

const drawerWidth = 240;

export default function AppLayout() {
  const location = useLocation();

  // const {setTransactions, setIsLoading} = useAppContext();

  // // 初回ローディング時に全件取得
  // React.useEffect(() => {
  //   const fetchTransactions = async() => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, 'Transactions'));

  //       // idはdoc.idで取得,それ以外のデータdoc.data()
  //       const transactionsData = querySnapshot.docs.map((doc) => {
  //         return {
  //           ...doc.data(),
  //           id: doc.id,
  //         } as Transaction;
  //       });

  //       setTransactions(transactionsData);
  //     }catch(err) {
  //       // firestoreのエラーか通常のエラーか判別
  //       if(isFirestoreError(err)) {
  //         console.error(err)
  //         console.error(err.code)
  //         console.error(err.message)
  //       }else {
  //         console.error("通常エラー",err)
  //       }
  //     }finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchTransactions();
  // },[]);

  

  interface menuItem {
    text: string,
    path: string,
    icon: React.ComponentType
  }
  const MenuItems: menuItem[] = [
    {
      text: 'ホーム',
      path: '/',
      icon: HomeIcon
    },
    {
      text: '分析',
      path: '/report',
      icon: EqualizerIcon
    },
  ]

  const baseLinkStyle: React.CSSProperties = {
    height: '64px',
    textDecoration: "none",
    color: "inherit",
    display: "flex"
  }

  const activeLinkStyle: React.CSSProperties = {
    borderBottom: 'solid 3px #43a047',
    color: '#43a047'
  }

  return (
    <Box sx={{ 
      display: {md: "flex"}, // 900px以下でflexにしているとレポート画面にて表示がおかしくなるためmd以上でflex
      bgcolor: (theme) => theme.palette.pageColor.light, 
      minHeight: "100vh" 
    }}>
      <CssBaseline />
			{/* ヘッダー */}
      <AppBar
        position="fixed"
        sx={{
          // width: { md: `calc(100% - ${drawerWidth}px)` },
          // ml: { md: `${drawerWidth}px` },
          bgcolor: (theme) => theme.palette.pageColor.light, 
          color: 'black'
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            家計簿アプリ
          </Typography>
          {MenuItems.map((item, index) => (
            // isActiveはNavLinkが持っている値
            <NavLink key={index} to={item.path} style={({isActive}) => {
              return {
                ...baseLinkStyle,
                ...(isActive ? activeLinkStyle : {})
              }
            }} >
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon sx={{ color: location.pathname === item.path ? '#43a047' : 'inherit' }}>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </Toolbar>
      </AppBar>

			{/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
				<Outlet />
      </Box>
    </Box>
  );
}