import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogArticles } from '../data/blog.js';

export default function BlogIndex() {
  useEffect(() => {
    document.title = "AmeRoids Tech Studio Blog | Software, Websites & AI";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = "Practical insights on software development, websites, AI automation, cybersecurity, performance, and digital technology for modern businesses.";
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = "https://www.ameroids.in/blog";

    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '120px', minHeight: '100vh', backgroundColor: '#fafafa', color: '#111827' }} className="section">
      <div className="container">
        <h1 style={{ fontSize: 'var(--text-h2)', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#111827' }}>Insights That Solve Real Technology Problems</h1>
        <p style={{ fontSize: 'var(--text-lg)', opacity: 0.8, maxWidth: '800px', marginBottom: '4rem', lineHeight: 1.6, color: '#374151' }}>
          Practical insights on websites, software, AI, automation, security, and the technology challenges businesses face today.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {blogArticles.map(article => (
            <Link to={`/blog/${article.slug}`} key={article.slug} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '2rem', background: '#ffffff', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)'; }}>
              <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', color: 'var(--brand-600)', marginBottom: '1rem', fontWeight: 700 }}>{article.category}</div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.4, color: '#111827' }}>{article.title}</h2>
              <p style={{ opacity: 0.7, fontSize: '0.95rem', marginBottom: '2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6, flexGrow: 1, color: '#4b5563' }}>{article.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#6b7280', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <span>{article.readTime}</span>
                <span style={{ color: 'var(--brand-600)', fontWeight: 600 }}>Read article &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
