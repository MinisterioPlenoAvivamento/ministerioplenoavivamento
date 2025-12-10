import { ChurchData, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', path: '/' },
  { label: 'Sobre Nós', path: '/sobre' },
  { label: 'Ao Vivo', path: '/aovivo' },
  { label: 'Mensagens', path: '/mensagens' },
  { label: 'Contribuir', path: '/contribuir' },
  { label: 'Contato', path: '/contato' },
];

export const INITIAL_DATA: ChurchData = {
  version: 60, // Major update for Layout overhaul
  general: {
    churchName: "Ministério Pleno Avivamento",
    pastorName: "Ev. Wellington Villares",
    pastorImage: "https://i.imgur.com/9239bd33.jpg", 
    heroImage: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1920&auto=format&fit=crop", // Lion in Dark Background
    heroVideo: "", // Set a video URL in Dashboard to override the image
    welcomeMessage: "Avivando Vidas, Transformando Destinos",
    verse: "Ouvi, Senhor, a tua palavra, e temi; aviva, ó Senhor, a tua obra no meio dos anos, no meio dos anos a notifica; na ira lembra-te da misericórdia.",
    verseReference: "Habacuque 3:2"
  },
  contact: {
    address: "Rua do Avivamento, 777 - Centro",
    cityState: "Bauru - SP",
    whatsapp: "(11) 98888-8888",
    email: "contato@avivamentopleno.com.br"
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com"
  },
  bank: {
    bank: "Banco do Brasil (001)",
    agency: "1234-5",
    account: "99999-X",
    favored: "Min. Pleno Avivamento",
    cnpj: "00.000.000/0001-00",
    pixKey: "00.000.000/0001-00"
  },
  history: `
    <p>A Igreja Ministério Pleno Avivamento na Cidade de Bauru-SP nasceu após um tempo precioso com o Senhor. Ele nos direcionou a começar essa obra que a cada dia tem crescido em nossa cidade!</p>
    <p>Começamos em uma garagem com poucas pessoas e hoje estamos crescendo na Graça e no Conhecimento, com muitos sinais onde Deus tem manifestado sua glória entre nós!</p>
    <p>Buscamos os Dons Espirituais e acreditamos na manifestação do Poder de Deus na vida das pessoas.</p>
  `,
  multimedia: {
    liveUrl: "https://youtube.com",
    isLiveNow: true,
    liveTitle: "Culto de Domingo - Ao Vivo",
    podcastUrl: "https://spotify.com",
    latestPodcasts: [
      {
        id: '1',
        title: 'Caminhando em Santidade #12',
        description: 'Um bate-papo profundo sobre como manter a santidade nos dias atuais.',
        date: '12 Out 2023',
        image: 'https://picsum.photos/id/1/400/400',
        spotifyUrl: '#'
      },
      {
        id: '2',
        title: 'O Poder da Oração #11',
        description: 'Testemunhos impactantes sobre o poder da intercessão.',
        date: '05 Out 2023',
        image: 'https://picsum.photos/id/2/400/400',
        spotifyUrl: '#'
      }
    ]
  },
  sermons: [
    {
      id: '1',
      title: 'O Poder da Perseverança',
      preacher: 'Pr. Wellington Vilares',
      date: '10 Set 2023',
      thumbnail: 'https://picsum.photos/id/231/600/400',
      duration: '45:20',
    },
    {
      id: '2',
      title: 'Avivamento Genuíno',
      preacher: 'Pr. Wellington Vilares',
      date: '03 Set 2023',
      thumbnail: 'https://picsum.photos/id/232/600/400',
      duration: '52:10',
    },
    {
      id: '3',
      title: 'Família no Altar',
      preacher: 'Pra. Ana Vilares',
      date: '27 Ago 2023',
      thumbnail: 'https://picsum.photos/id/233/600/400',
      duration: '38:45',
    },
  ]
};