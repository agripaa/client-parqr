import React, { useRef } from 'react';
import { ModalProps } from '@/interface/pelanggarInterface';
import { CheckboxIcon } from '../icons';

const SuccessSubmitFormModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    return (
        isOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center text-gray-900 bg-black bg-opacity-50">
                <div ref={modalRef} className="bg-white overflow-hidden rounded-2xl shadow-lg w-3/12 max-w-screen-xl mx-6">
                    <div className="mb-4 p-2 flex justify-between items-center border-b border-gray-300">
                        <h2 className="text-lg font-medium mx-auto">Laporan</h2>
                    </div>
                    <div className='bg-white m-6 items-center justify-center'>
                        <div className='flex w-full justify-center items-center mb-3'>
                            <CheckboxIcon size={100} color='#17C964' />
                        </div>
                        <div className='flex flex-col w-full'>
                            <h4 className='text-xl font-[650]'>Laporanmu berhasil kami terima</h4>
                            <p className='text-base mt-1 mb-2'>Laporan sangat membantu kami memantau parkir liar yang terjadi di masyarakat</p>
                            <button onClick={onClose} className="w-full mt-3 p-2 py-4 shadow-md bg-blue-500 shadow-blue-500 text-white rounded-xl hover:bg-blue-600">
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default SuccessSubmitFormModal;
