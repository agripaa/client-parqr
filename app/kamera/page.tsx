"use client";
import { Img } from "@/components/image";
import cam1 from "@/assets/cam1.png";
import * as React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { ArrowRight, MapPin, Time } from "@/components/icons";
import PelanggarListModal from "@/components/modal/PelanggarListModal";
import Cookies from 'js-cookie';
import { getCountViolator } from "@/services/api";
import { useRouter } from "next/navigation";
import InputIpModal from "@/components/modal/InputIpModal"; // Import the new modal component

function Home() {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isIpModalOpen, setIpModalOpen] = React.useState(false); // State for the IP input modal
  const [cameraURL, setCameraURL] = React.useState("http://192.168.10.60:81/stream");
  const [cameraDetected, setCameraDetected] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState<string>('');
  const [isCamera2Disabled, setCamera2Disabled] = React.useState(true);
  const [countViolators, setCountViolators] = React.useState<number | null>(null);
  const [dataViolators, setDataViolators] = React.useState(null)
  const router = useRouter();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openIpModal = () => setIpModalOpen(true);
  const closeIpModal = () => setIpModalOpen(false);

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      setCurrentTime(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  React.useEffect(() => {
    const fetchCountViolators = async () => {
      try {
        const token = Cookies.get('token'); 
        if (token) {
          const response = await getCountViolator(token, router);
          setCountViolators(response.data_length.length_violatiors_data);
          setDataViolators(response.data)
        }
      } catch (error) {
        console.error('Failed to fetch violators count', error);
      }
    };

    fetchCountViolators();
  }, []);

  const checkCamera = async (url: string) => {
    try {
      const response = await fetch(url, { mode: 'no-cors' });
      console.log(response)
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  React.useEffect(() => {
    const verifyCamera = async () => {
      const detected = await checkCamera(cameraURL);
      if (!detected) {
        setCameraDetected(false);
        openIpModal(); // Open the IP input modal if the camera is not detected
      } else {
        setCameraDetected(true);
      }
    };

    verifyCamera();
  }, [cameraURL]);

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

  console.log(`CAM URL : ${cameraURL}`)
  return (
    <section className="flex flex-col items-center justify-between h-[92vh] gap-3 md:py-2">
      <div className="flex-grow w-full flex justify-center items-center p-1">
        {cameraDetected ? (
          <img
            src={cameraURL as string}
            alt="cam1"
            className="m-0 p-0 w-9/12 h-5/12"
          />
        ) : (
          <Img src={cam1} alt="Default Cam" className="m-0 p-0 w-9/12 h-5/12" />
        )}
      </div>
      <div className="flex flex-row w-full gap-3 justify-between px-4">
        <div className="w-full h-auto p-4">
          <h5 className="font-semibold text-lg">Pilih Kamera</h5>
          <form action="" method="get">
            <RadioGroup
              orientation="horizontal"
              defaultValue="cam1"
              className="mt-3"
              onChange={(event) => {
                const selectedCamera = event.target.value as string;
                setCameraURL(selectedCamera === 'cam1' ? cameraURL : "http://192.168.1.13:81/stream");
              }}
            >
              <Radio value="cam1" className="mr-1">Kamera 1</Radio>
              <Radio value="cam2" className="mr-1 hover:cursor-not-allowed" disabled={isCamera2Disabled}>Kamera 2</Radio>
            </RadioGroup>
          </form>
        </div>
        <div className="flex flex-col w-full p-4 items-center">
          <div className="justify-center">
            <div className="flex flex-row w-full mt-2">
              <div className="mr-2">
                <MapPin color="#3b82f6" className="justify-center" />
              </div>
              <p className="font-semibold">
                Jalan Raya Margonda Raya, Depok
              </p>
            </div>
            <div className="flex flex-row w-full mt-2">
              <div className="mr-2">
                <Time color="#3b82f6" className="justify-center" />
              </div>
              <p className="font-semibold">
                {currentTime} WIB
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full h-auto mt-4 justify-end">
          <div className="relative w-8/12 p-2 pl-4 bg-blue-500 h-18 rounded-2xl text-white flex items-center justify-between cursor-pointer" onClick={openModal}>
            <div className="flex flex-col space-y-1 mr-4"> 
              <span className="font-semibold text-[17px]">{getFormattedDate()}</span>
              <span className="text-sm">Pelanggaran hari ini: {countViolators}</span>
            </div>
            <div>
              <ArrowRight className="justify-center" color="#FAFAFA" width={30} height={30}/>
            </div>
          </div>
        </div>
      </div>
      <PelanggarListModal isOpen={isModalOpen} onClose={closeModal} />
      <InputIpModal isOpen={isIpModalOpen} onClose={closeIpModal} setCameraURL={setCameraURL} /> {/* Add the new modal here */}
    </section>
  );
}

export default Home;
