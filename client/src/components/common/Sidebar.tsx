import { Box, Drawer, Toolbar } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { NavLink } from "react-router-dom";
import { CSSProperties } from "react";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

interface menuItem {
  text: string,
  path: string,
  icon: React.ComponentType
}

const Sidebar = ({ drawerWidth, mobileOpen, handleDrawerClose, handleDrawerTransitionEnd }: SidebarProps) => {
  const MenuItems: menuItem[] = [
    {
      text: 'Home',
      path: '/',
      icon: HomeIcon
    },
    {
      text: 'Report',
      path: '/report',
      icon: EqualizerIcon
    },
  ]

  const baseLinkStyle: CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "block"
  }

  const activeLinkStyle: CSSProperties = {
    backgroundColor: "rgba(0,0,0,0.08)"
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
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
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* モバイル用 */}
      <Drawer
        variant="temporary" // サイドバーを切り替え可能にする
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* PC用 */}
      <Drawer
        variant="permanent" //常に表示する
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;