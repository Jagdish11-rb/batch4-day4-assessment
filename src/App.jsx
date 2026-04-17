import React, { useState, useEffect } from "react";
import FeedbackForm from "./components/FeedbackForm";

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-8 left-8 z-50 p-6 rounded-2xl shadow-2xl border transition-all duration-500 transform translate-y-0 animate-in slide-in-from-left-10
      ${type === 'success'
        ? "bg-white border-emerald-100 text-emerald-800"
        : "bg-white border-rose-100 text-rose-800"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
          ${type === 'success' ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"}`}
        >
          {type === 'success' ? "✓" : "!"}
        </div>
        <div>
          <p className="font-bold text-base">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-slate-300 hover:text-slate-500">✕</button>
      </div>
    </div>
  );
};

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "", id: 0 });

  const handleActionComplete = (result) => {
    setToast({
      message: result.message,
      type: result.success ? "success" : "error",
      id: Date.now()
    });

    if (result.success && result.data) {
      setFeedbacks((prev) => {
        if (prev.find((f) => f.id === result.data.id)) return prev;
        return [result.data, ...prev];
      });
    }
  };

  const averageRating =
    feedbacks.length > 0
      ? (
        feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
      ).toFixed(1)
      : 0;

  return (
    <main className="min-h-screen bg-slate-50 relative pb-20">

      <header className="bg-white border-b border-slate-100 py-12 mb-12 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            <span className="text-blue-400">iServeU React Training Program</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium text-lg">Your Feedback Powers Our Progress</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-12 xl:col-span-5">
            <FeedbackForm onActionComplete={handleActionComplete} />
          </div>

          <div className="lg:col-span-12 xl:col-span-7 space-y-8">

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100">
              <h2 className="text-xl font-black text-slate-800 tracking-tight mb-8 uppercase flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                Training Feedback Dashboard
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-10">
                <div className="flex flex-col items-center">
                  <div className="text-7xl font-black text-slate-900 leading-none tracking-tighter">
                    {averageRating}
                  </div>
                  <div className="mt-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    Avg rating
                  </div>
                </div>

                <div className="space-y-4 text-center sm:text-left border-l-0 sm:border-l sm:pl-10 border-slate-100 w-full">
                  <div>
                    <div className="flex justify-center sm:justify-start items-center gap-4 mb-1">
                      <div className="text-3xl text-amber-400 flex">
                        {"★".repeat(Math.round(averageRating))}
                        <span className="text-slate-100">{"★".repeat(5 - Math.round(averageRating))}</span>
                      </div>
                      <span className="text-slate-400 font-bold text-sm bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                        {feedbacks.length} reviews
                      </span>
                    </div>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
                      Overall Rating
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {feedbacks.length === 0 ? (
                <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Feedbacks Yet</p>
                </div>
              ) : (
                feedbacks.map((f) => (
                  <div
                    key={f.id}
                    className="bg-white rounded-2xl p-7 shadow-lg shadow-slate-100 border border-slate-50 animate-in slide-in-from-right-4 transition-all hover:scale-[1.01]"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-lg shadow-inner">
                          {f.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-slate-900 font-black tracking-tight">{f.name}({f.employeeId})</p>
                          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{f.date}</p>
                        </div>
                      </div>
                      <div className="text-amber-400 text-sm flex gap-0.5">
                        {"★".repeat(f.rating)}
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed font-medium italic">
                      {f.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      <Toast
        key={toast.id}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "", id: 0 })}
      />
    </main>
  );
}

export default App;
