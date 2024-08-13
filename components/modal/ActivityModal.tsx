"use client"
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from '@/interface/pelanggarInterface';
import { Img } from '../image';
import profileUser from '@/assets/profile.png';
import { ArrowRightRi } from '../icons';
import { getActivityUser } from '@/services/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { IActivityUser } from '@/interface/userInterface';

const ActivityModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [dataActivity, setDataActivity] = useState<IActivityUser[]>([])

  const token = Cookies.get('token');
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const getActivityData = async() => {
    try {
      const response = await getActivityUser(token as string, router);
      setDataActivity(response?.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getActivityData();
  }, [])

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

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error("No element with ID 'modal-root' found in the document.");
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white overflow-hidden rounded-2xl shadow-lg w-4/12 max-w-screen-xl mx-6">
        <div className="flex justify-center items-center border-b border-gray-300">
          <h2 className="text-lg text-center my-1 font-medium mx-auto">Aktivitas Operator</h2>
          <button onClick={onClose} className="absolute right-[34%] text-3xl">&times;</button>
        </div>
        <div className='w-full h-auto p-6 max-h-[400px] overflow-y-auto custom-scrollbar'>
          {dataActivity.map((activity, index) => (
            <div key={index} className='flex flex-col p-2 mb-4'>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                  {activity.user['image_profile']['image_url'] ? <Img src={`http://localhost:3001/${activity.user['image_profile']['image_url']}`} alt="Profile User" size={50} className='rounded-full' /> : <Img src={profileUser} alt="Profile User" size={50} className='rounded-full' />}
                  <p className='ml-4 font-semibold'>{activity.user['username']}</p>
                </div>
                <p className='text-sm font-medium text-neutral-600'>{activity.inferenceResult['predictions']['duration']}</p>
              </div>
              <div className='flex flex-row items-center mt-3'>
                <p className='text-sm font-medium text-neutral-600 mr-2'>Mengubah</p>
                <div className='flex flex-row w-full items-center'>
                  <div className='flex justify-start font-semibold text-lg w-full'>{activity.oldPlate}</div>
                  <div className='flex items-center justify-center w-full'><ArrowRightRi size={25} /></div>
                  <div className='flex justify-end font-semibold text-lg w-full'>{activity.newPlate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
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
    </div>,
    modalRoot 
  );
};

export default ActivityModal;
