import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'rsuite';

export function NavBarPage() {
  const navigate = useNavigate();
  return (
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
  );
}
