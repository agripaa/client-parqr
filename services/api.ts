import { IOperatorLogin, IOwnerLogin } from '@/interface/login.interface';
import axios from 'axios';
import Cookies from 'js-cookie';
import { IViolatorByFeature } from '@/interface/pelanggarInterface';
import { IUpdateOperator } from '@/interface/userInterface';

const api = axios.create({
  baseURL: 'http://103.117.56.84:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error: any, router: any) => {
  if (error.response.status === 401) {
    Cookies.remove('token');
    router.push('/');
    console.error(error);
  } else {
    console.error('API Error:', error);
  }
};

const getFormattedDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const loginOperator = async ({ NIK, password }: IOperatorLogin, router: any) => {
  try {
    const response = await api.post('/auth/operator/login', { NIK, password });
    return response['data'];
  } catch (error) {
    handleApiError(error, router);
    return error
  }
};

export const loginOwner = async ({ email, password }: IOwnerLogin, router: any) => {
  try {
    const response = await api.post('/auth/owner/login', { email, password });
    return response['data'];  
  } catch (error) {
    return error
  }
};

export const getCountViolator = async (token: string, router: any) => {
  try {
    const today = getFormattedDate();
    const response = await api.get(`/inference-result/by-date/count?date=${today}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response['data'];
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
};

export const getViolatorByDate = async (token: string, router: any) => {
  try {
    const today = getFormattedDate();
    const response = await api.get(`/inference-result/by-date?date=${today}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
};

export const getViolatorByFeature = async (
  token: string, 
  { 
    date, 
    cam, 
    vehicle_category, 
    search_plate 
  }: IViolatorByFeature, 
  router: any
) => {
  try {
    const response = await api.get(`/inference-result/by-feature?date=${date}&cam=${cam}&vehicle_category=${vehicle_category}&search_plate=${search_plate}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response; 
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
};

export const getViolatorByPlate = async (
  token: string, 
  plate: string, 
  id: number, 
  router: any
) => {
  try {
    const response = await api.get(`/inference-result/detail-violators?plate=${plate}&id=${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response; 
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
};

export const verifyOwner = async (token: string, otp: string, router:any) => {
  try {
    const response = await api.patch(`/otp/verify_user`, {otp} ,{
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response; 
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
}

export const getAnyViolatorByPlate = async (token: string, plate: string, router: any) => {
  try {
    const response = await api.get(`/inference-result/by-plate?plate=${plate}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response['data']; 
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
} 

export const updatePlateViolator = async (
  token: string, 
  oldPlate: string, 
  newPlate: string, 
  id: number, 
  router: any
) =>  {
  try {
    const response = await api.patch('/inference-result/update-plate', { id, "old-plate": oldPlate, "new-plate": newPlate },{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response['data'];
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
}

export const getProfileUser = async (token:string, router: any) => {
  try {
    const response = await api.get('/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response['data'];
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
}

export const updateOtpCode = async (token: string, router: any) => {
  try {
    const response = await api.post('/otp/resend_token', {},{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
}

export const getAllUser = async (token: string, router: any) => {
  try {
    const response = await api.get('/users/find', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response['data'];
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
}

export const getoneUser = async (token: string, id: number, router: any) => {
  try {
    const response = await api.get(`/users/find/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response['data'];
  } catch (error) {
    handleApiError(error, router);
    console.error('error : ', error);
  }
}

export const updateUser = async (token: string, id: number, formData: FormData, router: any) => {
  try {
    const response = await api.patch(`/users/update-operator/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, router);
    console.error(error);
  }
};

export const deleteUser = async (token:string, id:number, router: any) => {
  try {
    const response = await api.delete(`/users/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    handleApiError(error, router);
    console.error(error);
  }
}

export const getActivityUser = async (token: string, router:any) => {
  try {
    const response = await api.get('/activity-user/get-all', {
      headers: {
        'Authorization':  `Bearer ${token}`
      }
    })
    return response['data'];
  } catch (error) {
    handleApiError(error, router);
    console.error(error);
  }
}

export const createOperator = async (token: string, formData: FormData, router: any) => {
  try {
    const response = await api.post('/auth/operator/register', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    });
    return response['data']
  } catch (error) {
    handleApiError(error, router);
    console.error(error);
  }
}
