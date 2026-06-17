import React, { useState } from 'react';
import { Search, MoreVertical, MessageSquarePlus, Edit2, Camera, Users, Phone, MessageSquare, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('chats'); // chats, shortx, communities, calls
  const [showMenu, setShowMenu] = useState(false);

  // Mock Data mimicking your original screenshots (1000276348.jpg / 1000276349.jpg)
  const chatList = [
    { id: 1, name: "FY Students All Group B 25...", time: "12:09 pm", msg: "+91 90751 20233: https://forms.gle/g...", unread: true },
    { id: 2, name: "Ali Bagh", time: "11:20 am", msg: "✓✓ You: Nhi be toh nhi yenar sala toh d...", unread: false },
    { id: 3, name: "Harshal Kabra", time: "8:52 am", msg: "📷 Photo", unread: false },
    { id: 4, name: "MANDAR PATIL (You)", time: "1:12 am", msg: "✓✓ https://g.co/gemini/share/d5e7e5b...", unread: false },
    { id: 5, name: "Piyush Bhande", time: "12:58 am", msg: "✓ Nhi", unread: false }
  ];

  const statusList = [
    { id: 1, name: "My status", time: "Yesterday", type: "mine" },
    { id: 2, name: "Kavita Akka Akola", time: "13 minutes ago", type: "recent" },
    { id: 3, name: "Raju Da", time: "8:17 am", type: "recent" },
    { id: 4, name: "Aalka Aai Jamner", time: "Yesterday", type: "recent" }
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-chatxBg text-white relative border-x border-purple-950/30 select-none">
      
      {/* HEADER SECTION (References 1000276348.jpg - custom branded) */}
      <header className="flex justify-between items-center px-4 py-3 bg-chatxSurface border-b border-purple-950/40">
        <h1 className="text-2xl font-bold tracking-wide text-chatxPink">ChatX</h1>
        <div className="flex items-center gap-5 text-gray-300">
          <Camera className="w-5 h-5 cursor-pointer hover:text-chatxPink transition" />
          <Search className="w-5 h-5 cursor-pointer hover:text-chatxPink transition" />
          <div className="relative">
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-chatxPink transition" onClick={() => setShowMenu(!showMenu)} />
            
            {/* DROPDOWN MENU (References 1000276351.jpg) */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-chatxSurface border border-purple-900/40 rounded-xl shadow-2xl py-2 z-50">
                {['New group', 'New community', 'Broadcast lists', 'Linked devices', 'Starred', 'Settings'].map((item) => (
                  <button key={item} className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-purple-950/50 transition">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* FILTER PILLS (For Chats View) */}
      {activeTab === 'chats' && (
        <div className="flex gap-2 px-4 py-3 bg-chatxBg overflow-x-auto text-xs font-medium">
          {['All', 'Unread', 'Favourites', 'Groups'].map((pill, i) => (
            <span key={pill} className={`px-3 py-1.5 rounded-full cursor-pointer transition ${i === 0 ? 'bg-chatxPink/20 text-chatxPink border border-chatxPink/30' : 'bg-chatxSurface text-chatxTextMuted hover:bg-purple-950/30'}`}>
              {pill}
            </span>
          ))}
        </div>
      )}

      {/* MAIN VIEW CONTENT */}
      <main className="flex-1 overflow-y-auto">
        
        {/* CHATS VIEW */}
        {activeTab === 'chats' && (
          <div className="divide-y divide-purple-950/20">
            {chatList.map((chat) => (
              <div key={chat.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-chatxSurface/40 cursor-pointer transition">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-sm shadow-md">
                    {chat.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[15px] text-gray-100 truncate">{chat.name}</h3>
                    <p className="text-xs text-chatxTextMuted truncate mt-0.5">{chat.msg}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5 min-w-[65px]">
                  <span className="text-[11px] text-chatxTextMuted">{chat.time}</span>
                  {chat.unread && (
                    <span className="w-4.5 h-4.5 bg-chatxPink text-chatxBg text-[10px] font-bold rounded-full flex items-center justify-center">
                      1
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SHORTX VIEW (References 1000276349.jpg - updates renamed) */}
        {activeTab === 'shortx' && (
          <div className="p-4">
            <h2 className="text-md font-semibold text-chatxTextMuted mb-3">Status</h2>
            {statusList.map((status) => (
              <div key={status.id} className="flex items-center gap-4 py-2.5 cursor-pointer">
                <div className={`p-[2px] rounded-full ${status.type === 'recent' ? 'border-2 border-dashed border-chatxPink' : 'border-2 border-purple-900/30'}`}>
                  <div className="w-11 h-11 rounded-full bg-chatxSurface flex items-center justify-center text-xs font-bold">
                    {status.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-100">{status.name}</h3>
                  <p className="text-xs text-chatxTextMuted mt-0.5">{status.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMMUNITIES & CALLS PLACEHOLDERS */}
        {activeTab === 'communities' && <div className="p-8 text-center text-chatxTextMuted text-sm">No communities added yet.</div>}
        {activeTab === 'calls' && <div className="p-8 text-center text-chatxTextMuted text-sm">Your recent voice and video logs will appear here.</div>}
      </main>

      {/* FLOATING ACTION BUTTONS */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-3 items-center">
        {activeTab === 'shortx' && (
          <button className="p-2.5 bg-chatxSurface border border-purple-900/40 rounded-xl shadow-lg hover:bg-purple-950 transition text-chatxTextMuted">
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button className="p-4 bg-chatxPink text-chatxBg rounded-2xl shadow-xl hover:scale-105 transition active:scale-95 font-bold">
          {activeTab === 'chats' ? <MessageSquarePlus className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
        </button>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <nav className="flex justify-around items-center py-2 bg-chatxSurface border-t border-purple-950/40 text-[11px] font-medium">
        <button onClick={() => setActiveTab('chats')} className={`flex flex-col items-center gap-1 w-20 py-1 transition ${activeTab === 'chats' ? 'text-chatxPink' : 'text-chatxTextMuted hover:text-gray-300'}`}>
          <MessageSquare className="w-5 h-5" />
          <span>Chats</span>
        </button>
        <button onClick={() => setActiveTab('shortx')} className={`flex flex-col items-center gap-1 w-20 py-1 transition ${activeTab === 'shortx' ? 'text-chatxPink' : 'text-chatxTextMuted hover:text-gray-300'}`}>
          <Layers className="w-5 h-5" />
          <span>ShortX</span>
        </button>
        <button onClick={() => setActiveTab('communities')} className={`flex flex-col items-center gap-1 w-20 py-1 transition ${activeTab === 'communities' ? 'text-chatxPink' : 'text-chatxTextMuted hover:text-gray-300'}`}>
          <Users className="w-5 h-5" />
          <span>Communities</span>
        </button>
        <button onClick={() => setActiveTab('calls')} className={`flex flex-col items-center gap-1 w-20 py-1 transition ${activeTab === 'calls' ? 'text-chatxPink' : 'text-chatxTextMuted hover:text-gray-300'}`}>
          <Phone className="w-5 h-5" />
          <span>Calls</span>
        </button>
      </nav>

    </div>
  );
            }
