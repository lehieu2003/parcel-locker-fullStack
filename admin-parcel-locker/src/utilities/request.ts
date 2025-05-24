import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});


const request = async function<T>(options: AxiosRequestConfig): Promise<[T, null] | [null, AxiosError]> {
  const onSuccess = function(response: AxiosResponse<T>) {
    console.debug('Request Successful!', response);
    return response.data;
  }

  const onError = function(error: AxiosError) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      console.error('Status:',  error.response.status);
      console.error('Data:',    error.response.data);
      console.error('Headers:', error.response.headers);

    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  }
  try{
    const response = await client<T>(options);
    return [onSuccess(response), null];  
  }
  catch (error: any){
    onError(error);
    return [null, error];
  }
}

export default request;