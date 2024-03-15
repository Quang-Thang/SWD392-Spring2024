import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { FaUser, FaUserTie } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
// import { Chart } from 'src/components/chart';

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

const iconMap = {
  Member: <FaUser size={30} />,
  Staff: <FaUserTie size={30} />,
  Admin: <RiAdminFill size={30} />,
};

export const UserRoles = (props) => {
  const { chartSeries, labels, sx } = props;
  const chartOptions = useChartOptions(labels);

  return (
    <div sx={sx}>
      <ReactApexChart
        height={300}
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="100%"
      />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 2 }}
      >
        {chartSeries.map((item, index) => {
          const label = labels[index];

          return (
            <Box
              key={label}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              {iconMap[label]}
              <h1 className="font-black text-xl">{label}</h1>
              <div className="text-slate-600 ">{item}</div>
            </Box>
          );
        })}
      </Stack>
    </div>
  );
};
