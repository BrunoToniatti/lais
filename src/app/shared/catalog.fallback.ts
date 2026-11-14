import { CatalogItem } from './catalog.service';

/**
 * Valores usados enquanto a plataforma não responde (ou se estiver fora do ar).
 * Mantenha parecido com o que está cadastrado no painel: é a rede de segurança do site.
 */
export const FALLBACK_SERVICES: CatalogItem[] = [
  { slug: 'volume-brasileiro', name: 'Volume Brasileiro', category: 'lash', description: 'Fios em Y para um preenchimento cheio e natural.', price: 135, prefix: 'aplicação', img: 'assets/cilios/brasileiro.jpeg', highlight: true, heroLabel: 'Extensão de cílios' },
  { slug: 'volume-ingles', name: 'Volume Inglês', category: 'lash', description: 'Volume elegante, com acabamento definido.', price: 135, prefix: '', img: 'assets/cilios/ingles.jpeg', highlight: false, heroLabel: '' },
  { slug: 'volume-glamour-preto', name: 'Volume Glamour Preto', category: 'lash', description: 'Densidade intensa para um olhar marcante.', price: 135, prefix: '', img: 'assets/cilios/glamour-preto.jpeg', highlight: false, heroLabel: '' },
  { slug: 'volume-glamour-marrom', name: 'Volume Glamour Marrom', category: 'lash', description: 'Densidade intensa para um olhar marcante.', price: 135, prefix: '', img: 'assets/cilios/glamour-marrom.jpeg', highlight: false, heroLabel: '' },
  { slug: 'volume-wispy-preto', name: 'Volume Wispy Preto', category: 'lash', description: 'Pontas texturizadas e efeito esfumado.', price: 135, prefix: '', img: 'assets/cilios/whispy.jpeg', highlight: false, heroLabel: '' },
  { slug: 'volume-wispy-marrom', name: 'Volume Wispy Marrom', category: 'lash', description: 'Pontas texturizadas e efeito esfumado.', price: 135, prefix: '', img: 'assets/cilios/wispy-marrom.jpeg', highlight: false, heroLabel: '' },
  { slug: 'fox-eyes-preto', name: 'Estilo Fox Eyes Preto', category: 'lash', description: 'Olhar alongado e sofisticado.', price: 135, prefix: '', img: 'assets/cilios/fox-preto.jpeg', highlight: false, heroLabel: '' },
  { slug: 'fox-eyes-marrom', name: 'Estilo Fox Eyes Marrom', category: 'lash', description: 'Leve e discreto, um fio para cada fio natural.', price: 135, prefix: '', img: 'assets/cilios/fox-marrom.jpeg', highlight: false, heroLabel: '' },
  { slug: 'fio-a-fio', name: 'Estilo Fio a Fio', category: 'lash', description: 'Leve e discreto, um fio para cada fio natural.', price: 135, prefix: '', img: 'assets/cilios/fio-a-fio.jpeg', highlight: false, heroLabel: '' },
  {
    slug: 'remocao-de-cilios', name: 'Remoção de Cílios', category: 'care',
    description: 'Remoção segura, indolor e sem danificar os cílios naturais. Evite puxar ou tentar remover sozinha: isso pode causar danos aos seus olhos.',
    price: 35, prefix: '', img: 'assets/cilios/remocao.jpeg', highlight: false, heroLabel: '',
  },
  { slug: 'pacote-aplicacao', name: 'Aplicação', category: 'package', description: '', price: 125, prefix: '', img: '', highlight: false, heroLabel: '' },
  { slug: 'pacote-1-manutencao', name: '1º manutenção', category: 'package', description: '', price: 62, prefix: 'por', img: '', highlight: true, heroLabel: 'Manutenção' },
  { slug: 'pacote-2-manutencao', name: '2º manutenção', category: 'package', description: '', price: 62, prefix: '', img: '', highlight: false, heroLabel: '' },
  { slug: 'limpeza-sem-design', name: 'Limpeza sem design', category: 'brow', description: '', price: 20, prefix: '', img: '', highlight: false, heroLabel: '' },
];

/** Fotos que já fazem parte do site: usadas quando o serviço não tem foto enviada no painel. */
export const LOCAL_IMAGES: Record<string, string> = Object.fromEntries(
  FALLBACK_SERVICES.filter((s) => s.img).map((s) => [s.slug, s.img]),
);
