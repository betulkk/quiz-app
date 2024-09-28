import React from 'react';
//Süre Barı
function TimerBar({ timeLeft }) {
  return (
    <div className="timer mb-4">
      <p className="text-center text-gray-700">
        Kalan süre: <span className="font-bold">{timeLeft}</span> saniye
      </p>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-[#9198e5] h-2 rounded-full"
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default TimerBar;
