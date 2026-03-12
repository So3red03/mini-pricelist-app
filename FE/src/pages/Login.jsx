import { useNavigate } from 'react-router-dom';
import './login.css';
import { MEDIA } from '../constants/index';
import { useLogin } from '../hooks/useLogin';

function LoginPage() {
  const navigate = useNavigate();
  const {
    languages,
    selectedLanguage,
    setSelectedLanguage,
    showLanguageMenu,
    setShowLanguageMenu,
    showPassword,
    setShowPassword,
    form,
    errors,
    serverMessage,
    isSubmitting,
    isRedirecting,
    handleInputChange,
    handleSubmit,
    navLinks,
    t,
    languageMenuRef
  } = useLogin(navigate);

  return (
    <div className='login-page' style={{ backgroundImage: `url(${MEDIA.wallpaper})` }}>
      <header className='login-header'>
        <img src={MEDIA.diamond} alt='Diamond icon' className='login-diamond' loading='lazy' />
        <nav className='nav-links'>
          {navLinks.map(item => (
            <a key={item.key} href='#'>
              {item.label}
            </a>
          ))}
        </nav>
        <div className='language-picker' ref={languageMenuRef} onClick={() => setShowLanguageMenu(prev => !prev)}>
          <span>{languages.find(lng => lng.code === selectedLanguage)?.label}</span>
          <img src={MEDIA.flags[selectedLanguage]} alt={selectedLanguage} />
          {showLanguageMenu && (
            <div className='language-menu'>
              {languages.map(lang => (
                <button
                  type='button'
                  key={lang.code}
                  onClick={() => {
                    setSelectedLanguage(lang.code);
                    setShowLanguageMenu(false);
                  }}
                >
                  <span>{lang.label}</span>
                  <img src={lang.flag} alt={lang.label} />
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className='login-main'>
        <form className='login-card' onSubmit={handleSubmit}>
          <h1>{t('login_title')}</h1>
          <p className='login-subtitle'>{t('login_subtitle')}</p>

          <label>
            <span>{t('email_label')}</span>
            <input
              type='email'
              name='email'
              placeholder={t('email_placeholder')}
              value={form.email}
              onChange={handleInputChange}
              className={errors.email ? 'has-error' : ''}
            />
            {errors.email && <small className='error-text'>{errors.email}</small>}
          </label>

          <label>
            <span>{t('password_label')}</span>
            <div className={`password-field ${errors.password ? 'has-error' : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder={t('password_placeholder')}
                value={form.password}
                onChange={handleInputChange}
              />
              <button
                type='button'
                className='toggle-password'
                aria-label='Toggle password visibility'
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <small className='error-text'>{errors.password}</small>}
          </label>

          {serverMessage && <div className='server-message'>{serverMessage}</div>}

          <button type='submit' disabled={isSubmitting || isRedirecting}>
            {isSubmitting ? 'Logging in...' : isRedirecting ? 'Redirecting...' : t('login_button')}
          </button>

          <div className='login-links'>
            <a href='#register'>{t('register_link')}</a>
            <a href='#forgot'>{t('forgot_link')}</a>
          </div>
        </form>
      </main>

      <footer className='login-footer'>
        <span className='logo'>123 Fakturera</span>
        <span className='footer-copy'>{t('footer_copy')}</span>
        <div className='footer-links'>
          <a href='#home'>{t('nav_home')}</a>
          <a href='#order'>{t('nav_order')}</a>
          <a href='#contact'>{t('nav_contact')}</a>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
