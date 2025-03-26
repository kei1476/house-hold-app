import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  console.log(process.env.REACT_APP_WEB_URL)

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

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ 
      display: {md: "flex"}, // 900px以下でflexにしているとレポート画面にて表示がおかしくなるためmd以上でflex
      bgcolor: (theme) => theme.palette.grey[100], 
      minHeight: "100vh" 
    }}>
      <CssBaseline />
			{/* ヘッダー */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            家計簿アプリ
          </Typography>
        </Toolbar>
      </AppBar>

			<Sidebar
				drawerWidth={drawerWidth} 
				mobileOpen={mobileOpen} 
				handleDrawerClose={handleDrawerClose} 
				handleDrawerTransitionEnd={handleDrawerTransitionEnd} 
			/>

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