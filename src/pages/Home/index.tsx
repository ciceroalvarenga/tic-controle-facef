import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'rsuite';
export function Home() {
  const navigate = useNavigate();
  return (
    <div>
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

      <h1 style={{ display: 'flex', margin: 200, justifyContent: "center", fontSize: 100 }}
      >Bem Vindos</h1>
    </div>

  );
}
