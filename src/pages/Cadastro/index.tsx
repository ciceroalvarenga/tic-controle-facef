import { useState } from 'react';
import { Button, Input } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { cadastroApi } from '../../services/Login';
import { error } from 'console';

export function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  async function handleLogin() {
    if(!email || !senha){
      alert('Usuario não cadastrado');
      return ""
    }
    const params = {
      email,
      senha,
    };
    const response = await cadastroApi(params);

    if (!response) {
      alert('Usuario não cadastrado');
    } else {
      navigate('/');
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
        <h1 style={{ color: '#fff' }}>Cadastro</h1>
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
            Cadastrar
          </Button>
        </div>
      </div>
    </div>
  );
}
