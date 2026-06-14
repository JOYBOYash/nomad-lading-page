import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { BlogPostType } from '../types/blog';
import { Lock, FileText, Trash2, Plus, LogOut, Link as LinkIcon, Save, Image as ImageIcon, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatImageUrl } from '../lib/utils';
import WriteBlog from './WriteBlog';

export default function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'manage' | 'create'>('manage');
  const [blogs, setBlogs] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { setCursorVariant, playClick } = useAppContext();

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          if (!db) throw new Error("Database not configured");
          const docRef = doc(db, 'settings', 'adminEmails');
          const docSnap = await getDoc(docRef);
          
          const adminEmails = docSnap.exists() ? (docSnap.data().Emails || []) : [];
          
          if (adminEmails.includes(currentUser.email)) {
            setUser(currentUser);
            fetchBlogs();
          } else {
            await signOut(auth);
            alert("Security Alert: Your account does not have Admin privileges.");
            setUser(null);
          }
        } catch (err) {
          console.error("Admin verification failed:", err);
          await signOut(auth);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchBlogs = async () => {
    try {
      if (!db) return;
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetched: BlogPostType[] = [];
      querySnapshot.forEach((docSnap) => {
        fetched.push({ id: docSnap.id, ...docSnap.data() } as BlogPostType);
      });
      setBlogs(fetched);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!auth) {
      alert("Firebase Auth is not configured");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      alert(`Login failed: ${err.message}`);
    }
  };

  const handleLogout = async () => {
    playClick();
    if (auth) {
      await signOut(auth);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        if (!db) return;
        await deleteDoc(doc(db, 'blogs', id));
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (err) {
        console.error(err);
        alert("Failed to delete post");
      }
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-nomad-charcoal text-white flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-nomad-charcoal flex items-center justify-center p-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-8 max-w-md w-full"
        >
          <div className="flex justify-center mb-6 text-nomad-green">
            <Lock className="w-12 h-12" />
          </div>
          <h1 className="text-2xl font-display font-black text-center mb-6 uppercase tracking-widest text-nomad-ivory">Admin Secure Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              className="w-full bg-black/50 border border-white/10 px-4 py-3 text-nomad-ivory outline-none focus:border-nomad-green transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full bg-black/50 border border-white/10 px-4 py-3 text-nomad-ivory outline-none focus:border-nomad-green transition-colors"
            />
            <button
              type="submit"
              className="w-full bg-nomad-green text-nomad-charcoal px-6 py-3 font-black text-sm uppercase tracking-widest hover:bg-white transition-colors"
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Verify Access
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nomad-charcoal pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase mb-2 text-nomad-ivory">Admin Dashboard</h1>
            <p className="text-white/50 text-sm">Securely manage your platform content.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-nomad-ivory hover:text-nomad-green transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="flex border-b border-white/10 mb-8 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-6 py-4 font-bold text-sm tracking-widest uppercase flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'manage' ? 'text-nomad-green border-b-2 border-nomad-green' : 'text-white/50 hover:text-white'}`}
          >
            <FileText className="w-4 h-4" />
            Manage Posts
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-6 py-4 font-bold text-sm tracking-widest uppercase flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'create' ? 'text-nomad-green border-b-2 border-nomad-green' : 'text-white/50 hover:text-white'}`}
          >
            <Plus className="w-4 h-4" />
            Create New Post
          </button>
        </div>

        {activeTab === 'manage' && (
          <div className="grid gap-4">
            {blogs.length === 0 ? (
              <div className="p-8 border border-white/10 text-center text-white/50 italic">
                No blog posts found.
              </div>
            ) : (
              blogs.map((blog) => (
                <div key={blog.id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors gap-4">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    {blog.imageUrl && (
                       <img src={formatImageUrl(blog.imageUrl)} alt={blog.title} className="w-16 h-16 object-cover bg-black/50" />
                    )}
                    <div className="flex flex-col">
                      <h3 className="font-bold text-nomad-ivory line-clamp-1">{blog.title}</h3>
                      <span className="text-xs text-white/50">
                        {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : 'Just now'} • {blog.authorName || 'Admin'}
                      </span>
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex justify-end">
                    <button
                      onClick={(e) => handleDelete(blog.id!, e)}
                      className="p-3 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'create' && (
           <div className="border border-white/10 p-6 md:p-8 bg-white/[0.01]">
             <WriteBlog isEmbedded={true} onPostCreated={() => { setActiveTab('manage'); fetchBlogs(); }} />
           </div>
        )}
      </div>
    </div>
  );
}
