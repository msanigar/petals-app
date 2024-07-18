import React, { useState, useRef } from 'react';
import SummaryView from './views/SummaryView';
import CaptureView from './views/CaptureView';
import RemoveView from './views/RemoveView';
import EventView from './views/EventView';

function App() {
  const [view, setView] = useState('summary');
  const summaryViewRef = useRef();

  const toggleView = (newView) => {
    setView(newView);
  };

  const closeModal = () => {
    setView('summary');
  };

  const handleDataSubmission = () => {
    if (summaryViewRef.current) {
      summaryViewRef.current.reFetch();
    }
    closeModal();
  };

  return (
    <div className="container">
      <h1 className="title">PETALs Summary</h1>
      {view === 'summary' && <SummaryView ref={summaryViewRef} />}
      {view === 'capture' && <CaptureView closeModal={handleDataSubmission} />}
      {view === 'remove' && <RemoveView />}
      {view === 'events' && <EventView />}

      <div className="buttons">
        <button className="button is-primary" onClick={() => toggleView('summary')}>
          Summary View
        </button>
        <button className="button is-primary" onClick={() => toggleView('capture')}>
          Add PETALs Data
        </button>
        <button className="button is-danger" onClick={() => toggleView('remove')}>
          Remove PETALs Data
        </button>
        <button className="button is-info" onClick={() => toggleView('events')}>
          Manage Events
        </button>
      </div>
    </div>
  );
}

export default App;
