export interface Employee {
  id: number;
  name: string;
  photo?: string;
  isAvailableOnSite: boolean;
  discProfile?: {
    dominance: number;
    influence: number;
    steadiness: number;
    conscientiousness: number;
    primaryType: 'D' | 'I' | 'S' | 'C';
    description: string;
  };
  hardSkills: {
    angular: number;
    flutterFlow: number;
    java: number;
    node: number;
    python: number;
    analyst: number;
    facilitator: number;
    uiPrototyping: number;
    tester: number;
  };
  availability: number;
  hourlyRate?: number;
  professionalInterests: string;
  yearsAtCompany: number;
}

export interface Demand {
  id: number;
  projectName: string;
  description: string;
  deadline: 'urgent' | 'short' | 'medium' | 'long';
  technicalComplexity: number;
  demandType: 'discovery' | 'maintenance' | 'correction' | 'evolution';
  clientType: 'internal' | 'government' | 'private';
  requiredSkills: Array<{
    skill: keyof Employee['hardSkills'];
    minimumLevel: number;
  }>;
  behavioralPriorities: Array<'D' | 'I' | 'S' | 'C'>;
}

export interface TeamRecommendation {
  teamSize: number;
  estimatedCostPerHour: number;
  adherenceScore: number;
  members: Array<{
    employee: Employee;
    individualAdherence: number;
    matchHighlights: string;
    alternatives: Employee[];
  }>;
}