import { useEffect, useState } from 'react';
import { Table, Button } from 'rsuite';
import { manutencoesDelete, manutencoesGet } from '../../services/Manutencoes';

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

export function Manutencao() {
  const [manutencoes, setManutencoes] = useState<IManutencoes[]>([]);

  useEffect(() => {
    loadApiData();
  }, [manutencoes]);

  async function loadApiData() {
    const response = await manutencoesGet();

    setManutencoes(response);
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
                  onClick={() => alert(`id:${rowData.cod_manutencao}`)}
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

      <Button>Criar Novo</Button>
    </div>
  );
}
