import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart = ({ userData }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Users Joined',
        data: userData,
        backgroundColor: 'rgba(34, 197, 94, 0.6)', 
        borderColor: 'rgba(34, 197, 94, 1)', 
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(34, 197, 94, 0.8)', 
        hoverBorderColor: 'rgba(34, 197, 94, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#D1D5DB' 
        }
      },
      title: {
        display: true,
        text: 'Number of Users Joined Each Month',
        color: '#D1D5DB', 
        font: {
          size: 18,
          weight: 'bold',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#111827', 
        titleColor: '#F9FAFB', 
        bodyColor: '#F9FAFB',
        borderColor: '#34D399', 
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#374151', 
        },
        ticks: {
          color: '#D1D5DB',
        },
      },
      x: {
        grid: {
          color: 'transparent', 
        },
        ticks: {
          color: '#D1D5DB', 
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-lg p-6  transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4 text-center">User Statistics</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
