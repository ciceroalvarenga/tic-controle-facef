import { api } from '../api';

async function patrimoniosGet() {
  const result = await api
    .get('/patrimonio')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return result;
}

async function patrimoniosPut(id: number) {
  const result = await api
    .get(`/patrimonio/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return result;
}

async function patrimoniosPost(id: number) {
  const result = await api
    .get(`/patrimonio/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return result;
}

async function patrimoniosDelete(id: number) {
  const result = await api
    .delete(`/patrimonio/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return result;
}

export { patrimoniosGet, patrimoniosDelete };
