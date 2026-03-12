import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { MEDIA } from '../constants/index'
import { useLogin } from '../hooks/useLogin'

const EyeOpenIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <path
      d='M2.2 12s3.7-6.2 9.8-6.2 9.8 6.2 9.8 6.2-3.7 6.2-9.8 6.2S2.2 12 2.2 12z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <circle cx='12' cy='12' r='2.8' fill='none' stroke='currentColor' strokeWidth='1.8' />
  </svg>
)

const EyeClosedIcon = () => (
  <svg viewBox='0 0 24 24' aria-hidden='true'>
    <path
      d='M2.2 12s3.7-6.2 9.8-6.2 9.8 6.2 9.8 6.2-3.7 6.2-9.8 6.2S2.2 12 2.2 12z'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path d='M4 20L20 4' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
  </svg>
)

function LoginPage() {
  const navigate = useNavigate()
  const {
    languages,
    selectedLanguage,
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
    handleFieldBlur,
    handleFieldFocus,
    handleSubmit,
    handleLanguageSelect,
    navLinks,
    t,
    languageMenuRef,
  } = useLogin(navigate)

  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    const closeOnOutside = (event) => {
      if (!mobileMenuRef.current) return
      if (mobileMenuRef.current.contains(event.target)) return
      setShowMobileMenu(false)
    }

    document.addEventListener('click', closeOnOutside)
    return () => document.removeEventListener('click', closeOnOutside)
  }, [])

  const activeLanguage = languages.find((lng) => lng.code === selectedLanguage) ?? languages[0]

  return (
    <div className='login-page' style={{ backgroundImage: `url(${MEDIA.wallpaper})` }}>
      <header className='login-header'>
        <div className='header-left' ref={mobileMenuRef}>
          <img src={MEDIA.diamond} alt='Diamond icon' className='login-diamond' loading='lazy' />

          <button
            type='button'
            className='mobile-menu-btn'
            onClick={() => setShowMobileMenu((prev) => !prev)}
            aria-label='Toggle menu'
          >
            <span />
            <span />
            <span />
          </button>

          {showMobileMenu && (
            <div className='mobile-menu-panel'>
              {navLinks.map((item) => (
                <a key={item.key} href='#' onClick={() => setShowMobileMenu(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className='header-right'>
          <nav className='nav-links'>
            {navLinks.map((item) => (
              <a key={item.key} href='#'>
                {item.label}
              </a>
            ))}
          </nav>

          <div className='language-picker' ref={languageMenuRef}>
            <button
              type='button'
              className='language-trigger'
              onClick={() => setShowLanguageMenu((prev) => !prev)}
              aria-label='Choose language'
              aria-expanded={showLanguageMenu}
            >
              <span>{activeLanguage.label}</span>
              <img src={activeLanguage.flag} alt={activeLanguage.label} />
            </button>

            {showLanguageMenu && (
              <div className='language-menu'>
                {languages.map((lang) => (
                  <button
                    type='button'
                    key={lang.code}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <span>{lang.label}</span>
                    <img src={lang.flag} alt={lang.label} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className='login-main'>
        <form className='login-card' onSubmit={handleSubmit}>
          <h1>{t('login_title')}</h1>

          <label>
            <span>{t('email_label')}</span>
            <input
              type='email'
              name='email'
              placeholder={t('email_placeholder')}
              value={form.email}
              onChange={handleInputChange}
              onFocus={handleFieldFocus}
              onBlur={handleFieldBlur}
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
                onFocus={handleFieldFocus}
                onBlur={handleFieldBlur}
              />
              <button
                type='button'
                className='toggle-password'
                aria-label='Toggle password visibility'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
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
        <div className='footer-top'>
          <span className='logo'>123 Fakturera</span>
          <div className='footer-links'>
            <a href='#home'>{t('nav_home')}</a>
            <a href='#order'>{t('nav_order')}</a>
            <a href='#contact'>{t('nav_contact')}</a>
          </div>
        </div>
        <div className='footer-divider' />
        <span className='footer-copy'>{t('footer_copy')}</span>
      </footer>
    </div>
  )
}

export default LoginPage

