import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input } from 'rsuite';
import { patrimoniosDelete, patrimoniosGet } from '../../services/Patrimonios';

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

export function Patrimonios() {
  const [patrimonios, setPatrimonios] = useState<IPatrimonios[]>([]);
  const [openModalCriar, setOpenModalCriar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const handleOpen = () => setOpenModalCriar(true);
  const handleClose = () => setOpenModalCriar(false);
  const handleOpenModalEditar = () => setOpenModalEditar(true);
  const handleCloseModalEditar = () => setOpenModalEditar(false);

  useEffect(() => {
    loadApiData();
  }, [patrimonios]);

  async function loadApiData() {
    const response = await patrimoniosGet();

    setPatrimonios(response);
  }

  return (
    <div
      style={{
        padding: 10,
      }}
    >
      <Modal open={openModalCriar} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Criar Patrimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input placeholder="Código Patrimonio" />
          <Input placeholder="Tipo Patrimonio" />
          <Input placeholder="Nome" />
          <Input placeholder="Quantidade" />
          <Input placeholder="Localização" />
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

      <Modal open={openModalEditar} onClose={handleCloseModalEditar}>
        <Modal.Header>
          <Modal.Title>Editar Patrimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input placeholder="Código Patrimonio" />
          <Input placeholder="Tipo Patrimonio" />
          <Input placeholder="Nome" />
          <Input placeholder="Quantidade" />
          <Input placeholder="Localização" />
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
          data={patrimonios}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
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
                <Button appearance="link" onClick={handleOpenModalEditar}>
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
