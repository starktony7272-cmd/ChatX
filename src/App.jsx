import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, MessageSquarePlus, Edit2, Camera, Users, Phone, MessageSquare, Layers, Lock, ShieldCheck, UserPlus } from 'lucide-react';
import { auth } from './firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export default function App() {
  // Authentication State
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Main UI & Contact State
  const [activeTab, setActiveTab] = useState('chats'); 
  const [showMenu, setShowMenu] = useState(false);
  const [deviceContacts, setDeviceContacts] = useState([]);

  // Setup reCAPTCHA Verifier for Firebase Phone Auth
  useEffect(() => {
    if (!user && !confirmationResult) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  }, [user, confirmationResult]);

  // Step 1: Send Real SMS OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return setError('Please enter a valid phone number');
    setLoading(true);
    setError('');
    
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(confirmation);
    } catch (err) {
      setError(err.message || 'Error sending SMS. Check your format (e.g. +91XXXXXXXXXX)');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP 
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return setError('Please enter the 6-digit code');
    setLoading(true);
    setError('');

    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
    } catch (err) {
      setError('Invalid OTP code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Device Contact Syncing (Native Mobile Web Contact Picker)
  const syncDeviceContacts = async () => {
    const props = ['name', 'tel'];
    const opts = { multiple: true };

    if ('contacts' in navigator && 'ContactsManager' in window) {
      try {
        const contacts = await navigator.contacts.select(props, opts);
        if (contacts.length > 0) {
          // Format contact data to match our chat list structure
          const formattedContacts = contacts.map((c, index) => ({
            id: `device-${index}`,
            name: c.name?.[0] || 'Unknown Contact',
            time: 'Just now',
            msg: c.tel?.[0] || 'No number available',
            unread: false
          }));
          setDeviceContacts(formattedContacts);
        }
      } catch (err) {
        alert('Contact access dismissed or blocked: ' + err.message);
      }
    } else {
      alert('Your mobile browser doesn\'t fully support the native Contact Picker. Showing mock contact addition fallback!');
      // Fallback fallback contact if device API is restricted in standard mobile web views
      setDeviceContacts([
        { id: 'fallback-1', name: 'Mandar Patil (Synced)', time: '12:30 pm', msg: '+91 90751 20233', unread: false },
        { id: 'fallback-2', name: 'Harshal Kabra (Synced)', time: '8:52 am', msg: '+91 98765 43210', unread: false }
      ]);
    }
  };

  // Static screenshot data combined with real synced device contacts
  const staticChats = [
    { id: 1, name: "FY Students All Group B 25...", time: "12:09 pm", msg: "+91 90751 20233: https://forms.gle/g...", unread: true },
    { id: 2, name: "Ali Bagh", time: "11:20 am", msg: "✓✓ You: Nhi be toh nhi yenar sala toh d...", unread: false },
    { id: 3, name: "Piyush Bhande", time: "12:58 am", msg: "✓ Nhi", unread: false }
  ];

  const chatList = [...deviceContacts, ...staticChats];

  const statusList = [
    { id: 1, name: "My status", time: "Yesterday", type: "mine" },
    { id: 2, name: "Kavita Akka Akola", time: "13 minutes ago", type: "recent" }
  ];

  // RENDER AUTH SCREEN IF NOT LOGGED IN
  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center h-screen max-w-md mx-auto bg-chatxBg text-white px-6">
        <div id="recaptcha-container"></div>
        
        <div className="w-full max-w-sm bg-chatxSurface p-6 rounded-2xl border border-purple-950/40 shadow-2xl text-center">
          <h1 className="text-3xl font-extrabold text-chatxPink mb-2 tracking-wide">ChatX</h1>
          <p className="text-xs text-chatxTextMuted mb-6">Verify your phone number to get started</p>
          
          {error && <p className="text-xs text-red-400 bg-red-500/10 py-2 px-3 rounded-lg mb-4">{error}</p>}

          {!confirmationResult ? (
            <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-chatxBg p-3 rounded-xl border border-purple-900/30">
                <Lock className="w-5 h-5 text-chatxPink" />
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm text-white placeholder-gray-600"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-chatxPink text-chatxBg py-3 rounded-xl font-bold disabled:opacity-50">
                {loading ? 'Sending SMS...' : 'Next'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 bg-chatxBg p-3 rounded-xl border border-purple-900/30">
                <ShieldCheck className="w-5 h-5 text-chatxPink" />
                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm text-white text-center font-bold placeholder-gray-600"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-chatxPrimary text-white py-3 rounded-xl font-bold disabled:opacity-50">
                {loading ? 'Verifying...' : 'Verify & Setup'}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // RENDER MAIN APPLICATION DASHBOARD
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-chatxBg text-white relative border-x border-purple-950/30 select-none">
      
      {/* HEADER SECTION */}
      <header className="flex justify-between items-center px-4 py-3 bg-chatxSurface border-b border-purple-950/40">
        <h1 className="text-2xl font-bold tracking-wide text-chatxPink">ChatX</h1>
        <div className="flex items-center gap-5 text-gray-300">
          <Camera className="w-5 h-5 cursor-pointer hover:text-chatxPink transition" />
          <Search className="w-5 h-5 cursor-pointer hover:text-chatxPink transition" />
          <div className="relative">
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-chatxPink transition" onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-chatxSurface border border-purple-900/40 rounded-xl shadow-2xl py-2 z-50">
                <button onClick={syncDeviceContacts} className="w-full text-left px-4 py-2.5 text-sm text-chatxPink font-semibold hover:bg-purple-950/50 transition flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Sync Contacts
                </button>
                {['New group', 'New community', 'Settings'].map((item) => (
                  <button key={item} className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-purple-950/50 transition">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* FILTER PILLS */}
      {activeTab === 'chats' && (
        <div className="flex gap-2 px-4 py-3 bg-chatxBg overflow-x-auto text-xs font-medium">
          {['All', 'Unread', 'Groups'].map((pill, i) => (
            <span key={pill} className={`px-3 py-1.5 rounded-full cursor-pointer transition ${i === 0 ? 'bg-chatxPink/20 text-chatxPink border border-chatxPink/30' : 'bg-chatxSurface text-chatxTextMuted'}`}>
              {pill}
            </span>
          ))}
        </div>
      )}

      {/* MAIN CONTENT PANELS */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'chats' && (
          <div className="divide-y divide-purple-950/20">
            {chatList.map((chat) => (
              <div key={chat.id} className="flex items-center justify-between px-4 py-3.5 hover:bg-chatxSurface/40 cursor-pointer">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-sm">
                    {chat.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-[15px] text-gray-100 truncate">{chat.name}</h3>
                    <p className="text-xs text-chatxTextMuted truncate mt-0.5">{chat.msg}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5 min-w-[65px]">
                  <span className="text-[11px] text-chatxTextMuted">{chat.time}</span>
                  {chat.unread && <span className="w-4.5 h-4.5 bg-chatxPink text-chatxBg text-[10px] font-bold rounded-full flex items-center justify-center">1</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'shortx' && (
          <div className="p-4">
            <h2 className="text-md font-semibold text-chatxTextMuted mb-3">Status</h2>
            {statusList.map((status) => (
              <div key={status.id} className="flex items-center gap-4 py-2.5">
                <div className="p-[2px] rounded-full border-2 border-dashed border-chatxPink">
                  <div className="w-11 h-11 rounded-full bg-chatxSurface flex items-center justify-center text-xs font-bold">{status.name.charAt(0)}</div>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-100">{status.name}</h3>
                  <p className="text-xs text-chatxTextMuted mt-0.5">{status.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FLOATING ACTION ACTION BUTTON */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-3 items-center">
        <button onClick={syncDeviceContacts} className="p-4 bg-chatxPink text-chatxBg rounded-2xl shadow-xl hover:scale-105 transition font-bold">
          {activeTab === 'chats' ? <MessageSquarePlus className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
        </button>
      </div>

      {/* FOOTER TAB NAVIGATION */}
      <nav className="flex justify-around items-center py-2 bg-chatxSurface border-t border-purple-950/40 text-[11px] font-medium">
        <button onClick={() => setActiveTab('chats')} className={`flex flex-col items-center gap-1 w-20 py-1 ${activeTab === 'chats' ? 'text-chatxPink' : 'text-chatxTextMuted'}`}>
          <MessageSquare className="w-5 h-5" />
          <span>Chats</span>
        </button>
        <button onClick={() => setActiveTab('shortx')} className={`flex flex-col items-center gap-1 w-20 py-1 ${activeTab === 'shortx' ? 'text-chatxPink' : 'text-chatxTextMuted'}`}>
          <Layers className="w-5 h-5" />
          <span>ShortX</span>
        </button>
      </nav>
    </div>
  );
}
