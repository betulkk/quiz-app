import React from 'react';
//Sınav Özeti
function Summary({ questions, answers }) {
  return (
    <div className="summary-container text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Sınav Özeti</h2>
      <table className="table-auto w-full border-[4px] font-[500] border-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-[4px] border-white">Soru Numarası</th>
            <th className="px-4 py-2 border-[4px] border-white">Soru</th>
            <th className="px-4 py-2 border-[4px] border-white">Cevabınız</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td className='border-[4px] border-white px-4 py-2'>{index + 1}</td>
              <td className="border-[4px] border-white px-4 py-2">{question.title}</td>
              <td className="border-[4px] border-white px-4 py-2">
                {['A', 'B', 'C', 'D'][answers[index]] || 'No answer'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6 text-right">
        <button
          className="bg-[#e66465] text-white font-[700] px-6 py-3 rounded-lg hover:bg-[#9198e5]"
          onClick={() => window.location.reload()}
        >
          Sınavı Yeniden Başlat
        </button>
      </div>
    </div>
  );
}

export default Summary;
