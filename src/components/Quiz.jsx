import React, { useState, useEffect } from 'react';
import Question from './Question';
import Summary from './Summary';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // Soruların cevaplarını tutar
  const [tempAnswer, setTempAnswer] = useState(null); // Soruların cevaplarını geçici olarak tutar
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Ekrandaki sorunun kalan süresi (Başlangıçta 30 saniye)
  const [userId, setUserId] = useState(1); 

  useEffect(() => {
    // Random userId seçiliyor
    const newUserId = Math.floor(Math.random() * 10) + 1;
    setUserId(newUserId);

    // Soruları çekme
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${newUserId}`)
      .then((response) => response.json())
      .then((data) => {
        const quizQuestions = data.slice(0, 10); 
        setQuestions(quizQuestions);
      });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion(); // Süre bitince diğer soruya geçme
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1); // Süreyi azaltma
    }, 1000);

    return () => clearInterval(timer); 
  }, [timeLeft]);

  const handleNextQuestion = () => {
    // Sonraki soruya geçerken cevaplanmış soruların cevaplarını kaydetme
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestion] = tempAnswer !== null ? tempAnswer : 'No Answer'; // Cevaplanmış soruların kalıcı cevaplarını kaydetme
      return updatedAnswers;
    });

    // Sonraki soruya geçme
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTempAnswer(null); // Geçici kaydedilen cevapı sıfırlama
      setTimeLeft(30); // Süreyi sıfırlama
    } else {
      setIsQuizCompleted(true); // Quiz tamamlandı
    }
  };

  const handleAnswerSelection = (index) => {
    setTempAnswer(index); // Geçici kaydedilen cevabı set etme
  };

  const handleClearAnswer = () => {
    setTempAnswer(null); // Seçili cevabı temizleme
  };

  return (
    <div className="quiz-container w-2/3">
      
      {isQuizCompleted ? (
        <Summary questions={questions} answers={answers} />
      ) : questions.length > 0 ? (
        <Question
          question={questions[currentQuestion]} // Şimdiki soru
          currentIndex={currentQuestion + 1} // Şimdiki soru numarası 
          totalQuestions={questions.length} // Soru sayısı
          onNext={handleNextQuestion} // Sonraki soruya geçme
          onAnswer={handleAnswerSelection} // Seçili cevabı kaydetme
          onClearAnswer={handleClearAnswer} // seçili cevabı temizleme
          selectedOption={tempAnswer} // Seçili cevap
          timeLeft={timeLeft} //Kalan süre
        />
      ) : (
        <p className='text-center text-white'>Sorular yüklenirken lütfen bekleyiniz...</p>
      )}
    </div>
  );
}

export default Quiz;
