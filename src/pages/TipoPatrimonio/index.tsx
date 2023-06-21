import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input } from 'rsuite';
import { tipopatrimonioDelete, tipopatrimonioGet, tipopatrimonioPost, tipopatrimonioPut } from '../../services/TiposPatrimonios';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

interface ITipoPatrimonio {
  id_tipo: number;
  nome: string;
  categoria: string;
}

export function TipoPatrimonio() {
  const navigate = useNavigate();

  const [tipopatrimonio, setTipoPatrimonio] = useState<ITipoPatrimonio[]>([]);
   //modal
   const [openModalCriar, setOpenModalCriar] = useState(false);
   const [openModalEditar, setOpenModalEditar] = useState(false);
 
   //modal criar
   const handleOpen = () => setOpenModalCriar(true);
   const handleClose = () => setOpenModalCriar(false);
 
   //modal editar
   const handleCloseModalEditar = () => setOpenModalEditar(false);

   const handleOpenModalEditar = (codManutencao: number) => {
     setCodEditar(codManutencao)
     setOpenModalEditar(true);
   } 
 
   //informações
   const [nome, setNome] = useState('');
   const [categoria, setCategoria] = useState('');
   const [codEditar, setCodEditar] = useState(0);
 

  useEffect(() => {
    loadApiData();
  }, [tipopatrimonio]);

  async function loadApiData() {
    const response = await tipopatrimonioGet();

    setTipoPatrimonio(response);
  }

  async function handlePost() {
    if(!nome || !categoria){
      alert('Preencha todas as informações');
      return ""
    }
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

  async function handlePut() {
    if(!nome || !categoria){
      alert('Preencha todas as informações');
      return ""
    }
    const params = {
      id_tipo: codEditar,
      nome: nome,
      categoria: categoria
    };

    const response = await tipopatrimonioPut(params);

    setOpenModalCriar(false);

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
          <Modal.Title>Criar Tipo Patrimonio</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Input  placeholder="Nome" onChange={(e) => setNome(e)} />
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
          <Input placeholder="Nome" onChange={(e) => setNome(e)} />
          <Input placeholder="Categoria" onChange={(e) => setCategoria(e)} />
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
                onClick={() => handleOpenModalEditar(rowData.id_tipo)}
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
