import React, { useEffect, useRef, useState } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import { ModalProps, Prediction } from '@/interface/pelanggarInterface';
import { CarIcon, MotorCycleIcon, TruckIcon } from '../icons';
import Cookies from 'js-cookie';
import { getViolatorByDate } from '@/services/api';
import { useRouter } from 'next/navigation';

const PelanggarListModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [dataPelanggar, setDataPelanggar] = useState<Prediction[]>([]);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const getFormattedDate = (date = new Date()) => {
    const daysOfWeek = [
      'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];
    const monthsOfYear = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = monthsOfYear[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayOfWeek}, ${day} ${month} ${year}`;
  };
  

  useEffect(() => {
    async function getPelanggar() {
      try {
        const token = Cookies.get('token');
        if (token) {
          const response = await getViolatorByDate(token, router);
          if (response) {
            setDataPelanggar(response.data); // Assuming response.data contains the array
          }
        }
      } catch (error) {
        console.error('Failed to fetch violators count', error);
      }
    }

    getPelanggar();
  }, [isOpen]); // Use isOpen as dependency instead of dataPelanggar to avoid unnecessary re-fetch

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white overflow-hidden rounded-2xl shadow-lg w-full max-w-screen-xl mx-6">
        <div className="flex mb-5 justify-center items-center border-b border-gray-300">
          <h2 className="text-lg text-center my-1 font-medium mx-auto">{getFormattedDate()}</h2>
          <button onClick={onClose} className="absolute right-[8%] text-3xl">&times;</button>
        </div>
        <div className='bg-white rounded-2xl shadow-lg m-6'>
          <div className="flex justify-between text-sm font-medium mx-6 bg-gray-200 p-3 rounded-xl text-gray-500 uppercase">
            <div className="w-1/4 text-left">Plat Nomor</div>
            <div className="w-1/4 text-left">Kamera</div>
            <div className="w-1/4 text-left">Pukul</div>
            <div className="w-1/4 text-left">Durasi Melanggar</div>
          </div>
          <div className="space-y-4 mx-2 my-4 px-6 h-[65vh] pb-4 overflow-y-auto custom-scrollbar">
            {dataPelanggar.length !== 0 ?
              dataPelanggar.map((pelanggaran, idx) => {
                const formattedTime = pelanggaran.predictions.time.slice(0, 8); 
                return (
                  <a
                    key={idx}
                    href={`/pelanggar/${pelanggaran.predictions.plate}/${pelanggaran.id}`}
                    className="flex flex-col md:flex-row justify-between items-center p-2 hover:cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex items-center w-1/4 text-left">
                      {pelanggaran.predictions.vehicle_category === "car" && (
                        <CarIcon size={20} color="#3b82f6" className="inline-block mr-2" />
                      )}
                      {pelanggaran.predictions.vehicle_category === "bike" && (
                        <MotorCycleIcon size={20} color="#3b82f6" className="inline-block mr-2" />
                      )}
                      {pelanggaran.predictions.vehicle_category === "truck" && (
                        <TruckIcon size={20} color="#3b82f6" className="inline-block mr-2" />
                      )}
                      <div className="text-sm font-medium text-gray-900">
                        {pelanggaran.predictions.plate}
                      </div>
                    </div>
                    <div className="w-1/4 text-left text-sm pl-1 text-gray-900 font-medium">
                      {pelanggaran.predictions.cam}
                    </div>
                    <div className="w-1/4 text-left text-sm pl-3 text-gray-900 font-medium">
                      {formattedTime}
                    </div>
                    <div className="w-1/4 text-left text-sm pl-4 text-gray-900 font-medium">
                      {pelanggaran.predictions.duration}
                    </div>
                    <div className="text-gray-900 font-medium text-xl relative m-0 p-0">
                      <RiArrowRightSLine />
                    </div>
                  </a>
                );
              }) : <div className='text-center'>TIDAK ADA PELANGGAR</div>}
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 1px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}

export default PelanggarListModal;
