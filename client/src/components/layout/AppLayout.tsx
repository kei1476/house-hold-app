import { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAppContext } from "../../contexts/AppContext";
import { format } from "date-fns";
import { backendAxios } from "../../lib/backendAxios";

const drawerWidth = 240;

export default function AppLayout() {
  const location = useLocation();

  const { currentMonth, setMonthlyTransactions, setBudget } =
    useAppContext();

  useEffect(() => {
    const fetchMonthlyTransactions = async () => {
      try {
        const params = {
          currentMonth: format(currentMonth, "yyyy-MM"),
        };
        const res = await backendAxios.get("transaction/currentMonth", {
          params,
        });
        setMonthlyTransactions(res.data.data);

        getMonthlyBudget();
      } catch (err) {
        console.error(err);
      }
    };

    fetchMonthlyTransactions();
  }, [currentMonth]);

  const getMonthlyBudget = async () => {
    try {
      const params = {
        currentMonth: format(currentMonth, "yyyy-MM"),
      };
      const res = await backendAxios.get(`budget/currentMonth`, { params });

      setBudget(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  interface menuItem {
    text: string;
    path: string;
    icon: React.ComponentType;
  }
  const MenuItems: menuItem[] = [
    {
      text: "ホーム",
      path: "/",
      icon: HomeIcon,
    },
    {
      text: "分析",
      path: "/analysis",
      icon: EqualizerIcon,
    },
  ];

  const baseLinkStyle: React.CSSProperties = {
    height: "64px",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
  };

  const activeLinkStyle: React.CSSProperties = {
    borderBottom: "solid 3px #43a047",
    color: "#43a047",
  };

  return (
    <Box
      sx={{
        display: { md: "flex" }, // 900px以下でflexにしているとレポート画面にて表示がおかしくなるためmd以上でflex
        bgcolor: (theme) => theme.palette.pageColor.light,
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      {/* ヘッダー */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: (theme) => theme.palette.pageColor.light,
          color: "black",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
            家計簿アプリ
          </Typography>
          {MenuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              style={({ isActive }) => {
                return {
                  ...baseLinkStyle,
                  ...(isActive ? activeLinkStyle : {}),
                };
              }}
            >
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color:
                        location.pathname === item.path ? "#43a047" : "inherit",
                    }}
                  >
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