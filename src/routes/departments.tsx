import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  HeaderTools,
  HEADER_WIDGETS_STYLES,
} from "@/components/HeaderWidgets";
import { FONT_CLASS, LANG_DIR, useLang, useUser } from "@/lib/locale";

export const Route = createFileRoute("/departments")({
  component: DepartmentsPage,
});

const T = {
  fa: {
    title: "انتخاب دپارتمان",
    sub: "لطفاً دپارتمان مورد نظر خود را از مجموعه صنعتی خودروسازی انتخاب کنید",
    depts: [
      { k: "design",     t: "طراحی و مهندسی",  d: "طراحی خودرو، CAD، شبیه‌سازی و توسعه محصول", i: "fa-drafting-compass", c: "#3b82f6" },
      { k: "production", t: "تولید و مونتاژ",   d: "خط تولید، مونتاژ نهایی و کنترل ظرفیت",      i: "fa-industry",          c: "#ef4444" },
      { k: "qc",         t: "کنترل کیفیت",      d: "بازرسی، تست عملکرد و تضمین کیفیت محصول",   i: "fa-clipboard-check",   c: "#10b981" },
      { k: "supply",     t: "زنجیره تأمین",     d: "مدیریت تأمین‌کنندگان، خرید و لجستیک قطعات", i: "fa-truck",             c: "#f59e0b" },
      { k: "rnd",        t: "تحقیق و توسعه",    d: "نوآوری، خودروهای الکتریکی و فناوری‌های نوین",i: "fa-flask",             c: "#8b5cf6" },
      { k: "hse",        t: "ایمنی و محیط زیست",d: "HSE، ISO 14001 و ISO 45001",                i: "fa-shield-heart",      c: "#14b8a6" },
      { k: "sales",      t: "فروش و بازاریابی", d: "نمایندگی‌ها، تبلیغات و خدمات پس از فروش",    i: "fa-chart-line",        c: "#ec4899" },
      { k: "hr",         t: "منابع انسانی",     d: "استخدام، آموزش و توسعه نیروی انسانی",        i: "fa-users",             c: "#0ea5e9" },
      { k: "finance",    t: "مالی و اداری",     d: "حسابداری، بودجه و امور اداری",                i: "fa-coins",             c: "#84cc16" },
      { k: "it",         t: "فناوری اطلاعات",   d: "زیرساخت، نرم‌افزار، شبکه و مدیریت کاربران",    i: "fa-laptop-code",       c: "#6366f1" },
    ],
  },
  en: {
    title: "Select a Department",
    sub: "Please select a department of the automotive industrial group",
    depts: [
      { k: "design",     t: "Design & Engineering",   d: "Vehicle design, CAD, simulation and product development", i: "fa-drafting-compass", c: "#3b82f6" },
      { k: "production", t: "Production & Assembly",  d: "Production line, final assembly and capacity control",    i: "fa-industry",          c: "#ef4444" },
      { k: "qc",         t: "Quality Control",        d: "Inspection, performance testing and quality assurance",   i: "fa-clipboard-check",   c: "#10b981" },
      { k: "supply",     t: "Supply Chain",           d: "Supplier management, procurement and parts logistics",    i: "fa-truck",             c: "#f59e0b" },
      { k: "rnd",        t: "Research & Development", d: "Innovation, EVs and emerging technologies",                i: "fa-flask",             c: "#8b5cf6" },
      { k: "hse",        t: "Safety & Environment",   d: "HSE, ISO 14001 and ISO 45001",                             i: "fa-shield-heart",      c: "#14b8a6" },
      { k: "sales",      t: "Sales & Marketing",      d: "Dealerships, advertising and after-sales service",         i: "fa-chart-line",        c: "#ec4899" },
      { k: "hr",         t: "Human Resources",        d: "Recruitment, training and workforce development",          i: "fa-users",             c: "#0ea5e9" },
      { k: "finance",    t: "Finance & Admin",        d: "Accounting, budgeting and administration",                 i: "fa-coins",             c: "#84cc16" },
      { k: "it",         t: "Information Technology", d: "Infrastructure, software, network and user management",    i: "fa-laptop-code",       c: "#6366f1" },
    ],
  },
  zh: {
    title: "选择部门",
    sub: "请选择汽车工业集团的相应部门",
    depts: [
      { k: "design",     t: "设计与工程", d: "汽车设计、CAD、仿真与产品开发", i: "fa-drafting-compass", c: "#3b82f6" },
      { k: "production", t: "生产与装配", d: "生产线、总装和产能控制",        i: "fa-industry",          c: "#ef4444" },
      { k: "qc",         t: "质量控制",   d: "检验、性能测试与质量保证",      i: "fa-clipboard-check",   c: "#10b981" },
      { k: "supply",     t: "供应链",     d: "供应商管理、采购与零件物流",    i: "fa-truck",             c: "#f59e0b" },
      { k: "rnd",        t: "研发",       d: "创新、电动汽车与新兴技术",      i: "fa-flask",             c: "#8b5cf6" },
      { k: "hse",        t: "安全与环境", d: "HSE、ISO 14001 与 ISO 45001",   i: "fa-shield-heart",      c: "#14b8a6" },
      { k: "sales",      t: "销售与市场", d: "经销商、广告与售后服务",        i: "fa-chart-line",        c: "#ec4899" },
      { k: "hr",         t: "人力资源",   d: "招聘、培训与人才发展",          i: "fa-users",             c: "#0ea5e9" },
      { k: "finance",    t: "财务与行政", d: "会计、预算与行政管理",          i: "fa-coins",             c: "#84cc16" },
      { k: "it",         t: "信息技术",   d: "基础设施、软件、网络与用户管理", i: "fa-laptop-code",       c: "#6366f1" },
    ],
  },
};

function DepartmentsPage() {
  const navigate = useNavigate();
  const [lang] = useLang();
  const user = useUser();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (!localStorage.getItem("iqms-user")) navigate({ to: "/" });
  }, [navigate]);

  const t = T[lang];
  const dir = LANG_DIR[lang];
  const fontClass = useMemo(() => FONT_CLASS[lang], [lang]);

  if (!ready || !user) return null;

  return (
    <div className={`dept-page ${fontClass}`} dir={dir}>
      <style>{DEPT_STYLES + HEADER_WIDGETS_STYLES}</style>
      <header className="dept-header">
        <div className="dept-container dept-header-inner">
          <div className="dept-brand">
            <i className="fas fa-car-side" />
            <div>
              <div className="dept-brand-t">IQMS · Auto Group</div>
              <div className="dept-brand-s">{t.title}</div>
            </div>
          </div>
          <HeaderTools />
        </div>
      </header>

      <main className="dept-main">
        <div className="dept-container">
          <div className="dept-hero">
            <span className="dept-tag"><i className="fas fa-industry" /> Automotive Industrial Group</span>
            <h1>{t.title}</h1>
            <p>{t.sub}</p>
          </div>

          <div className="dept-grid">
            {t.depts.map((d) => (
              <button
                key={d.k}
                className="dept-card"
                style={{ "--c": d.c } as React.CSSProperties}
                onClick={() => navigate({ to: "/workspace/$dept", params: { dept: d.k } })}
              >
                <span className="dept-icon"><i className={`fas ${d.i}`} /></span>
                <h3>{d.t}</h3>
                <p>{d.d}</p>
                <span className="dept-arrow"><i className={`fas ${dir === "rtl" ? "fa-arrow-left" : "fa-arrow-right"}`} /></span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const DEPT_STYLES = `
.dept-page{min-height:100vh;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);color:#e2e8f0}
.font-fa{font-family:'Vazirmatn',system-ui,sans-serif}
.font-en{font-family:'Inter',system-ui,sans-serif}
.font-zh{font-family:'Noto Sans SC',system-ui,sans-serif}
.dept-container{max-width:1240px;margin:0 auto;padding:0 1.25rem}
.dept-header{background:rgba(255,255,255,.96);backdrop-filter:blur(12px);border-bottom:1px solid rgba(12,27,51,.08);position:sticky;top:0;z-index:50;color:#0c1b33}
.dept-header-inner{display:flex;align-items:center;justify-content:space-between;padding:.85rem 1.25rem;gap:.85rem;flex-wrap:wrap}
.dept-brand{display:flex;align-items:center;gap:.85rem;min-width:0}
.dept-brand>i{font-size:1.5rem;color:#fff;background:linear-gradient(135deg,#0a3eaa,#1e6cf3);width:44px;height:44px;display:grid;place-items:center;border-radius:12px;flex-shrink:0;box-shadow:0 8px 18px rgba(30,108,243,.35)}
.dept-brand-t{font-weight:800;font-size:1rem;color:#0c1b33;line-height:1.2}
.dept-brand-s{font-size:.75rem;color:#6c819b;margin-top:2px}
.dept-main{padding:3rem 0 5rem}
.dept-hero{text-align:center;margin-bottom:3rem}
.dept-tag{display:inline-flex;align-items:center;gap:.5rem;background:rgba(59,130,246,.12);color:#60a5fa;padding:.45rem 1rem;border-radius:999px;font-size:.85rem;font-weight:600;border:1px solid rgba(59,130,246,.25)}
.dept-hero h1{font-size:clamp(1.8rem,4vw,2.75rem);font-weight:800;color:#fff;margin:1rem 0 .75rem}
.dept-hero p{color:#94a3b8;font-size:1.05rem;max-width:600px;margin:0 auto}
.dept-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem}
.dept-card{position:relative;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:1.75rem;text-align:start;cursor:pointer;transition:.3s;color:inherit;font:inherit;overflow:hidden}
.dept-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,var(--c) 0%,transparent 60%);opacity:0;transition:.3s}
.dept-card:hover{transform:translateY(-6px);border-color:var(--c);box-shadow:0 20px 40px -15px rgba(0,0,0,.5)}
.dept-card:hover::before{opacity:.08}
.dept-card>*{position:relative;z-index:1}
.dept-icon{width:56px;height:56px;display:grid;place-items:center;border-radius:14px;background:var(--c);color:#fff;font-size:1.4rem;box-shadow:0 10px 25px -10px var(--c);margin-bottom:1rem}
.dept-card h3{font-size:1.15rem;font-weight:700;color:#fff;margin:0 0 .5rem}
.dept-card p{color:#94a3b8;font-size:.9rem;line-height:1.6;margin:0}
.dept-arrow{position:absolute;top:1.5rem;inset-inline-end:1.5rem;color:var(--c);font-size:.95rem;opacity:.5;transition:.3s}
.dept-card:hover .dept-arrow{opacity:1}
`;
