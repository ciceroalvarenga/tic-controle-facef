import { useEffect, useState } from 'react';
import { Table, Button } from 'rsuite';
import { localizacoesDelete, localizacoesGet } from '../../services/Localizacoes';

const { Column, HeaderCell, Cell } = Table;

interface ILocalizacoes {
    id_localizacao: number;
    sala: string;
    prateleira: string;
}

export function Localizacao() {
  const [localizacoes, setLocalizacoes] = useState<ILocalizacoes[]>([]);

  useEffect(() => {
    loadApiData();
  }, [localizacoes]);

  async function loadApiData() {
    const response = await localizacoesGet();

    setLocalizacoes(response);
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
          data={localizacoes}
          onRowClick={(rowData) => {
            console.log(rowData);
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
                  onClick={() => alert(`id:${rowData.id_localizacao}`)}
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

      <Button>Criar Novo</Button>
    </div>
  );
}
