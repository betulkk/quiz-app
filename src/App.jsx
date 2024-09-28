import React, { useState } from 'react';
import Quiz from './components/Quiz';

function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#e66465] to-[#9198e5]">
      <h1 className="text-2xl text-white font-bold text-center mt-[50px] mb-[50px]">Quiz App</h1>
      {!startQuiz ? (
        <>
          <button
            onClick={() => setStartQuiz(true)}
            className="bg-[#9198e5] text-white px-8 py-4 rounded-lg text-xl shadow-md hover:bg-[#e66465] mb-[100px]"
          >
            Sınavı Başlat
          </button>
          <div className="text-center text-white mt-4">
            <h2 className="text-lg">Sınava başlamadan önce kuralları okuyunuz: </h2>
            <p>
              - Toplam 10 soru olacak. Her soruda 4 seçenek bulunacak. Her soru için yalnızca bir seçenek
              seçebilirsiniz. Her soruyu yanıtlamak için 30 saniye süreniz olacak. 
            </p>
            <p>
              - Sonraki soruya geçtikten sonra geçmiş sorulara dönülmemektedir.  
            </p>
            <p>
              - Her soruya verdiğiniz cevap sınav sonunda bir tablo halinde gösterilecektir.
            </p>
          </div>
        </>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
