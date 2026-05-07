import { useState, useRef, useEffect } from "react";

// ============================================================
// DATOS: APIs de IA disponibles
// ============================================================
const AI_APIS = [
  // GRATUITAS SIN TARJETA
  { id: "gemini", name: "Google AI Studio (Gemini)", tier: "free", domain: "general", url: "https://aistudio.google.com/apikey", models: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.5-flash-lite"], notes: "10-15 RPM gratis, sin tarjeta" },
  { id: "groq", name: "Groq", tier: "free", domain: "general", url: "https://console.groq.com/keys", models: ["llama-3.3-70b", "llama-3.1-8b", "mixtral-8x7b", "whisper-large-v3"], notes: "Velocidad extrema, free tier generoso" },
  { id: "openrouter", name: "OpenRouter", tier: "free", domain: "general", url: "https://openrouter.ai/keys", models: ["deepseek/deepseek-r1:free", "qwen/qwen3-coder-480b:free", "meta-llama/llama-4-maverick:free", "google/gemini-2.5-pro-exp:free"], notes: "~29 modelos :free disponibles" },
  { id: "cerebras", name: "Cerebras", tier: "free", domain: "general", url: "https://cloud.cerebras.ai", models: ["llama-3.3-70b", "qwen3-235b", "llama-3.1-8b"], notes: "1M tokens/día gratis, sin tarjeta" },
  { id: "sambanova", name: "SambaNova Cloud", tier: "free", domain: "general", url: "https://cloud.sambanova.ai", models: ["llama-3.1-405b", "llama-3.3-70b", "qwen-2.5-72b"], notes: "Free tier persistente" },
  { id: "mistral", name: "Mistral La Plateforme", tier: "free", domain: "general", url: "https://console.mistral.ai", models: ["mistral-large-2", "mistral-small", "codestral", "devstral-small"], notes: "Tier Experiment gratuito" },
  { id: "cohere", name: "Cohere", tier: "free", domain: "general", url: "https://dashboard.cohere.com/api-keys", models: ["command-r-plus", "command-r", "embed-v4", "rerank-v3"], notes: "1000 req/mes trial" },
  { id: "nvidia-nim", name: "NVIDIA NIM", tier: "free", domain: "general", url: "https://build.nvidia.com", models: ["deepseek-r1", "qwen3-235b", "llama-3.1-405b", "mistral-large"], notes: "1000-5000 créditos, 80+ modelos, 40 RPM" },
  { id: "github-models", name: "GitHub Models", tier: "free", domain: "general", url: "https://github.com/marketplace/models", models: ["gpt-4o", "gpt-4.1", "o3", "grok-3", "deepseek-r1", "llama-4"], notes: "~30 modelos, 10 RPM free" },
  { id: "cloudflare", name: "Cloudflare Workers AI", tier: "free", domain: "general", url: "https://dash.cloudflare.com", models: ["llama-4-scout", "qwen-2.5-coder", "deepseek-r1", "flux-1-schnell", "whisper"], notes: "10k neurons/día, multimodal" },
  { id: "huggingface", name: "Hugging Face Inference", tier: "free", domain: "general", url: "https://huggingface.co/settings/tokens", models: ["meta-llama/Llama-3.1-70B", "mistralai/Mistral-7B", "BAAI/bge-large"], notes: "Créditos mensuales incluidos" },
  { id: "deepseek-free", name: "DeepSeek API (créditos iniciales)", tier: "free", domain: "general", url: "https://platform.deepseek.com", models: ["deepseek-chat", "deepseek-reasoner"], notes: "5M tokens gratis al registrarse (30 días)" },
  { id: "xai", name: "xAI Grok", tier: "free", domain: "general", url: "https://console.x.ai", models: ["grok-4", "grok-4.1-fast", "grok-3-mini"], notes: "$25 créditos al registrarse" },
  { id: "jina", name: "Jina AI", tier: "free", domain: "embeddings", url: "https://jina.ai", models: ["jina-embeddings-v3", "jina-embeddings-v4", "jina-reranker-v2"], notes: "10M tokens iniciales gratis" },
  { id: "tavily", name: "Tavily Search", tier: "free", domain: "search", url: "https://tavily.com", models: ["tavily-search", "tavily-extract"], notes: "1000 créditos/mes gratis" },
  { id: "deepl", name: "DeepL API Free", tier: "free", domain: "translation", url: "https://www.deepl.com/pro-api", models: ["deepl-translate"], notes: "500k caracteres/mes gratis" },
  { id: "deepgram", name: "Deepgram", tier: "free", domain: "audio", url: "https://console.deepgram.com", models: ["nova-3", "nova-2", "aura-tts"], notes: "$200 créditos sin expiración, sin tarjeta" },
  { id: "assemblyai", name: "AssemblyAI", tier: "free", domain: "audio", url: "https://www.assemblyai.com", models: ["universal-streaming", "best"], notes: "$50 créditos gratis (~185 horas)" },
  // PAGAS POPULARES
  { id: "anthropic", name: "Anthropic (Claude)", tier: "paid", domain: "general", url: "https://console.anthropic.com", models: ["claude-sonnet-4-6", "claude-opus-4-6", "claude-haiku-4-5"], notes: "Mejor para código complejo" },
  { id: "openai", name: "OpenAI", tier: "paid", domain: "general", url: "https://platform.openai.com/api-keys", models: ["gpt-4.1", "o3", "o4-mini", "gpt-4o"], notes: "Referencia de la industria" },
  { id: "deepseek-paid", name: "DeepSeek API (pago)", tier: "paid", domain: "general", url: "https://platform.deepseek.com", models: ["deepseek-chat", "deepseek-reasoner"], notes: "$0.27/M tokens — muy económico" },
  { id: "gemini-paid", name: "Google Gemini (pago)", tier: "paid", domain: "general", url: "https://aistudio.google.com", models: ["gemini-2.5-pro", "gemini-3-pro", "veo-3"], notes: "1M contexto, multimodal" },
  { id: "perplexity", name: "Perplexity Sonar", tier: "paid", domain: "search", url: "https://www.perplexity.ai/api", models: ["sonar-pro", "sonar-reasoning-pro"], notes: "Búsqueda en tiempo real" },
  { id: "together", name: "Together AI", tier: "paid", domain: "general", url: "https://api.together.xyz", models: ["llama-3.1-405b", "qwen-2.5-72b", "flux-1-schnell"], notes: "Buena relación precio/calidad" },
  { id: "fireworks", name: "Fireworks AI", tier: "paid", domain: "general", url: "https://fireworks.ai", models: ["llama-4-maverick", "qwen3-235b", "firefunction-v2"], notes: "Velocidad alta, precios bajos" },
  { id: "replicate", name: "Replicate", tier: "paid", domain: "images", url: "https://replicate.com", models: ["flux-1.1-pro", "flux-schnell", "google/imagen-4", "ideogram-v3"], notes: "Pay-per-second, miles de modelos" },
  { id: "falai", name: "Fal.ai", tier: "paid", domain: "images", url: "https://fal.ai", models: ["flux-pro", "seedream-v4.5", "recraft-v3", "kling-video-v3"], notes: "1000+ modelos imagen/video" },
  { id: "stability", name: "Stability AI", tier: "paid", domain: "images", url: "https://platform.stability.ai", models: ["stable-diffusion-3.5", "stable-image-ultra", "sdxl"], notes: "25 créditos/mes gratis" },
  { id: "elevenlabs", name: "ElevenLabs", tier: "paid", domain: "audio", url: "https://elevenlabs.io", models: ["eleven-flash-v2", "eleven-multilingual-v2", "eleven-v3"], notes: "10k chars/mes gratis" },
  { id: "runwayml", name: "Runway ML", tier: "paid", domain: "video", url: "https://runwayml.com", models: ["gen-4", "gen-3-alpha-turbo"], notes: "Generación de video IA" },
  { id: "roboflow", name: "Roboflow", tier: "paid", domain: "vision", url: "https://roboflow.com", models: ["roboflow-3", "yolo-world"], notes: "Computer vision especializado" },
  { id: "voyageai", name: "Voyage AI", tier: "paid", domain: "embeddings", url: "https://www.voyageai.com", models: ["voyage-3-large", "voyage-4-large", "voyage-code-3"], notes: "200M tokens gratis iniciales" },
  { id: "cohere-paid", name: "Cohere (pago)", tier: "paid", domain: "embeddings", url: "https://dashboard.cohere.com", models: ["embed-v4", "rerank-v3.5", "command-r-plus"], notes: "Especializado en RAG" },
  { id: "moonshot", name: "Moonshot AI (Kimi)", tier: "paid", domain: "general", url: "https://platform.moonshot.cn", models: ["kimi-k2", "kimi-vl"], notes: "Créditos iniciales disponibles" },
  { id: "hyperbolic", name: "Hyperbolic", tier: "paid", domain: "general", url: "https://app.hyperbolic.xyz", models: ["llama-3.1-405b", "deepseek-v3", "qwen-2.5-72b"], notes: "$1 trial credits" },
];

// ============================================================
// DATOS: Entornos de desarrollo
// ============================================================
const ENVIRONMENTS = [
  {
    id: "claude-code",
    name: "Claude Code",
    icon: "⬡",
    color: "#D4A843",
    description: "CLI agente de Anthropic para terminal",
    instructionsFile: "CLAUDE.md",
    configFolder: ".claude/",
    mcpFile: ".mcp.json",
    extraFiles: [".claude/settings.json", ".claude/commands/", ".claude/skills/"],
    recommendedApis: ["anthropic", "openrouter"],
    installCmd: "npm install -g @anthropic-ai/claude-code",
  },
  {
    id: "antigravity",
    name: "Antigravity (Google)",
    icon: "◈",
    color: "#4285F4",
    description: "IDE agente de Google con Gemini integrado",
    instructionsFile: "AGENTS.md",
    configFolder: ".gemini/",
    mcpFile: "UI (MCP Store)",
    extraFiles: [".gemini/GEMINI.md"],
    recommendedApis: ["gemini", "gemini-paid"],
    installCmd: "Descargar desde antigravity.google/download",
  },
  {
    id: "opencode",
    name: "Opencode (SST)",
    icon: "◎",
    color: "#E8663D",
    description: "Agente de código open source para terminal",
    instructionsFile: "AGENTS.md",
    configFolder: ".opencode/",
    mcpFile: "opencode.jsonc (clave mcp:)",
    extraFiles: ["opencode.jsonc", ".opencode/agents/"],
    recommendedApis: ["anthropic", "openrouter", "deepseek-paid"],
    installCmd: "curl -fsSL https://opencode.ai/install | bash",
  },
  {
    id: "codex-cli",
    name: "Codex CLI (OpenAI)",
    icon: "⬟",
    color: "#10A37F",
    description: "CLI agente de OpenAI para terminal",
    instructionsFile: "AGENTS.md",
    configFolder: "~/.codex/",
    mcpFile: "~/.codex/config.toml ([mcp_servers])",
    extraFiles: ["AGENTS.override.md", ".codex/config.toml"],
    recommendedApis: ["openai", "groq"],
    installCmd: "npm install -g @openai/codex",
  },
  {
    id: "vscode-copilot",
    name: "VS Code + GitHub Copilot",
    icon: "◉",
    color: "#0078D4",
    description: "VS Code con GitHub Copilot oficial",
    instructionsFile: ".github/copilot-instructions.md",
    configFolder: ".github/",
    mcpFile: ".vscode/mcp.json",
    extraFiles: [".github/agents/", ".vscode/settings.json"],
    recommendedApis: ["openai", "anthropic"],
    installCmd: "Instalar extensión: GitHub Copilot en VS Code",
  },
  {
    id: "vscode-claude",
    name: "VS Code + Claude (Cline)",
    icon: "◈",
    color: "#D4A843",
    description: "VS Code con extensión Cline usando API de Anthropic",
    instructionsFile: ".clinerules/",
    configFolder: ".clinerules/",
    mcpFile: "UI Cline / cline_mcp_settings.json",
    extraFiles: [".clinerules/main.md", ".clinerules/project.md"],
    recommendedApis: ["anthropic", "openrouter"],
    installCmd: "Instalar extensión: Cline en VS Code",
  },
  {
    id: "vscode-deepseek",
    name: "VS Code + DeepSeek",
    icon: "◑",
    color: "#4D6BFE",
    description: "VS Code con Continue.dev o Cline usando DeepSeek API",
    instructionsFile: ".continue/rules/ o .clinerules/",
    configFolder: ".continue/",
    mcpFile: ".continue/config.yaml (mcpServers:)",
    extraFiles: [".continue/config.yaml", ".continue/rules/main.md"],
    recommendedApis: ["deepseek-paid", "deepseek-free", "openrouter"],
    installCmd: "Instalar extensión: Continue.dev en VS Code",
  },
  {
    id: "vscode-roo",
    name: "VS Code + Roo Code",
    icon: "◐",
    color: "#7C3AED",
    description: "VS Code con Roo Code, multi-modelo y multi-modo",
    instructionsFile: ".roo/rules/",
    configFolder: ".roo/",
    mcpFile: ".roo/mcp.json",
    extraFiles: [".roo/rules/main.md", ".roomodes"],
    recommendedApis: ["anthropic", "openrouter", "deepseek-paid"],
    installCmd: "Instalar extensión: Roo Code en VS Code",
  },
  {
    id: "vscode-continue",
    name: "VS Code + Continue.dev",
    icon: "◌",
    color: "#06B6D4",
    description: "VS Code con Continue.dev, multi-proveedor open source",
    instructionsFile: ".continue/rules/*.md",
    configFolder: ".continue/",
    mcpFile: ".continue/config.yaml (mcpServers:)",
    extraFiles: [".continue/config.yaml", ".continue/rules/"],
    recommendedApis: ["anthropic", "groq", "deepseek-paid", "mistral"],
    installCmd: "Instalar extensión: Continue en VS Code",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    icon: "◇",
    color: "#FBBC04",
    description: "CLI agente de Google con Gemini Flash/Pro",
    instructionsFile: "GEMINI.md",
    configFolder: "~/.gemini/",
    mcpFile: "~/.gemini/settings.json",
    extraFiles: ["GEMINI.md", ".gemini/settings.json"],
    recommendedApis: ["gemini", "gemini-paid"],
    installCmd: "npm install -g @google/gemini-cli",
  },
];

// ============================================================
// DATOS: MCPs verificados
// ============================================================
const MCP_SERVERS = [
  { id: "filesystem", name: "Filesystem", category: "core", repo: "modelcontextprotocol/servers", description: "Lectura/escritura de archivos con permisos", command: "npx -y @modelcontextprotocol/server-filesystem" },
  { id: "git", name: "Git", category: "core", repo: "modelcontextprotocol/servers", description: "Leer, buscar y manipular repos Git", command: "npx -y @modelcontextprotocol/server-git" },
  { id: "memory", name: "Memory", category: "core", repo: "modelcontextprotocol/servers", description: "Knowledge graph persistente entre sesiones", command: "npx -y @modelcontextprotocol/server-memory" },
  { id: "fetch", name: "Fetch", category: "core", repo: "modelcontextprotocol/servers", description: "Descarga y convierte contenido web", command: "npx -y @modelcontextprotocol/server-fetch" },
  { id: "sequential-thinking", name: "Sequential Thinking", category: "core", repo: "modelcontextprotocol/servers", description: "Razonamiento estructurado paso a paso", command: "npx -y @modelcontextprotocol/server-sequential-thinking" },
  { id: "github", name: "GitHub", category: "dev", repo: "github/github-mcp-server", description: "Repos, PRs, issues, GitHub Actions", command: "docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server" },
  { id: "playwright", name: "Playwright", category: "dev", repo: "microsoft/playwright-mcp", description: "Automatización de navegador", command: "npx -y @playwright/mcp@latest" },
  { id: "supabase", name: "Supabase", category: "database", repo: "supabase/mcp-server-supabase", description: "Base de datos Supabase/PostgreSQL", command: "npx -y @supabase/mcp-server-supabase" },
  { id: "postgres", name: "PostgreSQL", category: "database", repo: "modelcontextprotocol/servers", description: "Consultas directas a PostgreSQL", command: "npx -y @modelcontextprotocol/server-postgres" },
  { id: "sqlite", name: "SQLite", category: "database", repo: "modelcontextprotocol/servers", description: "Base de datos SQLite local", command: "npx -y @modelcontextprotocol/server-sqlite" },
  { id: "brave-search", name: "Brave Search", category: "search", repo: "modelcontextprotocol/servers", description: "Búsqueda web con Brave", command: "npx -y @modelcontextprotocol/server-brave-search" },
  { id: "tavily-mcp", name: "Tavily", category: "search", repo: "tavily/tavily-mcp", description: "Búsqueda web para agentes IA", command: "npx -y tavily-mcp" },
  { id: "context7", name: "Context7", category: "docs", repo: "upstash/context7-mcp", description: "Documentación actualizada de librerías", command: "npx -y @upstash/context7-mcp" },
  { id: "sentry", name: "Sentry", category: "monitoring", repo: "getsentry/sentry-mcp", description: "Monitoreo de errores en producción", command: "npx -y @sentry/mcp-server" },
  { id: "notion", name: "Notion", category: "productivity", repo: "makenotion/notion-mcp-server", description: "Leer y escribir en Notion", command: "npx -y @notionhq/notion-mcp-server" },
  { id: "stripe", name: "Stripe", category: "payments", repo: "stripe/agent-toolkit", description: "Pagos y subscripciones Stripe", command: "npx -y @stripe/mcp-server" },
  { id: "cloudflare-mcp", name: "Cloudflare", category: "infra", repo: "cloudflare/mcp-server-cloudflare", description: "Workers, KV, D1, R2 de Cloudflare", command: "npx -y @cloudflare/mcp-server-cloudflare" },
];

// ============================================================
// DATOS: Repositorios de Skills
// ============================================================
const SKILL_REPOS = [
  { id: "awesome-cursorrules", name: "awesome-cursorrules", url: "https://github.com/PatrickJS/awesome-cursorrules", description: "Reglas para Cursor por stack tecnológico", environments: ["vscode-claude", "vscode-roo", "vscode-continue"] },
  { id: "claude-best-practices", name: "claude-code-best-practices", url: "https://github.com/MuhammadUsmanGM/claude-code-best-practices", description: "11 plantillas CLAUDE.md + starter kits", environments: ["claude-code"] },
  { id: "rules-template", name: "rules_template", url: "https://github.com/Bhartendu-Kumar/rules_template", description: "Plantillas multi-IDE: Cline, Roo, Cursor, Windsurf", environments: ["vscode-claude", "vscode-roo", "vscode-deepseek"] },
  { id: "cursor-rules-mdc", name: "awesome-cursor-rules-mdc", url: "https://github.com/sanjeed5/awesome-cursor-rules-mdc", description: "Reglas MDC modernas generadas con IA", environments: ["vscode-claude", "vscode-roo"] },
  { id: "cursor-rules-awesome", name: "cursor-rules-awesome", url: "https://github.com/tonynguyennvt/cursor-rules-awesome", description: "4800+ líneas, 72 temas, OWASP, SRE, compliance", environments: ["vscode-claude", "vscode-roo", "vscode-deepseek"] },
];

// ============================================================
// TIPOS DE PROYECTO (para sugerencias de MCP)
// ============================================================
const PROJECT_TYPES = [
  { id: "saas-web", label: "SaaS / Web App", mcps: ["filesystem", "git", "github", "supabase", "context7", "tavily-mcp"] },
  { id: "n8n-automation", label: "Automatización n8n", mcps: ["filesystem", "git", "fetch", "github", "context7"] },
  { id: "landing-page", label: "Landing / Web estática", mcps: ["filesystem", "git", "fetch", "context7"] },
  { id: "api-backend", label: "API / Backend", mcps: ["filesystem", "git", "postgres", "github", "sentry", "context7"] },
  { id: "dental-clinic", label: "Clínica / Dashboard médico", mcps: ["filesystem", "git", "postgres", "supabase", "github"] },
  { id: "mobile-app", label: "App móvil", mcps: ["filesystem", "git", "github", "supabase", "context7"] },
  { id: "data-pipeline", label: "Pipeline de datos", mcps: ["filesystem", "git", "postgres", "sqlite", "fetch"] },
  { id: "whatsapp-bot", label: "Bot / Agente WhatsApp", mcps: ["filesystem", "fetch", "git", "github", "memory"] },
];

// ============================================================
// REGLAS DEFAULT (editables por el usuario)
// ============================================================
const DEFAULT_RULES = `## REGLAS INVIOLABLES DE TRABAJO

### COMUNICACIÓN
- Responde SIEMPRE en español
- Usa lenguaje claro, sin tecnicismos innecesarios
- Cuando no estés seguro, pregunta ANTES de actuar

### ACCIONES MANUALES
- Antes de cualquier acción irreversible, muestra exactamente QUÉ harás y espera confirmación
- Para comandos en terminal: muestra el comando COMPLETO y explica qué hace
- Para modificar archivos existentes: muestra el DIFF antes de aplicar

### CÓDIGO
- NO inventes — si no conoces una función o API, di que no sabes
- NO rompas funcionalidad existente sin avisar
- Cambios quirúrgicos: modifica SOLO lo necesario
- Entrega SIEMPRE el archivo completo cuando se pida reemplazo

### GESTIÓN DE ERRORES  
- Si algo falla, restaura la versión anterior PRIMERO
- Documenta cada cambio importante en CHANGELOG.md
- Tests antes de marcar algo como "listo"

### PROGRESO
- Reporta avance en pasos numerados
- Cuando termines una tarea, di explícitamente: "✅ COMPLETADO: [descripción]"
- Si necesitas que YO haga algo manualmente, usa: "🔴 ACCIÓN MANUAL REQUERIDA: [instrucciones exactas]"`;

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
export default function DevLauncher() {
  const [step, setStep] = useState(1); // 1-6 pasos del wizard
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [selectedEnv, setSelectedEnv] = useState(null);
  const [selectedApis, setSelectedApis] = useState([]);
  const [apiKeys, setApiKeys] = useState({});
  const [rawIdea, setRawIdea] = useState("");
  const [improvedIdea, setImprovedIdea] = useState("");
  const [editedIdea, setEditedIdea] = useState("");
  const [isImprovingIdea, setIsImprovingIdea] = useState(false);
  const [ideaApiKey, setIdeaApiKey] = useState("");
  const [selectedMcps, setSelectedMcps] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [rules, setRules] = useState(DEFAULT_RULES);
  const [customEnvs, setCustomEnvs] = useState([]);
  const [customApis, setCustomApis] = useState([]);
  const [newCustomEnv, setNewCustomEnv] = useState({ name: "", instructionsFile: "", installCmd: "" });
  const [newCustomApi, setNewCustomApi] = useState({ name: "", tier: "free", domain: "general", url: "", models: "", notes: "" });
  const [showAddEnv, setShowAddEnv] = useState(false);
  const [showAddApi, setShowAddApi] = useState(false);
  const [apiFilter, setApiFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const [activeTab, setActiveTab] = useState("mcps");

  const allEnvs = [...ENVIRONMENTS, ...customEnvs];
  const allApis = [...AI_APIS, ...customApis];

  const env = allEnvs.find(e => e.id === selectedEnv);
  const suggestedMcps = projectType
    ? (PROJECT_TYPES.find(p => p.id === projectType)?.mcps || [])
    : [];

  // Filtro de APIs
  const filteredApis = allApis.filter(api => {
    const tierMatch = apiFilter === "all" || api.tier === apiFilter;
    const domainMatch = domainFilter === "all" || api.domain === domainFilter;
    return tierMatch && domainMatch;
  });

  const domains = ["all", ...new Set(allApis.map(a => a.domain))];

  // ── Mejorar idea con IA (Gemini Flash gratis) ──
  async function improveIdea() {
    if (!rawIdea.trim()) return;
    setIsImprovingIdea(true);
    try {
      const key = ideaApiKey || apiKeys["gemini"] || "";
      if (!key) {
        setImprovedIdea("⚠️ Necesitas ingresar tu API key de Google AI Studio (Gemini) en la sección de APIs para usar esta función.");
        setEditedIdea("⚠️ Necesitas ingresar tu API key de Google AI Studio (Gemini) en la sección de APIs para usar esta función.");
        setIsImprovingIdea(false);
        return;
      }
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Eres un experto en product design y arquitectura de software. El usuario tiene una idea de proyecto y quieres convertirla en un prompt de especificación técnica claro, detallado y accionable para un agente de IA coding.

IDEA DEL USUARIO:
${rawIdea}

CONTEXTO ADICIONAL:
- Nombre del proyecto: ${projectName || "Sin nombre aún"}
- Tipo de proyecto: ${PROJECT_TYPES.find(p => p.id === projectType)?.label || "General"}
- Entorno de trabajo: ${env?.name || "No seleccionado aún"}

Genera un prompt de especificación que incluya:
1. **Descripción del proyecto** (qué es y para quién)
2. **Problema que resuelve** (dolor del usuario)
3. **Stack tecnológico sugerido** (basado en el contexto)
4. **Funcionalidades principales** (lista priorizada)
5. **Criterios de éxito** (cómo saber que está bien hecho)
6. **Lo que NO debe hacer** (límites del MVP)

Responde SOLO con el prompt mejorado, listo para copiar y pegar al agente IA. Sin explicaciones adicionales.`
            }]
          }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1500 }
        })
      });
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error al procesar la respuesta.";
      setImprovedIdea(text);
      setEditedIdea(text);
    } catch (e) {
      setImprovedIdea("Error al conectar con Gemini. Verifica tu API key.");
      setEditedIdea("Error al conectar con Gemini. Verifica tu API key.");
    }
    setIsImprovingIdea(false);
  }

  // ── Generar setup.js ──
  function generateScript() {
    if (!env) return;
    setIsGenerating(true);

    const mcpConfig = {};
    selectedMcps.forEach(mcpId => {
      const mcp = MCP_SERVERS.find(m => m.id === mcpId);
      if (!mcp) return;
      const parts = mcp.command.split(" ");
      mcpConfig[mcpId] = {
        command: parts[0],
        args: parts.slice(1),
        env: {}
      };
    });

    const projectIdea = editedIdea || rawIdea || "Sin descripción";
    const apisInfo = selectedApis.map(id => {
      const api = allApis.find(a => a.id === id);
      return api ? `// ${api.name}: ${api.notes}` : "";
    }).join("\n");

    let script = "";

    // ── Generador específico por entorno ──
    if (env.id === "claude-code") {
      script = generateClaudeCodeScript(env, mcpConfig, projectIdea, apisInfo);
    } else if (env.id === "opencode") {
      script = generateOpencodeScript(env, mcpConfig, projectIdea, apisInfo);
    } else if (env.id === "codex-cli") {
      script = generateCodexScript(env, mcpConfig, projectIdea, apisInfo);
    } else if (env.id === "antigravity") {
      script = generateAntigravityScript(env, projectIdea, apisInfo);
    } else if (env.id === "gemini-cli") {
      script = generateGeminiCLIScript(env, mcpConfig, projectIdea, apisInfo);
    } else if (env.id.startsWith("vscode-")) {
      script = generateVSCodeScript(env, mcpConfig, projectIdea, apisInfo);
    } else {
      script = generateGenericScript(env, mcpConfig, projectIdea, apisInfo);
    }

    setGeneratedScript(script);
    setIsGenerating(false);
  }

  // ── Helpers para construir scripts sin template literals anidados ──
  function lines(...args) { return args.join("\n"); }
  function esc(str) { return (str || "").replace(/\\/g, "\\\\").replace(/`/g, "'").replace(/\${/g, "\\${"); }

  function scriptHeader(envName, pName) {
    return lines(
      "#!/usr/bin/env node",
      "// ============================================================",
      "// SETUP SCRIPT — " + pName,
      "// Entorno: " + envName,
      "// Generado por SynetIA Dev Launcher",
      "// ============================================================",
      "",
      "const fs = require('fs');",
      "const path = require('path');",
      "const BASE = process.cwd();",
      "",
      "function log(msg) { console.log('\\x1b[32m✓\\x1b[0m ' + msg); }",
      "function warn(msg) { console.log('\\x1b[33m⚠\\x1b[0m ' + msg); }",
      "function title(msg) { console.log('\\n\\x1b[36m═══ ' + msg + ' ═══\\x1b[0m'); }",
      ""
    );
  }

  function buildInstructionsContent(header, idea, apiInfo, rulesText) {
    return lines(
      "# " + header,
      "",
      "## Descripción del Proyecto",
      esc(idea).substring(0, 500),
      "",
      "## APIs Configuradas",
      apiInfo || "// Sin APIs seleccionadas",
      "",
      esc(rulesText).substring(0, 2000)
    );
  }

  function generateClaudeCodeScript(env, mcpConfig, projectIdea, apisInfo) {
    const pName = projectName || "Mi Proyecto";
    const pType = PROJECT_TYPES.find(p => p.id === projectType)?.label || "General";
    const mcpJson = JSON.stringify({ mcpServers: mcpConfig }, null, 2);
    const skillsComment = selectedSkills.map(s => {
      const sk = SKILL_REPOS.find(r => r.id === s);
      return sk ? "// Skill: " + sk.name + " — " + sk.url : "";
    }).filter(Boolean).join("\n");

    const claudeMdContent = buildInstructionsContent(pName, projectIdea, apisInfo, rules);
    const settingsObj = JSON.stringify({ permissions: { allow: ["Bash","Read","Write","Edit"], deny: [] }, env: { ANTHROPIC_API_KEY: "TU_API_KEY_AQUI" } }, null, 2);

    return lines(
      scriptHeader("Claude Code (Anthropic CLI)", pName),
      "const { execSync } = require('child_process');",
      "const PROJECT_NAME = " + JSON.stringify(pName) + ";",
      "",
      "title('Configurando Claude Code para: ' + PROJECT_NAME);",
      "",
      "// 1. Carpetas",
      "title('1. Estructura de carpetas');",
      "['.claude','.claude/commands','.claude/skills','docs','src'].forEach(f => {",
      "  fs.mkdirSync(path.join(BASE, f), { recursive: true });",
      "  log('Carpeta: ' + f);",
      "});",
      "",
      "// 2. CLAUDE.md",
      "title('2. Creando CLAUDE.md');",
      "const claudeMdContent = " + JSON.stringify(claudeMdContent) + ";",
      "fs.writeFileSync(path.join(BASE, 'CLAUDE.md'), claudeMdContent);",
      "log('CLAUDE.md creado — Tipo: " + pType + "');",
      "",
      "// 3. .claude/settings.json",
      "title('3. Configuración Claude Code');",
      "fs.writeFileSync(path.join(BASE, '.claude', 'settings.json'), " + JSON.stringify(settingsObj) + ");",
      "log('.claude/settings.json creado');",
      "",
      "// 4. .mcp.json",
      "title('4. Configurando MCPs');",
      "const mcpData = " + mcpJson + ";",
      "fs.writeFileSync(path.join(BASE, '.mcp.json'), JSON.stringify(mcpData, null, 2));",
      "log('.mcp.json creado con ' + Object.keys(mcpData.mcpServers).length + ' MCPs');",
      "",
      skillsComment ? ("// 5. Skills recomendados\n" + skillsComment + "\nwarn('Clona los repos de skills indicados arriba manualmente.');") : "// Sin skills seleccionados",
      "",
      "// 6. .gitignore",
      "if (!fs.existsSync(path.join(BASE, '.gitignore'))) {",
      "  fs.writeFileSync(path.join(BASE, '.gitignore'), 'node_modules/\\n.env\\n.env.local\\n.claude/settings.local.json\\nCLAUDE.local.md\\n*.log\\n');",
      "  log('.gitignore creado');",
      "}",
      "",
      "// 7. README",
      "if (!fs.existsSync(path.join(BASE, 'README.md'))) {",
      "  fs.writeFileSync(path.join(BASE, 'README.md'), '# ' + PROJECT_NAME + '\\n\\nProyecto configurado con SynetIA Dev Launcher.\\n\\n## Setup\\n```bash\\nnode setup.js\\n```\\n');",
      "  log('README.md creado');",
      "}",
      "",
      "console.log('\\n\\x1b[32m✅ SETUP COMPLETO PARA CLAUDE CODE\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Agrega tu ANTHROPIC_API_KEY en .claude/settings.json\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Ejecuta claude en esta carpeta para iniciar\\x1b[0m');",
      "console.log('\\x1b[36mTip: Ejecuta /init dentro de Claude Code para que revise el proyecto\\x1b[0m\\n');"
    );
  }

  function generateOpencodeScript(env, mcpConfig, projectIdea, apisInfo) {
    const pName = projectName || "Mi Proyecto";
    const agentsContent = buildInstructionsContent(pName, projectIdea, apisInfo, rules);
    const opencodeConfig = JSON.stringify({ model: "anthropic/claude-sonnet-4-6", instructions: ["AGENTS.md"], mcp: mcpConfig }, null, 2);

    return lines(
      scriptHeader("Opencode (SST)", pName),
      "title('Configurando Opencode para: " + pName + "');",
      "['.opencode','.opencode/agents','docs','src'].forEach(f => {",
      "  fs.mkdirSync(path.join(BASE, f), { recursive: true });",
      "  log('Carpeta: ' + f);",
      "});",
      "",
      "fs.writeFileSync(path.join(BASE, 'AGENTS.md'), " + JSON.stringify(agentsContent) + ");",
      "log('AGENTS.md creado');",
      "",
      "fs.writeFileSync(path.join(BASE, 'opencode.jsonc'), " + JSON.stringify(opencodeConfig) + ");",
      "log('opencode.jsonc creado');",
      "",
      "fs.writeFileSync(path.join(BASE, '.gitignore'), 'node_modules/\\n.env\\n*.log\\n');",
      "log('.gitignore creado');",
      "",
      "console.log('\\n\\x1b[32m✅ SETUP COMPLETO PARA OPENCODE\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: curl -fsSL https://opencode.ai/install | bash\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Ejecuta opencode en esta carpeta\\x1b[0m\\n');"
    );
  }

  function generateCodexScript(env, mcpConfig, projectIdea, apisInfo) {
    const pName = projectName || "Mi Proyecto";
    const agentsContent = buildInstructionsContent(pName, projectIdea, apisInfo, rules);
    const tomlLines = ["model = \"o4-mini\"", "notify_on_long_task = true", ""];
    Object.entries(mcpConfig).forEach(([name, cfg]) => {
      tomlLines.push("[mcp_servers." + name + "]");
      tomlLines.push("command = \"" + cfg.command + "\"");
      tomlLines.push("args = [" + cfg.args.map(a => "\"" + a + "\"").join(", ") + "]");
      tomlLines.push("");
    });
    const tomlContent = tomlLines.join("\n");

    return lines(
      scriptHeader("Codex CLI (OpenAI)", pName),
      "const HOME = require('os').homedir();",
      "",
      "title('Configurando Codex CLI para: " + pName + "');",
      "['.codex','docs','src'].forEach(f => {",
      "  fs.mkdirSync(path.join(BASE, f), { recursive: true });",
      "});",
      "",
      "fs.writeFileSync(path.join(BASE, 'AGENTS.md'), " + JSON.stringify(agentsContent) + ");",
      "log('AGENTS.md creado');",
      "",
      "const codexDir = path.join(HOME, '.codex');",
      "fs.mkdirSync(codexDir, { recursive: true });",
      "fs.writeFileSync(path.join(codexDir, 'config.toml'), " + JSON.stringify(tomlContent) + ");",
      "log('~/.codex/config.toml creado');",
      "",
      "fs.writeFileSync(path.join(BASE, '.gitignore'), 'node_modules/\\n.env\\n*.log\\n');",
      "",
      "console.log('\\n\\x1b[32m✅ SETUP COMPLETO PARA CODEX CLI\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: npm install -g @openai/codex\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: codex login\\x1b[0m\\n');"
    );
  }

  function generateAntigravityScript(env, projectIdea, apisInfo) {
    const pName = projectName || "Mi Proyecto";
    const agentsContent = buildInstructionsContent(pName, projectIdea, apisInfo, rules);
    const geminiContent = lines(
      "# Instrucciones Antigravity — " + pName,
      "",
      "IMPORTANTE: Este proyecto corre en Windows. Usa siempre comandos PowerShell (pwsh), no bash.",
      "Cuando necesites ejecutar comandos, usa formato plano sin encadenamiento (&&).",
      "",
      esc(rules).substring(0, 1000)
    );

    return lines(
      scriptHeader("Antigravity (Google)", pName),
      "// NOTA: MCPs se configuran desde la UI de Antigravity, no desde JSON",
      "",
      "title('Configurando Antigravity para: " + pName + "');",
      "['.gemini','docs','src'].forEach(f => {",
      "  fs.mkdirSync(path.join(BASE, f), { recursive: true });",
      "});",
      "",
      "fs.writeFileSync(path.join(BASE, 'AGENTS.md'), " + JSON.stringify(agentsContent) + ");",
      "log('AGENTS.md creado');",
      "",
      "fs.writeFileSync(path.join(BASE, '.gemini', 'GEMINI.md'), " + JSON.stringify(geminiContent) + ");",
      "log('.gemini/GEMINI.md creado');",
      "",
      "fs.writeFileSync(path.join(BASE, '.gitignore'), 'node_modules/\\n.env\\n*.log\\n');",
      "",
      "console.log('\\n\\x1b[32m✅ SETUP COMPLETO PARA ANTIGRAVITY\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Descarga Antigravity desde antigravity.google/download\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Abre esta carpeta desde Antigravity\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Configura los MCPs desde la UI (MCP Store)\\x1b[0m\\n');"
    );
  }

  function generateGeminiCLIScript(env, mcpConfig, projectIdea, apisInfo) {
    const pName = projectName || "Mi Proyecto";
    const geminiContent = buildInstructionsContent(pName, projectIdea, apisInfo, rules);
    const settingsJson = JSON.stringify({ mcpServers: mcpConfig }, null, 2);

    return lines(
      scriptHeader("Gemini CLI", pName),
      "const HOME = require('os').homedir();",
      "",
      "title('Configurando Gemini CLI para: " + pName + "');",
      "['.gemini','docs','src'].forEach(f => {",
      "  fs.mkdirSync(path.join(BASE, f), { recursive: true });",
      "});",
      "",
      "fs.writeFileSync(path.join(BASE, 'GEMINI.md'), " + JSON.stringify(geminiContent) + ");",
      "log('GEMINI.md creado');",
      "",
      "const geminiDir = path.join(HOME, '.gemini');",
      "fs.mkdirSync(geminiDir, { recursive: true });",
      "fs.writeFileSync(path.join(geminiDir, 'settings.json'), " + JSON.stringify(settingsJson) + ");",
      "log('~/.gemini/settings.json actualizado con MCPs');",
      "",
      "fs.writeFileSync(path.join(BASE, '.gitignore'), 'node_modules/\\n.env\\n*.log\\n');",
      "",
      "console.log('\\n\\x1b[32m✅ SETUP COMPLETO PARA GEMINI CLI\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: npm install -g @google/gemini-cli\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: gemini (inicia sesión con tu Google Account)\\x1b[0m\\n');"
    );
  }

  function generateVSCodeScript(env, mcpConfig, projectIdea, apisInfo) {
    const pName = projectName || "Mi Proyecto";
    const isRoo = env.id === "vscode-roo";
    const isCline = env.id === "vscode-claude";
    const isContinue = env.id === "vscode-continue" || env.id === "vscode-deepseek";
    const isCopilot = env.id === "vscode-copilot";

    const rulesFolder = isCopilot ? ".github" : isCline ? ".clinerules" : isRoo ? ".roo/rules" : ".continue/rules";
    const mainContent = lines(
      "---",
      "name: main",
      "description: Reglas principales del proyecto",
      "alwaysApply: true",
      "---",
      "",
      "# " + pName,
      "",
      "## Descripción",
      esc(projectIdea).substring(0, 500),
      "",
      esc(rules).substring(0, 1500)
    );

    const extraFolders = [
      JSON.stringify(rulesFolder),
      "'.vscode'",
      "'docs'",
      "'src'",
      isRoo ? "'.roo'" : null,
      isContinue ? "'.continue'" : null,
    ].filter(Boolean).join(", ");

    const mcpVscodeJson = JSON.stringify({ mcpServers: mcpConfig }, null, 2);

    const continueYaml = isContinue ? lines(
      "name: " + pName.toLowerCase().replace(/\s+/g, "-"),
      "version: '1.0.0'",
      "",
      "models:",
      "  - uses: " + (env.id === "vscode-deepseek" ? "deepseek/deepseek-chat" : "anthropic/claude-sonnet-4-6"),
      "    name: main-model",
      "",
      "rules:",
      "  - .continue/rules/main.md",
      "",
      "mcpServers:",
      ...Object.entries(mcpConfig).map(([n, c]) =>
        "  - name: " + n + "\n    command: " + c.command + "\n    args: [" + c.args.map(a => "\"" + a + "\"").join(", ") + "]"
      )
    ) : "";

    const scriptParts = [
      scriptHeader(env.name, pName),
      "title('Configurando " + env.name + " para: " + pName + "');",
      "",
      "// 1. Carpetas",
      "[" + extraFolders + "].forEach(f => {",
      "  fs.mkdirSync(path.join(BASE, f), { recursive: true });",
      "  log('Carpeta: ' + f);",
      "});",
      "",
      "// 2. Archivo de instrucciones",
    ];

    if (isCopilot) {
      const copilotContent = mainContent.replace(/^---[\s\S]*?---\n/, "");
      scriptParts.push("fs.writeFileSync(path.join(BASE, '.github', 'copilot-instructions.md'), " + JSON.stringify(copilotContent) + ");");
      scriptParts.push("log('.github/copilot-instructions.md creado');");
    } else {
      scriptParts.push("fs.writeFileSync(path.join(BASE, " + JSON.stringify(rulesFolder) + ", 'main.md'), " + JSON.stringify(mainContent) + ");");
      scriptParts.push("log('" + rulesFolder + "/main.md creado');");
    }

    scriptParts.push("", "// 3. MCPs");
    if (isCopilot || isCline) {
      scriptParts.push("warn('" + env.name + ": configura los MCPs desde la UI de la extensión en VS Code');");
    } else {
      scriptParts.push("fs.writeFileSync(path.join(BASE, '.vscode', 'mcp.json'), " + JSON.stringify(mcpVscodeJson) + ");");
      scriptParts.push("log('.vscode/mcp.json creado con MCPs');");
    }

    if (isContinue) {
      scriptParts.push("", "// 4. .continue/config.yaml");
      scriptParts.push("fs.writeFileSync(path.join(BASE, '.continue', 'config.yaml'), " + JSON.stringify(continueYaml) + ");");
      scriptParts.push("log('.continue/config.yaml creado');");
    }

    scriptParts.push(
      "",
      "fs.writeFileSync(path.join(BASE, '.gitignore'), 'node_modules/\\n.env\\n*.log\\n.vscode/settings.json\\n');",
      "log('.gitignore creado');",
      "",
      "console.log('\\n\\x1b[32m✅ SETUP COMPLETO PARA " + env.name.toUpperCase() + "\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: " + env.installCmd + "\\x1b[0m');",
      "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Abre esta carpeta en VS Code\\x1b[0m\\n');"
    );

    return scriptParts.join("\n");
  }

  function generateGenericScript(env, mcpConfig, projectIdea, apisInfo) {
    const pName = projectName || "Mi Proyecto";
    const content = buildInstructionsContent(pName, projectIdea, apisInfo, rules);
    return lines(
      scriptHeader(env.name, pName),
      "title('Configurando " + env.name + " para: " + pName + "');",
      "['docs','src'].forEach(f => fs.mkdirSync(path.join(BASE, f), { recursive: true }));",
      "fs.writeFileSync(path.join(BASE, 'AGENTS.md'), " + JSON.stringify(content) + ");",
      "fs.writeFileSync(path.join(BASE, '.gitignore'), 'node_modules/\\n.env\\n*.log\\n');",
      "console.log('\\n✅ Setup básico completado para " + env.name + "\\n');"
    );
  }

  // ── RENDER ──
  const STEPS = [
    { n: 1, label: "Entorno" },
    { n: 2, label: "Proyecto" },
    { n: 3, label: "APIs" },
    { n: 4, label: "MCPs & Skills" },
    { n: 5, label: "Reglas" },
    { n: 6, label: "Generar" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0C10",
      color: "#E2E8F0",
      fontFamily: "'IBM Plex Mono', 'Fira Code', 'Consolas', monospace",
      fontSize: "13px",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #0D1117 0%, #161B22 100%)",
        borderBottom: "1px solid #21C55D33",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px", height: "32px",
            background: "linear-gradient(135deg, #21C55D, #16A34A)",
            borderRadius: "6px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", fontWeight: "bold", color: "#000"
          }}>S</div>
          <div>
            <div style={{ color: "#21C55D", fontWeight: "bold", fontSize: "14px", letterSpacing: "0.1em" }}>
              SYNETIA DEV LAUNCHER
            </div>
            <div style={{ color: "#4B5563", fontSize: "10px", letterSpacing: "0.15em" }}>
              PROJECT CONFIGURATION SYSTEM v1.0
            </div>
          </div>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", gap: "4px", marginLeft: "auto", flexWrap: "wrap" }}>
          {STEPS.map(s => (
            <button key={s.n} onClick={() => setStep(s.n)} style={{
              padding: "4px 12px",
              background: step === s.n ? "#21C55D" : step > s.n ? "#14532D" : "#1C2128",
              color: step === s.n ? "#000" : step > s.n ? "#21C55D" : "#6B7280",
              border: `1px solid ${step === s.n ? "#21C55D" : step > s.n ? "#21C55D44" : "#30363D"}`,
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "11px",
              fontFamily: "inherit",
              letterSpacing: "0.05em",
              transition: "all 0.15s",
            }}>
              {s.n}. {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>

        {/* ══ STEP 1: ENTORNO ══ */}
        {step === 1 && (
          <div>
            <SectionTitle>SELECCIONA TU ENTORNO DE TRABAJO</SectionTitle>
            <div style={{ color: "#6B7280", marginBottom: "20px", fontSize: "12px" }}>
              Cada entorno genera una configuración DIFERENTE y específica. No son intercambiables.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
              {allEnvs.map(e => (
                <EnvCard
                  key={e.id}
                  env={e}
                  selected={selectedEnv === e.id}
                  onClick={() => setSelectedEnv(e.id)}
                />
              ))}

              {/* Agregar entorno custom */}
              {!showAddEnv ? (
                <button onClick={() => setShowAddEnv(true)} style={{
                  border: "1px dashed #30363D",
                  borderRadius: "8px",
                  background: "transparent",
                  color: "#4B5563",
                  cursor: "pointer",
                  padding: "20px",
                  fontFamily: "inherit",
                  fontSize: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#21C55D"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#30363D"}
                >
                  <span style={{ fontSize: "24px" }}>+</span>
                  <span>Agregar entorno personalizado</span>
                </button>
              ) : (
                <div style={{ border: "1px solid #21C55D44", borderRadius: "8px", background: "#0D1117", padding: "16px" }}>
                  <div style={{ color: "#21C55D", marginBottom: "12px", fontSize: "11px", letterSpacing: "0.1em" }}>NUEVO ENTORNO</div>
                  {[
                    ["Nombre", "name", "Ej: Windsurf, Cursor..."],
                    ["Archivo instrucciones", "instructionsFile", "Ej: .windsurfrules"],
                    ["Comando instalación", "installCmd", "Ej: npm install -g ..."],
                  ].map(([label, key, ph]) => (
                    <div key={key} style={{ marginBottom: "8px" }}>
                      <div style={{ color: "#6B7280", fontSize: "10px", marginBottom: "3px" }}>{label}</div>
                      <input
                        value={newCustomEnv[key]}
                        onChange={e => setNewCustomEnv(p => ({ ...p, [key]: e.target.value }))}
                        placeholder={ph}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                    <button onClick={() => {
                      if (newCustomEnv.name) {
                        setCustomEnvs(p => [...p, { ...newCustomEnv, id: "custom-" + Date.now(), icon: "◆", color: "#6B7280", description: "Entorno personalizado", mcpFile: "custom", recommendedApis: [] }]);
                        setNewCustomEnv({ name: "", instructionsFile: "", installCmd: "" });
                        setShowAddEnv(false);
                      }
                    }} style={{ ...btnStyle, background: "#21C55D", color: "#000" }}>Agregar</button>
                    <button onClick={() => setShowAddEnv(false)} style={{ ...btnStyle, background: "#1C2128", color: "#6B7280" }}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>

            {selectedEnv && env && (
              <div style={{ marginTop: "20px", background: "#0D1117", border: "1px solid #21C55D33", borderRadius: "8px", padding: "16px" }}>
                <div style={{ color: "#21C55D", marginBottom: "10px", fontSize: "11px", letterSpacing: "0.1em" }}>
                  ✓ ENTORNO SELECCIONADO: {env.name.toUpperCase()}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", fontSize: "11px" }}>
                  <InfoItem label="Instrucciones" value={env.instructionsFile} />
                  <InfoItem label="Config folder" value={env.configFolder} />
                  <InfoItem label="MCPs" value={env.mcpFile} />
                </div>
              </div>
            )}

            <NavButtons step={step} setStep={setStep} canNext={!!selectedEnv} />
          </div>
        )}

        {/* ══ STEP 2: PROYECTO ══ */}
        {step === 2 && (
          <div>
            <SectionTitle>DEFINE TU PROYECTO</SectionTitle>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {/* Nombre */}
              <div>
                <Label>NOMBRE DEL PROYECTO</Label>
                <input
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  placeholder="Ej: OdontoEsthetic Dashboard"
                  style={{ ...inputStyle, width: "100%", fontSize: "14px", padding: "10px 14px" }}
                />
              </div>

              {/* Tipo */}
              <div>
                <Label>TIPO DE PROYECTO</Label>
                <select
                  value={projectType}
                  onChange={e => setProjectType(e.target.value)}
                  style={{ ...inputStyle, width: "100%", fontSize: "13px" }}
                >
                  <option value="">— Selecciona un tipo —</option>
                  {PROJECT_TYPES.map(p => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Idea */}
            <div style={{ marginTop: "20px" }}>
              <Label>TU IDEA (resumen breve)</Label>
              <textarea
                value={rawIdea}
                onChange={e => setRawIdea(e.target.value)}
                placeholder="Describe tu idea en 2-3 líneas. Qué quieres construir, para quién y cuál es el problema que resuelve..."
                style={{ ...inputStyle, width: "100%", minHeight: "80px", resize: "vertical" }}
              />

              {/* API Key para mejorar idea */}
              <div style={{ display: "flex", gap: "10px", marginTop: "10px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <Label>GEMINI API KEY (para mejorar idea — gratis en aistudio.google.com)</Label>
                  <input
                    value={ideaApiKey}
                    onChange={e => setIdeaApiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    type="password"
                    style={{ ...inputStyle, width: "100%" }}
                  />
                </div>
                <button
                  onClick={improveIdea}
                  disabled={isImprovingIdea || !rawIdea.trim()}
                  style={{
                    ...btnStyle,
                    background: isImprovingIdea || !rawIdea.trim() ? "#1C2128" : "#21C55D",
                    color: isImprovingIdea || !rawIdea.trim() ? "#4B5563" : "#000",
                    whiteSpace: "nowrap",
                    padding: "8px 20px",
                  }}
                >
                  {isImprovingIdea ? "Mejorando..." : "⚡ Mejorar idea con IA"}
                </button>
              </div>
            </div>

            {/* Idea mejorada */}
            {improvedIdea && (
              <div style={{ marginTop: "20px" }}>
                <Label>PROMPT MEJORADO (editable)</Label>
                <textarea
                  value={editedIdea}
                  onChange={e => setEditedIdea(e.target.value)}
                  style={{ ...inputStyle, width: "100%", minHeight: "200px", resize: "vertical", fontSize: "12px", lineHeight: "1.6" }}
                />
                <div style={{ color: "#4B5563", fontSize: "10px", marginTop: "4px" }}>
                  Este prompt se incluirá en tu archivo de instrucciones (CLAUDE.md / AGENTS.md).
                </div>
              </div>
            )}

            <NavButtons step={step} setStep={setStep} canNext={!!projectName} />
          </div>
        )}

        {/* ══ STEP 3: APIs ══ */}
        {step === 3 && (
          <div>
            <SectionTitle>SELECCIONA TUS APIs DE IA</SectionTitle>
            <div style={{ color: "#6B7280", marginBottom: "16px", fontSize: "12px" }}>
              Selecciona todas las que vayas a usar. Puedes agregar más manualmente.
              {env && env.recommendedApis.length > 0 && (
                <span style={{ color: "#21C55D" }}> Recomendadas para {env.name}: {env.recommendedApis.map(id => allApis.find(a => a.id === id)?.name).join(", ")}</span>
              )}
            </div>

            {/* Filtros */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
              {["all", "free", "paid"].map(f => (
                <button key={f} onClick={() => setApiFilter(f)} style={{
                  ...btnStyle,
                  background: apiFilter === f ? "#21C55D" : "#1C2128",
                  color: apiFilter === f ? "#000" : "#6B7280",
                  border: `1px solid ${apiFilter === f ? "#21C55D" : "#30363D"}`,
                }}>
                  {f === "all" ? "Todas" : f === "free" ? "🟢 Gratuitas" : "💳 Pagas"}
                </button>
              ))}
              <div style={{ width: "1px", background: "#30363D" }} />
              {domains.map(d => (
                <button key={d} onClick={() => setDomainFilter(d)} style={{
                  ...btnStyle,
                  background: domainFilter === d ? "#1D4ED8" : "#1C2128",
                  color: domainFilter === d ? "#fff" : "#6B7280",
                  border: `1px solid ${domainFilter === d ? "#1D4ED8" : "#30363D"}`,
                  fontSize: "10px",
                }}>
                  {d === "all" ? "Todos los dominios" : d}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "8px" }}>
              {filteredApis.map(api => {
                const isSelected = selectedApis.includes(api.id);
                const isRecommended = env?.recommendedApis?.includes(api.id);
                return (
                  <div
                    key={api.id}
                    onClick={() => setSelectedApis(p => isSelected ? p.filter(x => x !== api.id) : [...p, api.id])}
                    style={{
                      background: isSelected ? "#0D2B1A" : "#0D1117",
                      border: `1px solid ${isSelected ? "#21C55D" : isRecommended ? "#21C55D44" : "#21262D"}`,
                      borderRadius: "6px",
                      padding: "10px 14px",
                      cursor: "pointer",
                      transition: "all 0.1s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontWeight: "bold", color: isSelected ? "#21C55D" : "#E2E8F0", fontSize: "12px" }}>
                        {isSelected ? "✓ " : ""}{api.name}
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {isRecommended && <Tag color="#21C55D">REC</Tag>}
                        <Tag color={api.tier === "free" ? "#21C55D" : "#F59E0B"}>
                          {api.tier === "free" ? "GRATIS" : "PAGO"}
                        </Tag>
                        <Tag color="#1D4ED8">{api.domain}</Tag>
                      </div>
                    </div>
                    <div style={{ color: "#6B7280", fontSize: "10px", marginTop: "4px" }}>{api.notes}</div>
                    {isSelected && apiKeys[api.id] !== undefined && (
                      <input
                        onClick={e => e.stopPropagation()}
                        value={apiKeys[api.id]}
                        onChange={e => setApiKeys(p => ({ ...p, [api.id]: e.target.value }))}
                        placeholder={`API Key de ${api.name}`}
                        type="password"
                        style={{ ...inputStyle, width: "100%", marginTop: "6px", fontSize: "11px" }}
                      />
                    )}
                    {isSelected && apiKeys[api.id] === undefined && (
                      <button
                        onClick={e => { e.stopPropagation(); setApiKeys(p => ({ ...p, [api.id]: "" })); }}
                        style={{ ...btnStyle, marginTop: "6px", fontSize: "10px", background: "#1C2128", color: "#6B7280" }}
                      >
                        + Agregar API Key
                      </button>
                    )}
                  </div>
                );
              })}

              {/* API personalizada */}
              {!showAddApi ? (
                <button onClick={() => setShowAddApi(true)} style={{
                  border: "1px dashed #30363D", borderRadius: "6px",
                  background: "transparent", color: "#4B5563", cursor: "pointer",
                  padding: "16px", fontFamily: "inherit", fontSize: "12px",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#21C55D"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#30363D"}
                >
                  + Agregar API personalizada
                </button>
              ) : (
                <div style={{ border: "1px solid #21C55D44", borderRadius: "6px", background: "#0D1117", padding: "12px" }}>
                  <div style={{ color: "#21C55D", marginBottom: "8px", fontSize: "11px" }}>NUEVA API</div>
                  {[
                    ["Nombre", "name", "Ej: Mi API custom"],
                    ["URL docs/registro", "url", "https://..."],
                    ["Modelos (separados por coma)", "models", "model-1, model-2"],
                    ["Notas", "notes", "Tier, límites, etc."],
                  ].map(([label, key, ph]) => (
                    <div key={key} style={{ marginBottom: "6px" }}>
                      <div style={{ color: "#6B7280", fontSize: "10px" }}>{label}</div>
                      <input value={newCustomApi[key]} onChange={e => setNewCustomApi(p => ({ ...p, [key]: e.target.value }))} placeholder={ph} style={inputStyle} />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                    <select value={newCustomApi.tier} onChange={e => setNewCustomApi(p => ({ ...p, tier: e.target.value }))} style={{ ...inputStyle, flex: 1 }}>
                      <option value="free">Gratis</option>
                      <option value="paid">Pago</option>
                    </select>
                    <select value={newCustomApi.domain} onChange={e => setNewCustomApi(p => ({ ...p, domain: e.target.value }))} style={{ ...inputStyle, flex: 1 }}>
                      {["general", "images", "audio", "video", "embeddings", "search", "translation", "vision", "code"].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                    <button onClick={() => {
                      if (newCustomApi.name) {
                        setCustomApis(p => [...p, { ...newCustomApi, id: "custom-" + Date.now(), models: newCustomApi.models.split(",").map(m => m.trim()) }]);
                        setNewCustomApi({ name: "", tier: "free", domain: "general", url: "", models: "", notes: "" });
                        setShowAddApi(false);
                      }
                    }} style={{ ...btnStyle, background: "#21C55D", color: "#000" }}>Agregar</button>
                    <button onClick={() => setShowAddApi(false)} style={{ ...btnStyle, background: "#1C2128", color: "#6B7280" }}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: "12px", color: "#4B5563", fontSize: "11px" }}>
              {selectedApis.length} APIs seleccionadas
            </div>

            <NavButtons step={step} setStep={setStep} canNext={true} />
          </div>
        )}

        {/* ══ STEP 4: MCPs & SKILLS ══ */}
        {step === 4 && (
          <div>
            <SectionTitle>MCPs Y SKILLS PARA TU PROYECTO</SectionTitle>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
              {["mcps", "skills"].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{
                  ...btnStyle,
                  background: activeTab === t ? "#21C55D" : "#1C2128",
                  color: activeTab === t ? "#000" : "#6B7280",
                  border: `1px solid ${activeTab === t ? "#21C55D" : "#30363D"}`,
                  fontSize: "12px",
                  padding: "8px 20px",
                }}>
                  {t === "mcps" ? "MCP SERVERS" : "REPOSITORIES DE SKILLS"}
                </button>
              ))}
            </div>

            {activeTab === "mcps" && (
              <div>
                {suggestedMcps.length > 0 && (
                  <div style={{ background: "#0D1117", border: "1px solid #21C55D33", borderRadius: "6px", padding: "12px", marginBottom: "16px" }}>
                    <div style={{ color: "#21C55D", fontSize: "11px", marginBottom: "8px" }}>
                      ⚡ SUGERIDOS PARA {PROJECT_TYPES.find(p => p.id === projectType)?.label?.toUpperCase()}
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {suggestedMcps.map(id => {
                        const mcp = MCP_SERVERS.find(m => m.id === id);
                        if (!mcp) return null;
                        return (
                          <button key={id} onClick={() => setSelectedMcps(p => p.includes(id) ? p : [...p, id])} style={{
                            ...btnStyle,
                            background: selectedMcps.includes(id) ? "#14532D" : "#1C2128",
                            color: selectedMcps.includes(id) ? "#21C55D" : "#9CA3AF",
                            border: `1px solid ${selectedMcps.includes(id) ? "#21C55D" : "#30363D"}`,
                          }}>
                            {selectedMcps.includes(id) ? "✓ " : "+ "}{mcp.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "8px" }}>
                  {MCP_SERVERS.map(mcp => {
                    const isSelected = selectedMcps.includes(mcp.id);
                    return (
                      <div
                        key={mcp.id}
                        onClick={() => setSelectedMcps(p => isSelected ? p.filter(x => x !== mcp.id) : [...p, mcp.id])}
                        style={{
                          background: isSelected ? "#0D2B1A" : "#0D1117",
                          border: `1px solid ${isSelected ? "#21C55D" : "#21262D"}`,
                          borderRadius: "6px", padding: "10px 14px", cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <div style={{ color: isSelected ? "#21C55D" : "#E2E8F0", fontWeight: "bold", fontSize: "12px" }}>
                            {isSelected ? "✓ " : ""}{mcp.name}
                          </div>
                          <Tag color="#4B5563">{mcp.category}</Tag>
                        </div>
                        <div style={{ color: "#6B7280", fontSize: "10px", marginTop: "3px" }}>{mcp.description}</div>
                        <div style={{ color: "#374151", fontSize: "10px", marginTop: "3px", fontFamily: "monospace" }}>
                          {mcp.command.substring(0, 50)}{mcp.command.length > 50 ? "..." : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: "10px", color: "#4B5563", fontSize: "11px" }}>
                  {selectedMcps.length} MCPs seleccionados · Nota: MCPs de Antigravity se configuran desde su UI.
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div>
                <div style={{ color: "#6B7280", marginBottom: "16px", fontSize: "12px" }}>
                  Repositorios de reglas y skills verificados. Clónalos en tu carpeta del proyecto para usar las mejores prácticas disponibles.
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "8px" }}>
                  {SKILL_REPOS.map(repo => {
                    const isSelected = selectedSkills.includes(repo.id);
                    const isCompatible = !selectedEnv || repo.environments.includes(selectedEnv);
                    return (
                      <div
                        key={repo.id}
                        onClick={() => setSelectedSkills(p => isSelected ? p.filter(x => x !== repo.id) : [...p, repo.id])}
                        style={{
                          background: isSelected ? "#0D2B1A" : "#0D1117",
                          border: `1px solid ${isSelected ? "#21C55D" : isCompatible ? "#21C55D22" : "#21262D"}`,
                          borderRadius: "6px", padding: "12px 14px", cursor: "pointer",
                          opacity: isCompatible ? 1 : 0.5,
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ color: isSelected ? "#21C55D" : "#E2E8F0", fontWeight: "bold", fontSize: "12px" }}>
                            {isSelected ? "✓ " : ""}{repo.name}
                          </div>
                          {isCompatible && <Tag color="#21C55D">COMPATIBLE</Tag>}
                        </div>
                        <div style={{ color: "#6B7280", fontSize: "10px", marginTop: "4px" }}>{repo.description}</div>
                        <div style={{ color: "#374151", fontSize: "10px", marginTop: "4px" }}>
                          <a href={repo.url} target="_blank" rel="noreferrer" style={{ color: "#1D4ED8" }} onClick={e => e.stopPropagation()}>
                            {repo.url.replace("https://github.com/", "")}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <NavButtons step={step} setStep={setStep} canNext={true} />
          </div>
        )}

        {/* ══ STEP 5: REGLAS ══ */}
        {step === 5 && (
          <div>
            <SectionTitle>REGLAS INVIOLABLES DE TRABAJO</SectionTitle>
            <div style={{ color: "#6B7280", marginBottom: "16px", fontSize: "12px" }}>
              Estas reglas se incluirán en tu archivo de instrucciones ({env?.instructionsFile || "CLAUDE.md / AGENTS.md"}).
              Edítalas a tu gusto. Son las instrucciones de comportamiento de la IA en tu entorno.
            </div>
            <textarea
              value={rules}
              onChange={e => setRules(e.target.value)}
              style={{
                ...inputStyle,
                width: "100%",
                minHeight: "400px",
                resize: "vertical",
                fontSize: "12px",
                lineHeight: "1.7",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            />
            <div style={{ color: "#4B5563", fontSize: "10px", marginTop: "6px" }}>
              Tip: usa MAYÚSCULAS para énfasis ("NUNCA", "SIEMPRE"). Las reglas más cortas y directas son más efectivas.
            </div>
            <NavButtons step={step} setStep={setStep} canNext={true} />
          </div>
        )}

        {/* ══ STEP 6: GENERAR ══ */}
        {step === 6 && (
          <div>
            <SectionTitle>GENERAR EJECUTABLE DE SETUP</SectionTitle>

            {/* Resumen */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px", marginBottom: "20px" }}>
              {[
                ["Entorno", env?.name || "—"],
                ["Proyecto", projectName || "—"],
                ["Tipo", PROJECT_TYPES.find(p => p.id === projectType)?.label || "—"],
                ["APIs", selectedApis.length + " seleccionadas"],
                ["MCPs", selectedMcps.length + " seleccionados"],
                ["Skills", selectedSkills.length + " seleccionados"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#0D1117", border: "1px solid #21262D", borderRadius: "6px", padding: "10px 14px" }}>
                  <div style={{ color: "#4B5563", fontSize: "10px" }}>{k}</div>
                  <div style={{ color: "#21C55D", fontWeight: "bold", fontSize: "12px", marginTop: "2px" }}>{v}</div>
                </div>
              ))}
            </div>

            {!generatedScript ? (
              <button
                onClick={generateScript}
                disabled={isGenerating || !selectedEnv || !projectName}
                style={{
                  ...btnStyle,
                  background: !selectedEnv || !projectName ? "#1C2128" : "linear-gradient(135deg, #21C55D, #16A34A)",
                  color: !selectedEnv || !projectName ? "#4B5563" : "#000",
                  fontSize: "14px",
                  padding: "14px 32px",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  boxShadow: !selectedEnv || !projectName ? "none" : "0 0 20px #21C55D44",
                }}
              >
                {isGenerating ? "GENERANDO..." : "⚡ GENERAR setup.js"}
              </button>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ color: "#21C55D", fontSize: "13px", fontWeight: "bold" }}>
                    ✅ setup.js generado para {env?.name}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedScript)}
                      style={{ ...btnStyle, background: "#1C2128", color: "#9CA3AF" }}
                    >
                      📋 Copiar
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([generatedScript], { type: "text/javascript" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "setup.js";
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      style={{ ...btnStyle, background: "#21C55D", color: "#000", fontWeight: "bold" }}
                    >
                      ⬇ Descargar setup.js
                    </button>
                    <button onClick={() => setGeneratedScript("")} style={{ ...btnStyle, background: "#1C2128", color: "#6B7280" }}>
                      Regenerar
                    </button>
                  </div>
                </div>

                {/* Preview del script */}
                <pre style={{
                  background: "#0D1117",
                  border: "1px solid #21262D",
                  borderRadius: "8px",
                  padding: "16px",
                  overflow: "auto",
                  maxHeight: "400px",
                  fontSize: "11px",
                  lineHeight: "1.6",
                  color: "#9CA3AF",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}>
                  {generatedScript}
                </pre>

                {/* Instrucciones de uso */}
                <div style={{ marginTop: "20px", background: "#0D1117", border: "1px solid #F59E0B33", borderRadius: "8px", padding: "16px" }}>
                  <div style={{ color: "#F59E0B", marginBottom: "10px", fontSize: "12px", fontWeight: "bold" }}>
                    🔴 INSTRUCCIONES DE USO
                  </div>
                  <ol style={{ color: "#9CA3AF", fontSize: "12px", lineHeight: "2", paddingLeft: "20px", margin: 0 }}>
                    <li>Descarga el archivo <code style={{ color: "#21C55D" }}>setup.js</code></li>
                    <li>Colócalo en la carpeta donde quieres crear tu proyecto</li>
                    <li>Abre una terminal (PowerShell en Windows) en esa carpeta</li>
                    <li>Ejecuta: <code style={{ color: "#21C55D", background: "#161B22", padding: "2px 6px", borderRadius: "3px" }}>node setup.js</code></li>
                    <li>Sigue las instrucciones <code style={{ color: "#F59E0B" }}>🔴 ACCIÓN MANUAL</code> que aparezcan</li>
                    <li>Abre tu entorno ({env?.name}) en esa carpeta</li>
                  </ol>
                  <div style={{ marginTop: "12px", color: "#4B5563", fontSize: "11px" }}>
                    Requisito: Node.js 18+ instalado. Verifica con: <code style={{ color: "#21C55D" }}>node --version</code>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Componentes auxiliares ──
function SectionTitle({ children }) {
  return (
    <div style={{ color: "#21C55D", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.15em", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ height: "1px", width: "20px", background: "#21C55D" }} />
      {children}
      <div style={{ height: "1px", flex: 1, background: "linear-gradient(90deg, #21C55D33, transparent)" }} />
    </div>
  );
}

function Label({ children }) {
  return <div style={{ color: "#6B7280", fontSize: "10px", letterSpacing: "0.1em", marginBottom: "6px" }}>{children}</div>;
}

function InfoItem({ label, value }) {
  return (
    <div>
      <div style={{ color: "#4B5563", fontSize: "10px" }}>{label}</div>
      <div style={{ color: "#21C55D", fontFamily: "monospace", fontSize: "11px", marginTop: "2px" }}>{value}</div>
    </div>
  );
}

function Tag({ color, children }) {
  return (
    <span style={{
      background: color + "22",
      color: color,
      border: `1px solid ${color}44`,
      borderRadius: "3px",
      padding: "1px 5px",
      fontSize: "9px",
      fontWeight: "bold",
      letterSpacing: "0.05em",
    }}>
      {children}
    </span>
  );
}

function EnvCard({ env, selected, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: selected ? "#0D2B1A" : "#0D1117",
      border: `1px solid ${selected ? env.color : "#21262D"}`,
      borderRadius: "8px",
      padding: "16px",
      cursor: "pointer",
      transition: "all 0.15s",
      position: "relative",
    }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = env.color + "88"; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = "#21262D"; }}
    >
      {selected && (
        <div style={{ position: "absolute", top: "8px", right: "8px", color: "#21C55D", fontSize: "14px" }}>✓</div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <div style={{
          width: "28px", height: "28px", background: env.color + "22",
          border: `1px solid ${env.color}44`, borderRadius: "6px",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: env.color, fontSize: "14px",
        }}>{env.icon}</div>
        <div style={{ color: selected ? "#21C55D" : "#E2E8F0", fontWeight: "bold", fontSize: "12px" }}>{env.name}</div>
      </div>
      <div style={{ color: "#6B7280", fontSize: "11px", marginBottom: "8px" }}>{env.description}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <InfoItem label="Instrucciones" value={env.instructionsFile} />
        <InfoItem label="MCPs" value={env.mcpFile} />
      </div>
      <div style={{ marginTop: "8px", color: "#374151", fontSize: "10px", fontFamily: "monospace", wordBreak: "break-all" }}>
        {env.installCmd}
      </div>
    </div>
  );
}

function NavButtons({ step, setStep, canNext }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", paddingTop: "16px", borderTop: "1px solid #21262D" }}>
      {step > 1 ? (
        <button onClick={() => setStep(s => s - 1)} style={{ ...btnStyle, background: "#1C2128", color: "#9CA3AF" }}>
          ← Anterior
        </button>
      ) : <div />}
      {step < 6 && (
        <button
          onClick={() => { if (canNext) setStep(s => s + 1); }}
          disabled={!canNext}
          style={{
            ...btnStyle,
            background: canNext ? "#21C55D" : "#1C2128",
            color: canNext ? "#000" : "#4B5563",
            fontWeight: "bold",
            padding: "8px 24px",
          }}
        >
          Siguiente →
        </button>
      )}
    </div>
  );
}

const inputStyle = {
  background: "#0D1117",
  border: "1px solid #30363D",
  borderRadius: "6px",
  color: "#E2E8F0",
  padding: "7px 10px",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "12px",
  outline: "none",
  boxSizing: "border-box",
};

const btnStyle = {
  border: "1px solid #30363D",
  borderRadius: "6px",
  cursor: "pointer",
  padding: "6px 14px",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "11px",
  letterSpacing: "0.05em",
  transition: "all 0.15s",
};
