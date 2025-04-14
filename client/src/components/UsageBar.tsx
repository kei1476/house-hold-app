import { LinearProgress, Typography } from "@mui/material";

interface UsageBarProps {
  usage: number;
  defaultColor: "inherit" | "error" | "primary" | "secondary" | "info" | "success" | "warning";
}

const UsageBar = ({usage, defaultColor}: UsageBarProps) => {
  return (
      <>
        <Typography
          variant="h5"
          fontWeight={"fontWeightBold"}
          sx={{
            wordBreak: "break-word",
            fontSize: { xs: ".6rem", sm: ".8rem" },
          }}
        >
          予算使用率{usage}%
        </Typography>
        <LinearProgress
          variant="determinate"
          color={usage >= 90 ? "error" : defaultColor}
          value={usage >= 100 ? 100 : usage}
          sx={{
            height: 8,
            borderRadius: 1,
            color: (theme) => theme.palette.usageColor.main,
          }}
        />
      </>
  );
};

export default UsageBar;
