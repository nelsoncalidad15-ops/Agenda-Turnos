# Google Apps Script: Endpoint JSON para Google Sheets

Este código debe ser pegado en el Editor de Apps Script de tu planilla de Google.

## Instrucciones de Instalación
1. Abre tu Google Sheet.
2. Ve a **Extensiones** > **Apps Script**.
3. Borra el código existente y pega lo siguiente.
4. Haz clic en **Implementar** > **Nueva implementación**.
5. Selecciona **Aplicación web**.
6. En "Quién tiene acceso", selecciona **Cualquiera** (esto permite que el frontend lo consulte).
7. Copia la URL generada y pégala en tu archivo `.env` o configúrala como `VITE_API_URL`.

## Código (GAS)

```javascript
/**
 * Procesa la solicitud GET del frontend
 */
function doGet(e) {
  const interno = e.parameter.interno;
  
  if (!interno) {
    return createJsonResponse({ ok: false, message: "Parámetro 'interno' es requerido" });
  }

  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    // Buscar la fila por el valor de Interno
    // Suponemos que 'Interno' es una columna. Buscamos su índice.
    const internoIdx = headers.findIndex(h => h.toString().toLowerCase() === "interno");
    
    if (internoIdx === -1) {
      return createJsonResponse({ ok: false, message: "Configuración de hoja inválida: Falta columna 'Interno'" });
    }

    const row = data.find((r, i) => i > 0 && r[internoIdx].toString() === interno.toString());

    if (!row) {
      return createJsonResponse({ ok: false, message: "No se encontró información para el interno ingresado" });
    }

    // Mapear fila a objeto JSON usando headers
    const result = {};
    headers.forEach((header, index) => {
      const key = camelize(header.toString());
      result[key] = row[index];
    });

    return createJsonResponse({ ok: true, data: result });

  } catch (error) {
    return createJsonResponse({ ok: false, message: "Error interno: " + error.toString() });
  }
}

/**
 * Helper para formatear respuesta JSON con CORS
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Convierte strings a camelCase seguro para el frontend
 * Ej: "N° Operación" -> "nOperacion", "Ubicación" -> "ubicacion"
 */
function camelize(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
    .replace(/[^\w\s]/gi, '') // Quitar caracteres especiales como °
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}
```

## Configuración de Columnas
Asegúrate de que tu hoja tenga exactamente estos nombres (o similares, el script los camelizará):
- Estado
- Interno
- Cliente
- Tipo de Venta
- Tipo de Cliente
- Vendedor
- Modelo
- VIN
- Dominio
- Color
- Ubicación
- Teléfono
- Mail