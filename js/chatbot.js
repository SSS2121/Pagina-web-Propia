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

    async generateResponse(userInput) {
        // Here we would perform the inference with this.session
        // For now, since the model might not be there or we don't know the schema,
        // we'll implement a basic context-aware response using the config info
        
        const input = userInput.toLowerCase();
        const info = this.config.personal_info;

        // Basic keyword matching as fallback or for "personality"
        if (input.includes('hola') || input.includes('hello')) {
            return this.getGreeting();
        }
        if (input.includes('quién') || input.includes('who')) {
            return `Soy el asistente de ${info.nombre}. Él es un ${info.estudios}.`;
        }
        if (input.includes('n8n') || input.includes('automatización') || input.includes('automation')) {
            return `Santiago tiene experiencia en ${info.experiencia[0]} y otras integraciones como ${info.experiencia[1]}.`;
        }
        if (input.includes('contacto') || input.includes('contact')) {
            return `Puedes contactar a Santiago en ${info.contacto.email} o ver su GitHub: ${info.contacto.github}`;
        }

        // If model is loaded, we could try to run inference here
        // const inputs = { input_ids: ... };
        // const outputs = await this.session.run(inputs);
        
        return "Esa es una buena pregunta. Santiago está especializado en IA y automatización. Si deseas detalles específicos sobre sus proyectos, te recomiendo revisar la sección de Proyectos en esta página.";
    }

    addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message message-${sender}`;
        msgDiv.textContent = text;
        this.messagesContainer.appendChild(msgDiv);
        this.scrollToBottom();
    }

    async showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'typingIndicator';
        indicator.className = 'message message-bot typing-indicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.messagesContainer.appendChild(indicator);
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
