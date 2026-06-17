# راه‌اندازی دیتابیس ورود با XAMPP

این پوشه شامل فایل‌های لازم برای راه‌اندازی بک‌اند ورود کاربران با استفاده از **XAMPP** (Apache + MySQL + PHP) است.

## ۱) نصب XAMPP

از سایت رسمی دانلود و نصب کنید: <https://www.apachefriends.org>

پس از نصب، **XAMPP Control Panel** را باز کرده و دو سرویس را روشن کنید:
- **Apache**
- **MySQL**

## ۲) ساخت دیتابیس

1. در مرورگر باز کنید: <http://localhost/phpmyadmin>
2. روی تب **Import** کلیک کنید.
3. فایل `schema.sql` (موجود در همین پوشه) را انتخاب و **Go** را بزنید.

این کار دیتابیس `iqms` و جدول کامل `users` را با فیلدهای زیر می‌سازد:

| فیلد | نوع | توضیح |
|------|-----|------|
| `id` | INT PK | شناسه یکتا |
| `username` | VARCHAR(64) UNIQUE | نام کاربری ورود |
| `password_hash` | VARCHAR(255) | هش رمز عبور (با `password_hash()` PHP) |
| `full_name` | VARCHAR(128) | نام و نام خانوادگی |
| `email` | VARCHAR(128) UNIQUE | ایمیل |
| `phone` | VARCHAR(32) | شماره تماس |
| `role` | ENUM | admin / manager / technician / operator / user |
| `department` | VARCHAR(64) | دپارتمان |
| `profile_image` | VARCHAR(255) | مسیر تصویر پروفایل (مثلاً `/uploads/avatars/u1.jpg`) |
| `is_active` | TINYINT(1) | فعال/غیرفعال |
| `last_login` | DATETIME | آخرین ورود (به‌صورت خودکار بروز می‌شود) |
| `created_at` | TIMESTAMP | تاریخ ایجاد |
| `updated_at` | TIMESTAMP | تاریخ بروزرسانی (ON UPDATE) |

و کاربران نمونه برای تست:

| نام کاربری  | رمز عبور     | نقش        |
|-------------|--------------|------------|
| `admin`     | `admin123`   | admin      |
| `manager`   | `manager123` | manager    |
| `tech3`     | `tech123`    | technician |
| `operator3` | `op123`      | operator   |
| `user`      | `user123`    | user       |

### آپلود تصویر پروفایل
در صفحه‌ی مدیریت کاربران (که در گام بعدی ساخته می‌شود) تصویر کاربر در پوشه‌ی زیر ذخیره خواهد شد و مسیر آن در ستون `profile_image` ثبت می‌گردد:

```
htdocs/iqms/uploads/avatars/
```

این پوشه را از قبل بسازید و دسترسی نوشتن (write) به آن بدهید.


## ۳) قرار دادن فایل‌های PHP

پوشه `iqms` را در مسیر `htdocs` کپی کنید:

- **Windows:** `C:\xampp\htdocs\iqms\`
- **macOS:** `/Applications/XAMPP/htdocs/iqms/`
- **Linux:** `/opt/lampp/htdocs/iqms/`

ساختار نهایی:
```
htdocs/
└── iqms/
    ├── config.php
    └── login.php
```

برای راحتی، فقط محتوای پوشه `xampp/` (به جز `schema.sql` و `README.md`) را در `htdocs/iqms/` بریزید.

## ۴) تنظیم اطلاعات اتصال

در صورت نیاز فایل `config.php` را ویرایش کنید (مقادیر پیش‌فرض برای XAMPP):

```php
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASS = '';
$DB_NAME = 'iqms';
```

## ۵) تست API ورود

این آدرس را در مرورگر یا Postman تست کنید:

```
POST http://localhost/iqms/login.php
Content-Type: application/json

{ "username": "admin", "password": "admin123" }
```

پاسخ موفق:
```json
{ "ok": true, "user": { "id": 1, "username": "admin", "role": "admin" } }
```

## ۶) اتصال برنامه به این API

برنامه به صورت پیش‌فرض به آدرس زیر درخواست می‌فرستد:

```
http://localhost/iqms/login.php
```

اگر آدرس متفاوتی استفاده می‌کنید، در پنجره ورود روی دکمه ⚙ کلیک کرده و آدرس جدید را وارد کنید (در `localStorage` ذخیره می‌شود).

> 💡 **حالت آفلاین:** اگر XAMPP در دسترس نباشد، برنامه به صورت خودکار از کاربران نمونه بالا برای ورود استفاده می‌کند تا بتوانید بدون نصب XAMPP هم برنامه را آزمایش کنید.
