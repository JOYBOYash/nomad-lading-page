import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Newspaper } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { BlogPost } from "../types/blog";
import { useAppContext } from "../context/AppContext";
import { formatImageUrl } from "../lib/utils";
import { FALLBACK_BLOGS } from "../lib/fallbackBlogs";

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { setCursorVariant, theme } = useAppContext();

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        if (!db) {
          setPosts([]);
          setLoading(false);
          return;
        }
        const q = query(
          collection(db, "blogs"),
          orderBy("createdAt", "desc"),
          limit(3),
        );
        const querySnapshot = await getDocs(q);
        const fetchedPosts: BlogPost[] = [];
        querySnapshot.forEach((doc) => {
          fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
        });
        
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching latest posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  if (loading) {
    return (
      <section
        className={`py-24 flex justify-center items-center ${theme === "light" ? "bg-[#FAFAFA] text-black border-b border-black/5" : "bg-nomad-charcoal text-white border-b border-white/5"}`}
      >
        <div className="w-8 h-8 border-2 border-nomad-green/20 border-t-nomad-green rounded-full animate-spin" />
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      className={`pt-24 md:pt-32 pb-24 md:pb-32 relative overflow-hidden ${theme === "light" ? "bg-[#FAFAFA] text-black border-b border-black/5" : "bg-nomad-charcoal text-nomad-ivory border-b border-white/5"}`}
    >
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div className="w-full">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6 ${theme === "light" ? "bg-nomad-green text-[#000] border border-nomad-green/30" : "bg-nomad-green/10 border border-nomad-green/30 text-nomad-green"}`}
            >
              <Newspaper className="w-4 h-4" />
              Latest News
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-wider md:tracking-[0.1em] uppercase w-full break-words pt-4">
              <span className="text-nomad-green">Updates</span>{" "}
              <span
                className={
                  theme === "light" ? "text-[#111111]" : "text-white"
                }
              >
                from Nomad
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group transition-all duration-300 flex flex-col h-full ${
                theme === "light"
                  ? "border border-nomad-green bg-nomad-green hover:bg-[#111111] hover:border-[#111111] shadow-sm"
                  : "border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:shadow-xl"
              }`}
            >
              {post.imageUrl && (
                <div
                  className={`aspect-[4/3] w-full overflow-hidden relative ${theme === "light" ? "border-b border-[#111111]/10 bg-black/5" : "border-b border-white/10 bg-white/5"}`}
                >
                  <img
                    src={formatImageUrl(post.imageUrl)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div
                  className={`text-xs font-mono mb-4 tracking-widest transition-colors ${
                    theme === "light"
                      ? "text-black/70 group-hover:text-nomad-green"
                      : "text-nomad-green"
                  }`}
                >
                  {post.createdAt?.seconds
                    ? new Date(
                        post.createdAt.seconds * 1000,
                      ).toLocaleDateString()
                    : ""}
                </div>
                <h3
                  className={`text-2xl font-display font-black uppercase tracking-tight mb-4 transition-colors line-clamp-2 ${
                    theme === "light"
                      ? "text-black group-hover:text-nomad-green"
                      : "group-hover:text-nomad-green text-white"
                  }`}
                >
                  {post.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-8 flex-grow line-clamp-3 transition-colors ${
                    theme === "light"
                      ? "text-black/80 group-hover:text-nomad-green"
                      : "text-white/60"
                  }`}
                >
                  {post.description}
                </p>

                <Link
                  to={`/blog/${post.id}`}
                  className={`inline-flex items-center justify-between w-full pt-6 font-bold text-xs uppercase tracking-widest transition-colors mt-auto ${
                    theme === "light"
                      ? "border-t border-black/20 text-black group-hover:text-nomad-green group-hover:border-nomad-green/20"
                      : "border-t border-white/10 hover:text-nomad-green text-white"
                  }`}
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
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
  );
}
