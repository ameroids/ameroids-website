export const knowledgeBase = [
  {
    tags: ["hello", "hi", "hey", "greetings", "morning"],
    response: "Hello! I am Elara, the AI assistant for Ameroids Tech Studio. I've analyzed our entire database and I'm ready to help you with anything from our services and pricing to deep technical questions. What can I assist you with today?"
  },
  {
    tags: ["who are you", "what are you", "elara", "chatgpt", "ai", "bot"],
    response: "I am Elara, a highly advanced local AI assistant built specifically for Ameroids Tech Studio. Unlike standard chatbots, I process your requests using a local intelligence engine to fetch deep insights about our company, tech stack, and services without relying on external APIs."
  },
  {
    tags: ["services", "what do you do", "offerings", "build", "create", "help"],
    response: "Ameroids Tech Studio is a full-cycle software agency. Our primary services include:\n\n1. Custom Software Development (Web, Mobile, Desktop)\n2. Artificial Intelligence Integration (LLMs, Automations)\n3. Cloud Infrastructure & DevOps (AWS, GCP, Azure)\n4. UI/UX Design & 3D Web Experiences (WebGL, Three.js)\n5. High-Performance E-Commerce Solutions\n\nWe don't just write code; we engineer scalable businesses."
  },

  {
    tags: ["tech", "stack", "technology", "react", "node", "python", "javascript", "framework"],
    response: "We pride ourselves on using a cutting-edge, enterprise-grade tech stack:\n\n• Frontend: React, Next.js, Vue.js, TailwindCSS, Three.js (for 3D)\n• Backend: Node.js, Python (FastAPI/Django), Go\n• Database: PostgreSQL, MongoDB, Redis\n• Cloud/DevOps: AWS, Docker, Kubernetes, CI/CD pipelines\n\nWe choose the right tool for your specific architecture to ensure maximum performance."
  },
  {
    tags: ["contact", "email", "phone", "address", "location", "meet", "reach"],
    response: "We'd love to discuss your project! \n\n📍 Location: Saifee Nagar, Indore\n📧 Email: ameroidstechstudio@gmail.com\n📞 Phone: +91-7223861653\n\nYou can also use the contact form at the bottom of our website to send us a direct message."
  },
  {
    tags: ["founder", "team", "ceo", "who owns", "about us"],
    response: "Ameroids Tech Studio was founded by a team of passionate engineers dedicated to pushing the boundaries of what's possible on the web. We are a tight-knit group of senior developers, AI researchers, and designers who treat every client project like our own startup."
  },
  {
    tags: ["process", "how it works", "workflow", "steps", "timeline"],
    response: "Our engineering process is highly structured:\n\n1. Discovery: We deeply analyze your business needs and technical constraints.\n2. Architecture: We design the database, API structure, and UI wireframes.\n3. Development: Agile sprints with weekly updates and live staging environments.\n4. QA & Testing: Rigorous security, load, and unit testing.\n5. Deployment & Scale: Launching on scalable cloud infrastructure with ongoing support."
  },
  {
    tags: ["ai", "artificial intelligence", "machine learning", "automation", "llm"],
    response: "We heavily integrate AI into modern businesses. We can build custom LLM wrappers, automate your customer support, implement intelligent data analytics, and build generative AI tools directly into your SaaS products."
  },
  {
    tags: ["seo", "marketing", "speed", "performance", "fast"],
    response: "Performance and SEO are baked into our architecture. We use server-side rendering (SSR), optimized asset delivery, and semantic HTML to ensure your site scores 95+ on Google Lighthouse, driving organic traffic and maximizing conversions."
  },
  {
    tags: ["projects", "portfolio", "past work", "experience", "delivered"],
    response: "We have delivered over 25+ successful custom software projects across various industries, including FinTech, E-Commerce, Healthcare, and SaaS. Our gallery section showcases some of our recent high-end UI/UX and 3D implementations."
  }
];

export const searchKnowledge = async (query) => {
  // Simulate "fetching large data" and processing time as requested
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

  const normalizedQuery = query.toLowerCase().replace(/[^\w\s]/gi, '');
  const words = normalizedQuery.split(' ').filter(w => w.length > 2);
  
  let bestMatch = null;
  let highestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    
    for (const tag of entry.tags) {
      if (normalizedQuery.includes(tag)) {
        score += 5;
      }
      for (const word of words) {
        if (tag.includes(word)) {
          score += 2;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  if (highestScore > 0 && bestMatch) {
    return bestMatch.response;
  }

  return "I'm still learning and couldn't find an exact answer to that in my database. For specific inquiries, please reach out to our human team directly at +91-7223861653 or email us at ameroidstechstudio@gmail.com. We'd love to help you out!";
};
