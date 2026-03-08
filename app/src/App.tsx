import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function App() {
  const [user, setUser] = useState<any>(null)
  const [dni, setDni] = useState('')
  const [pass, setPass] = useState('')
  const [alumnos, setAlumnos] = useState<any[]>([])

  async function manejarLogin(e: React.FormEvent) {
    e.preventDefault()
    const { data } = await supabase
      .from('personal')
      .select('*')
      .eq('dni', dni)
      .eq('password', pass)
      .single()

    if (data) {
      setUser(data)
      if (['superadmin', 'director', 'docente', 'auxiliar'].includes(data.rol)) {
        fetchAlumnos()
      }
    } else {
      alert('DNI o contraseña incorrectos')
    }
  }

  async function fetchAlumnos() {
    const { data } = await supabase.from('alumnos').select('*')
    if (data) setAlumnos(data)
  }

  if (!user) {
    return (
      <div style={loginContainer}>
        <div style={loginCard}>
          <h2 style={{color: '#2c3e50'}}>KIPUEDU</h2>
          <p>Acceso al Sistema</p>
          <form onSubmit={manejarLogin}>
            <input placeholder="Número de DNI" style={inputStyle} onChange={e => setDni(e.target.value)} />
            <input type="password" placeholder="Contraseña" style={inputStyle} onChange={e => setPass(e.target.value)} />
            <button type="submit" style={loginBtn}>Entrar como {dni.length > 0 ? 'Usuario' : '...'}</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <header style={headerStyle}>
        <div>
          <span style={badgeStyle}>{user.rol.toUpperCase()}</span>
          <h2>Bienvenido, {user.nombre}</h2>
        </div>
        <button onClick={() => setUser(null)}>Cerrar Sesión</button>
      </header>

      {/* VISTA SEGÚN ROL */}
      {['superadmin', 'director', 'docente', 'auxiliar'].includes(user.rol) ? (
        <div>
          <h3>📋 Control de Asistencia - Registro Diario</h3>
          {alumnos.map(a => (
            <div key={a.id} style={alumnoRow}>
              <span>{a.nombre} {a.apellido}</span>
              <div>
                <button style={btnP}>Presente</button>
                <button style={btnF}>Faltó</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
          <h3>Acceso limitado para {user.rol}</h3>
          <p>Próximamente: Consulta de notas y comunicados.</p>
        </div>
      )}
    </div>
  )
}

// ESTILOS RÁPIDOS
const loginContainer = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }
const loginCard = { backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'center' as const, width: '320px' }
const inputStyle = { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' as const }
const loginBtn = { width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', marginBottom: '20px' }
const badgeStyle = { backgroundColor: '#e1f5fe', color: '#01579b', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }
const alumnoRow = { display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee' }
const btnP = { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px', marginRight: '5px', borderRadius: '4px' }
const btnF = { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px', borderRadius: '4px' }

export default App