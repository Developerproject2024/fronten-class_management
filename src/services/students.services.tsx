import axiosInstance from '../utils/axiosInstance';
const ENPOINT = '/students'

export const getFindAll = async () : Promise<string> => {
  try {
    const response = await axiosInstance.get(ENPOINT);
    return response.data;
  } catch (error:any) {
    return error?.response.data;
  }

};

export const Remove = async (id:number) : Promise<string> => {
  try {
    const response = await axiosInstance.delete(`${ENPOINT}/${id}`);
    return response.data;
  } catch (error:any) {
    return error?.response.data;
  }

};

export const create = async (data:any) => {
  try {
    const response = await axiosInstance.post(ENPOINT, {...data});
    return response.data;
  } catch (error:any) {
    return error?.response.data;
  }

};

export const update = async (data:any) => {
  try {
    const id = data.id
    delete data.id;
    const response = await axiosInstance.patch(`${ENPOINT}/${id}`, {...data});
    return response.data;
  } catch (error:any) {
    return error?.response.data;
  }

};