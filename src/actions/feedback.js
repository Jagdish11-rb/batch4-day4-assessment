
export async function submitFeedback(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const rating = formData.get("rating");
  const comment = formData.get("comment");
  const name = formData.get("name");
  const employeeId = formData.get("employeeId");

  console.log("Action Received Data:", { employeeId, name, rating, comment });

  if (!employeeId || String(employeeId).trim().length === 0) {
    return {
      success: false,
      message: "Please enter your employee id.",
    };
  }

  if (!name || name.trim().length < 2) {
    return {
      success: false,
      message: "Please enter your name.",
    };
  }

  if (!rating) {
    return {
      success: false,
      message: "Please select a rating.",
    };
  }

  if (!comment || comment.trim().length < 3) {
    return {
      success: false,
      message: "Please enter your detailed feedback.",
    };
  }

  const feedbackData = {
    id: Date.now(),
    employeeId: employeeId.toString(),
    name: name.toString(),
    rating: parseInt(rating.toString()),
    comment: comment ? comment.toString() : "",
    date: new Date().toLocaleTimeString(),
  };

  console.log("Feedback Submitted:", feedbackData);

  return {
    success: true,
    message: `Thank you, ${name}! Your feedback was received.`,
    data: feedbackData,
  };
}
