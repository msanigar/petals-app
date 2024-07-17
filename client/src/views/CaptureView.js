import React, { useState } from 'react';
import axios from 'axios';

function CaptureView({ closeModal }) {
  const [formData, setFormData] = useState({
    team: 'Pro',
    date: '',
    productivity: '',
    enjoyment: '',
    teamwork: '',
    learning: '',
    stress: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/petals', formData)
      .then(response => {
        console.log('Data submitted:', response.data);
        setError('');
        closeModal();
      })
      .catch(error => {
        console.error('Error submitting data:', error);
        setError(error.response?.data?.message || 'An error occurred');
      });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Team</label>
            <div className="control">
              <div className="select">
                <select name="team" value={formData.team} onChange={handleChange}>
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Apps">Apps</option>
                  <option value="Platform">Platform</option>
                  <option value="Extend">Extend</option>
                  <option value="Tech Leadership">Tech Leadership</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Date</label>
            <div className="control">
              <input className="input" type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Productivity 🚀</label>
            <div className="control">
              <input className="input" type="number" name="productivity" value={formData.productivity} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Enjoyment 🤩</label>
            <div className="control">
              <input className="input" type="number" name="enjoyment" value={formData.enjoyment} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Teamwork 🤝</label>
            <div className="control">
              <input className="input" type="number" name="teamwork" value={formData.teamwork} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Learning 👩‍🏫</label>
            <div className="control">
              <input className="input" type="number" name="learning" value={formData.learning} onChange={handleChange} />
            </div>
          </div>

          <div className="field">
            <label className="label">Stress 😩</label>
            <div className="control">
              <input className="input" type="number" name="stress" value={formData.stress} onChange={handleChange} />
            </div>
          </div>

          {error && (
            <div className="notification is-danger">
              {error}
            </div>
          )}

          <div className="field">
            <div className="control">
              <button className="button is-link" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
    </div>
  );
}

export default CaptureView;
