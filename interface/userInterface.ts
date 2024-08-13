import { StaticImageData } from "next/image";

export interface IUserProfile {
    id: number;
    uuid: string;
    NIK: string | null;
    username: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    role_id: {
        id: number;
        role: string;
    };
    image_profile: {
        id: number;
        image_url: string | null;
        name_image: string | null;
    }
}

export interface IUpdateOperator {
    username: string;
    nik: string;
    password:string;
    img: StaticImageData | string 
}

export interface IActivityUser {
    id: number;
    oldPlate: string;
    newPlate: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        uuid: string;
        NIK: string | null | undefined;
        email: string | null | undefined;
        username: string;
        password: string;
        image_profile: {
            id: number;
            image_url: string | null;
            name_image: string | null;
        }
    };
    inferenceResult: {
        id: number;
        predictions: {
            cam: string;
            date: string;
            plate: string;
            duration: string;
            location: string;
            vehicle_category: string;
        }
    };
    processed_at: string;
    change_status: boolean;
}