# TrackDrive - Consulta de Internos

Proyecto web para seguimiento de estado de unidades con frontend React y backend Node/Express.

## Arquitectura actual
- Frontend: React 19 + Vite
- Backend: Express
- Fuente de datos: Google Sheets CSV consumido solo desde el servidor
- Deploy sugerido: un unico servicio en Render

## Por que este cambio protege mejor la hoja
Antes el navegador pegaba directo a Google Sheets, asi que la URL quedaba expuesta.
Ahora el navegador solo habla con `/api/vehicles` y la URL real del Sheet vive en la variable privada `SHEET_CSV_URL` del backend.

Importante: esto oculta la URL y evita exponerla en el cliente, pero si la hoja sigue publicada como CSV publico, la hoja sigue siendo publica para cualquiera que tenga esa URL. Para una proteccion completa, el siguiente paso es migrar a una hoja privada con credenciales de servicio o a una base de datos.

## Configuracion local
1. Instala dependencias con `npm install`
2. Crea `.env` a partir de `.env.example`
3. Define `SHEET_CSV_URL` con la URL CSV real de tu Google Sheet
4. En una terminal ejecuta `npm run dev:server`
5. En otra terminal ejecuta `npm run dev`

Vite hace proxy de `/api` a `http://localhost:3001`, asi que no necesitas exponer `VITE_API_URL` en desarrollo local.

## Endpoints del backend
- `GET /health`
- `GET /api/vehicles`
- `GET /api/vehicles/:interno`

## Deploy en Render
1. Sube este repo a GitHub
2. En Render crea un nuevo `Web Service`
3. Render detectara `render.yaml`
4. Configura la variable privada `SHEET_CSV_URL`
5. Despliega

El backend sirve el `dist/` del frontend y tambien responde la API desde el mismo dominio.
