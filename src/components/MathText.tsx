import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    katex?: any;
  }
}

interface MathTextProps {
  content: string;
  className?: string;
}

// Renders text with inline LaTeX ($...$) and display LaTeX ($$...$$)
export function MathText({ content, className = '' }: MathTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !content) return;

    const renderMath = () => {
      if (!window.katex || !containerRef.current) return;

      let html = content;

      // Display math: $$...$$
      html = html.replace(/\$\$([\s\S]*?)\$\$/g, (_match, tex) => {
        try {
          return `<div class="katex-display">${window.katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false })}</div>`;
        } catch {
          return `<code>${tex}</code>`;
        }
      });

      // Inline math: $...$
      html = html.replace(/\$((?!\$)[\s\S]*?[^\\])\$/g, (_match, tex) => {
        try {
          return window.katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false });
        } catch {
          return `<code>${tex}</code>`;
        }
      });

      containerRef.current.innerHTML = html;
    };

    // Load KaTeX JS if not loaded
    if (!window.katex) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js';
      script.onload = renderMath;
      document.head.appendChild(script);
    } else {
      renderMath();
    }
  }, [content]);

  // Fallback if no math
  if (!content?.includes('$')) {
    return <span className={className}>{content}</span>;
  }

  return <div ref={containerRef} className={className}>{content}</div>;
}
