import { Table, Button } from 'rsuite';

const { Column, HeaderCell, Cell } = Table;

export function Manutencao() {
  return (
    <div
      style={{
        padding: 4,
      }}
    >
      <Table
        height={400}
        data={[{ id: 1, firstName: 'batata', lastName: 'quente' }]}
        onRowClick={(rowData) => {
          console.log(rowData);
        }}
      >
        <Column width={60} align="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={150}>
          <HeaderCell>First Name</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={150}>
          <HeaderCell>Last Name</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={80} fixed="right">
          <HeaderCell>...</HeaderCell>

          <Cell style={{ padding: '6px' }}>
            {(rowData) => (
              <Button
                appearance="link"
                onClick={() => alert(`id:${rowData.id}`)}
              >
                Edit
              </Button>
            )}
          </Cell>
        </Column>
      </Table>

      <Button>Criar Novo</Button>
    </div>
  );
}
