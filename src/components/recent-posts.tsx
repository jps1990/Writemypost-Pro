import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const posts = [
  {
    id: '1',
    title: '10 Tips for Growing Your Instagram Following',
    engagement: '89%',
    date: '2h ago',
    author: {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      initials: 'SJ',
    },
  },
  {
    id: '2',
    title: 'How to Create Viral TikTok Content',
    engagement: '92%',
    date: '4h ago',
    author: {
      name: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
      initials: 'MC',
    },
  },
  {
    id: '3',
    title: 'LinkedIn Marketing Strategies for 2024',
    engagement: '78%',
    date: '6h ago',
    author: {
      name: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      initials: 'EW',
    },
  },
  {
    id: '4',
    title: 'Maximizing Twitter Engagement',
    engagement: '85%',
    date: '12h ago',
    author: {
      name: 'David Park',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      initials: 'DP',
    },
  },
];

export function RecentPosts() {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={post.author.image} alt={post.author.name} />
            <AvatarFallback>{post.author.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{post.title}</p>
            <p className="text-sm text-muted-foreground">
              {post.author.name} • {post.date}
            </p>
          </div>
          <div className="ml-auto font-medium">{post.engagement}</div>
        </div>
      ))}
    </div>
  );
}