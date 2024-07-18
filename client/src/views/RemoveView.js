import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RemoveView() {
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

  const handleDelete = (id) => {
    axios.delete(`/api/petals/${id}`)
      .then(() => {
        fetchData();
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const filteredData = team === 'All' ? data : data.filter(d => d.team === team);

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
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Date</th>
            {team === 'All' && <th>Team</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(record => (
            <tr key={record._id}>
              <td>{record.date.split('T')[0]}</td>
              {team === 'All' && <td>{record.team}</td>}
              <td>
                <button className="button is-danger" onClick={() => handleDelete(record._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RemoveView;
