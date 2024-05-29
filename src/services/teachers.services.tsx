import axiosInstance from '../utils/axiosInstance';

export const getFindAll = async () : Promise<string> => {
  try {
    const response = await axiosInstance.get('/teacher');
    return response.data;
  } catch (error:any) {
    return error?.response.data;
  }

};

export const Remove = async (id:number) : Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/teacher/${id}`);
    return response.data;
  } catch (error:any) {
    return error?.response.data;
  }

};