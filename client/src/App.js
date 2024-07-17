import React, { useState, useRef } from 'react';
import SummaryView from './views/SummaryView';
import CaptureView from './views/CaptureView';

function App() {
  const [showCapture, setShowCapture] = useState(false);
  const summaryViewRef = useRef();

  const toggleCaptureView = () => {
    setShowCapture(!showCapture);
  };

  const closeModal = () => {
    setShowCapture(false);
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
      <SummaryView ref={summaryViewRef} />
      <button className="button is-primary" onClick={toggleCaptureView}>
        {showCapture ? 'Close Capture Form' : 'Add PETALs Data'}
      </button>
      {showCapture && <CaptureView closeModal={handleDataSubmission} />}
    </div>
  );
}

export default App;
