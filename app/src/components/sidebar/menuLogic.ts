export const menuConfig: any = {
  eduadmin: {
    title: 'EduAdmin',
    icon: '🛡️',
    sections: [
      {
        label: 'CONFIGURACIÓN MAESTRA',
        roles: ['superadmin'],
        items: [
          { id: 'crear-colegio', label: 'Crear Colegio', icon: '🏢' },
          { id: 'asignar-director', label: 'Asignar Director', icon: '🔑' },
          { id: 'asignar-planes', label: 'Asignar Planes', icon: '💎' },
          { id: 'auditoria-global', label: 'Auditoría Global', icon: '🕵️' }
        ]
      },
      {
        label: 'CONFIGURACIÓN',
        roles: ['superadmin', 'director'],
        items: [
          { id: 'crear-anio', label: 'Crear Año', icon: '📅' },
          { id: 'grados-secciones', label: 'Grados y Secciones', icon: '🏫' },
          { id: 'usuarios', label: 'Crear Usuarios', icon: '👥' },
          { id: 'malla-curricular', label: 'Malla Curricular', icon: '🗓️' }
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
        roles: ['superadmin', 'director', 'secretario', 'docente', 'apoderado', 'alumno'],
        items: [
          { id: 'cobros', label: 'Crear Cobros', icon: '💰', roles: ['superadmin', 'director'] },
          { id: 'inventario', label: 'Inventario', icon: '📦', roles: ['superadmin', 'director'] },
          { id: 'punto-venta', label: 'Caja', icon: '🏪', roles: ['director', 'secretario'] },
          { id: 'arqueo', label: 'Arqueo de Caja', icon: '📊', roles: ['director', 'secretario'] },
          { id: 'mis-pagos', label: 'Historial de Pagos', icon: '💳', roles: ['docente', 'apoderado', 'alumno'] }
        ]
      },
      {
        label: 'REPORTES',
        roles: ['superadmin', 'director'],
        items: [
          { id: 'reporte-pagos', label: 'Reporte de Pagos', icon: '📈' },
          { id: 'reporte-morosidad', label: 'Reporte Morosidad', icon: '🚨' }
        ]
      }
    ]
  },
  edubank: {
    title: 'EduBank',
    icon: '💰',
    sections: [
      {
        label: 'ECONOMÍA Y PREMIOS',
        roles: ['superadmin', 'director', 'docente', 'alumno', 'apoderado'],
        items: [
          { id: 'premios-castigos', label: 'Premiar / Castigar', icon: '🏆', roles: ['director', 'docente'] },
          { id: 'mi-billetera', label: 'Mi EduBank', icon: '🪙', roles: ['alumno', 'apoderado'] }
        ]
      }
    ]
  }
};