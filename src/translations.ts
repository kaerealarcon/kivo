export const t = {
  pt: {
    nav: {
      services: 'Serviços',
      process: 'Como funciona',
      cases: 'Cases',
      about: 'Sobre',
      cta: 'Falar com a Kivo',
    },
    hero: {
      tag: 'Agência digital',
      lines: ['Projetos digitais', 'que entregam', 'resultado.'],
      sub: 'Sites, automações e estratégia para empresas que querem crescer com eficiência — sem perder tempo com soluções que não funcionam.',
      cta: 'Falar com a Kivo',
      ctaAlt: 'Ver serviços',
    },
    services: {
      tag: 'O que fazemos',
      title: 'Serviços',
      items: [
        {
          n: '01',
          title: 'Sites e e-commerce',
          desc: 'Páginas que vendem. Do institucional ao e-commerce completo, com foco em conversão e performance.',
        },
        {
          n: '02',
          title: 'Automações de WhatsApp',
          desc: 'Atendimento e vendas no piloto automático via fluxos inteligentes integrados ao seu CRM.',
        },
        {
          n: '03',
          title: 'Gestão de redes sociais',
          desc: 'Conteúdo, calendário editorial e operação completa das suas redes — sem você precisar se preocupar.',
        },
        {
          n: '04',
          title: 'Marketing e estratégia',
          desc: 'Campanhas, posicionamento e planos de crescimento construídos a partir dos seus objetivos.',
        },
      ],
    },
    how: {
      tag: 'Nosso processo',
      title: 'Como funciona',
      steps: [
        { s: '1', title: 'Brief', desc: 'Entendemos seu negócio, seu público e o que você quer alcançar. Sem jargões, sem enrolação.' },
        { s: '2', title: 'Proposta', desc: 'Montamos um plano claro com escopo, prazo e investimento. Você sabe exatamente o que vai receber.' },
        { s: '3', title: 'Desenvolvimento', desc: 'Executamos com agilidade e comunicação constante. Sem surpresas no meio do caminho.' },
        { s: '4', title: 'Entrega', desc: 'Você recebe o projeto pronto, testado e documentado. Acompanhamento contínuo disponível.' },
      ],
    },
    cases: {
      tag: 'Resultados',
      title: 'Cases',
      coming: 'Em breve',
      comingDesc: 'Case em elaboração.',
      imgLabel: 'Imagem do projeto',
      items: [
        { tag: 'Site institucional' },
        { tag: 'Automação WhatsApp' },
        { tag: 'E-commerce' },
      ],
    },
    about: {
      tag: 'Sobre',
      title: ['Uma agência enxuta', 'para projetos robustos.'],
      p1: 'A Kivo é especializada em projetos digitais de alto impacto. Do design à produção, cuidamos de cada detalhe para que seu negócio cresça online.',
      p2: 'Atendemos fundadores, CEOs e gestores que buscam soluções robustas, comunicação direta e resultados mensuráveis.',
      highlights: [
        { value: 'Full Stack', label: 'Do design à produção' },
        { value: 'Estratégia', label: 'Alinhada ao negócio' },
        { value: 'Resultado', label: 'Mensurável e claro' },
      ],
    },
    contact: {
      tag: 'Próximo passo',
      title: 'Pronto para começar?',
      sub: 'Fale com a gente pelo WhatsApp e tire suas dúvidas. Sem compromisso, sem formulário complicado.',
      cta: 'Iniciar conversa no WhatsApp',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
    },
  },

  en: {
    nav: {
      services: 'Services',
      process: 'How it works',
      cases: 'Cases',
      about: 'About',
      cta: 'Talk to Kivo',
    },
    hero: {
      tag: 'Digital agency',
      lines: ['Digital projects', 'that deliver', 'results.'],
      sub: 'Websites, automations and strategy for companies that want to grow efficiently — without wasting time on solutions that don\'t work.',
      cta: 'Talk to Kivo',
      ctaAlt: 'See services',
    },
    services: {
      tag: 'What we do',
      title: 'Services',
      items: [
        {
          n: '01',
          title: 'Websites & e-commerce',
          desc: 'Pages that sell. From institutional to full e-commerce, focused on conversion and performance.',
        },
        {
          n: '02',
          title: 'WhatsApp Automations',
          desc: 'Sales and support on autopilot via smart flows integrated with your CRM.',
        },
        {
          n: '03',
          title: 'Social media management',
          desc: 'Content, editorial calendar and full operation of your social channels — without you having to worry.',
        },
        {
          n: '04',
          title: 'Marketing & strategy',
          desc: 'Campaigns, positioning and growth plans built around your business goals.',
        },
      ],
    },
    how: {
      tag: 'Our process',
      title: 'How it works',
      steps: [
        { s: '1', title: 'Brief', desc: 'We understand your business, your audience and what you want to achieve. No jargon, no fluff.' },
        { s: '2', title: 'Proposal', desc: 'We build a clear plan with scope, timeline and investment. You know exactly what you\'ll get.' },
        { s: '3', title: 'Development', desc: 'We execute with agility and constant communication. No surprises along the way.' },
        { s: '4', title: 'Delivery', desc: 'You receive the finished project, tested and documented. Ongoing support available.' },
      ],
    },
    cases: {
      tag: 'Results',
      title: 'Cases',
      coming: 'Coming soon',
      comingDesc: 'Case in progress.',
      imgLabel: 'Project image',
      items: [
        { tag: 'Institutional website' },
        { tag: 'WhatsApp Automation' },
        { tag: 'E-commerce' },
      ],
    },
    about: {
      tag: 'About',
      title: ['A lean agency', 'for robust projects.'],
      p1: 'Kivo specializes in high-impact digital projects. From design to production, we handle every detail so your business grows online.',
      p2: 'We serve founders, CEOs and managers who seek robust solutions, direct communication and measurable results.',
      highlights: [
        { value: 'Full Stack', label: 'From design to production' },
        { value: 'Strategy', label: 'Aligned with your business' },
        { value: 'Results', label: 'Measurable and clear' },
      ],
    },
    contact: {
      tag: 'Next step',
      title: 'Ready to start?',
      sub: 'Talk to us on WhatsApp and get your questions answered. No commitment, no complicated forms.',
      cta: 'Start WhatsApp conversation',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
} as const

export type Lang = keyof typeof t
