import React, { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartJS from 'chart.js/auto';
import addSpaceForAmount from '../../utils/addSpaceForAmount';
import Media from 'react-media';
import s from './Chart.module.css';
import { generateArr } from '../../utils/generateArr';

ChartJS.register(ChartDataLabels);

const Chart = ({ labels, data, maxData }) => {
  // ------------TABLET/DESKTOP---------------------------------
  const barChartData = {
    labels: labels,

    datasets: [
      {
        data: data,

        borderColor: 'rgba(245, 246, 251, 1)',
        backgroundColor: [
          'rgba(255, 117, 29, 1)',
          'rgba(255, 218, 192, 1)',
          'rgba(255, 218, 192, 1)',
        ],
        borderRadius: '12',
        fill: true,
        borderJoinStyle: 'bevel',
        borderWidth: '1',
        showLine: false,
        responsive: true,
        barPercentage: 0.5,
        barThickness: 38,
      },
    ],
  };
  // -------------------------MOBILE-------------------------
  const barChartDataMobile = {
    labels: labels,

    datasets: [
      {
        data: generateArr(180, labels.length),

        datalabels: {
          display: function (context) {
            const dataTrue = data.find(
              (_, index) => index === context.dataIndex
            );

            return dataTrue > 800;
          },

          font: {
            size: '12',
          },
          color: '#52555f',
          labels: {
            title: {
              align: 'top',
            },
          },
          anchor: 'end',
          offset: 5,
          barPercentage: 0.5,
          categoryPercentage: 1,

          formatter: (_, context) => {
            const labels = context.chart.data.labels[context.dataIndex];

            return labels;
          },
        },
        barPercentage: 1,
        barThickness: 15,

        backgroundColor: ['transparent'],
      },
      {
        data: data,

        datalabels: {
          layout: {
            padding: {
              top: 0,
              right: 100,
              bottom: 100,
              left: 8,
            },
          },

          font: {
            size: '12',
          },
          color: '#52555f',
          labels: {
            title: {
              align: 'top',
            },
          },
          anchor: 'end',
          offset: 5,
          barPercentage: 0.5,
          categoryPercentage: 1,

          formatter: value => {
            return `${addSpaceForAmount(Math.floor(value)).split('.')[0]} ??????`;
          },
        },

        borderColor: 'transparent',
        backgroundColor: [
          'rgba(255, 117, 29, 1)',
          'rgba(255, 218, 192, 1)',
          'rgba(255, 218, 192, 1)',
        ],
        borderRadius: '12',
        fill: true,
        borderJoinStyle: 'bevel',
        borderWidth: 'none',
        showLine: false,

        barPercentage: 1,
        barThickness: 15,
      },
    ],
  };

  const barChartMobil = (
    <Bar
      type="bar"
      width={100}
      height={100}
      options={{
        layout: {
          padding: { left: 30, right: 30 },
        },
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          legend: {
            display: false,
            position: 'bottom',
          },

          x: {
            stacked: true,
            offset: true,
            grid: { offset: true, lineWidth: 0, borderColor: 'transparent' },
            ticks: {
              display: false,
            },
          },
          y: {
            offset: true,
            grid: { offset: true, lineWidth: 0, borderColor: 'transparent' },
            stacked: true,
            ticks: {
              display: false,
            },
          },
        },
      }}
      data={barChartDataMobile}
    />
  );
  const barChart = (
    <Bar
      type="bar"
      width={100}
      height={100}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            color: '#52555f',
            anchor: 'end',
            offset: 3,
            align: 'end',
            formatter: value =>
              `${addSpaceForAmount(Math.floor(value)).split('.')[0]} ??????`,
          },
        },

        scales: {
          legend: {
            display: false,
            position: 'bottom',
          },

          y: {
            min: 0,
            max: maxData,
            stacked: true,
            ticks: {
              display: false,
            },
          },
          x: {
            min: 0,
            max: maxData,
            grid: { lineWidth: 0 },
            stacked: true,
          },
        },
      }}
      data={barChartData}
    />
  );
  return (
    <Media
      queries={{
        small: '(max-width: 767px)',
        medium: '(min-width: 768px)',
      }}
    >
      {matches => (
        <Fragment>
          {matches.small && <div className={s.barMob}>{barChartMobil}</div>}
          {matches.medium && <div className={s.bar}>{barChart}</div>}
        </Fragment>
      )}
    </Media>
  );
};

Chart.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
  maxData: PropTypes.number,
};

export default Chart;
