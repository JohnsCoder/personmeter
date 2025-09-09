import { Employee, Demand, TeamRecommendation } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Ana Silva",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b332c1ae?w=400&h=400&fit=crop&crop=face",
    isAvailableOnSite: true,
    discProfile: {
      dominance: 2,
      influence: 3,
      steadiness: 4,
      conscientiousness: 8,
      primaryType: 'C',
      description: "Perfil analítico e preciso, ideal para tarefas que exigem alta qualidade e atenção aos detalhes."
    },
    hardSkills: {
      angular: 3,
      flutterFlow: 1,
      java: 4,
      node: 2,
      python: 3,
      analyst: 5,
      facilitator: 2,
      uiPrototyping: 1,
      tester: 6
    },
    availability: 100,
    hourlyRate: 85,
    professionalInterests: "Tenho interesse em trabalhar com automação de testes e segurança da informação. Gostaria de me especializar mais em testes de performance e integração contínua.",
    yearsAtCompany: 3.5
  },
  {
    id: 2,
    name: "Carlos Santos",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    isAvailableOnSite: false,
    discProfile: {
      dominance: 7,
      influence: 6,
      steadiness: 3,
      conscientiousness: 4,
      primaryType: 'D',
      description: "Líder natural com foco em resultados, ideal para projetos desafiadores e prazos apertados."
    },
    hardSkills: {
      angular: 5,
      flutterFlow: 4,
      java: 2,
      node: 6,
      python: 3,
      analyst: 6,
      facilitator: 5,
      uiPrototyping: 3,
      tester: 2
    },
    availability: 80,
    hourlyRate: 95,
    professionalInterests: "Busco liderar projetos inovadores com tecnologias emergentes. Tenho interesse em arquitetura de sistemas e gestão de equipes técnicas.",
    yearsAtCompany: 2.1
  },
  {
    id: 3,
    name: "Maria Oliveira",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    isAvailableOnSite: true,
    discProfile: {
      dominance: 3,
      influence: 7,
      steadiness: 6,
      conscientiousness: 4,
      primaryType: 'I',
      description: "Excelente comunicadora e colaboradora, ideal para projetos que envolvem múltiplas equipes e stakeholders."
    },
    hardSkills: {
      angular: 6,
      flutterFlow: 5,
      java: 1,
      node: 4,
      python: 2,
      analyst: 4,
      facilitator: 6,
      uiPrototyping: 6,
      tester: 3
    },
    availability: 90,
    hourlyRate: 75,
    professionalInterests: "Gosto de trabalhar no desenvolvimento de interfaces de usuário e experiência do usuário. Tenho interesse em design systems e acessibilidade.",
    yearsAtCompany: 4.2
  },
  {
    id: 4,
    name: "João Pedro",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    isAvailableOnSite: true,
    discProfile: {
      dominance: 4,
      influence: 4,
      steadiness: 7,
      conscientiousness: 5,
      primaryType: 'S',
      description: "Profissional estável e confiável, ideal para projetos de longo prazo que requerem consistência."
    },
    hardSkills: {
      angular: 2,
      flutterFlow: 1,
      java: 6,
      node: 5,
      python: 6,
      analyst: 3,
      facilitator: 4,
      uiPrototyping: 2,
      tester: 4
    },
    availability: 100,
    hourlyRate: 80,
    professionalInterests: "Especialização em desenvolvimento backend robusto e escalável. Interesse em microsserviços e arquitetura cloud.",
    yearsAtCompany: 5.8
  }
];

export const mockDemands: Demand[] = [
  {
    id: 1,
    projectName: "Sistema de Gestão Tributária",
    description: "Desenvolvimento de sistema para gestão de tributos municipais com integração aos sistemas existentes da prefeitura.",
    deadline: 'medium',
    technicalComplexity: 4,
    demandType: 'discovery',
    clientType: 'government',
    requiredSkills: [
      { skill: 'java', minimumLevel: 4 },
      { skill: 'tester', minimumLevel: 3 },
      { skill: 'analyst', minimumLevel: 4 }
    ],
    behavioralPriorities: ['C', 'S']
  }
];

export const mockTeamRecommendation: TeamRecommendation = {
  teamSize: 4,
  estimatedCostPerHour: 335,
  adherenceScore: 95,
  members: [
    {
      employee: mockEmployees[0], // Ana Silva
      individualAdherence: 98,
      matchHighlights: "Combinação perfeita de 'Tester' (6/6) e perfil 'Conformidade (C)', ideal para a demanda de 'Cliente Governamental'.",
      alternatives: [mockEmployees[3]]
    },
    {
      employee: mockEmployees[3], // João Pedro  
      individualAdherence: 94,
      matchHighlights: "Sólida experiência em Java (6/6) e perfil estável (S) essencial para projetos governamentais de longo prazo.",
      alternatives: [mockEmployees[1]]
    },
    {
      employee: mockEmployees[2], // Maria Oliveira
      individualAdherence: 90,
      matchHighlights: "Perfil Influente (I) ideal para comunicação com stakeholders e facilitação de requisitos.",
      alternatives: [mockEmployees[1]]
    },
    {
      employee: mockEmployees[1], // Carlos Santos
      individualAdherence: 92,
      matchHighlights: "Liderança técnica (D) e capacidade analítica para coordenar a equipe e arquitetura do sistema.",
      alternatives: [mockEmployees[0]]
    }
  ]
};