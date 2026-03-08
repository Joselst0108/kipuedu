import { useState } from 'react';
import { supabase } from './supabase';
import { Sidebar } from './components/sidebar/sidebar';
import { theme } from './styles/theme';

export default function App() {
  // --- ESTADOS DE AUTENTICACIÓN ---
  const [user, setUser] = useState<any>(null);
  const [dni, setDni] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  // --- ESTADOS DE NAVEGACIÓN Y CONTEXTO ---
  const [currentApp, setCurrentApp] = useState('eduadmin');
  const [view, setView] = useState('inicio');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedLevel, setSelectedLevel] = useState('primaria');

  // Lógica de Inicio de Sesión
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('personal')
        .select('*')
        .eq('dni', dni)
        .eq('password', pass)
        .single();

      if (data) {
        setUser(data);
      } else {
        alert("Credenciales incorrectas.");
      }
    } catch (err) {
      alert("Error al conectar con la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setDni('');
    setPass('');
  };

  // 1. PANTALLA DE LOGIN (Si no hay usuario)
  if (!user) {
    return (
      <div style={{ 
        height: '100vh', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', background: '#f0f2f5', fontFamily: 'sans-serif' 
      }}>
        <form onSubmit={login} style={{ 
          background: 'white', padding: '40px', borderRadius: '12px', 
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '320px' 
        }}>
          <h2 style={{ textAlign: 'center', color: '#1a1c23', marginBottom: '20px' }}>KipuEdu Login</h2>
          <input 
            type="text" placeholder="DNI" value={dni} 
            onChange={(e) => setDni(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
          <input 
            type="password" placeholder="Contraseña" value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
          />
          <button 
            type="submit" disabled={loading}
            style={{ 
              width: '100%', padding: '12px', background: theme?.colors?.primary || '#3182ce', 
              color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' 
            }}
          >
            {loading ? 'Cargando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  // 2. DASHBOARD PRINCIPAL (Si el usuario ya entró)
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar 
        user={user}
        currentApp={currentApp}
        setCurrentApp={setCurrentApp}
        view={view}
        setView={setView}
        logout={logout}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
      />

      <main style={{ flex: 1, padding: '30px', background: '#f7fafc', overflowY: 'auto' }}>
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ color: '#2d3748', margin: 0, fontSize: '1.8rem' }}>
            {view.replace('-', ' ').toUpperCase()}
          </h1>
          <p style={{ color: '#718096' }}>
            Estás en: <strong>{currentApp.toUpperCase()}</strong> | Gestión <strong>{selectedYear}</strong>
          </p>
        </header>

        <section style={{ 
          background: 'white', padding: '25px', borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', minHeight: '60vh' 
        }}>
          {/* Aquí se cargarán los componentes de cada vista */}
          {view === 'inicio' && (
            <div>
              <h3>Bienvenido, {user.nombre}</h3>
              <p>Selecciona una opción del menú para comenzar.</p>
            </div>
          )}
          
          {view === 'punto-venta' && (
            <div>
              <h3>🏪 Caja y Punto de Venta</h3>
              <p>Módulo de cobros habilitado para {selectedLevel}.</p>
            </div>
          )}

          {view !== 'inicio' && view !== 'punto-venta' && (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <p style={{ fontSize: '3rem' }}>🚧</p>
              <h3>Módulo en Construcción</h3>
              <p>Estamos trabajando para habilitar la vista <strong>{view}</strong> muy pronto.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
