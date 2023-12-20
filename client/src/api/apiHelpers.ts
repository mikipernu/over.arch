import { AxiosInstance, AxiosResponse, Method } from 'axios';
import { ZodSchema, infer as zInfer } from 'zod';

const makeApiCall = async <T extends ZodSchema, D = unknown>(
  axiosInstance: AxiosInstance,
  method: Method,
  url: string,
  requestData: D,
  responseSchema: T
): Promise<zInfer<T>> => {
  if (axiosInstance.request) {
    try {
      const response: AxiosResponse = await axiosInstance.request({
        method,
        url,
        data: requestData,
      });

      return responseSchema.parse(response.data);
    } catch (error) {
      console.error(`${method.toUpperCase()} ${url} failed: `, error);
      throw error;
    }
  }
};

export { makeApiCall };
