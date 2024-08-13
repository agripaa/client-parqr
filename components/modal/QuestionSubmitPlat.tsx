import React, { useEffect, useRef } from 'react';
import { ModalProps } from '@/interface/pelanggarInterface';

interface QuestionSubmitPlatProps extends ModalProps {
    onBack: () => void;
    onConfirm: () => void;
}

const QuestionSubmitPlat: React.FC<QuestionSubmitPlatProps> = ({ isOpen, onClose, onBack, onConfirm }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

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
            <div ref={modalRef} className="bg-white overflow-hidden rounded-lg shadow-lg w-[28%] max-w-screen-xl mx-6">
                <div className="flex mb-2 justify-start items-center p-2">
                    <h2 className="text-lg text-start my-1 font-medium mx-4">Ubah Plat Nomor</h2>
                    <button onClick={onClose} className="absolute right-[37%] text-2xl">&times;</button>
                </div>
                <div className='flex flex-col px-6 mb-4 w-full text-start'>
                    <p>Apakah anda yakin? Anda tidak dapat merubah plat nomor setelah ini.</p>
                    <div className='flex flex-row justify-end p-2 mt-2'>
                        <button
                            className='border border-neutral-100 bg-neutral-100 px-4 rounded-xl font-medium p-2'
                            onClick={onBack}  // Call onBack when "Tidak" is clicked
                        >
                            Tidak
                        </button>
                        <button
                            className='border border-primary-500 bg-primary-500 text-neutral-50 px-4 rounded-xl font-medium p-2 ml-4'
                            onClick={onConfirm}  // Call onConfirm when "Ya" is clicked
                        >
                            Ya
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionSubmitPlat;
