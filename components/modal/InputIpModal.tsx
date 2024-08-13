import React, { useEffect, useRef, useState } from 'react';
import { ModalProps } from '@/interface/pelanggarInterface';

interface InputIpModalProps extends ModalProps {
    setCameraURL: (url: string) => void;
}

const InputIpModal: React.FC<InputIpModalProps> = ({ isOpen, onClose, setCameraURL }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [ipAddress, setIpAddress] = useState('');

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

    const handleConfirm = () => {
        setCameraURL(`http://${ipAddress}:81/stream`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white overflow-hidden rounded-lg shadow-lg w-[28%] max-w-screen-xl mx-6">
                <div className="flex mb-2 justify-start items-center p-2">
                    <h2 className="text-lg text-start my-1 font-medium mx-4">Input IP Kamera</h2>
                    <button onClick={onClose} className="absolute right-[37%] text-2xl">&times;</button>
                </div>
                <div className="flex flex-col px-6 mb-4 w-full text-start">
                    <label className="text-sm mb-2">Masukkan IP Kamera:</label>
                    <input
                        type="text"
                        className="border border-gray-300 rounded p-2 mb-4"
                        value={ipAddress}
                        onChange={(e) => setIpAddress(e.target.value)}
                        placeholder="192.168.x.x"
                    />
                    <div className="flex flex-row justify-end p-2 mt-2">
                        <button
                            className="border border-neutral-100 bg-neutral-100 px-4 rounded-xl font-medium p-2"
                            onClick={onClose} // Close the modal without action
                        >
                            Batal
                        </button>
                        <button
                            className="border border-primary-500 bg-primary-500 text-neutral-50 px-4 rounded-xl font-medium p-2 ml-4"
                            onClick={handleConfirm} // Confirm and set the new camera URL
                        >
                            Ubah Kamera
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InputIpModal;
