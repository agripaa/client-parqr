import React, { useEffect, useRef, useState } from 'react';
import { ModalProps } from '@/interface/pelanggarInterface';
import QuestionSubmitPlat from './QuestionSubmitPlat';
import { Img } from '../image';
import { updatePlateViolator } from '@/services/api';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const FormEditPlatNomor: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    initialData = { platNomor: "" }, 
    datas = { id: 0, img_string: "" } 
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        platNomor: initialData.platNomor || ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const router = useRouter();
    const token = Cookies.get('token');

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

    useEffect(() => {
        setIsFormValid(formData.platNomor.trim() !== '');
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            setIsConfirmModalOpen(true);  // Open the confirmation modal
        }
    };

    const handleBackToEditForm = () => {
        setIsConfirmModalOpen(false);  // Close the confirmation modal
    };

    const handleConfirmSubmit = async () => {
        try {
            const response = await updatePlateViolator(token as string, initialData.platNomor || '', formData.platNomor, datas.id, router);
            if (response) {
                setIsConfirmModalOpen(false);
                router.push(`/pelanggar/${formData.platNomor}/${datas.id}`)
                onClose();
            }
        } catch (error) {
            console.error('Error updating plate number:', error);
        }
    };

    if (!isOpen && !isConfirmModalOpen) return null;

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div ref={modalRef} className="bg-white overflow-hidden rounded-2xl shadow-lg w-3/12 max-w-screen-xl mx-6">
                        <div className="flex mb-5 justify-center items-center border-b border-gray-300 p-1">
                            <h2 className="text-lg text-center my-1 font-medium mx-auto">Ubah Plat Nomor</h2>
                            <button onClick={onClose} className="absolute right-[38.5%] text-3xl">&times;</button>
                        </div>
                        <div className='bg-white m-6'>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="infoPlat" className='block text-start text-sm font-bold text-gray-900'>
                                    Cek Plat Nomor Pada Gambar Di Bawah
                                </label>
                                <div className='flex items-center justify-center mt-3'>
                                    <div className="flex flex-col items-center justify-center mb-4">
                                        <Img src={datas.img_string || ''} alt='Plat Nomor Image' width={400} height={100} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="platNomor" className="block text-start text-sm font-bold text-gray-900">
                                        Plat Nomor
                                    </label>
                                    <input
                                        type="text"
                                        name="platNomor"
                                        id="platNomor"
                                        value={formData.platNomor}
                                        placeholder={initialData.platNomor || ''}
                                        onChange={handleChange}
                                        className="mt-2 p-3 block w-full bg-gray-100 border border-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full py-3 rounded-xl text-md shadow-md shadow-blue-500 bg-blue-500 text-white ${isFormValid ? 'opacity-100 hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'}`}
                                    disabled={!isFormValid}
                                >
                                    Kirim
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {isConfirmModalOpen && (
                <QuestionSubmitPlat
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onBack={handleBackToEditForm}  // Use the handleBackToEditForm function to handle "Tidak" click
                    onConfirm={handleConfirmSubmit}  // Call handleConfirmSubmit when the user confirms
                />
            )}
        </>
    );
}

export default FormEditPlatNomor;
