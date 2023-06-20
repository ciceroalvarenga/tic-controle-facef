import { api } from '../api';

async function tipopatrimonioGet() {
  const result = await api
    .get('/tipopatrimonio')
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));

  return result;
}

async function tipopatrimonioDelete(id: number) {
  const result = await api
    .delete(`/tipopatrimonio/${id}`)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

  return result;
}

export { tipopatrimonioGet, tipopatrimonioDelete };
