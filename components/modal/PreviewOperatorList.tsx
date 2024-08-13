import React, { useEffect, useRef } from 'react';
import { dataListPelanggaranLain } from "@/data/pelanggarData";
import { RiArrowRightSLine } from "react-icons/ri";
import { EyeOff } from '../icons';
import { Img } from '../image';
import ProfileImage from '@/assets/profile.png';
import { ModalProps } from '@/interface/pelanggarInterface';

const PreviewOperatorList: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
            <div ref={modalRef} className="bg-white overflow-hidden rounded-2xl shadow-lg w-5/12 max-w-screen-xl mx-6">
                <div className="flex mb-5 justify-center items-center border-b border-gray-300">
                    <h2 className="text-lg text-center my-1 font-medium mx-auto">Preview</h2>
                    <button onClick={onClose} className="absolute right-[18%] text-3xl">&times;</button>
                </div>
                <div className='bg-white rounded-2xl shadow-lg m-6'>
                    <div className="flex justify-between text-sm font-medium mx-6 bg-gray-200 p-3 rounded-xl text-gray-500 uppercase">
                        <div className="w-2/4 text-left">Nama Operator</div>
                        <div className="w-1/4 text-left">NIK</div>
                        <div className="w-1/4 text-left">Password</div>
                    </div>
                    <div className="space-y-4 mx-2 my-4 px-6 h-[50vh] pb-4 overflow-y-auto custom-scrollbar">
                        {dataListPelanggaranLain.map((pelanggaran, idx) => (
                            <a
                                key={idx}
                                href={`/pelanggar/${pelanggaran.platNomor}`}
                                className="flex flex-col md:flex-row justify-between items-center p-2 hover:cursor-pointer hover:bg-gray-50"
                            >
                                <div className="flex items-center w-2/4 text-left text-sm font-medium text-gray-900">
                                    <Img src={ProfileImage} size={40} />
                                    <h4 className="ml-4 font-normal text-base">Raekwon Afumba</h4>
                                </div>
                                    <div className="w-1/4 text-left text-sm pl-1 text-gray-900 font-medium">
                                        71228641
                                    </div>
                                <div className="w-1/4 text-left text-sm pl-3 text-gray-900 font-medium">
                                    <div className="flex flex-row items-center">
                                        <p>********</p>
                                        <EyeOff size={20} className="ml-2 text-base" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className='flex flex-row items-center justify-center p-4'>
                       <button className='w-full bg-primary-500 text-neutral-50 p-4 rounded-md font-semibold shadow-md shadow-primary-500 hover:bg-primary-600 duration-150'>Tambahkan Operator</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewOperatorList;
