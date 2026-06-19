/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Gamepad2, Heart, Award, Copy, ArrowUpRight, Check, Compass, Smile } from "lucide-react";

interface PresetTagsProps {
  isDark: boolean;
  onInject: (presetText: string) => void;
  triggerToast: (msg: string) => void;
}

interface PresetItem {
  tag: string;
  category: "all" | "gaming" | "aesthetic" | "clan" | "status";
  label: string;
}

export default function PresetTags({
  isDark,
  onInject,
  triggerToast,
}: PresetTagsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const presets: PresetItem[] = [
    // Gaming Group
    { tag: "Sniper_God", category: "gaming", label: "Sniper God" },
    { tag: "Viper_Assassin", category: "gaming", label: "Viper Assassin" },
    { tag: "Headshot_King", category: "gaming", label: "Headshot Master" },
    { tag: "Shadow_Hunter", category: "gaming", label: "Shadow Hunter" },
    { tag: "Phoenix_Reborn", category: "gaming", label: "Phoenix" },
    { tag: "Solo_Leveling", category: "gaming", label: "Solo Ranger" },
    { tag: "Ghost_Rider", category: "gaming", label: "Ghost Rider" },
    { tag: "Cyber_Samurai", category: "gaming", label: "Cyber Warrior" },
    { tag: "Toxic_Bullet", category: "gaming", label: "Toxic Bullet" },
    
    // Clan structures Group
    { tag: "꧁༺ 𝓚𝓘𝓛𝓛𝓔𝓡 ༻꧂", category: "clan", label: "Killer Wing Tag" },
    { tag: "亗『TOXIC』亗", category: "clan", label: "Toxic Crown Tag" },
    { tag: "〆GHOST〆", category: "clan", label: "Ghost Slasher" },
    { tag: "乂 BOSS 乂", category: "clan", label: "Boss Emblem" },
    { tag: "『OP』LEGEND", category: "clan", label: "OP Legend Badge" },
    { tag: "IND_WARRIOR ⚔️", category: "clan", label: "India Clan Head" },
    { tag: "TEAM_ALPHA 亗", category: "clan", label: "Alpha Clan Crown" },
    { tag: "PIRATES ☠️", category: "clan", label: "Pirate Guild" },
    { tag: "USA_RANGER ★", category: "clan", label: "US Star Ranger" },

    // Aesthetic dividers / Social
    { tag: "•´¯`•. ѕнα∂σω .•´¯`•", category: "aesthetic", label: "Retro Waves" },
    { tag: "｡☆✼★ ѕнα∂σω ★✼☆｡", category: "aesthetic", label: "Galactic Stars" },
    { tag: "𓍼 sʜᴀᴅᴏᴡ 𓍯", category: "aesthetic", label: "Aesthetic Flourish" },
    { tag: "☾ ѕнα∂σω ☽", category: "aesthetic", label: "Lunar Space" },
    { tag: "☁️ s ʜ ᴀ ᴅ ᴏ ᴡ ☁️", category: "aesthetic", label: "Soft Cloudy" },
    { tag: "─── ❖ ── ❖ ───", category: "aesthetic", label: "Bio Divider lines" },
    { tag: "✧༺♥༻✧", category: "aesthetic", label: "Love Heart Frame" },
    { tag: "🌸 𝓠𝓤𝓔𝓔𝓝 🌸", category: "aesthetic", label: "Cherry Blossom Queen" },
    { tag: "🧸 s h a d o w 🧸", category: "aesthetic", label: "Teddy Pastel Theme" },

    // Elite VIP Status
    { tag: "♛ KING OF BATTLE ♛", category: "status", label: "Royal Warlord Label" },
    { tag: "⚡ FAST & FURIOUS ⚡", category: "status", label: "Vortex Lightning Bio" },
    { tag: "☠️ NO_MERCY ☠️", category: "status", label: "Merciless Outlaw Title" },
    { tag: "☕ OVERWORKED ☕", category: "status", label: "Coffee Dev Status" },
    { tag: "🔥 SMOKING GUN 🔥", category: "status", label: "Hot Pistol" },
    { tag: "👾 RETRO PLAYER 👾", category: "status", label: "Arcade Nerd Indicator" },
    { tag: "⚠️ DANGER_ZONE ⚠️", category: "status", label: "Hazard Bio Marker" },
    { tag: "🦾 CYBORG_CORE 🦾", category: "status", label: "Metal Machine Core" },
    { tag: "✨ SHINING STAR ✨", category: "status", label: "High Gloss Bio" }
  ];

  const filteredPresets = presets.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const handleCopyTag = (str: string) => {
    try {
      navigator.clipboard.writeText(str);
      setCopiedTag(str);
      triggerToast("Preset tag copied directly!");
      setTimeout(() => setCopiedTag(null), 2050);
    } catch {
      triggerToast("Failed to copy preset.");
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden px-4 pt-4 pb-4">
      {/* Description header */}
      <div className="flex items-center gap-3 mb-3.5 shrink-0">
        <div className={`p-2 rounded-lg border-2 ${
          isDark ? "bg-white/5 border-white/10 text-[#CBFB5E]" : "bg-slate-100 border-slate-200 text-indigo-650"
        }`}>
          <Compass className="w-4 h-4 animate-spin-slow" />
        </div>
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CBFB5E]">
            Gaming & Bio Presets
          </h2>
          <p className={`text-[10px] mt-0.5 ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
            Pre-assembled layouts, headers, and clan elements. Tap to copy, or load as generator template.
          </p>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 shrink-0 no-scrollbar select-none">
        {[
          { id: "all", name: "All Presets", icon: Compass },
          { id: "gaming", name: "Pro Gaming", icon: Gamepad2 },
          { id: "clan", name: "Clan Wings", icon: Award },
          { id: "aesthetic", name: "Aesthetics", icon: Heart },
          { id: "status", name: "VIP Status", icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              id={`preset-tab-${tab.id}`}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider gap-1.5 transition-all flex items-center shrink-0 border-2 ${
                isSelected
                  ? isDark 
                    ? "bg-[#CBFB5E] text-black border-[#CBFB5E]" 
                    : "bg-black text-white border-black"
                  : isDark
                    ? "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Cards Scroll Container */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5 mt-2 scroll-smooth no-scrollbar">
        {filteredPresets.map((item, idx) => {
          const isCopied = copiedTag === item.tag;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl flex items-center justify-between gap-3 border transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 hover:border-[#CBFB5E]/50 hover:shadow-[0_0_12px_rgba(203,251,94,0.06)]"
                  : "bg-white border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex-1 min-w-0 pr-1 flex flex-col gap-1">
                <span className="text-[8.5px] font-mono uppercase tracking-[0.15em] text-white/40">
                  {item.label}
                </span>
                <span className={`text-sm font-black truncate leading-relaxed break-all select-all ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {item.tag}
                </span>
              </div>

              {/* Action columns */}
              <div className="flex-1 select-none flex items-center justify-end gap-1.5 max-w-[130px] shrink-0">
                {/* load to compiler tool */}
                {item.category !== "aesthetic" && (
                  <button
                    id={`inject-preset-${idx}`}
                    onClick={() => {
                      onInject(item.tag);
                      triggerToast(`Loaded: ${item.tag}`);
                    }}
                    className={`py-1.5 px-3 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] flex items-center gap-1 transition-all ${
                      isDark
                        ? "bg-white/10 hover:bg-[#CBFB5E] text-white hover:text-black"
                        : "bg-black text-white hover:bg-neutral-800"
                    }`}
                    title="Load into generator"
                  >
                    Load <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}

                {/* Instant copy */}
                <button
                  id={`copy-preset-${idx}`}
                  onClick={() => handleCopyTag(item.tag)}
                  className={`p-2 rounded-lg border transition-all ${
                    isCopied
                      ? "bg-[#CBFB5E] text-black border-[#CBFB5E] font-black"
                      : isDark
                        ? "bg-white/5 border-white/10 text-white/40 hover:text-white"
                        : "bg-slate-100 border-slate-200 text-slate-600"
                  }`}
                  title="Copy tag instantly"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
