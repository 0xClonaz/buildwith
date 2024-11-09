import { useState } from 'react';
import Split from 'react-split';
import { Send, Crown } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Editor() {
  const [prompt, setPrompt] = useState('');
  const user = useStore((state) => state.user);
  const wordCount = prompt.trim().split(/\s+/).length;
  const wordLimit = user?.wordLimit || 40;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount > wordLimit) return;
    if (!user?.credits) return;
    // Handle AI prompt submission
  };

  return (
    <Split 
      className="flex h-screen"
      sizes={[40, 60]}
      minSize={400}
      gutterSize={8}
      snapOffset={30}
    >
      <div className="bg-gray-900 flex flex-col h-full">
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">AI Web Builder</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Credits: {user?.credits || 0}</span>
              {user?.plan !== 'free' && (
                <Crown className="h-4 w-4 text-purple-400" />
              )}
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Words: {wordCount}/{wordLimit}
          </div>
        </div>
        
        <div className="flex-1 overflow-auto p-4">
          <form onSubmit={handleSubmit} className="h-full flex flex-col">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your website changes..."
              className="flex-1 p-3 rounded-lg bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
            <div className="mt-4 flex justify-between items-center">
              {wordCount > wordLimit && (
                <p className="text-red-400 text-sm">
                  Exceeded word limit
                </p>
              )}
              <button
                type="submit"
                disabled={wordCount > wordLimit || !user?.credits}
                className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
              >
                <Send className="h-4 w-4" />
                Send (1 credit)
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-gray-800 border-l border-gray-700">
        <div className="h-full flex items-center justify-center text-gray-400">
          Website preview will appear here
        </div>
      </div>
    </Split>
  );
}