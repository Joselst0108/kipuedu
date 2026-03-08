import { useEffect, useState } from 'react'
import { supabase } from './supabase'

function App() {
  const [alumnos, setAlumnos] = useState<any[]>([])
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    fetchAlumnos()
  }, [])

  async function fetchAlumnos() {
    const { data } = await supabase.from('alumnos').select('*').eq('estado', true)
    if (data) setAlumnos(data)
  }

  async function marcarAsistencia(alumnoId: string, estuvoPresente: boolean) {
    const { error } = await supabase
      .from('asistencia')
      .insert([
        { alumno_id: alumnoId, presente: estuvoPresente, fecha: new Date().toISOString().split('T')[0] }
      ])

    if (error) {
      setMensaje('Error: ' + error.message)
    } else {
      setMensaje('✅ Asistencia guardada correctamente')
      setTimeout(() => setMensaje(''), 3000)
    }
  }

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 style={{ color: '#2c3e50' }}>KipuEdu: Control de Asistencia</h1>
      <p style={{ color: '#7f8c8d' }}>Fecha de hoy: {new Date().toLocaleDateString()}</p>
      
      {mensaje && <div style={{ padding: '10px', backgroundColor: '#d4edda', color: '#155724', marginBottom: '20px', borderRadius: '5px' }}>{mensaje}</div>}

      <div style={{ display: 'grid', gap: '15px' }}>
        {alumnos.map((alumno) => (
          <div key={alumno.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{alumno.nombre} {alumno.apellido}</span>
            <div>
              <button 
                onClick={() => marcarAsistencia(alumno.id, true)}
                style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}
              >Presente</button>
              <button 
                onClick={() => marcarAsistencia(alumno.id, false)}
                style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
              >Faltó</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App