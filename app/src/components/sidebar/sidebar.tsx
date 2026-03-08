import React from 'react';
import { menuConfig } from './menuLogic';
import './sidebar.css';

// La interfaz DEBE coincidir con lo que envías desde App.tsx
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
  
  // Verificamos que la configuración exista, si no, cargamos eduadmin por defecto
  const config = menuConfig[currentApp] || menuConfig['eduadmin'];

  return (
    <aside className="sidebar-container">
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

      <nav className="sidebar-nav">
        {config.sections.map((section: any) => {
          // Filtro de seguridad por rol de sección
          if (!section.roles.includes(user.rol)) return null;

          return (
            <div key={section.label} className="nav-section">
              <p className="section-title">{section.label}</p>
              {section.items.map((item: any) => {
                // Filtro de seguridad por rol de item
                if (item.roles && !item.roles.includes(user.rol)) return null;
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

      <div className="app-switcher">
        <p className="section-title">CAMBIAR MÓDULO</p>
        <div className="switcher-grid">
          <button title="EduAdmin" onClick={() => setCurrentApp('eduadmin')}>🛡️</button>
          <button title="EduAsist" onClick={() => setCurrentApp('eduasist')}>📝</button>
          <button title="EduBank" onClick={() => setCurrentApp('edubank')}>💰</button>
          <button title="EduIA" onClick={() => setCurrentApp('eduia')}>🤖</button>
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>🚪 Cerrar Sesión</button>
      </div>
    </aside>
  );
}
