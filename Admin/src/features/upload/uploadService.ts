import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';
import { IImages } from '../../@types/custom-types';

const uploadImages = async (images: File[]) => {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });
    const response = await axios.post(`${base_url}/upload`, formData, config);
    return response.data;
  } catch (error) {
    throw new Error('Upload image failed.');
  }
};

const uploadService = {
  uploadImages,
};

export default uploadService;
