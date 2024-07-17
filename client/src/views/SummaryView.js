import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SummaryView = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [team, setTeam] = useState('All');
  const [teams, setTeams] = useState([]);

  const fetchData = () => {
    axios.get('/api/petals')
      .then(response => {
        setData(response.data);
        const uniqueTeams = [...new Set(response.data.map(d => d.team))];
        setTeams(['All', ...uniqueTeams]);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useImperativeHandle(ref, () => ({
    reFetch: fetchData
  }));

  const filteredData = team === 'All' ? data : data.filter(d => d.team === team);

  const chartData = {
    labels: filteredData.map(d => d.date.split('T')[0]),
    datasets: [
      {
        label: 'Productivity 🚀',
        data: filteredData.map(d => d.productivity),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Enjoyment 🤩',
        data: filteredData.map(d => d.enjoyment),
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
      {
        label: 'Teamwork 🤝',
        data: filteredData.map(d => d.teamwork),
        borderColor: 'rgba(255,159,64,1)',
        fill: false,
      },
      {
        label: 'Learning 👩‍🏫',
        data: filteredData.map(d => d.learning),
        borderColor: 'rgba(54,162,235,1)',
        fill: false,
      },
      {
        label: 'Stress 😩',
        data: filteredData.map(d => d.stress),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'PETALs Data Over Time',
        color: 'white'
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'white'
        }
      },
      y: {
        ticks: {
          color: 'white'
        }
      }
    }
  };

  return (
    <div>
      <div className="field">
        <label className="label">Team</label>
        <div className="control">
          <div className="select">
            <select value={team} onChange={(e) => setTeam(e.target.value)}>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
});

export default SummaryView;
