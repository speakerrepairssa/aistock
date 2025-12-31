import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { storage } from './firebase';

export const storageService = {
  async uploadProductImage(file: File, productId: string): Promise<string> {
    try {
      const fileExtension = file.name.split('.').pop();
      const filename = `products/${productId}/${Date.now()}.${fileExtension}`;
      const storageRef = ref(storage, filename);

      // Upload file
      const snapshot = await uploadBytes(storageRef, file);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  async uploadOCRImage(file: File, productId: string): Promise<string> {
    try {
      const fileExtension = file.name.split('.').pop();
      const filename = `ocr/${productId}/${Date.now()}.${fileExtension}`;
      const storageRef = ref(storage, filename);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading OCR image:', error);
      throw error;
    }
  },

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      const fileRef = ref(storage, imageUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },
};
