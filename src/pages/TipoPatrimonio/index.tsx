import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input } from 'rsuite';
import { tipopatrimonioDelete, tipopatrimonioGet, tipopatrimonioPost } from '../../services/TiposPatrimonios';

const { Column, HeaderCell, Cell } = Table;

interface ITipoPatrimonio {
  id_tipo: number;
  nome: string;
  categoria: string;
}

export function TipoPatrimonio() {
  const [tipopatrimonio, setTipoPatrimonio] = useState<ITipoPatrimonio[]>([]);
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
   const [nome, setNome] = useState('');
   const [categoria, setCategoria] = useState('');
 

  useEffect(() => {
    loadApiData();
  }, [tipopatrimonio]);

  async function loadApiData() {
    const response = await tipopatrimonioGet();

    setTipoPatrimonio(response);
  }

  async function handlePost() {
    const params = {
      nome: nome,
      categoria: categoria
    };
    console.log(params)

    const response = await tipopatrimonioPost(params);

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
          <Modal.Title>Criar Tipo Patrimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input placeholder="Nome" onChange={(e) => setNome(e)} />
          <Input placeholder="Categoria" onChange={(e) => setCategoria(e)} />

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
          <Modal.Title>Editar Tipo Patrimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input placeholder="Nome" />
          <Input placeholder="Categoria" />
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
          data={tipopatrimonio}
          onRowClick={(rowData) => {
            console.log(rowData);
          }}
        >
          <Column width={80} align="center" fixed>
            <HeaderCell>Código</HeaderCell>
            <Cell dataKey="id_tipo" />
          </Column>

          <Column width={150}>
            <HeaderCell>Nome</HeaderCell>
            <Cell dataKey="nome" />
          </Column>

          <Column width={150}>
            <HeaderCell>Categoria</HeaderCell>
            <Cell dataKey="categoria" />
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
                  onClick={() => tipopatrimonioDelete(rowData.id_tipo)}
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
