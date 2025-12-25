const CLOUDINARY_CLOUD_NAME = 'danlcozjk';
const UPLOAD_PRESET = 'aistock_products';

export const cloudinaryService = {
  async uploadProductImage(file: File, productId: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('public_id', `aistock/products/${productId}/${Date.now()}`);
      formData.append('resource_type', 'auto');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  },

  async deleteProductImage(imageUrl: string): Promise<void> {
    // Cloudinary free tier doesn't support delete via URL
    // You would need signed uploads for this
    // For now, just log the deletion intent
    console.log('Image deletion scheduled for:', imageUrl);
  },
};
