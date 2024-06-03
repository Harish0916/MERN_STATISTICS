import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGlobalContext } from "./context"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Barchart = () => {
  const {isLoading, month } = useGlobalContext();
  let apiUrl = `http://localhost:5000/api/bar-chart/${month}`;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Number of Items',
      data: [],
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 1,
    }]
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setChartData({
        labels: data.map(item => item.priceRange),
        datasets: [{
          ...chartData.datasets[0],
          data: data.map(item => item.count)
        }]
      });
    };

    fetchData();
  }, [apiUrl]);
  if(isLoading){
    return (
        <>
            <h1>Loading...</h1>
        </>
    )
  }
  return <Bar data={chartData} />;
};

export default Barchart;
