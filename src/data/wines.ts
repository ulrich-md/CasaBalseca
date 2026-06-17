export type Wine = {
  id: 'crianza' | 'roble';
  name: string;
  vintage: string;
  designation: string;
  region: string;
  origin: string;
  type: string;
  folioTotal: string;
  tasting: string;
  pairings: string[];
  note: string;
};

/**
 * Datos REALES de etiqueta. No se inventan precios, premios ni puntajes.
 * Hechos afirmables: nombre, añada, folios 9210 / 17166, Ribera del Duero,
 * D.O., Vino Tinto, Producto de España, 24 meses de crianza, MOG Selections.
 */
export const wines: Wine[] = [
  {
    id: 'crianza',
    name: 'Casa Balseca Crianza',
    vintage: '2014',
    designation: 'Crianza',
    region: 'Ribera del Duero',
    origin: 'Producto de España',
    type: 'Vino Tinto',
    folioTotal: '9210',
    tasting:
      'Potente y equilibrado. Fruta negra madura, roble y especias sobre un fondo de taninos pulidos. Crianza de 24 meses de guarda, con un mínimo de 12 en barrica de roble.',
    pairings: ['Res', 'Caza', 'Cordero'],
    note: 'Edición limitada y numerada',
  },
  {
    id: 'roble',
    name: 'Casa Balseca Roble',
    vintage: '2015',
    designation: 'Roble',
    region: 'Ribera del Duero',
    origin: 'Producto de España',
    type: 'Vino Tinto',
    folioTotal: '17166',
    tasting:
      'Joven y expresivo. Fruta roja vibrante y un paso por roble que aporta estructura sin pesar. Directo, fresco y de trago largo.',
    pairings: ['Tablas', 'Pastas', 'Aves'],
    note: 'Edición limitada y numerada',
  },
];
