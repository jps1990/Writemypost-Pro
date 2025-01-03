import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  twitterHandle?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEO({
  title = 'WriteMyPost.pro - AI-Powered Social Media Content Creation',
  description = 'Create engaging social media content with AI. Optimize your posts, analyze performance, and grow your audience.',
  keywords = ['social media', 'content creation', 'AI', 'marketing'],
  image = 'https://writemypost.pro/social-preview.jpg',
  url = 'https://writemypost.pro',
  type = 'website',
  author = 'WriteMyPost.pro Team',
  twitterHandle = '@writemypostpro',
  publishedTime,
  modifiedTime
}: SEOProps) {
  const siteTitle = 'WriteMyPost.pro';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      <meta property="article:author" content={author} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO best practices */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}