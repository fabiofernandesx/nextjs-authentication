import { GetServerSideProps } from 'next';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { parseCookies } from 'nookies';
import { getAPIClient } from '../services/axios';

const dashboard = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // api.get('/anything');
  }, []);
  return (
    <div className='p-4'>
      <div className='text-center mb-4 opacity-90'>
        <a href='#' className='block relative'>
          <img alt='profil' src={user?.avatar} className='mx-auto object-cover rounded-full h-40 w-40 ' />
        </a>
      </div>
      <div className='text-center'>
        <p className='text-2xl text-gray-800 dark:text-white'>{user?.name}</p>
        <p className='text-xl text-gray-500 dark:text-gray-200 font-light'>{user?.email}</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextjs.token']: token } = parseCookies(ctx);
  // await apiClient.get('/anythingFromServer');
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default dashboard;
