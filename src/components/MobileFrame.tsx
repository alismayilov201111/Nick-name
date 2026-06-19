/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { Moon, Sun, Smartphone, Wifi, Battery, Signal } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MobileFrameProps {
  children: ReactNode;
  isDark: boolean;
  onThemeToggle: () => void;
  favoritesCount: number;
}

export default function MobileFrame({
  children,
  isDark,
  onThemeToggle,
  favoritesCount,
}: MobileFrameProps) {
  // Get current active simulated time
  const [currentTime, setCurrentTime] = React.useState("09:41");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // 12-hour format
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0B] flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 font-sans relative overflow-hidden selection:bg-[#CBFB5E] selection:text-black">
      {/* Decorative bold accent background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#CBFB5E]/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#CBFB5E]/2 blur-[160px] pointer-events-none" />

      <div className="w-full max-w-lg flex flex-col items-center z-10">
        {/* Device Frame */}
        <div id="nickname-maker-mobile-frame" className="relative w-full max-w-[390px] h-[780px] rounded-[52px] border-[10px] border-neutral-800 shadow-[0_24px_64px_-12px_rgba(0,0,0,0.9)] bg-[#0A0A0B] flex flex-col overflow-hidden transition-all duration-300 ring-2 ring-neutral-700/40">
          
          {/* Physical Speaker and Camera Notch Notch Punch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30px] w-[140px] bg-neutral-850 rounded-b-[18px] z-50 flex items-center justify-center gap-1.5 px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700/40" />
            <div className="w-12 h-1 bg-neutral-900 rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-900 border border-neutral-700/40" />
          </div>

          {/* Virtual Mobile Screen Header/Status Bar */}
          <div className={`pt-8 px-6 pb-2 select-none flex items-center justify-between text-xs font-semibold z-40 relative ${isDark ? 'bg-[#0A0A0B] text-neutral-400' : 'bg-white text-neutral-600 border-b border-neutral-100'}`}>
            {/* Time */}
            <span className="font-mono tracking-tighter text-[11px] font-black">{currentTime}</span>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5 opacity-80" />
              <Wifi className="w-3.5 h-3.5 opacity-80" />
              <div className="flex items-center gap-0.5">
                <span className="text-[9px] font-mono font-bold">100%</span>
                <Battery className="w-4 h-4 opacity-95 fill-current" />
              </div>
            </div>
          </div>

          {/* Virtual Mobile Body Canvas */}
          <div className={`flex-1 flex flex-col overflow-hidden relative ${isDark ? 'bg-[#0A0A0B] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
            {children}
          </div>

          {/* Virtual iOS Home Indicator line */}
          <div className={`h-5 w-full flex items-center justify-center select-none z-40 relative pb-1 ${isDark ? 'bg-[#0A0A0B]' : 'bg-white'}`}>
            <div className={`w-36 h-1 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-neutral-300'}`} />
          </div>

        </div>

        {/* Outer app description underneath simulated viewport */}
        <div className="mt-6 text-center max-w-sm hidden sm:block">
          <p className="text-xs text-neutral-500 font-medium">
            Playing on <span className="text-neutral-400 font-semibold font-mono">NickName Maker</span> 📱
          </p>
          <p className="text-[10px] text-neutral-600 mt-1 leading-relaxed">
            Designed with premium Unicode maps and copy workflows. Add to favorites & use across any game/social profile.
          </p>
        </div>
      </div>
    </div>
  );
}
