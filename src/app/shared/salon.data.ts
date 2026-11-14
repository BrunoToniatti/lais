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
