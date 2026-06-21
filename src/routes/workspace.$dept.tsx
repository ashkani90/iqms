import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { HeaderTools, HEADER_WIDGETS_STYLES } from "@/components/HeaderWidgets";
import { FONT_CLASS, LANG_DIR, useLang, useUser } from "@/lib/locale";

export const Route = createFileRoute("/workspace/$dept")({
  component: WorkspacePage,
});

type Lang = "fa" | "en" | "zh";

type MenuItem = { k: string; icon: string; label: Record<Lang, string>; route?: string };

const DEPT_META: Record<string, { name: Record<Lang, string>; icon: string; color: string }> = {
  design:     { name: { fa: "طراحی و مهندسی",   en: "Design & Engineering",   zh: "设计与工程" }, icon: "fa-drafting-compass", color: "#3b82f6" },
  production: { name: { fa: "تولید و مونتاژ",    en: "Production & Assembly",  zh: "生产与装配" }, icon: "fa-industry",          color: "#ef4444" },
  qc:         { name: { fa: "کنترل کیفیت",       en: "Quality Control",        zh: "质量控制" },   icon: "fa-clipboard-check",   color: "#10b981" },
  supply:     { name: { fa: "زنجیره تأمین",      en: "Supply Chain",           zh: "供应链" },     icon: "fa-truck",             color: "#f59e0b" },
  rnd:        { name: { fa: "تحقیق و توسعه",     en: "Research & Development", zh: "研发" },       icon: "fa-flask",             color: "#8b5cf6" },
  hse:        { name: { fa: "ایمنی و محیط زیست", en: "Safety & Environment",   zh: "安全与环境" }, icon: "fa-shield-heart",      color: "#14b8a6" },
  sales:      { name: { fa: "فروش و بازاریابی",  en: "Sales & Marketing",      zh: "销售与市场" }, icon: "fa-chart-line",        color: "#ec4899" },
  hr:         { name: { fa: "منابع انسانی",      en: "Human Resources",        zh: "人力资源" },   icon: "fa-users",             color: "#0ea5e9" },
  finance:    { name: { fa: "مالی و اداری",       en: "Finance & Admin",        zh: "财务与行政" }, icon: "fa-coins",             color: "#84cc16" },
  it:         { name: { fa: "فناوری اطلاعات",     en: "Information Technology", zh: "信息技术" },   icon: "fa-laptop-code",       color: "#6366f1" },
};

const COMMON_TOP: MenuItem[] = [
  { k: "dashboard", icon: "fa-gauge-high", label: { fa: "داشبورد", en: "Dashboard", zh: "仪表盘" } },
  { k: "reports",   icon: "fa-chart-pie",  label: { fa: "گزارش‌ها", en: "Reports",   zh: "报告" } },
  { k: "docs",      icon: "fa-folder-open",label: { fa: "مستندات",  en: "Documents", zh: "文档" } },
  { k: "tasks",     icon: "fa-list-check", label: { fa: "وظایف",    en: "Tasks",     zh: "任务" } },
];

const DEPT_SIDE: Record<string, MenuItem[]> = {
  it: [
    { k: "users",        icon: "fa-users-gear",     label: { fa: "مدیریت کاربران", en: "User Management", zh: "用户管理" }, route: "/users" },
    { k: "network",      icon: "fa-network-wired",  label: { fa: "شبکه و زیرساخت", en: "Network & Infra", zh: "网络与基础设施" } },
    { k: "software",     icon: "fa-code",           label: { fa: "نرم‌افزار و توسعه", en: "Software & Dev", zh: "软件开发" } },
    { k: "tickets",      icon: "fa-headset",        label: { fa: "تیکت‌های پشتیبانی", en: "Support Tickets", zh: "支持工单" } },
    { k: "security",     icon: "fa-user-shield",    label: { fa: "امنیت اطلاعات",     en: "Security",        zh: "信息安全" } },
    { k: "backup",       icon: "fa-database",       label: { fa: "پشتیبان‌گیری",       en: "Backups",         zh: "备份" } },
  ],
  default: [
    { k: "team",     icon: "fa-people-group",   label: { fa: "تیم", en: "Team", zh: "团队" } },
    { k: "calendar", icon: "fa-calendar-days",  label: { fa: "تقویم", en: "Calendar", zh: "日历" } },
    { k: "projects", icon: "fa-diagram-project",label: { fa: "پروژه‌ها", en: "Projects", zh: "项目" } },
    { k: "assets",   icon: "fa-boxes-stacked",  label: { fa: "دارایی‌ها", en: "Assets", zh: "资产" } },
    { k: "settings", icon: "fa-sliders",        label: { fa: "تنظیمات", en: "Settings", zh: "设置" } },
  ],
};

const STR = {
  fa: { workspace: "محیط کاری", welcome: "خوش آمدید", choose: "یک گزینه را از منو انتخاب کنید", coming: "این بخش به‌زودی فعال می‌شود." },
  en: { workspace: "Workspace", welcome: "Welcome", choose: "Select an option from the menu", coming: "This section will be available soon." },
  zh: { workspace: "工作区",   welcome: "欢迎",     choose: "请从菜单中选择一个选项", coming: "此部分即将推出。" },
};

function WorkspacePage() {
  const navigate = useNavigate();
  const { dept } = Route.useParams();
  const [lang] = useLang();
  const user = useUser();
  const [ready, setReady] = useState(false);
  const [activeTop, setActiveTop] = useState("dashboard");
  const [activeSide, setActiveSide] = useState<string>("");
  const [sideOpen, setSideOpen] = useState(true);

  useEffect(() => {
    setReady(true);
    if (!localStorage.getItem("iqms-user")) navigate({ to: "/" });
  }, [navigate]);

  const meta = DEPT_META[dept] || { name: { fa: dept, en: dept, zh: dept }, icon: "fa-building", color: "#1e6cf3" };
  const sideMenu = DEPT_SIDE[dept] || DEPT_SIDE.default;
  const dir = LANG_DIR[lang];
  const fontClass = useMemo(() => FONT_CLASS[lang], [lang]);
  const s = STR[lang];

  if (!ready || !user) return null;

  const handleSide = (m: MenuItem) => {
    if (m.route) navigate({ to: m.route });
    else setActiveSide(m.k);
  };

  const activeSideItem = sideMenu.find((m) => m.k === activeSide);

  return (
    <div className={`ws-page ${fontClass}`} dir={dir}>
      <style>{WS_STYLES + HEADER_WIDGETS_STYLES}</style>

      <header className="ws-header">
        <div className="ws-header-inner">
          <button className="ws-burger" onClick={() => setSideOpen((v) => !v)} aria-label="menu">
            <i className="fas fa-bars" />
          </button>
          <div className="ws-brand">
            <span className="ws-brand-icon" style={{ background: meta.color }}>
              <i className={`fas ${meta.icon}`} />
            </span>
            <div>
              <div className="ws-brand-t">{meta.name[lang]}</div>
              <div className="ws-brand-s">{s.workspace}</div>
            </div>
          </div>
          <HeaderTools />
        </div>

        {/* Horizontal top menu */}
        <nav className="ws-topnav">
          {COMMON_TOP.map((m) => (
            <button
              key={m.k}
              className={`ws-tab ${activeTop === m.k ? "active" : ""}`}
              onClick={() => setActiveTop(m.k)}
              style={activeTop === m.k ? { color: meta.color, borderColor: meta.color } : undefined}
            >
              <i className={`fas ${m.icon}`} /> <span>{m.label[lang]}</span>
            </button>
          ))}
        </nav>
      </header>

      <div className="ws-body">
        {/* Vertical sidebar */}
        <aside className={`ws-side ${sideOpen ? "open" : "closed"}`}>
          <div className="ws-side-head" style={{ background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)` }}>
            <i className={`fas ${meta.icon}`} />
            {sideOpen && <span>{meta.name[lang]}</span>}
          </div>
          <ul className="ws-side-list">
            {sideMenu.map((m) => (
              <li key={m.k}>
                <button
                  className={`ws-side-item ${activeSide === m.k ? "active" : ""}`}
                  onClick={() => handleSide(m)}
                  title={m.label[lang]}
                  style={activeSide === m.k ? { background: `${meta.color}15`, color: meta.color, borderInlineStartColor: meta.color } : undefined}
                >
                  <i className={`fas ${m.icon}`} />
                  {sideOpen && <span>{m.label[lang]}</span>}
                  {sideOpen && m.route && <i className="fas fa-arrow-up-right-from-square ws-ext" />}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="ws-main">
          <div className="ws-card">
            <div className="ws-card-head">
              <h2 style={{ color: meta.color }}>
                <i className={`fas ${activeSideItem?.icon || meta.icon}`} />{" "}
                {activeSideItem ? activeSideItem.label[lang] : `${s.welcome} — ${meta.name[lang]}`}
              </h2>
              <p>{activeSideItem ? s.coming : s.choose}</p>
            </div>

            <div className="ws-placeholder" style={{ borderColor: `${meta.color}30` }}>
              <div className="ws-placeholder-icon" style={{ background: `${meta.color}15`, color: meta.color }}>
                <i className={`fas ${activeSideItem?.icon || "fa-rocket"}`} />
              </div>
              <p>{s.coming}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const WS_STYLES = `
.ws-page{min-height:100vh;background:#f3f5f9;color:#0c1b33;display:flex;flex-direction:column}
.font-fa{font-family:'Vazirmatn',system-ui,sans-serif}
.font-en{font-family:'Inter',system-ui,sans-serif}
.font-zh{font-family:'Noto Sans SC',system-ui,sans-serif}

.ws-header{background:#fff;border-bottom:1px solid rgba(12,27,51,.08);position:sticky;top:0;z-index:50;box-shadow:0 1px 0 rgba(12,27,51,.04)}
.ws-header-inner{display:flex;align-items:center;gap:.85rem;padding:.7rem 1.25rem;flex-wrap:wrap}
.ws-burger{width:38px;height:38px;display:grid;place-items:center;border-radius:10px;background:#fff;border:1px solid rgba(12,27,51,.10);cursor:pointer;color:#0c1b33;font-size:14px}
.ws-burger:hover{border-color:#1e6cf3;color:#1e6cf3}
.ws-brand{display:flex;align-items:center;gap:.7rem;margin-inline-end:auto;min-width:0}
.ws-brand-icon{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;color:#fff;font-size:1.1rem;box-shadow:0 8px 18px rgba(12,27,51,.18);flex-shrink:0}
.ws-brand-t{font-weight:800;font-size:1rem;line-height:1.2}
.ws-brand-s{font-size:.72rem;color:#6c819b}

.ws-topnav{display:flex;gap:.25rem;padding:0 1.25rem;border-top:1px solid rgba(12,27,51,.06);overflow-x:auto}
.ws-tab{display:inline-flex;align-items:center;gap:.45rem;padding:.85rem 1rem;background:transparent;border:none;border-bottom:3px solid transparent;cursor:pointer;font-family:inherit;font-weight:600;font-size:.88rem;color:#6c819b;white-space:nowrap}
.ws-tab:hover{color:#0c1b33;background:rgba(12,27,51,.03)}
.ws-tab.active{color:#1e6cf3;border-color:#1e6cf3}

.ws-body{display:flex;flex:1;min-height:0}

.ws-side{background:#fff;border-inline-end:1px solid rgba(12,27,51,.08);width:260px;flex-shrink:0;transition:width .25s;display:flex;flex-direction:column}
.ws-side.closed{width:68px}
.ws-side-head{display:flex;align-items:center;gap:.6rem;padding:1rem .9rem;color:#fff;font-weight:800;font-size:.95rem;min-height:64px}
.ws-side-head i{font-size:1.15rem;flex-shrink:0}
.ws-side-list{list-style:none;padding:.5rem;margin:0;display:flex;flex-direction:column;gap:.2rem;overflow-y:auto;flex:1}
.ws-side-item{display:flex;align-items:center;gap:.7rem;width:100%;padding:.7rem .85rem;border-radius:10px;background:transparent;border:none;border-inline-start:3px solid transparent;cursor:pointer;font-family:inherit;font-weight:600;font-size:.88rem;color:#374a66;text-align:start;transition:.15s}
.ws-side-item:hover{background:rgba(30,108,243,.06);color:#1e6cf3}
.ws-side-item i{width:18px;text-align:center;font-size:.95rem;flex-shrink:0}
.ws-side-item .ws-ext{margin-inline-start:auto;font-size:.7rem;opacity:.6}
.ws-side.closed .ws-side-item{justify-content:center;padding:.7rem 0}

.ws-main{flex:1;padding:1.5rem;overflow-y:auto;min-width:0}
.ws-card{background:#fff;border-radius:16px;padding:1.75rem;box-shadow:0 4px 14px rgba(12,27,51,.06);min-height:400px}
.ws-card-head h2{margin:0 0 .35rem;font-size:1.35rem;font-weight:800;display:inline-flex;align-items:center;gap:.55rem}
.ws-card-head p{margin:0 0 1.5rem;color:#6c819b;font-size:.92rem}
.ws-placeholder{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 1rem;border:2px dashed rgba(12,27,51,.10);border-radius:14px;color:#6c819b}
.ws-placeholder-icon{width:80px;height:80px;border-radius:50%;display:grid;place-items:center;font-size:2rem;margin-bottom:1rem}

@media(max-width:768px){
  .ws-side{position:fixed;inset-inline-start:0;top:0;bottom:0;z-index:60;box-shadow:0 0 40px rgba(0,0,0,.2)}
  .ws-side.closed{width:0;overflow:hidden;border:none}
}
`;
