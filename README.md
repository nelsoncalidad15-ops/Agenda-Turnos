# Agenda Turnos

Proyecto web profesional para gestión de turnos y seguimiento de estado de unidades.

## Tecnologías
- **Frontend**: React 19 + Vite + Tailwind CSS 4
- **Animaciones**: Motion
- **Iconografía**: Lucide React
- **Backend**: Google Apps Script (actual) / preparado para base de datos (futuro)

## Configuración Local
1. Instala dependencias: `npm install`
2. Crea un archivo `.env` basado en `.env.example`
3. Agrega `VITE_API_URL="TU_URL_DE_APPS_SCRIPT"`
4. Ejecuta: `npm run dev`

## Publicación en GitHub Pages
1. Asegúrate de que `vite.config.ts` tenga la propiedad `base: './'` o similar.
2. Ejecuta `npm run build`.
3. Sube el contenido de `dist/` a la rama `gh-pages` o configura GitHub Actions.

## Configuración para GitHub Pages (Vite)
En `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/nombre-de-tu-repo/',
  // ... resto de la config
})
```

## Migración a Supabase / Postgres (Futuro)
Para migrar el sistema a una base de datos real:
1. Crea tu tabla `vehiculos` en Supabase con las columnas definidas en `src/types/vehicle.ts`.
2. Actualiza `src/services/vehicleService.ts`.
3. Cambia la implementación de `getByInterno` para usar el cliente de Supabase:
   ```typescript
   import { supabase } from '../lib/supabase';

   const { data, error } = await supabase
     .from('vehiculos')
     .select('*')
     .eq('interno', interno)
     .single();
   ```
4. No necesitas cambiar nada en la UI, ya que la lógica está desacoplada.

## Modo Demo
Si no configuras `VITE_API_URL`, la aplicación funcionará en **Modo Demo** usando datos precargados para los internos `46546` y `12345`.