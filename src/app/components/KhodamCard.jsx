'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { FaXTwitter, FaDiscord } from "react-icons/fa6";

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
      }, listMantra.length * 800);
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
                <a href="/" className="font-medium text-white underline underline-offset-[14.5px] decoration-2 text-sm md:text-base">Cek Khodam Kamu</a>
                <a href="/listkhodam" className="font-light text-white text-sm md:text-base">List Khodam</a>
            </div>
            <hr className="border-t-2 border-gray-700 z-10" />
        </div>
        {/* Card */}
        <div className="flex flex-col gap-y-2 border-2 border-gray-700 rounded-xl bg-gray-900">
            <div className="flex flex-col justify-center items-center py-4 md:py-8">
                <img src={gambar} alt="anya" className="w-48 md:w-64 h-auto rounded-full mb-2 md:mb-4" />
                {!isSelesai && !isChecking && (
                  <h1 className="text-white text-2xl md:text-4xl font-bold pt-2 md:pt-4">Cek Khodam Kamu!</h1>
                )}
                {isChecking && (
                  <div className="text-white mt-2 md:mt-4 text-xl md:text-2xl">
                    {listMantra.map((text, index) => (
                      <p key={index} className={`${index === currentIndex ? 'block' : 'hidden'}`}>
                        {text}
                      </p>
                    ))}
                  </div>
                )}
                {isSelesai && (
                  <div className="flex flex-col gap-y-2">
                    <p className="text-white text-xl md:text-2xl text-center">Khodam <span className='font-bold'>{namaKhodam}</span> adalah:</p>
                    <h1 className='text-center text-pink-300 text-lg sm:text-xl md:text-2xl lg:text-4xl pb-3 md:pb-6 font-bold underline underline-offset-[10px] break-words px-4'>{hasilKhodam}</h1>
                    <button 
                      className="bg-blue-500 text-white p-2 rounded-md text-sm md:text-base"
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
                  <p className="text-red-500 mt-2 text-sm md:text-base">{error}</p>
                )}
            </div>
            {!isChecking && !isSelesai && (
              <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 p-2 md:p-4">
                  <input 
                    type="text" 
                    className="w-full p-2 rounded-md bg-gray-700 text-white text-sm md:text-base" 
                    placeholder="Masukkan Nama Khodam"
                    value={namaKhodam}
                    onChange={(e) => setNamaKhodam(e.target.value.slice(0, 25))}
                    maxLength={25}
                  /> 
                  <button 
                    className="bg-blue-500 text-white p-3 py-2 rounded-md text-sm md:text-base"
                    onClick={handleCekKhodam}
                  >
                    Terawang
                  </button>
              </div>
            )}
            <div className='flex flex-col justify-center items-center pb-8'>
              <hr className="border-t-2 border-gray-700 my-4 w-[95%] mx-auto" />
              <div className='flex justify-center items-center gap-x-4'>
                <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-1">
                  <FaXTwitter className='text-gray-300 text-xl hover:text-gray-300 transition-colors' />
                  <p className='text-gray-300 text-xs md:text-base hover:text-gray-300 transition-colors'>Bagikan</p>
                </a>
                <a href="https://discord.com/channels" target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-1">
                  <FaDiscord className='text-blue-600 text-xl hover:text-gray-300 transition-colors' />
                  <p className='text-blue-600 text-xs md:text-base hover:text-gray-300 transition-colors'>Bagikan</p>
                </a>
              </div>
            </div>
        </div>
    </div>
  )
}

export default KhodamCard