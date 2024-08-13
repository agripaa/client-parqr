"use client"
import * as React from "react";
import { Img } from "@/components/image";
import { PencilLine, DeleteBin, EyeOff, ArrowLeft, UserAdd } from "@/components/icons";
import ProfileImage from "@/assets/profile.png";
import ListPelanggaranLainModal from "@/components/modal/CreateOperator";
import EditOperator from "@/components/modal/EditOperator";
import { deleteUser, getAllUser } from "@/services/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { IUserProfile } from "@/interface/userInterface";
import Image from "next/image";

export default function OperatorList() {
    const [createOperatorModal, setCreateOperatorModal] = React.useState<boolean>(false);
    const [editOperatorModal, setEditOperatorModal] = React.useState<boolean>(false);
    const [editUserId, setEditUserId] = React.useState<number | null>(null);
    const [dataUsers, setDataUsers] = React.useState<IUserProfile[]>([]);

    const token = Cookies.get('token');
    const router = useRouter();

    const goBack = () => {
        window.history.back();
    }

    const handleGetUsers = async () => {
        try {
            const response = await getAllUser(token as string, router);
            setDataUsers(response);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteOperator = async (id: number) => {
        try {
            await deleteUser(token as string, id, router);
            handleGetUsers(); 
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        handleGetUsers();
    }, []);

    const openModalCreateOperator = () => setCreateOperatorModal(true);
    const closeModalCreateOperator = () => setCreateOperatorModal(false);

    const openModalEditOperator = (userId: number) => {
        setEditUserId(userId);
        setEditOperatorModal(true);
    };
    const closeModalEditOperator = () => setEditOperatorModal(false);

    return (
        <section className="flex flex-col mx-auto items-center justify-center w-full h-[92vh]">
            <div className="flex flex-row w-full justify-between mb-4 items-center">
                <div
                    onClick={goBack}
                    className="flex flex-row items-center z-20 text-sm hover:cursor-pointer"
                >
                    <ArrowLeft size={25} color="#3b82f6" className="inline-block" />
                    <p className="ml-2 pb-[1px] text-sm text-blue-500">Kembali</p>
                </div>
                <div
                    className="flex flex-row text-white rounded-lg w-[17%] font-medium justify-center border-2 border-primary-500 p-2 bg-primary-500 hover:cursor-pointer hover:bg-transparent hover:text-primary-500 duration-150"
                    onClick={openModalCreateOperator}
                >
                    <UserAdd size={25} className="inline-block" />
                    <p className="ml-2 text-base">Tambahkan Operator</p>
                </div>
            </div>
            <div className="overflow-hidden w-full rounded-2xl shadow-lg bg-white">
                <div className="p-4 rounded-t-lg">
                    <div className="flex justify-between text-sm font-medium bg-gray-100 p-3 rounded-xl text-gray-500 uppercase">
                        <div className="w-1/4 text-left">Nama Operator</div>
                        <div className="w-1/4 text-left">NIK</div>
                        <div className="w-1/4 text-left">Role</div>
                        <div className="w-1/4 text-left"></div>
                    </div>
                </div>
                <div className="space-y-4 px-6 h-[65vh] pb-4 overflow-y-auto custom-scrollbar">
                    {dataUsers.length === 0 ? (
                        <div className="text-center text-gray-500 font-medium mt-4">
                            TIDAK ADA DATA OPERATOR
                        </div>
                    ) : (
                        dataUsers.map((pelanggaran, idx) => (
                            <div
                                className="flex flex-row justify-between items-center p-2 rounded-lg"
                                key={pelanggaran.id}
                            >
                                <div className="flex items-center w-1/4 text-left">
                                    {pelanggaran.image_profile?.image_url ? (
                                        <Image src={`http://localhost:3001/${pelanggaran.image_profile.image_url}`} className="rounded-full" width={40} height={40} alt="image" />
                                    ) : (
                                        <Img src={ProfileImage} size={40} />
                                    )}
                                    <h4 className="ml-4 font-normal text-base">{pelanggaran.username}</h4>
                                </div>
                                <div className="w-1/4 text-left text-sm text-gray-900 font-medium">
                                    {pelanggaran.NIK}
                                </div>
                                <div className="w-1/4 text-left text-sm text-gray-900 font-medium">
                                    <div className="flex flex-row items-center">
                                        <p>{pelanggaran.role_id.role.toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end flex-row w-1/4 text-left text-sm text-gray-900 font-medium">
                                    <div className="flex items-center justify-start border-2 border-primary-500 p-4 w-[34%] h-2 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white hover:cursor-pointer duration-150" onClick={() => openModalEditOperator(pelanggaran.id)}>
                                        <PencilLine className="inline-block w-5 mr-2" />
                                        <p className="text-sm w-auto text-center">Edit</p>
                                    </div>
                                    <div className="flex items-center justify-start border-2 border-danger-500 p-4 w-[36%] h-2 text-danger ml-4 font-semibold rounded-lg hover:text-white hover:cursor-pointer hover:bg-danger duration-150" onClick={() => handleDeleteOperator(pelanggaran.id)}>
                                        <DeleteBin size={30} className="inline-block w-5 mr-2" />
                                        <p className="text-sm w-auto">Hapus</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <ListPelanggaranLainModal onClose={closeModalCreateOperator} isOpen={createOperatorModal} />
            <EditOperator userId={editUserId} onClose={closeModalEditOperator} isOpen={editOperatorModal} getUser={handleGetUsers} />
        </section>
    );
}
