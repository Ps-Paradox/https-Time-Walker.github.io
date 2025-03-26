// === Utility Functions ===
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
    return JSON.parse(jsonPayload);
}
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
function throttle(func, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
function createToolCard(tool, isFocusable = false) {
    const card = document.createElement('div');
    card.className = 'ai-tool-card';
    if (isFocusable) {
        card.tabIndex = 0; // Make focusable for search results
    }

const img = document.createElement('img');
img.src = tool.image_url;
img.alt = tool.name;
img.loading = 'lazy';

const contentDiv = document.createElement('div');
contentDiv.className = 'content';

const h3 = document.createElement('h3');
h3.textContent = tool.name;

const categoryDiv = document.createElement('div');
categoryDiv.className = 'category';
categoryDiv.textContent = tool.category;

const p = document.createElement('p');
p.textContent = tool.description;

contentDiv.appendChild(h3);
contentDiv.appendChild(categoryDiv);
contentDiv.appendChild(p);

const link = document.createElement('a');
link.href = tool.link;
link.target = '_blank';

card.appendChild(img);
card.appendChild(contentDiv);
card.appendChild(link);

return card;

}
// === Loading Screen ===
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');
});
// === Theme Management ===
const themeToggle = document.getElementById('theme-toggle');
let isLightMode;
// Check system preference first, then localStorage
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const storedTheme = localStorage.getItem('theme');
isLightMode = storedTheme ? storedTheme === 'light' : systemPrefersLight;
function setTheme() {
    document.body.classList.toggle('light-mode', isLightMode);
    themeToggle.innerHTML = isLightMode
        ? '<i class="fas fa-moon"></i> Dark Mode'
        : '<i class="fas fa-sun"></i> Light Mode';
    updateParticles();
}
themeToggle.addEventListener('click', () => {
    isLightMode = !isLightMode;
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    setTheme();
});
// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        isLightMode = e.matches;
        setTheme();
    }
});
// Initialize theme on load
setTheme();
// === Particles Configuration ===
function initParticles(containerId, config) {
    const container = document.getElementById(containerId);
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                particlesJS(containerId, config);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    observer.observe(container);
}
function updateParticles() {
    initParticles('particles-js', {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: isLightMode ? ['#ff6f61', '#a3dffa'] : ['#ff00a0', '#00eaff'] },
            shape: { type: 'polygon', polygon: { nb_sides: 5 } },
            opacity: { value: 0.7, random: true },
            size: { value: 5, random: true, anim: { enable: true, speed: 2, size_min: 2 } },
            line_linked: {
                enable: true,
                distance: 150,
                color: isLightMode ? '#a3dffa' : '#00eaff',
                opacity: 0.4,
                width: 1.5
            },
            move: { enable: true, speed: 3, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
            modes: { grab: { distance: 200, line_linked: { opacity: 0.7 } }, push: { particles_nb: 4 } }
        }
    });

initParticles('global-particles', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 1000 } },
        color: { value: isLightMode ? ['#ffcc80', '#81d4fa'] : ['#ff3366', '#33ccff'] },
        shape: { type: 'circle' },
        opacity: { value: 0.6, random: true },
        size: { value: 4, random: true },
        line_linked: {
            enable: true,
            distance: 100,
            color: isLightMode ? '#81d4fa' : '#33ccff',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: { enable: true, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'bubble' }, onclick: { enable: true, mode: 'repulse' } },
        modes: { bubble: { distance: 200, size: 6, opacity: 0.8 }, repulse: { distance: 150 } }
    }
});

initParticles('footer-particles', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: isLightMode ? ['#ff6f61', '#a3dffa'] : ['#ff00a0', '#00eaff'] },
        shape: { type: 'star' },
        opacity: { value: 0.8, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 2, direction: 'top', random: true, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100 }, push: { particles_nb: 5 } }
    }
});

}
// === 3D Globe in Sidebar ===
const globeContainer = document.getElementById('globe-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, globeContainer.clientWidth / 150, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(globeContainer.clientWidth, 150);
globeContainer.appendChild(renderer.domElement);
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0x00eaff, wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
camera.position.z = 3;
let isGlobeAnimating = true;
function animateGlobe() {
    if (isGlobeAnimating) {
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    requestAnimationFrame(animateGlobe);
}
animateGlobe();
// Responsive Globe Adjustment
window.addEventListener('resize', () => {
    const newWidth = globeContainer.clientWidth;
    camera.aspect = newWidth / 150;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, 150);
});
// === VR Mode ===
const vrToggle = document.getElementById('vr-toggle');
const vrScene = document.getElementById('vr-scene');
const mainContent = document.querySelector('.main-content');
let isVRMode = false;
vrToggle.addEventListener('click', () => {
    isVRMode = !isVRMode;
    vrScene.style.display = isVRMode ? 'block' : 'none';
    mainContent.style.display = isVRMode ? 'none' : 'block';
    vrToggle.innerHTML = isVRMode
        ? '<i class="fas fa-vr-cardboard"></i> Exit VR'
        : '<i class="fas fa-vr-cardboard"></i> VR Mode';
    isGlobeAnimating = !isVRMode;
});
// === Chatbot Toggle ===
const chatbotToggle = document.getElementById('chatbot-toggle');
const voiceChatbot = document.getElementById('voice-chatbot');
let isChatbotVisible = true;
chatbotToggle.addEventListener('click', () => {
    isChatbotVisible = !isChatbotVisible;
    voiceChatbot.classList.toggle('hidden', !isChatbotVisible);
    chatbotToggle.innerHTML = isChatbotVisible
        ? '<i class="fas fa-robot"></i> AI Assistant'
        : '<i class="fas fa-robot"></i> Show Assistant';
});
// === Google Sign-In ===
window.handleCredentialResponse = (response) => {
    const responsePayload = parseJwt(response.credential);
    document.getElementById('userInfo').textContent = responsePayload.name;
};
// === Blog Posts Data ===
const mockPosts = [
    {
        category: "AI News",
        title: "Neural Networks Achieve Creative Breakthrough",
        content: "A revolutionary new neural network architecture has redefined digital art creation, allowing AIs to develop unique artistic styles that art critics can't distinguish from human artists...",
        image_url: "media/ai_breakthrough.jpg"
    },
    {
        category: "AI News",
        title: "Quantum AI Processing Enters New Era",
        content: "Scientists have successfully integrated quantum computing principles with neural networks, creating hybrid systems capable of processing calculations that would take traditional supercomputers millennia...",
        image_url: "media/quantum_ai.jpg"
    },
    {
        category: "Gaming News",
        title: "Cyberpunk 2077: Night City Reborn",
        content: "CD Projekt Red announces a massive overhaul including new missions, enhanced graphics, and revolutionary AI-driven NPCs that create truly dynamic storytelling experiences...",
        image_url: "media/cyberpunk_update.jpg"
    },
    {
        category: "Gaming News",
        title: "Virtual RealityI Gaming Revolution",
        content: "The next generation of VR headsets promises neural feedback technology, allowing players to feel sensations from their virtual environments for the first time...",
        image_url: "media/vr_gaming.jpg"
    },
    {
        category: "Gacha Updates",
        title: "Neon Samurai: Limited Banner Revealed",
        content: "The highly anticipated cyberpunk-inspired character combines katana combat with digital hacking abilities, setting a new meta for competitive play...",
        image_url: "media/neon_samurai.jpg"
    },
    {
        category: "Gacha Updates",
        title: "Collaborative Event: Cyberpunk Crossover",
        content: "For the first time, players can recruit iconic characters from Night City in this unprecedented collaboration between gaming universes...",
        image_url: "media/crossover_event.jpg"
    }
];
// Populate Blog Posts
const grids = {
    "AI News": document.getElementById('ai-news-grid'),
    "Gaming News": document.getElementById('gaming-news-grid'),
    "Gacha Updates": document.getElementById('gacha-updates-grid')
};
mockPosts.forEach(post => {
    const grid = grids[post.category];
    if (!grid) return;

const card = document.createElement('div');
card.className = 'blog-card';

const img = document.createElement('img');
img.src = post.image_url;
img.alt = post.title;
img.loading = 'lazy';

const contentDiv = document.createElement('div');
contentDiv.className = 'content';

const h3 = document.createElement('h3');
h3.className = post.category === "AI News" ? "neon-magenta" : "neon-cyan";
h3.textContent = post.title;

const p = document.createElement('p');
p.textContent = post.content.substring(0, 100) + '...';

const button = document.createElement('button');
button.className = post.category === "AI News" ? "neon-button-magenta" : "neon-button-cyan";
button.textContent = 'Read More';
button.setAttribute('data-full-content', post.content);

contentDiv.appendChild(h3);
contentDiv.appendChild(p);
contentDiv.appendChild(button);

card.appendChild(img);
card.appendChild(contentDiv);

grid.appendChild(card);

});
// Add Read More Functionality
document.querySelectorAll('.blog-card button').forEach(button => {
    button.addEventListener('click', () => {
        const fullContent = button.getAttribute('data-full-content');
        const contentDiv = button.parentElement.querySelector('p');
        const isExpanded = contentDiv.textContent.endsWith('...');
        contentDiv.textContent = isExpanded ? fullContent : fullContent.substring(0, 100) + '...';
        button.textContent = isExpanded ? 'Read Less' : 'Read More';
    });
});
// === AI Tools Data ===
const aiTools = [
    { name: "xAI", category: "Chatbot", description: "An AI developed by xAI to assist users in understanding the universe and answering complex questions with a focus on truth and reasoning.", image_url: "media/xai_logo.jpg", link: "https://xai.ai" },
    { name: "ChatGPT", category: "Chatbot", description: "A conversational AI model by OpenAI, capable of answering questions, generating text, and assisting with various tasks using natural language understanding.", image_url: "media/chatgpt_logo.jpg", link: "https://chat.openai.com" },
    { name: "Claude", category: "Chatbot", description: "A conversational AI model by Anthropic, designed to be helpful, safe, and aligned with human values, competing with models like ChatGPT.", image_url: "media/claude_logo.jpg", link: "https://www.anthropic.com/claude" },
    { name: "Alibaba Wan 2.1", category: "Video Generation", description: "Open-source text-to-video AI service by Alibaba. Generates high-quality videos from text, images, or video prompts with complex motion and realistic physics.", image_url: "media/alibaba_logo.jpg", link: "https://www.alibaba.com" },
    { name: "Hunyuan Video", category: "Video Generation", description: "Text-to-video generation model with a unified architecture for images and videos. Uses a special Transformer design called 'DualSTREAM to Single-stream'.", image_url: "media/tencent_logo.jpg", link: "https://www.tencent.com" },
    { name: "Riffusion", category: "Music Generation", description: "Tool that leverages Stable Diffusion to generate audio clips from text. Offers an interactive web app for creating music across various genres and instruments.", image_url: "media/riffusion_logo.jpg", link: "https://www.riffusion.com" },
    { name: "Suno", category: "Music Generation", description: "A generative AI music creation program that produces realistic songs combining vocals and instrumentation based on user text prompts.", image_url: "media/suno_logo.jpg", link: "https://www.suno.ai" },
    { name: "Kling", category: "Video Generation", description: "AI video generation tool with image-to-video conversion capabilities. Offers features similar to Hailuo AI but with potentially longer clip durations.", image_url: "media/kling_logo.jpg", link: "https://www.klingai.com" },
    { name: "Perplexity", category: "Information Retrieval", description: "AI-powered search engine with natural language processing capabilities. Offers features like content generation, mobile, and Chrome extension.", image_url: "media/perplexity_logo.jpg", link: "https://www.perplexity.ai" },
    { name: "Character AI", category: "Chatbot", description: "A chatbot platform that allows users to create and interact with AI-powered characters. Features include natural language processing and custom character creation.", image_url: "media/character_ai_logo.jpg", link: "https://www.character.ai" },
    { name: "TensorArt", category: "Image Generation", description: "A platform for generating AI art based on Flux and Stable Diffusion, offering tools and workflows for creating images.", image_url: "media/tensorart_logo.jpg", link: "https://www.tensor.art" },
    { name: "DeepSeek R1", category: "Problem Solving", description: "An open-source large language model specializing in mathematics, coding, and logical reasoning tasks.", image_url: "media/deepseek_logo.jpg", link: "https://www.deepseek.com" }
];
// Populate AI Tools
const aiToolsGrid = document.getElementById('ai-tools-grid');
aiTools.forEach(tool => {
    const card = createToolCard(tool);
    aiToolsGrid.appendChild(card);
});
// === GSAP Animations ===
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.blog-card, .ai-tool-card').forEach((card, i) => {
    gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%' }
        }
    );
});
gsap.utils.toArray('section h2').forEach(heading => {
    gsap.fromTo(
        heading,
        { opacity: 0, scale: 0.8 },
        {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: { trigger: heading, start: 'top 80%' }
        }
    );
});
// === Email Signup ===
const emailForm = document.getElementById('email-signup-form');
emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
}

emailForm.innerHTML = `<div class="neon-cyan neon-pulse">Thanks for subscribing!</div>`;
console.log(`Subscribed with: ${email}`);

});
// === Search Functionality ===
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const categoryButtons = document.querySelectorAll('.category-button');
// Create a clear button
const clearButton = document.createElement('button');
clearButton.className = 'clear-search';
clearButton.innerHTML = '&times;';
clearButton.style.display = 'none';
searchInput.parentElement.style.position = 'relative';
searchInput.parentElement.appendChild(clearButton);
// Style the clear button
clearButton.style.position = 'absolute';
clearButton.style.right = '10px';
clearButton.style.top = '50%';
clearButton.style.transform = 'translateY(-50%)';
clearButton.style.background = 'none';
clearButton.style.border = 'none';
clearButton.style.fontSize = '16px';
clearButton.style.cursor = 'pointer';
clearButton.style.color = '#fff';
function performSearch(query) {
    searchResults.innerHTML = '';
    const loading = document.createElement('p');
    loading.textContent = 'Loading...';
    searchResults.appendChild(loading);

setTimeout(() => {
    const results = aiTools.filter(tool =>
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.category.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    );

    searchResults.innerHTML = '';
    if (results.length > 0) {
        results.forEach((tool, index) => {
            const card = createToolCard(tool, true);
            searchResults.appendChild(card);
            if (index === 0) {
                card.focus();
            }
        });
    } else {
        const noResults = document.createElement('p');
        noResults.textContent = 'No results found.';
        searchResults.appendChild(noResults);
    }
}, 300);

}
// Show/hide clear button based on input
searchInput.addEventListener('input', () => {
    clearButton.style.display = searchInput.value.trim() ? 'block' : 'none';
});
// Clear search on button click
clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchResults.innerHTML = '';
    clearButton.style.display = 'none';
});
const debouncedSearch = debounce(performSearch, 300);
searchButton.addEventListener('click', () => debouncedSearch(searchInput.value.trim()));
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') debouncedSearch(searchInput.value.trim());
});
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.textContent;
        performSearch(category);
        searchInput.value = category;
    });
});
// === Voice Chatbot ===
const voiceButton = document.getElementById('voice-button');
const chatbotResponse = document.getElementById('chatbot-response');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
// Add ARIA attributes
voiceButton.setAttribute('aria-label', 'Toggle voice chatbot');
voiceButton.setAttribute('role', 'button');
voiceButton.tabIndex = 0;
chatbotResponse.setAttribute('aria-live', 'polite');
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

const toggleVoiceChatbot = () => {
    const isListening = voiceButton.classList.contains('listening');
    voiceButton.classList.toggle('listening');
    voiceButton.textContent = isListening ? 'Speak' : 'Listening...';
    voiceButton.setAttribute('aria-pressed', isListening ? 'false' : 'true');
    isListening ? recognition.stop() : recognition.start();
};

voiceButton.addEventListener('click', toggleVoiceChatbot);
voiceButton.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleVoiceChatbot();
    }
});

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    voiceButton.classList.remove('listening');
    voiceButton.textContent = 'Speak';
    voiceButton.setAttribute('aria-pressed', 'false');

    let response = "I didn't quite catch that. Could you repeat?";
    if (transcript.includes('hello') || transcript.includes('hi')) {
        response = "Hey there! How can I assist you today?";
    } else if (transcript.includes('news')) {
        response = "Looking for news? Check out the AI News and Gaming News sections above!";
    } else if (transcript.includes('gacha')) {
        response = "Gacha updates are live! Scroll up to the Gacha Updates section for the latest events.";
    } else if (transcript.includes('ai tools')) {
        response = "I can help with that! Navigate to the AI Tools section or use the search bar to find the best AI tools.";
    } else if (transcript.includes('subscribe')) {
        response = "Want to subscribe? Head to the Email Signup section to join our newsletter!";
    }

    chatbotResponse.textContent = response;
    const utterance = new SpeechSynthesisUtterance(response);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
};

recognition.onerror = () => {
    voiceButton.classList.remove('listening');
    voiceButton.textContent = 'Speak';
    voiceButton.setAttribute('aria-pressed', 'false');
    chatbotResponse.textContent = 'Sorry, there was an error with speech recognition.';
};

} else {
    voiceButton.disabled = true;
    voiceButton.textContent = 'Unsupported';
    voiceButton.setAttribute('aria-disabled', 'true');
    chatbotResponse.textContent = 'Speech recognition is not supported in this browser.';
}
// === Back to Top Button ===
const backToTopButton = document.getElementById('back-to-top');
const handleScroll = throttle(() => {
    backToTopButton.classList.toggle('visible', window.scrollY > 300);
}, 100);
window.addEventListener('scroll', handleScroll);
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
