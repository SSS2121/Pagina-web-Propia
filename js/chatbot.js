/* ============================================================
   SANTIAGO SERNA SOLARTE — CHATBOT LOGIC
   ONNX Runtime Web Integration
   ============================================================ */

class ChatBot {
    constructor() {
        this.config = null;
        this.session = null;
        this.isOpen = false;
        this.isModelLoaded = false;
        this.context = 'idle';

        
        // UI Elements
        this.launcher = document.getElementById('chatbotLauncher');
        this.window = document.getElementById('chatbotWindow');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSend');
        
        this.init();
    }

    async init() {
        try {
            const response = await fetch('data/chatbot_config.json');
            this.config = await response.json();
            
            this.setupEventListeners();
            this.addMessage('bot', this.getGreeting());
            
            // Lazy load model when window is opened for the first time
        } catch (error) {
            console.error('Error initializing chatbot:', error);
        }
    }

    setupEventListeners() {
        this.launcher.addEventListener('click', () => this.toggleWindow());
        
        this.sendBtn.addEventListener('click', () => this.handleSendMessage());
        
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });

        // Listen for language changes from main.js (if applicable)
        document.getElementById('langToggle')?.addEventListener('click', () => {
            // Language change is handled by main.js, but we might want to refresh placeholders
            setTimeout(() => this.updatePlaceholders(), 50);
        });
    }

    toggleWindow() {
        this.isOpen = !this.isOpen;
        this.window.classList.toggle('open', this.isOpen);
        this.launcher.classList.toggle('active', this.isOpen);
        
        if (this.isOpen && !this.isModelLoaded) {
            this.loadModel();
        }
        
        if (this.isOpen) {
            this.input.focus();
        }
    }

    async loadModel() {
        if (typeof ort === 'undefined') {
            console.warn('ONNX Runtime not found. Waiting for CDN...');
            return;
        }

        try {
            console.log('Loading ONNX model from:', this.config.model_path);
            // This is where we load the session
            this.session = await ort.InferenceSession.create(this.config.model_path);
            this.isModelLoaded = true;
            console.log('Model loaded successfully');
        } catch (e) {
            console.error('Failed to load ONNX model. Ensure the file exists at', this.config.model_path);
            // Fallback to simpler logic or just show error
        }
    }

    async handleSendMessage() {
        const text = this.input.value.trim();
        if (!text) return;

        this.addMessage('user', text);
        this.input.value = '';
        
        await this.showTypingIndicator();
        
        // Generate response
        const response = await this.generateResponse(text);
        
        this.hideTypingIndicator();
        this.addMessage('bot', response);
    }

    normalize(str) {
        return str.toLowerCase()
                  .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
                  .replace(/[^\w\s]/gi, '') // remove punctuation
                  .trim();
    }

    async generateResponse(userInput) {
        const input = this.normalize(userInput);
        const lang = document.documentElement.lang || 'es';
        const info = this.config.personal_info;

        const isAffirmative = input.includes('vale') || input.includes('si') || input.includes('ok') || input.includes('claro') || input.includes('por supuesto') || input.includes('dale');
        const isNavigationRequest = input.includes('llevame') || input.includes('ir a') || input.includes('muestrame') || input.includes('quiero ver') || input.includes('lleve') || input.includes('navegar') || input.includes('ver');
        
        const mentionsSection = input.includes('contacto') || input.includes('proyecto') || input.includes('certificado') || input.includes('sobre mi') || input.includes('acerca de') || input.includes('portafolio') || input.includes('estudio') || input.includes('diploma');

        // --- 1. MEMORIA CONTEXTUAL (Follow-ups) ---
        // Solo actua por contexto si el mensaje NO menciona una sección nueva explícitamente
        if (!mentionsSection) {
            if (this.context === 'contacto' && (isAffirmative || input.includes('mas informacion') || input.includes('correo') || input.includes('email'))) {
                this.context = 'idle';
                return lang === 'es' ? 
                    `¡Genial! Puedes enviarle un correo a ${info.contacto.email} o visitar su GitHub en ${info.contacto.github}.` :
                    `Great! You can email him at ${info.contacto.email} or visit his GitHub at ${info.contacto.github}.`;
            } else if (this.context === 'contacto' && isNavigationRequest) {
                this.context = 'idle';
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                return lang === 'es' ? "¡Claro! Te he llevado a la sección de contacto." : "Sure! I've taken you to the contact section.";
            }

            if (this.context === 'proyectos' && (isAffirmative || isNavigationRequest || input.includes('mas'))) {
                this.context = 'idle';
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                return lang === 'es' ? "Te he llevado a la sección de proyectos para que puedas verlos en detalle." : "I've taken you to the projects section so you can see them in detail.";
            }

            if (this.context === 'certificados' && (isAffirmative || isNavigationRequest)) {
                this.context = 'idle';
                document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
                return lang === 'es' ? "Te he llevado a la bóveda de certificados." : "I've taken you to the certificates vault.";
            }

            if (this.context === 'sobre_mi' && (isAffirmative || isNavigationRequest)) {
                this.context = 'idle';
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                return lang === 'es' ? "Te he llevado a la sección sobre mí." : "I've taken you to the about section.";
            }
        }


        // --- 2. NAVEGACIÓN DIRECTA EXPLICITA ---
        if (isNavigationRequest) {
            if (input.includes('contacto')) {
                this.context = 'idle';
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                return lang === 'es' ? "¡Claro! Te he llevado a la sección de contacto." : "Sure! I've taken you to the contact section.";
            } else if (input.includes('proyecto') || input.includes('portafolio')) {
                this.context = 'idle';
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                return lang === 'es' ? "Aquí tienes la sección de proyectos." : "Here is the projects section.";
            } else if (input.includes('certificado') || input.includes('diploma') || input.includes('estudio')) {
                this.context = 'idle';
                document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' });
                return lang === 'es' ? "Te he llevado a la bóveda de certificados." : "I've taken you to the certificates vault.";
            } else if (input.includes('sobre mi') || input.includes('acerca de') || input.includes('quien es')) {
                this.context = 'idle';
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                return lang === 'es' ? "Aquí puedes leer más sobre Santiago." : "Here you can read more about Santiago.";
            } else if (!mentionsSection) {
                // Pidió que lo llevaran pero no dijo a dónde (y no había contexto previo)
                return lang === 'es' ? 
                    "¿A qué sección te gustaría ir? Puedes elegir: Sobre mí, Proyectos, Certificados o Contacto." : 
                    "Where would you like to go? You can choose: About, Projects, Certificates, or Contact.";
            }
        }


        // --- 3. TEMAS Y PREGUNTAS (Sin pedir navegación todavía) ---
        if (input.includes('proyecto') || input.includes('portafolio') || input.includes('trabajos')) {
            this.context = 'proyectos';
            if (window.projectsData && window.projectsData.length > 0) {
                const projNames = window.projectsData.map(p => lang === 'es' ? p.title : (p.title_en || p.title)).join(", ");
                return lang === 'es' ? 
                    `Santiago ha trabajado en sistemas increíbles, por ejemplo: ${projNames}. ¿Te gustaría que te lleve a la sección de proyectos para verlos a detalle?` : 
                    `Santiago has built amazing systems, such as: ${projNames}. Would you like me to take you to the projects section to see them?`;
            }
            return lang === 'es' ? "Santiago tiene experiencia en automatización con n8n e IA. ¿Quieres que te lleve a la sección de proyectos?" : "Santiago has experience in n8n automation and AI. Want me to take you to the projects section?";
        }

        if (input.includes('certificado') || input.includes('estudio') || input.includes('diploma')) {
            this.context = 'certificados';
            return lang === 'es' ? 
                "Santiago cuenta con certificaciones técnicas en su área. ¿Te gustaría que te lleve a la bóveda de certificados?" : 
                "Santiago has technical certifications in his field. Would you like me to take you to the certificates vault?";
        }

        if (input.includes('contacto') || input.includes('contact') || input.includes('hablar con el') || input.includes('escribirle')) {
            this.context = 'contacto';
            return lang === 'es' ? 
                `Puedes contactar a Santiago por correo electrónico. ¿Quieres que te lleve a la sección de contacto o te doy su correo por aquí?` : 
                `You can contact Santiago via email. Do you want me to take you to the contact section or give you his email here?`;
        }
        
        if (input.includes('sobre mi') || input.includes('acerca de santiago') || input.includes('quien es santiago') || input.includes('quien es el') || input.includes('santiago')) {
            this.context = 'sobre_mi';
            return lang === 'es' ? 
                `Él es un ${info.estudios} y se especializa en ${info.especialidad}. ¿Quieres que te lleve a la sección donde habla sobre él?` : 
                `He is a ${info.estudios} and specializes in ${info.especialidad}. Want me to take you to his about section?`;
        }


        // --- 4. IDENTIDAD Y DEFENSA ---
        if (input.includes('quien eres') || input.includes('quien te creo') || input.includes('que eres') || input.includes('tu creador')) {
            this.context = 'idle';
            return this.config.bot_identity ? this.config.bot_identity[lang] : "Fui creado por Santiago Serna Solarte como un asistente de IA.";
        }

        if (input.includes('malo') || input.includes('queja') || input.includes('critica') || input.includes('pesimo') || input.includes('no sirve') || input.includes('error') || input.includes('estupido')) {
            this.context = 'idle';
            return this.config.defense_responses ? this.config.defense_responses[lang] : "Santiago es un profesional dedicado, en constante aprendizaje y con gran capacidad de resolución de problemas.";
        }

        // --- 5. INFO GENERAL (Fallbacks conocidos) ---
        if (input.includes('ola') || input.includes('hola') || input.includes('hello') || input.includes('buenas')) {
            this.context = 'idle';
            return this.getGreeting();
        }
        if (input.includes('n8n') || input.includes('automatizacion') || input.includes('automation') || input.includes('ia') || input.includes('ai') || input.includes('machine learning')) {
            this.context = 'idle';
            return lang === 'es' ? `Tiene experiencia en ${info.experiencia[0]} y otras integraciones como ${info.experiencia[1]}.` : `He has experience in ${info.experiencia[0]} and other integrations like ${info.experiencia[1]}.`;
        }

        // --- FALLBACK GENERAL ---
        this.context = 'idle';
        return lang === 'es' ? 
            "Esa es una excelente pregunta. Santiago está especializado en IA, n8n y automatización. Si deseas detalles específicos, te recomiendo explorar las secciones de la página o pedirme ir a 'Proyectos'." : 
            "That's a great question. Santiago specializes in AI, n8n, and automation. For specific details, I recommend exploring the page sections or asking to go to 'Projects'.";
    }

    addMessage(sender, text) {
        const wrapper = document.createElement('div');
        wrapper.className = `message-wrapper message-wrapper-${sender}`;
        
        if (sender === 'bot') {
            const avatar = document.createElement('img');
            avatar.src = 'assets/images/ChatBot_Imagen.png';
            avatar.className = 'message-avatar';
            avatar.alt = 'Bot';
            wrapper.appendChild(avatar);
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = `message message-${sender}`;
        msgDiv.textContent = text;
        
        wrapper.appendChild(msgDiv);
        this.messagesContainer.appendChild(wrapper);
        this.scrollToBottom();
    }

    async showTypingIndicator() {
        const wrapper = document.createElement('div');
        wrapper.id = 'typingIndicator';
        wrapper.className = 'message-wrapper message-wrapper-bot';
        
        const avatar = document.createElement('img');
        avatar.src = 'assets/images/ChatBot_Imagen.png';
        avatar.className = 'message-avatar';
        avatar.alt = 'Bot';
        wrapper.appendChild(avatar);

        const indicator = document.createElement('div');
        indicator.className = 'message message-bot typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        wrapper.appendChild(indicator);
        this.messagesContainer.appendChild(wrapper);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    getGreeting() {
        const lang = document.documentElement.lang || 'es';
        return lang === 'es' ? this.config.ui.greeting_es : this.config.ui.greeting_en;
    }

    updatePlaceholders() {
        const lang = document.documentElement.lang || 'es';
        this.input.placeholder = lang === 'es' ? this.config.ui.placeholder_es : this.config.ui.placeholder_en;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.santiagoChatbot = new ChatBot();
    });
} else {
    window.santiagoChatbot = new ChatBot();
}
