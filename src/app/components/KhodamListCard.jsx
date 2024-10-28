import React from 'react'

function KhodamListCard() {
  return (
    <div className="max-w-xl mx-auto rounded-lg p-4 gap-x-4 border-gray-700">
    {/* Menu Card */}
    <div className="flex flex-col gap-y-2 mb-5">
      <div className="flex justify-start items-center gap-x-4 z-20">
        <a href="/" className="font-light text-white">Cek Khodam Kamu</a>
        <a href="/listkhodam" className="font-medium text-white underline underline-offset-[14.5px] decoration-2">Adu Khodam Kamu</a>
      </div>
      <hr className="border-t-2 border-gray-700 z-10" />
    </div>
    {/* Card */}
    <div className="flex flex-col gap-y-2 border-2 border-gray-700 rounded-xl bg-gray-900">
      <div className="flex flex-col justify-center items-center py-8">
        <h1 className="text-white text-4xl font-bold mb-8">Daftar Khodam</h1>
        <div className="w-full max-w-3xl px-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="text-white border-b border-gray-700">
                  <th className="py-2 px-4 text-left">Nama</th>
                  <th className="py-2 px-4 text-left">Khodam</th>
                  <th className="py-2 px-4 text-left">Waktu Check</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-300 border-b border-gray-700">
                  <td className="py-3 px-4">Budi</td>
                  <td className="py-3 px-4">Khodam Air</td>
                  <td className="py-3 px-4">2024-01-20 13:45</td>
                </tr>
                <tr className="text-gray-300 border-b border-gray-700">
                  <td className="py-3 px-4">Ani</td>
                  <td className="py-3 px-4">Khodam Bauk</td>
                  <td className="py-3 px-4">2024-01-20 14:30</td>
                </tr>
                <tr className="text-gray-300 border-b border-gray-700">
                  <td className="py-3 px-4">Dani</td>
                  <td className="py-3 px-4">Khodam Tanah</td>
                  <td className="py-3 px-4">2024-01-20 15:15</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default KhodamListCard