import axiosInstance from '../utils/axiosInstance';

export const getItems = async (data:any) : Promise<string> => {
  try {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  } catch (error:any) {
    return error?.response.data;
  }

};