import { useEffect, useState } from 'react'
import { supabase } from './supabase'

interface Alumno {
  id: string
  nombre: string
  apellido: string
  grado: string
}

function App() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([])

  useEffect(() => {
    getAlumnos()
  }, [])

  async function getAlumnos() {
    const { data } = await supabase.from('alumnos').select('*')
    if (data) setAlumnos(data)
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>🏫 Panel KipuEdu</h1>
      <h3>Lista de Estudiantes:</h3>
      
      {alumnos.length === 0 ? (
        <p>Cargando alumnos o no hay datos todavía...</p>
      ) : (
        <ul>
          {alumnos.map((alumno) => (
            <li key={alumno.id} style={{ marginBottom: '10px', fontSize: '18px' }}>
              {alumno.nombre} {alumno.apellido} - <span style={{ color: '#4da6ff' }}>{alumno.grado}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App