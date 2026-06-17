-- IQMS — Database schema for XAMPP (MySQL/MariaDB)
-- Import via phpMyAdmin → Import → select this file
-- Or:  mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS `iqms`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `iqms`;

-- Drop old simple table if it exists (development convenience)
-- DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `username`       VARCHAR(64)  NOT NULL UNIQUE,
  `password_hash`  VARCHAR(255) NOT NULL,
  `full_name`      VARCHAR(128) DEFAULT NULL,
  `email`          VARCHAR(128) DEFAULT NULL UNIQUE,
  `phone`          VARCHAR(32)  DEFAULT NULL,
  `role`           ENUM('admin','manager','technician','operator','user') NOT NULL DEFAULT 'user',
  `department`     VARCHAR(64)  DEFAULT NULL,
  `profile_image`  VARCHAR(255) DEFAULT NULL,   -- relative path or URL (e.g. /uploads/avatars/u1.jpg)
  `is_active`      TINYINT(1)   NOT NULL DEFAULT 1,
  `last_login`     DATETIME     DEFAULT NULL,
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_department` (`department`),
  INDEX `idx_users_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Demo accounts.
-- Passwords are stored as plain text here ONLY for local demo convenience —
-- login.php accepts both PHP `password_hash()` values and plain matches.
-- For production: hash with `password_hash('your-pass', PASSWORD_DEFAULT)`.
INSERT INTO `users`
  (`username`, `password_hash`, `full_name`,           `email`,                `phone`,        `role`,      `department`,  `profile_image`, `is_active`)
VALUES
  ('admin',    'admin123',     'محمد پورسان دلیر',     'admin@cmms.local',     '09120000001',  'admin',     'مدیریت',      NULL, 1),
  ('manager',  'manager123',   'فضل الله جمالی',       'manager@cmms.local',   '09120000002',  'manager',   'مدیر کارخانه', NULL, 1),
  ('tech3',    'tech123',      'تکنسین ابزار دقیق',    'tech3@cmms.local',     '09120000003',  'technician','تعمیرات',     NULL, 1),
  ('operator3','op123',        'فضل الله جمالی',       'op3@cmms.local',       '09120000004',  'operator',  'مدیریت',      NULL, 1),
  ('user',     'user123',      'کاربر عادی',          'user@cmms.local',      '09120000005',  'user',      'عمومی',       NULL, 1)
ON DUPLICATE KEY UPDATE
  `password_hash` = VALUES(`password_hash`),
  `full_name`     = VALUES(`full_name`),
  `email`         = VALUES(`email`),
  `phone`         = VALUES(`phone`),
  `role`          = VALUES(`role`),
  `department`    = VALUES(`department`),
  `is_active`     = VALUES(`is_active`);
