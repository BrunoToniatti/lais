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
  { name: 'Volume Inglês', img: 'assets/cilios/ingles.jpeg', price: 135, description: 'Volume elegante, com acabamento definido.' },
  { name: 'Volume Glamour Preto', img: 'assets/cilios/glamour.png', price: 135, description: 'Densidade intensa para um olhar marcante.' },
  { name: 'Volume Glamour Marrom', img: 'assets/cilios/glamour-marrom.jpeg', price: 135, description: 'Densidade intensa para um olhar marcante.' },
  { name: 'Volume Wispy Preto', img: 'assets/cilios/whispy.jpeg', price: 135, description: 'Pontas texturizadas e efeito esfumado.' },
  { name: 'Volume Wispy Marrom', img: 'assets/cilios/wispy-marrom.jpeg', price: 135, description: 'Pontas texturizadas e efeito esfumado.' },
  { name: 'Estilo Fox Eyes Preto', img: 'assets/cilios/fox-preto.jpeg', price: 135, description: 'Olhar alongado e sofisticado.' },
  { name: 'Estilo Fox Eyes Marrom', img: 'assets/cilios/fox-marrom.jpeg', price: 135, description: 'Leve e discreto, um fio para cada fio natural.' },
  { name: 'Estilo Fio a Fio', img: 'assets/cilios/fio-a-fio.jpeg', price: 135, description: 'Leve e discreto, um fio para cada fio natural.' },
];

export const CARE_SERVICES: ServiceItem[] = [
  {
    id: 'remove',
    title: 'Remoção de Cílios',
    img: 'assets/cilios/remocao.jpeg',
    price: 35,
    description:
      'Remoção segura, indolor e sem danificar os cílios naturais. Evite puxar ou tentar remover sozinha: isso pode causar danos aos seus olhos.',
    cta: 'Agendar remoção',
    message: 'Olá! Gostaria de agendar uma remoção de cílios.',
  },
];

export const PACKAGES: PackageItem[] = [
  { name: 'Aplicação', price: 125 },
  { name: '1º manutenção', price: 62 },
  { name: '2º manutenção', price: 62 },
];
