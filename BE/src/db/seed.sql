insert into users (email, password_hash)
values ('lettfaktura@gmail.com', '$2b$10$o5hqwiVIfebz9cU4iCa.Ze3fsidUfvHy1fWSCKB.1G2pc81j0nKb2')
on conflict (email) do update set password_hash = excluded.password_hash;

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
  ('login_title', 'Log in', 'Logga in'),
  ('login_subtitle', 'Sign in to manage your pricelist', U&'Logga in f\00F6r att hantera din prislista'),
  ('email_label', 'Enter your email address', 'Skriv in din epost adress'),
  ('email_placeholder', 'Email address', 'Epost adress'),
  ('email_error', 'Please enter a valid email address', U&'V\00E4nligen skriv in en giltig epost adress'),
  ('password_label', 'Enter your password', U&'Skriv in ditt l\00F6senord'),
  ('password_placeholder', 'Password', U&'L\00F6senord'),
  ('password_error', 'This field cannot be empty', U&'Detta f\00E4lt kan inte vara tomt'),
  ('login_button', 'Log in', 'Logga in'),
  ('register_link', 'Register', 'Registrera dig'),
  ('forgot_link', 'Forgotten password?', U&'Gl\00F6mt l\00F6senord?'),
  ('nav_home', 'Home', 'Hem'),
  ('nav_order', 'Order', U&'Best\00E4ll'),
  ('nav_customers', 'Our Customers', U&'V\00E5ra Kunder'),
  ('nav_about', 'About us', 'Om oss'),
  ('nav_contact', 'Contact Us', 'Kontakta oss'),
  ('footer_copy', U&'© L\00E4ttfaktura, CRO no. 638537, 2025. All rights reserved.', U&'© L\00E4ttfaktura, CRO no. 638537, 2025. All rights reserved.'),
  ('logout_button', 'Log out', 'Logga ut'),
  ('products_title', 'Pricelist', 'Prislista')
on conflict (key) do update set
  en = excluded.en,
  sv = excluded.sv;


