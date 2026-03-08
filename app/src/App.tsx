import { useState } from 'react'
import { supabase } from './supabase'

// --- 🎨 PIEZAS DE DISEÑO (ESTILOS) ---
const theme = {
  primary: '#1a73e8',
  sidebar: '#1a1c23',
  bg: '#f8f9fa',
  white: '#ffffff',
  text: '#2d3748'
};

// --- 🏗️ COMPONENTES DE VISTA ---

function Dashboard({ user }: any) {
  return (
    <div>
      <h1>Bienvenido, {user.nombre} 👋</h1>
      <p>Rol: <span style={{color: theme.primary, fontWeight: 'bold'}}>{user.rol.toUpperCase()}</span></p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={cardStyle}><h3>120</h3><p>Estudiantes</p></div>
        <div style={cardStyle}><h3>15</h3><p>Docentes</p></div>
        <div style={cardStyle}><h3>{new Date().getFullYear()}</h3><p>Año Académico</p></div>
      </div>
    </div>
  );
}

function ConfigManager() {
  const [nombreColegio, setNombreColegio] = useState('');
  
  const guardar = async () => {
    if(!nombreColegio) return alert("Escribe un nombre");
    const { error } = await supabase.from('colegios').insert([{ nombre: nombreColegio }]);
    if (error) alert("Error: " + error.message);
    else { alert("✅ Colegio registrado"); setNombreColegio(''); }
  };

  return (
    <div style={sectionStyle}>
      <h2>⚙️ Configuración Maestra</h2>
      <h3>Registrar Colegio</h3>
      <input 
        style={inputStyle} 
        placeholder="Nombre de la I.E." 
        value={nombreColegio} 
        onChange={(e) => setNombreColegio(e.target.value)} 
      />
      <button style={btnStyle} onClick={guardar}>Guardar Institución</button>
    </div>
  );
}

// --- 🚀 COMPONENTE PRINCIPAL (APP) ---

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState('inicio');
  const [dni, setDni] = useState('');
  const [pass, setPass] = useState('');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await supabase.from('personal').select('*').eq('dni', dni).eq('password', pass).single();
    if (data) setUser(data);
    else alert("Datos incorrectos");
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
        <form onSubmit={login} style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '320px', textAlign: 'center' }}>
          <h1 style={{ color: theme.primary }}>KipuEdu</h1>
          <input placeholder="DNI" style={{ ...inputStyle, width: '100%', marginBottom: '15px' }} onChange={e => setDni(e.target.value)} />
          <input type="password" placeholder="Clave" style={{ ...inputStyle, width: '100%', marginBottom: '15px' }} onChange={e => setPass(e.target.value)} />
          <button type="submit" style={{ ...btnStyle, width: '100%' }}>Ingresar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      {/* 1. MENU LATERAL ÚNICO */}
      <aside style={{ width: '250px', background: theme.sidebar, color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '30px', textAlign: 'center', borderBottom: '1px solid #333' }}>
          <h2 style={{ margin: 0 }}>KipuEdu</h2>
        </div>
        <nav style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setView('inicio')} style={view === 'inicio' ? navActive : navBtn}>🏠 Inicio</button>
          <button onClick={() => setView('alumnos')} style={view === 'alumnos' ? navActive : navBtn}>👥 Alumnos</button>
          {user.rol === 'superadmin' && (
            <button onClick={() => setView('config')} style={view === 'config' ? navActive : navBtn}>⚙️ Configuración</button>
          )}
        </nav>
        <button onClick={() => setUser(null)} style={{ padding: '20px', background: '#ff4d4f', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Cerrar Sesión</button>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL DINÁMICO */}
      <main style={{ flex: 1, padding: '40px', background: theme.bg, overflowY: 'auto' }}>
        {view === 'inicio' && <Dashboard user={user} />}
        {view === 'config' && <ConfigManager />}
        {view === 'alumnos' && <h2>Módulo de Alumnos (En desarrollo)</h2>}
      </main>
    </div>
  );
}

// --- 💅 ESTILOS RÁPIDOS ---
const cardStyle = { background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', textAlign: 'center' as const };
const sectionStyle = { background: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' };
const inputStyle = { padding: '12px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none' };
const btnStyle = { background: theme.primary, color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const navBtn = { background: 'transparent', color: '#a0aec0', border: 'none', textAlign: 'left' as const, padding: '12px', cursor: 'pointer', borderRadius: '8px', fontSize: '16px' };
const navActive = { ...navBtn, background: '#2d3748', color: 'white' };