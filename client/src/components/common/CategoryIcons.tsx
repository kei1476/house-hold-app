import RestaurantIcon from '@mui/icons-material/Restaurant';
import AlarmIcon from "@mui/icons-material/Alarm";
import AddHomeIcon from "@mui/icons-material/AddHome";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TrainIcon from "@mui/icons-material/Train";
import WorkIcon from "@mui/icons-material/Work";
import { JSX } from "react";

const IconComponents: Record<string, JSX.Element> = {
  食費: <RestaurantIcon fontSize="small" sx={{ verticalAlign: 'middle' ,mr:1 }} />,
  日用品: <AlarmIcon fontSize="small" sx={{ verticalAlign: 'middle' ,mr:1 }} />,
  住居費: <AddHomeIcon fontSize="small" sx={{ verticalAlign: 'middle' ,mr:1 }} />,
  交際費: <Diversity3Icon fontSize="small" sx={{ verticalAlign: 'middle' ,mr:1 }} />,
  娯楽: <SportsTennisIcon fontSize="small" sx={{ verticalAlign: 'middle' ,mr:1 }} />,
  交通費: <TrainIcon fontSize="small" sx={{ verticalAlign: 'middle' ,mr:1 }} />,
  給与: <WorkIcon fontSize="small" sx={{ verticalAlign: 'middle' ,mr:1 }} />,
};

export default IconComponents;