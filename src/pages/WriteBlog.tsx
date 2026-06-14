import React, { useState } from 'react';
import { motion } from 'motion/react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { BlogPost } from '../types/blog';
import { useAppContext } from '../context/AppContext';
import { Lock, FileText, Link as LinkIcon, Save, Image as ImageIcon, User } from 'lucide-react';

export default function WriteBlog({ isEmbedded = false, onPostCreated }: { isEmbedded?: boolean, onPostCreated?: () => void }) {
  // Blog form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [authorName, setAuthorName] = useState('Nomad Team'); // Default watermark author
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [xLink, setXLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setCursorVariant, playClick } = useAppContext();

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!title || !description || !content || !imageUrl) {
      alert('Please fill out title, description, content and image URL.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (!db) {
        alert('Database connection is not configured.');
        return;
      }
      const blogData: BlogPost = {
        title,
        description,
        content: content,
        imageUrl,
        authorName,
        createdAt: serverTimestamp(),
        socialLinks: {
          ...(linkedin && { linkedin }),
          ...(instagram && { instagram }),
          ...(xLink && { x: xLink })
        }
      };
      
      await addDoc(collection(db, 'blogs'), blogData);
      alert('Blog Published Successfully!');
      setTitle('');
      setDescription('');
      setContent('');
      setImageUrl('');
      setLinkedin('');
      setInstagram('');
      setXLink('');
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error(err);
      alert('Failed to publish blog. Check console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formContent = (
    <>
        <h1 className="text-3xl md:text-4xl font-display font-black tracking-tighter uppercase mb-2 text-nomad-ivory">Write a Post</h1>
        <p className="text-white/50 mb-12">Create a new blog post for the Latest News section.</p>
        
        <form onSubmit={handlePublish} className="flex flex-col gap-8">
          
          {/* Header Image */}
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white/50 font-bold flex items-center gap-2"><ImageIcon className="w-4 h-4"/> Header Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-nomad-green transition-colors"
              required
            />
            {imageUrl && (
              <div className="mt-4 aspect-video bg-black/50 overflow-hidden border border-white/10">
                <img src={imageUrl} alt="Header Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Title and Description */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/50 font-bold flex items-center gap-2"><FileText className="w-4 h-4"/> Blog Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Future of Events..."
                className="w-full bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-nomad-green transition-colors"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-white/50 font-bold flex items-center gap-2"><User className="w-4 h-4"/> Author Name</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Author Name"
                className="w-full bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-nomad-green transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Short Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief summary for the preview..."
              className="w-full bg-black/30 border border-white/10 px-4 py-3 text-white outline-none focus:border-nomad-green transition-colors min-h-[100px] resize-y"
              required
            />
          </div>

          {/* Rich Text Content */}
          <div className="flex flex-col gap-2 relative z-0">
            <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Content</label>
            <div className="text-nomad-ivory min-h-[400px]">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                className="h-[350px] font-sans"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4 border border-white/10 p-6 bg-white/[0.02]">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-nomad-ivory"><LinkIcon className="w-4 h-4" /> Auth & Social (Optional)</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-wider text-white/50">Author LinkedIn URL</label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-nomad-green"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-wider text-white/50">Instagram Post/Profile</label>
                <input
                  type="url"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-nomad-green"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-wider text-white/50">X (Twitter) URL</label>
                <input
                  type="url"
                  value={xLink}
                  onChange={(e) => setXLink(e.target.value)}
                  placeholder="https://x.com/..."
                  className="w-full bg-black/50 border border-white/10 px-3 py-2 text-sm text-white outline-none focus:border-nomad-green"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="self-start mt-4 bg-nomad-green text-nomad-charcoal px-8 py-4 font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-white transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Publishing...' : <><Save className="w-4 h-4"/> Publish Post</>}
          </button>
        </form>
    </>
  );

  if (isEmbedded) {
    return formContent;
  }

  return (
    <div className="min-h-screen bg-nomad-charcoal pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {formContent}
      </div>
    </div>
  );
}
