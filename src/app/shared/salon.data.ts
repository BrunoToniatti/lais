export const WHATSAPP_NUMBER = '5511961006415';
export const INSTAGRAM_URL = 'https://www.instagram.com/lalashdesignerr/';

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** Formata como "R$ 135,00" (troca o espaço especial do Intl por espaço comum). */
export function formatPrice(value: number): string {
  return brl.format(value).replace(/ /g, ' ');
}

export interface LashStyle {
  name: string;
  img: string;
  price: number;
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  img: string;
  price: number;
  description: string;
  cta: string;
  message: string;
}

export interface PackageItem {
  name: string;
  price: number;
  featured?: boolean;
}

export const LASH_STYLES: LashStyle[] = [
  { name: 'Volume Brasileiro', img: 'assets/cilios/brasileiro.png', price: 135, description: 'Fios em Y para um preenchimento cheio e natural.' },
  { name: 'Volume Inglês', img: 'assets/cilios/ingles.jpg', price: 135, description: 'Volume elegante, com acabamento definido.' },
  { name: 'Volume Glamour', img: 'assets/cilios/glamour.png', price: 135, description: 'Densidade intensa para um olhar marcante.' },
  { name: 'Volume Wispy', img: 'assets/cilios/wispy.png', price: 135, description: 'Pontas texturizadas e efeito esfumado.' },
  { name: 'Estilo Fox Eyes', img: 'assets/cilios/fox.png', price: 135, description: 'Olhar alongado e sofisticado.' },
  { name: 'Estilo Fio a Fio', img: 'assets/cilios/fioafio.png', price: 135, description: 'Leve e discreto, um fio para cada fio natural.' },
];

export const CARE_SERVICES: ServiceItem[] = [
  {
    id: 'manutencion',
    title: 'Manutenção de Cílios',
    img: 'assets/cilios/manutencao.png',
    price: 95,
    description:
      'Essencial para manter os cílios cheios e com o mesmo efeito da aplicação inicial. Indicada entre 15 e 20 dias após a aplicação, respeitando o crescimento natural dos fios.',
    cta: 'Agendar manutenção',
    message: 'Olá! Gostaria de agendar uma manutenção de cílios.',
  },
  {
    id: 'remove',
    title: 'Remoção de Cílios',
    img: 'assets/cilios/remocao.png',
    price: 40,
    description:
      'Remoção segura, indolor e sem danificar os cílios naturais. Evite puxar ou tentar remover sozinha: isso pode causar danos aos seus olhos.',
    cta: 'Agendar remoção',
    message: 'Olá! Gostaria de agendar uma remoção de cílios.',
  },
];

export const PACKAGES: PackageItem[] = [
  { name: 'Pacote manutenção', price: 62 },
  { name: 'Pacote cílios', price: 125, featured: true },
];
