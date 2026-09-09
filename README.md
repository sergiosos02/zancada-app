# Zancada

Aplicación web independiente para registrar calorías y pasos, con historial y objetivos diarios.

## Incluye
- Login y registro multiusuario con Supabase Auth.
- Datos aislados por usuario mediante Row Level Security (RLS).
- Historial de los últimos 7 días.
- Registro de comidas y pasos.
- Metas configurables.
- Diseño responsive.
- Preparada para publicar en Vercel, Netlify, GitHub Pages (con backend Supabase) u otro hosting estático.

## Puesta en marcha
1. Crea un proyecto en Supabase.
2. Ejecuta `supabase.sql` en el SQL Editor.
3. Copia `.env.example` a `.env` y completa las variables.
4. `npm install`
5. `npm run dev`
6. Para producción: `npm run build` y publica `dist/`.

> La clave `VITE_SUPABASE_ANON_KEY` es una clave pública de frontend; la seguridad real de los datos la proporcionan las políticas RLS. Nunca introduzcas una service role key en el frontend.
