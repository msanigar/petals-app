import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventView() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    description: ''
  });

  const fetchEvents = () => {
    axios.get('/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/events', formData)
      .then(response => {
        setFormData({ date: '', description: '' });
        fetchEvents();
      })
      .catch(error => console.error('Error submitting event:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/events/${id}`)
      .then(() => fetchEvents())
      .catch(error => console.error('Error deleting event:', error));
  };

  return (
    <div>
      <h2 className="title">Manage Events</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Date</label>
          <div className="control">
            <input className="input" type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <input className="input" type="text" name="description" value={formData.description} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit">Add Event</button>
          </div>
        </div>
      </form>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event._id}>
              <td>{event.date.split('T')[0]}</td>
              <td>{event.description}</td>
              <td>
                <button className="button is-danger" onClick={() => handleDelete(event._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EventView;
