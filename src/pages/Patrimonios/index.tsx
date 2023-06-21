import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, SelectPicker } from 'rsuite';
import {
  patrimoniosDelete,
  patrimoniosGet,
  patrimoniosPost,
  patrimoniosPut,
} from '../../services/Patrimonios';
import { tipopatrimonioGet } from '../../services/TiposPatrimonios';
import { localizacoesGet } from '../../services/Localizacoes';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

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
interface ITipoPatrimonio {
  id_tipo: number;
  nome: string;
  categoria: string;
}

interface ILocalizacoes {
  id_localizacao: number;
  sala: string;
  prateleira: string;
}

export function Patrimonios() {
  const navigate = useNavigate();
  //get
  const [patrimonios, setPatrimonios] = useState<IPatrimonios[]>([]);

  //get
  const [tipo, setTipo] = useState<ITipoPatrimonio[]>([]);

  //get
  const [localizacao, setLocalizacao] = useState<ILocalizacoes[]>([]);

  //SelectID
  const [selectedId, setSelectedId] = useState<number | null>(null);

  //Selectlocal
  const [selectedIdLocal, setSelectedIdLocal] = useState<number | null>(null);

  const [codigo, setCodigo] = useState('');
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [codigoPatrimonioEdit, setCodigoPatrimonioEdit] = useState(0);

  const [openModalCriar, setOpenModalCriar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);

  //modal criar
  const handleOpen = () => setOpenModalCriar(true);
  const handleClose = () => setOpenModalCriar(false);

  //modal editar
  const handleOpenModalEditar = (codPatrimonio: number) => {
    setOpenModalEditar(true);
    setCodigoPatrimonioEdit(codPatrimonio);
  };
  const handleCloseModalEditar = () => setOpenModalEditar(false);

  useEffect(() => {
    loadApiData();
    loadApiDataTipo();
    loadApiDataLocalizacoes();
  }, [patrimonios]);

  async function loadApiData() {
    const idUsuario = localStorage.getItem('idUsuario');

    if (idUsuario) {
      const response = await patrimoniosGet(Number(idUsuario));

      setPatrimonios(response);
    }
  }

  async function loadApiDataTipo() {
    const response = await tipopatrimonioGet();

    setTipo(response);
  }

  async function loadApiDataLocalizacoes() {
    const response = await localizacoesGet();

    setLocalizacao(response);
  }

  const handleSelectChange = (value: number | null) => {
    setSelectedId(value);
  };

  const handleSelectChangeLocal = (value: number | null) => {
    setSelectedIdLocal(value);
  };

  async function handlePost() {
    if(!selectedId || !codigoPatrimonioEdit || !nome || !quantidade || !selectedIdLocal){
      alert('Preencha todas as informações');
      return ""
    }
    const idUsuario = localStorage.getItem('idUsuario');
    if(!idUsuario ){
      alert('Faça login');
      return ""
    }

    const params = {
      cod_patrimonio: codigo,
      tipo_patrimonio: selectedId,
      nome_patrimonio: nome,
      qtde: quantidade,
      localizacao: selectedIdLocal,
      id_usuario: Number(idUsuario),
    };

    const response = await patrimoniosPost(params);

    //@ts-ignore
    if (response.status === 200) {
      setOpenModalCriar(false);
    }
  }

  async function handlePut() {
    if(!selectedId || !codigoPatrimonioEdit || !nome || !quantidade || !selectedIdLocal){
      alert('Preencha todas as informações');
      return ""
    }
    const idUsuario = localStorage.getItem('idUsuario');
    if(!idUsuario ){
      alert('Faça login');
      return ""
    }
    const params = {
      cod_patrimonio: codigoPatrimonioEdit,
      tipo_patrimonio: selectedId,
      nome_patrimonio: nome,
      qtde: quantidade,
      localizacao: selectedIdLocal,
      id_usuario: Number(idUsuario),
    };

    const response = await patrimoniosPut(params);

    console.log('response', response);

    //@ts-ignore
    if (response.status === 200) {
      setOpenModalEditar(false);
    }
  }

  return (
    <div
      style={{
        padding: 10,
      }}
    >
       <Navbar>
        <Nav>
          <Nav.Item onClick={() => navigate('/home')}>Home</Nav.Item>
          <Nav.Item onClick={() => navigate('/patrimonios')}>
            Patrimonios
          </Nav.Item>
          <Nav.Item onClick={() => navigate('/manutencao')}>Manutenções</Nav.Item>
          <Nav.Item onClick={() => navigate('/tipopatrimonio')}>
            Tipos de Patrimonios
          </Nav.Item>
          <Nav.Item onClick={() => navigate('/localizacao')}>
            Localizações
          </Nav.Item>
        </Nav>
      </Navbar>
      {/* Modal Criar */}
      <Modal open={openModalCriar} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Criar Patrimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input
            type="number"
            placeholder="Código Patrimonio"
            onChange={(e) => setCodigo(e)}
          />
          <SelectPicker
            data={tipo}
            value={selectedId}
            onChange={handleSelectChange}
            labelKey="nome"
            valueKey="id_tipo"
            placeholder="Tipo Patrimonio"
            style={{ width: 224 }}
          />
          <Input placeholder="Nome" onChange={(e) => setNome(e)} />
          <Input
            type="number"
            placeholder="Quantidade"
            onChange={(e) => setQuantidade(e)}
          />
          <SelectPicker
            data={localizacao}
            value={selectedIdLocal}
            onChange={handleSelectChangeLocal}
            labelKey="sala"
            valueKey="id_localizacao"
            placeholder="Localização"
            style={{ width: 224 }}
          />
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
          <Modal.Title>Editar Patrimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <SelectPicker
            data={tipo}
            value={selectedId}
            onChange={handleSelectChange}
            labelKey="nome"
            valueKey="id_tipo"
            placeholder="Tipo Patrimonio"
            style={{ width: 224 }}
          />
          <Input placeholder="Nome" onChange={(e) => setNome(e)} />
          <Input
            type="number"
            placeholder="Quantidade"
            onChange={(e) => setQuantidade(e)}
          />
          <SelectPicker
            data={localizacao}
            value={selectedIdLocal}
            onChange={handleSelectChangeLocal}
            labelKey="sala"
            valueKey="id_localizacao"
            placeholder="Localização"
            style={{ width: 224 }}
          />
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
          data={patrimonios}
          // onRowClick={(rowData) => {
          //   console.log(rowData);
          // }}
        >
          <Column width={80} align="center" fixed>
            <HeaderCell>Código</HeaderCell>
            <Cell dataKey="cod_patrimonio" />
          </Column>

          <Column width={150}>
            <HeaderCell>Tipo</HeaderCell>
            <Cell dataKey="tipo_patrimonio.nome" />
          </Column>

          <Column width={150}>
            <HeaderCell>Nome Patrimonio</HeaderCell>
            <Cell dataKey="nome_patrimonio" />
          </Column>
          <Column width={80}>
            <HeaderCell>Quantidade</HeaderCell>
            <Cell dataKey="qtde" />
          </Column>
          <Column width={150}>
            <HeaderCell>Localizacao</HeaderCell>
            <Cell dataKey="localizacao.sala" />
          </Column>

          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: '6px' }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => handleOpenModalEditar(rowData.cod_patrimonio)}
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
                  onClick={() => patrimoniosDelete(rowData.cod_patrimonio)}
                >
                  Deletar
                </Button>
              )}
            </Cell>
          </Column>
        </Table>
      </div>

      <Button appearance="primary" onClick={handleOpen}>
        Criar Novo
      </Button>
    </div>
  );
}
