export default function Profile({ userData }) {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Componente de Perfil</h1>
      {userData ? (
        <div>
          <h1>Hola {userData.email}, bienvenido a tu perfil</h1>
          <h1>Hola {userData.name}, bienvenido a tu perfil</h1>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}
