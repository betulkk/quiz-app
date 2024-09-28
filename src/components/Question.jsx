import React, { useEffect, useState } from 'react';
import TimerBar from './TimerBar';

function Question({ question, currentIndex, totalQuestions, onNext, onAnswer, onClearAnswer, selectedOption, timeLeft }) {
  const [options, setOptions] = useState([]);
  const [allowAnswer, setAllowAnswer] = useState(false);

  useEffect(() => {
    
    const splitOptions = question.body.split('\n').map(opt => opt.trim());
    setOptions(splitOptions.length > 1 ? splitOptions : [question.body]);

    
    setAllowAnswer(false);

    // 10 saniye sonra cevaplamaya izin verme
    const delayAnswer = setTimeout(() => {
      setAllowAnswer(true); 
    }, 10000);

    return () => {
      clearTimeout(delayAnswer);
    };
  }, [question]);

  return (
    <div className="question-card bg-white p-6 rounded-lg shadow-lg">
      <TimerBar timeLeft={timeLeft} />
      <h2 className="text-xl font-bold mb-4">
        Soru {currentIndex} / {totalQuestions}
      </h2>
      <h3 className="text-lg mb-4">{question.title}</h3>
      <div className="options space-y-2">
        {options.map((option, index) => (
            <button
            key={index}
            disabled={!allowAnswer} 
            className={`block w-full px-4 py-2 text-left border ${
                allowAnswer
                ? selectedOption === index
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={() => allowAnswer && onAnswer(index)} 
            >
            {['A', 'B', 'C', 'D'][index]}. {option}
            </button>
        ))}
        </div>
      <div className="mt-4">
      <button
  className={`bg-[#9198e5] text-white px-4 py-2 rounded-md mr-4 ${
    timeLeft > 20 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#717ade]'
  }`}
  onClick={onNext}
  disabled={timeLeft > 20} // 20 saniyeden daha uzun süre kalmışsa buton disable olur.
>
  Sonraki Soru
</button>

        <button
          className={`bg-[#e66465] text-white px-4 py-2 rounded-md ${
    selectedOption === null ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ce5959]'
  }`}
          onClick={onClearAnswer} // Seçilen seçenek temizlenir.
          disabled={selectedOption === null} // Hiçbir seçenek seçili değilse buton disable olur.
        >
          Seçimi Temizle
        </button>
      </div>
    </div>
  );
}

export default Question;
