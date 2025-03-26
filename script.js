// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');
});
// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    themeToggle.innerHTML = isLightMode 
        ? '<i class="fas fa-moon"></i> Dark Mode' 
        : '<i class="fas fa-sun"></i> Light Mode';
    updateParticles();
});
// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('header nav');
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});
// Function to update particles based on theme
function updateParticles() {
    const isLightMode = document.body.classList.contains('light-mode');

// Hero Section Particles
particlesJS('particles-js', {
    particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: isLightMode ? ['#ff3333', '#00f0ff'] : ['#ff3333', '#00f0ff'] },
        shape: { type: 'polygon', polygon: { nb_sides: 5 } },
        opacity: { value: 0.7, random: true },
        size: { value: 5, random: true, anim: { enable: true, speed: 2, size_min: 2 } },
        line_linked: { enable: true, distance: 150, color: isLightMode ? '#00f0ff' : '#00f0ff', opacity: 0.4, width: 1.5 },
        move: { enable: true, speed: 3, direction: 'none', out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 200, line_linked: { opacity: 0.7 } }, push: { particles_nb: 4 } }
    }
});

// Global Particles (DNA Helix Effect)
particlesJS('global-particles', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 1000 } },
        color: { value: isLightMode ? ['#ff3333', '#00f0ff'] : ['#ff3333', '#00f0ff'] },
        shape: { type: 'circle' },
        opacity: { value: 0.6, random: true },
        size: { value: 4, random: true },
        line_linked: { enable: true, distance: 100, color: isLightMode ? '#00f0ff' : '#00f0ff', opacity: 0.3, width: 1 },
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

// Footer Particles (Interactive Sparkles)
particlesJS('footer-particles', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: isLightMode ? ['#ff3333', '#00f0ff'] : ['#ff3333', '#00f0ff'] },
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
// Initial Particle Setup
updateParticles();
// Mock blog posts with images from assets folder
const mockPosts = [
    { 
        category: "AI News", 
        title: "Neural Networks Achieve Creative Breakthrough", 
        content: "A revolutionary new neural network architecture has redefined digital art creation, allowing AIs to develop unique artistic styles that art critics can't distinguish from human artists...", 
        image_url: "assets/pixel-1859401158091510-3.png" 
    },
    { 
        category: "AI News", 
        title: "Quantum AI Processing Enters New Era", 
        content: "Scientists have successfully integrated quantum computing principles with neural networks, creating hybrid systems capable of processing calculations that would take traditional supercomputers millennia...", 
        image_url: "assets/ai_quantum.png" // Adjust filename as needed
    },
    { 
        category: "Gaming News", 
        title: "Cyberpunk 2077: Night City Reborn", 
        content: "CD Projekt Red announces a massive overhaul including new missions, enhanced graphics, and revolutionary AI-driven NPCs that create truly dynamic storytelling experiences...", 
        image_url: "assets/cyberpunk_reborn.png" // Adjust filename as needed
    },
    { 
        category: "Gaming News", 
        title: "Virtual Reality Gaming Revolution", 
        content: "The next generation of VR headsets promises neural feedback technology, allowing players to feel sensations from their virtual environments for the first time...", 
        image_url: "assets/vr_revolution.png" // Adjust filename as needed
    },
    { 
        category: "Gacha Updates", 
        title: "Neon Samurai: Limited Banner Revealed", 
        content: "The highly anticipated cyberpunk-inspired character combines katana combat with digital hacking abilities, setting a new meta for competitive play...", 
        image_url: "assets/neon_samurai.png" // Adjust filename as needed
    },
    { 
        category: "Gacha Updates", 
        title: "Collaborative Event: Cyberpunk Crossover", 
        content: "For the first time, players can recruit iconic characters from Night City in this unprecedented collaboration between gaming universes...", 
        image_url: "assets/cyberpunk_crossover.png" // Adjust filename as needed
    }
];
// Gemini API Integration (Placeholder)
async function fetchBlogPostsFromGemini() {
    const apiKey = "YOUR_GEMINI_API_KEY"; // Replace with your Gemini API key
    const endpoint = "https://api.gemini.com/v1/generate"; // Replace with actual Gemini API endpoint

try {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: "Generate a blog post about recent AI advancements, gaming news, or gacha updates.",
            max_tokens: 200
        })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch blog posts from Gemini API');
    }

    const data = await response.json();
    // Assuming the API returns an array of posts in the format: { title, content, category }
    return data.posts || [];
} catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
}

}
// Load blog posts (use Gemini API if available, otherwise use mock posts)
async function loadBlogPosts() {
    let posts = await fetchBlogPostsFromGemini();

// If Gemini API fails or isn't set up, fall back to mock posts
if (posts.length === 0) {
    posts = mockPosts;
}

const grids = {
    "AI News": document.getElementById('ai-news-grid'),
    "Gaming News": document.getElementById('gaming-news-grid'),
    "Gacha Updates": document.getElementById('gacha-updates-grid')
};

posts.forEach((post, index) => {
    if (grids[post.category]) {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.setAttribute('data-post-id', index); // Unique ID for comments

        const buttonClass = post.category === "AI News" ? 
            "neon-button-red" : "neon-button-blue";

        card.innerHTML = `
            <img src="${post.image_url}" alt="${post.title}" />
            <div class="content">
                <h3 class="${post.category === "AI News" ? "neon-red" : "neon-blue"}">${post.title}</h3>
                <p class="preview">${post.content.substring(0, 100)}...</p>
                <button class="${buttonClass}" data-full-content="${post.content}">Read More</button>
                <div class="comments-section">
                    <h4>Comments</h4>
                    <div class="comments-list" data-post-id="${index}"></div>
                    <form class="comment-form">
                        <input type="text" placeholder="Add a comment..." required />
                        <button type="submit" class="neon-button-blue">Post</button>
                    </form>
                </div>
            </div>
        `;
        grids[post.category].appendChild(card);
    }
});

// Add Read More functionality
document.querySelectorAll('.blog-card button[data-full-content]').forEach(button => {
    button.addEventListener('click', () => {
        const fullContent = button.getAttribute('data-full-content');
        const contentDiv = button.parentElement.querySelector('p.preview');
        if (button.textContent === 'Read More') {
            contentDiv.textContent = fullContent;
            button.textContent = 'Read Less';
        } else {
            contentDiv.textContent = fullContent.substring(0, 100) + '...';
            button.textContent = 'Read More';
        }
    });
});

// Load comments and add comment functionality
loadComments();
addCommentFunctionality();

}
// Load comments from localStorage
function loadComments() {
    document.querySelectorAll('.comments-list').forEach(list => {
        const postId = list.getAttribute('data-post-id');
        const comments = JSON.parse(localStorage.getItem(comments-${postId})) || [];
        list.innerHTML = comments.map(comment =>             <div class="comment">                 <p>${comment.text}</p>                 <small>Posted on ${comment.date}</small>             </div>        ).join('');
    });
}
// Add comment functionality
function addCommentFunctionality() {
    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const postId = form.parentElement.querySelector('.comments-list').getAttribute('data-post-id');
            const input = form.querySelector('input');
            const commentText = input.value.trim();

        if (commentText) {
            const comments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
            const newComment = {
                text: commentText,
                date: new Date().toLocaleString()
            };
            comments.push(newComment);
            localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));

            // Reload comments
            loadComments();

            // Clear input
            input.value = '';
        }
    });
});

}
// Call loadBlogPosts on page load
document.addEventListener('DOMContentLoaded', loadBlogPosts);
// AI Tools Data with images from assets folder
const aiTools = [
    { name: "xAI", category: "Chatbot", description: "An AI developed by xAI to assist users in understanding the universe and answering complex questions with a focus on truth and reasoning.", image_url: "assets/xai_logo.png", link: "https://xai.ai" }, // Adjust filename
    { name: "ChatGPT", category: "Chatbot", description: "A conversational AI model by OpenAI, capable of answering questions, generating text, and assisting with various tasks using natural language understanding.", image_url: "assets/chatgpt_logo.png", link: "https://chat.openai.com" }, // Adjust filename
    { name: "Claude", category: "Chatbot", description: "A conversational AI model by Anthropic, designed to be helpful, safe, and aligned with human values, competing with models like ChatGPT.", image_url: "assets/claude_logo.png", link: "https://www.anthropic.com/claude" }, // Adjust filename
    { name: "Alibaba Wan 2.1", category: "Video Generation", description: "Open-source text-to-video AI service by Alibaba. Generates high-quality videos from text, images, or video prompts with complex motion and realistic physics.", image_url: "assets/alibaba_logo.png", link: "https://www.alibaba.com" }, // Adjust filename
    { name: "Hunyuan Video", category: "Video Generation", description: "Text-to-video generation model with a unified architecture for images and videos. Uses a special Transformer design called 'DualSTREAM to Single-stream'.", image_url: "assets/hunyuan_logo.png", link: "https://www.tencent.com" }, // Adjust filename
    { name: "Riffusion", category: "Music Generation", description: "Tool that leverages Stable Diffusion to generate audio clips from text. Offers an interactive web app for creating music across various genres and instruments.", image_url: "assets/riffusion_logo.png", link: "https://www.riffusion.com" }, // Adjust filename
    { name: "Suno", category: "Music Generation", description: "A generative AI music creation program that produces realistic songs combining vocals and instrumentation based on user text prompts.", image_url: "assets/suno_logo.png", link: "https://www.suno.ai" }, // Adjust filename
    { name: "Kling", category: "Video Generation", description: "AI video generation tool with image-to-video conversion capabilities. Offers features similar to Hailuo AI but with potentially longer clip durations.", image_url: "assets/kling_logo.png", link: "https://www.klingai.com" }, // Adjust filename
    { name: "Perplexity", category: "Information Retrieval", description: "AI-powered search engine with natural language processing capabilities. Offers features like content generation, mobile, and Chrome extension.", image_url: "assets/perplexity_logo.png", link: "https://www.perplexity.ai" }, // Adjust filename
    { name: "Character AI", category: "Chatbot", description: "A chatbot platform that allows users to create and interact with AI-powered characters. Features include natural language processing and custom character creation.", image_url: "assets/characterai_logo.png", link: "https://www.character.ai" }, // Adjust filename
    { name: "TensorArt", category: "Image Generation", description: "A platform for generating AI art based on Flux and Stable Diffusion, offering tools and workflows for creating images.", image_url: "assets/tensorart_logo.png", link: "https://www.tensor.art" }, // Adjust filename
    { name: "DeepSeek R1", category: "Problem Solving", description: "An open-source large language model specializing in mathematics, coding, and logical reasoning tasks.", image_url: "assets/deepseek_logo.png", link: "https://www.deepseek.com" } // Adjust filename
];
// Populate AI Tools
const aiToolsGrid = document.getElementById('ai-tools-grid');
aiTools.forEach(tool => {
    const card = document.createElement('div');
    card.className = 'ai-tool-card';
    card.innerHTML =         <img src="${tool.image_url}" alt="${tool.name}" />         <div class="content">             <h3>${tool.name}</h3>             <div class="category">${tool.category}</div>             <p>${tool.description}</p>         </div>         <a href="${tool.link}" target="_blank"></a>    ;
    aiToolsGrid.appendChild(card);
});
// GSAP animations
gsap.registerPlugin(ScrollTrigger);
// Animate blog cards and AI tool cards
gsap.utils.toArray('.blog-card, .ai-tool-card').forEach((card, i) => {
    gsap.fromTo(card, 
        { opacity: 0, y: 50 }, 
        {
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
            }
        }
    );
});
// Animate section headings
gsap.utils.toArray('section h2').forEach((heading) => {
    gsap.fromTo(heading, 
        { opacity: 0, scale: 0.8 }, 
        {
            opacity: 1, 
            scale: 1, 
            duration: 1,
            scrollTrigger: {
                trigger: heading,
                start: 'top 80%',
            }
        }
    );
});
// Email signup
document.getElementById('email-signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
}

const form = document.getElementById('email-signup-form');
form.innerHTML = `<div class="neon-blue">Thanks for subscribing!</div>`;

console.log(`Subscribed with: ${email}`);

});
// Search Functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');
const categoryButtons = document.querySelectorAll('.category-button');
function performSearch(query) {
    const results = aiTools.filter(tool => 
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.category.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase())
    );

searchResults.innerHTML = '';
if (results.length > 0) {
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `<p><strong>${result.name}</strong> (${result.category}): ${result.description}</p>`;
        searchResults.appendChild(resultItem);
    });
} else {
    searchResults.innerHTML = '<p>No results found.</p>';
}

}
searchButton.addEventListener('click', () => {
    performSearch(searchInput.value);
});
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value);
    }
});
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        searchInput.value = button.textContent;
        performSearch(button.textContent);
    });
});
// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

