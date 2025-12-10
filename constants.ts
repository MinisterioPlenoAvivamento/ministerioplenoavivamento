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
    pastorImage: "https://picsum.photos/id/1012/600/800", 
    heroImage: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1920&auto=format&fit=crop", // Lion in Dark Background
    heroVideo: "", // Set a video URL in Dashboard to override the image
    welcomeMessage: "Avivando Vidas, Transformando Destinos",
    verse: "Ouvi, Senhor, a tua palavra, e temi; aviva, ó Senhor, a tua obra no meio dos anos, no meio dos anos a notifica; na ira lembra-te da misericórdia.",
    verseReference: "Habacuque 3:2"
  },
  contact: {
    address: "Rua do Avivamento, 777 - Centro",
    cityState: "Sua Cidade - SC",
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
    <p>O Igreja Ministério Pleno Avivamento nasceu de um sonho de Deus no coração do Pastor Wellington Vilares. Em meio a um tempo de oração e jejum, o Senhor direcionou para o início de uma obra que não seria apenas mais uma denominação, mas um movimento de retorno à essência do Evangelho: o poder de Deus, a santidade e o amor pelas almas.</p>
    <p>Começamos com um pequeno grupo de oração em uma sala modesta. Ali, vimos o poder de Deus se manifestar de forma sobrenatural. Vidas foram curadas, famílias restauradas e o grupo cresceu rapidamente, tornando-se uma comunidade vibrante e cheia do Espírito Santo.</p>
    <p>Hoje, somos uma família que cresce a cada dia, mantendo a chama do avivamento acesa, sempre buscando a excelência para servir ao Reino de Deus e impactar nossa cidade.</p>
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