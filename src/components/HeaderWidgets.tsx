import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  LANGS,
  formatDate,
  formatTime,
  setLangGlobal,
  setUserGlobal,
  useLang,
  useUser,
} from "@/lib/locale";

const MENU_T = {
  fa: {
    editProfile: "ویرایش پروفایل",
    changePassword: "تغییر رمز عبور",
    logout: "خروج از سیستم",
    login: "ورود",
  },
  en: {
    editProfile: "Edit profile",
    changePassword: "Change password",
    logout: "Sign out",
    login: "Login",
  },
  zh: {
    editProfile: "编辑资料",
    changePassword: "修改密码",
    logout: "退出系统",
    login: "登录",
  },
};

const ROLE_LABEL: Record<string, Record<string, string>> = {
  admin: { fa: "مدیر سیستم", en: "Admin", zh: "管理员" },
  manager: { fa: "مدیر", en: "Manager", zh: "经理" },
  user: { fa: "کاربر", en: "User", zh: "用户" },
};

export function HeaderDate() {
  const [lang] = useLang();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  if (!now) return <div className="hdr-date hdr-date-skel" aria-hidden />;

  return (
    <div className="hdr-date" title={formatDate(lang, now)}>
      <i className="fas fa-calendar-day" />
      <div className="hdr-date-text">
        <span className="d">{formatDate(lang, now)}</span>
        <span className="t">{formatTime(lang, now)}</span>
      </div>
    </div>
  );
}

export function LangSwitch({ compact = false }: { compact?: boolean }) {
  const [lang] = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang);

  return (
    <div className="lang-wrap">
      <button
        className="lang-btn"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label="Language"
      >
        <i className="fas fa-globe" />
        {!compact && <span>{current?.label}</span>}
        <span className="flag-inline">{current?.flag}</span>
        <i className="fas fa-chevron-down chev" />
      </button>
      {open && (
        <div className="lang-menu">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={`lang-item ${l.code === lang ? "active" : ""}`}
              onMouseDown={(e) => {
                e.preventDefault();
                setLangGlobal(l.code);
                setOpen(false);
              }}
            >
              <span className="flag">{l.flag}</span>
              <span>{l.label}</span>
              {l.code === lang && <i className="fas fa-check ok" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function UserMenu({ onLoginClick }: { onLoginClick?: () => void }) {
  const navigate = useNavigate();
  const [lang] = useLang();
  const user = useUser();
  const [open, setOpen] = useState(false);
  const m = MENU_T[lang];

  if (!user) {
    return (
      <button className="enter-btn" onClick={() => onLoginClick?.()}>
        <i className="fas fa-right-to-bracket" />
        <span>{m.login}</span>
      </button>
    );
  }

  const name = user.full_name || user.username;
  const role = ROLE_LABEL[user.role]?.[lang] || user.role;
  const initials = name.trim().slice(0, 1).toUpperCase();
  const avatar = user.profile_image;

  const logout = () => {
    setOpen(false);
    setUserGlobal(null);
    navigate({ to: "/" });
  };

  return (
    <div className="um-wrap">
      <button
        className="um-trigger"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 180)}
      >
        <div className="um-info">
          <span className="um-name">{name}</span>
          <span className="um-role">{role}</span>
        </div>
        {avatar ? (
          <img className="um-avatar" src={avatar} alt={name} />
        ) : (
          <span className="um-avatar um-avatar-fallback">{initials}</span>
        )}
        <i className="fas fa-chevron-down um-chev" />
      </button>
      {open && (
        <div className="um-menu">
          <div className="um-head">
            {avatar ? (
              <img className="um-avatar lg" src={avatar} alt={name} />
            ) : (
              <span className="um-avatar lg um-avatar-fallback">{initials}</span>
            )}
            <div>
              <div className="um-name">{name}</div>
              <div className="um-email">{user.email || `${user.username}@iqms.local`}</div>
            </div>
          </div>
          <div className="um-sep" />
          <button className="um-item" onMouseDown={(e) => e.preventDefault()}>
            <i className="fas fa-user-pen" /> {m.editProfile}
          </button>
          <button className="um-item" onMouseDown={(e) => e.preventDefault()}>
            <i className="fas fa-key" /> {m.changePassword}
          </button>
          <div className="um-sep" />
          <button className="um-item um-danger" onMouseDown={(e) => { e.preventDefault(); logout(); }}>
            <i className="fas fa-right-from-bracket" /> {m.logout}
          </button>
        </div>
      )}
    </div>
  );
}

export const HEADER_WIDGETS_STYLES = `
.hdr-date { display:inline-flex; align-items:center; gap:8px; padding:7px 12px;
  background:#fff; border:1px solid rgba(12,27,51,.10); border-radius:10px;
  font-size:12px; color:#0c1b33; font-weight:600; line-height:1.1; }
.hdr-date > i { color:#1e6cf3; font-size:14px; }
.hdr-date-text { display:flex; flex-direction:column; gap:1px; }
.hdr-date-text .t { font-size:10px; color:#6c819b; font-weight:500; }
.hdr-date-skel { width:96px; height:34px; background:#eef2f7; border-radius:10px; border:1px solid rgba(12,27,51,.06); }

.lang-wrap { position:relative; }
.lang-btn { display:inline-flex; align-items:center; gap:8px; padding:8px 12px;
  border-radius:10px; background:#fff; border:1px solid rgba(12,27,51,.10);
  cursor:pointer; font-weight:600; font-size:13px; color:#0c1b33; font-family:inherit; }
.lang-btn:hover { border-color:#1e6cf3; color:#1e6cf3; }
.lang-btn .flag-inline { font-size:14px; }
.lang-btn .chev { font-size:10px; opacity:.6; }
.lang-menu { position:absolute; top:calc(100% + 8px); inset-inline-end:0;
  background:#fff; border-radius:12px; box-shadow:0 20px 50px rgba(12,27,51,.18);
  border:1px solid rgba(12,27,51,.06); padding:6px; min-width:180px; z-index:200; }
.lang-item { display:flex; align-items:center; gap:10px; width:100%; padding:9px 12px;
  background:transparent; border:none; cursor:pointer; border-radius:8px;
  font-size:13px; color:#0c1b33; font-family:inherit; text-align:start; }
.lang-item:hover { background:rgba(30,108,243,.08); }
.lang-item.active { background:rgba(30,108,243,.10); color:#1e6cf3; font-weight:700; }
.lang-item .flag { font-size:16px; }
.lang-item .ok { margin-inline-start:auto; color:#1e6cf3; }

.enter-btn { display:inline-flex; align-items:center; gap:8px; padding:9px 16px;
  border-radius:10px; background:linear-gradient(135deg,#0a3eaa,#1e6cf3); color:#fff;
  border:none; cursor:pointer; font-weight:600; font-size:13px; font-family:inherit;
  box-shadow:0 8px 18px rgba(30,108,243,.35); }
.enter-btn:hover { transform:translateY(-1px); }

.um-wrap { position:relative; }
.um-trigger { display:inline-flex; align-items:center; gap:10px; padding:6px 10px 6px 6px;
  border-radius:12px; background:#fff; border:1px solid rgba(12,27,51,.10);
  cursor:pointer; font-family:inherit; }
[dir="rtl"] .um-trigger { padding:6px 6px 6px 10px; }
.um-trigger:hover { border-color:#1e6cf3; }
.um-info { display:flex; flex-direction:column; align-items:flex-end; line-height:1.15; }
[dir="ltr"] .um-info { align-items:flex-start; }
.um-name { font-size:13px; font-weight:700; color:#0c1b33; max-width:140px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.um-role { font-size:11px; color:#6c819b; }
.um-avatar { width:38px; height:38px; border-radius:50%; object-fit:cover;
  background:linear-gradient(135deg,#0a3eaa,#1e6cf3); display:inline-grid; place-items:center;
  color:#fff; font-weight:800; font-size:15px; flex-shrink:0; border:2px solid #fff;
  box-shadow:0 4px 10px rgba(12,27,51,.15); }
.um-avatar.lg { width:46px; height:46px; font-size:18px; }
.um-chev { font-size:11px; color:#6c819b; }
.um-menu { position:absolute; top:calc(100% + 10px); inset-inline-end:0; min-width:240px;
  background:#fff; border-radius:14px; box-shadow:0 24px 60px rgba(12,27,51,.22);
  border:1px solid rgba(12,27,51,.06); padding:10px; z-index:200; }
.um-head { display:flex; align-items:center; gap:12px; padding:6px 6px 10px; }
.um-head .um-name { font-size:14px; }
.um-email { font-size:11px; color:#6c819b; max-width:180px;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.um-sep { height:1px; background:rgba(12,27,51,.08); margin:4px 0; }
.um-item { display:flex; align-items:center; gap:10px; width:100%; padding:10px 12px;
  background:transparent; border:none; cursor:pointer; border-radius:9px;
  font-size:13px; color:#0c1b33; font-family:inherit; text-align:start; font-weight:500; }
.um-item:hover { background:rgba(30,108,243,.08); color:#1e6cf3; }
.um-item.um-danger { color:#dc2626; }
.um-item.um-danger:hover { background:#fef2f2; color:#dc2626; }
.um-item i { width:18px; text-align:center; }

@media (max-width: 768px) {
  .um-info { display:none; }
  .hdr-date-text .d { font-size:11px; }
  .hdr-date-text .t { display:none; }
  .lang-btn span:not(.flag-inline) { display:none; }
  .enter-btn span { display:none; }
  .enter-btn { padding:9px 11px; }
}
`;
