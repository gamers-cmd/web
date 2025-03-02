import React, { useState, useEffect } from 'react';
import { Share2, ThumbsUp, Eye, TrendingUp, Youtube, ChevronRight, Clock, Award } from 'lucide-react';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [isValidUrl, setIsValidUrl] = useState(true);

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    const id = extractVideoId(url);
    setIsValidUrl(!!id);
    if (id) {
      setVideoId(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidUrl && videoId) {
      setIsSubmitted(true);
      // Simulate increasing view count
      setViewCount(0);
    }
  };

  // Simulate view count increasing over time
  useEffect(() => {
    if (isSubmitted) {
      const interval = setInterval(() => {
        setViewCount(prev => {
          const newCount = prev + Math.floor(Math.random() * 10) + 1;
          if (newCount >= 10000) {
            clearInterval(interval);
            return 10000;
          }
          return newCount;
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isSubmitted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Youtube size={32} className="text-red-500" />
            <h1 className="text-2xl font-bold">ViewBoost</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#how-it-works" className="hover:text-pink-300 transition">How It Works</a>
            <a href="#benefits" className="hover:text-pink-300 transition">Benefits</a>
            <a href="#testimonials" className="hover:text-pink-300 transition">Testimonials</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Boost Your YouTube Video to 10,000+ Views</h2>
          <p className="text-xl mb-8 text-indigo-200">Get real, organic views for your YouTube videos and increase your channel's visibility</p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="videoUrl" className="block text-left text-lg mb-2">Enter your YouTube video URL:</label>
                  <input
                    type="text"
                    id="videoUrl"
                    value={videoUrl}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className={`w-full p-4 rounded-lg bg-white/20 backdrop-blur focus:outline-none focus:ring-2 focus:ring-pink-500 ${!isValidUrl && videoUrl ? 'border-2 border-red-500' : ''}`}
                  />
                  {!isValidUrl && videoUrl && (
                    <p className="text-red-400 text-left mt-2">Please enter a valid YouTube URL</p>
                  )}
                </div>
                
                {videoId && (
                  <div className="my-6">
                    <h3 className="text-lg mb-3">Preview:</h3>
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe 
                        width="100%" 
                        height="100%" 
                        src={`https://www.youtube.com/embed/${videoId}`} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={!isValidUrl || !videoId}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Boost My Video Now
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Your video is being promoted!</h3>
                
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                
                <div className="bg-white/20 rounded-lg p-6">
                  <h4 className="text-xl mb-4">Promotion Progress</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span>Views Generated:</span>
                    <span className="font-bold">{viewCount.toLocaleString()}/10,000</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(viewCount / 10000) * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-4 text-sm">Your video is being promoted across our network. This process typically takes 24-48 hours to complete.</p>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setVideoUrl('');
                      setVideoId('');
                      setViewCount(0);
                    }}
                    className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-6 rounded-full text-lg transition"
                  >
                    Promote Another Video
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="how-it-works" className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Submit Your Video</h3>
              <p className="text-indigo-200">Paste your YouTube video URL in our promotion form and submit it for boosting.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. We Promote It</h3>
              <p className="text-indigo-200">Our system promotes your video across our network of websites and social media platforms.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Watch Views Grow</h3>
              <p className="text-indigo-200">Your video receives organic views, likes, and engagement from real users interested in your content.</p>
            </div>
          </div>
        </section>

        <section id="benefits" className="max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Using ViewBoost</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <ThumbsUp size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">100% Organic Views</h3>
                <p className="text-indigo-200">All views are from real people, not bots. This helps maintain your channel's credibility with YouTube's algorithm.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Improved Rankings</h3>
                <p className="text-indigo-200">More views means better rankings in YouTube search results and recommendations.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-600 p-2 rounded-lg">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Fast Results</h3>
                <p className="text-indigo-200">See your view count increase within 24-48 hours of submitting your video.</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Channel Growth</h3>
                <p className="text-indigo-200">More views lead to more subscribers and better channel metrics overall.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-4">
                  <h4 className="font-bold">Sarah Johnson</h4>
                  <p className="text-sm text-indigo-200">Travel Vlogger</p>
                </div>
              </div>
              <p className="text-indigo-200">"My travel vlog went from 200 views to over 12,000 in just three days! I've gained so many new subscribers. This service is amazing!"</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-4">
                  <h4 className="font-bold">Michael Chen</h4>
                  <p className="text-sm text-indigo-200">Tech Reviewer</p>
                </div>
              </div>
              <p className="text-indigo-200">"I was skeptical at first, but the results speak for themselves. My product review got the exposure it deserved and now brands are reaching out to me!"</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-4">
                  <h4 className="font-bold">Emma Rodriguez</h4>
                  <p className="text-sm text-indigo-200">Music Artist</p>
                </div>
              </div>
              <p className="text-indigo-200">"My music video reached 10k views in just two days! The engagement was incredible and I've seen a significant boost in my streaming numbers too."</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black/30 mt-20 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Youtube size={24} className="text-red-500" />
              <h2 className="text-xl font-bold">ViewBoost</h2>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-indigo-300 text-sm">© 2025 ViewBoost. All rights reserved.</p>
              <p className="text-indigo-400 text-xs mt-1">This is a demonstration website. Results may vary.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;