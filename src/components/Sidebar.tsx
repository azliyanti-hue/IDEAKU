import React from 'react';
import { WorkspaceView } from '../types/deck';
import { MediaPrimaLogo } from './MediaPrimaLogo';
import { User } from 'firebase/auth';

interface SidebarProps {
  currentView: WorkspaceView;
  onSelectView: (view: WorkspaceView) => void;
  sponsorshipTarget?: string;
  inventorySecuredPercent?: number;
  currentUser: User | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  sponsorshipTarget = 'RM 1.25M',
  inventorySecuredPercent = 75,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  const navItems: { id: WorkspaceView; label: string; icon: string }[] = [
    { id: 'slide-studio', label: 'Slide Studio', icon: 'slideshow' },
    { id: 'input-generator', label: 'Input Generator', icon: 'smart_toy' },
    { id: 'deck-library', label: 'Deck Library', icon: 'space_dashboard' },
    { id: 'rate-cards', label: 'Rate Cards & Inventory', icon: 'receipt_long' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low border-r border-[#C5C6CD]/25 shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between select-none">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between bg-surface-container-low border-b border-[#C5C6CD]/20">
          <MediaPrimaLogo size="sm" showSubtitle={true} />
          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-tight">
            v3.1
          </span>
        </div>

        {/* Pitch Workspaces Navigation */}
        <div className="px-4 py-3">
          <div className="text-[11px] uppercase tracking-wider text-on-surface-variant mb-2 font-bold px-2">
            Pitch Workspaces
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-primary-container text-white shadow-sm ring-1 ring-white/10'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-[#FFDCC4]' : 'text-on-surface-variant'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Flight Analytics */}
        <div className="px-4 py-2">
          <div className="text-[11px] uppercase tracking-wider text-on-surface-variant mb-2 font-bold px-2">
            Flight Analytics
          </div>
          <div className="flex flex-col gap-1">
            <div className="px-3 py-2.5 rounded-lg bg-surface-container text-on-surface flex flex-col gap-1.5 border border-[#C5C6CD]/20">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-on-surface-variant font-medium">Sponsorship Target</span>
                <span className="font-bold text-secondary">{sponsorshipTarget}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${inventorySecuredPercent}%` }}
                ></div>
              </div>
              <span className="text-[11px] text-on-surface-variant text-right font-medium">
                {inventorySecuredPercent}% Inventory Secured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area: Account Status & AI Node */}
      <div className="p-3 bg-surface-container-low border-t border-[#C5C6CD]/20 flex flex-col gap-2">
        {/* User Account Tile */}
        {currentUser ? (
          <div className="p-2 rounded-xl bg-surface-container-lowest border border-[#C5C6CD]/25 shadow-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-8 h-8 rounded-full border border-secondary shadow-xs object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-on-surface truncate leading-tight">
                  {currentUser.displayName || 'Media Strategist'}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold truncate leading-tight">
                  Cloud Synced &bull; TV3/TV9
                </span>
              </div>
            </div>

            {/* Logout Action */}
            <button
              onClick={onLogout}
              className="w-7 h-7 rounded-lg text-on-surface-variant hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors shrink-0"
              title="Log Keluar (Sign Out)"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenLogin}
            className="w-full h-9 px-3 bg-primary-container hover:bg-black text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">login</span>
            <span>Log Masuk / Sign In</span>
          </button>
        )}

        {/* AI Node Status */}
        <div className="p-2 rounded-lg bg-surface-container flex items-center justify-between border border-[#C5C6CD]/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-on-surface leading-tight">AI Engine 4.0</span>
              <span className="text-[10px] text-on-surface-variant leading-tight">Omnia Linear TV Node</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#B7102A]">bolt</span>
        </div>
      </div>
    </aside>
  );
};
