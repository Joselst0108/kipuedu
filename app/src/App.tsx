import { useState } from 'react' 
import { supabase } from './supabase"

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [view, setView] = useState('inicio')
  const [dni, setDni] = useState('')
  const [pass, setPass] = useState('')
  const [alumnos, setAlumnos] = useState<any[]>([])

  async function manejarLogin(e: any) {
    e.preventDefault()
    const { data, error } = await supabase
      .from('personal')
      .select('*')
      .eq('dni', dni)
      .eq('password', pass)
      .single()

    if (error) {
        alert('Acceso denegado: DNI o clave incorrectos')
    } else if (data) {
        setUser(data)
        fetchAlumnos()
    }
  }

  async function fetchAlumnos() {
    const { data } = await supabase.from('alumnos').select('*')
    if (data) setAlumnos(data)
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5', fontFamily: 'sans-serif' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: '320px', textAlign: 'center' }}>
          <h1 style={{ color: '#1a73e8' }}>KipuEdu</h1>
          <form onSubmit={manejarLogin}>
            <input placeholder="DNI" style={{ width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' }} onChange={e => setDni(e.target.value)} />
            <input type="password" placeholder="Contraseña" style={{ width: '100%', padding: '10px', margin: '10px 0', boxSizing: 'border-box' }} onChange={e => setPass(e.target.value)} />
            <button type="submit" style={{ width: '100%', padding: '10px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Entrar</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '240px', background: '#202124', color: 'white', padding: '20px' }}>
        <h2>EduAdmin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => setView('inicio')} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>🏠 Inicio</button>
          <button onClick={() => setView('alumnos')} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>👥 Alumnos</button>
          <button onClick={() => setUser(null)} style={{ textAlign: 'left', background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', marginTop: '20px' }}>Cerrar Sesión</button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '30px', background: '#f8f9fa' }}>
        <h1>{view.toUpperCase()}</h1>
        <p>Bienvenido, {user.nombre} ({user.rol})</p>
        <hr />
        {view === 'alumnos' && (
            <ul>
                {alumnos.map(a => <li key={a.id}>{a.nombre} {a.apellido}</li>)}
            </ul>
        )}
      </main>
    </div>
  )
}