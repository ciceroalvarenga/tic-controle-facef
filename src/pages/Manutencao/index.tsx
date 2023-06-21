import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, SelectPicker } from 'rsuite';
import { manutencoesDelete, manutencoesGet, manutencoesPost, manutencoesPut } from '../../services/Manutencoes';
import { patrimoniosGet } from '../../services/Patrimonios';

const { Column, HeaderCell, Cell } = Table;

interface IManutencoes {
  cod_manutencao: number;
  patrimonio: {
    cod_patrimonio: number;
    tipo_patrimonio: {
      id_tipo: number;
      nome: string;
      categoria: string;
    };
    nome_patrimonio: string;
    qtde: number;
    localizacao: {
      id_localizacao: number;
      sala: string;
      prateleira: string;
    };
  };
  data_manutencao: string;
}

interface IPatrimonios {
  cod_patrimonio: number;
  tipo_patrimonio: {
    id_tipo: number;
    nome: string;
    categoria: string;
  };
  nome_patrimonio: string;
  qtde: number;
  localizacao: {
    id_localizacao: number;
    sala: string;
    prateleira: string;
  };
}

export function Manutencao() {
  const [manutencoes, setManutencoes] = useState<IManutencoes[]>([]);
  const [patrimonios, setPatrimonios] = useState<IPatrimonios[]>([]);

  //modal
  const [openModalCriar, setOpenModalCriar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [codEditar, setCodEditar] = useState(0);

  //modal criar
  const handleOpen = () => setOpenModalCriar(true);
  const handleClose = () => setOpenModalCriar(false);

  //modal editar
  const handleOpenModalEditar = (codManutencao: number) => {
    setCodEditar(codManutencao)
    setOpenModalEditar(true);
  } 
  const handleCloseModalEditar = () => setOpenModalEditar(false);

  //informações
  const [cod, setCod] = useState('');
  const [data, setData] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    loadApiData();
    loadApiDataPatrimonios();
  }, [manutencoes]);

  async function loadApiData() {
    const response = await manutencoesGet();

    setManutencoes(response);
  }
  async function loadApiDataPatrimonios() {
    const response = await patrimoniosGet();

    setPatrimonios(response);
  }

  const handleSelectChange = (value: number | null) => {
    setSelectedId(value);
  };

  async function handlePost() {
    const params = {
      cod_manutencao: cod,
      cod_patrimonio: selectedId,
      data_manutencao: data
    };
    console.log(params)

    const response = await manutencoesPost(params);

    //@ts-ignore
    if (response.status === 200) {
      setOpenModalCriar(false);
    }
  }

  async function handlePut() {
    console.log(codEditar)
    const params = {
      cod_manutencao: codEditar,
      cod_patrimonio: selectedId,
      data_manutencao: data
    };
    console.log(params)

    const response = await manutencoesPut(params);

    //@ts-ignore
    if (response.status === 200) {
      setOpenModalCriar(false);
    }
  }

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <Modal open={openModalCriar} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Criar Manutenção</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input placeholder="Código Manutencao" type="number" onChange={(e) => setCod(e)} />
          <SelectPicker
            data={patrimonios}
            value={selectedId}
            onChange={handleSelectChange}
            labelKey="nome_patrimonio"
            valueKey="cod_patrimonio"
            placeholder="Patrimonio"
            style={{ width: 224 }}
          />
          <Input placeholder="Data da Manutenção" type="date" onChange={(e) => setData(e)} />

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePost} appearance="primary">
            Confirmar
          </Button>
          <Button onClick={handleClose} appearance="ghost">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Editar */}

      <Modal open={openModalEditar} onClose={handleCloseModalEditar}>
        <Modal.Header>
          <Modal.Title>Editar Manutenção</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input placeholder="Código Manutencao" type="number" onChange={(e) => setCod(e)} />
          <SelectPicker
            data={patrimonios}
            value={selectedId}
            onChange={handleSelectChange}
            labelKey="nome_patrimonio"
            valueKey="cod_patrimonio"
            placeholder="Patrimonio"
            style={{ width: 224 }}
          />
          <Input placeholder="Data da Manutenção" type="date" onChange={(e) => setData(e)} />

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePut} appearance="primary">
            Confirmar
          </Button>
          <Button onClick={handleCloseModalEditar} appearance="ghost">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        <Table
          height={400}
          data={manutencoes}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
        >
          <Column width={80} align="center" fixed>
            <HeaderCell>Código</HeaderCell>
            <Cell dataKey="cod_manutencao" />
          </Column>

          <Column width={150}>
            <HeaderCell>Patrimonio</HeaderCell>
            <Cell dataKey="patrimonio.nome_patrimonio" />
          </Column>

          <Column width={150}>
            <HeaderCell>Data manutenção</HeaderCell>
            <Cell dataKey="data_manutencao" />
          </Column>

          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: '6px' }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => handleOpenModalEditar(rowData.cod_manutencao)}
                >
                  Editar
                </Button>
              )}
            </Cell>
          </Column>
          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: '6px' }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => manutencoesDelete(rowData.cod_manutencao)}
                >
                  Deletar
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </div>

      <Button appearance="primary" onClick={handleOpen}>Criar Novo</Button>
    </div>
  );
}
