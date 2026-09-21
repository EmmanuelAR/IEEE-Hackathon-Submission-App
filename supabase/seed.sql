-- Optional: two fake submissions for local/admin testing.
-- Run after schema.sql.

insert into public.submissions (
  id,
  status,
  team_name,
  members,
  contact_email,
  one_liner,
  problem,
  solution,
  prototype_type,
  prototype_url,
  pitch_slides_url,
  github_url,
  video_url,
  notes,
  clasypcs_confirmed
) values
(
  '11111111-1111-4111-8111-111111111111',
  'received',
  'Páginas Vivas',
  '[
    {"name":"Ana Solís","email":"ana.solis@example.com"},
    {"name":"Diego Mora","email":"diego.mora@example.com"}
  ]'::jsonb,
  'ana.solis@example.com',
  'Clásicos que se leen como un juego de decisiones.',
  'A los 8–15 años les cuesta entrar a un libro largo. El aula lo vuelve tarea y el teléfono gana.',
  'Una demo con IA que convierte un capítulo en caminos cortos, voz y autor local. El joven elige y termina el texto.',
  'llm_demo',
  'https://example.com/paginas-vivas',
  'https://example.com/paginas-vivas-pitch',
  'https://github.com/example/paginas-vivas',
  null,
  'Queremos probar con El principito y un cuento de Carmen Lyra.',
  true
),
(
  '22222222-2222-4222-8222-222222222222',
  'reviewed',
  'Eco de Letras',
  '[
    {"name":"Mariana Chen","email":"mariana.chen@example.com"},
    {"name":"Luis Vargas","email":"luis.vargas@example.com"},
    {"name":"Sofía Brenes","email":"sofia.brenes@example.com"}
  ]'::jsonb,
  'mariana.chen@example.com',
  'Cinco minutos al día con un autor de Costa Rica.',
  'La lectura diaria se siente tediosa cuando el texto no habla de su mundo.',
  'Mockup de un ritual de 5 minutos: un fragmento local, una pregunta y un audio generado. IA solo para adaptar el tono, no para reemplazar al autor.',
  'figma',
  'https://www.figma.com/file/example-eco-de-letras',
  'https://example.com/eco-de-letras-slides',
  null,
  'https://example.com/eco-de-letras-video',
  'Prototipo en Figma + clip de 40 segundos.',
  true
)
on conflict (team_name) do nothing;
