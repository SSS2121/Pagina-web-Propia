# 🌌 Portafolio — Santiago Serna Solarte

Sitio web personal construido con HTML + CSS + JavaScript vanilla. Desplegado en Vercel vía GitHub.

---

## 🚀 Guía Rápida de Actualización de Contenido

### 📸 Agregar tu Foto de Perfil

1. Coloca tu foto en `assets/images/` con el nombre **`profile.jpg`**
2. Haz `git add . && git commit -m "Agrego foto de perfil" && git push`
3. Vercel actualizará el sitio automáticamente en ~30 segundos.

> Si no hay foto, el sitio mostrará tus iniciales **SS** con estilo.

---

### 🚀 Agregar un Nuevo Proyecto

Edita el archivo `data/projects.json` y agrega un objeto al array:

```json
{
  "id": 2,
  "title": "Nombre de tu Proyecto",
  "github": "https://github.com/SSS2121/nombre-del-repo",
  "status": "production",
  "icon": "🤖",
  "description_es": "Descripción en español...",
  "description_en": "Description in English...",
  "tags": ["Python", "TensorFlow", "PostgreSQL"]
}
```

**Valores válidos para `status`:** `"production"` | `"development"`

---

### 📜 Agregar un Certificado

**Paso 1:** Copia la imagen del certificado a `assets/certificates/`
- Formatos aceptados: `.jpg`, `.jpeg`, `.png`, `.webp`
- Nombre sugerido: `cert_coursera_ml.jpg` (sin espacios)

**Paso 2:** Abre `data/certificates.json` y agrega una entrada al array:

```json
{
  "id": 2,
  "title": "Machine Learning Specialization",
  "institution": "Coursera / DeepLearning.AI",
  "date": "2025-03",
  "image": "assets/certificates/cert_ml.jpg",
  "category": "Machine Learning",
  "description_es": "Especialización en modelos supervisados y no supervisados.",
  "description_en": "Specialization in supervised and unsupervised models."
}
```

**Paso 3:** `git add . && git commit -m "Agrego certificado ML" && git push`

---

## 🌐 Estructura del Proyecto

```
📁 Pagina web/
├── index.html                  # Página principal (SPA)
├── css/
│   └── styles.css              # Sistema de diseño completo
├── js/
│   └── main.js                 # Animaciones, i18n, interacciones
├── data/
│   ├── projects.json           # ← Edita aquí para agregar proyectos
│   └── certificates.json       # ← Edita aquí para agregar certificados
├── assets/
│   ├── images/
│   │   └── profile.jpg         # ← Coloca aquí tu foto de perfil
│   └── certificates/           # ← Coloca aquí las imágenes de certificados
└── README.md                   # Este archivo
```

---

## 💻 Desarrollo Local

Para previsualizar el sitio localmente (necesario porque el sitio carga archivos JSON):

```bash
# Opción 1: Con npx (recomendado, sin instalar nada)
npx serve .

# Opción 2: Con Python
python -m http.server 8000

# Opción 3: VS Code → instala extensión "Live Server" → clic derecho en index.html → "Open with Live Server"
```

Luego abre `http://localhost:3000` (o el puerto que indique).

> ⚠️ No abras `index.html` directamente con doble clic — los archivos JSON no cargarán correctamente por restricciones del navegador.

---

## 🚀 Despliegue en Vercel

1. Sube el proyecto a un nuevo repositorio en GitHub
2. Ve a [vercel.com](https://vercel.com) → New Project → Import desde GitHub
3. Vercel detecta automáticamente que es un sitio estático
4. Framework Preset: **Other** | Root directory: `./`
5. Deploy → ¡listo!

Cada `git push` a la rama principal actualiza el sitio automáticamente.

---

## 🎨 Paleta de Colores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#000000` | Fondo principal |
| `--purple` | `#6A0DAD` | Acento principal |
| `--purple-light` | `#9B30FF` | Hover / highlights |
| `--purple-pale` | `#C084FC` | Texto de acento suave |
| `--text` | `#E8E8F4` | Texto principal |
| `--text-dim` | `#8888AA` | Texto secundario |
