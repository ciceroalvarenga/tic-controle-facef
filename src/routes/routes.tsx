import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Patrimonios } from '../pages/Patrimonios';
import { TipoPatrimonio } from '../pages/TipoPatrimonio';
import { Manutencao } from '../pages/Manutencao';
import { Localizacao } from '../pages/Localizacao';

export function Routes() {
  const AppRouter = {
    path: '/',
    children: [
      { path: '/', element: <Home /> },
      { path: '/patrimonios', element: <Patrimonios /> },
      { path: '/tipopatrimonio', element: <TipoPatrimonio /> },
      { path: '/manutencao', element: <Manutencao /> },
      { path: '/localizacao', element: <Localizacao /> },
    ],
  };
  return useRoutes([AppRouter]);
}
