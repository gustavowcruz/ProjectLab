interface PerfilProps {
  params: {
    id: string;
  };
}

export default function PerfilUsuario({ params }: PerfilProps) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Perfil do Usuário</h1>
      <p>Você está visualizando o perfil do usuário com ID/Username: <strong>{params.id}</strong></p>
    </main>
  );
}