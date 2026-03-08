export const menuConfig: any = {
  eduadmin: {
    title: 'EduAdmin',
    icon: '🛡️',
    sections: [
      {
        label: 'SISTEMA Y COLEGIOS',
        roles: ['superadmin'],
        items: [
          { id: 'crear-colegio', label: 'Crear Colegio', icon: '🏢' },
          { id: 'asignar-director', label: 'Asignar Director', icon: '🔑' },
          { id: 'auditoria-global', label: 'Auditoría Global', icon: '🕵️' }
        ]
      },
      {
        label: 'CONFIGURACIÓN',
        roles: ['superadmin', 'director'],
        items: [
          { id: 'crear-anio', label: 'Año Académico', icon: '📅' },
          { id: 'grados-secciones', label: 'Grados y Secciones', icon: '🏫' },
          { id: 'usuarios', label: 'Gestión de Usuarios', icon: '👥' }
        ]
      },
      {
        label: 'MATRÍCULA',
        roles: ['superadmin', 'director', 'secretario'],
        items: [
          { id: 'nueva-matricula', label: 'Matricular Alumno', icon: '📝' },
          { id: 'lista-alumnos', label: 'Lista de Alumnos', icon: '📋' }
        ]
      },
      {
        label: 'FINANZAS',
        roles: ['superadmin', 'director', 'secretario', 'apoderado', 'alumno'],
        items: [
          { id: 'punto-venta', label: 'Caja (Cobros)', icon: '🏪', roles: ['superadmin', 'director', 'secretario'] },
          { id: 'arqueo', label: 'Arqueo de Caja', icon: '📊', roles: ['superadmin', 'director', 'secretario'] },
          { id: 'inventario', label: 'Inventario / Tienda', icon: '📦', roles: ['superadmin', 'director', 'secretario'] },
          { id: 'mis-pagos', label: 'Mi Historial de Pagos', icon: '💳', roles: ['apoderado', 'alumno'] }
        ]
      }
    ]
  },
  edubank: {
    title: 'EduBank',
    icon: '💰',
    sections: [
      {
        label: 'GESTIÓN DE PUNTOS',
        roles: ['superadmin', 'director', 'docente'],
        items: [
          { id: 'asignar-puntos', label: 'Premiar Alumno', icon: '🏆' },
          { id: 'multas', label: 'Aplicar Multa', icon: '⚖️' },
          { id: 'tienda-premios', label: 'Gestionar Premios', icon: '🎁' }
        ]
      },
      {
        label: 'MI BILLETERA',
        roles: ['alumno', 'apoderado'],
        items: [
          { id: 'mi-saldo', label: 'Ver mis KipuCoins', icon: '🪙' },
          { id: 'canjear', label: 'Canjear Puntos', icon: '🛍️' }
        ]
      }
    ]
  },
  eduasist: {
    title: 'EduAsist',
    icon: '📝',
    sections: [
      {
        label: 'CONTROL DIARIO',
        roles: ['superadmin', 'director', 'docente'],
        items: [
          { id: 'asistencia', label: 'Pasar Asistencia', icon: '✅' },
          { id: 'notas', label: 'Registro de Notas', icon: '📊' },
          { id: 'comportamiento', label: 'Incidentes', icon: '⚠️' }
        ]
      }
    ]
  },
  eduia: {
    title: 'EduIA',
    icon: '🤖',
    sections: [
      {
        label: 'ANÁLISIS IA',
        roles: ['superadmin', 'director'],
        items: [
          { id: 'prediccion', label: 'Riesgo de Deserción', icon: '🧠' },
          { id: 'reporte-ia', label: 'Informe Mensual IA', icon: '📈' }
        ]
      }
    ]
  }
};