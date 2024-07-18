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
  TimeScale,
  TimeSeriesScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-luxon';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
  annotationPlugin
);

const SummaryView = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
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

  const fetchEvents = () => {
    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  };

  useEffect(() => {
    fetchData();
    fetchEvents();
  }, []);

  useImperativeHandle(ref, () => ({
    reFetch: fetchData
  }));

  const filteredData = team === 'All' ? data : data.filter(d => d.team === team);

  const sortedData = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = {
    labels: sortedData.map(d => d.date.split('T')[0]),
    datasets: [
      {
        label: 'Productivity 🚀',
        data: sortedData.map(d => d.productivity),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: 'Enjoyment 🤩',
        data: sortedData.map(d => d.enjoyment),
        borderColor: 'rgba(153,102,255,1)',
        fill: false,
      },
      {
        label: 'Teamwork 🤝',
        data: sortedData.map(d => d.teamwork),
        borderColor: 'rgba(255,159,64,1)',
        fill: false,
      },
      {
        label: 'Learning 👩‍🏫',
        data: sortedData.map(d => d.learning),
        borderColor: 'rgba(54,162,235,1)',
        fill: false,
      },
      {
        label: 'Stress 😩',
        data: sortedData.map(d => d.stress),
        borderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
    ],
  };

  const eventColors = ['red', 'blue', 'green', 'purple', 'orange'];

  const annotations = events.map((event, index) => ({
    type: 'line',
    xMin: event.date.split('T')[0],
    xMax: event.date.split('T')[0],
    borderColor: eventColors[index % eventColors.length],
    borderWidth: 2,
    label: {
      content: event.description,
      enabled: true,
      position: 'top',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      rotation: 90,
      yAdjust: -10
    }
  }));

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
      },
      annotation: {
        annotations: annotations
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const event = events.find(e => e.date.split('T')[0] === context.label);
            return event ? event.description : '';
          }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        },
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
      <div className="legend">
        <h2 className="subtitle">Event Legend</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index} style={{ color: eventColors[index % eventColors.length] }}>
              {event.description} ({event.date.split('T')[0]})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

export default SummaryView;
