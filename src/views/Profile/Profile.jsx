export default function Profile({ userData }) {
  return (
    <div>
      <h1>Componente de Perfil</h1>
      {userData ? (
        <div>
          <p>Hola {userData.email}, bienvenido a tu perfil</p>
          <p>Hola {userData.name}, bienvenido a tu perfil</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
}
