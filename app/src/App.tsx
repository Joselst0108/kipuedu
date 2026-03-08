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
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [grado, setGrado] = useState('')

  useEffect(() => {
    getAlumnos()
  }, [])

  async function getAlumnos() {
    const { data } = await supabase.from('alumnos').select('*').order('created_at', { ascending: false })
    if (data) setAlumnos(data)
  }

  async function agregarAlumno(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre || !apellido) return

    const { error } = await supabase
      .from('alumnos')
      .insert([{ nombre, apellido, grado }])

    if (error) {
      alert('Error al guardar: ' + error.message)
    } else {
      setNombre(''); setApellido(''); setGrado('');
      getAlumnos() // Refresca la lista automáticamente
    }
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>🏫 Panel KipuEdu</h1>

      {/* --- FORMULARIO NUEVO --- */}
      <form onSubmit={agregarAlumno} style={{ background: '#333', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Registrar Nuevo Alumno</h3>
        <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} style={inputStyle} />
        <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} style={inputStyle} />
        <input placeholder="Grado (ej: 3ero)" value={grado} onChange={e => setGrado(e.target.value)} style={inputStyle} />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4da6ff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Guardar Alumno</button>
      </form>

      {/* --- LISTA --- */}
      <h3>Lista de Estudiantes:</h3>
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.id} style={{ marginBottom: '10px', fontSize: '18px' }}>
            {alumno.nombre} {alumno.apellido} - <span style={{ color: '#4da6ff' }}>{alumno.grado}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const inputStyle = { padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #555' }

export default App