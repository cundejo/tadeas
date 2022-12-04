import axios, { AxiosInstance } from 'axios';
import { NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH } from '@/common';
import { getUserAuthToken } from '@/features/auth';
import { z } from 'zod';

async function client(insecure = false): Promise<AxiosInstance> {
  const baseURL = NEXT_PUBLIC_FIREBASE_FUNCTIONS_BASE_PATH;
  if (insecure) return axios.create({ baseURL });
  const token = await getUserAuthToken();
  return axios.create({ baseURL, headers: { Authorization: token } });
}

const functionResponseBody = z.object({
  code: z.string(),
  data: z.string(),
});

export type FunctionResponseBody = z.infer<typeof functionResponseBody>;

export const generateAuthCode = async (email: string): Promise<FunctionResponseBody> => {
  const clientFunctions = await client(true);
  const response = await clientFunctions.post('/generateAuthCode', { email });
  return functionResponseBody.parse(response.data);
};

export const validateAuthCode = async (email: string, code: string): Promise<FunctionResponseBody> => {
  const clientFunctions = await client(true);
  const response = await clientFunctions.post('/validateAuthCode', { email, code });
  return functionResponseBody.parse(response.data);
};

export const notifySharedList = async (email: string, listId: string): Promise<FunctionResponseBody> => {
  const clientFunctions = await client();
  const response = await clientFunctions.post('/notifySharedList', { email, listId });
  return functionResponseBody.parse(response.data);
};
