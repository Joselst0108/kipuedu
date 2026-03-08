import React, { useState } from 'react';
import { supabase } from './supabase';
import { Sidebar } from './components/Sidebar/Sidebar';
import { theme } from './styles/theme';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [dni, setDni] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados de Contexto para el Sidebar
  const [currentApp, setCurrentApp] = useState('eduadmin');
  const [view, setView] = useState('inicio');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedLevel, setSelectedLevel] = useState('primaria');

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase
      .from('personal')
      .select('*')
      .eq('dni', dni)
      .eq('password', pass)
      .single();

    if (data) setUser(data);
    else alert("Error: Usuario no encontrado");
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setDni('');
    setPass('');
  };

  if (!user) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f2f5' }}>
        <form onSubmit={login} style={{ background: 'white', padding: '30px', borderRadius: '12px', width: '300px' }}>
          <h2 style={{ textAlign: 'center' }}>KipuEdu Login</h2>
          <input type="text" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
          <input type="password" placeholder="Pass" value={pass} onChange={(e) => setPass(e.target.value)} style={{ width: '100%', marginBottom: '10px', padding: '8px' }} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: theme.colors.primary, color: 'white', border: 'none', borderRadius: '4px' }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
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

      <main style={{ flex: 1, padding: '20px', background: '#f7fafc', overflowY: 'auto' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <h2>Módulo: {currentApp.toUpperCase()}</h2>
          <p>Vista actual: {view} | Año: {selectedYear} | Nivel: {selectedLevel}</p>
          <hr />
          {/* Aquí cargaremos la caja más adelante */}
          {view === 'punto-venta' ? <p>🛒 Pantalla de Cobros (Yape/Plin)</p> : <p>Selecciona una opción del menú.</p>}
        </div>
      </main>
    </div>
  );
}
