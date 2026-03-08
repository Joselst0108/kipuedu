import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function App() {
  const [user, setUser] = useState<any>(null)
  const [view, setView] = useState('inicio') // inicio, alumnos, asistencia, notas
  const [dni, setDni] = useState('')
  const [pass, setPass] = useState('')

  async function manejarLogin(e: React.FormEvent) {
    e.preventDefault()
    const { data } = await supabase.from('personal').select('*').eq('dni', dni).eq('password', pass).single()
    if (data) setUser(data)
    else alert('Acceso denegado')
  }

  if (!user) {
    return (
      <div style={loginContainer}>
        <div style={loginCard}>
          <h1 style={{color: '#1a73e8', marginBottom: '5px'}}>KipuEdu</h1>
          <p style={{color: '#5f6368'}}>Sistema de Gestión Escolar</p>
          <form onSubmit={manejarLogin}>
            <input placeholder="DNI" style={inputStyle} onChange={e => setDni(e.target.value)} />
            <input type="password" placeholder="Contraseña" style={inputStyle} onChange={e => setPass(e.target.value)} />
            <button type="submit" style={loginBtn}>Iniciar Sesión</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* MENÚ LATERAL (SIDEBAR) */}
      <aside style={sidebarStyle}>
        <h2 style={{color: 'white', padding: '20px'}}>EduAdmin</h2>
        <nav>
          <button style={navBtn} onClick={() => setView('inicio')}>🏠 Inicio</button>
          <button style={navBtn} onClick={() => setView('alumnos')}>👥 Alumnos</button>
          {(user.rol === 'director' || user.rol === 'superadmin') && (
            <button style={navBtn} onClick={() => setView('reportes')}>📊 Reportes</button>
          )}
          <button style={navBtn} onClick={() => setView('asistencia')}>📝 Asistencia</button>
        </nav>
        <button onClick={() => setUser(null)} style={logoutBtn}>Cerrar Sesión</button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ flex: 1, padding: '30px', backgroundColor: '#f8f9fa', overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <h2>{view.toUpperCase()}</h2>
          <div style={{textAlign: 'right'}}>
            <strong>{user.nombre}</strong> <br />
            <span style={{fontSize: '12px', color: '#1a73e8'}}>{user.rol.toUpperCase()}</span>
          </div>
        </header>

        {/* VISTAS DINÁMICAS */}
        {view === 'inicio' && (
          <div style={gridStats}>
            <div style={statCard}><h3>120</h3><p>Alumnos</p></div>
            <div style={statCard}><h3>95%</h3><p>Asistencia Hoy</p></div>
            <div style={statCard}><h3>12</h3><p>Docentes</p></div>
          </div>
        )}
        
        {view === 'alumnos' && <p>Aquí irá la tabla de gestión de alumnos...</p>}
      </main>
    </div>
  )
}

// ESTILOS DE EDUADMIN
const loginContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f3f4' }
const loginCard = { backgroundColor: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', width: '350px', textAlign: 'center' as const }
const inputStyle = { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '4px', border: '1px solid #dadce0', boxSizing: 'border-box' as const }
const loginBtn = { width: '100%', padding: '12px', backgroundColor: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
const sidebarStyle = { width: '250px', backgroundColor: '#202124', color: 'white', display: 'flex', flexDirection: 'column' as const }
const navBtn = { width: '100%', padding: '15px', textAlign: 'left' as const, backgroundColor: 'transparent', color: '#bdc1c6', border: 'none', cursor: 'pointer', fontSize: '16px' }
const logoutBtn = { marginTop: 'auto', padding: '20px', backgroundColor: '#3c4043', color: 'white', border: 'none', cursor: 'pointer' }
const gridStats = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }
const statCard = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', textAlign: 'center' as const }

export default App