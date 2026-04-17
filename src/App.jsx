import React, { useState } from "react";
import FeedbackForm from "./components/FeedbackForm";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const handleSuccess = (newFeedback) => {
    // Check if we already added this (the effect might trigger again if state doesn't change)
    setFeedbacks((prev) => {
      if (prev.find((f) => f.id === newFeedback.id)) return prev;
      return [newFeedback, ...prev];
    });
  };

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
        ).toFixed(1)
      : 0;

  return (
    <main className="app-layout">
      <div className="form-section">
        <FeedbackForm onSuccess={handleSuccess} />
      </div>

      <div className="dashboard-section">
        <div className="stats-card">
          <h2>Insights Dashboard</h2>
          <div className="average-display">
            <span className="avg-num">{averageRating}</span>
            <div className="avg-info">
              <div className="stars">{"★".repeat(Math.round(averageRating))}</div>
              <p>Overall Rating ({feedbacks.length} reviews)</p>
            </div>
          </div>
        </div>

        <div className="feedback-list">
          {feedbacks.length === 0 ? (
            <div className="empty-state">
              <p>No feedback yet. Be the first to share!</p>
            </div>
          ) : (
            feedbacks.map((f) => (
              <div key={f.id} className="feedback-item">
                <div className="item-header">
                  <strong>{f.name}</strong>
                  <span className="item-stars">{"★".repeat(f.rating)}</span>
                </div>
                <p className="item-comment">{f.comment}</p>
                <span className="item-date">{f.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
