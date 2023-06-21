import { api } from '../api';

async function localizacoesGet() {
  const result = await api
    .get('/localizacao')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return result;
}
async function localizacoesPut(params: any) {
  const result = await api
    .put(`/localizacao`, params)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return result;
}

async function localizacoesPost(params: any) {
  const result = await api
    .post(`/localizacao`, params)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return result;
}

async function localizacoesDelete(id: number) {
  const result = await api
    .delete(`/localizacao/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return result;
}

export { localizacoesGet, localizacoesDelete, localizacoesPost, localizacoesPut };
