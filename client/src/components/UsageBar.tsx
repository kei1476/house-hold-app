import { LinearProgress, Typography } from "@mui/material";

interface UsageBarProps {
  label: string;
  usage: number;
  defaultColor: "inherit" | "error" | "primary" | "secondary" | "info" | "success" | "warning";
}

const UsageBar = ({label, usage, defaultColor}: UsageBarProps) => {
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
          {`${label}:${usage}%`}
        </Typography>
        <LinearProgress
          variant="determinate"
          color={usage >= 90 ? "error" : defaultColor}
          value={usage >= 100 ? 100 : usage}
          sx={{
            height: 8,
            borderRadius: 1,
          }}
        />
      </>
  );
};

export default UsageBar;
