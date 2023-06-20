import { useEffect, useState } from 'react';
import { Table, Button } from 'rsuite';
import { tipopatrimonioDelete, tipopatrimonioGet } from '../../services/TiposPatrimonios';

const { Column, HeaderCell, Cell } = Table;

interface ITipoPatrimonio {
  id_tipo: number;
  nome: string;
  categoria: string;
}

export function TipoPatrimonio() {
  const [tipopatrimonio, setTipoPatrimonio] = useState<ITipoPatrimonio[]>([]);

  useEffect(() => {
    loadApiData();
  }, [tipopatrimonio]);

  async function loadApiData() {
    const response = await tipopatrimonioGet();

    setTipoPatrimonio(response);
  }

  return (
    <div
      style={{
        padding: 10,
      }}
    >
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
                  onClick={() => alert(`id:${rowData.id_tipo}`)}
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

      <Button>Criar Novo</Button>
    </div>
  );
}
