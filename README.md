# Grok Bot Hackathon San José

App de envíos para el Hackathon Lectura @ CLASYPCS. Registro en [Luma](https://luma.com/3ydsbpap). Esta app solo recibe proyectos.

- `/` landing
- `/submit` formulario
- `/gracias` confirmación con id
- `/admin` lista, detalle y CSV (contraseña)

## Stack

Next.js App Router, TypeScript, Tailwind, Supabase.

## Setup local

```bash
npm install
cp .env.example .env.local
```

Completa `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
```

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Supabase

1. Crea un proyecto (el plan Free alcanza).
2. Project Settings → API: copia URL, `anon` public key y `service_role`.
3. SQL Editor: corre [`supabase/schema.sql`](supabase/schema.sql).
4. Opcional, dos envíos de prueba: [`supabase/seed.sql`](supabase/seed.sql).

### Schema

Tabla `event_settings` (una fila): `submissions_open`. El admin abre o cierra los envíos.

Tabla `submissions`:

- `id` uuid, `created_at`, `status` (`received` | `reviewed`)
- `team_name` **único**
- `members` jsonb `[{ name, email }]` (1–4)
- `contact_email`, `one_liner`, `problem`, `solution`
- `prototype_type`: `slides` | `figma` | `llm_demo` | `video` | `other`
- `prototype_url`, `pitch_slides_url`, `github_url`, `video_url`
- `file_path` (Storage, opcional)
- `notes`, `clasypcs_confirmed`

Si el nombre de equipo ya existe, el formulario muestra: *Ya existe un equipo con este nombre. Elige otro o agrega un sufijo.* No se sobrescribe.

### RLS

- INSERT público (`anon` / `authenticated`)
- Sin SELECT/UPDATE/DELETE públicos
- Admin usa `SUPABASE_SERVICE_ROLE_KEY` (salta RLS)

Bucket privado `submissions` (PDF/PNG/ZIP, 20 MB). Subidas y descargas firmadas van por service role.

## Vercel

Proyecto sugerido: `grok-bot-hackathon-sj` en el team [emmanuelars-projects](https://vercel.com/emmanuelars-projects).

Variables de entorno (Production):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`

```bash
vercel --prod --scope emmanuelars-projects
```

## Fuera de alcance

UI de jueces, sync con Luma, galería pública, chat.
