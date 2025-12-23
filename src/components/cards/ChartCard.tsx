import { Box, GridItem, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';

Chart.register(...registerables);
export default function ChartCard({
  chart = 'bar',
  name,
  value,
  changePercent,
}: {
  chart?: 'line' | 'bar';
  name: string;
  value: any;
  changePercent?: number | null;
}) {
  const monthlyData = [45, 80, 20, 160, 50, 140, 80, 70, 10, 40, 100, 50];

  const data: ChartData<'bar'> = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: '',
        data: monthlyData,
        backgroundColor: '#9DC4FA',
        borderWidth: 0,
        barThickness: 11,
        borderSkipped: 'middle',
        borderRadius: 6,
      },
    ],
  };

  const options: ChartOptions | any = {
    scales: {
      x: {
        border: {
          display: false,
        },
        ticks: { display: false },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: { display: false },

        border: {
          display: false,
        },

        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: false,
    },
    legend: {
      display: false,
    },
  };

  const lineData: ChartData<'line'> = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: '',
        data: monthlyData,
        fill: false,
        borderColor: '#1B4F8F',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };
  const lineChartOptions: ChartOptions | any = {
    scales: {
      x: {
        border: {
          display: false,
        },
        ticks: { display: false },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: { display: false },

        border: {
          display: false,
        },

        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: false,
    },
    legend: {
      display: false,
    },
  };
  const isChangeNumber =
    typeof changePercent === 'number' && Number.isFinite(changePercent);
  const formattedChange = isChangeNumber
    ? `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(1)}%`
    : '—';
  const changeColor = !isChangeNumber
    ? '#6B7280'
    : changePercent >= 0
    ? '#16A34A'
    : '#DC2626';

  return (
    <Box
      pt={'2rem'}
      px={'1.8rem'}
      pb={'1.5rem'}
      bg={'white'}
      rounded={'0.9rem'}
      border="1px solid #EEF0F4"
      boxShadow={'0 8px 20px rgba(17, 64, 111, 0.08)'}
    >
      <Text
        fontSize={'.8rem'}
        textTransform={'uppercase'}
        color={'#6B7280'}
        fontWeight={600}
      >
        {name}
      </Text>

      <SimpleGrid mt={'1rem'} h={'7rem'} bg={'yfllow'} columns={3}>
        <GridItem>
          <Stack h={'100%'} justifyContent={'space-between'}>
            <Text color={'#111827'} fontWeight={700} fontSize={'1.6rem'}>
              {value}
            </Text>
            <Text fontSize={'1rem'} color={changeColor} fontWeight={600}>
              {formattedChange}
            </Text>
          </Stack>
        </GridItem>
        <GridItem
          maxH={'100%'}
          position={'relative'}
          display={'flex'}
          justifyContent={'flex-end'}
          colSpan={2}
          bg={'yellovw'}
        >
          {chart === 'line' ? (
            <Line data={lineData} options={lineChartOptions as any} />
          ) : (
            <Bar data={data} options={options as any} />
          )}
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
