import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitFeedback } from "../actions/feedback";

// SubmitButton component to utilize useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`submit-btn ${pending ? "loading" : ""}`}
    >
      {pending ? (
        <span className="spinner">Submitting...</span>
      ) : (
        "Send Feedback"
      )}
    </button>
  );
}

const FeedbackForm = ({ onSuccess }) => {
  // useActionState handles the state of the form action (replaces useFormState in React 19)
  const [state, formAction] = React.useActionState(submitFeedback, {
    success: null,
    message: "",
    data: null,
  });

  // Effect to notify parent on success
  React.useEffect(() => {
    if (state?.success && state?.data) {
      onSuccess(state.data);
    }
  }, [state, onSuccess]);

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h1>Smart Feedback</h1>
        <p id="desc">We value your opinion! Let us know how we’re doing.</p>

        <form action={formAction} className="feedback-form">
          <div className="input-group">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              className="text-input"
            />
          </div>

          <div className="rating-group">
            <label>How would you rate your experience?</label>
            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((num) => (
                <React.Fragment key={num}>
                  <input
                    type="radio"
                    id={`star-${num}`}
                    name="rating"
                    value={num}
                    className="star-input"
                  />
                  <label htmlFor={`star-${num}`} className="star-label">
                    ★
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="comment">Your Comments</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Tell us more about your experience..."
              rows={4}
            ></textarea>
          </div>

          <SubmitButton />

          {state?.message && (
            <div className={`status-message ${state.success ? "success" : "error"}`}>
              {state.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
