import React, { useState } from 'react';
import axios from 'axios';
import { Clipboard, Play, Sparkles, AlertCircle, TrendingUp, User, Layout, ArrowRight, Check, Share2, Zap, Info, X } from 'lucide-react';

const Badge = ({ children, variant = 'default' }) => {
  const styles = {
    default: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    premium: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${styles[variant]} uppercase tracking-wider`}>
      {children}
    </span>
  );
};

const SectionHeader = ({ icon: Icon, title, color, subtitle }) => (
  <div className="flex flex-col gap-1 mb-10">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-white/5 border border-white/10 shadow-xl">
        <Icon size={20} style={{ color }} />
      </div>
      <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
    </div>
    {subtitle && <p className="text-xs text-zinc-500 font-medium ml-12">{subtitle}</p>}
  </div>
);

const headlines = [
  { white: "Content Strategist", gray: "for Modern Video." },
  { white: "Viral Growth Engine", gray: "for YouTube Creators." },
  { white: "Repurpose Content", gray: "into Viral Shorts." },
  { white: "Intelligent Extraction", gray: "for Social Growth." },
  { white: "Maximize Reach", gray: "with AI Precision." },
  { white: "Future of Video", gray: "is AI Repurposing." },
  { white: "Transform Channels", gray: "with Data-Driven Clips." },
  { white: "Craft Viral Hooks", gray: "from Any URL." },
  { white: "Personal AI Coach", gray: "for Content Creators." },
  { white: "Unlock Potential", gray: "of Your Library." },
  { white: "Effortless Analysis", gray: "for Busy Creators." },
  { white: "Scale Presence", gray: "in Seconds." },
  { white: "Precision Clipping", gray: "for Maximum Impact." },
  { white: "Strategic Insights", gray: "for Every Video." },
  { white: "Turn One Video", gray: "into Ten Viral Clips." },
  { white: "Ultimate Toolkit", gray: "for Video Growth." },
  { white: "Automated Discovery", gray: " of Viral Content." },
  { white: "AI-Powered Stories", gray: "for Modern Media." },
  { white: "Dominate Feeds", gray: "with AI Clips." },
  { white: "Optimize Content", gray: "for Virality." },
  { white: "Streamline Workflow", gray: "with AI Intelligence." },
  { white: "Advanced Analytics", gray: "for Performance." },
  { white: "Smart Repurposing", gray: "for Every Platform." },
  { white: "Professional Blogs", gray: "from Your Video." },
  { white: "Deep Audits", gray: "and Content Coaching." },
  { white: "Optimize Hooks", gray: "for Retention." },
  { white: "Data-Backed", gray: "Viral Predictions." },
  { white: "The Intelligent Way", gray: "to Clip Videos." },
  { white: "Growth-Focused AI", gray: "for Creators." },
  { white: "Elevate Strategy", gray: "Instantly." },
  { white: "Viral Assets", gray: "in One Click." }
];

function App() {
  const [url, setUrl] = useState('');
  const [persona, setPersona] = useState('Influencer');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [copiedLabel, setCopiedLabel] = useState(null);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [showAbout, setShowAbout] = useState(false);

  const personas = ['Influencer', 'Educator', 'Comedian', 'Salesperson'];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlines.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setData(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await axios.post(`${apiUrl}/analyze`, { url, persona });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-400 antialiased font-sans pb-24 relative overflow-x-hidden">
      {/* Futuristic Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="w-full px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.2)] group-hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all duration-500">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="text-lg font-black text-white tracking-tighter uppercase italic">Viralo</span>
          </div>
          
          <button 
            onClick={() => setShowAbout(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-[11px] font-black uppercase tracking-widest text-zinc-300 hover:text-white"
          >
            <Info size={14} className="text-indigo-400" />
            About
          </button>
        </div>
      </nav>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAbout(false)}></div>
          <div className="relative w-full max-w-xl bg-[#050505] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-start">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <Zap size={24} className="text-indigo-400 fill-indigo-400" />
                </div>
                <button onClick={() => setShowAbout(false)} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">The Viral Engine</h2>
                <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                  Viralo is an advanced <span className="text-white font-bold">Neural Intelligence</span> platform designed to decode the viral DNA of video content. 
                </p>
                <div className="space-y-4 py-4 border-y border-white/5">
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2"></div>
                      <p className="text-sm text-zinc-300"><span className="text-white font-bold">Strategic Audit:</span> High-precision analysis of performance gaps and hooks.</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
                      <p className="text-sm text-zinc-300"><span className="text-white font-bold">Extraction Hub:</span> AI-driven selection of high-impact segments for shorts/reels.</p>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2"></div>
                      <p className="text-sm text-zinc-300"><span className="text-white font-bold">Distribution ready:</span> Optimized captions and strategic engagement triggers.</p>
                   </div>
                </div>
              </div>
              <button 
                onClick={() => setShowAbout(false)}
                className="w-full py-4 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-xl"
              >
                Close Intelligent Hub
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-ambient-top"></div>
      <div className="bg-glow-top"></div>
      <div className="bg-glow-bottom"></div>
      <div className="bg-glow-left"></div>
      <div className="bg-glow-right"></div>
      <div className="bg-blob bg-blob-left"></div>
      <div className="bg-blob bg-blob-right"></div>
      


      {/* Meaningful Side Markers - Analysis Context */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center opacity-50 pointer-events-none">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-rl] rotate-180 text-zinc-500">Strategic Analysis</span>
        <div className="flex flex-col gap-1 text-[9px] font-bold text-zinc-600">
          <span>01 TRANSCRIPT</span>
          <span>02 AUDIT</span>
          <span>03 EXTRACT</span>
        </div>
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
      </aside>

      <aside className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center opacity-50 pointer-events-none text-right">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-rl] text-zinc-500">Distribution Hub</span>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-indigo-400 font-bold">2.4X</span>
            <span className="text-[8px] text-zinc-600 font-black uppercase">Viral Lift</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] text-emerald-400 font-bold">+40%</span>
            <span className="text-[8px] text-zinc-600 font-black uppercase">Retention</span>
          </div>
        </div>
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
      </aside>
      
      <div className={`max-w-6xl mx-auto px-6 flex flex-col items-center transition-premium ${!data ? 'pt-40' : 'pt-32'}`}>
        
        {/* Hero / Main Input - Dynamic Headline */}
        <section className="text-center w-full animate-fade-in mb-12" style={{ animationDelay: '100ms' }}>
          <div className="h-64 flex flex-col items-center justify-center relative">
            <div className="mb-10 flex items-center justify-center animate-headline-reveal" style={{ animationDelay: '100ms' }}>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-400 to-zinc-600">
                Neural Intelligence Engine
              </span>
            </div>
            <h1 key={headlineIndex} className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] animate-headline-reveal">
              <span className="bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent block mb-2 drop-shadow-sm">{headlines[headlineIndex].white}</span>
              <span className="text-zinc-600 block">{headlines[headlineIndex].gray}</span>
            </h1>
          </div>
          
          <div className="max-w-2xl mx-auto w-full">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000 group-hover:duration-500"></div>
              <div className="relative bg-[#000] border border-white/10 shadow-2xl p-2 rounded-2xl flex flex-col md:flex-row gap-2 ring-1 ring-black/50">
                <input 
                  type="text" 
                  placeholder="Paste YouTube Link..." 
                  className="flex-1 bg-transparent px-5 py-3 outline-none text-zinc-200 text-sm placeholder:text-zinc-600 font-medium"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <div className="flex items-center gap-2 p-1">
                  <div className="relative group/select">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-hover/select:text-indigo-400 transition-colors" size={14} />
                    <select 
                      value={persona} 
                      onChange={(e) => setPersona(e.target.value)}
                      className="bg-zinc-900/50 text-zinc-300 pl-9 pr-4 py-2 rounded-xl outline-none border border-white/5 text-[12px] font-semibold appearance-none cursor-pointer hover:bg-zinc-900 transition-colors"
                    >
                      {personas.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <button 
                    onClick={handleGenerate} 
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-2 rounded-xl text-[12px] font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center min-w-[100px]"
                  >
                    {loading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : 'Analyze'}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="mt-4 text-[11px] text-red-500 font-medium">{error}</p>}
          </div>

          {/* Social Platform Bar - Filling the 'Blank' Space */}
          <div className="mt-20 animate-fade-in opacity-50 hover:opacity-100 transition-opacity duration-1000" style={{ animationDelay: '300ms' }}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-zinc-500">Optimize & Repurpose for</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale">
              <div className="flex items-center gap-2 group cursor-default">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-xs font-bold">Instagram</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white transition-colors">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="text-xs font-bold">Facebook</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-white transition-colors">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="text-xs font-bold">Twitter / X</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <Layout size={20} className="group-hover:text-white transition-colors" />
                <span className="text-xs font-bold">LinkedIn</span>
              </div>
            </div>
          </div>
        </section>

        {loading && (
          <div className="text-center pt-4 pb-12 animate-fade-in flex flex-col items-center">

            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">Analyzing Content Structure</p>
            <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">Advanced Vision Models Running</p>
          </div>
        )}

        {data && (
          <div className="space-y-24 w-full">
            
            {/* Content Audit */}
            {data.content_feedback && (
              <section className="w-full animate-premium-reveal stagger-1">
                <SectionHeader 
                  icon={Layout} 
                  title="Performance Intelligence" 
                  subtitle="Strategic gap analysis and viral potential audit."
                  color="#6366f1" 
                />
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-[#18181b] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl transition-all duration-500 hover:bg-[#1a1a1e]">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500/40 to-transparent"></div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                        <AlertCircle size={18} className="text-red-400" />
                      </div>
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Strategic Weaknesses</h3>
                    </div>
                    <ul className="space-y-6">
                      {data.content_feedback.weaknesses?.map((w, i) => (
                        <li key={i} className="text-[15px] text-zinc-400 leading-relaxed flex gap-4 items-start group/item">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-900/40 group-hover/item:bg-red-500/60 transition-colors shrink-0"></span>
                          <span className="group-hover/item:text-zinc-200 transition-colors">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#18181b] border border-white/5 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl transition-all duration-500 hover:bg-[#1a1a1e]">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-500/40 to-transparent"></div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Check size={18} className="text-emerald-400" />
                      </div>
                      <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Optimization Paths</h3>
                    </div>
                    <ul className="space-y-6">
                      {data.content_feedback.improvements?.map((imp, i) => (
                        <li key={i} className="text-[15px] text-zinc-400 leading-relaxed flex gap-4 items-start group/item">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-900/40 group-hover/item:bg-emerald-500/60 transition-colors shrink-0"></span>
                          <span className="group-hover/item:text-zinc-200 transition-colors">{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Clips Audit */}
            <section className="w-full animate-premium-reveal stagger-2">
              <SectionHeader 
                icon={TrendingUp} 
                title="Viral Extraction Engine" 
                subtitle="Optimized segments for maximum social reach."
                color="#a855f7" 
              />
              <div className="space-y-16">
                {data.clips?.map((clip, index) => (
                  <div key={index} className="bg-[#111113] border border-white/5 rounded-[3rem] overflow-hidden animate-premium-reveal shadow-2xl group transition-all duration-700 hover:bg-[#141416]" style={{ animationDelay: `${index * 150 + 400}ms` }}>
                    <div className="p-10 md:p-14 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent relative">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
                        <div className="space-y-6">
                          <div className="flex items-center gap-5 flex-wrap">
                            <h3 className="text-3xl font-black text-white tracking-tighter uppercase italic">{clip.title}</h3>
                            <div className="flex items-center gap-3">
                              <div className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest">{clip.virality_score}/10 VIRAL POTENTIAL</span>
                              </div>
                              <Badge variant="default">{clip.performance?.views_potential}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5 backdrop-blur-md">
                              <Play size={14} className="text-indigo-400" /> {clip.start_time} — {clip.end_time}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(clip.caption, `cap-${index}`)}
                          className="w-full md:w-auto px-10 py-4 bg-white text-black rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-zinc-200 hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl"
                        >
                          {copiedLabel === `cap-${index}` ? <Check size={16} /> : <Clipboard size={16} />}
                          {copiedLabel === `cap-${index}` ? 'ASSETS COPIED' : 'COPY VIRAL ASSETS'}
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-12 relative z-10">
                      {/* Left: Transformation */}
                      <div className="md:col-span-7 p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/5">
                        <div className="space-y-12">
                          <div className="space-y-6">
                            <div className="flex items-center gap-3 text-zinc-500">
                              <Sparkles size={16} className="text-indigo-400" />
                              <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">The Hook Evolution</h4>
                            </div>
                            <div className="space-y-6">
                              <div className="bg-black/40 p-6 rounded-3xl border border-white/5 relative group/card">
                                <span className="absolute -top-3 left-6 px-3 bg-black text-[10px] font-black text-zinc-600 uppercase tracking-widest border border-white/5 rounded-full">Original Narrative</span>
                                <p className="text-[15px] text-zinc-500 italic leading-relaxed group-hover/card:text-zinc-400 transition-colors">"{clip.before_after?.original}"</p>
                              </div>
                              <div className="flex justify-center -my-3 relative z-10">
                                <div className="bg-indigo-600/20 backdrop-blur-xl p-2 rounded-full border border-indigo-500/30 shadow-2xl">
                                  <ArrowRight size={18} className="text-indigo-400 rotate-90 md:rotate-0" />
                                </div>
                              </div>
                              <div className="bg-gradient-to-br from-indigo-500/10 to-transparent p-8 rounded-3xl border border-indigo-500/20 relative group/vcard transition-all duration-500 shadow-sm">
                                <span className="absolute -top-3 left-6 px-3 bg-indigo-600 text-[10px] font-black text-white uppercase tracking-widest rounded-full shadow-lg">Viral Evolution</span>
                                <p className="text-xl text-white font-black leading-snug tracking-tight italic">{clip.before_after?.improved}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em]">Strategic Logic</h4>
                            <p className="text-[15px] text-zinc-400 leading-relaxed font-medium">{clip.reason}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Social Preview */}
                      <div className="md:col-span-5 p-10 md:p-14 bg-black/20 backdrop-blur-sm">
                        <div className="space-y-10">
                          <div className="space-y-6">
                            <h4 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em]">Social Media Ready</h4>
                            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-6 shadow-2xl relative overflow-hidden group/social">
                              <div className="flex items-center gap-4 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                                  <User size={20} className="text-white" />
                                </div>
                                <div>
                                  <div className="w-24 h-2.5 bg-white/10 rounded-full mb-1"></div>
                                  <div className="w-16 h-1.5 bg-white/5 rounded-full"></div>
                                </div>
                              </div>
                              <p className="text-[14px] text-zinc-200 leading-relaxed font-bold relative z-10">
                                {clip.caption}
                              </p>
                              <div className="flex flex-wrap gap-2 relative z-10">
                                {clip.hashtags?.map((tag, i) => (
                                  <span key={i} className="text-[12px] font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg">{tag}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <h4 className="text-[11px] font-black text-zinc-600 uppercase tracking-[0.3em]">Engagement Trigger</h4>
                            <div className="bg-indigo-500/5 p-6 rounded-2xl border-l-4 border-indigo-500 shadow-xl">
                              <p className="text-[15px] text-white leading-relaxed font-black italic tracking-tight">"{clip.hook}"</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Repurposing Hub */}
            <section className="pb-32 w-full animate-premium-reveal stagger-4">
              <SectionHeader 
                icon={Share2} 
                title="Omnichannel Distribution" 
                subtitle="Optimized assets for every platform in your ecosystem."
                color="#f43f5e" 
              />
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(data.repurpose || {}).map(([platform, text], i) => (
                  <div key={platform} className="bg-[#050505] border border-white/5 p-8 rounded-[2.5rem] flex flex-col group hover:bg-[#080808] transition-all duration-500 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors pointer-events-none"></div>
                    <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-rose-500"></div>
                      {platform}
                    </span>
                    <p className="text-[14px] text-zinc-400 leading-relaxed mb-8 flex-1 italic group-hover:text-zinc-300 transition-colors">"{text}"</p>
                    <button 
                      onClick={() => copyToClipboard(text, `rep-${i}`)}
                      className="w-full py-4 bg-zinc-900/50 border border-white/5 rounded-2xl text-[11px] font-black text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-white/10 transition-all flex items-center justify-center gap-3"
                    >
                      {copiedLabel === `rep-${i}` ? <Check size={14} className="text-emerald-500" /> : <Clipboard size={14} />}
                      {copiedLabel === `rep-${i}` ? 'COPIED' : 'COPY ASSET'}
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
