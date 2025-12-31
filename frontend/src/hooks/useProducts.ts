import { useProductStore } from '../store/productStore';

export const useProducts = () => {
  return {
    products: useProductStore((state) => state.products),
    loading: useProductStore((state) => state.loading),
    error: useProductStore((state) => state.error),
    stats: useProductStore((state) => state.stats),
    fetchProducts: useProductStore((state) => state.fetchProducts),
    searchProducts: useProductStore((state) => state.searchProducts),
    addProduct: useProductStore((state) => state.addProduct),
    updateProduct: useProductStore((state) => state.updateProduct),
    deleteProduct: useProductStore((state) => state.deleteProduct),
    updateProductQuantity: useProductStore((state) => state.updateProductQuantity),
    generateBarcodesForAll: useProductStore((state) => state.generateBarcodesForAll),
    fetchStats: useProductStore((state) => state.fetchStats),
  };
};
