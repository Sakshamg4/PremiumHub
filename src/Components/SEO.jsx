import React, { useEffect } from 'react';

const SEO = ({ title, description, keywords, author, ogTitle, ogDescription, ogImage, faqSchema }) => {
    useEffect(() => {
        if (title) document.title = title;

        const setMeta = (attr, name, content) => {
            if (!content) return;
            let meta = document.querySelector(`meta[${attr}="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attr, name);
                document.head.appendChild(meta);
            }
            meta.setAttribute('content', content);
        };

        setMeta('name', 'description', description);
        setMeta('name', 'keywords', keywords);
        setMeta('name', 'author', author);
        setMeta('property', 'og:title', ogTitle || title);
        setMeta('property', 'og:description', ogDescription || description);
        if (ogImage) setMeta('property', 'og:image', ogImage);

        let script;
        if (faqSchema) {
            let existingScript = document.getElementById('faq-schema');
            if (existingScript) existingScript.remove();
            
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.id = 'faq-schema';
            script.innerHTML = JSON.stringify(faqSchema);
            document.head.appendChild(script);
        }

        return () => {
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [title, description, keywords, author, ogTitle, ogDescription, ogImage, faqSchema]);

    return null;
};

export default SEO;
