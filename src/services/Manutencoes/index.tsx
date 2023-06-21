import { api } from '../api';

async function manutencoesGet() {
  const result = await api
    .get('/manutencao')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return result;
}
async function manutencoesPut(params: any) {
    console.log(params)
    const result = await api
      .put(`/manutencao`, params)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err));
  
    return result;
  }
  
  async function manutencoesPost(params: any) {
    const result = await api
      .post(`/manutencao`, params)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  
    return result;
  }
  

async function manutencoesDelete(id: number) {
  const result = await api
    .delete(`/manutencao/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return result;
}

export { manutencoesGet, manutencoesDelete, manutencoesPost, manutencoesPut };
