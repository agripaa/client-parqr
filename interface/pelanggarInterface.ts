export interface IPelanggaran {
    platNomor?: string | undefined | null;
    kamera: string | undefined | null;
    jenisKendaraan?: string | undefined | null;
    tanggal: string | undefined | null;
}

export interface IListPelanggaran extends IPelanggaran {
    pukul: string;
    durasiMelanggar?: string;
}

export interface IPelanggaranLain extends IListPelanggaran {
    lokasi: string;
}

export interface Prediction {
    id: number;
    predictions: {
        cam: string;
        date: string;
        time: string;
        plate: string;
        duration: string;
        vehicle_category: string;
        location: string;
    };
}


export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: {
        namaLengkap?: string;
        nik?: string | number;
        email?: string;
        password?: string;
        platNomor?: string;
        keterangan?: string;
    };
    datas?: {
        token: string;
        id: number;
    } | any;
}

export interface EditOperatorProps extends ModalProps {
    userId: number | null;
    getUser: () => void;
}

export interface IViolatorByFeature{
    date: string;
    cam: string;
    vehicle_category: string;
    search_plate: string;
}

export interface DetailViolator {
    id: number;
    predictions: {
        cam: string;
        date: string;
        time: string;
        plate: string;
        duration: string;
        location: string;
        vehicle_category: string;
    };
    change_status: boolean;
    imageDetection: {
        id: number;
        image_url: string;
        upload_at: string;
    };
    processed_at: string;
}