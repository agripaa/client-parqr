"use client";
import * as React from "react";
import { Img } from "@/components/image";
import { useParams } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import { useRouter } from "next/navigation";
import { DetailViolator } from "@/interface/pelanggarInterface";
import { getViolatorByPlate } from "@/services/api";
import FormEditPlatNomor from "@/components/modal/FormEditPlatNomor";
import ListPelanggaranLainModal from "@/components/modal/ListPelanggaranLainModal";
import Cookies from "js-cookie";

export default function Pelanggar() {
  const [isModalPelanggaranOpen, setModalPelanggaranOpen] = React.useState(false);
  const [isModalReportOpen, setModalReportOpen] = React.useState(false);
  const [detailPelanggar, setDetailPelanggar] = React.useState<DetailViolator>();

  const params = useParams();
  const plat = decodeURIComponent(params.plat as string);
  const id = typeof params.id === 'string' ? parseInt(params.id, 10) : undefined; // Convert id to number

  const router = useRouter();

  const openModalPelanggaran = () => setModalPelanggaranOpen(true);
  const closeModalPelanggaran = () => setModalPelanggaranOpen(false);

  const openModalReport = () => setModalReportOpen(true);
  const closeModalReport = () => setModalReportOpen(false);
  const token = Cookies.get('token');

  React.useEffect(() => {
    const detailViolator = async () => {
      try {
        if (token && plat && id !== undefined) {
          const response = await getViolatorByPlate(token, plat, id, router);
          setDetailPelanggar(response?.data);
        } else {
          console.error('Plate or ID is undefined');
        }
      } catch (error) {
        console.error('Failed to fetch violators count', error);
      }
    }
  
    detailViolator();
  }, [plat, id]);
  
  const goBack = () => {
    window.history.back();
  };

  const formattedTime = detailPelanggar?.predictions.time.slice(0, 8); 

  return (
    <div className="flex justify-center items-center w-full h-[90vh] p-6">
      <div className="flex w-full h-full items-center">
        <Img
          src={detailPelanggar?.imageDetection.image_url as string}
          alt="Violation Image"
          className="w-6/12 h-auto object-cover p-4 rounded-xl mr-4"
          height={100}
          width={250}
        />
        <div
          onClick={goBack}
          className="flex flex-row items-center absolute z-20 left-[8%] top-[19%] text-sm hover:cursor-pointer"
        >
          <ArrowLeft size={25} color="#3b82f6" className="inline-block" />
          <p className="ml-2 pb-[1px] text-sm text-blue-500">Kembali</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg text-left h-auto w-[50%] p-4 relative">
          <h3 className="text-3xl font-bold mb-6">{detailPelanggar?.predictions.plate || "Loading..."}</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-md mb-2 font-bold">Tanggal</p>
            <p className="text-md mb-2 font-semibold">{detailPelanggar?.predictions.date || "Loading..."}</p>

            <p className="text-md mb-2 font-bold">Pukul</p>
            <p className="text-md mb-2 font-semibold">{formattedTime || "Loading..."}</p>

            <p className="text-md mb-2 font-bold col-span-1">Durasi Melanggar</p>
            <p className="text-md mb-2 font-semibold col-span-1">{detailPelanggar?.predictions.duration || "Loading..."}</p>

            <p className="text-md mb-2 font-bold">Kategori Kendaraan</p>
            <p className="text-md mb-2 font-semibold">{detailPelanggar?.predictions.vehicle_category.toUpperCase() || "Loading..."}</p>

            <p className="text-md mb-2 font-bold col-span-1">Lokasi</p>
            <p className="text-md mb-2 font-semibold col-span-1">{detailPelanggar?.predictions.location || "Loading..."}</p>
          </div>
          <button
            className="bg-blue-500 text-white py-3 rounded-xl text-md hover:bg-blue-600 w-full font-semibold"
            onClick={openModalPelanggaran}
          >
            Lihat Pelanggaran Lainnya
          </button>
          {detailPelanggar?.change_status === false ? (
            <div onClick={openModalReport} className="flex items-center justify-center text-center mt-4 rounded-xl p-2">
              <p>Ada Kesalahan Data? <a className="text-primary-500 hover:text-primary-600 hover:cursor-pointer">Ubah Data</a></p>
            </div>
          ) : ""}
          
        </div>
      </div>

      <ListPelanggaranLainModal 
        isOpen={isModalPelanggaranOpen}
        onClose={closeModalPelanggaran} 
        datas={{ token, plate: plat }}  
      />

      <FormEditPlatNomor 
        isOpen={isModalReportOpen}
        onClose={closeModalReport} 
        initialData={{ platNomor: detailPelanggar?.predictions['plate'] }} 
        datas={{ 
          token, 
          id: detailPelanggar?.['id'], 
          img_string: detailPelanggar?.imageDetection['image_url'] 
        }} 
      />
    </div>
  );
}
