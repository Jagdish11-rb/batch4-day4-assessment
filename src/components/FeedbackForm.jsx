import React, { useActionState, useEffect, useState, useTransition } from "react";
import { submitFeedback } from "../actions/feedback";

function SubmitButton({ isPending }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`w-full py-4 px-6 rounded-2xl font-black text-white transition-all duration-300 transform
        ${isPending
          ? "bg-slate-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-slate-900 hover:shadow-2xl active:scale-95"
        } flex justify-center items-center gap-3`}
    >
      {isPending ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="uppercase tracking-widest text-xs">Processing...</span>
        </>
      ) : (
        <span className="uppercase tracking-widest text-xs">Submit Training Feedback</span>
      )}
    </button>
  );
}

const FeedbackForm = ({ onActionComplete }) => {
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState({
    employeeId: "",
    name: "",
    rating: "",
    comment: ""
  });

  const [state, setState] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employeeId", formState.employeeId);
    formData.append("name", formState.name);
    formData.append("rating", formState.rating);
    formData.append("comment", formState.comment);

    startTransition(async () => {
      const result = await submitFeedback(null, formData);
      setState(result);

      onActionComplete(result);

      if (result.success) {
        setFormState({
          employeeId: "",
          name: "",
          rating: "",
          comment: ""
        });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-[2rem] p-10 md:p-14 shadow-2xl shadow-blue-50 border border-slate-100">
        <div className="mb-12 border-b border-slate-50 pb-8">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
            How was your <br />training experience?
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="employeeId" className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">
              Employee ID <span className="text-sm text-red-500 font-bold">*</span>
            </label>
            <input
              id="employeeId"
              name="employeeId"
              type="text"
              autoComplete="off"
              value={formState.employeeId}
              onChange={handleChange}
              placeholder="e.g. ISU123"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="name" className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">
              Employee Name <span className="text-sm text-red-500 font-bold">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">
              Skill Rating <span className="text-sm text-red-500 font-bold">*</span>
            </label>
            <div className="flex flex-row-reverse justify-between bg-slate-50 p-6 rounded-2xl border-2 border-slate-100">
              {[5, 4, 3, 2, 1].map((num) => (
                <React.Fragment key={num}>
                  <input
                    type="radio"
                    id={`star-${num}`}
                    name="rating"
                    value={num.toString()}
                    checked={String(formState.rating) === String(num)}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`star-${num}`}
                    className="text-4xl text-slate-200 cursor-pointer transition-all hover:scale-125 peer-checked:text-amber-400 hover:text-amber-200 inline-block rounded-lg"
                  >
                    ★
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="comment" className="text-[10px] font-black text-slate-400 tracking-widest uppercase ml-1">
              Detailed Input <span className="text-sm text-red-500 font-bold">*</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formState.comment}
              onChange={handleChange}
              placeholder="Share details of your own experience"
              rows={4}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-800 font-bold placeholder:text-slate-300 focus:outline-none focus:border-blue-600 focus:bg-white transition-all shadow-sm resize-none"
            ></textarea>
          </div>

          <SubmitButton isPending={isPending} />
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
