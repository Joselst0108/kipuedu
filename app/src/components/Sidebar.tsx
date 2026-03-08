import { theme } from '../styles/theme';

export function Sidebar({ user, setView, currentView, logout }: any) {
  const btnStyle = (view: string) => ({
    padding: '12px 15px',
    backgroundColor: currentView === view ? '#2d3748' : 'transparent',
    color: 'white',
    border: 'none',
    textAlign: 'left' as const,
    cursor: 'pointer',
    borderRadius: '8px'
  });

  return (
    <aside style={{ width: '260px', backgroundColor: theme.colors.sidebar, display: 'flex', flexDirection: 'column', padding: '20px' }}>
      <h2 style={{ color: 'white' }}>KipuEdu</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
        <button onClick={() => setView('inicio')} style={btnStyle('inicio')}>🏠 Inicio</button>
        <button onClick={() => setView('alumnos')} style={btnStyle('alumnos')}>👥 Alumnos</button>
        
        {user.rol === 'superadmin' && (
          <button onClick={() => setView('config')} style={btnStyle('config')}>⚙️ Configuración</button>
        )}
      </nav>
      <button onClick={logout} style={{ marginTop: 'auto', background: theme.colors.danger, color: 'white', padding: '10px', border: 'none', borderRadius: '8px' }}>
        Cerrar Sesión
      </button>
    </aside>
  );
}