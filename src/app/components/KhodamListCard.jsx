'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'

function KhodamListCard() {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const resultsPerPage = 10

  useEffect(() => {
    const fetchKhodamResults = async () => {
      try {
        const { data, error } = await supabase
          .from('khodam_results')
          .select('id, nama_khodam, hasil_khodam, tanggal')

        if (error) {
          console.error('Error fetching khodam results:', error)
        } else {
          setResults(data)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchKhodamResults()
  }, [])

  const indexOfLastResult = currentPage * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(results.length / resultsPerPage)

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      <div className="max-w-xl mx-auto rounded-lg p-4 gap-x-4 border-gray-700">
        {/* Menu Card */}
        <div className="flex flex-col gap-y-2 mb-5">
          <div className="flex justify-start items-center gap-x-4 z-20">
            <a href="/" className="font-light text-white text-sm md:text-base">Cek Khodam Kamu</a>
            <a href="/listkhodam" className="font-medium text-white underline underline-offset-[14.5px] decoration-2 text-sm md:text-base">List Khodam</a>
          </div>
          <hr className="border-t-2 border-gray-700 z-10" />
        </div>
        {/* Card */}
        <div className="flex flex-col gap-y-2 border-2 border-gray-700 rounded-xl bg-gray-900">
          <div className="flex flex-col justify-center items-center py-4 md:py-8">
            <h1 className="text-white text-2xl md:text-4xl font-bold mb-4 md:mb-8">Daftar Khodam</h1>
            <div className="w-full max-w-3xl px-2 md:px-4">
              <div className="bg-gray-800 rounded-lg p-2 md:p-4 overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="text-white border-b border-gray-700">
                      <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Nama</th>
                      <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Khodam</th>
                      <th className="py-2 px-2 md:px-4 text-left text-sm md:text-base">Waktu Check</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="3" className="py-3 px-2 md:px-4 text-center text-gray-300 text-sm md:text-base">Loading data...</td>
                      </tr>
                    ) : currentResults.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="py-3 px-2 md:px-4 text-center text-gray-300 text-sm md:text-base">Tidak ada data</td>
                      </tr>
                    ) : (
                      currentResults.map(result => (
                        <tr key={result.id} className="text-gray-300 border-b border-gray-700">
                          <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base">{result.nama_khodam}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base">{result.hasil_khodam}</td>
                          <td className="py-2 md:py-3 px-2 md:px-4 text-sm md:text-base">
                            {new Date(result.tanggal).toLocaleString('id-ID')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {/* Pagination */}
                {!isLoading && results.length > 0 && (
                  <div className="flex justify-center items-center mt-4 gap-2">
                    {pageNumbers.map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 rounded ${
                          currentPage === number
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KhodamListCard