import { api } from './axios';
import type { User } from '../stores/useAuthStore';

// --- AUTHENTICATION ---

// 1. Define what DummyJSON sends back
interface DummyLoginResponse {
  accessToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export const loginApi = async (username: string, password: string) => {
  try {
    // 2. Post to /auth/login
    const response = await api.post<DummyLoginResponse>('/auth/login', {
      username, 
      password,
    });

    const data = response.data;

    // 3. Convert their flat data into your User object structure
    const user: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    };

    return { user, token: data.accessToken };

  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};


// --- INVENTORY ---

// 1. Define what a Product looks like
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  sku: string;
}

// 2. Define the DummyJSON product response
interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// 3. Fetch products function
export const getProducts = async () => {
  try {
    // Note: Using 'api.get' to match your import!
    const response = await api.get<ProductResponse>('/products?limit=100');
    return response.data.products;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};

// ... existing getProducts code ...

export const addProduct = async (productData: Partial<Product>) => {
  const response = await api.post('/products/add', productData);
  return response.data;
};

export const updateProduct = async (id: number, productData: Partial<Product>) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};