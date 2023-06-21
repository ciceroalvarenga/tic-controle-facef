import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, SelectPicker } from 'rsuite';
import { localizacoesDelete, localizacoesGet, localizacoesPost } from '../../services/Localizacoes';

const { Column, HeaderCell, Cell } = Table;

interface ILocalizacoes {
  id_localizacao: number;
  sala: string;
  prateleira: string;
}

export function Localizacao() {
  const [localizacoes, setLocalizacoes] = useState<ILocalizacoes[]>([]);
  //modal
  const [openModalCriar, setOpenModalCriar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);

  //modal criar
  const handleOpen = () => setOpenModalCriar(true);
  const handleClose = () => setOpenModalCriar(false);

  //modal editar
  const handleOpenModalEditar = () => setOpenModalEditar(true);
  const handleCloseModalEditar = () => setOpenModalEditar(false);

  //informações
  const [sala, setSala] = useState('');
  const [prateleira, setPrateleira] = useState('');

  useEffect(() => {
    loadApiData();
  }, [localizacoes]);

  async function loadApiData() {
    const response = await localizacoesGet();

    setLocalizacoes(response);
  }

  async function handlePost() {
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

  return (

    <div
      style={{
        padding: 10,
      }}
    >
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
          <Input placeholder="Sala" />
          <Input placeholder="Prateleira" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Confirmar
          </Button>
          <Button onClick={handleClose} appearance="ghost">
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
                  onClick={handleOpenModalEditar}
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
