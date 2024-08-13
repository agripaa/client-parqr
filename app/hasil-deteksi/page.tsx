"use client";
import { RiSearch2Line, RiArrowRightSLine } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { Prediction } from "@/interface/pelanggarInterface";
import { MotorCycleIcon, CarIcon, TruckIcon } from "@/components/icons";
import Cookies from "js-cookie";
import { getViolatorByFeature } from "@/services/api";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedKamera, setSelectedKamera] = useState<string>("");
  const [showKameraDropdown, setShowKameraDropdown] = useState<boolean>(false);
  const [selectedKendaraan, setSelectedKendaraan] = useState<string>("");
  const [showKendaraanDropdown, setShowKendaraanDropdown] = useState<boolean>(false);
  const [searchPlate, setSearchPlate] = useState<string>("");
  const [getDataFeatures, setGetDataFeatures] = useState<Prediction[]>([]);
  const router = useRouter();

  const kameraDropdownRef = useRef<HTMLDivElement>(null);
  const kendaraanDropdownRef = useRef<HTMLDivElement>(null);

  const handleKameraSelect = (value: string) => {
    setSelectedKamera(value);
    setShowKameraDropdown(false);
    fetchData(value, selectedDate, selectedKendaraan, searchPlate);
  };

  const handleKendaraanSelect = (value: string) => {
    setSelectedKendaraan(value);
    setShowKendaraanDropdown(false);
    fetchData(selectedKamera, selectedDate, value, searchPlate);
  };

  const toggleKameraDropdown = () => {
    setShowKameraDropdown((prev) => {
      if (!prev) {
        setShowKendaraanDropdown(false);
      }
      return !prev;
    });
  };

  const toggleKendaraanDropdown = () => {
    setShowKendaraanDropdown((prev) => {
      if (!prev) {
        setShowKameraDropdown(false);
      }
      return !prev;
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      kameraDropdownRef.current &&
      !kameraDropdownRef.current.contains(event.target as Node)
    ) {
      setShowKameraDropdown(false);
    }
    if (
      kendaraanDropdownRef.current &&
      !kendaraanDropdownRef.current.contains(event.target as Node)
    ) {
      setShowKendaraanDropdown(false);
    }
  };

  const fetchData = async (dataCam: string, dataDate: string, dataKendaraan: string, dataSearch: string) => {
    try {
      const token = Cookies.get('token');
      if (token) {
        const response = await getViolatorByFeature(token, {
          cam: dataCam,
          date: dataDate,
          vehicle_category: dataKendaraan,
          search_plate: dataSearch,
        }, router);

        console.log(response?.data)
        if (response?.data) {
          setGetDataFeatures(response.data);
        } else {
          setGetDataFeatures([]); 
        }
      }
    } catch (error) {
      console.error('Failed to fetch violators count', error);
      setGetDataFeatures([]); 
    }
  };

  useEffect(() => {
    fetchData(selectedKamera, selectedDate, selectedKendaraan, searchPlate);
  }, [selectedDate, searchPlate]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center space-x-4 mb-4">
        <div className="flex items-center justify-center space-x-2 hover:cursor-pointer font-semibold relative">
          <input
            type="date"
            className="bg-gray-100 p-2 rounded-md w-11/12"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              fetchData(selectedKamera, e.target.value, selectedKendaraan, searchPlate);
            }}
          />
        </div>
        <div className="flex items-center space-x-2 relative w-38" ref={kameraDropdownRef}>
          <div
            className="bg-gray-100 rounded-md p-2 w-full flex justify-between items-center font-semibold cursor-pointer"
            onClick={toggleKameraDropdown}
          >
            <span>{selectedKamera || "Kamera"}</span>
            <FaChevronDown className="text-gray-500 ml-4 text-sm" />
          </div>
          {showKameraDropdown && (
            <div className="absolute top-full left-0 bg-white text-start p-2 shadow-md rounded-md mt-1 w-[128px] z-10">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleKameraSelect("Kamera 1")}
              >
                Kamera 1
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleKameraSelect("Kamera 2")}
              >
                Kamera 2
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 relative w-42" ref={kendaraanDropdownRef}>
          <div
            className="bg-gray-100 rounded-md p-2 w-full flex text-md justify-between font-semibold items-center cursor-pointer"
            onClick={toggleKendaraanDropdown}
          >
            <span>{selectedKendaraan.toLocaleUpperCase() || "Jenis Kendaraan"}</span>
            <FaChevronDown className="text-gray-500 ml-4 text-sm" />
          </div>
          {showKendaraanDropdown && (
            <div className="absolute top-full left-0 bg-white shadow-md p-2 rounded-md mt-1 w-full z-10 text-start">
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleKendaraanSelect("car")}
              >
                Mobil
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleKendaraanSelect("bike")}
              >
                Motor
              </div>
              <div
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleKendaraanSelect("truck")}
              >
                Truk
              </div>
            </div>
          )}
        </div>
        <div className="flex-grow" />
        <div className="flex items-center w-auto">
          <div className="flex items-center bg-gray-100 px-2 rounded-md">
            <RiSearch2Line className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent p-2 border-none focus:ring-0 focus:border-0"
              value={searchPlate}
              onChange={(e) => {
                setSearchPlate(e.target.value);
                console.log("Search Plate: ", e.target.value);
                fetchData(selectedKamera, selectedDate, selectedKendaraan, e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl shadow-lg bg-white">
        <div className="p-4 rounded-t-lg">
          <div className="flex justify-between text-sm font-medium bg-gray-100 p-3 rounded-xl text-gray-500 uppercase">
            <div className="w-1/4 text-left">Plat Nomor</div>
            <div className="w-1/4 text-left">Kamera</div>
            <div className="w-1/4 text-left">Jenis Kendaraan</div>
            <div className="w-1/4 text-left">Tanggal</div>
          </div>
        </div>
        <div className="space-y-4 px-6 h-[65vh] pb-4 overflow-y-auto custom-scrollbar">
          {Array.isArray(getDataFeatures) && getDataFeatures.length !== 0 ? (
            getDataFeatures.map((pelanggaran, idx) => {
              return (
                <a
                  key={idx}
                  href={`/pelanggar/${pelanggaran.predictions.plate}/${pelanggaran.id}`}
                  className="flex flex-col md:flex-row justify-between items-center p-2 hover:cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center w-1/4 text-left">
                    {pelanggaran.predictions.vehicle_category === "car" && (
                      <CarIcon size={20} color="#3b82f6" className="inline-block mr-2" />
                    )}
                    {pelanggaran.predictions.vehicle_category === "bike" && (
                      <MotorCycleIcon size={20} color="#3b82f6" className="inline-block mr-2" />
                    )}
                    {pelanggaran.predictions.vehicle_category === "truck" && (
                      <TruckIcon size={20} color="#3b82f6" className="inline-block mr-2" />
                    )}
                    <div className="text-sm font-medium text-gray-900">
                      {pelanggaran.predictions.plate}
                    </div>
                  </div>
                  <div className="w-1/4 text-left text-sm pl-1 text-gray-900 font-medium">
                    {pelanggaran.predictions.cam}
                  </div>
                  <div className="w-1/4 text-left text-sm pl-4 text-gray-900 font-medium">
                    {pelanggaran.predictions.vehicle_category.toUpperCase()}
                  </div>
                  <div className="w-1/4 text-left text-sm pl-4 text-gray-900 font-medium">
                    {pelanggaran.predictions.date}
                  </div>
                  <div className="text-gray-900 font-medium text-xl relative m-0 p-0">
                    <RiArrowRightSLine />
                  </div>
                </a>
              );
            })
          ) : (
            <div className="text-center">DATA TIDAK DITEMUKAN!</div>
          )}
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 1px;
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
    </div>
  );
}
