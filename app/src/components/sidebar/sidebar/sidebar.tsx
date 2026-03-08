import { menuConfig } from './menuLogic';
import './sidebar.css';

// Esta interfaz es CRUCIAL. Debe tener exactamente 10 propiedades.
interface SidebarProps {
  user: any;
  currentApp: string;
  setCurrentApp: (app: string) => void;
  view: string;
  setView: (view: string) => void;
  logout: () => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

export function Sidebar({ 
  user, 
  currentApp, 
  setCurrentApp, 
  view, 
  setView, 
  logout,
  selectedYear,
  setSelectedYear,
  selectedLevel,
  setSelectedLevel 
}: SidebarProps) {
  
  // Obtenemos la configuración de la app actual (EduAdmin, EduBank, etc.)
  const config = menuConfig[currentApp] || menuConfig['eduadmin'];

  return (
    <aside className="sidebar-container">
      {/* CABECERA: Logo y Selectores de contexto */}
      <div className="sidebar-header">
        <h2 className="brand-logo">{config.icon} {config.title}</h2>
        
        <div className="context-controls">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="context-select"
          >
            <option value="2025">Año Escolar 2025</option>
            <option value="2026">Año Escolar 2026</option>
          </select>

          <select 
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="context-select"
          >
            <option value="inicial">Nivel: Inicial</option>
            <option value="primaria">Nivel: Primaria</option>
            <option value="secundaria">Nivel: Secundaria</option>
          </select>
        </div>

        <div className="user-info">
          <span className="user-name">{user?.nombre || 'Usuario'}</span>
          <span className="user-role">{user?.rol || 'Sin Rol'}</span>
        </div>
      </div>

      {/* NAVEGACIÓN: Menús dinámicos por Rol */}
      <nav className="sidebar-nav">
        {config.sections.map((section: any) => {
          // Si el rol del usuario no está permitido en la sección, ocultarla
          if (!section.roles.includes(user?.rol)) return null;

          return (
            <div key={section.label} className="nav-section">
              <p className="section-title">{section.label}</p>
              {section.items.map((item: any) => {
                // Filtro adicional por item si tiene roles específicos
                if (item.roles && !item.roles.includes(user?.rol)) return null;
                
                return (
                  <button 
                    key={item.id}
                    className={`nav-item ${view === item.id ? 'active' : ''}`}
                    onClick={() => setView(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {item.label}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* LANZADOR DE APPS (Cambiar entre EduAdmin, EduBank, etc.) */}
      <div className="app-switcher">
        <p className="section-title">CAMBIAR MÓDULO</p>
        <div className="switcher-grid">
          <button title="EduAdmin" onClick={() => { setCurrentApp('eduadmin'); setView('inicio'); }}>🛡️</button>
          <button title="EduAsist" onClick={() => { setCurrentApp('eduasist'); setView('inicio'); }}>📝</button>
          <button title="EduBank" onClick={() => { setCurrentApp('edubank'); setView('inicio'); }}>💰</button>
          <button title="EduIA" onClick={() => { setCurrentApp('eduia'); setView('inicio'); }}>🤖</button>
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>🚪 Cerrar Sesión</button>
      </div>
    </aside>
  );
}
