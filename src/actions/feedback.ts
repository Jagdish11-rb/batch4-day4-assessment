"use server";

/**
 * Server Action to handle feedback submission.
 * In a real Next.js app, this would run on the server.
 * In a Vite app with React 19, this serves as a client-side action handler.
 */
export async function submitFeedback(prevState, formData) {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const rating = formData.get("rating");
  const comment = formData.get("comment");
  const name = formData.get("name");

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

  if (!comment || comment.length < 5) {
    return {
      success: false,
      message: "Comment must be at least 5 characters long.",
    };
  }

  const feedbackData = {
    id: Date.now(),
    name: name.toString(),
    rating: parseInt(rating.toString()),
    comment: comment.toString(),
    date: new Date().toLocaleTimeString(),
  };

  // In a real app, you'd save this to a database
  console.log("Feedback Submitted:", feedbackData);

  return {
    success: true,
    message: `Thank you ${name}! Your feedback has been recorded.`,
    data: feedbackData,
  };
}
