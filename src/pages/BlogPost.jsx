import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogArticles } from '../data/blog.js';

const parseMarkdown = (text) => {
  if (!text) return '';
  return text.split(/\r?\n\r?\n+/).map(para => {
    let p = para.trim();
    if (!p) return '';
    
    // Headings
    if (p.startsWith('### ')) {
      return `<h3 style="font-size: 1.25rem; margin-top: 2.5rem; margin-bottom: 1rem; color: #111827; font-weight: 700;">${p.substring(4)}</h3>`;
    }
    if (p.startsWith('## ')) {
      return `<h2 style="font-size: 1.75rem; margin-top: 3.5rem; margin-bottom: 1.5rem; color: #111827; font-weight: 800; letter-spacing: -0.01em;">${p.substring(3)}</h2>`;
    }
    
    // Bold text
    p = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Unordered lists
    if (p.startsWith('- ')) {
      const lis = p.split(/\r?\n/).map(line => `<li>${line.substring(2)}</li>`).join('');
      return `<ul style="margin-bottom: 1.5rem; padding-left: 1.5rem; list-style-type: disc;">${lis}</ul>`;
    }
    
    // Ordered lists
    if (p.match(/^\d+\.\s/)) {
      const lis = p.split(/\r?\n/).map(line => {
        const match = line.match(/^\d+\.\s(.*)/);
        return match ? `<li style="margin-bottom: 0.5rem;">${match[1]}</li>` : `<li>${line}</li>`;
      }).join('');
      return `<ol style="margin-bottom: 1.5rem; padding-left: 1.5rem; list-style-type: decimal;">${lis}</ol>`;
    }
    
    return `<p style="margin-bottom: 1.5rem;">${p}</p>`;
  }).join('');
};

export default function BlogPost() {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);

  useEffect(() => {
    if (!article) return;
    
    // SEO setup
    document.title = `${article.title} | AmeRoids Tech Studio`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = article.description;
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `https://www.ameroids.in/blog/${article.slug}`;

    // Update Open Graph and Twitter metadata if they exist
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${article.title} | AmeRoids Tech Studio`;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = article.description;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = `https://www.ameroids.in/blog/${article.slug}`;

    // Inject BlogPosting JSON-LD
    const scriptId = 'blog-json-ld';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.description,
      "author": {
        "@type": "Organization",
        "name": "AmeRoids Tech Studio"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AmeRoids Tech Studio",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.ameroids.in/final-logo.png"
        }
      },
      "datePublished": article.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.ameroids.in/blog/${article.slug}`
      }
    };
    
    script.textContent = JSON.stringify(jsonLd);

    window.scrollTo(0, 0);
    
    return () => {
      // Cleanup dynamically added script on unmount
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [article]);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // Related articles (random 2 from same category, or just next 2)
  const related = blogArticles.filter(a => a.slug !== article.slug).slice(0, 2);

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '120px', minHeight: '100vh', backgroundColor: '#fafafa', color: '#1f2937' }} className="section">
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', marginBottom: '1.5rem', color: '#6b7280' }}>
            <Link to="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</Link>
            <span>&rsaquo;</span>
            <span style={{ color: 'var(--brand-600)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{article.category}</span>
          </div>
          
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: '#111827' }}>
            {article.title}
          </h1>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.9rem', color: '#6b7280', borderTop: '1px solid rgba(0,0,0,0.1)', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '1rem 0' }}>
            <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>&bull;</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        <article 
          className="blog-content" 
          style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#374151' }}
          dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }}
        />

        <div style={{ marginTop: '5rem', padding: '3rem', background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 700, color: '#111827' }}>Ready to solve this problem?</h2>
          <p style={{ color: '#4b5563', marginBottom: '2rem' }}>AmeRoids Tech Studio builds high-performance websites and custom software that drive real business results.</p>
          <a href="/#contact" className="btn btn--primary">Discuss Your Project</a>
        </div>

        <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 700, color: '#111827' }}>Related Articles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {related.map(rel => (
              <Link to={`/blog/${rel.slug}`} key={rel.slug} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '1.5rem', transition: 'all 0.2s', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; }}>
                <div style={{ textTransform: 'uppercase', fontSize: '0.7rem', color: 'var(--brand-600)', marginBottom: '0.5rem', fontWeight: 700 }}>{rel.category}</div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.3, color: '#111827', fontWeight: 600 }}>{rel.title}</h4>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{rel.readTime}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
