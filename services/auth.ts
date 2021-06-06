import { v4 as uuid } from 'uuid';

export type LoginRequestData = {
  email: string;
  password: string;
};
const delay = (delayInMs = 750) =>
  new Promise(resolve => setTimeout(resolve, delayInMs));

export async function loginRequest(data: LoginRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'Fabio Fernandes',
      email: 'fabio@fabiofernandes.net',
      avatar: 'https://github.com/fabiofernandesx.png',
    },
  };
}

export async function getUserInfo(token: string) {
  await delay();
  return {
    user: {
      name: 'Fabio Fernandes',
      email: 'fabio@fabiofernandes.net',
      avatar: 'https://github.com/fabiofernandesx.png',
    },
  };
}
