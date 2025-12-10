import { ChurchData, NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', path: '/' },
  { label: 'Sobre Nós', path: '/sobre' },
  { label: 'Culto Semanal', path: '/cultosemanal' }, // New item
  { label: 'Ao Vivo', path: '/aovivo' },
  { label: 'Mensagens', path: '/mensagens' },
  { label: 'Contribuir', path: '/contribuir' },
  { label: 'Contato', path: '/contato' },
];

export const INITIAL_DATA: ChurchData = {
  version: 61, // Incrementing version for new dashboard features (services/events IDs)
  general: {
    churchName: "Ministério Pleno Avivamento",
    pastorName: "Ev. Wellington Villares",
    pastorImage: "https://i.imgur.com/LeGJXLb.jpeg", 
    heroImage: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1920&auto=format&fit=crop", // Lion in Dark Background
    heroVideo: "", // Set a video URL in Dashboard to override the image
    backgroundAudioUrl: "https://raw.githubusercontent.com/MinisterioPlenoAvivamento/ministerioplenoavivamento/public/components/yeshua-jesus-image-instrumental-worship-piano-pad-nncdxdi4xis_p6ad5zkc.mp3", // Direct URL from public GitHub repo
    welcomeMessage: "Deus deseja transformar a vida de cada um de seus filhos. Por isso, peça e receberás!",
    verse: "Ouvi, Senhor, a tua palavra, e temi; aviva, ó Senhor, a tua obra no meio dos anos, no meio dos anos a notifica; na ira lembra-te da misericórdia.",
    verseReference: "Habacuque 3:2"
  },
  contact: {
    address: "Rua: Torquato Gonçalves Andrade N° 2-79 Jardim Prudência",
    cityState: "Bauru-SP",
    whatsapp: "(14) 997249515",
    email: "wellvillsants@gmail.com",
    phone: "(14) 997249515"
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com"
  },
  bank: {
    bank: "Bradesco (13)",
    agency: "13",
    account: "1012846-3",
    favored: "Wellington Villares dos Santos",
    cnpj: "", // Deixado em branco conforme solicitado
    pixKey: "338.076.628-39", // Chave PIX (CPF) para exibição
    pixCode: "00020126450014BR.GOV.BCB.PIX0123wellvillsants@gmail.com5204000053039865802BR5901N6001C62070503***6304C5F3" // Código PIX Completo (BR Code)
  },
  history: `
    <p>A Igreja Ministério Pleno Avivamento na Cidade de Bauru-SP nasceu após um tempo precioso com o Senhor. Ele nos direcionou a começar essa obra que a cada dia tem crescido em nossa cidade!</p>
    <p>Começamos em uma garagem com poucas pessoas e hoje estamos crescendo na Graça e no Conhecimento, com muitos sinais onde Deus tem manifestado sua glória entre nós!</p>
    <p>Buscamos os Dons Espirituais e acreditamos na manifestação do Poder de Deus na vida das pessoas.</p>
  `,
  multimedia: {
    liveUrl: "https://youtube.com",
    facebookLiveUrl: "https://facebook.com/live", // Novo valor inicial
    instagramLiveUrl: "https://instagram.com/live", // Novo valor inicial
    isLiveNow: true,
    liveTitle: "Culto de Sábado - Ao Vivo",
  },
  sermons: [
    {
      id: '1',
      title: 'O Poder da Perseverança',
      preacher: 'Pr. Wellington Vilares',
      date: '10 Set 2023',
      thumbnail: 'https://picsum.photos/id/231/600/400',
      duration: '45:20',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder URL
    },
    {
      id: '2',
      title: 'Avivamento Genuíno',
      preacher: 'Pr. Wellington Vilares',
      date: '03 Set 2023',
      thumbnail: 'https://picsum.photos/id/232/600/400',
      duration: '52:10',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder URL
    },
    {
      id: '3',
      title: 'Família no Altar',
      preacher: 'Pra. Ana Vilares',
      date: '27 Ago 2023',
      thumbnail: 'https://picsum.photos/id/233/600/400',
      duration: '38:45',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Placeholder URL
    },
  ],
  services: [
    { id: 's1', day: 'Sábado', time: '19:30h', name: 'Culto de Avivamento' },
    { id: 's2', day: 'Domingo', time: '18:00h', name: 'Culto da Família' },
    { id: 's3', day: 'Quarta', time: '20:00h', name: 'Estudo Bíblico' },
  ],
  events: [
    {
      id: 'e1',
      title: 'Conferência de Fogo',
      date: '25 de Novembro',
      time: '19:00h',
      image: 'https://picsum.photos/id/300/800/500',
      description: 'Três dias de imersão na presença de Deus com preletores convidados.',
      tag: 'Conferência'
    }
  ],
  gallery: [
    { id: 'g1', url: 'https://picsum.photos/id/1015/600/400', alt: 'Adoração' },
    { id: 'g2', url: 'https://picsum.photos/id/1018/600/400', alt: 'Pregação' },
    { id: 'g3', url: 'https://picsum.photos/id/1020/600/400', alt: 'Comunhão' },
    { id: 'g4', url: 'https://picsum.photos/id/1024/600/400', alt: 'Batismo' },
  ]
};