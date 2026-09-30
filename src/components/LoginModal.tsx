import React from 'react';
import { MediaPrimaLogo } from './MediaPrimaLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginWithGoogle: () => Promise<void>;
  isLoading?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginWithGoogle,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none animate-fadeIn">
      <div 
        className="w-full max-w-md bg-surface-container-lowest rounded-2xl shadow-2xl border border-[#C5C6CD]/30 overflow-hidden flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Decorative Banner */}
        <div className="bg-primary-container p-6 text-white relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-secondary/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-amber-500/15 blur-2xl pointer-events-none"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          <MediaPrimaLogo theme="dark" size="lg" showSubtitle={true} className="mb-3" />

          <h2 className="font-display font-extrabold text-xl text-white tracking-tight mt-1">
            Media Prima Omnia Studio
          </h2>
          <p className="text-xs text-on-primary-container max-w-xs mt-1 leading-relaxed">
            Platform Arkitek Pembentangan Penajaan Linear TV (TV3 &amp; TV9) dan Digital Terintegrasi.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Akses Awan Cloud Firestore
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Log masuk untuk menyegerakkan semua cadangan dek penajaan anda secara masa nyata dan akses daripada mana-mana peranti.
            </p>
          </div>

          {/* Primary Google Login Button */}
          <button
            onClick={async () => {
              await onLoginWithGoogle();
              onClose();
            }}
            disabled={isLoading}
            className="w-full h-11 px-4 bg-white hover:bg-surface-container-low text-on-surface text-xs font-bold rounded-xl border border-[#C5C6CD]/40 shadow-sm flex items-center justify-center gap-3 transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Log Masuk dengan Google Account</span>
          </button>

          {/* Value Propositions List */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-[#C5C6CD]/25 flex flex-col gap-2 mt-1">
            <div className="flex items-center gap-2.5 text-xs text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-emerald-600">cloud_done</span>
              <span>Autosimpan selamat terus ke Firebase Cloud Firestore</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-secondary">slideshow</span>
              <span>Mod Pembentangan 16:9 beresolusi tinggi dengan nota jurustrategi</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-amber-600">auto_awesome</span>
              <span>Penjanaan dek 7-slaid dalam masa &lt;2 saat dengan Gemini AI</span>
            </div>
          </div>

          {/* Guest Continue Link */}
          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="text-xs text-on-surface-variant hover:text-on-surface font-semibold underline underline-offset-4"
            >
              Teruskan sebagai Tetamu (Mod Luar Talian)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
