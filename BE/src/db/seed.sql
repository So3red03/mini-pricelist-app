insert into users (email, password_hash)
values ('admin@lettfaktura.local', '$2b$10$V2FByYU8Bd.6lohjBkVULulHeZ8XCe9wB/o0.XLHHs7mvq24.d8OS');

insert into products (article_no, name, in_price, price, unit, in_stock, description)
values
  ('LF-001', 'Starter subscription', 20.00, 49.00, 'month', 120, 'Base tier for small businesses'),
  ('LF-002', 'Growth subscription', 45.00, 99.00, 'month', 75, 'Adds team collaboration features'),
  ('LF-003', 'Enterprise subscription', 120.00, 249.00, 'month', 15, 'Advanced reporting and support'),
  ('LF-004', 'Invoice design pack', 8.00, 19.00, 'pack', 50, 'Extra templates for invoices'),
  ('LF-005', 'Payment reminder SMS', 0.04, 0.12, 'sms', 500, 'Automated SMS reminders'),
  ('LF-006', 'Custom domain setup', 10.00, 39.00, 'setup', 20, 'Branded invoice links'),
  ('LF-007', 'Priority support', 12.00, 35.00, 'month', 30, 'Faster response times'),
  ('LF-008', 'Onboarding workshop', 60.00, 150.00, 'session', 10, 'Live onboarding for teams'),
  ('LF-009', 'Invoice translations', 3.50, 9.00, 'bundle', 40, 'Multi-language invoice pack'),
  ('LF-010', 'Receipt scanner add-on', 7.00, 18.00, 'month', 60, 'Mobile receipt capture'),
  ('LF-011', 'Project tracking module', 15.00, 35.00, 'month', 25, 'Track billable projects'),
  ('LF-012', 'Custom report export', 5.00, 14.00, 'month', 45, 'PDF/CSV custom reports'),
  ('LF-013', 'Integrations starter', 8.00, 22.00, 'month', 35, 'Connect to popular tools'),
  ('LF-014', 'VAT validation service', 1.00, 3.00, 'check', 200, 'Automatic VAT checks'),
  ('LF-015', 'API access', 25.00, 65.00, 'month', 18, 'Extended API limits'),
  ('LF-016', 'Accounting partner sync', 18.00, 55.00, 'month', 28, 'Sync to accounting partners'),
  ('LF-017', 'Data backup storage', 2.50, 7.00, 'month', 90, 'Daily encrypted backups'),
  ('LF-018', 'Team training session', 40.00, 120.00, 'session', 8, 'Remote training session'),
  ('LF-019', 'Invoice logo refresh', 6.00, 16.00, 'design', 12, 'Refresh logo for invoices'),
  ('LF-020', 'Quarterly review', 30.00, 90.00, 'review', 6, 'Business review meeting');

insert into translations (key, en, sv)
values
  ('login_title', 'Welcome back', 'Valkommen tillbaka'),
  ('login_subtitle', 'Sign in to manage your pricelist', 'Logga in for att hantera din prislista'),
  ('email_label', 'Email', 'E-post'),
  ('password_label', 'Password', 'Losenord'),
  ('login_button', 'Sign in', 'Logga in'),
  ('logout_button', 'Logga out', 'Logga ut'),
  ('products_title', 'Pricelist', 'Prislista');
