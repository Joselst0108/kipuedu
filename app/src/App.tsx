function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>🏫 Panel de Control KipuEdu</h1>
      <p>Bienvenido. La conexión con Supabase está lista.</p>
      <button onClick={() => alert('¡Funciona!')}>Probar Botón</button>
    </div>
  )
}

export default App