import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { HeaderTools, HEADER_WIDGETS_STYLES } from "@/components/HeaderWidgets";
import { FONT_CLASS, LANG_DIR, useLang, useUser } from "@/lib/locale";

export const Route = createFileRoute("/users")({
  component: UsersPage,
});

type Lang = "fa" | "en" | "zh";

type UserRow = {
  id: number;
  username: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  profile_image?: string;
  is_active: boolean;
  last_login?: string;
};

const SEED: UserRow[] = [
  { id: 1, username: "admin",    full_name: "محمد پورسان دلیر", email: "admin@cmms.local",    phone: "09120000001", role: "admin",      department: "مدیریت",       is_active: true,  last_login: "2026-06-20 09:15" },
  { id: 2, username: "manager",  full_name: "فضل الله جمالی",   email: "manager@cmms.local",  phone: "09120000002", role: "manager",    department: "مدیر کارخانه", is_active: true,  last_login: "2026-06-19 17:42" },
  { id: 3, username: "tech3",    full_name: "تکنسین ابزار دقیق", email: "tech3@cmms.local",    phone: "09120000003", role: "technician", department: "تعمیرات",      is_active: true,  last_login: "2026-06-18 08:01" },
  { id: 4, username: "operator3",full_name: "فضل الله جمالی",   email: "op3@cmms.local",      phone: "09120000004", role: "operator",   department: "مدیریت",       is_active: false },
  { id: 5, username: "user",     full_name: "کاربر عادی",       email: "user@cmms.local",     phone: "09120000005", role: "user",       department: "عمومی",         is_active: true,  last_login: "2026-06-15 12:30" },
];

const T = {
  fa: {
    title: "مدیریت کاربران", sub: "افزودن، ویرایش و مدیریت دسترسی کاربران سیستم",
    add: "افزودن کاربر", search: "جستجو در کاربران...", total: "تعداد کاربران",
    active: "فعال", inactive: "غیرفعال", all: "همه نقش‌ها",
    cols: { user: "کاربر", contact: "تماس", role: "نقش", dept: "دپارتمان", status: "وضعیت", last: "آخرین ورود", actions: "عملیات" },
    edit: "ویرایش", del: "حذف", noLogin: "—", soon: "صفحه افزودن/ویرایش به زودی فعال می‌شود.",
  },
  en: {
    title: "User Management", sub: "Add, edit and manage system users and access",
    add: "Add user", search: "Search users...", total: "Total users",
    active: "Active", inactive: "Inactive", all: "All roles",
    cols: { user: "User", contact: "Contact", role: "Role", dept: "Department", status: "Status", last: "Last login", actions: "Actions" },
    edit: "Edit", del: "Delete", noLogin: "—", soon: "Add/Edit form will be available soon.",
  },
  zh: {
    title: "用户管理", sub: "添加、编辑和管理系统用户与权限",
    add: "添加用户", search: "搜索用户...", total: "用户总数",
    active: "启用", inactive: "停用", all: "所有角色",
    cols: { user: "用户", contact: "联系方式", role: "角色", dept: "部门", status: "状态", last: "最近登录", actions: "操作" },
    edit: "编辑", del: "删除", noLogin: "—", soon: "添加/编辑表单即将推出。",
  },
};

const ROLE_LABEL: Record<string, Record<Lang, string>> = {
  admin:      { fa: "مدیر سیستم", en: "Admin",      zh: "管理员" },
  manager:    { fa: "مدیر",        en: "Manager",    zh: "经理" },
  technician: { fa: "تکنسین",      en: "Technician", zh: "技术员" },
  operator:   { fa: "اپراتور",     en: "Operator",   zh: "操作员" },
  user:       { fa: "کاربر",       en: "User",       zh: "用户" },
};

const ROLE_COLOR: Record<string, string> = {
  admin: "#dc2626", manager: "#1e6cf3", technician: "#10b981", operator: "#f59e0b", user: "#6b7280",
};

function UsersPage() {
  const navigate = useNavigate();
  const [lang] = useLang();
  const user = useUser();
  const [ready, setReady] = useState(false);
  const [rows] = useState<UserRow[]>(SEED);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");

  useEffect(() => {
    setReady(true);
    if (!localStorage.getItem("iqms-user")) navigate({ to: "/" });
  }, [navigate]);

  const t = T[lang];
  const dir = LANG_DIR[lang];
  const fontClass = useMemo(() => FONT_CLASS[lang], [lang]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (roleFilter && r.role !== roleFilter) return false;
      if (!qq) return true;
      return (r.username + " " + r.full_name + " " + r.email + " " + r.department).toLowerCase().includes(qq);
    });
  }, [rows, q, roleFilter]);

  if (!ready || !user) return null;

  const activeCount = rows.filter((r) => r.is_active).length;

  return (
    <div className={`um-page ${fontClass}`} dir={dir}>
      <style>{UM_STYLES + HEADER_WIDGETS_STYLES}</style>

      <header className="um-header">
        <div className="um-header-inner">
          <button className="um-back-link" onClick={() => navigate({ to: "/workspace/$dept", params: { dept: "it" } })}>
            <i className={`fas ${dir === "rtl" ? "fa-arrow-right" : "fa-arrow-left"}`} />
            <span>IT</span>
          </button>
          <div className="um-brand">
            <span className="um-brand-icon"><i className="fas fa-users-gear" /></span>
            <div>
              <div className="um-brand-t">{t.title}</div>
              <div className="um-brand-s">{t.sub}</div>
            </div>
          </div>
          <HeaderTools />
        </div>
      </header>

      <main className="um-main">
        <div className="um-stats">
          <div className="um-stat">
            <span className="um-stat-icon" style={{ background: "#1e6cf3" }}><i className="fas fa-users" /></span>
            <div><div className="um-stat-n">{rows.length}</div><div className="um-stat-l">{t.total}</div></div>
          </div>
          <div className="um-stat">
            <span className="um-stat-icon" style={{ background: "#10b981" }}><i className="fas fa-circle-check" /></span>
            <div><div className="um-stat-n">{activeCount}</div><div className="um-stat-l">{t.active}</div></div>
          </div>
          <div className="um-stat">
            <span className="um-stat-icon" style={{ background: "#ef4444" }}><i className="fas fa-circle-xmark" /></span>
            <div><div className="um-stat-n">{rows.length - activeCount}</div><div className="um-stat-l">{t.inactive}</div></div>
          </div>
        </div>

        <div className="um-toolbar">
          <div className="um-search">
            <i className="fas fa-magnifying-glass" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="um-select">
            <option value="">{t.all}</option>
            {Object.keys(ROLE_LABEL).map((r) => <option key={r} value={r}>{ROLE_LABEL[r][lang]}</option>)}
          </select>
          <button className="um-add" onClick={() => alert(t.soon)}>
            <i className="fas fa-user-plus" /> {t.add}
          </button>
        </div>

        <div className="um-table-wrap">
          <table className="um-table">
            <thead>
              <tr>
                <th>{t.cols.user}</th>
                <th>{t.cols.contact}</th>
                <th>{t.cols.role}</th>
                <th>{t.cols.dept}</th>
                <th>{t.cols.status}</th>
                <th>{t.cols.last}</th>
                <th>{t.cols.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="um-user">
                      <span className="um-avatar-sm">{r.full_name.trim().slice(0, 1)}</span>
                      <div>
                        <div className="um-user-n">{r.full_name}</div>
                        <div className="um-user-u">@{r.username}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="um-contact"><i className="fas fa-envelope" /> {r.email}</div>
                    <div className="um-contact muted"><i className="fas fa-phone" /> {r.phone}</div>
                  </td>
                  <td>
                    <span className="um-badge" style={{ background: `${ROLE_COLOR[r.role]}18`, color: ROLE_COLOR[r.role] }}>
                      {ROLE_LABEL[r.role]?.[lang] || r.role}
                    </span>
                  </td>
                  <td>{r.department}</td>
                  <td>
                    {r.is_active
                      ? <span className="um-status um-status-on"><i className="fas fa-circle" /> {t.active}</span>
                      : <span className="um-status um-status-off"><i className="fas fa-circle" /> {t.inactive}</span>}
                  </td>
                  <td className="um-muted">{r.last_login || t.noLogin}</td>
                  <td>
                    <div className="um-actions">
                      <button className="um-act um-act-edit" title={t.edit} onClick={() => alert(t.soon)}>
                        <i className="fas fa-pen-to-square" />
                      </button>
                      <button className="um-act um-act-del" title={t.del} onClick={() => alert(t.soon)}>
                        <i className="fas fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const UM_STYLES = `
.um-page{min-height:100vh;background:#f3f5f9;color:#0c1b33}
.font-fa{font-family:'Vazirmatn',system-ui,sans-serif}
.font-en{font-family:'Inter',system-ui,sans-serif}
.font-zh{font-family:'Noto Sans SC',system-ui,sans-serif}

.um-header{background:#fff;border-bottom:1px solid rgba(12,27,51,.08);position:sticky;top:0;z-index:40}
.um-header-inner{max-width:1340px;margin:0 auto;display:flex;align-items:center;gap:.85rem;padding:.85rem 1.25rem;flex-wrap:wrap}
.um-back-link{display:inline-flex;align-items:center;gap:.4rem;padding:.5rem .8rem;border-radius:10px;background:#eef2f7;border:none;cursor:pointer;font-weight:700;color:#0c1b33;font-family:inherit;font-size:.85rem}
.um-back-link:hover{background:#1e6cf3;color:#fff}
.um-brand{display:flex;align-items:center;gap:.75rem;margin-inline-end:auto;min-width:0}
.um-brand-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;display:grid;place-items:center;font-size:1.15rem;box-shadow:0 8px 18px rgba(99,102,241,.35)}
.um-brand-t{font-weight:800;font-size:1.05rem;line-height:1.2}
.um-brand-s{font-size:.75rem;color:#6c819b}

.um-main{max-width:1340px;margin:0 auto;padding:1.5rem 1.25rem 3rem}
.um-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.25rem}
.um-stat{background:#fff;border-radius:14px;padding:1rem 1.2rem;display:flex;align-items:center;gap:.85rem;box-shadow:0 4px 14px rgba(12,27,51,.05)}
.um-stat-icon{width:46px;height:46px;border-radius:12px;color:#fff;display:grid;place-items:center;font-size:1.1rem}
.um-stat-n{font-size:1.5rem;font-weight:800;line-height:1}
.um-stat-l{font-size:.78rem;color:#6c819b;margin-top:2px}

.um-toolbar{display:flex;gap:.7rem;margin-bottom:1rem;flex-wrap:wrap}
.um-search{flex:1;min-width:220px;background:#fff;border:1px solid rgba(12,27,51,.10);border-radius:10px;display:flex;align-items:center;padding:0 .85rem;gap:.6rem}
.um-search i{color:#6c819b}
.um-search input{flex:1;border:none;outline:none;padding:.7rem 0;background:transparent;font-family:inherit;font-size:.9rem;color:#0c1b33}
.um-select{background:#fff;border:1px solid rgba(12,27,51,.10);border-radius:10px;padding:.7rem .85rem;font-family:inherit;font-size:.9rem;color:#0c1b33;cursor:pointer}
.um-add{display:inline-flex;align-items:center;gap:.45rem;padding:.7rem 1.1rem;border-radius:10px;background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;border:none;cursor:pointer;font-weight:700;font-family:inherit;font-size:.9rem;box-shadow:0 8px 18px rgba(99,102,241,.3)}
.um-add:hover{transform:translateY(-1px)}

.um-table-wrap{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 14px rgba(12,27,51,.05);overflow-x:auto}
.um-table{width:100%;border-collapse:collapse;min-width:900px}
.um-table th{background:#f8fafc;text-align:start;padding:.85rem 1rem;font-size:.78rem;font-weight:700;color:#6c819b;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid rgba(12,27,51,.06)}
.um-table td{padding:.85rem 1rem;border-bottom:1px solid rgba(12,27,51,.05);font-size:.88rem;vertical-align:middle}
.um-table tr:last-child td{border-bottom:none}
.um-table tbody tr:hover{background:#f8fafc}
.um-user{display:flex;align-items:center;gap:.7rem}
.um-avatar-sm{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff;display:inline-grid;place-items:center;font-weight:800;flex-shrink:0}
.um-user-n{font-weight:700}
.um-user-u{font-size:.75rem;color:#6c819b}
.um-contact{font-size:.82rem;display:flex;align-items:center;gap:.4rem}
.um-contact i{color:#6c819b;font-size:.75rem;width:12px}
.um-contact.muted{color:#6c819b;margin-top:2px}
.um-badge{display:inline-block;padding:.3rem .7rem;border-radius:999px;font-size:.75rem;font-weight:700}
.um-status{display:inline-flex;align-items:center;gap:.4rem;font-size:.8rem;font-weight:600}
.um-status i{font-size:.5rem}
.um-status-on{color:#10b981}
.um-status-off{color:#ef4444}
.um-muted{color:#6c819b;font-size:.82rem}
.um-actions{display:flex;gap:.35rem}
.um-act{width:32px;height:32px;border-radius:8px;border:none;cursor:pointer;display:inline-grid;place-items:center;font-size:.8rem;transition:.15s}
.um-act-edit{background:rgba(30,108,243,.12);color:#1e6cf3}
.um-act-edit:hover{background:#1e6cf3;color:#fff}
.um-act-del{background:rgba(239,68,68,.12);color:#ef4444}
.um-act-del:hover{background:#ef4444;color:#fff}
`;
