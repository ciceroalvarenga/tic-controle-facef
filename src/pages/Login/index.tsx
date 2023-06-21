import { useState } from 'react';
import { Button, Input } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { loginVerification } from '../../services/Login';

export function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  async function handleLogin() {
    const params = {
      email,
      senha,
    };
    const response = await loginVerification(params);

    if (!response) {
      alert('Usuario não cadastrado');
    } else {
      localStorage.setItem('idUsuario', response.id_usuario);
      navigate('/home');
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 500,
          height: 500,
          backgroundColor: '#999999',
          marginTop: 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          borderRadius: 20,
        }}
      >
        <h1 style={{ color: '#fff' }}>Login</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <Input
            style={{ width: 300 }}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e)}
          />
          <Input
            style={{ width: 300 }}
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <Button
            onClick={handleLogin}
            appearance="primary"
            style={{ width: 300 }}
          >
            Entrar
          </Button>
          <Button
            onClick={() => navigate('/cadastro')}
            appearance="default"
            style={{ width: 300 }}
          >
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
}
