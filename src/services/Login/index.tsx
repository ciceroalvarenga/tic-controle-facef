import { api } from '../api';

async function loginVerification(params: any) {
  const result = await api
    .post(`/usuario/verifica`, params)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });

  return result;
}

async function cadastroApi(params: any) {
  const result = await api
    .post(`/usuario`, params)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.data;
    });

  return result;
}

export { loginVerification, cadastroApi };
