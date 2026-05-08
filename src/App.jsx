import { useState } from "react";

const C = {
  bg: "#F8F9FC", bgCard: "#FFFFFF", bgHover: "#F1F4FD", border: "#E2E8F0",
  text: "#1E293B", textMid: "#475569", textLight: "#94A3B8",
  blue: "#3B82F6", blueDark: "#2563EB", blueLight: "#EFF6FF",
  red: "#EF4444", coral: "#F97316", coralLight: "#FFF7ED",
  pink: "#EC4899", green: "#10B981", greenLight: "#ECFDF5",
  purple: "#8B5CF6", yellow: "#F59E0B", yellowLight: "#FFFBEB",
  shadow: "0 1px 3px rgba(0,0,0,0.08)", shadowMd: "0 4px 6px rgba(0,0,0,0.07)",
};

const TEMPLATES = [
  { id: "lp-saas-dark", name: "SaaS Landing Dark", category: "landing", trend: "3D+Glassmorphism", thumb: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop", tags: ["SaaS","Dark","3D"], source: "Open Design", prompt: "Landing page SaaS oscura con hero 3D, glassmorphism cards, gradiente azul-púrpura, sección features, pricing 3 planes, CTA flotante. Stack: HTML+CSS+JS vanilla." },
  { id: "lp-agency", name: "Creative Agency", category: "landing", trend: "Bold Typography", thumb: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop", tags: ["Agencia","Creativo","Bold"], source: "Open CoDesign", prompt: "Landing page agencia creativa con tipografía bold gigante, hero texto animado, portfolio grid, colores vibrantes, minimal layout. Stack: HTML+CSS+JS." },
  { id: "lp-product-3d", name: "Product 3D Hero", category: "landing", trend: "3D Product", thumb: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=250&fit=crop", tags: ["Producto","3D","Moderno"], source: "Claude Design", prompt: "Landing page producto con hero 3D fotorrealista, efectos partículas, scroll animations, social proof, pricing table premium. Stack: HTML+CSS+JS." },
  { id: "lp-dental", name: "Clínica Dental Premium", category: "landing", trend: "Medical Clean", thumb: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=250&fit=crop", tags: ["Dental","Clínica","Premium"], source: "Open Design", prompt: "Landing page clínica dental premium, estética blanca y azul, sección tratamientos con iconos, galería antes/después, formulario citas, testimonios con fotos. Responsive." },
  { id: "lp-luxury", name: "Luxury Service", category: "landing", trend: "Luxury Dark", thumb: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=250&fit=crop", tags: ["Lujo","Premium","Oscuro"], source: "Claude Design", prompt: "Landing page servicio de lujo, fondo negro, dorado y blanco, tipografía serif elegante, video background en hero, sección exclusividad, formulario VIP." },
  { id: "lp-startup", name: "Tech Startup", category: "landing", trend: "Gradient Mesh", thumb: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=250&fit=crop", tags: ["Startup","Tech","AI"], source: "Open CoDesign", prompt: "Landing page startup tech con gradient mesh background, hero con dashboard mockup flotante, sección IA features, integrations grid, pricing freemium." },
  { id: "ec-fashion", name: "Fashion Store", category: "ecommerce", trend: "Minimal Fashion", thumb: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=250&fit=crop", tags: ["Moda","Tienda","Minimal"], source: "Open Design", prompt: "Tienda ecommerce moda minimalista, grid productos 3 columnas, filtros laterales, quick view modal, carrito lateral, checkout simplificado, colores neutros." },
  { id: "ec-tech", name: "Tech Products Store", category: "ecommerce", trend: "Tech Dark", thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop", tags: ["Tecnología","Dark","Store"], source: "Claude Design", prompt: "Tienda productos tecnológicos, dark theme, cards con specs técnicas, comparador de productos, wishlist, sistema reviews con estrellas, related products." },
  { id: "ec-food", name: "Food & Delivery", category: "ecommerce", trend: "Food Vibrant", thumb: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=250&fit=crop", tags: ["Comida","Delivery","Vibrante"], source: "Open CoDesign", prompt: "App delivery comida, colores naranja y amarillo, categorías con iconos, tarjetas restaurantes con rating, carrito persistente, tracking pedido animado." },
  { id: "ec-luxury-store", name: "Luxury Jewelry", category: "ecommerce", trend: "Luxury Minimal", thumb: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=250&fit=crop", tags: ["Joyería","Lujo","Elegante"], source: "Claude Design", prompt: "Tienda joyería de lujo, fondo blanco crema, negro y dorado, productos con zoom, certificados autenticidad, envío premium, atención personalizada." },
  { id: "web-corporate", name: "Corporate Website", category: "web", trend: "Corporate Modern", thumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop", tags: ["Corporativo","Empresa","Formal"], source: "Open Design", prompt: "Sitio web corporativo, header sticky, sección servicios con iconos, equipo con fotos, casos de éxito, blog corporativo, formulario contacto. Responsive." },
  { id: "web-portfolio", name: "Creative Portfolio", category: "web", trend: "3D Portfolio", thumb: "https://images.unsplash.com/photo-1545665277-5937489579f2?w=400&h=250&fit=crop", tags: ["Portfolio","Creativo","3D"], source: "Open CoDesign", prompt: "Portfolio creativo con grid masonry proyectos, efectos hover 3D en tarjetas, bio animada, skills barras progreso, testimonios, formulario contacto creativo." },
  { id: "web-saas-app", name: "SaaS Dashboard App", category: "web", trend: "SaaS Dashboard", thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop", tags: ["Dashboard","SaaS","App"], source: "Claude Design", prompt: "Dashboard SaaS completo, sidebar navegación, cards métricas con charts, tabla datos paginada, módulo notificaciones, perfil usuario, dark/light toggle." },
  { id: "web-restaurant", name: "Restaurant & Menu", category: "web", trend: "Food Elegant", thumb: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop", tags: ["Restaurante","Menú","Elegante"], source: "Open Design", prompt: "Sitio restaurante elegante, hero video full screen, menú con categorías y precios, reservas online, galería fotos, historia chef, horarios y ubicación." },
  { id: "3d-immersive", name: "3D Immersive Hero", category: "trending3d", trend: "WebGL 3D", thumb: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=400&h=250&fit=crop", tags: ["3D","WebGL","Inmersivo"], source: "Claude Design", prompt: "Landing page con hero 3D inmersivo usando CSS 3D transforms, objetos flotantes animados, parallax scroll, efectos de profundidad, fondo espacial o fluido." },
  { id: "3d-glassmorphism", name: "Glassmorphism UI", category: "trending3d", trend: "Glassmorphism", thumb: "https://images.unsplash.com/photo-1618609377864-68609b857e90?w=400&h=250&fit=crop", tags: ["Glass","Moderno","Blur"], source: "Open Design", prompt: "UI con glassmorphism completo, cards con backdrop-filter blur, gradientes de fondo coloridos, transparencias en capas, efectos de luz y reflejos." },
  { id: "3d-brutalist", name: "Neo-Brutalist", category: "trending3d", trend: "Neo-Brutalism", thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop", tags: ["Brutalist","Bold","Tendencia"], source: "Open CoDesign", prompt: "Diseño neo-brutalista con bordes negros gruesos, colores primarios saturados, tipografía bold irregular, sombras offset, elementos superpuestos, sin redondeos." },
  { id: "3d-particles", name: "Particle Effects", category: "trending3d", trend: "Particle System", thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop", tags: ["Partículas","Animado","Canvas"], source: "Claude Design", prompt: "Landing con sistema de partículas en hero usando canvas JS, partículas interactivas que siguen el cursor, texto animado efecto glitch o typewriter, fondo oscuro dramático." },
];

const TEMPLATE_CATS = [
  { id: "all", label: "Todas", color: C.blue },
  { id: "landing", label: "🚀 Landing Pages", color: C.coral },
  { id: "ecommerce", label: "🛒 E-Commerce", color: C.green },
  { id: "web", label: "🌐 Web Tradicional", color: C.purple },
  { id: "trending3d", label: "✨ 3D & Tendencias", color: C.pink },
];

const DESIGN_TOOLS = [
  { id: "claude-design", name: "Claude Design", sub: "by Anthropic", color: C.coral, badge: "PREMIUM", badgeColor: C.coral, url: "https://claude.ai/design", desc: "Genera prototipos, landing pages, slides y más con Claude Opus 4.7. Soporta 3D, video, shaders e IA integrada. Crea tu design system automáticamente.", features: ["3D + WebGL + Shaders integrado", "Design system desde tu codebase", "Import desde imágenes y PPTX", "Edición inline con comentarios", "Prototipos interactivos en segundos"], install: "Ir a claude.ai/design (requiere Plan Pro/Max)" },
  { id: "open-design", name: "Open Design", sub: "open-source gratis", color: C.blue, badge: "GRATIS", badgeColor: C.green, url: "https://opendesigner.io", github: "https://github.com/nexu-io/open-design", desc: "Alternativa open source a Claude Design. 71 design systems (Airbnb, Ferrari, Stripe, Notion...), 19 skills, corre localmente con tus propias APIs.", features: ["71 design systems (Airbnb, Nike, Tesla...)", "19 skills: landing, dashboard, deck, mobile", "Corre local + deploy en Vercel", "BYOK — usa tus propias APIs", "Export HTML/PDF/PPTX/ZIP"], install: "pnpm install && pnpm tools-dev" },
  { id: "open-codesign", name: "Open CoDesign", sub: "desktop Windows/Mac", color: C.purple, badge: "GRATIS", badgeColor: C.green, url: "https://opencoworkai.github.io/open-codesign/", github: "https://github.com/OpenCoworkAI/open-codesign", desc: "App escritorio (Windows/Mac/Linux) alternativa a Claude Design. 12 skill modules, importa tus keys de Claude Code o Codex en 1 clic.", features: ["App escritorio Windows/Mac/Linux", "12 skills: landing, dashboard, pricing...", "Import 1-clic desde Claude Code/Codex", "AI sliders para ajustar sin re-prompting", "Comentarios inline en el preview"], install: "winget install OpenCoworkAI.OpenCoDesign" },
];

const AI_APIS = [
  { id: "gemini", name: "Google AI Studio (Gemini)", tier: "free", domain: "general", url: "https://aistudio.google.com/apikey", notes: "10-15 RPM gratis, sin tarjeta. Gemini 2.5 Flash/Pro" },
  { id: "groq", name: "Groq", tier: "free", domain: "general", url: "https://console.groq.com/keys", notes: "Velocidad extrema. Llama 3.3 70B gratis" },
  { id: "openrouter", name: "OpenRouter", tier: "free", domain: "general", url: "https://openrouter.ai/keys", notes: "~29 modelos :free. DeepSeek R1, Qwen, Llama 4" },
  { id: "cerebras", name: "Cerebras", tier: "free", domain: "general", url: "https://cloud.cerebras.ai", notes: "1M tokens/día gratis, sin tarjeta" },
  { id: "sambanova", name: "SambaNova Cloud", tier: "free", domain: "general", url: "https://cloud.sambanova.ai", notes: "Llama 405B gratis. Free tier persistente" },
  { id: "mistral", name: "Mistral La Plateforme", tier: "free", domain: "general", url: "https://console.mistral.ai", notes: "Tier Experiment gratuito. Codestral incluido" },
  { id: "cohere", name: "Cohere", tier: "free", domain: "general", url: "https://dashboard.cohere.com/api-keys", notes: "1000 req/mes trial. Command R+" },
  { id: "nvidia-nim", name: "NVIDIA NIM", tier: "free", domain: "general", url: "https://build.nvidia.com", notes: "1000-5000 créditos. 80+ modelos" },
  { id: "github-models", name: "GitHub Models", tier: "free", domain: "general", url: "https://github.com/marketplace/models", notes: "~30 modelos gratis. GPT-4o, Grok-3, DeepSeek" },
  { id: "cloudflare", name: "Cloudflare Workers AI", tier: "free", domain: "general", url: "https://dash.cloudflare.com", notes: "10k neurons/día gratis. Multimodal" },
  { id: "deepseek-free", name: "DeepSeek (créditos iniciales)", tier: "free", domain: "general", url: "https://platform.deepseek.com", notes: "5M tokens gratis al registrarse (30 días)" },
  { id: "xai", name: "xAI Grok", tier: "free", domain: "general", url: "https://console.x.ai", notes: "$25 créditos al registrarse. Grok 4, Grok 3" },
  { id: "jina", name: "Jina AI", tier: "free", domain: "embeddings", url: "https://jina.ai", notes: "10M tokens iniciales gratis" },
  { id: "tavily", name: "Tavily Search", tier: "free", domain: "search", url: "https://tavily.com", notes: "1000 créditos/mes gratis" },
  { id: "deepl", name: "DeepL API Free", tier: "free", domain: "translation", url: "https://www.deepl.com/pro-api", notes: "500k caracteres/mes gratis" },
  { id: "deepgram", name: "Deepgram", tier: "free", domain: "audio", url: "https://console.deepgram.com", notes: "$200 créditos sin expiración, sin tarjeta" },
  { id: "assemblyai", name: "AssemblyAI", tier: "free", domain: "audio", url: "https://www.assemblyai.com", notes: "$50 créditos gratis (~185 horas)" },
  { id: "huggingface", name: "Hugging Face", tier: "free", domain: "general", url: "https://huggingface.co/settings/tokens", notes: "Créditos mensuales incluidos. Miles de modelos" },
  { id: "anthropic", name: "Anthropic (Claude)", tier: "paid", domain: "general", url: "https://console.anthropic.com", notes: "Mejor para código complejo. Claude Sonnet/Opus" },
  { id: "openai", name: "OpenAI", tier: "paid", domain: "general", url: "https://platform.openai.com/api-keys", notes: "GPT-4.1, o3, o4-mini" },
  { id: "deepseek-paid", name: "DeepSeek API (pago)", tier: "paid", domain: "general", url: "https://platform.deepseek.com", notes: "$0.27/M tokens — muy económico" },
  { id: "replicate", name: "Replicate", tier: "paid", domain: "images", url: "https://replicate.com", notes: "FLUX, Imagen 4, miles de modelos imagen/video" },
  { id: "falai", name: "Fal.ai", tier: "paid", domain: "images", url: "https://fal.ai", notes: "1000+ modelos imagen/video. FLUX, Kling" },
  { id: "stability", name: "Stability AI", tier: "paid", domain: "images", url: "https://platform.stability.ai", notes: "25 créditos/mes gratis. SD 3.5" },
  { id: "elevenlabs", name: "ElevenLabs", tier: "paid", domain: "audio", url: "https://elevenlabs.io", notes: "10k chars/mes gratis. TTS premium multilingüe" },
  { id: "together", name: "Together AI", tier: "paid", domain: "general", url: "https://api.together.xyz", notes: "Llama, Qwen, FLUX. Buena relación precio" },
  { id: "voyageai", name: "Voyage AI", tier: "paid", domain: "embeddings", url: "https://www.voyageai.com", notes: "200M tokens gratis iniciales. RAG top" },
  { id: "perplexity", name: "Perplexity Sonar", tier: "paid", domain: "search", url: "https://www.perplexity.ai/api", notes: "Búsqueda web en tiempo real con IA" },
  { id: "runwayml", name: "Runway ML", tier: "paid", domain: "video", url: "https://runwayml.com", notes: "Generación de video IA. Gen-4 Ultra" },
  { id: "moonshot", name: "Moonshot AI (Kimi)", tier: "paid", domain: "general", url: "https://platform.moonshot.cn", notes: "Kimi K2, créditos iniciales disponibles" },
];

const ENVIRONMENTS = [
  { id: "claude-code", name: "Claude Code", icon: "⬡", color: C.coral, desc: "CLI agente de Anthropic para terminal", instructionsFile: "CLAUDE.md", configFolder: ".claude/", mcpFile: ".mcp.json", installCmd: "npm install -g @anthropic-ai/claude-code", recommendedApis: ["anthropic","openrouter"] },
  { id: "antigravity", name: "Antigravity (Google)", icon: "◈", color: C.blue, desc: "IDE agente de Google con Gemini integrado", instructionsFile: "AGENTS.md", configFolder: ".gemini/", mcpFile: "UI (MCP Store)", installCmd: "Descargar desde antigravity.google/download", recommendedApis: ["gemini"] },
  { id: "opencode", name: "Opencode (SST)", icon: "◎", color: "#E8663D", desc: "Agente open source para terminal", instructionsFile: "AGENTS.md", configFolder: ".opencode/", mcpFile: "opencode.jsonc", installCmd: "curl -fsSL https://opencode.ai/install | bash", recommendedApis: ["anthropic","openrouter","deepseek-paid"] },
  { id: "codex-cli", name: "Codex CLI (OpenAI)", icon: "⬟", color: C.green, desc: "CLI agente de OpenAI para terminal", instructionsFile: "AGENTS.md", configFolder: "~/.codex/", mcpFile: "~/.codex/config.toml", installCmd: "npm install -g @openai/codex", recommendedApis: ["openai","groq"] },
  { id: "vscode-copilot", name: "VS Code + Copilot", icon: "◉", color: "#0078D4", desc: "VS Code con GitHub Copilot oficial", instructionsFile: ".github/copilot-instructions.md", configFolder: ".github/", mcpFile: ".vscode/mcp.json", installCmd: "Instalar extensión: GitHub Copilot en VS Code", recommendedApis: ["openai","anthropic"] },
  { id: "vscode-claude", name: "VS Code + Claude (Cline)", icon: "◈", color: C.coral, desc: "VS Code con Cline + API de Anthropic", instructionsFile: ".clinerules/", configFolder: ".clinerules/", mcpFile: "UI Cline", installCmd: "Instalar extensión: Cline en VS Code", recommendedApis: ["anthropic","openrouter"] },
  { id: "vscode-deepseek", name: "VS Code + DeepSeek", icon: "◑", color: "#4D6BFE", desc: "VS Code con Continue.dev + DeepSeek API", instructionsFile: ".continue/rules/", configFolder: ".continue/", mcpFile: ".continue/config.yaml", installCmd: "Instalar extensión: Continue en VS Code", recommendedApis: ["deepseek-paid","deepseek-free","openrouter"] },
  { id: "vscode-roo", name: "VS Code + Roo Code", icon: "◐", color: C.purple, desc: "VS Code con Roo Code, multi-modelo", instructionsFile: ".roo/rules/", configFolder: ".roo/", mcpFile: ".roo/mcp.json", installCmd: "Instalar extensión: Roo Code en VS Code", recommendedApis: ["anthropic","openrouter","deepseek-paid"] },
  { id: "vscode-continue", name: "VS Code + Continue.dev", icon: "◌", color: "#06B6D4", desc: "VS Code con Continue.dev, multi-proveedor", instructionsFile: ".continue/rules/*.md", configFolder: ".continue/", mcpFile: ".continue/config.yaml", installCmd: "Instalar extensión: Continue en VS Code", recommendedApis: ["anthropic","groq","deepseek-paid"] },
  { id: "gemini-cli", name: "Gemini CLI", icon: "◇", color: "#FBBC04", desc: "CLI agente de Google con Gemini", instructionsFile: "GEMINI.md", configFolder: "~/.gemini/", mcpFile: "~/.gemini/settings.json", installCmd: "npm install -g @google/gemini-cli", recommendedApis: ["gemini"] },
];

const MCP_SERVERS = [
  { id: "filesystem", name: "Filesystem", category: "core", desc: "Lectura/escritura de archivos", cmd: "npx -y @modelcontextprotocol/server-filesystem" },
  { id: "git", name: "Git", category: "core", desc: "Manipular repos Git", cmd: "npx -y @modelcontextprotocol/server-git" },
  { id: "memory", name: "Memory", category: "core", desc: "Knowledge graph persistente", cmd: "npx -y @modelcontextprotocol/server-memory" },
  { id: "fetch", name: "Fetch", category: "core", desc: "Descarga contenido web", cmd: "npx -y @modelcontextprotocol/server-fetch" },
  { id: "sequential-thinking", name: "Sequential Thinking", category: "core", desc: "Razonamiento estructurado", cmd: "npx -y @modelcontextprotocol/server-sequential-thinking" },
  { id: "github", name: "GitHub", category: "dev", desc: "Repos, PRs, issues, Actions", cmd: "docker run -i --rm ghcr.io/github/github-mcp-server" },
  { id: "playwright", name: "Playwright", category: "dev", desc: "Automatización de navegador", cmd: "npx -y @playwright/mcp@latest" },
  { id: "supabase", name: "Supabase", category: "database", desc: "Base de datos Supabase/PostgreSQL", cmd: "npx -y @supabase/mcp-server-supabase" },
  { id: "postgres", name: "PostgreSQL", category: "database", desc: "Consultas directas a PostgreSQL", cmd: "npx -y @modelcontextprotocol/server-postgres" },
  { id: "sqlite", name: "SQLite", category: "database", desc: "Base de datos SQLite local", cmd: "npx -y @modelcontextprotocol/server-sqlite" },
  { id: "brave-search", name: "Brave Search", category: "search", desc: "Búsqueda web con Brave", cmd: "npx -y @modelcontextprotocol/server-brave-search" },
  { id: "tavily-mcp", name: "Tavily", category: "search", desc: "Búsqueda web para agentes IA", cmd: "npx -y tavily-mcp" },
  { id: "context7", name: "Context7", category: "docs", desc: "Documentación actualizada de librerías", cmd: "npx -y @upstash/context7-mcp" },
  { id: "sentry", name: "Sentry", category: "monitoring", desc: "Monitoreo de errores", cmd: "npx -y @sentry/mcp-server" },
  { id: "stripe", name: "Stripe", category: "payments", desc: "Pagos y subscripciones", cmd: "npx -y @stripe/mcp-server" },
  { id: "cloudflare-mcp", name: "Cloudflare", category: "infra", desc: "Workers, KV, D1, R2", cmd: "npx -y @cloudflare/mcp-server-cloudflare" },
];

const PROJECT_TYPES = [
  { id: "saas-web", label: "SaaS / Web App", mcps: ["filesystem","git","github","supabase","context7"] },
  { id: "n8n-automation", label: "Automatización n8n", mcps: ["filesystem","git","fetch","github","context7"] },
  { id: "landing-page", label: "Landing / Web estática", mcps: ["filesystem","git","fetch","context7"] },
  { id: "api-backend", label: "API / Backend", mcps: ["filesystem","git","postgres","github","sentry","context7"] },
  { id: "dental-clinic", label: "Clínica / Dashboard médico", mcps: ["filesystem","git","postgres","supabase","github"] },
  { id: "ecommerce", label: "E-Commerce / Tienda", mcps: ["filesystem","git","github","supabase","stripe","context7"] },
  { id: "whatsapp-bot", label: "Bot / Agente WhatsApp", mcps: ["filesystem","fetch","git","github","memory"] },
];

const SKILL_REPOS = [
  { id: "awesome-cursorrules", name: "awesome-cursorrules", url: "https://github.com/PatrickJS/awesome-cursorrules", desc: "Reglas para Cursor por stack tecnológico", envs: ["vscode-claude","vscode-roo"] },
  { id: "claude-best-practices", name: "claude-code-best-practices", url: "https://github.com/MuhammadUsmanGM/claude-code-best-practices", desc: "11 plantillas CLAUDE.md + starter kits", envs: ["claude-code"] },
  { id: "rules-template", name: "rules_template", url: "https://github.com/Bhartendu-Kumar/rules_template", desc: "Plantillas multi-IDE: Cline, Roo, Cursor", envs: ["vscode-claude","vscode-roo","vscode-deepseek"] },
];

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

### PROGRESO
- Cuando termines: "✅ COMPLETADO: [descripción]"
- Si necesitas acción manual: "🔴 ACCIÓN MANUAL REQUERIDA: [instrucciones exactas]"`;

export default function DevLauncher() {
  const [step, setStep] = useState(1);
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
  const [showAddEnv, setShowAddEnv] = useState(false);
  const [showAddApi, setShowAddApi] = useState(false);
  const [newCustomEnv, setNewCustomEnv] = useState({ name: "", instructionsFile: "", installCmd: "" });
  const [newCustomApi, setNewCustomApi] = useState({ name: "", tier: "free", domain: "general", url: "", notes: "" });
  const [apiFilter, setApiFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState("all");
  const [generatedScript, setGeneratedScript] = useState("");
  const [activeTab, setActiveTab] = useState("mcps");
  const [templateCat, setTemplateCat] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDesignTools, setShowDesignTools] = useState(false);

  const allEnvs = [...ENVIRONMENTS, ...customEnvs];
  const allApis = [...AI_APIS, ...customApis];
  const env = allEnvs.find(e => e.id === selectedEnv);
  const domains = ["all", ...new Set(allApis.map(a => a.domain))];
  const filteredApis = allApis.filter(a => (apiFilter === "all" || a.tier === apiFilter) && (domainFilter === "all" || a.domain === domainFilter));
  const filteredTemplates = templateCat === "all" ? TEMPLATES : TEMPLATES.filter(t => t.category === templateCat);
  const suggestedMcps = projectType ? (PROJECT_TYPES.find(p => p.id === projectType)?.mcps || []) : [];

  async function improveIdea() {
    if (!rawIdea.trim()) return;
    setIsImprovingIdea(true);
    try {
      const key = ideaApiKey || apiKeys["gemini"] || "";
      if (!key) { const m = "⚠️ Necesitas tu API key de Google AI Studio (gratis en aistudio.google.com)"; setImprovedIdea(m); setEditedIdea(m); setIsImprovingIdea(false); return; }
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + key, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Eres experto en product design. Convierte esta idea en un prompt técnico completo para un agente IA coding.\n\nIDEA: " + rawIdea + "\nPROYECTO: " + (projectName || "Sin nombre") + " | TIPO: " + (PROJECT_TYPES.find(p => p.id === projectType)?.label || "General") + " | ENTORNO: " + (env?.name || "No seleccionado") + "\n\nIncluye: 1) Descripción del proyecto 2) Para quién es 3) Stack tecnológico 4) Funcionalidades/secciones 5) Estética 6) Lo que NO debe hacer. Responde SOLO el prompt listo para copiar y pegar." }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 1500 } })
      });
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Error al procesar.";
      setImprovedIdea(text); setEditedIdea(text);
    } catch (e) { const m = "Error al conectar con Gemini. Verifica tu API key."; setImprovedIdea(m); setEditedIdea(m); }
    setIsImprovingIdea(false);
  }

  function generateScript() {
    if (!env) return;
    const mcpConfig = {};
    selectedMcps.forEach(id => { const m = MCP_SERVERS.find(x => x.id === id); if (!m) return; const p = m.cmd.split(" "); mcpConfig[id] = { command: p[0], args: p.slice(1), env: {} }; });
    const idea = editedIdea || rawIdea || "Sin descripción";
    const apisInfo = selectedApis.map(id => { const a = allApis.find(x => x.id === id); return a ? "// " + a.name + ": " + a.notes : ""; }).filter(Boolean).join("\n");
    const tmplInfo = selectedTemplate ? "\n\n## Plantilla Base\n" + selectedTemplate.prompt : "";
    const pName = projectName || "Mi Proyecto";
    function L(...a) { return a.join("\n"); }
    function esc(s) { return (s || "").replace(/\\/g, "\\\\").replace(/`/g, "'").replace(/\${/g, "\\${"); }
    function hdr(n) { return L("#!/usr/bin/env node", "// SETUP: " + n + " — " + pName, "const fs = require('fs'), path = require('path'), BASE = process.cwd();", "function log(m){console.log('\\x1b[32m✓\\x1b[0m '+m);}", "function warn(m){console.log('\\x1b[33m⚠\\x1b[0m '+m);}", "function title(m){console.log('\\n\\x1b[36m═══ '+m+' ═══\\x1b[0m');}", ""); }
    const content = "# " + pName + "\n\n## Descripción\n" + esc(idea).substring(0, 600) + tmplInfo + "\n\n## APIs Configuradas\n" + (apisInfo || "// Sin APIs") + "\n\n" + esc(rules).substring(0, 2000);
    const mcpJson = JSON.stringify({ mcpServers: mcpConfig }, null, 2);

    let script = "";
    if (env.id === "claude-code") {
      script = L(hdr("Claude Code"), "title('Configurando Claude Code: " + pName + "');", "['.claude','.claude/commands','.claude/skills','docs','src'].forEach(f=>{fs.mkdirSync(path.join(BASE,f),{recursive:true});log('Carpeta: '+f);});", "fs.writeFileSync(path.join(BASE,'CLAUDE.md')," + JSON.stringify(content) + ");log('CLAUDE.md creado');", "fs.writeFileSync(path.join(BASE,'.claude','settings.json'),JSON.stringify({permissions:{allow:['Bash','Read','Write','Edit'],deny:[]},env:{ANTHROPIC_API_KEY:'TU_API_KEY_AQUI'}},null,2));log('.claude/settings.json creado');", "fs.writeFileSync(path.join(BASE,'.mcp.json'),JSON.stringify(" + mcpJson + ",null,2));log('.mcp.json creado — " + Object.keys(mcpConfig).length + " MCPs');", "if(!fs.existsSync(path.join(BASE,'.gitignore'))){fs.writeFileSync(path.join(BASE,'.gitignore'),'node_modules/\\n.env\\n.claude/settings.local.json\\nCLAUDE.local.md\\n*.log\\n');log('.gitignore creado');}",
        "console.log('\\n\\x1b[32m✅ SETUP COMPLETO — CLAUDE CODE\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Agrega ANTHROPIC_API_KEY en .claude/settings.json\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Ejecuta: claude\\x1b[0m');", "console.log('\\x1b[36mTip: usa /init dentro de Claude Code\\x1b[0m\\n');");
    } else if (env.id === "opencode") {
      const cfg = JSON.stringify({ model: "anthropic/claude-sonnet-4-6", instructions: ["AGENTS.md"], mcp: mcpConfig }, null, 2);
      script = L(hdr("Opencode"), "title('Configurando Opencode: " + pName + "');", "['.opencode','.opencode/agents','docs','src'].forEach(f=>{fs.mkdirSync(path.join(BASE,f),{recursive:true});log('Carpeta: '+f);});", "fs.writeFileSync(path.join(BASE,'AGENTS.md')," + JSON.stringify(content) + ");log('AGENTS.md creado');", "fs.writeFileSync(path.join(BASE,'opencode.jsonc')," + JSON.stringify(cfg) + ");log('opencode.jsonc creado');", "fs.writeFileSync(path.join(BASE,'.gitignore'),'node_modules/\\n.env\\n*.log\\n');", "console.log('\\n\\x1b[32m✅ SETUP COMPLETO — OPENCODE\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: curl -fsSL https://opencode.ai/install | bash\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Ejecuta: opencode\\x1b[0m\\n');");
    } else if (env.id === "codex-cli") {
      const toml = "model = \"o4-mini\"\n\n" + Object.entries(mcpConfig).map(([n, c]) => "[mcp_servers." + n + "]\ncommand = \"" + c.command + "\"\nargs = [" + c.args.map(a => "\"" + a + "\"").join(", ") + "]").join("\n\n");
      script = L(hdr("Codex CLI"), "const HOME = require('os').homedir();", "title('Configurando Codex CLI: " + pName + "');", "['.codex','docs','src'].forEach(f=>{fs.mkdirSync(path.join(BASE,f),{recursive:true});});", "fs.writeFileSync(path.join(BASE,'AGENTS.md')," + JSON.stringify(content) + ");log('AGENTS.md creado');", "const cd=path.join(HOME,'.codex');fs.mkdirSync(cd,{recursive:true});", "fs.writeFileSync(path.join(cd,'config.toml')," + JSON.stringify(toml) + ");log('~/.codex/config.toml creado');", "fs.writeFileSync(path.join(BASE,'.gitignore'),'node_modules/\\n.env\\n*.log\\n');", "console.log('\\n\\x1b[32m✅ SETUP COMPLETO — CODEX CLI\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: npm install -g @openai/codex\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: codex login\\x1b[0m\\n');");
    } else if (env.id === "antigravity") {
      const gc = "# Antigravity — " + pName + "\n\nIMPORTANTE: Windows. Usa pwsh, no bash. Sin &&.\n\n" + esc(rules).substring(0, 800);
      script = L(hdr("Antigravity"), "title('Configurando Antigravity: " + pName + "');", "['.gemini','docs','src'].forEach(f=>{fs.mkdirSync(path.join(BASE,f),{recursive:true});});", "fs.writeFileSync(path.join(BASE,'AGENTS.md')," + JSON.stringify(content) + ");log('AGENTS.md creado');", "fs.writeFileSync(path.join(BASE,'.gemini','GEMINI.md')," + JSON.stringify(gc) + ");log('.gemini/GEMINI.md creado');", "fs.writeFileSync(path.join(BASE,'.gitignore'),'node_modules/\\n.env\\n*.log\\n');", "console.log('\\n\\x1b[32m✅ SETUP COMPLETO — ANTIGRAVITY\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Descarga desde antigravity.google/download\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Abre esta carpeta en Antigravity\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Configura MCPs desde la UI (MCP Store)\\x1b[0m\\n');");
    } else if (env.id === "gemini-cli") {
      script = L(hdr("Gemini CLI"), "const HOME = require('os').homedir();", "title('Configurando Gemini CLI: " + pName + "');", "['.gemini','docs','src'].forEach(f=>{fs.mkdirSync(path.join(BASE,f),{recursive:true});});", "fs.writeFileSync(path.join(BASE,'GEMINI.md')," + JSON.stringify(content) + ");log('GEMINI.md creado');", "const gd=path.join(HOME,'.gemini');fs.mkdirSync(gd,{recursive:true});", "fs.writeFileSync(path.join(gd,'settings.json')," + JSON.stringify(JSON.stringify({ mcpServers: mcpConfig }, null, 2)) + ");log('~/.gemini/settings.json actualizado');", "console.log('\\n\\x1b[32m✅ SETUP COMPLETO — GEMINI CLI\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: npm install -g @google/gemini-cli\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: gemini (inicia sesión con Google)\\x1b[0m\\n');");
    } else {
      const isRoo = env.id === "vscode-roo", isCline = env.id === "vscode-claude", isContinue = env.id === "vscode-continue" || env.id === "vscode-deepseek", isCopilot = env.id === "vscode-copilot";
      const rf = isCopilot ? ".github" : isCline ? ".clinerules" : isRoo ? ".roo/rules" : ".continue/rules";
      const mc = L("---", "name: main", "alwaysApply: true", "---", "", "# " + pName, "", esc(idea).substring(0, 500), "", esc(rules).substring(0, 1500));
      const flds = [JSON.stringify(rf), "'.vscode'", "'docs'", "'src'"].concat(isRoo ? ["'.roo'"] : []).concat(isContinue ? ["'.continue'"] : []).join(",");
      const parts = [hdr(env.name), "title('Configurando " + env.name + ": " + pName + "');", "[" + flds + "].forEach(f=>{fs.mkdirSync(path.join(BASE,f),{recursive:true});log('Carpeta: '+f);});"];
      if (isCopilot) parts.push("fs.writeFileSync(path.join(BASE,'.github','copilot-instructions.md')," + JSON.stringify(mc.replace(/^---[\s\S]*?---\n/, "")) + ");log('.github/copilot-instructions.md creado');");
      else parts.push("fs.writeFileSync(path.join(BASE," + JSON.stringify(rf) + ",'main.md')," + JSON.stringify(mc) + ");log('" + rf + "/main.md creado');");
      if (!isCopilot && !isCline) parts.push("fs.writeFileSync(path.join(BASE,'.vscode','mcp.json'),JSON.stringify({mcpServers:" + JSON.stringify(mcpConfig) + "},null,2));log('.vscode/mcp.json creado');");
      else parts.push("warn('" + env.name + ": configura MCPs desde la UI de la extensión en VS Code');");
      if (isContinue) { const mdl = env.id === "vscode-deepseek" ? "deepseek/deepseek-chat" : "anthropic/claude-sonnet-4-6"; parts.push("fs.writeFileSync(path.join(BASE,'.continue','config.yaml')," + JSON.stringify("name: " + pName.toLowerCase().replace(/\s+/g, "-") + "\nversion: '1.0.0'\n\nmodels:\n  - uses: " + mdl + "\n    name: main-model\n\nrules:\n  - " + rf + "/main.md") + ");log('.continue/config.yaml creado');"); }
      parts.push("fs.writeFileSync(path.join(BASE,'.gitignore'),'node_modules/\\n.env\\n*.log\\n');log('.gitignore creado');", "console.log('\\n\\x1b[32m✅ SETUP COMPLETO — " + env.name.toUpperCase() + "\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: " + env.installCmd + "\\x1b[0m');", "console.log('\\x1b[33m🔴 ACCIÓN MANUAL: Abre esta carpeta en VS Code (code .)\\x1b[0m\\n');");
      script = parts.join("\n");
    }
    setGeneratedScript(script);
  }

  const STEPS = [{ n: 1, l: "Entorno" }, { n: 2, l: "Proyecto" }, { n: 3, l: "APIs" }, { n: 4, l: "MCPs" }, { n: 5, l: "Reglas" }, { n: 6, l: "Generar" }];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: "14px" }}>

      {/* HEADER */}
      <div style={{ background: C.bgCard, borderBottom: "1px solid " + C.border, padding: "0 24px", display: "flex", alignItems: "center", gap: "16px", position: "sticky", top: 0, zIndex: 100, height: "56px", boxShadow: C.shadow }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, " + C.blue + ", " + C.purple + ")", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "900", color: "#fff", fontSize: "16px" }}>S</div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "14px" }}>SynetIA Dev Launcher</div>
            <div style={{ fontSize: "11px", color: C.textLight }}>Project Configuration System v2.0</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "4px", marginLeft: "auto", flexWrap: "wrap" }}>
          {STEPS.map(s => (
            <button key={s.n} onClick={() => setStep(s.n)} style={{ padding: "5px 14px", background: step === s.n ? C.blue : step > s.n ? C.blueLight : "transparent", color: step === s.n ? "#fff" : step > s.n ? C.blue : C.textMid, border: "1px solid " + (step === s.n ? C.blue : step > s.n ? C.blue + "44" : C.border), borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: step === s.n ? "600" : "400", fontFamily: "inherit" }}>
              {step > s.n ? "✓ " : ""}{s.n}. {s.l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 24px" }}>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <PTitle icon="⚙️" t="Selecciona tu entorno de trabajo" s="Cada entorno genera una configuración DIFERENTE. No son intercambiables." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: "12px" }}>
              {allEnvs.map(e => (
                <div key={e.id} onClick={() => setSelectedEnv(e.id)} style={{ background: selectedEnv === e.id ? e.color + "0D" : C.bgCard, border: "1px solid " + (selectedEnv === e.id ? e.color : C.border), borderRadius: "10px", padding: "16px", cursor: "pointer", boxShadow: selectedEnv === e.id ? "0 0 0 3px " + e.color + "22" : C.shadow, transition: "all 0.15s", position: "relative" }}
                  onMouseEnter={ev => { if (selectedEnv !== e.id) ev.currentTarget.style.borderColor = e.color + "88"; }}
                  onMouseLeave={ev => { if (selectedEnv !== e.id) ev.currentTarget.style.borderColor = C.border; }}>
                  {selectedEnv === e.id && <div style={{ position: "absolute", top: "10px", right: "10px", width: "20px", height: "20px", background: e.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#fff" }}>✓</div>}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{ width: "30px", height: "30px", background: e.color + "1A", border: "1px solid " + e.color + "44", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", color: e.color }}>{e.icon}</div>
                    <div style={{ fontWeight: "600", fontSize: "13px", color: selectedEnv === e.id ? e.color : C.text }}>{e.name}</div>
                  </div>
                  <div style={{ color: C.textMid, fontSize: "12px", marginBottom: "8px" }}>{e.desc}</div>
                  <div style={{ fontSize: "11px", color: C.textLight, fontFamily: "monospace", background: C.bgHover, padding: "4px 8px", borderRadius: "4px", marginTop: "6px" }}>{e.instructionsFile}</div>
                </div>
              ))}
              {!showAddEnv ? (
                <button onClick={() => setShowAddEnv(true)} style={{ border: "1px dashed " + C.border, borderRadius: "10px", background: "transparent", color: C.textLight, cursor: "pointer", padding: "20px", fontFamily: "inherit", fontSize: "13px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textLight; }}>
                  <span style={{ fontSize: "24px" }}>+</span>Agregar entorno personalizado
                </button>
              ) : (
                <div style={{ border: "1px solid " + C.border, borderRadius: "10px", background: C.bgCard, padding: "16px", boxShadow: C.shadow }}>
                  <div style={{ fontWeight: "600", color: C.blue, fontSize: "12px", marginBottom: "10px" }}>NUEVO ENTORNO</div>
                  {[["Nombre","name","Ej: Windsurf"],["Instrucciones","instructionsFile",".windsurfrules"],["Instalación","installCmd","npm i -g ..."]].map(([lb,k,ph]) => (
                    <div key={k} style={{ marginBottom: "8px" }}>
                      <div style={{ color: C.textMid, fontSize: "11px", marginBottom: "3px" }}>{lb}</div>
                      <input value={newCustomEnv[k]} onChange={e => setNewCustomEnv(p => ({ ...p, [k]: e.target.value }))} placeholder={ph} style={IS} />
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                    <button onClick={() => { if (newCustomEnv.name) { setCustomEnvs(p => [...p, { ...newCustomEnv, id: "custom-" + Date.now(), icon: "◆", color: C.purple, desc: "Entorno personalizado", mcpFile: "custom", recommendedApis: [] }]); setNewCustomEnv({ name: "", instructionsFile: "", installCmd: "" }); setShowAddEnv(false); } }} style={{ ...BS, background: C.blue, color: "#fff", border: "none" }}>Agregar</button>
                    <button onClick={() => setShowAddEnv(false)} style={{ ...BS, background: C.bgHover, color: C.textMid }}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>
            {selectedEnv && env && (
              <div style={{ marginTop: "20px", background: env.color + "0A", border: "1px solid " + env.color + "33", borderRadius: "10px", padding: "16px" }}>
                <div style={{ color: env.color, fontWeight: "600", marginBottom: "10px", fontSize: "13px" }}>✓ {env.name} seleccionado</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", fontSize: "12px" }}>
                  {[["Instrucciones", env.instructionsFile], ["Config", env.configFolder], ["MCPs", env.mcpFile.length > 30 ? env.mcpFile.substring(0,30)+"..." : env.mcpFile]].map(([k,v]) => (
                    <div key={k}><div style={{ color: C.textLight, fontSize: "10px" }}>{k}</div><div style={{ color: env.color, fontFamily: "monospace", fontWeight: "600", marginTop: "2px" }}>{v}</div></div>
                  ))}
                </div>
              </div>
            )}
            <NavBtns step={step} setStep={setStep} ok={!!selectedEnv} />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <PTitle icon="📋" t="Define tu proyecto" s="Mientras más detalle pongas, la IA construirá sin hacer preguntas." />

            <div style={{ background: C.blueLight, border: "1px solid " + C.blue + "33", borderRadius: "10px", padding: "14px 16px", marginBottom: "20px", display: "flex", gap: "12px" }}>
              <div style={{ fontSize: "20px" }}>💡</div>
              <div style={{ color: C.textMid, fontSize: "12px", lineHeight: "1.8" }}>
                <strong style={{ color: C.blueDark }}>El objetivo:</strong> que la IA sepa exactamente qué construir, para quién, con qué tecnología y qué NO hacer.<br/>
                Usa <strong style={{ color: C.blue }}>⚡ Mejorar con IA</strong> — Gemini convierte tu idea básica en un prompt profesional completo. Es gratis con tu API key de Google AI Studio.
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <Lbl>NOMBRE DEL PROYECTO</Lbl>
                <input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="Ej: AURA — Museo de Recuerdos" style={{ ...IS, width: "100%", fontSize: "15px", padding: "10px 14px", fontWeight: "500" }} />
              </div>
              <div>
                <Lbl>TIPO DE PROYECTO</Lbl>
                <select value={projectType} onChange={e => setProjectType(e.target.value)} style={{ ...IS, width: "100%" }}>
                  <option value="">— Selecciona un tipo —</option>
                  {PROJECT_TYPES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
                </select>
              </div>
            </div>

            {/* GALERÍA */}
            <div style={{ background: C.bgCard, border: "1px solid " + C.border, borderRadius: "12px", padding: "20px", marginBottom: "20px", boxShadow: C.shadow }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "15px" }}>🎨 Galería de plantillas</div>
                  <div style={{ color: C.textMid, fontSize: "12px", marginTop: "2px" }}>Selecciona una para usar su prompt como base. Al estilo Envato, con referencias de Open Design y Claude Design.</div>
                </div>
                <button onClick={() => setShowDesignTools(!showDesignTools)} style={{ ...BS, background: showDesignTools ? C.purple + "1A" : C.bgHover, color: showDesignTools ? C.purple : C.textMid, border: "1px solid " + (showDesignTools ? C.purple : C.border) }}>
                  🤖 Herramientas IA {showDesignTools ? "▲" : "▼"}
                </button>
              </div>

              {showDesignTools && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid " + C.border }}>
                  {DESIGN_TOOLS.map(t => (
                    <div key={t.id} style={{ background: t.color + "08", border: "1px solid " + t.color + "33", borderRadius: "10px", padding: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <div style={{ fontWeight: "700", fontSize: "13px" }}>{t.name}</div>
                        <span style={{ background: t.badgeColor + "1A", color: t.badgeColor, border: "1px solid " + t.badgeColor + "44", borderRadius: "4px", padding: "2px 7px", fontSize: "10px", fontWeight: "700" }}>{t.badge}</span>
                      </div>
                      <div style={{ color: C.textLight, fontSize: "11px", marginBottom: "6px" }}>{t.sub}</div>
                      <div style={{ color: C.textMid, fontSize: "11px", lineHeight: "1.7", marginBottom: "8px" }}>{t.desc}</div>
                      <div style={{ marginBottom: "10px" }}>{t.features.map(f => <div key={f} style={{ color: C.textMid, fontSize: "11px" }}>✓ {f}</div>)}</div>
                      <div style={{ fontFamily: "monospace", fontSize: "10px", color: C.textLight, background: C.bgHover, padding: "5px 8px", borderRadius: "5px", marginBottom: "8px" }}>{t.install}</div>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <a href={t.url} target="_blank" rel="noreferrer" style={{ ...BS, background: t.color, color: "#fff", border: "none", textDecoration: "none", fontSize: "11px", display: "inline-block" }}>Abrir →</a>
                        {t.github && <a href={t.github} target="_blank" rel="noreferrer" style={{ ...BS, background: C.bgHover, color: C.textMid, textDecoration: "none", fontSize: "11px", display: "inline-block" }}>GitHub</a>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Filtros */}
              <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
                {TEMPLATE_CATS.map(cat => (
                  <button key={cat.id} onClick={() => setTemplateCat(cat.id)} style={{ ...BS, fontSize: "12px", background: templateCat === cat.id ? cat.color : C.bgHover, color: templateCat === cat.id ? "#fff" : C.textMid, border: "1px solid " + (templateCat === cat.id ? cat.color : C.border), fontWeight: templateCat === cat.id ? "600" : "400" }}>
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Grid plantillas */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                {filteredTemplates.map(tmpl => {
                  const isSel = selectedTemplate?.id === tmpl.id;
                  const catColor = TEMPLATE_CATS.find(c => c.id === tmpl.category)?.color || C.blue;
                  return (
                    <div key={tmpl.id} onClick={() => setSelectedTemplate(isSel ? null : tmpl)} style={{ background: isSel ? catColor + "0D" : C.bgCard, border: "2px solid " + (isSel ? catColor : C.border), borderRadius: "10px", overflow: "hidden", cursor: "pointer", boxShadow: isSel ? "0 0 0 3px " + catColor + "22" : C.shadow, transition: "all 0.15s" }}>
                      <div style={{ height: "125px", overflow: "hidden", background: "#f1f4fd", position: "relative" }}>
                        <img src={tmpl.thumb} alt={tmpl.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                        {isSel && <div style={{ position: "absolute", inset: 0, background: catColor + "44", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: "30px", height: "30px", background: catColor, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}>✓</div></div>}
                        <div style={{ position: "absolute", top: "5px", left: "5px", background: catColor, borderRadius: "4px", padding: "2px 6px", fontSize: "9px", color: "#fff", fontWeight: "700" }}>{tmpl.trend}</div>
                        <div style={{ position: "absolute", top: "5px", right: "5px", background: "rgba(0,0,0,0.55)", borderRadius: "4px", padding: "2px 5px", fontSize: "9px", color: "#fff" }}>{tmpl.source}</div>
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontWeight: "600", fontSize: "12px", color: isSel ? catColor : C.text, marginBottom: "5px" }}>{tmpl.name}</div>
                        <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
                          {tmpl.tags.map(tag => <span key={tag} style={{ background: catColor + "1A", color: catColor, border: "1px solid " + catColor + "33", borderRadius: "3px", padding: "1px 5px", fontSize: "9px" }}>{tag}</span>)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedTemplate && (
                <div style={{ marginTop: "14px", background: C.blueLight, border: "1px solid " + C.blue + "33", borderRadius: "8px", padding: "14px" }}>
                  <div style={{ fontWeight: "600", color: C.blue, fontSize: "12px", marginBottom: "6px" }}>✓ {selectedTemplate.name} — Prompt base</div>
                  <div style={{ color: C.textMid, fontSize: "11px", lineHeight: "1.7", marginBottom: "8px" }}>{selectedTemplate.prompt}</div>
                  <button onClick={() => setRawIdea(p => p ? p + "\n\nBASE: " + selectedTemplate.prompt : selectedTemplate.prompt)} style={{ ...BS, background: C.blue, color: "#fff", border: "none", fontSize: "11px" }}>Usar prompt en mi idea →</button>
                </div>
              )}
            </div>

            {/* Ejemplo */}
            <div style={{ background: C.greenLight, border: "1px solid " + C.green + "44", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                <div style={{ fontWeight: "600", color: C.green, fontSize: "12px" }}>📋 Ejemplo — así debe verse una idea completa</div>
                <button onClick={() => setRawIdea("Landing page una sola pagina para AURA, servicio lujo con IA y VR para preservar recuerdos personas fallecidas. Cliente: familias clase alta LATAM. Secciones: Hero particulas, Que es AURA, Como funciona 3 pasos, Testimonios, Precios 3 planes, Contacto. Estetica oscura elegante. Stack: HTML+CSS+JS vanilla, sin frameworks ni backend. Responsive. NO usar React ni Vue.")} style={{ ...BS, background: C.green + "1A", color: C.green, border: "1px solid " + C.green + "44", fontSize: "11px" }}>Usar ejemplo</button>
              </div>
              <div style={{ color: C.textMid, fontSize: "11px", lineHeight: "1.8", background: C.bgCard, padding: "8px 12px", borderRadius: "6px", fontStyle: "italic" }}>
                "Landing page una sola página para AURA, servicio lujo IA y VR. Cliente: familias LATAM. Secciones: Hero partículas, Qué es, Cómo funciona, Testimonios, Precios, Contacto. Estética oscura elegante. Stack: HTML+CSS+JS vanilla, sin backend. Responsive."
              </div>
            </div>

            {/* Checklist */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "16px" }}>
              {[["✅ Qué construir","Landing/app/dashboard/bot"],["✅ Para quién","Clínicas/familias/empresas"],["✅ Stack","HTML+CSS/React/n8n..."],["✅ Secciones","Hero/precios/formulario..."],["✅ Estética","Oscura/minimal/premium..."],["❌ Qué NO hacer","Sin backend/solo MVP..."]].map(([k,v]) => (
                <div key={k} style={{ background: C.bgCard, border: "1px solid " + C.border, borderRadius: "8px", padding: "8px 12px", boxShadow: C.shadow }}>
                  <div style={{ color: k.startsWith("✅") ? C.green : C.red, fontSize: "11px", fontWeight: "600" }}>{k}</div>
                  <div style={{ color: C.textLight, fontSize: "11px", marginTop: "2px" }}>{v}</div>
                </div>
              ))}
            </div>

            <div>
              <Lbl>TU IDEA — con todo el detalle posible</Lbl>
              <textarea value={rawIdea} onChange={e => setRawIdea(e.target.value)} placeholder={"Describe tu proyecto:\n- ¿Qué es? (landing/app/dashboard/bot)\n- ¿Para quién? (cliente objetivo)\n- ¿Qué secciones/funciones necesita?\n- ¿Qué tecnología? (React, HTML, n8n...)\n- ¿Qué estética? (oscura, moderna, minimalista)\n- ¿Qué NO hacer? (sin backend, solo MVP...)"} style={{ ...IS, width: "100%", minHeight: "140px", resize: "vertical", lineHeight: "1.7" }} />
              <div style={{ display: "flex", gap: "10px", marginTop: "10px", alignItems: "flex-end" }}>
                <div style={{ flex: 1 }}>
                  <Lbl>GEMINI API KEY (gratis en aistudio.google.com)</Lbl>
                  <input value={ideaApiKey} onChange={e => setIdeaApiKey(e.target.value)} placeholder="AIzaSy..." type="password" style={{ ...IS, width: "100%" }} />
                </div>
                <button onClick={improveIdea} disabled={isImprovingIdea || !rawIdea.trim()} style={{ ...BS, background: isImprovingIdea || !rawIdea.trim() ? C.bgHover : C.blue, color: isImprovingIdea || !rawIdea.trim() ? C.textLight : "#fff", border: "none", padding: "10px 20px", fontWeight: "600", whiteSpace: "nowrap" }}>
                  {isImprovingIdea ? "Mejorando..." : "⚡ Mejorar con IA"}
                </button>
              </div>
            </div>

            {improvedIdea && (
              <div style={{ marginTop: "16px" }}>
                <Lbl>PROMPT MEJORADO (editable)</Lbl>
                <textarea value={editedIdea} onChange={e => setEditedIdea(e.target.value)} style={{ ...IS, width: "100%", minHeight: "200px", resize: "vertical", lineHeight: "1.7" }} />
              </div>
            )}
            <NavBtns step={step} setStep={setStep} ok={!!projectName} />
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <PTitle icon="🔑" t="Selecciona tus APIs de IA" s={"" + allApis.filter(a => a.tier === "free").length + " gratuitas sin tarjeta. " + allApis.filter(a => a.tier === "paid").length + " pagas populares."} />
            <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
              {["all","free","paid"].map(f => <button key={f} onClick={() => setApiFilter(f)} style={{ ...BS, background: apiFilter === f ? C.blue : C.bgCard, color: apiFilter === f ? "#fff" : C.textMid, border: "1px solid " + (apiFilter === f ? C.blue : C.border), fontWeight: apiFilter === f ? "600" : "400" }}>{f === "all" ? "Todas" : f === "free" ? "🟢 Gratuitas" : "💳 Pagas"}</button>)}
              <div style={{ width: "1px", background: C.border }} />
              {domains.map(d => <button key={d} onClick={() => setDomainFilter(d)} style={{ ...BS, fontSize: "11px", background: domainFilter === d ? C.purple + "1A" : C.bgCard, color: domainFilter === d ? C.purple : C.textMid, border: "1px solid " + (domainFilter === d ? C.purple : C.border) }}>{d === "all" ? "Todos" : d}</button>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "8px" }}>
              {filteredApis.map(api => {
                const isSel = selectedApis.includes(api.id);
                const isRec = env?.recommendedApis?.includes(api.id);
                return (
                  <div key={api.id} onClick={() => setSelectedApis(p => isSel ? p.filter(x => x !== api.id) : [...p, api.id])} style={{ background: isSel ? C.blueLight : C.bgCard, border: "1px solid " + (isSel ? C.blue : isRec ? C.blue + "33" : C.border), borderRadius: "8px", padding: "10px 14px", cursor: "pointer", boxShadow: C.shadow }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontWeight: "600", color: isSel ? C.blue : C.text, fontSize: "12px" }}>{isSel ? "✓ " : ""}{api.name}</div>
                      <div style={{ display: "flex", gap: "3px" }}>
                        {isRec && <Bdg color={C.blue}>REC</Bdg>}
                        <Bdg color={api.tier === "free" ? C.green : C.coral}>{api.tier === "free" ? "GRATIS" : "PAGO"}</Bdg>
                        <Bdg color={C.purple}>{api.domain}</Bdg>
                      </div>
                    </div>
                    <div style={{ color: C.textMid, fontSize: "11px", marginTop: "3px" }}>{api.notes}</div>
                    {isSel && apiKeys[api.id] !== undefined && <input onClick={e => e.stopPropagation()} value={apiKeys[api.id]} onChange={e => setApiKeys(p => ({ ...p, [api.id]: e.target.value }))} placeholder={"API Key de " + api.name} type="password" style={{ ...IS, width: "100%", marginTop: "6px", fontSize: "11px" }} />}
                    {isSel && apiKeys[api.id] === undefined && <button onClick={e => { e.stopPropagation(); setApiKeys(p => ({ ...p, [api.id]: "" })); }} style={{ ...BS, marginTop: "6px", fontSize: "10px", background: C.bgHover, color: C.textMid }}>+ API Key</button>}
                  </div>
                );
              })}
              {!showAddApi ? (
                <button onClick={() => setShowAddApi(true)} style={{ border: "1px dashed " + C.border, borderRadius: "8px", background: "transparent", color: C.textLight, cursor: "pointer", padding: "16px", fontFamily: "inherit", fontSize: "12px" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.color = C.blue; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textLight; }}>
                  + Agregar API personalizada
                </button>
              ) : (
                <div style={{ border: "1px solid " + C.border, borderRadius: "8px", background: C.bgCard, padding: "12px", boxShadow: C.shadow }}>
                  <div style={{ color: C.blue, fontWeight: "600", marginBottom: "8px", fontSize: "12px" }}>NUEVA API</div>
                  {[["Nombre","name","Mi API"],["URL","url","https://..."],["Notas","notes","Tier, límites..."]].map(([lb,k,ph]) => (
                    <div key={k} style={{ marginBottom: "6px" }}><div style={{ color: C.textMid, fontSize: "11px" }}>{lb}</div><input value={newCustomApi[k]} onChange={e => setNewCustomApi(p => ({ ...p, [k]: e.target.value }))} placeholder={ph} style={IS} /></div>
                  ))}
                  <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                    <select value={newCustomApi.tier} onChange={e => setNewCustomApi(p => ({ ...p, tier: e.target.value }))} style={{ ...IS, flex: 1 }}><option value="free">Gratis</option><option value="paid">Pago</option></select>
                    <select value={newCustomApi.domain} onChange={e => setNewCustomApi(p => ({ ...p, domain: e.target.value }))} style={{ ...IS, flex: 1 }}>{["general","images","audio","video","embeddings","search","translation","vision","code"].map(d => <option key={d}>{d}</option>)}</select>
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                    <button onClick={() => { if (newCustomApi.name) { setCustomApis(p => [...p, { ...newCustomApi, id: "custom-" + Date.now() }]); setNewCustomApi({ name: "", tier: "free", domain: "general", url: "", notes: "" }); setShowAddApi(false); } }} style={{ ...BS, background: C.blue, color: "#fff", border: "none" }}>Agregar</button>
                    <button onClick={() => setShowAddApi(false)} style={{ ...BS, background: C.bgHover, color: C.textMid }}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: "10px", color: C.textLight, fontSize: "12px" }}>{selectedApis.length} APIs seleccionadas</div>
            <NavBtns step={step} setStep={setStep} ok={true} />
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div>
            <PTitle icon="🔌" t="MCPs y Skills" s="Herramientas que la IA puede usar en tu proyecto." />
            <div style={{ display: "flex", gap: "6px", marginBottom: "20px" }}>
              {["mcps","skills"].map(t => <button key={t} onClick={() => setActiveTab(t)} style={{ ...BS, background: activeTab === t ? C.blue : C.bgCard, color: activeTab === t ? "#fff" : C.textMid, border: "1px solid " + (activeTab === t ? C.blue : C.border), fontWeight: activeTab === t ? "600" : "400", padding: "8px 20px" }}>{t === "mcps" ? "🔌 MCP Servers" : "📚 Skills Repos"}</button>)}
            </div>
            {activeTab === "mcps" && (
              <div>
                {suggestedMcps.length > 0 && (
                  <div style={{ background: C.blueLight, border: "1px solid " + C.blue + "33", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px" }}>
                    <div style={{ color: C.blue, fontWeight: "600", fontSize: "12px", marginBottom: "8px" }}>⚡ Sugeridos para {PROJECT_TYPES.find(p => p.id === projectType)?.label}</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {suggestedMcps.map(id => { const m = MCP_SERVERS.find(x => x.id === id); if (!m) return null; return <button key={id} onClick={() => setSelectedMcps(p => p.includes(id) ? p : [...p, id])} style={{ ...BS, background: selectedMcps.includes(id) ? C.blueLight : C.bgCard, color: selectedMcps.includes(id) ? C.blue : C.textMid, border: "1px solid " + (selectedMcps.includes(id) ? C.blue : C.border) }}>{selectedMcps.includes(id) ? "✓ " : "+ "}{m.name}</button>; })}
                    </div>
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
                  {MCP_SERVERS.map(m => { const isSel = selectedMcps.includes(m.id); return (
                    <div key={m.id} onClick={() => setSelectedMcps(p => isSel ? p.filter(x => x !== m.id) : [...p, m.id])} style={{ background: isSel ? C.blueLight : C.bgCard, border: "1px solid " + (isSel ? C.blue : C.border), borderRadius: "8px", padding: "10px 14px", cursor: "pointer", boxShadow: C.shadow }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontWeight: "600", color: isSel ? C.blue : C.text, fontSize: "12px" }}>{isSel ? "✓ " : ""}{m.name}</div><Bdg color={C.purple}>{m.category}</Bdg></div>
                      <div style={{ color: C.textMid, fontSize: "11px", marginTop: "3px" }}>{m.desc}</div>
                    </div>
                  ); })}
                </div>
                <div style={{ marginTop: "10px", color: C.textLight, fontSize: "12px" }}>{selectedMcps.length} MCPs seleccionados</div>
              </div>
            )}
            {activeTab === "skills" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
                {SKILL_REPOS.map(r => { const isSel = selectedSkills.includes(r.id); const isComp = !selectedEnv || r.envs.includes(selectedEnv); return (
                  <div key={r.id} onClick={() => setSelectedSkills(p => isSel ? p.filter(x => x !== r.id) : [...p, r.id])} style={{ background: isSel ? C.blueLight : C.bgCard, border: "1px solid " + (isSel ? C.blue : isComp ? C.blue + "22" : C.border), borderRadius: "8px", padding: "14px", cursor: "pointer", opacity: isComp ? 1 : 0.5, boxShadow: C.shadow }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}><div style={{ fontWeight: "600", color: isSel ? C.blue : C.text, fontSize: "12px" }}>{isSel ? "✓ " : ""}{r.name}</div>{isComp && <Bdg color={C.green}>COMPATIBLE</Bdg>}</div>
                    <div style={{ color: C.textMid, fontSize: "11px", marginBottom: "6px" }}>{r.desc}</div>
                    <a href={r.url} target="_blank" rel="noreferrer" style={{ color: C.blue, fontSize: "11px" }} onClick={e => e.stopPropagation()}>{r.url.replace("https://github.com/","")}</a>
                  </div>
                ); })}
              </div>
            )}
            <NavBtns step={step} setStep={setStep} ok={true} />
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <div>
            <PTitle icon="📏" t="Reglas inviolables de trabajo" s={"Se incluirán en tu archivo " + (env?.instructionsFile || "CLAUDE.md / AGENTS.md") + ". Edítalas a tu gusto."} />
            <div style={{ background: C.yellowLight, border: "1px solid " + C.yellow + "44", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px" }}>
              <strong style={{ color: C.yellow, fontSize: "12px" }}>💡 Tip:</strong>
              <span style={{ color: C.textMid, fontSize: "12px" }}> Usa MAYÚSCULAS para énfasis ("NUNCA", "SIEMPRE"). Las reglas cortas y directas son más efectivas.</span>
            </div>
            <textarea value={rules} onChange={e => setRules(e.target.value)} style={{ ...IS, width: "100%", minHeight: "380px", resize: "vertical", lineHeight: "1.8", fontFamily: "'Fira Code','Consolas',monospace", fontSize: "12px" }} />
            <NavBtns step={step} setStep={setStep} ok={true} />
          </div>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <div>
            <PTitle icon="⚡" t="Generar ejecutable de setup" s="setup.js configura automáticamente tu carpeta al ejecutarse con node setup.js" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px", marginBottom: "24px" }}>
              {[["Entorno",env?.name||"—",C.blue],["Proyecto",projectName||"—",C.coral],["Tipo",PROJECT_TYPES.find(p=>p.id===projectType)?.label||"—",C.purple],["APIs",selectedApis.length+" sel.",C.green],["MCPs",selectedMcps.length+" sel.",C.yellow],["Plantilla",selectedTemplate?.name||"Sin plantilla",C.pink]].map(([k,v,color]) => (
                <div key={k} style={{ background: C.bgCard, border: "1px solid " + C.border, borderRadius: "10px", padding: "12px 14px", boxShadow: C.shadow }}>
                  <div style={{ color: C.textLight, fontSize: "10px", fontWeight: "600", letterSpacing: "0.05em" }}>{k.toUpperCase()}</div>
                  <div style={{ color, fontWeight: "700", fontSize: "13px", marginTop: "4px" }}>{v}</div>
                </div>
              ))}
            </div>

            {!generatedScript ? (
              <button onClick={generateScript} disabled={!selectedEnv || !projectName} style={{ ...BS, background: !selectedEnv || !projectName ? C.bgHover : "linear-gradient(135deg," + C.blue + "," + C.purple + ")", color: !selectedEnv || !projectName ? C.textLight : "#fff", border: "none", fontSize: "15px", padding: "14px 36px", fontWeight: "700", boxShadow: !selectedEnv || !projectName ? "none" : C.shadowMd }}>
                ⚡ Generar setup.js
              </button>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <div style={{ fontWeight: "700", color: C.green, fontSize: "14px" }}>✅ setup.js listo para {env?.name}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => navigator.clipboard.writeText(generatedScript)} style={{ ...BS, background: C.bgHover, color: C.textMid }}>📋 Copiar</button>
                    <button onClick={() => { const b = new Blob([generatedScript],{type:"text/javascript"}); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href=u; a.download="setup.js"; a.click(); URL.revokeObjectURL(u); }} style={{ ...BS, background: C.blue, color: "#fff", border: "none", fontWeight: "600" }}>⬇ Descargar setup.js</button>
                    <button onClick={() => setGeneratedScript("")} style={{ ...BS, background: C.bgHover, color: C.textMid }}>Regenerar</button>
                  </div>
                </div>

                <pre style={{ background: "#1E293B", border: "1px solid " + C.border, borderRadius: "10px", padding: "16px", overflow: "auto", maxHeight: "320px", fontSize: "11px", lineHeight: "1.6", color: "#94A3B8", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "'Fira Code','Consolas',monospace" }}>{generatedScript}</pre>

                <div style={{ marginTop: "20px", background: C.bgCard, border: "1px solid " + C.border, borderRadius: "12px", padding: "24px", boxShadow: C.shadowMd }}>
                  <div style={{ color: C.red, fontWeight: "700", fontSize: "14px", marginBottom: "20px" }}>🔴 Instrucciones paso a paso</div>
                  {[
                    ["1","Descarga el setup.js", <span>Clic en <strong style={{color:C.blue}}>⬇ Descargar setup.js</strong> arriba. Se guarda en tu carpeta de Descargas.</span>],
                    ["2","Crea una carpeta nueva para tu proyecto", <code style={{background:C.bgHover,padding:"2px 8px",borderRadius:"4px",color:C.blue}}>E:\MisProyectos\{projectName||"NombreDelProyecto"}</code>],
                    ["3","Mueve setup.js a esa carpeta", <span>Copia el archivo de Descargas y pégalo dentro de la carpeta que creaste.</span>],
                    ["4","Abre PowerShell en esa carpeta", <span>Clic derecho dentro de la carpeta → <strong>"Abrir en Terminal"</strong></span>],
                    ["5","Ejecuta el setup", <div style={{marginTop:"6px"}}><div style={{display:"flex",alignItems:"center",gap:"10px"}}><code style={{background:"#1E293B",color:C.green,padding:"8px 16px",borderRadius:"6px",fontSize:"14px",flex:1}}>node setup.js</code><button onClick={()=>navigator.clipboard.writeText("node setup.js")} style={{...BS,background:C.bgHover,color:C.textMid,fontSize:"11px"}}>📋 Copiar</button></div><div style={{color:C.textLight,fontSize:"11px",marginTop:"4px"}}>Verás mensajes ✓ verdes — los archivos se crean automáticamente.</div></div>],
                    ["6","Abre tu entorno: " + (env?.name||""), env?.id?.startsWith("vscode-") ? <div style={{marginTop:"6px"}}><div style={{display:"flex",alignItems:"center",gap:"10px"}}><code style={{background:"#1E293B",color:C.green,padding:"8px 16px",borderRadius:"6px",fontSize:"14px",flex:1}}>code .</code><button onClick={()=>navigator.clipboard.writeText("code .")} style={{...BS,background:C.bgHover,color:C.textMid,fontSize:"11px"}}>📋 Copiar</button></div></div> : <code style={{background:"#1E293B",color:C.green,padding:"6px 14px",borderRadius:"6px",fontSize:"13px"}}>{env?.id==="claude-code"?"claude":env?.id==="opencode"?"opencode":env?.id==="codex-cli"?"codex":env?.id==="gemini-cli"?"gemini":env?.installCmd||""}</code>],
                    ["7","Dile a la IA que construya tu proyecto", <div style={{background:C.blueLight,border:"1px solid "+C.blue+"33",borderRadius:"8px",padding:"12px",marginTop:"8px"}}><div style={{color:C.blue,fontWeight:"600",fontSize:"11px",marginBottom:"6px"}}>Copia y pega este mensaje exacto en la IA:</div><div style={{color:C.text,fontSize:"12px",lineHeight:"1.8",fontStyle:"italic"}}>{"Lee el archivo " + (env?.instructionsFile||"AGENTS.md") + " y construye el proyecto según esas instrucciones. Empieza por la estructura base y dime qué vas a hacer antes de comenzar."}</div><button onClick={()=>navigator.clipboard.writeText("Lee el archivo "+(env?.instructionsFile||"AGENTS.md")+" y construye el proyecto según esas instrucciones. Empieza por la estructura base y dime qué vas a hacer antes de comenzar.")} style={{...BS,marginTop:"8px",background:C.blue,color:"#fff",border:"none",fontSize:"11px"}}>📋 Copiar mensaje para la IA</button></div>],
                  ].map(([n,title,desc]) => (
                    <div key={n} style={{display:"flex",gap:"16px",marginBottom:"20px",paddingBottom:"20px",borderBottom:"1px solid "+C.border}}>
                      <div style={{width:"28px",height:"28px",background:"linear-gradient(135deg,"+C.blue+","+C.purple+")",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:"700",fontSize:"12px",flexShrink:0}}>{n}</div>
                      <div style={{flex:1}}><div style={{fontWeight:"600",fontSize:"13px",marginBottom:"4px"}}>{title}</div><div style={{color:C.textMid,fontSize:"12px",lineHeight:"1.7"}}>{desc}</div></div>
                    </div>
                  ))}
                  <div style={{background:C.bgHover,borderRadius:"8px",padding:"10px 14px"}}>
                    <div style={{color:C.textMid,fontSize:"11px"}}>⚙️ <strong>Requisito:</strong> Node.js 18+ instalado. Verifica con: <code style={{color:C.blue}}>node --version</code><br/>Si dice "no reconocido": descarga Node.js desde <a href="https://nodejs.org" target="_blank" rel="noreferrer" style={{color:C.blue}}>nodejs.org</a> → botón LTS</div>
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

function PTitle({ icon, t, s }) {
  return <div style={{ marginBottom: "24px" }}><div style={{ fontWeight: "800", fontSize: "20px", color: "#1E293B", marginBottom: "4px" }}>{icon} {t}</div><div style={{ color: "#64748B", fontSize: "13px" }}>{s}</div></div>;
}
function Lbl({ children }) {
  return <div style={{ color: "#64748B", fontSize: "11px", fontWeight: "600", letterSpacing: "0.06em", marginBottom: "6px", textTransform: "uppercase" }}>{children}</div>;
}
function Bdg({ color, children }) {
  return <span style={{ background: color + "1A", color, border: "1px solid " + color + "44", borderRadius: "4px", padding: "1px 5px", fontSize: "9px", fontWeight: "700" }}>{children}</span>;
}
function NavBtns({ step, setStep, ok }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid #E2E8F0" }}>
      {step > 1 ? <button onClick={() => setStep(s => s - 1)} style={{ ...BS, background: "#F1F4FD", color: "#475569", border: "1px solid #E2E8F0" }}>← Anterior</button> : <div />}
      {step < 6 && <button onClick={() => { if (ok) setStep(s => s + 1); }} disabled={!ok} style={{ ...BS, background: ok ? "linear-gradient(135deg,#3B82F6,#8B5CF6)" : "#F1F4FD", color: ok ? "#fff" : "#94A3B8", border: "none", fontWeight: "600", padding: "10px 28px", boxShadow: ok ? "0 4px 12px rgba(59,130,246,0.3)" : "none" }}>Siguiente →</button>}
    </div>
  );
}

const IS = { background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", color: "#1E293B", padding: "8px 12px", fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: "13px", outline: "none", boxSizing: "border-box" };
const BS = { border: "1px solid #E2E8F0", borderRadius: "8px", cursor: "pointer", padding: "7px 14px", fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: "12px", transition: "all 0.15s" };
