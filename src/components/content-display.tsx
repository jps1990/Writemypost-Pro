const InstagramContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <h3>Feed</h3>
    <p><strong>Caption:</strong> {content.feed?.caption}</p>
    <p><strong>Hashtags:</strong> {content.feed?.hashtags?.join(' ')}</p>
    
    <h3>Story</h3>
    <p><strong>Text:</strong> {content.story?.text}</p>
    <p><strong>Stickers:</strong> {content.story?.stickers?.join(', ')}</p>
    
    <h3>Reels</h3>
    <p><strong>Caption:</strong> {content.reels?.caption}</p>
    <p><strong>Hashtags:</strong> {content.reels?.hashtags?.join(' ')}</p>
    <p><strong>Sound:</strong> {content.reels?.soundSuggestion}</p>
  </div>
);

const FacebookContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Post:</strong> {content.post}</p>
    <p><strong>Story:</strong> {content.story}</p>
    <p><strong>Hashtags:</strong> {content.hashtags?.join(' ')}</p>
  </div>
);

const TwitterContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Tweet:</strong> {content.tweet}</p>
    <p><strong>Thread:</strong></p>
    <ul>
      {content.thread?.map((tweet: string, index: number) => (
        <li key={index}>{tweet}</li>
      ))}
    </ul>
    <p><strong>Hashtags:</strong> {content.hashtags?.join(' ')}</p>
  </div>
);

const LinkedInContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Post:</strong> {content.post}</p>
    <p><strong>Article:</strong> {content.article}</p>
    <p><strong>Hashtags:</strong> {content.hashtags?.join(' ')}</p>
  </div>
);

const TikTokContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Caption:</strong> {content.caption}</p>
    <p><strong>Hashtags:</strong> {content.hashtags?.join(' ')}</p>
    <p><strong>Sound:</strong> {content.soundSuggestion}</p>
    <p><strong>Effects:</strong> {content.effectSuggestions?.join(', ')}</p>
  </div>
);

const PinterestContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Title:</strong> {content.title}</p>
    <p><strong>Description:</strong> {content.description}</p>
    <p><strong>Board Suggestions:</strong> {content.boardSuggestions?.join(', ')}</p>
    <p><strong>Hashtags:</strong> {content.hashtags?.join(' ')}</p>
  </div>
);

const YouTubeContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Title:</strong> {content.title}</p>
    <p><strong>Description:</strong> {content.description}</p>
    <p><strong>Tags:</strong> {content.tags?.join(', ')}</p>
    <h4>Chapters:</h4>
    {content.chapters?.map((chapter: any, index: number) => (
      <div key={index}>
        <p><strong>{chapter.timestamp}:</strong> {chapter.title}</p>
        <p>{chapter.description}</p>
      </div>
    ))}
  </div>
);

const ThreadsContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Post:</strong> {content.post}</p>
    <p><strong>Discussion:</strong> {content.discussion}</p>
    <p><strong>Hashtags:</strong> {content.hashtags?.join(' ')}</p>
  </div>
);

const SnapchatContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Caption:</strong> {content.caption}</p>
    <p><strong>Filters:</strong> {content.filters?.join(', ')}</p>
  </div>
);

const EmailContent = ({ content }: { content: any }) => (
  <div className="platform-content">
    <p><strong>Subject:</strong> {content.subject}</p>
    <h4>Long Version:</h4>
    <p>{content.long}</p>
    <h4>Medium Version:</h4>
    <p>{content.medium}</p>
    <h4>Short Version:</h4>
    <p>{content.short}</p>
  </div>
);

// Composant principal qui gère l'affichage de tout le contenu
export const ContentDisplay = ({ content }: { content: any }) => {
  const platformComponents = {
    instagram: InstagramContent,
    facebook: FacebookContent,
    twitter: TwitterContent,
    linkedin: LinkedInContent,
    tiktok: TikTokContent,
    pinterest: PinterestContent,
    youtube: YouTubeContent,
    threads: ThreadsContent,
    snapchat: SnapchatContent,
    email: EmailContent
  };

  return (
    <div className="content-display">
      <h2>Common Content</h2>
      <p><strong>{content.common?.title}</strong></p>
      <p>{content.common?.description}</p>
      
      {Object.entries(content).map(([platform, platformContent]) => {
        if (platform !== 'common' && platformComponents[platform]) {
          const PlatformComponent = platformComponents[platform];
          return (
            <div key={platform}>
              <h2>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h2>
              <PlatformComponent content={platformContent} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}; 