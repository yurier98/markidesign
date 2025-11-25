import type { NavigationMenuItem } from '@nuxt/ui'

export const navLinks: NavigationMenuItem[] = [{
  label: 'Inicio',
  icon: 'i-lucide-home',
  to: '/'
}, {
  label: 'Galería',
  icon: 'i-lucide-image',
  to: '/gallery'
}, {
  label: 'Historias',
  icon: 'i-lucide-newspaper',
  to: '/stories'
}, {
  label: 'Sobre mí',
  icon: 'i-lucide-user',
  to: '/about'
}]
