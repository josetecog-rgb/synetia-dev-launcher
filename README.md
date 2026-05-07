# SynetIA Dev Launcher

Herramienta para configurar proyectos de desarrollo con IA de forma automática.
Genera archivos de configuración específicos para cada entorno (Claude Code, Antigravity, Opencode, VS Code + extensiones, etc.)

## ¿Qué hace?

1. Seleccionas tu entorno de trabajo (Claude Code, Opencode, VS Code+Cline, etc.)
2. Defines tu proyecto y mejoras tu idea con IA (Gemini gratis)
3. Seleccionas las APIs de IA que usarás (35+ disponibles)
4. Seleccionas MCPs y repositorios de skills
5. Configuras tus reglas inviolables de trabajo
6. Descarga un `setup.js` que al ejecutarlo configura TODO automáticamente

## Uso local

```bash
npm install
npm run dev
```

## Deploy en Vercel

Conecta este repositorio en vercel.com — se deploya automáticamente.

## Tecnologías

- React 18 + Vite
- Sin backend — todo corre en el navegador
- Gemini Flash API (gratis) para mejorar ideas
