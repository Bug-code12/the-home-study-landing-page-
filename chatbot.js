class Chatbot {
    constructor() {
        this.messages = [
            {
                id: 1,
                text: "Hello! How can I help you today?",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            }
        ];
        this.isOpen = false;
        this.isTyping = false;
        this.init();
    }

    init() {
        // Create chatbot elements
        this.createChatbotElements();
        // Add event listeners
        this.addEventListeners();
    }

    createChatbotElements() {
        // Create main container
        const container = document.createElement('div');
        container.className = 'chatbot-container';
        container.innerHTML = `
            <button class="chatbot-toggle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </button>
            <div class="chatbot-window" style="display: none;">
                <div class="chatbot-header">
                    <h3>Chat Support</h3>
                    <button class="chatbot-close">×</button>
                </div>
                <div class="chatbot-messages"></div>
                <form class="chatbot-form">
                    <input type="text" placeholder="Type your message..." required>
                    <button type="submit">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(container);
        this.container = container;
    }

    addEventListeners() {
        const toggle = this.container.querySelector('.chatbot-toggle');
        const close = this.container.querySelector('.chatbot-close');
        const form = this.container.querySelector('.chatbot-form');
        const window = this.container.querySelector('.chatbot-window');

        toggle.addEventListener('click', () => {
            window.style.display = window.style.display === 'none' ? 'flex' : 'none';
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.renderMessages();
                toggle.style.display = 'none';
            } else {
                toggle.style.display = 'flex';
            }
        });

        close.addEventListener('click', () => {
            window.style.display = 'none';
            this.isOpen = false;
            toggle.style.display = 'flex';
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const message = input.value.trim();
            if (message) {
                this.handleSendMessage(message);
                input.value = '';
            }
        });
    }

    handleSendMessage(message) {
        // Add user message
        this.messages.push({
            id: Date.now(),
            text: message,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        });
        this.renderMessages();

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate bot response
        setTimeout(() => {
            this.messages.push({
                id: Date.now() + 1,
                text: this.getBotResponse(message),
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString()
            });
            this.hideTypingIndicator();
            this.renderMessages();
        }, 2000);
    }

    getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('sign up') || lowerMessage.includes('signup') || lowerMessage.includes('how can i sign up')) {
            return "To sign up, you need to complete 3 videos first. This will help you understand our platform better!";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! How can I assist you today?";
        } else if (lowerMessage.includes('help')) {
            return "I'm here to help! What would you like to know?";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else {
            return "I understand. How can I help you further?";
        }
    }

    showTypingIndicator() {
        const messagesContainer = this.container.querySelector('.chatbot-messages');
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = this.container.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    renderMessages() {
        const messagesContainer = this.container.querySelector('.chatbot-messages');
        messagesContainer.innerHTML = this.messages.map(message => `
            <div class="message ${message.sender}">
                <div class="message-content">
                    <p>${message.text}</p>
                    <span class="timestamp">${message.timestamp}</span>
                </div>
            </div>
        `).join('');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
}); 