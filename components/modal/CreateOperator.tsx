import React, { useEffect, useRef, useState } from 'react';
import { ModalProps } from '@/interface/pelanggarInterface';
import noProfile from "@/assets/no profile.png";
import { Img } from '../image';
import { UploadImage } from '../icons';
import Image, { StaticImageData } from 'next/image';
import PreviewOperatorList from './PreviewOperatorList';
import { createOperator } from '@/services/api';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const ListPelanggaranLainModal: React.FC<ModalProps> = ({ isOpen, onClose, initialData = {} }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [dataForm, setFormData] = useState({
        namaLengkap: initialData.namaLengkap || '',
        nik: initialData.nik || '',
        password: initialData.password || ''
    });
    const [preview, setPreview] = useState<string | StaticImageData>(noProfile);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [operatorList, setOperatorList] = useState<boolean>(false);
    const token = Cookies.get('token');
    const router = useRouter();

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    const openOperatorList = () => setOperatorList(true);
    const closeOperatorList = () => setOperatorList(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...dataForm, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isFormValid) {
                const formData = new FormData();
                formData.append('username', dataForm.namaLengkap);
                formData.append('password', dataForm.password);
                formData.append('NIK', dataForm.nik as string);

                if (fileInputRef.current?.files?.[0]) {
                    formData.append('image', fileInputRef.current.files[0]);
                }

                console.log({ image_data: fileInputRef.current?.files?.[0] });

                await createOperator(token as string, formData, router);
                alert('Data created');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        setIsFormValid(
            dataForm.namaLengkap.trim() !== '' &&
            dataForm.nik !== '' &&
            dataForm.password.trim() !== ''
        );
    }, [dataForm]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        setOperatorList(false);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={modalRef} className="bg-white overflow-hidden rounded-2xl shadow-lg w-[30%] max-w-screen-xl mx-6">
                <div className="flex mb-5 justify-center items-center border-b border-gray-300">
                    <h2 className="text-lg text-center my-1 font-medium mx-auto">Operator Baru</h2>
                    <button onClick={onClose} className="absolute right-[36%] text-3xl">&times;</button>
                </div>
                <div className='flex flex-col w-full px-8 mb-4'>
                    <div className='flex flex-row mb-4 items-center'>
                        <Img src={preview} alt="Uploaded picture" className='rounded-full w-16 h-16 bg-gray-400 justify-center items-center' width={64} height={64} />
                        <div 
                            onClick={handleUploadClick} 
                            className='flex flex-row p-2 ml-8 rounded-lg items-center border-2 border-primary-500 text-primary-500 cursor-pointer'
                        >
                            <UploadImage color='#3B82F6' size={20} />
                            <p className='ml-4 text-sm font-normal'>Upload Foto</p>
                        </div>
                        <input 
                            type="file" 
                            accept="image/*" 
                            ref={fileInputRef} 
                            onChange={handleImageChange} 
                            className="hidden"
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="namaLengkap" className="block text-start text-sm font-bold text-gray-900">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                name="namaLengkap"
                                id="namaLengkap"
                                value={dataForm.namaLengkap}
                                placeholder='Masukkan nama operator'
                                onChange={handleChange}
                                className="mt-2 p-3 block w-full bg-gray-100 border border-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nik" className="block text-start text-sm font-bold text-gray-900">
                                Nomor Induk Karyawan
                            </label>
                            <input
                                type="text"
                                name="nik"
                                id="nik"
                                value={dataForm.nik}
                                placeholder='Masukkan Nomor Induk Karyawan'
                                onChange={handleChange}
                                className="mt-2 p-3 block w-full bg-gray-100 border border-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-start text-sm font-bold text-gray-900">
                                Password
                            </label>
                            <input
                                name="password"
                                id="password"
                                value={dataForm.password}
                                placeholder='Masukkan password operator'
                                onChange={handleChange}
                                className="mt-2 p-3 block w-full bg-gray-100 border border-gray-100 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-4 rounded-xl text-md shadow-md shadow-blue-500 bg-blue-500 text-white ${isFormValid ? 'opacity-100 hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'}`}
                            disabled={!isFormValid}
                        >
                            Kirim
                        </button>
                    </form> 
                    <div className='my-4 mt-8 text-center font-medium text-primary-500 cursor-pointer hover:text-primary-600' onClick={openOperatorList}>
                        <p>Tambahkan Melalui File Excel</p>
                    </div>
                </div>
            </div>
            {operatorList && (
                <PreviewOperatorList isOpen={operatorList} onClose={closeOperatorList} />
            )}
        </div>
    );
};

export default ListPelanggaranLainModal;
