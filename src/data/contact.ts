/**
 * Canales de contacto y redes. Rellena las URLs reales cuando existan:
 * los enlaces vacíos NO se muestran (nunca se publica un `href="#"`).
 *
 * Ejemplos:
 *   whatsapp: 'https://wa.me/34600000000'
 *   instagram: 'https://www.instagram.com/casabalseca'
 *   email: 'mailto:hola@casabalseca.com'
 */
export const CONTACT = {
  whatsapp: '',
  instagram: '',
  facebook: '',
  email: '',
};

/** Web del distribuidor. */
export const MOG_URL = 'https://www.mogselections.com';

/** Redes / contacto configurados, en el orden en que se muestran. */
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: CONTACT.instagram },
  { label: 'Facebook', href: CONTACT.facebook },
  { label: 'Contacto', href: CONTACT.email },
].filter((l) => l.href);
