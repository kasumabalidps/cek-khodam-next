'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { supabase } from '@/utils/supabase'
import { FaXTwitter, FaDiscord } from "react-icons/fa6";
import Image from 'next/image'
import Link from 'next/link'

function KhodamCard() {
  const [state, setState] = useState({
    namaKhodam: '',
    isChecking: false,
    gambar: 'anyadefault.png',
    hasilKhodam: '',
    isSelesai: false,
    currentMantraIndex: 0,
    currentMantra: '',
    error: null,
  });
  const [listKhodam, setListKhodam] = useState([]);
  const [listMantra, setListMantra] = useState([]);

  const fetchKhodamAndMantraTexts = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }));
      const [khodamResponse, mantraResponse] = await Promise.all([
        supabase.from('list_khodam').select('text_list'),
        supabase.from('list_mantra').select('text_list')
      ]);

      if (khodamResponse.error) throw khodamResponse.error;
      if (mantraResponse.error) throw mantraResponse.error;

      setListKhodam(khodamResponse.data.map(item => item.text_list));
      setListMantra(mantraResponse.data.map(item => item.text_list));
    } catch (error) {
      console.error('Error fetching data:', error);
      setState(prev => ({ ...prev, error: 'Gagal mengambil data. Silakan coba lagi.' }));
    }
  }, []);

  useEffect(() => {
    fetchKhodamAndMantraTexts();
  }, [fetchKhodamAndMantraTexts]);

  const saveToSupabase = async (nama, hasil) => {
    try {
      const { data, error } = await supabase
        .from('khodam_results')
        .insert([{ nama_khodam: nama, hasil_khodam: hasil, tanggal: new Date().toISOString() }]);
      if (error) throw error;
      console.log('Data berhasil disimpan:', data);
    } catch (error) {
      console.error('Error menyimpan data:', error);
      setState(prevState => ({ ...prevState, error: 'Gagal menyimpan data ke database' }));
    }
  };

  const handleCekKhodam = () => {
    if (!state.namaKhodam) return;
    
    setState(prevState => ({ 
      ...prevState, 
      isChecking: true, 
      gambar: 'anya2.png', 
      error: null,
      currentMantraIndex: 0,
      currentMantra: listMantra[0] || ''
    }));

    let mantraIndex = 0;
    const minMantraCount = 3; // Minimal 3 mantra yang ditampilkan
    const mantraInterval = setInterval(() => {
      mantraIndex++;
      
      if (mantraIndex < Math.max(minMantraCount, listMantra.length)) {
        setState(prevState => ({
          ...prevState,
          currentMantraIndex: mantraIndex,
          currentMantra: listMantra[mantraIndex % listMantra.length]
        }));
      } else {
        clearInterval(mantraInterval);
        const randomKhodam = listKhodam[Math.floor(Math.random() * listKhodam.length)];
        setState(prevState => ({
          ...prevState,
          hasilKhodam: randomKhodam,
          gambar: 'anya3.png',
          isChecking: false,
          isSelesai: true,
        }));
        saveToSupabase(state.namaKhodam, randomKhodam);
      }
    }, 2000); // Setiap mantra ditampilkan selama 2 detik
  };

  return (
    <div className="max-w-xl mx-auto rounded-lg p-4 gap-x-4 border-gray-700">
        {/* Menu Card */}
        <div className="flex flex-col gap-y-2 mb-5">
            <div className="flex justify-start items-center gap-x-4 z-20">
                <Link href="/" className="font-medium text-white underline underline-offset-[14.5px] decoration-2 text-sm md:text-base">Cek Khodam Kamu</Link>
                <Link href="/listkhodam" className="font-light text-white text-sm md:text-base">List Khodam</Link>
            </div>
            <hr className="border-t-2 border-gray-700 z-10" />
        </div>
        {/* Card */}
        <div className="flex flex-col gap-y-2 border-2 border-gray-700 rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col justify-center items-center py-4 md:py-8">
                <div className="relative">
                    <img src={state.gambar} alt="anya" className="w-48 md:w-64 h-auto rounded-full mb-2 md:mb-4 border-4 border-pink-500 shadow-lg transform hover:scale-105 transition-transform duration-300" />
                    {!state.isChecking && !state.isSelesai && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <span className="animate-bounce inline-block px-4 py-2 bg-pink-500 text-white rounded-full text-xs md:text-sm">Haii...</span>
                        </div>
                    )}
                </div>
                {!state.isSelesai && !state.isChecking && (
                  <h1 className="text-white text-2xl md:text-4xl font-bold pt-2 md:pt-4 animate-pulse">Cek Khodam Kamu! 🌟</h1>
                )}
                {state.isChecking && (
                  <div className="text-center mt-4 px-4">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/30 shadow-lg">
                      <p className="text-xl md:text-2xl text-white font-medium animate-pulse">
                        <span className="inline-block animate-spin mr-2">✨</span>
                        {state.currentMantra}
                        <span className="inline-block animate-spin ml-2">✨</span>
                      </p>
                    </div>
                  </div>
                )}
                {state.isSelesai && !state.isChecking && (
                  <div className="text-white mt-4 text-center">
                    <h2 className="text-xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-pulse">✨ Hasil Terawangan ✨</h2>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 shadow-lg">
                      <p className="text-lg md:text-xl font-medium">{state.hasilKhodam}</p>
                      <p className="text-sm text-gray-400 mt-2">~ Terawangan Khodam ~</p>
                    </div>
                  </div>
                )}
            {!state.isChecking && !state.isSelesai && (
              <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-4 p-2 md:p-4 mt-6">
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-lg bg-gray-700/50 text-white text-sm md:text-base border border-gray-600 focus:border-blue-500 focus:outline-none transition-colors" 
                    placeholder="Masukkan Nama Khodam"
                    value={state.namaKhodam}
                    onChange={(e) => setState(prevState => ({ ...prevState, namaKhodam: e.target.value }))}
                  /> 
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg text-sm md:text-base transition-colors shadow-lg"
                    onClick={handleCekKhodam}
                  >
                    Terawang
                  </button>
              </div>
            )}
            {state.error && (
              <p className="text-red-500 mt-4 text-sm md:text-base bg-red-100/10 px-6 py-3 rounded-lg">{state.error}</p>
            )}
            </div>
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