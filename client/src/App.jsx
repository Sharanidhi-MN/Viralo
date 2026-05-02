import React, { useState } from 'react';
import axios from 'axios';
import { Clipboard, Play, Sparkles, AlertCircle, TrendingUp, User, Layout, ArrowRight, Check, Share2 } from 'lucide-react';

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

const SectionHeader = ({ icon: Icon, title, color }) => (
  <div className="flex items-center gap-2 mb-6">
    <div className={`p-1.5 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${color}22` }}>
      <Icon size={18} style={{ color }} />
    </div>
    <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">{title}</h2>
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
      const response = await axios.post('http://localhost:5001/analyze', { url, persona });
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
    <div className="min-h-screen bg-[#030303] bg-grid text-zinc-400 antialiased font-sans pb-24 relative overflow-x-hidden">
      <div className="bg-glow-top"></div>
      <div className="bg-glow-bottom"></div>
      <div className="bg-glow-left"></div>
      <div className="bg-glow-right"></div>
      <div className="bg-blob bg-blob-left"></div>
      <div className="bg-blob bg-blob-right"></div>
      
      {loading && <div className="animate-scan"></div>}

      {/* Meaningful Side Markers - Analysis Context */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center opacity-20 pointer-events-none">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-rl] rotate-180">Strategic Analysis</span>
        <div className="flex flex-col gap-1 text-[9px] font-bold text-zinc-600">
          <span>01 TRANSCRIPT</span>
          <span>02 AUDIT</span>
          <span>03 EXTRACT</span>
        </div>
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
      </aside>

      <aside className="fixed right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center opacity-20 pointer-events-none text-right">
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-rl]">Distribution Hub</span>
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
      
      <div className={`max-w-6xl mx-auto px-6 flex flex-col items-center transition-premium ${!data ? 'min-h-[85vh] justify-center pt-32' : 'pt-32'}`}>
        
        {/* Hero / Main Input - Dynamic Headline */}
        <section className="text-center mb-20 w-full animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="h-64 flex flex-col items-center justify-center">
            <h1 key={headlineIndex} className="text-6xl font-bold tracking-tight mb-8 leading-[1.1] animate-headline-reveal">
              <span className="text-zinc-100 block mb-2">{headlines[headlineIndex].white}</span>
              <span className="text-zinc-500 block">{headlines[headlineIndex].gray}</span>
            </h1>
          </div>
          
          <div className="max-w-2xl mx-auto w-full">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0A0A0A] border border-zinc-800 p-2 rounded-2xl flex flex-col md:flex-row gap-2">
                <input 
                  type="text" 
                  placeholder="Paste YouTube Link..." 
                  className="flex-1 bg-transparent px-4 py-3 outline-none text-zinc-200 text-sm placeholder:text-zinc-600"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <div className="flex items-center gap-2 p-1">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                    <select 
                      value={persona} 
                      onChange={(e) => setPersona(e.target.value)}
                      className="bg-zinc-900 text-zinc-300 pl-9 pr-4 py-2 rounded-xl outline-none border border-zinc-800 text-[12px] font-semibold appearance-none cursor-pointer hover:bg-zinc-800 transition-colors"
                    >
                      {personas.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <button 
                    onClick={handleGenerate} 
                    disabled={loading}
                    className="bg-zinc-100 hover:bg-white text-black px-6 py-2 rounded-xl text-[12px] font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center min-w-[100px]"
                  >
                    {loading ? <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div> : 'Analyze'}
                  </button>
                </div>
              </div>
            </div>
            {error && <p className="mt-4 text-[11px] text-red-500 font-medium">{error}</p>}
          </div>

          {/* Social Platform Bar - Filling the 'Blank' Space */}
          <div className="mt-20 animate-fade-in opacity-20 hover:opacity-40 transition-opacity duration-1000" style={{ animationDelay: '300ms' }}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-zinc-600">Optimize & Repurpose for</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale">
              <div className="flex items-center gap-2 group cursor-default">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-pink-500 transition-colors">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="text-xs font-bold">Instagram</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-blue-500 transition-colors">
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
                <Layout size={20} className="group-hover:text-blue-400 transition-colors" />
                <span className="text-xs font-bold">LinkedIn</span>
              </div>
            </div>
          </div>
        </section>

        {loading && (
          <div className="text-center py-20 animate-fade-in">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600 mb-4">Neural Processing Engine Active</p>
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }}></div>
              ))}
            </div>
          </div>
        )}

        {data && (
          <div className="space-y-24 w-full">
            
            {/* Content Audit */}
            {data.content_feedback && (
              <section className="w-full animate-premium-reveal stagger-1">
                <SectionHeader icon={Layout} title="Strategic Content Audit" color="#6366f1" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#0A0A0A] border border-zinc-800/50 p-8 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20 group-hover:bg-red-500/40 transition-colors"></div>
                    <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-6">Strategic Weaknesses</h3>
                    <ul className="space-y-4">
                      {data.content_feedback.weaknesses?.map((w, i) => (
                        <li key={i} className="text-sm text-zinc-300 flex gap-4 items-start">
                          <AlertCircle size={16} className="text-red-900 shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-[#0A0A0A] border border-zinc-800/50 p-8 rounded-[2rem] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20 group-hover:bg-emerald-500/40 transition-colors"></div>
                    <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mb-6">Optimization Paths</h3>
                    <ul className="space-y-4">
                      {data.content_feedback.improvements?.map((imp, i) => (
                        <li key={i} className="text-sm text-zinc-300 flex gap-4 items-start">
                          <Check size={16} className="text-emerald-900 shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Clips Audit */}
            <section className="w-full animate-premium-reveal stagger-2">
              <SectionHeader icon={TrendingUp} title="Viral Clips Engine" color="#a855f7" />
              <div className="space-y-12">
                {data.clips?.map((clip, index) => (
                  <div key={index} className="bg-[#0A0A0A] border border-zinc-800/50 rounded-[2.5rem] overflow-hidden animate-premium-reveal" style={{ animationDelay: `${index * 150 + 400}ms` }}>
                    <div className="p-8 md:p-12 border-b border-zinc-800/50 bg-zinc-900/10">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 flex-wrap">
                            <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">{clip.title}</h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={clip.virality_score > 7 ? 'success' : 'premium'}>
                                {clip.virality_score}/10 VIRAL SCORE
                              </Badge>
                              <Badge variant="default">{clip.performance?.views_potential}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                            <span className="flex items-center gap-2 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800/50">
                              <Play size={12} className="text-indigo-500" /> {clip.start_time} — {clip.end_time}
                            </span>
                          </div>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(clip.caption, `cap-${index}`)}
                          className="w-full md:w-auto px-8 py-3 bg-zinc-100 text-black rounded-2xl text-[12px] font-bold hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          {copiedLabel === `cap-${index}` ? <Check size={14} /> : <Clipboard size={14} />}
                          {copiedLabel === `cap-${index}` ? 'COPIED' : 'COPY FULL ASSETS'}
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-12">
                      {/* Left: Transformation */}
                      <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-zinc-800/50">
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">The Viral Hook Transformation</h4>
                            <div className="space-y-4">
                              <div className="bg-zinc-900/30 p-5 rounded-2xl border border-zinc-800/30 relative">
                                <span className="absolute -top-2.5 left-4 px-2 bg-[#0A0A0A] text-[9px] font-bold text-zinc-500 uppercase">Original Line</span>
                                <p className="text-sm text-zinc-500 italic">"{clip.before_after?.original}"</p>
                              </div>
                              <div className="flex justify-center -my-2 relative z-10">
                                <div className="bg-indigo-600 p-1.5 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]">
                                  <ArrowRight size={14} className="text-white rotate-90 md:rotate-0" />
                                </div>
                              </div>
                              <div className="bg-indigo-500/5 p-6 rounded-2xl border border-indigo-500/20 relative group hover:bg-indigo-500/10 transition-colors">
                                <span className="absolute -top-2.5 left-4 px-2 bg-[#0A0A0A] text-[9px] font-bold text-indigo-400 uppercase">Viral Version</span>
                                <p className="text-lg text-zinc-100 font-semibold leading-relaxed tracking-tight">{clip.before_after?.improved}</p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3 pt-4">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Strategy Insight</h4>
                            <p className="text-sm text-zinc-400 leading-relaxed">{clip.reason}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Post Preview */}
                      <div className="md:col-span-5 p-8 md:p-12 bg-zinc-900/10">
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Social Media Preview</h4>
                            <div className="bg-zinc-900/40 p-6 rounded-[1.5rem] border border-zinc-800/50 space-y-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
                                <div className="w-20 h-2 bg-zinc-800 rounded-full"></div>
                              </div>
                              <p className="text-[13px] text-zinc-300 leading-relaxed font-medium">
                                <span className="text-indigo-400 font-bold">@Creator</span> {clip.caption}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {clip.hashtags?.map((tag, i) => (
                                  <span key={i} className="text-[11px] font-bold text-indigo-400/80">{tag}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Engagement Hook</h4>
                            <div className="bg-zinc-900/80 p-5 rounded-2xl border-l-2 border-indigo-500">
                              <p className="text-[13px] text-zinc-200 leading-relaxed italic">"{clip.hook}"</p>
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
            <section className="pb-20 w-full animate-premium-reveal stagger-4">
              <SectionHeader icon={Share2} title="Distribution Assets" color="#f43f5e" />
              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(data.repurpose || {}).map(([platform, text], i) => (
                  <div key={platform} className="bg-[#0A0A0A] border border-zinc-800 p-6 rounded-2xl flex flex-col">
                    <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-4">{platform}</span>
                    <p className="text-[12px] text-zinc-400 leading-relaxed mb-6 flex-1 line-clamp-4 italic">"{text}"</p>
                    <button 
                      onClick={() => copyToClipboard(text, `rep-${i}`)}
                      className="w-full py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-bold text-zinc-500 hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                    >
                      {copiedLabel === `rep-${i}` ? <Check size={10} className="text-emerald-500" /> : <Clipboard size={10} />}
                      {copiedLabel === `rep-${i}` ? 'Copied' : 'Copy Asset'}
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
