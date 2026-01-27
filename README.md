# Prueba Técnica Vue.js - Lista de Artículos

**Demo en vivo:** [https://prueba-tecnica-mp9jta1d4-gracianys-projects.vercel.app/](https://prueba-tecnica-mp9jta1d4-gracianys-projects.vercel.app/)

Aplicación web desarrollada con Vue 3, Pinia, TypeScript y TailwindCSS que consume la API de JSONPlaceholder para mostrar una lista de artículos con funcionalidades de búsqueda y paginación.

## Tecnologías

- **Vue 3** - Framework progresivo de JavaScript
- **Pinia** - Store para manejo de estado
- **TypeScript** - Tipado estático
- **TailwindCSS** - Framework de CSS utilitario
- **Axios** - Cliente HTTP para consumo de APIs
- **Vite** - Build tool y dev server
- **Vitest** - Framework de testing

## Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd prueba-tecnica-vue
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir en el navegador: `http://localhost:5173`

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run preview` | Preview del build de producción |
| `npm run test` | Ejecuta los tests en modo watch |
| `npm run test:run` | Ejecuta los tests una vez |

## Estructura del Proyecto

```
src/
├── api/
│   ├── postApi.ts              # Servicio para consumir la API
│   └── __tests__/
│       └── postApi.spec.ts     # Tests del servicio API
├── components/
│   ├── EmptyState.vue          # Componente para estados vacíos
│   ├── PostCard.vue            # Tarjeta de artículo
│   ├── SearchBar.vue           # Barra de búsqueda
│   └── __tests__/
│       ├── EmptyState.spec.ts  # Tests de EmptyState
│       ├── PostCard.spec.ts    # Tests de PostCard
│       └── SearchBar.spec.ts   # Tests de SearchBar
├── store/
│   ├── postsStore.ts           # Store de Pinia para posts
│   └── __tests__/
│       └── postsStore.spec.ts  # Tests del store
├── types/
│   └── Post.ts                 # Tipos TypeScript
├── views/
│   ├── PostDetail.vue          # Vista de detalle de artículo
│   └── PostsList.vue           # Vista de lista de artículos
├── App.vue                     # Componente raíz
├── main.ts                     # Punto de entrada
└── style.css                   # Estilos globales (TailwindCSS)
```

## Funcionalidades

### Funcionalidades Principales
- ✅ Lista de artículos con diseño responsivo
- ✅ Vista detallada de cada artículo
- ✅ Consumo de API REST (JSONPlaceholder)
- ✅ Manejo de estado con Pinia
- ✅ Tipado completo con TypeScript

### Funcionalidades Bonus
- ✅ Búsqueda de artículos por título (en tiempo real)
- ✅ Paginación (10 artículos por página)
- ✅ Tests unitarios (46 tests)

### Estados de UI
- ✅ Estado de carga (loading)
- ✅ Estado de error con opción de reintentar
- ✅ Estado vacío (sin resultados de búsqueda)

## Testing

El proyecto incluye 46 tests unitarios que cubren:

- **Store (postsStore)**: Estado inicial, fetchPosts, búsqueda, paginación, selectPost
- **Componentes**: PostCard, SearchBar, EmptyState
- **API**: Estructura de funciones

Ejecutar tests:
```bash
# Modo watch
npm run test

# Una sola ejecución
npm run test:run
```

## Diseño

- Tema oscuro con acentos en tonos esmeralda/teal
- Diseño responsivo (mobile-first)
- Animaciones y transiciones suaves
- Efectos hover en tarjetas y botones

## 📡 API

Se utiliza [JSONPlaceholder](https://jsonplaceholder.typicode.com) como API de prueba:

- `GET /posts` - Obtener todos los posts
- `GET /posts/:id` - Obtener un post por ID

## Licencia

Este proyecto fue desarrollado como prueba técnica por Graciany Baeza Jara.
