import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Linkedin, Instagram, Twitter, Calendar, User } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { BlogPost as BlogPostType } from '../types/blog';
import { useAppContext } from '../context/AppContext';
import { formatImageUrl } from '../lib/utils';
import GlobalNav from '../components/GlobalNav';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const { setCursorVariant } = useAppContext();

  useEffect(() => {
    if (!id) return;
    
    // Always start at top when viewing a new blog
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      try {
        if (!db) {
          setLoading(false);
          return;
        }
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as BlogPostType);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-nomad-charcoal text-white flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-nomad-green/20 border-t-nomad-green rounded-full animate-spin"/>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-nomad-charcoal text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-display font-black uppercase mb-4">Post Not Found</h1>
        <Link to="/" className="text-nomad-green hover:underline">Return Home</Link>
      </div>
    );
  }

  const dateStr = post.createdAt?.seconds 
    ? new Date(post.createdAt.seconds * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
    : 'Unknown Date';

  return (
    <article className="min-h-screen bg-nomad-charcoal pt-[100px] lg:pt-[120px] pb-24">
      <GlobalNav />
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-nomad-green font-bold text-sm tracking-wider uppercase transition-colors"
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      {/* Header section */}
      <header className="max-w-4xl mx-auto px-6 mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase text-nomad-ivory mb-6"
        >
          {post.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 text-sm text-white/60 font-mono"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="uppercase tracking-widest">{post.authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{dateStr}</span>
          </div>
        </motion.div>
      </header>

      {/* Hero Image */}
      {post.imageUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-6xl mx-auto px-4 md:px-6 mb-16"
        >
          <div className="aspect-video lg:aspect-[21/9] w-full bg-white/5 border border-white/10 overflow-hidden relative">
            <img 
              src={formatImageUrl(post.imageUrl)} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 font-sans">
        {/* We use a wrapper class to style standard HTML elements like p, ul, h2 emitted by rich text editor */}
        <motion.div 
          className="blog-content prose prose-invert prose-lg max-w-none text-white/80
            prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-nomad-ivory
            prose-a:text-nomad-green prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-nomad-green prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-white/60
            prose-img:rounded-none prose-img:border prose-img:border-white/10
            marker:text-nomad-green"
          dangerouslySetInnerHTML={{ __html: post.content }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        />

        {/* Social Links Footer */}
        {post.socialLinks && (post.socialLinks.linkedin || post.socialLinks.instagram || post.socialLinks.x) && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 pt-8 border-t border-white/10 flex flex-col items-center gap-6"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">Discuss this post on</p>
            <div className="flex items-center gap-6">
              {post.socialLinks.linkedin && (
                <a href={post.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                  className="w-12 h-12 bg-white/5 hover:bg-nomad-green text-white hover:text-black flex items-center justify-center transition-colors border border-white/10 hover:border-nomad-green"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {post.socialLinks.x && (
                <a href={post.socialLinks.x} target="_blank" rel="noopener noreferrer" 
                  className="w-12 h-12 bg-white/5 hover:bg-nomad-green text-white hover:text-black flex items-center justify-center transition-colors border border-white/10 hover:border-nomad-green"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {post.socialLinks.instagram && (
                <a href={post.socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                  className="w-12 h-12 bg-white/5 hover:bg-nomad-green text-white hover:text-black flex items-center justify-center transition-colors border border-white/10 hover:border-nomad-green"
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
