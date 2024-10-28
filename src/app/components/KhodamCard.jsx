'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'

function KhodamCard() {
  const [namaKhodam, setNamaKhodam] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [gambar, setGambar] = useState('anya.png')
  const [hasilKhodam, setHasilKhodam] = useState('')
  const [isSelesai, setIsSelesai] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [error, setError] = useState(null)
  const [listKhodam, setListKhodam] = useState([])
  const [listMantra, setListMantra] = useState([])

  useEffect(() => {
    const fetchKhodamAndMantraTexts = async () => {
      const { data: khodamData, error: khodamError } = await supabase
        .from('list_khodam')
        .select('text_list');

      if (khodamError) {
        console.error('Error fetching khodam texts:', khodamError);
      } else {
        setListKhodam(khodamData.map(item => item.text_list));
      }

      const { data: mantraData, error: mantraError } = await supabase
        .from('list_mantra')
        .select('text_list');

      if (mantraError) {
        console.error('Error fetching mantra texts:', mantraError);
      } else {
        setListMantra(mantraData.map(item => item.text_list));
      }
    };

    fetchKhodamAndMantraTexts();

    let interval;
    if (isChecking) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex === listMantra.length - 1) {
            return 0;
          }
          return prevIndex + 1;
        });
      }, listMantra.length * 500);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isChecking]);

  const saveToSupabase = async (nama, hasil) => {
    try {
      console.log(nama, hasil); // Debugging aja
      const { data, error } = await supabase
        .from('khodam_results')
        .insert([
          {
            nama_khodam: nama,
            hasil_khodam: hasil,
            tanggal: new Date().toISOString(),
          }
        ])

      if (error) throw error
      console.log('Data berhasil disimpan:', data)
    } catch (error) {
      console.error('Error menyimpan data:', error)
      setError('Gagal menyimpan data ke database')
    }
  }

  const handleCekKhodam = () => {
    if (!namaKhodam) return;
    setIsChecking(true)
    setGambar('anya2.png')
    setError(null)
    
    setTimeout(() => {
      const randomKhodam = listKhodam[Math.floor(Math.random() * listKhodam.length)]
      setHasilKhodam(randomKhodam)
      setGambar('anya3.png')
      setIsChecking(false)
      setIsSelesai(true)
      
      saveToSupabase(namaKhodam, randomKhodam)
    }, listMantra.length * 2000)
  }

  return (
    <div className="max-w-xl mx-auto rounded-lg p-4 gap-x-4 border-gray-700">
        {/* Menu Card */}
        <div className="flex flex-col gap-y-2 mb-5">
            <div className="flex justify-start items-center gap-x-4 z-20">
                <a href="/" className="font-medium text-white underline underline-offset-[14.5px] decoration-2">Cek Khodam Kamu</a>
                <a href="/listkhodam" className="font-light text-white">List Khodam</a>
            </div>
            <hr className="border-t-2 border-gray-700 z-10" />
        </div>
        {/* Card */}
        <div className="flex flex-col gap-y-2 border-2 border-gray-700 rounded-xl bg-gray-900">
            <div className="flex flex-col justify-center items-center py-8">
                <img src={gambar} alt="anya" className="w-64 h-auto rounded-full mb-4" />
                {!isSelesai && !isChecking && (
                  <h1 className="text-white text-4xl font-bold pt-4">Cek Khodam Kamu!</h1>
                )}
                {isChecking && (
                  <div className="text-white mt-4 text-2xl">
                    {listMantra.map((text, index) => (
                      <p key={index} className={`${index === currentIndex ? 'block' : 'hidden'}`}>
                        {text} <span className='font-bold'>{namaKhodam}</span>
                      </p>
                    ))}
                  </div>
                )}
                {isSelesai && (
                  <div className="flex flex-col gap-y-2">
                    <p className="text-white text-2xl">Khodam <span className='font-bold'>{namaKhodam}</span> adalah:</p>
                    <h1 className='text-center text-pink-300 text-4xl pb-6 font-bold underline underline-offset-[10px]'>{hasilKhodam}</h1>
                    <button 
                      className="bg-blue-500 text-white p-2 rounded-md"
                      onClick={() => {
                        setIsSelesai(false)
                        setNamaKhodam('')
                        setGambar('anya.png')
                        setError(null)
                      }}
                    >
                      Cek Orang Lain
                    </button>
                  </div>
                )}
                {error && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
            </div>
            {!isChecking && !isSelesai && (
              <div className="flex gap-x-4 p-4">
                  <input 
                    type="text" 
                    className="w-full p-2 rounded-md bg-gray-700 text-white" 
                    placeholder="Masukkan Nama Khodam"
                    value={namaKhodam}
                    onChange={(e) => setNamaKhodam(e.target.value)}
                  /> 
                  <button 
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleCekKhodam}
                  >
                    Terawang
                  </button>
              </div>
            )}
        </div>
    </div>
  )
}

export default KhodamCard