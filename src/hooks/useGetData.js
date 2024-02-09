import { useState, useEffect } from 'react';
import { defaultInstance } from '@/apis';

const promiseWrapper = promise => {
  let status = 'pending';
  let result;

  const s = promise.then(
    value => {
      status = 'success';
      result = value;
    },
    error => {
      status = 'error';
      result = error;
    },
  );

  return () => {
    switch (status) {
      case 'pending':
        throw s;
      case 'success':
        return result;
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status');
    }
  };
};

const useGetData = (url, setData = data => data) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const promise = defaultInstance
        .get(url)
        .then(response => setData(response.data));
      setResource(promiseWrapper(promise));
    };

    getData();
  }, [url]);

  return resource;
};

export default useGetData;
