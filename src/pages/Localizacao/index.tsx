import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, SelectPicker } from 'rsuite';
import { localizacoesDelete, localizacoesGet, localizacoesPost, localizacoesPut } from '../../services/Localizacoes';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

interface ILocalizacoes {
  id_localizacao: number;
  sala: string;
  prateleira: string;
}

export function Localizacao() {
  const navigate = useNavigate();
  const [localizacoes, setLocalizacoes] = useState<ILocalizacoes[]>([]);
  //modal
  const [openModalCriar, setOpenModalCriar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);

  //modal criar
  const handleOpen = () => setOpenModalCriar(true);
  const handleClose = () => setOpenModalCriar(false);

  //modal editar
  const handleCloseModalEditar = () => setOpenModalEditar(false);

  const handleOpenModalEditar = (codManutencao: number) => {
    setOpenModalEditar(true);
    setCodEditar(codManutencao);
  }

  //informações
  const [sala, setSala] = useState('');
  const [prateleira, setPrateleira] = useState('');
  const [codEditar, setCodEditar] = useState(0);

  useEffect(() => {
    loadApiData();
  }, [localizacoes]);

  async function loadApiData() {
    const response = await localizacoesGet();

    setLocalizacoes(response);
  }

  async function handlePost() {
    if(!sala || !prateleira){
      alert('Preencha todas as informações');
      return ""
    }
    const params = {
      sala: sala,
      prateleira: prateleira
    };

    const response = await localizacoesPost(params);

    //@ts-ignore
    if (response.status === 200) {
      setOpenModalCriar(false);
    }
  }

  async function handlePut() {
    if(!sala || !prateleira){
      alert('Preencha todas as informações');
      return ""
    }
    const params = {
      id_localizacao: codEditar,
      sala: sala,
      prateleira: prateleira
    };

    const response = await localizacoesPut(params);

    setOpenModalEditar(false);
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
      
      <Modal open={openModalCriar} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Criar Localização</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input placeholder="Sala" onChange={(e) => setSala(e)} />
          <Input placeholder="Prateleira" onChange={(e) => setPrateleira(e)} />

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
          <Modal.Title>Editar Localização</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input placeholder="Sala" onChange={(e) => setSala(e)} />
          <Input placeholder="Prateleira" onChange={(e) => setPrateleira(e)} />
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
          data={localizacoes}
          onRowClick={(rowData) => {
          }}
        >
          <Column width={80} align="center" fixed>
            <HeaderCell>Código</HeaderCell>
            <Cell dataKey="id_localizacao" />
          </Column>

          <Column width={150}>
            <HeaderCell>Sala</HeaderCell>
            <Cell dataKey="sala" />
          </Column>

          <Column width={150}>
            <HeaderCell>Prateleira</HeaderCell>
            <Cell dataKey="prateleira" />
          </Column>

          <Column width={80} fixed="right">
            <HeaderCell>...</HeaderCell>

            <Cell style={{ padding: '6px' }}>
              {(rowData) => (
                <Button
                  appearance="link"
                  onClick={() => handleOpenModalEditar(rowData.id_localizacao)}
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
                  onClick={() => localizacoesDelete(rowData.id_localizacao)}
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
