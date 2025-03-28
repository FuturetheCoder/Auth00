import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const SecureStoreService = {
  setToken: async (token: string): Promise<void> => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  getToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  setUser: async (userData: string): Promise<void> => {
    await SecureStore.setItemAsync(USER_KEY, userData);
  },

  getUser: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(USER_KEY);
  },

  clear: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  },
}; 