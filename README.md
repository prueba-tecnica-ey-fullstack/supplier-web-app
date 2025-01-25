# Aplicación web para Debida Diligencia de Proveedores y Cruce con Listas de Alto Riesgo

## Objetivo
El objetivo de este proyecto es desarrollar una aplicación web que facilite el proceso de debida diligencia de proveedores. La aplicación permitirá a los usuarios ingresar información relevante sobre los proveedores y realizar un cruce automático con listas de alto riesgo (screening) para identificar posibles asociaciones de riesgo. La aplicación debe ser eficiente y fácil de usar.

## Enfoque
Se busca implementar tecnologías propuestas para realizar una aplicación web **SPA (Single Page Application)** que permita administrar un inventario de empresas y realizar el cruce con las listas de alto riesgo del ejercicio anterior.

---

## Tecnologías
- **Lenguajes de programación y frameworks**:
  - Back-end: .NET Framework
  - Front-end: React
- **Base de datos**:
  - SQL Server

## Requerimientos
### Funcionalidades principales:
- Creación, edición y eliminación de proveedores.
- Cada proveedor deberá incluir los siguientes campos:
  - **Razón social**: Alfanumérico
  - **Nombre comercial**: Alfanumérico
  - **Identificación tributaria**: Numérico (11 dígitos)
  - **Número telefónico**: Tipo teléfono
  - **Correo electrónico**: Tipo correo
  - **Sitio web**: Tipo URL (con redirección a la página web)
  - **Dirección física**: Alfanumérico
  - **País**: Tipo alfanumérico o desplegable de opciones
  - **Facturación anual en dólares**: Tipo numérico (formato contabilidad)
- **Fechas de edición**:
  - Tipo fecha y hora para la creación y última edición de cada proveedor.

### Validaciones:
- Los formularios y acciones deberán contar con validación según el tipo de dato establecido y mostrar mensajes de error amigables para el usuario.

### Funcionalidades avanzadas:
- Listado de proveedores por proveedor:
  - Ver, editar y eliminar.
  - Opción de "screening" para realizar un cruce con listas de alto riesgo.
- La opción de screening deberá abrir una ventana emergente y mostrar los resultados del cruce con la lista seleccionada:
 - Tras el cruce, deberá conectarse con la API externa y traer los resultados.

- Opciones de filtro y ordenamiento

### Experiencia del usuario:
- La aplicación es una SPA (**Single Page Application**) que carga dinámicamente el contenido sin recargar la página.

### Notas adicionales
Este proyecto tiene como objetivo crear una herramienta moderna y eficiente para el manejo de proveedores y la gestión del riesgo asociado. Las funcionalidades y tecnologías están orientadas a ofrecer una experiencia amigable y robusta para los usuarios finales.

### Requisitos previos
1. Tener instalado **Node.js** (version latest).
2. Tener instalado **npm** o **yarn** (se incluye con Node.js).

### Pasos para iniciar
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/prueba-tecnica-ey-fullstack/supplier-web-app
   cd supplier-web-app
   ```

2. Crea un archivo `.env` tomando como plantilla `.env.template`

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador:
   - Vite mostrará un enlace en la consola (por ejemplo, http://localhost:1234)
   - Abre ese enlace en tu navegador para ver la aplicación.