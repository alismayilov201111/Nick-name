/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import MobileFrame from "./components/MobileFrame";
import NickGenerator from "./components/NickGenerator";
import CustomDesigner from "./components/CustomDesigner";
import FavoritesList from "./components/FavoritesList";
import PresetTags from "./components/PresetTags";
import { Sparkles, Palette, Compass, Heart, Sun, Moon, Info, Gamepad, HelpCircle, Check, X } from "lucide-react";

interface FavoriteItem {
  id: string;
  text: string;
  styleName: string;
  savedAt?: string;
}

export default function App() {
  const [text, setText] = useState("Shadow");
  const [activeTab, setActiveTab] = useState<"generator" | "designer" | "presets" | "favorites">("generator");
  
  // Theme state synced with localStorage, default to true (gamer dark feel)
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("nn_maker_dark");
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Favorites list state synced with localStorage
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const saved = localStorage.getItem("nn_maker_favs_v2");
      return saved !== null ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
  
  // Information Modal Overlay state
  const [showInfo, setShowInfo] = useState(false);

  // Sync dark theme with localstorage
  useEffect(() => {
    localStorage.setItem("nn_maker_dark", JSON.stringify(isDark));
  }, [isDark]);

  // Sync favorites with localstorage
  useEffect(() => {
    localStorage.setItem("nn_maker_favs_v2", JSON.stringify(favorites));
  }, [favorites]);

  // Toast manager
  const triggerToast = (message: string) => {
    const id = Date.now();
    setToast({ message, id });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 2000);
  };

  // Add or remove item from favorites
  const handleFavoriteToggle = (styledText: string, styleName: string) => {
    const exists = favorites.find((fav) => fav.text === styledText);
    if (exists) {
      // Remove
      setFavorites((prev) => prev.filter((fav) => fav.text !== styledText));
      triggerToast("Removed from favorites");
    } else {
      // Add
      const timeString = new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
      });
      const newFav: FavoriteItem = {
        id: `fav-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        text: styledText,
        styleName,
        savedAt: timeString,
      };
      setFavorites((prev) => [newFav, ...prev]);
      triggerToast("Saved to favorites! ❤️");
    }
  };

  // Clear all favorites helper
  const handleClearAllFavorites = () => {
    if (window.confirm("Are you sure you want to clear all saved nicknames?")) {
      setFavorites([]);
      triggerToast("Cleared favorites directory");
    }
  };

  // Inject a popular preset tag directly into the active generator flow
  const handleInjectPreset = (presetText: string) => {
    setText(presetText);
    setActiveTab("generator");
  };

  return (
    <MobileFrame isDark={isDark} onThemeToggle={() => setIsDark(!isDark)} favoritesCount={favorites.length}>
      
      {/* Top App Header Ribbon */}
      <div className={`px-5 py-4 shrink-0 flex items-end justify-between border-b relative z-30 select-none ${
        isDark 
          ? "bg-[#0A0A0B] border-white/10 text-white" 
          : "bg-white border-slate-200 text-slate-900 shadow-sm"
      }`}>
        <div className="flex flex-col active:scale-[0.98] transition-transform">
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] mb-0.5 ${
            isDark ? "text-[#CBFB5E]" : "text-neutral-700"
          }`}>
            Pro Style Generator
          </span>
          <h1 className="text-xl font-black italic tracking-tighter leading-none">
            NICKNAME <span className={isDark ? "text-[#CBFB5E]" : "text-indigo-600"}>MAKER</span>
          </h1>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-1.5 mb-0.5">
          {/* Info Modal Trigger */}
          <button
            id="info-modal-trigger"
            onClick={() => setShowInfo(true)}
            className={`p-1.5 rounded-lg border transition-all ${
              isDark 
                ? "bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-[#CBFB5E]/50" 
                : "bg-slate-50 border-slate-200 text-slate-500 hover:text-indigo-600"
            }`}
            title="Help & Info"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Theme Switcher Toggle */}
          <button
            id="theme-toggler-btn"
            onClick={() => setIsDark(!isDark)}
            className={`p-1.5 rounded-lg border transition-all active:scale-95 cursor-pointer ${
              isDark 
                ? "bg-white/5 border-white/10 text-[#CBFB5E] hover:border-[#CBFB5E]" 
                : "bg-slate-50 border-slate-200 text-slate-500 hover:text-amber-500"
            }`}
            title={isDark ? "Light Mode" : "Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Floating Instant Toast Notification */}
      <div className="absolute top-20 left-0 right-0 z-50 px-4 pointer-events-none select-none flex justify-center">
        {toast && (
          <div className={`border rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-fadeIn ${
            isDark ? "bg-[#0A0A0B] border-[#CBFB5E] text-white" : "bg-neutral-900 border-neutral-950 text-white"
          }`}>
            <span className={isDark ? "text-[#CBFB5E]" : "text-emerald-400"}>●</span>
            <span>{toast.message}</span>
          </div>
        )}
      </div>

      {/* Primary Tab Body Canvas */}
      <div className="flex-1 overflow-hidden flex flex-col relative z-20">
        {activeTab === "generator" && (
          <NickGenerator
            text={text}
            setText={setText}
            isDark={isDark}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === "designer" && (
          <CustomDesigner
            isDark={isDark}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === "presets" && (
          <PresetTags
            isDark={isDark}
            onInject={handleInjectPreset}
            triggerToast={triggerToast}
          />
        )}

        {activeTab === "favorites" && (
          <FavoritesList
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
            onClearAll={handleClearAllFavorites}
            isDark={isDark}
            triggerToast={triggerToast}
          />
        )}
      </div>

      {/* Bottom Simulated iOS/Android Tab Navigation Bar */}
      <div className={`px-4 pt-3 pb-2.5 shrink-0 border-t flex items-center justify-around z-30 select-none ${
        isDark 
          ? "bg-[#0A0A0B] border-white/10" 
          : "bg-white border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]"
      }`}>
        {/* Tab 1: Creator */}
        <button
          id="btn-tab-generator"
          onClick={() => setActiveTab("generator")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            activeTab === "generator"
              ? isDark ? "text-[#CBFB5E] scale-105" : "text-black scale-105 font-black"
              : isDark
                ? "text-white/40 hover:text-white"
                : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Sparkles className="w-4.5 h-4.5 font-bold" />
          <span className="text-[9px] font-black uppercase tracking-widest">Generator</span>
        </button>

        {/* Tab 2: Custom Editor */}
        <button
          id="btn-tab-designer"
          onClick={() => setActiveTab("designer")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            activeTab === "designer"
              ? isDark ? "text-[#CBFB5E] scale-105" : "text-black scale-105 font-black"
              : isDark
                ? "text-white/40 hover:text-white"
                : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Palette className="w-4.5 h-4.5 font-bold" />
          <span className="text-[9px] font-black uppercase tracking-widest">Designer</span>
        </button>

        {/* Tab 3: Preset Catalog */}
        <button
          id="btn-tab-presets"
          onClick={() => setActiveTab("presets")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
            activeTab === "presets"
              ? isDark ? "text-[#CBFB5E] scale-105" : "text-black scale-105 font-black"
              : isDark
                ? "text-white/40 hover:text-white"
                : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Compass className="w-4.5 h-4.5 font-bold" />
          <span className="text-[9px] font-black uppercase tracking-widest">Presets</span>
        </button>

        {/* Tab 4: Favorited Directory */}
        <button
          id="btn-tab-favorites"
          onClick={() => setActiveTab("favorites")}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all relative ${
            activeTab === "favorites"
              ? isDark ? "text-[#CBFB5E] scale-105" : "text-black scale-105 font-black"
              : isDark
                ? "text-white/40 hover:text-white"
                : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <div className="relative">
            <Heart className={`w-4.5 h-4.5 font-bold ${favorites.length > 0 && activeTab !== "favorites" ? (isDark ? "stroke-[#CBFB5E] fill-[#CBFB5E]/20" : "stroke-rose-500 fill-rose-550/20") : ""}`} />
            {favorites.length > 0 && (
              <span className={`absolute -top-1.5 -right-2 text-[8px] px-1 py-0.5 font-mono font-black rounded-full leading-none min-w-3.5 text-center ${
                isDark ? "bg-[#CBFB5E] text-black" : "bg-black text-white"
              }`}>
                {favorites.length}
              </span>
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">Saved</span>
        </button>
      </div>

      {/* Information Overlay Dialog Modal */}
      {showInfo && (
        <div className="absolute inset-0 z-50 bg-black/85 flex items-center justify-center p-4 animate-fadeIn">
          <div className={`w-full max-w-xs rounded-2xl p-5 shadow-2xl relative border-2 ${
            isDark ? "bg-[#0A0A0B] border-white/10 text-white" : "bg-white border-neutral-900 text-slate-900"
          }`}>
            <button
              id="close-info-modal"
              onClick={() => setShowInfo(false)}
              className={`absolute top-4 right-4 p-1 rounded-lg border transition-all ${
                isDark ? "text-white/40 hover:text-white bg-white/5 border-white/10 hover:border-[#CBFB5E]/40" : "text-slate-500 hover:text-black border-slate-200"
              }`}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <Sparkles className={`w-4.5 h-4.5 ${isDark ? 'text-[#CBFB5E]' : 'text-indigo-650'}`} />
                <span className="text-xs uppercase tracking-[0.15em] font-black">Help & Info</span>
              </div>

              <div className="text-xs space-y-2.5 leading-relaxed text-slate-400 mt-1">
                <p className={`${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
                  Welcome to <strong className={isDark ? "text-[#CBFB5E]" : "text-indigo-600"}>NickName Maker</strong>! We represent characters using special mathematical Unicode planes.
                </p>
                <div className={`space-y-1.5 p-2.5 rounded-xl border ${
                  isDark ? "bg-white/5 border-white/10 text-white/70" : "bg-slate-50 border-slate-100 text-slate-600"
                }`}>
                  <div className="flex items-center gap-1.5">
                    <span className={isDark ? "text-[#CBFB5E] font-bold" : "text-emerald-500 font-bold"}>✓</span>
                    <span className="font-mono text-[10px] uppercase">Fully supports mobile copy</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={isDark ? "text-[#CBFB5E] font-bold" : "text-emerald-500 font-bold"}>✓</span>
                    <span className="font-mono text-[10px] uppercase">1000+ custom unicode styles</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={isDark ? "text-[#CBFB5E] font-bold" : "text-emerald-500 font-bold"}>✓</span>
                    <span className="font-mono text-[10px] uppercase">Syncs to browser memory</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 italic">
                  Note: Standard Unicode symbols display correctly across all modern social networks and devices. Feel free to copy and paste anywhere!
                </p>
              </div>

              <button
                id="ack-info-modal"
                onClick={() => setShowInfo(false)}
                className={`w-full mt-2 py-3 font-black text-xs uppercase tracking-widest rounded-xl shadow-lg transition-all ${
                  isDark 
                    ? "bg-[#CBFB5E] text-black hover:bg-white" 
                    : "bg-black text-white hover:bg-neutral-800"
                }`}
              >
                Okay, Let's Go
              </button>
            </div>
          </div>
        </div>
      )}

    </MobileFrame>
  );
}
