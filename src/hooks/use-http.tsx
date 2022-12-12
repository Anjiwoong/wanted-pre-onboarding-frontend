import { useCallback } from 'react';
import { RequestTypes } from '../types/http-types';

const useHttp = () => {
  const sendRequest = useCallback(
    async (requestConfig: RequestTypes, applyData: (data: any) => void) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PRE_ONBORDING}${requestConfig.url}`,
          {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body
              ? JSON.stringify(requestConfig.body)
              : null,
          },
        );

        if (!response.ok) {
          throw new Error('api error');
        }

        const data = await response.json();

        applyData(data);
      } catch (error: unknown) {
        console.log(error);
      }
    },
    [],
  );

  return sendRequest;
};

export default useHttp;
