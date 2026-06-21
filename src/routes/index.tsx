import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  HeaderDate,
  LangSwitch,
  UserMenu,
  HEADER_WIDGETS_STYLES,
} from "@/components/HeaderWidgets";
import { setLangGlobal, setUserGlobal, useLang as useGlobalLang } from "@/lib/locale";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IQMS · Integrated Quality Management System" },
      {
        name: "description",
        content:
          "Implementation of Integrated Quality Management System (IQMS) based on ISO 9001, ISO 14001 and ISO 45001.",
      },
    ],
  }),
  component: HomePage,
});

/* ──────────────────────────────────────────────────────────
   i18n
   ────────────────────────────────────────────────────────── */
type Lang = "fa" | "en" | "zh";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

const T = {
  fa: {
    dir: "rtl" as const,
    brand: "سامانه مدیریت کیفیت یکپارچه",
    slogan: "مسیری به سوی تعالی سازمانی",
    nav: {
      home: "خانه",
      about: "درباره ما",
      why: "چرا یکپارچه؟",
      process: "فرآیند",
      benefits: "مزایا",
      services: "خدمات",
      contact: "تماس",
      cta: "مشاوره رایگان",
    },
    hero: {
      tag: "ISO 9001 · 14001 · 45001",
      title1: "استقرار نظام مدیریت",
      titleAccent: "یکپارچه",
      title2: "گامی اساسی برای ارتقای بهره‌وری و اعتبار سازمان شما",
      sub: "با بهره‌گیری از آخرین استانداردهای بین‌المللی، تمامی سیستم‌های مدیریتی سازمان خود را در یک چارچوب واحد و کارآمد ادغام کنید.",
      cta1: "مشاوره رایگان دریافت کنید",
      cta2: "دانلود بروشور",
    },
    about: {
      kicker: "درباره ما",
      title1: "درباره ",
      titleAccent: "سامانه مدیریت کیفیت یکپارچه",
      sub: "رویکردی مدرن برای ادغام سیستم‌های مدیریت در یک ساختار هماهنگ و کارآمد",
      p1: "سامانه مدیریت کیفیت یکپارچه (IQMS) یک رویکرد مدرن برای ادغام سیستم‌های مدیریت کیفیت (ISO 9001)، زیست‌محیطی (ISO 14001) و ایمنی و بهداشت شغلی (ISO 45001) در یک ساختار هماهنگ است.",
      p2: "این رویکرد با حذف موازی‌کاری‌ها و افزایش کارایی، سازمان شما را برای مواجهه با چالش‌های پیچیده امروزی آماده می‌سازد.",
      bullets: [
        "یکپارچه‌سازی سیستم‌های مدیریتی",
        "حذف ممیزی‌های تکراری و کاهش هزینه‌ها",
        "افزایش بهره‌وری و بهبود مستمر",
      ],
      vision: { t: "چشم‌انداز", d: "تبدیل شدن به مرجع اصلی استقرار سیستم‌های مدیریت یکپارچه در منطقه و ارتقای سطح کیفی سازمان‌ها." },
      mission: { t: "مأموریت", d: "ارائه راهکارهای نوآورانه و سفارشی برای پیاده‌سازی سیستم‌های مدیریت یکپارچه با رویکرد بهبود مستمر." },
      policy: { t: "خط مشی کیفیت", d: "تعهد به ارائه خدمات با بالاترین کیفیت، رعایت الزامات استانداردهای بین‌المللی و بهبود مستمر فرآیندها." },
    },
    why: {
      title1: "چرا ",
      titleAccent: "مدیریت یکپارچه؟",
      sub: "دلایل کلیدی برای انتخاب رویکرد مدیریت یکپارچه در سازمان شما",
      cards: [
        { t: "کاهش هزینه‌ها", d: "حذف ممیزی‌های تکراری و ادغام فرآیندها، هزینه‌ها را به طور قابل‌توجهی کاهش می‌دهد.", i: "fa-coins" },
        { t: "بهبود کارایی", d: "هماهنگی بین سیستم‌های مدیریتی، کارایی فرآیندها را افزایش می‌دهد.", i: "fa-gears" },
        { t: "رضایت ذی‌نفعان", d: "مشتریان، کارکنان و جامعه از کیفیت و شفافیت عملکرد سازمان بهره‌مند می‌شوند.", i: "fa-handshake" },
        { t: "مزیت رقابتی", d: "کسب اعتبار بیشتر در بازارهای داخلی و بین‌المللی.", i: "fa-trophy" },
      ],
    },
    process: {
      title1: "فرآیند ",
      titleAccent: "پیاده‌سازی",
      sub: "مراحل گام‌به‌گام استقرار سامانه مدیریت یکپارچه",
      steps: [
        { t: "ارزیابی اولیه و شکاف‌سنجی", d: "بررسی وضعیت موجود و شناسایی شکاف‌ها" },
        { t: "طراحی ساختار یکپارچه", d: "تدوین مستندات و نقشه راه" },
        { t: "آموزش و توانمندسازی", d: "ارتقای دانش و مهارت کارکنان" },
        { t: "اجرا و عملیاتی‌سازی", d: "پیاده‌سازی سیستم در سازمان" },
        { t: "ممیزی داخلی و بازنگری", d: "ارزیابی و بهبود مستمر" },
        { t: "اخذ گواهینامه", d: "دریافت گواهینامه از نهادهای معتبر" },
      ],
    },
    benefits: {
      title1: "مزایای ",
      titleAccent: "کلیدی برای سازمان شما",
      sub: "نتایج ملموس استقرار سامانه مدیریت یکپارچه",
      items: [
        { n: "۳۰٪", l: "کاهش زمان ممیزی" },
        { n: "۲۰٪", l: "افزایش بهره‌وری" },
        { n: "۱۰۰٪", l: "شفافیت فرآیندها" },
        { n: "۹۵٪", l: "رضایت مشتریان" },
      ],
    },
    services: {
      title1: "برنامه‌ها و ",
      titleAccent: "خدمات",
      sub: "راهکارهای متنوع برای نیازهای مختلف سازمان شما",
      cards: [
        { t: "مشاوره پیاده‌سازی", d: "ارائه راهکارهای سفارشی برای سازمان‌های کوچک، متوسط و بزرگ.", i: "fa-hand-holding-heart" },
        { t: "آموزش و کارگاه‌ها", d: "برگزاری دوره‌های آموزشی تخصصی برای مدیران و کارکنان.", i: "fa-chalkboard-user" },
        { t: "ممیزی داخلی", d: "انجام ممیزی‌های دوره‌ای برای ارزیابی عملکرد.", i: "fa-clipboard-check" },
        { t: "ارزیابی تامین‌کنندگان", d: "طراحی سیستم ارزیابی جامع برای مدیریت ریسک زنجیره تامین.", i: "fa-people-arrows" },
      ],
    },
    contact: {
      title1: "تماس ",
      titleAccent: "با ما",
      sub: "همین امروز با کارشناسان ما در ارتباط باشید",
      form: {
        h: "فرم تماس",
        name: "نام و نام خانوادگی",
        namePh: "نام خود را وارد کنید",
        email: "آدرس ایمیل",
        emailPh: "ایمیل خود را وارد کنید",
        phone: "شماره تماس",
        phonePh: "شماره تماس خود را وارد کنید",
        subject: "موضوع",
        subjectPh: "موضوع را انتخاب کنید",
        s1: "مشاوره پیاده‌سازی",
        s2: "آموزش و کارگاه",
        s3: "ممیزی داخلی",
        s4: "سایر موارد",
        message: "پیام شما",
        messagePh: "پیام خود را بنویسید...",
        submit: "ارسال پیام",
        err: "لطفاً تمام فیلدهای ضروری را پر کنید.",
        ok: "✅ پیام شما با موفقیت ارسال شد.",
      },
      info: {
        addr: { t: "آدرس دفتر مرکزی", v: "تهران، خیابان ولیعصر، نبش خیابان ملک، پلاک ۱۲" },
        tel: { t: "شماره تماس", v: "۰۲۱-۲۲۳۳۴۴۵۵", v2: "پشتیبانی: ۰۹۱۲-۱۲۳۴۵۶۷" },
        mail: { t: "ایمیل", v: "info@iqms.ir", v2: "support@iqms.ir" },
      },
    },
    footer: {
      about: "درباره ما",
      services: "خدمات",
      quick: "دسترسی سریع",
      contact: "اطلاعات تماس",
      links1: ["درباره ما", "چشم‌انداز و مأموریت", "خط مشی کیفیت"],
      links2: ["مشاوره پیاده‌سازی", "آموزش و کارگاه‌ها", "ممیزی داخلی", "ارزیابی تامین‌کنندگان"],
      links3: ["سوالات متداول", "دانلود بروشور", "وبلاگ", "تماس با ما"],
      rights: "تمامی حقوق برای سامانه مدیریت کیفیت یکپارچه محفوظ است. © ۱۴۰۴",
    },
  },
  en: {
    dir: "ltr" as const,
    brand: "Integrated Quality Management System",
    slogan: "A path to organizational excellence",
    nav: {
      home: "Home",
      about: "About",
      why: "Why Integrated?",
      process: "Process",
      benefits: "Benefits",
      services: "Services",
      contact: "Contact",
      cta: "Free Consultation",
    },
    hero: {
      tag: "ISO 9001 · 14001 · 45001",
      title1: "Implement an Integrated",
      titleAccent: "Management System",
      title2: "An essential step to elevate your organization's productivity and credibility",
      sub: "Leverage the latest international standards to unify all your management systems within a single, efficient framework.",
      cta1: "Get a free consultation",
      cta2: "Download brochure",
    },
    about: {
      kicker: "About",
      title1: "About the ",
      titleAccent: "Integrated Quality System",
      sub: "A modern approach to unifying management systems into one coherent, efficient structure",
      p1: "The Integrated Quality Management System (IQMS) is a modern approach to merging quality (ISO 9001), environmental (ISO 14001) and occupational health & safety (ISO 45001) management systems into one coherent structure.",
      p2: "By eliminating duplication and increasing efficiency, this approach prepares your organization for today's complex challenges.",
      bullets: [
        "Unification of management systems",
        "Elimination of duplicate audits and lower costs",
        "Higher productivity and continuous improvement",
      ],
      vision: { t: "Vision", d: "To become the leading reference for integrated management system implementation in the region." },
      mission: { t: "Mission", d: "Deliver innovative, tailored solutions for IMS implementation with a continuous improvement mindset." },
      policy: { t: "Quality Policy", d: "Committed to the highest service quality, full compliance with international standards, and continuous improvement." },
    },
    why: {
      title1: "Why ",
      titleAccent: "Integrated Management?",
      sub: "Key reasons to adopt an integrated approach in your organization",
      cards: [
        { t: "Cost Reduction", d: "Removing duplicate audits and merging processes significantly lowers costs.", i: "fa-coins" },
        { t: "Better Efficiency", d: "Coordination between systems increases process efficiency and prevents redundancy.", i: "fa-gears" },
        { t: "Stakeholder Satisfaction", d: "Customers, employees and the community all benefit from transparent, high-quality operations.", i: "fa-handshake" },
        { t: "Competitive Edge", d: "Earn greater credibility in domestic and international markets.", i: "fa-trophy" },
      ],
    },
    process: {
      title1: "Implementation ",
      titleAccent: "Process",
      sub: "Step-by-step rollout of your integrated management system",
      steps: [
        { t: "Initial assessment & gap analysis", d: "Review current state and identify gaps" },
        { t: "Integrated structure design", d: "Draft documentation and a roadmap" },
        { t: "Training & enablement", d: "Upskill managers and employees" },
        { t: "Execution & operationalization", d: "Deploy the system across the organization" },
        { t: "Internal audit & review", d: "Evaluate and continuously improve" },
        { t: "Certification", d: "Obtain certification from accredited bodies" },
      ],
    },
    benefits: {
      title1: "Key ",
      titleAccent: "Benefits",
      sub: "Tangible outcomes of deploying an integrated management system",
      items: [
        { n: "30%", l: "Less audit time" },
        { n: "20%", l: "Higher productivity" },
        { n: "100%", l: "Process transparency" },
        { n: "95%", l: "Customer satisfaction" },
      ],
    },
    services: {
      title1: "Programs & ",
      titleAccent: "Services",
      sub: "Tailored solutions for organizations of every size",
      cards: [
        { t: "Implementation Consulting", d: "Custom solutions for small, mid-sized and enterprise organizations.", i: "fa-hand-holding-heart" },
        { t: "Training & Workshops", d: "Specialized training for executives, specialists and staff.", i: "fa-chalkboard-user" },
        { t: "Internal Audit", d: "Periodic audits to evaluate performance and certification readiness.", i: "fa-clipboard-check" },
        { t: "Supplier Assessment", d: "End-to-end supplier evaluation for supply-chain risk management.", i: "fa-people-arrows" },
      ],
    },
    contact: {
      title1: "Contact ",
      titleAccent: "Us",
      sub: "Get in touch with our specialists today",
      form: {
        h: "Contact form",
        name: "Full name",
        namePh: "Enter your name",
        email: "Email address",
        emailPh: "Enter your email",
        phone: "Phone",
        phonePh: "Enter your phone number",
        subject: "Subject",
        subjectPh: "Select a subject",
        s1: "Implementation consulting",
        s2: "Training & workshops",
        s3: "Internal audit",
        s4: "Other",
        message: "Your message",
        messagePh: "Write your message...",
        submit: "Send message",
        err: "Please fill in all required fields.",
        ok: "✅ Your message has been sent successfully.",
      },
      info: {
        addr: { t: "Head office", v: "Tehran, Valiasr St., corner of Malek St., No. 12" },
        tel: { t: "Phone", v: "+98-21-2233 4455", v2: "Support: +98-912-123 4567" },
        mail: { t: "Email", v: "info@iqms.ir", v2: "support@iqms.ir" },
      },
    },
    footer: {
      about: "About",
      services: "Services",
      quick: "Quick links",
      contact: "Contact info",
      links1: ["About us", "Vision & mission", "Quality policy"],
      links2: ["Implementation consulting", "Training & workshops", "Internal audit", "Supplier assessment"],
      links3: ["FAQ", "Download brochure", "Blog", "Contact us"],
      rights: "© 2026 Integrated Quality Management System. All rights reserved.",
    },
  },
  zh: {
    dir: "ltr" as const,
    brand: "综合质量管理系统",
    slogan: "通往卓越组织的路径",
    nav: {
      home: "首页",
      about: "关于",
      why: "为何整合？",
      process: "流程",
      benefits: "优势",
      services: "服务",
      contact: "联系",
      cta: "免费咨询",
    },
    hero: {
      tag: "ISO 9001 · 14001 · 45001",
      title1: "部署综合",
      titleAccent: "管理体系",
      title2: "提升组织生产力与信誉的关键一步",
      sub: "采用最新国际标准，将组织的所有管理体系整合到统一高效的框架中。",
      cta1: "获取免费咨询",
      cta2: "下载手册",
    },
    about: {
      kicker: "关于",
      title1: "关于",
      titleAccent: "综合质量管理系统",
      sub: "将管理体系融入一个协调高效结构的现代方法",
      p1: "综合质量管理系统（IQMS）是一种现代方法，将质量（ISO 9001）、环境（ISO 14001）和职业健康安全（ISO 45001）管理体系整合到统一的结构中。",
      p2: "通过消除重复工作并提高效率，让您的组织从容应对当今的复杂挑战。",
      bullets: ["管理体系一体化", "消除重复审核并降低成本", "提升生产力与持续改进"],
      vision: { t: "愿景", d: "成为本地区综合管理体系实施的主要参考。" },
      mission: { t: "使命", d: "以持续改进的理念，提供创新且量身定制的 IMS 实施方案。" },
      policy: { t: "质量方针", d: "致力于提供最高质量服务，全面符合国际标准并持续改进流程。" },
    },
    why: {
      title1: "为何选择",
      titleAccent: "综合管理？",
      sub: "在组织中采用整合式管理方法的关键原因",
      cards: [
        { t: "降低成本", d: "消除重复审核并合并流程可大幅降低成本。", i: "fa-coins" },
        { t: "提升效率", d: "管理体系之间的协调可提高流程效率。", i: "fa-gears" },
        { t: "利益相关者满意", d: "客户、员工与社会均受益于透明高质量的运营。", i: "fa-handshake" },
        { t: "竞争优势", d: "在国内外市场获得更高的公信力。", i: "fa-trophy" },
      ],
    },
    process: {
      title1: "实施",
      titleAccent: "流程",
      sub: "综合管理体系的逐步部署",
      steps: [
        { t: "初步评估与差距分析", d: "审视现状并识别差距" },
        { t: "整合结构设计", d: "起草文件与路线图" },
        { t: "培训与赋能", d: "提升管理者与员工的能力" },
        { t: "执行与运营化", d: "在组织内部署系统" },
        { t: "内部审核与复核", d: "评估并持续改进" },
        { t: "取得认证", d: "从权威机构获得认证" },
      ],
    },
    benefits: {
      title1: "关键",
      titleAccent: "优势",
      sub: "部署综合管理体系的实际成果",
      items: [
        { n: "30%", l: "减少审核时间" },
        { n: "20%", l: "提升生产力" },
        { n: "100%", l: "流程透明度" },
        { n: "95%", l: "客户满意度" },
      ],
    },
    services: {
      title1: "项目与",
      titleAccent: "服务",
      sub: "面向各类规模组织的定制化解决方案",
      cards: [
        { t: "实施咨询", d: "为中小及大型组织提供定制方案。", i: "fa-hand-holding-heart" },
        { t: "培训与研讨", d: "为高管、专家与员工开展专业培训。", i: "fa-chalkboard-user" },
        { t: "内部审核", d: "定期审核以评估绩效与认证准备情况。", i: "fa-clipboard-check" },
        { t: "供应商评估", d: "端到端供应商评估以管理供应链风险。", i: "fa-people-arrows" },
      ],
    },
    contact: {
      title1: "联系",
      titleAccent: "我们",
      sub: "立即与我们的专家取得联系",
      form: {
        h: "联系表单",
        name: "姓名",
        namePh: "请输入您的姓名",
        email: "电子邮箱",
        emailPh: "请输入您的邮箱",
        phone: "电话",
        phonePh: "请输入您的电话号码",
        subject: "主题",
        subjectPh: "请选择主题",
        s1: "实施咨询",
        s2: "培训与研讨",
        s3: "内部审核",
        s4: "其他",
        message: "您的留言",
        messagePh: "请输入您的留言...",
        submit: "发送",
        err: "请填写所有必填项。",
        ok: "✅ 您的留言已成功发送。",
      },
      info: {
        addr: { t: "总部地址", v: "德黑兰 Valiasr 街 Malek 街口 12 号" },
        tel: { t: "电话", v: "+98-21-2233 4455", v2: "支持：+98-912-123 4567" },
        mail: { t: "邮箱", v: "info@iqms.ir", v2: "support@iqms.ir" },
      },
    },
    footer: {
      about: "关于",
      services: "服务",
      quick: "快速链接",
      contact: "联系信息",
      links1: ["关于我们", "愿景与使命", "质量方针"],
      links2: ["实施咨询", "培训与研讨", "内部审核", "供应商评估"],
      links3: ["常见问题", "下载手册", "博客", "联系我们"],
      rights: "© 2026 综合质量管理系统 版权所有",
    },
  },
};

/* Login modal translations */
const LOGIN_T = {
  fa: {
    enter: "ورود به برنامه",
    title: "ورود به سامانه",
    sub: "لطفاً اطلاعات کاربری خود را وارد کنید",
    username: "نام کاربری",
    usernamePh: "نام کاربری خود را وارد کنید",
    password: "رمز عبور",
    passwordPh: "رمز عبور خود را وارد کنید",
    submit: "ورود",
    loading: "در حال ورود...",
    cancel: "انصراف",
    demo: "حساب‌های نمونه: admin/admin123 · manager/manager123 · user/user123",
    settings: "تنظیمات API",
    apiUrl: "آدرس API ورود",
    save: "ذخیره",
    errEmpty: "نام کاربری و رمز عبور را وارد کنید",
    errInvalid: "نام کاربری یا رمز عبور اشتباه است",
  },
  en: {
    enter: "Login",
    title: "Sign in",
    sub: "Please enter your credentials",
    username: "Username",
    usernamePh: "Enter your username",
    password: "Password",
    passwordPh: "Enter your password",
    submit: "Sign in",
    loading: "Signing in...",
    cancel: "Cancel",
    demo: "Demo accounts: admin/admin123 · manager/manager123 · user/user123",
    settings: "API settings",
    apiUrl: "Login API URL",
    save: "Save",
    errEmpty: "Please enter username and password",
    errInvalid: "Invalid username or password",
  },
  zh: {
    enter: "登录",
    title: "登录系统",
    sub: "请输入您的登录信息",
    username: "用户名",
    usernamePh: "请输入用户名",
    password: "密码",
    passwordPh: "请输入密码",
    submit: "登录",
    loading: "正在登录...",
    cancel: "取消",
    demo: "演示账号: admin/admin123 · manager/manager123 · user/user123",
    settings: "API 设置",
    apiUrl: "登录 API 地址",
    save: "保存",
    errEmpty: "请输入用户名和密码",
    errInvalid: "用户名或密码错误",
  },
};

const DEFAULT_API = "http://localhost/iqms/login.php";
const DEMO_USERS: Record<string, { password: string; user: { id: number; username: string; full_name: string; role: string } }> = {
  admin:   { password: "admin123",   user: { id: 1, username: "admin",   full_name: "مدیر سیستم",    role: "admin" } },
  manager: { password: "manager123", user: { id: 2, username: "manager", full_name: "مدیر دپارتمان", role: "manager" } },
  user:    { password: "user123",    user: { id: 3, username: "user",    full_name: "کاربر عادی",    role: "user" } },
};

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
function HomePage() {
  const [lang, setLang] = useGlobalLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const t = T[lang];
  const lt = LOGIN_T[lang];

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = t.dir;
    }
  }, [lang, t.dir]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // setLang is provided by useGlobalLang but unused locally (LangSwitch handles UI).
  void setLang;





  const fontClass = useMemo(
    () => (lang === "fa" ? "font-fa" : lang === "zh" ? "font-zh" : "font-en"),
    [lang],
  );

  const navItems = [
    { id: "about", label: t.nav.about },
    { id: "why", label: t.nav.why },
    { id: "process", label: t.nav.process },
    { id: "benefits", label: t.nav.benefits },
    { id: "services", label: t.nav.services },
    { id: "contact", label: t.nav.contact },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const name = (f.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (f.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (f.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    if (!name || !email || !message) return alert(t.contact.form.err);
    alert(t.contact.form.ok);
    f.reset();
  };

  return (
    <div className={`iqms ${fontClass}`} dir={t.dir}>
      <style>{STYLES + HEADER_WIDGETS_STYLES}</style>

      {/* HEADER */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#" className="logo">
            <div className="logo-icon">
              <i className="fas fa-clipboard-check" />
            </div>
            <div className="logo-text">
              <div className="brand">{t.brand}</div>
              <div className="slogan">{t.slogan}</div>
            </div>
          </a>

          <div className="nav-right">
            <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
              {navItems.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)}>
                  {n.label}
                </a>
              ))}
              <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-phone" /> {t.nav.cta}
              </a>
            </nav>

            {/* Date display */}
            <HeaderDate />

            {/* Language switcher (shared) */}
            <LangSwitch />

            {/* User menu / Login button */}
            <UserMenu onLoginClick={() => setLoginOpen(true)} />

            <button
              className="nav-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <i className={`fas ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>

          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="tag">
              <i className="fas fa-certificate" /> {t.hero.tag}
            </span>
            <h1>
              {t.hero.title1} <span className="accent">{t.hero.titleAccent}</span>
              <br />
              {t.hero.title2}
            </h1>
            <p>{t.hero.sub}</p>
            <div className="hero-buttons">
              <a href="#contact" className="btn-primary">
                <i className="fas fa-headset" /> {t.hero.cta1}
              </a>
              <a href="/brochure.pdf" download className="btn-secondary">
                <i className="fas fa-download" /> {t.hero.cta2}
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="hero-card">
              <div className="hero-card-row">
                <div className="hero-badge"><i className="fas fa-award" /></div>
                <div>
                  <div className="hc-title">ISO 9001</div>
                  <div className="hc-sub">Quality</div>
                </div>
              </div>
              <div className="hero-card-row">
                <div className="hero-badge green"><i className="fas fa-leaf" /></div>
                <div>
                  <div className="hc-title">ISO 14001</div>
                  <div className="hc-sub">Environment</div>
                </div>
              </div>
              <div className="hero-card-row">
                <div className="hero-badge orange"><i className="fas fa-shield-heart" /></div>
                <div>
                  <div className="hc-title">ISO 45001</div>
                  <div className="hc-sub">Safety</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <SectionTitle one={t.about.title1} accent={t.about.titleAccent} sub={t.about.sub} />
          <div className="about-grid">
            <div className="about-text">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <ul>
                {t.about.bullets.map((b, i) => (
                  <li key={i}><i className="fas fa-check-circle" /> {b}</li>
                ))}
              </ul>
            </div>
            <div className="vision-box">
              {[t.about.vision, t.about.mission, t.about.policy].map((it, i) => (
                <div key={i} className="vb-item">
                  <h4>
                    <i className={`fas ${i === 0 ? "fa-eye" : i === 1 ? "fa-bullseye" : "fa-flag"}`} />
                    {it.t}
                  </h4>
                  <p>{it.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section section-alt" id="why">
        <div className="container">
          <SectionTitle one={t.why.title1} accent={t.why.titleAccent} sub={t.why.sub} />
          <div className="why-grid">
            {t.why.cards.map((c, i) => (
              <div key={i} className="why-card">
                <div className="icon"><i className={`fas ${c.i}`} /></div>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="container">
          <SectionTitle one={t.process.title1} accent={t.process.titleAccent} sub={t.process.sub} />
          <div className="process-grid">
            {t.process.steps.map((s, i) => (
              <div key={i} className="process-step">
                <div className="number">{i + 1}</div>
                <h5>{s.t}</h5>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section section-dark" id="benefits">
        <div className="container">
          <SectionTitle one={t.benefits.title1} accent={t.benefits.titleAccent} sub={t.benefits.sub} dark />
          <div className="benefits-grid">
            {t.benefits.items.map((b, i) => (
              <div key={i} className="benefit-item">
                <span className="stat">{b.n}</span>
                <span className="label">{b.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <SectionTitle one={t.services.title1} accent={t.services.titleAccent} sub={t.services.sub} />
          <div className="services-grid">
            {t.services.cards.map((c, i) => (
              <div key={i} className="service-card">
                <span className="icon"><i className={`fas ${c.i}`} /></span>
                <h4>{c.t}</h4>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section-alt" id="contact">
        <div className="container">
          <SectionTitle one={t.contact.title1} accent={t.contact.titleAccent} sub={t.contact.sub} />
          <div className="contact-grid">
            <form className="contact-form" onSubmit={handleSubmit}>
              <h4><i className="fas fa-paper-plane" /> {t.contact.form.h}</h4>
              <div className="form-group">
                <label>{t.contact.form.name}</label>
                <input name="name" type="text" placeholder={t.contact.form.namePh} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t.contact.form.email}</label>
                  <input name="email" type="email" placeholder={t.contact.form.emailPh} required />
                </div>
                <div className="form-group">
                  <label>{t.contact.form.phone}</label>
                  <input name="phone" type="tel" placeholder={t.contact.form.phonePh} />
                </div>
              </div>
              <div className="form-group">
                <label>{t.contact.form.subject}</label>
                <select name="subject" defaultValue="">
                  <option value="" disabled>{t.contact.form.subjectPh}</option>
                  <option>{t.contact.form.s1}</option>
                  <option>{t.contact.form.s2}</option>
                  <option>{t.contact.form.s3}</option>
                  <option>{t.contact.form.s4}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t.contact.form.message}</label>
                <textarea name="message" placeholder={t.contact.form.messagePh} required />
              </div>
              <button type="submit" className="btn-primary full">
                <i className="fas fa-paper-plane" /> {t.contact.form.submit}
              </button>
            </form>

            <div className="contact-info">
              <InfoItem icon="fa-map-marker-alt" title={t.contact.info.addr.t}>
                <p>{t.contact.info.addr.v}</p>
              </InfoItem>
              <InfoItem icon="fa-phone" title={t.contact.info.tel.t}>
                <p>{t.contact.info.tel.v}</p>
                <p className="muted">{t.contact.info.tel.v2}</p>
              </InfoItem>
              <InfoItem icon="fa-envelope" title={t.contact.info.mail.t}>
                <p>{t.contact.info.mail.v}</p>
                <p className="muted">{t.contact.info.mail.v2}</p>
              </InfoItem>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h5><i className="fas fa-clipboard-check" /> {t.brand}</h5>
              <ul>{t.footer.links1.map((l, i) => <li key={i}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div className="footer-col">
              <h5>{t.footer.services}</h5>
              <ul>{t.footer.links2.map((l, i) => <li key={i}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div className="footer-col">
              <h5>{t.footer.quick}</h5>
              <ul>{t.footer.links3.map((l, i) => <li key={i}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div className="footer-col">
              <h5>{t.footer.contact}</h5>
              <ul>
                <li><a href="tel:02122334455"><i className="fas fa-phone" /> {t.contact.info.tel.v}</a></li>
                <li><a href="mailto:info@iqms.ir"><i className="fas fa-envelope" /> {t.contact.info.mail.v}</a></li>
                <li><a href="#"><i className="fas fa-map-marker-alt" /> {t.contact.info.addr.v}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{t.footer.rights}</span>
            <div className="socials">
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
              <a href="#" aria-label="Telegram"><i className="fab fa-telegram-plane" /></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube" /></a>
            </div>
          </div>
        </div>
      </footer>

      {loginOpen && <LoginModal lang={lang} onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Login Modal
   ────────────────────────────────────────────────────────── */
function LoginModal({ lang, onClose }: { lang: Lang; onClose: () => void }) {
  const lt = LOGIN_T[lang];
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [apiUrl, setApiUrl] = useState(
    (typeof window !== "undefined" && localStorage.getItem("iqms-api")) || DEFAULT_API,
  );

  const saveApi = () => {
    localStorage.setItem("iqms-api", apiUrl);
    setShowSettings(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!username.trim() || !password) return setErr(lt.errEmpty);
    setLoading(true);

    let user: any = null;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 4000);
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const data = await res.json();
      if (data?.ok && data.user) user = data.user;
      else if (data?.error) { setErr(data.error); setLoading(false); return; }
    } catch {
      const d = DEMO_USERS[username.trim().toLowerCase()];
      if (d && d.password === password) user = d.user;
    }

    if (!user) { setErr(lt.errInvalid); setLoading(false); return; }
    setUserGlobal(user);
    navigate({ to: "/departments" });
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-close" onClick={onClose} aria-label="close">
          <i className="fas fa-xmark" />
        </button>
        <div className="login-head">
          <div className="login-icon"><i className="fas fa-user-shield" /></div>
          <h3>{lt.title}</h3>
          <p>{lt.sub}</p>
        </div>

        <form onSubmit={submit} className="login-form">
          <div className="form-group">
            <label>{lt.username}</label>
            <input
              type="text" value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={lt.usernamePh} autoFocus autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label>{lt.password}</label>
            <div className="pwd-wrap">
              <input
                type={showPwd ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={lt.passwordPh} autoComplete="current-password"
                className="pwd-input"
              />
              <button
                type="button"
                className="pwd-toggle"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? "hide password" : "show password"}
                tabIndex={-1}
              >
                <i className={`fas ${showPwd ? "fa-eye-slash" : "fa-eye"}`} />
              </button>
            </div>
          </div>

          {err && <div className="login-err"><i className="fas fa-circle-exclamation" /> {err}</div>}

          <button type="submit" className="btn-primary full" disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin" /> {lt.loading}</>
                     : <><i className="fas fa-right-to-bracket" /> {lt.submit}</>}
          </button>

          <div className="login-demo"><i className="fas fa-info-circle" /> {lt.demo}</div>

          <button type="button" className="login-settings-toggle" onClick={() => setShowSettings((v) => !v)}>
            <i className="fas fa-gear" /> {lt.settings}
          </button>

          {showSettings && (
            <div className="login-settings">
              <label>{lt.apiUrl}</label>
              <div className="settings-row">
                <input type="text" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
                <button type="button" onClick={saveApi}>{lt.save}</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function SectionTitle({
  one,
  accent,
  sub,
  dark,
}: {
  one: string;
  accent: string;
  sub: string;
  dark?: boolean;
}) {
  return (
    <div className={`section-title ${dark ? "dark" : ""}`}>
      <h2>
        {one}
        <span className="accent">{accent}</span>
      </h2>
      <p>{sub}</p>
    </div>
  );
}

function InfoItem({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="info-item">
      <div className="info-icon"><i className={`fas ${icon}`} /></div>
      <div>
        <h5>{title}</h5>
        {children}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   Styles
   ────────────────────────────────────────────────────────── */
const STYLES = `
.iqms { --bg:#f6f8fc; --surface:#ffffff; --ink:#0c1b33; --ink-2:#374a66; --muted:#6c819b;
  --brand:#1e6cf3; --brand-2:#5b9bff; --brand-deep:#0a3eaa;
  --accent:#22c8c4; --gold:#f0b429;
  --grad: linear-gradient(135deg,#0a3eaa 0%, #1e6cf3 45%, #22c8c4 100%);
  --grad-soft: linear-gradient(135deg, rgba(30,108,243,.10), rgba(34,200,196,.10));
  --shadow-sm: 0 4px 14px rgba(12,27,51,.06);
  --shadow-md: 0 12px 32px rgba(12,27,51,.10);
  --shadow-lg: 0 30px 70px rgba(12,27,51,.18);
  --radius: 18px;
  background: var(--bg); color: var(--ink); min-height:100vh;
}
.font-fa { font-family: 'Vazirmatn', 'Segoe UI', Tahoma, sans-serif; }
.font-en { font-family: 'Inter', system-ui, sans-serif; letter-spacing:-.01em; }
.font-zh { font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif; }

.iqms * { box-sizing:border-box; }
.iqms a { text-decoration:none; color:inherit; }
.iqms ul { list-style:none; padding:0; margin:0; }
.iqms .container { max-width: 1240px; margin:0 auto; padding: 0 24px; }

/* HEADER */
.header { position: sticky; top:0; z-index:100;
  background: rgba(255,255,255,.85); backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(12,27,51,.06); transition: all .3s; }
.header.scrolled { box-shadow: var(--shadow-sm); background: rgba(255,255,255,.95); }
.header-inner { display:flex; align-items:center; justify-content:space-between; gap:20px; padding: 14px 24px; }
.logo { display:flex; align-items:center; gap:12px; }
.logo-icon { width:46px; height:46px; border-radius:14px; background: var(--grad);
  display:grid; place-items:center; color:#fff; font-size:20px; box-shadow: var(--shadow-md); }
.logo .brand { font-weight:800; font-size:16px; color:var(--ink); line-height:1.2; }
.logo .slogan { font-size:11px; color:var(--muted); margin-top:2px; }
.nav-right { display:flex; align-items:center; gap:14px; }
.nav-menu { display:flex; align-items:center; gap:6px; }
.nav-menu a { padding: 9px 14px; border-radius: 10px; font-size:14px; font-weight:500;
  color: var(--ink-2); transition: all .2s; }
.nav-menu a:hover { background: var(--grad-soft); color: var(--brand); }
.nav-menu .nav-cta { background: var(--grad); color:#fff; padding:10px 18px;
  box-shadow: 0 8px 20px rgba(30,108,243,.35); }
.nav-menu .nav-cta:hover { transform: translateY(-1px); color:#fff; }

.lang-wrap { position:relative; }
.lang-btn { display:flex; align-items:center; gap:8px; padding: 9px 14px;
  border-radius: 10px; background:#fff; border:1px solid rgba(12,27,51,.10);
  cursor:pointer; font-weight:600; font-size:13px; color: var(--ink); transition:.2s; }
.lang-btn:hover { border-color: var(--brand); color: var(--brand); }
.lang-btn .chev { font-size:10px; opacity:.6; }
.lang-menu { position:absolute; top: calc(100% + 8px); inset-inline-end: 0;
  background:#fff; border-radius: 14px; box-shadow: var(--shadow-lg);
  border:1px solid rgba(12,27,51,.06); padding:6px; min-width: 180px; z-index:10; }
.lang-item { display:flex; align-items:center; gap:10px; width:100%; padding:10px 12px;
  background:transparent; border:none; cursor:pointer; border-radius:10px;
  font-size:14px; color: var(--ink); font-family:inherit; text-align:start; }
.lang-item:hover { background: var(--grad-soft); }
.lang-item.active { background: var(--grad-soft); color: var(--brand); font-weight:600; }
.lang-item .flag { font-size:18px; }
.lang-item .ok { margin-inline-start:auto; color: var(--brand); }

.nav-toggle { display:none; background:transparent; border:none; font-size:22px; color: var(--ink); cursor:pointer; }

/* HERO */
.hero { position:relative; overflow:hidden; padding: 70px 0 90px; }
.hero-bg { position:absolute; inset:0; z-index:0;
  background: radial-gradient(60% 60% at 80% 0%, rgba(34,200,196,.18), transparent 60%),
              radial-gradient(60% 60% at 0% 30%, rgba(30,108,243,.18), transparent 60%),
              linear-gradient(180deg, #f6f8fc 0%, #eef3fb 100%); }
.hero-inner { position:relative; z-index:1; display:grid; grid-template-columns: 1.1fr .9fr; gap:60px; align-items:center; }
.tag { display:inline-flex; align-items:center; gap:8px; padding: 7px 14px;
  background: rgba(255,255,255,.7); border:1px solid rgba(30,108,243,.2);
  border-radius: 999px; color: var(--brand-deep); font-weight:600; font-size:13px; margin-bottom:20px; }
.hero-content h1 { font-size: clamp(30px, 4.5vw, 52px); line-height:1.15; font-weight:800;
  color: var(--ink); margin-bottom: 22px; letter-spacing:-.02em; }
.hero-content h1 .accent { background: var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
.hero-content p { font-size: 17px; color: var(--ink-2); margin-bottom: 32px; max-width: 560px; }
.hero-buttons { display:flex; gap:14px; flex-wrap:wrap; }
.btn-primary, .btn-secondary { display:inline-flex; align-items:center; gap:10px;
  padding: 14px 26px; border-radius: 12px; font-weight:600; font-size:15px;
  cursor:pointer; transition: all .25s; border:none; font-family:inherit; }
.btn-primary { background: var(--grad); color:#fff;
  box-shadow: 0 14px 30px rgba(30,108,243,.35); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 40px rgba(30,108,243,.45); }
.btn-primary.full { width:100%; justify-content:center; }
.btn-secondary { background:#fff; color: var(--brand-deep); border:1px solid rgba(30,108,243,.25); }
.btn-secondary:hover { border-color: var(--brand); color: var(--brand); }

.hero-visual { position:relative; display:flex; justify-content:center; align-items:center; min-height:380px; }
.orb { position:absolute; border-radius:50%; filter: blur(40px); opacity:.7; }
.orb-1 { width:260px; height:260px; background: var(--brand-2); top:-20px; inset-inline-end: 10px; }
.orb-2 { width:220px; height:220px; background: var(--accent); bottom:-20px; inset-inline-start: 20px; }
.hero-card { position:relative; background: rgba(255,255,255,.85); backdrop-filter: blur(20px);
  border:1px solid rgba(255,255,255,.6); border-radius: 24px; padding: 28px;
  box-shadow: var(--shadow-lg); display:flex; flex-direction:column; gap:20px; width:100%; max-width: 360px; }
.hero-card-row { display:flex; align-items:center; gap:16px; padding:14px;
  border-radius: 16px; background: linear-gradient(135deg, #fff, #f6f8fc); border:1px solid rgba(12,27,51,.05); }
.hero-badge { width:50px; height:50px; border-radius:14px; display:grid; place-items:center;
  background: var(--grad); color:#fff; font-size:20px; box-shadow: 0 8px 20px rgba(30,108,243,.3); }
.hero-badge.green { background: linear-gradient(135deg, #16a34a, #22c55e); box-shadow: 0 8px 20px rgba(34,197,94,.35); }
.hero-badge.orange { background: linear-gradient(135deg, #ea580c, #f59e0b); box-shadow: 0 8px 20px rgba(245,158,11,.35); }
.hc-title { font-weight:800; color: var(--ink); font-size:16px; }
.hc-sub { font-size:12px; color: var(--muted); margin-top:2px; }

/* SECTIONS */
.section { padding: 90px 0; position:relative; }
.section-alt { background: #eef3fb; }
.section-dark { background: linear-gradient(135deg, #0a1f44 0%, #0a3eaa 100%); color:#fff; }
.section-title { text-align:center; margin-bottom: 56px; }
.section-title h2 { font-size: clamp(28px, 3.4vw, 40px); font-weight:800; color: var(--ink);
  margin-bottom: 12px; letter-spacing:-.01em; }
.section-title h2 .accent { background: var(--grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
.section-title p { color: var(--muted); font-size:16px; max-width: 640px; margin: 0 auto; }
.section-title.dark h2 { color:#fff; }
.section-title.dark h2 .accent { background: linear-gradient(135deg,#22c8c4,#5b9bff); -webkit-background-clip:text; background-clip:text; color:transparent; }
.section-title.dark p { color: rgba(255,255,255,.75); }

/* ABOUT */
.about-grid { display:grid; grid-template-columns: 1.2fr 1fr; gap:50px; align-items:start; }
.about-text p { color: var(--ink-2); font-size:16px; margin-bottom:16px; }
.about-text ul li { display:flex; align-items:center; gap:12px; padding:10px 0;
  color: var(--ink); font-weight:500; }
.about-text ul li i { color: var(--accent); font-size:18px; }
.vision-box { display:grid; gap:16px; }
.vb-item { padding: 24px; background:#fff; border-radius: var(--radius);
  box-shadow: var(--shadow-sm); border-inline-start: 4px solid var(--brand);
  transition:.3s; }
.vb-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.vb-item h4 { display:flex; align-items:center; gap:10px; color: var(--brand-deep);
  font-weight:700; margin-bottom:8px; font-size:16px; }
.vb-item p { color: var(--ink-2); font-size:14px; }

/* WHY */
.why-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:24px; }
.why-card { background:#fff; padding: 32px 24px; border-radius: var(--radius);
  box-shadow: var(--shadow-sm); text-align:center; transition: .3s; border:1px solid transparent; }
.why-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: rgba(30,108,243,.15); }
.why-card .icon { width:64px; height:64px; border-radius:18px; margin:0 auto 18px;
  display:grid; place-items:center; background: var(--grad); color:#fff; font-size:26px;
  box-shadow: 0 12px 24px rgba(30,108,243,.3); }
.why-card h4 { font-size:18px; color: var(--ink); margin-bottom:10px; font-weight:700; }
.why-card p { color: var(--muted); font-size:14px; }

/* PROCESS */
.process-grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:24px; }
.process-step { position:relative; background:#fff; padding: 32px 24px; border-radius: var(--radius);
  box-shadow: var(--shadow-sm); transition:.3s; overflow:hidden; }
.process-step::before { content:""; position:absolute; inset:0 0 auto 0; height:4px; background: var(--grad); }
.process-step:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.process-step .number { width:48px; height:48px; border-radius:14px; background: var(--grad-soft);
  color: var(--brand-deep); display:grid; place-items:center; font-weight:800; font-size:20px; margin-bottom:16px; }
.process-step h5 { font-size:17px; color: var(--ink); margin-bottom:8px; font-weight:700; }
.process-step p { color: var(--muted); font-size:14px; }

/* BENEFITS */
.benefits-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:24px; }
.benefit-item { background: rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12);
  padding: 36px 20px; border-radius: var(--radius); text-align:center; backdrop-filter: blur(10px); transition:.3s; }
.benefit-item:hover { background: rgba(255,255,255,.14); transform: translateY(-4px); }
.benefit-item .stat { display:block; font-size: 48px; font-weight:900;
  background: linear-gradient(135deg, #22c8c4, #5b9bff);
  -webkit-background-clip:text; background-clip:text; color:transparent; margin-bottom:6px; letter-spacing:-.02em; }
.benefit-item .label { color: rgba(255,255,255,.85); font-size:14px; font-weight:500; }

/* SERVICES */
.services-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:24px; }
.service-card { background:#fff; padding: 32px 24px; border-radius: var(--radius);
  box-shadow: var(--shadow-sm); transition:.3s; position:relative; overflow:hidden; }
.service-card::after { content:""; position:absolute; top:0; inset-inline-start:0; width:100%; height:0;
  background: var(--grad-soft); transition:.4s; z-index:0; }
.service-card:hover::after { height:100%; }
.service-card > * { position:relative; z-index:1; }
.service-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); }
.service-card .icon { display:inline-grid; place-items:center; width:60px; height:60px;
  border-radius:16px; background: var(--grad); color:#fff; font-size:24px; margin-bottom:16px;
  box-shadow: 0 10px 22px rgba(30,108,243,.3); }
.service-card h4 { font-size:17px; color: var(--ink); margin-bottom:10px; font-weight:700; }
.service-card p { color: var(--muted); font-size:14px; }

/* CONTACT */
.contact-grid { display:grid; grid-template-columns: 1.2fr 1fr; gap:40px; }
.contact-form { background:#fff; padding: 36px; border-radius: 22px; box-shadow: var(--shadow-md); }
.contact-form > h4 { display:flex; align-items:center; gap:10px; color: var(--brand-deep);
  font-size:20px; margin-bottom:24px; font-weight:700; }
.form-group { margin-bottom:18px; }
.form-row { display:grid; grid-template-columns: 1fr 1fr; gap:16px; }
.form-group label { display:block; font-weight:600; font-size:13px;
  color: var(--ink-2); margin-bottom:8px; }
.form-group input, .form-group select, .form-group textarea {
  width:100%; padding: 13px 14px; border-radius:12px; border:1.5px solid #e2e8f0;
  background:#f8fafc; font-size:14px; font-family:inherit; color: var(--ink); transition:.2s; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline:none; border-color: var(--brand); background:#fff; box-shadow: 0 0 0 4px rgba(30,108,243,.1); }
.form-group textarea { min-height:120px; resize:vertical; }

.contact-info { display:flex; flex-direction:column; gap:18px; }
.info-item { display:flex; align-items:flex-start; gap:16px; padding:24px;
  background:#fff; border-radius: var(--radius); box-shadow: var(--shadow-sm); transition:.3s; }
.info-item:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.info-icon { width:48px; height:48px; border-radius:14px; flex-shrink:0;
  display:grid; place-items:center; background: var(--grad-soft); color: var(--brand); font-size:18px; }
.info-item h5 { color: var(--ink); font-size:15px; margin-bottom:6px; font-weight:700; }
.info-item p { color: var(--ink-2); font-size:14px; }
.info-item p.muted { color: var(--muted); font-size:12px; margin-top:2px; }

/* FOOTER */
.footer { background: #07142e; color: rgba(255,255,255,.75); padding: 70px 0 24px; }
.footer-grid { display:grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap:40px; margin-bottom: 50px; }
.footer-col h5 { color:#fff; font-size:15px; margin-bottom:20px; display:flex; align-items:center; gap:10px;
  font-weight:700; }
.footer-col h5 i { color: var(--brand-2); }
.footer-col ul li { margin-bottom: 10px; }
.footer-col ul li a { color: rgba(255,255,255,.65); font-size:14px; transition:.2s;
  display:inline-flex; align-items:center; gap:8px; }
.footer-col ul li a:hover { color:#fff; }
.footer-bottom { padding-top:24px; border-top:1px solid rgba(255,255,255,.1);
  display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;
  color: rgba(255,255,255,.55); font-size:13px; }
.socials { display:flex; gap:10px; }
.socials a { width:36px; height:36px; border-radius:50%; background: rgba(255,255,255,.08);
  display:grid; place-items:center; color:#fff; transition:.2s; }
.socials a:hover { background: var(--brand); transform: translateY(-2px); }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; gap:50px; }
  .hero-visual { min-height: 320px; }
  .about-grid, .contact-grid { grid-template-columns: 1fr; }
  .why-grid, .services-grid, .benefits-grid { grid-template-columns: repeat(2,1fr); }
  .process-grid { grid-template-columns: repeat(2,1fr); }
  .footer-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 768px) {
  .nav-toggle { display:block; }
  .nav-menu { position:fixed; top:74px; inset-inline-end: 16px; inset-inline-start: 16px;
    flex-direction:column; align-items:stretch; background:#fff; padding:16px; border-radius:18px;
    box-shadow: var(--shadow-lg); transform: translateY(-20px); opacity:0; pointer-events:none; transition:.25s; }
  .nav-menu.open { transform: translateY(0); opacity:1; pointer-events:auto; }
  .logo .slogan { display:none; }
  .logo .brand { font-size:14px; }
  .section { padding: 60px 0; }
  .why-grid, .services-grid, .benefits-grid, .process-grid, .form-row, .footer-grid {
    grid-template-columns: 1fr; }
  .contact-form { padding:24px; }
  .footer-bottom { justify-content:center; text-align:center; }
}

/* LOGIN BUTTON + MODAL */
.enter-btn { display:inline-flex; align-items:center; gap:8px; padding: 9px 16px;
  border-radius: 10px; background: linear-gradient(135deg,#0a3eaa,#1e6cf3); color:#fff;
  border:none; cursor:pointer; font-weight:600; font-size:13px; font-family:inherit;
  box-shadow: 0 8px 18px rgba(30,108,243,.35); transition:.2s; }
.enter-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(30,108,243,.45); }
.login-overlay { position:fixed; inset:0; z-index:1000; background: rgba(7,20,46,.65);
  backdrop-filter: blur(8px); display:grid; place-items:center; padding:20px;
  animation: fadeIn .2s ease; }
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
.login-modal { background:#fff; border-radius: 22px; padding: 32px; width:100%; max-width: 420px;
  box-shadow: 0 30px 80px rgba(0,0,0,.4); position:relative;
  animation: slideUp .25s cubic-bezier(.2,.8,.3,1.2); }
@keyframes slideUp { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }
.login-close { position:absolute; top:14px; inset-inline-end:14px; width:34px; height:34px;
  border-radius:10px; background:#f1f5f9; border:none; cursor:pointer; color: var(--ink-2);
  font-size:16px; transition:.2s; }
.login-close:hover { background:#e2e8f0; color: var(--ink); }
.login-head { text-align:center; margin-bottom: 22px; }
.login-icon { width:64px; height:64px; border-radius:18px; margin:0 auto 14px;
  background: var(--grad); color:#fff; display:grid; place-items:center; font-size:26px;
  box-shadow: 0 14px 28px rgba(30,108,243,.4); }
.login-head h3 { font-size:22px; font-weight:800; color: var(--ink); margin:0 0 6px; }
.login-head p { color: var(--muted); font-size:14px; margin:0; }
.login-form .form-group { margin-bottom:14px; }
.pwd-wrap { position:relative; }
.pwd-wrap .pwd-input { width:100%; padding-inline-end:42px !important; }
.pwd-toggle { position:absolute; top:50%; inset-inline-end:8px; transform:translateY(-50%);
  background:transparent; border:none; width:32px; height:32px; border-radius:8px;
  display:grid; place-items:center; color:#6c819b; cursor:pointer; font-size:14px; }
.pwd-toggle:hover { background:rgba(30,108,243,.08); color:#1e6cf3; }
.login-err { display:flex; align-items:center; gap:8px; padding:10px 12px;
  background:#fef2f2; color:#dc2626; border:1px solid #fecaca; border-radius:10px;
  font-size:13px; margin-bottom:14px; }
.btn-primary.full[disabled] { opacity:.7; cursor:not-allowed; }
.login-demo { margin-top:14px; padding:10px 12px; background: var(--grad-soft);
  border:1px solid rgba(30,108,243,.15); border-radius:10px; font-size:12px;
  color: var(--brand-deep); display:flex; gap:8px; align-items:flex-start; line-height:1.6; }
.login-settings-toggle { margin-top: 12px; background:transparent; border:none; cursor:pointer;
  color: var(--muted); font-size:12px; font-family:inherit; display:inline-flex; align-items:center; gap:6px; }
.login-settings-toggle:hover { color: var(--brand); }
.login-settings { margin-top: 10px; padding:12px; background:#f8fafc; border-radius:10px;
  border:1px solid #e2e8f0; }
.login-settings label { font-size:12px; color: var(--muted); font-weight:600; display:block; margin-bottom:6px; }
.settings-row { display:flex; gap:8px; }
.settings-row input { flex:1; padding:8px 10px; border:1px solid #e2e8f0; border-radius:8px;
  font-size:12px; font-family:inherit; background:#fff; }
.settings-row button { padding: 8px 14px; background: var(--brand); color:#fff; border:none;
  border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; font-family:inherit; }
@media (max-width: 768px) {
  .enter-btn span { display:none; }
  .enter-btn { padding: 9px 11px; }
}
`;
