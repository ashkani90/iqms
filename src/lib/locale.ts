/* Shared i18n + date utilities + user storage helpers */
import { useEffect, useState } from "react";

export type Lang = "fa" | "en" | "zh";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export const LANG_DIR: Record<Lang, "rtl" | "ltr"> = { fa: "rtl", en: "ltr", zh: "ltr" };
export const FONT_CLASS: Record<Lang, string> = { fa: "font-fa", en: "font-en", zh: "font-zh" };

const LANG_EVT = "iqms-lang-change";
const USER_EVT = "iqms-user-change";

export function getLang(): Lang {
  if (typeof window === "undefined") return "fa";
  const v = localStorage.getItem("iqms-lang") as Lang | null;
  return v && LANG_DIR[v] ? v : "fa";
}

export function setLangGlobal(l: Lang) {
  localStorage.setItem("iqms-lang", l);
  document.documentElement.lang = l;
  document.documentElement.dir = LANG_DIR[l];
  window.dispatchEvent(new CustomEvent(LANG_EVT, { detail: l }));
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("fa");
  useEffect(() => {
    setLang(getLang());
    const h = (e: Event) => setLang((e as CustomEvent).detail as Lang);
    const s = () => setLang(getLang());
    window.addEventListener(LANG_EVT, h);
    window.addEventListener("storage", s);
    return () => {
      window.removeEventListener(LANG_EVT, h);
      window.removeEventListener("storage", s);
    };
  }, []);
  return [lang, setLangGlobal];
}

/* ---------- User session ---------- */
export type SessionUser = {
  id: number;
  username: string;
  full_name?: string;
  email?: string;
  phone?: string;
  role: string;
  department?: string;
  profile_image?: string;
  is_active?: boolean;
  last_login?: string;
};

export function getUser(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("iqms-user");
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
}

export function setUserGlobal(u: SessionUser | null) {
  if (u) localStorage.setItem("iqms-user", JSON.stringify(u));
  else localStorage.removeItem("iqms-user");
  window.dispatchEvent(new CustomEvent(USER_EVT, { detail: u }));
}

export function useUser(): SessionUser | null {
  const [user, setUser] = useState<SessionUser | null>(null);
  useEffect(() => {
    setUser(getUser());
    const h = (e: Event) => setUser(((e as CustomEvent).detail as SessionUser) ?? null);
    const s = () => setUser(getUser());
    window.addEventListener(USER_EVT, h);
    window.addEventListener("storage", s);
    return () => {
      window.removeEventListener(USER_EVT, h);
      window.removeEventListener("storage", s);
    };
  }, []);
  return user;
}

/* ---------- Date formatting ---------- */
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const toFa = (s: string | number) => String(s).replace(/\d/g, (d) => FA_DIGITS[+d]);

function gregorianToJalali(gy: number, gm: number, gd: number) {
  const g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    Math.floor((gy2 + 3) / 4) -
    Math.floor((gy2 + 99) / 100) +
    Math.floor((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return { jy, jm, jd };
}

export function formatDate(lang: Lang, d: Date = new Date()): string {
  if (lang === "fa") {
    const { jy, jm, jd } = gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate());
    return toFa(`${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`);
  }
  if (lang === "zh") {
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  }
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function formatTime(lang: Lang, d: Date = new Date()): string {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return lang === "fa" ? toFa(`${hh}:${mm}`) : `${hh}:${mm}`;
}
