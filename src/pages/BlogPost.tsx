import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Linkedin, Instagram, Twitter, Calendar, User } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { BlogPost as BlogPostType } from '../types/blog';
import { useAppContext } from '../context/AppContext';
import { formatImageUrl } from '../lib/utils';
import { FALLBACK_BLOGS } from '../lib/fallbackBlogs';
import GlobalNav from '../components/GlobalNav';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [recommendedPosts, setRecommendedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, setCursorVariant } = useAppContext();

  useEffect(() => {
    if (!id) return;
    
    // Always start at top when viewing a new blog
    window.scrollTo(0, 0);

    const fallbackPost = FALLBACK_BLOGS.find(p => p.id === id);

    const fetchPost = async () => {
      if (fallbackPost) {
        setPost(fallbackPost);
        setLoading(false);
        return;
      }

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
    
    const fetchRecommended = async () => {
       try {
         if (!db) {
           setRecommendedPosts(FALLBACK_BLOGS.filter(p => p.id !== id).slice(0, 3));
           return;
         }
         const q = query(
           collection(db, 'blogs'),
           orderBy('createdAt', 'desc'),
           limit(4) // Fetch up to 4 to filter out current post and keep 3
         );
         const snapshot = await getDocs(q);
         const posts = snapshot.docs
            .map(d => ({ id: d.id, ...d.data() } as BlogPostType))
            .filter(p => p.id !== id)
            .slice(0, 3);
         
         if (posts.length > 0) {
           setRecommendedPosts(posts);
         } else {
           setRecommendedPosts(FALLBACK_BLOGS.filter(p => p.id !== id).slice(0, 3));
         }
       } catch (err) {
         console.error("Error fetching recommended, using local fallback cache:", err);
         setRecommendedPosts(FALLBACK_BLOGS.filter(p => p.id !== id).slice(0, 3));
       }
    };

    fetchPost();
    fetchRecommended();
  }, [id]);

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${theme === 'light' ? 'bg-[#FAFAFA] text-black' : 'bg-nomad-charcoal text-white'}`}>
        <div className="w-12 h-12 border-4 border-nomad-green/20 border-t-nomad-green rounded-full animate-spin"/>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${theme === 'light' ? 'bg-[#FAFAFA] text-black' : 'bg-nomad-charcoal text-white'}`}>
        <h1 className="text-4xl font-display font-black uppercase mb-4">Post Not Found</h1>
        <Link to="/" className="text-nomad-green hover:underline">Return Home</Link>
      </div>
    );
  }

  const dateStr = post.createdAt?.seconds 
    ? new Date(post.createdAt.seconds * 1000).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) 
    : 'Unknown Date';

  return (
    <article className={`min-h-screen pt-[100px] lg:pt-[120px] pb-24 ${theme === 'light' ? 'bg-[#FAFAFA]' : 'bg-nomad-charcoal'}`}>
      <GlobalNav />
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-bold text-sm tracking-wider uppercase transition-all text-nomad-green hover:opacity-80"
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
          className="text-4xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter uppercase text-nomad-ivory mb-6 break-words"
        >
          {post.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`flex flex-wrap items-center gap-6 text-sm font-mono ${theme === 'light' ? 'text-black/60' : 'text-white/60'}`}
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
          className={`blog-content lg:prose-lg max-w-none break-words
            ${theme === 'light' 
              ? 'prose text-[#111111] prose-strong:text-[#111111] prose-headings:text-black [&_strong]:text-[#111111] [&_b]:text-[#111111]' 
              : 'prose prose-invert text-white/80 [&_strong]:text-nomad-ivory [&_b]:text-nomad-ivory'
            }
            [&_strong]:font-black [&_b]:font-black
            prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight
            prose-a:text-nomad-green prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-nomad-green prose-blockquote:bg-black/5 dark:prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-black/60 dark:prose-blockquote:text-white/60
            prose-img:rounded-none prose-img:border prose-img:border-black/10 dark:prose-img:border-white/10
            marker:text-nomad-green`}
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
            className={`mt-20 pt-8 border-t flex flex-col items-center gap-6 ${theme === 'light' ? 'border-black/10' : 'border-white/10'}`}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-nomad-green">Discuss this post on</p>
            <div className="flex items-center gap-6">
              {post.socialLinks.linkedin && (
                <a href={post.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                  className={`group w-12 h-12 flex items-center justify-center transition-all border bg-transparent hover:bg-nomad-green hover:border-nomad-green ${theme === 'light' ? 'border-[#111111]/20' : 'border-white/10'}`}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Linkedin className="w-5 h-5 text-nomad-green group-hover:text-[#111111] transition-colors" />
                </a>
              )}
              {post.socialLinks.x && (
                <a href={post.socialLinks.x} target="_blank" rel="noopener noreferrer" 
                  className={`group w-12 h-12 flex items-center justify-center transition-all border bg-transparent hover:bg-nomad-green hover:border-nomad-green ${theme === 'light' ? 'border-[#111111]/20' : 'border-white/10'}`}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Twitter className="w-5 h-5 text-nomad-green group-hover:text-[#111111] transition-colors" />
                </a>
              )}
              {post.socialLinks.instagram && (
                <a href={post.socialLinks.instagram} target="_blank" rel="noopener noreferrer" 
                  className={`group w-12 h-12 flex items-center justify-center transition-all border bg-transparent hover:bg-nomad-green hover:border-nomad-green ${theme === 'light' ? 'border-[#111111]/20' : 'border-white/10'}`}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <Instagram className="w-5 h-5 text-nomad-green group-hover:text-[#111111] transition-colors" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Recommended "Past Updates" Section */}
      {recommendedPosts.length > 0 && (
        <section className={`mt-24 pt-24 pb-20 md:pb-32 border-t ${theme === 'light' ? 'border-black/10 bg-[#FAFAFA]' : 'border-white/5 bg-black/10'}`}>
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-wider uppercase mb-12">
              <span className="text-nomad-green">Past</span>{' '}
              <span className={theme === 'light' ? 'text-[#111111]' : 'text-white'}>Updates</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedPosts.map((rPost, i) => (
                <motion.article
                  key={rPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group transition-all duration-300 flex flex-col h-full ${
                    theme === 'light' 
                      ? 'border border-nomad-green bg-nomad-green hover:bg-[#111111] hover:border-[#111111] shadow-sm' 
                      : 'border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:shadow-xl'
                  }`}
                >
                  {rPost.imageUrl && (
                    <div className={`aspect-[4/3] w-full overflow-hidden relative ${theme === 'light' ? 'border-b border-black/10' : 'border-b border-white/10 bg-white/5'}`}>
                      <img 
                        src={formatImageUrl(rPost.imageUrl)} 
                        alt={rPost.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className={`text-xs font-mono mb-4 tracking-widest transition-colors ${theme === 'light' ? 'text-black/70 group-hover:text-nomad-green' : 'text-nomad-green'}`}>
                      {rPost.createdAt?.seconds 
                        ? new Date(rPost.createdAt.seconds * 1000).toLocaleDateString() 
                        : ''}
                    </div>
                    <h3 className={`text-2xl font-display font-black uppercase tracking-tight mb-4 transition-colors line-clamp-2 ${theme === 'light' ? 'text-black group-hover:text-nomad-green' : 'group-hover:text-nomad-green text-white'}`}>
                      {rPost.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-8 flex-grow line-clamp-3 transition-colors ${theme === 'light' ? 'text-black/80 group-hover:text-nomad-green' : 'text-white/60'}`}>
                      {rPost.description}
                    </p>
                    <Link 
                      to={`/blog/${rPost.id}`}
                      className={`inline-flex items-center justify-between w-full pt-6 font-bold text-xs uppercase tracking-widest transition-colors mt-auto ${
                        theme === 'light' 
                          ? 'border-t border-black/20 text-black group-hover:text-nomad-green group-hover:border-nomad-green/20' 
                          : 'border-t border-white/10 hover:text-nomad-green text-white'
                      }`}
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
