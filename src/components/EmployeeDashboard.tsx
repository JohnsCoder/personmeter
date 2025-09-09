import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { mockEmployees } from '../data/mockData';
import { Employee } from '../types';

interface EmployeeDashboardProps {
  employeeId: number;
}

export function EmployeeDashboard({ employeeId }: EmployeeDashboardProps) {
  const employee = mockEmployees.find(emp => emp.id === employeeId) || mockEmployees[0];

  const discData = employee.discProfile ? [
    { subject: 'Dominância', value: employee.discProfile.dominance, fullMark: 10 },
    { subject: 'Influência', value: employee.discProfile.influence, fullMark: 10 },
    { subject: 'Estabilidade', value: employee.discProfile.steadiness, fullMark: 10 },
    { subject: 'Conformidade', value: employee.discProfile.conscientiousness, fullMark: 10 },
  ] : [];

  const hardSkillsData = [
    { subject: 'Angular', value: employee.hardSkills.angular, fullMark: 6 },
    { subject: 'Java', value: employee.hardSkills.java, fullMark: 6 },
    { subject: 'Node', value: employee.hardSkills.node, fullMark: 6 },
    { subject: 'Python', value: employee.hardSkills.python, fullMark: 6 },
    { subject: 'Tester', value: employee.hardSkills.tester, fullMark: 6 },
    { subject: 'Analista', value: employee.hardSkills.analyst, fullMark: 6 },
  ];

  const aiAnalysis = `Combinando sua alta ${employee.discProfile?.primaryType === 'C' ? 'Conformidade (C)' : 
    employee.discProfile?.primaryType === 'D' ? 'Dominância (D)' :
    employee.discProfile?.primaryType === 'I' ? 'Influência (I)' : 'Estabilidade (S)'} com a expertise em ${
    Object.entries(employee.hardSkills)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2)
      .map(([skill, level]) => `${skill} (${level}/6)`)
      .join(' e ')
  }, ${employee.name} é ${
    employee.discProfile?.primaryType === 'C' ? 'o profissional ideal para liderar a frente de qualidade em projetos críticos' :
    employee.discProfile?.primaryType === 'D' ? 'ideal para liderar projetos desafiadores e coordenar equipes' :
    employee.discProfile?.primaryType === 'I' ? 'perfeito para projetos que envolvem comunicação e colaboração' :
    'excelente para projetos que requerem consistência e confiabilidade'
  }. ${employee.professionalInterests.split('.')[0]}.`;

  const getTopSkills = (skills: Employee['hardSkills']) => {
    return Object.entries(skills)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([skill, level]) => {
        const skillNames: Record<string, string> = {
          angular: 'Angular',
          flutterFlow: 'FlutterFlow',
          java: 'Java',
          node: 'Node.js',
          python: 'Python',
          analyst: 'Análise/Gestão',
          facilitator: 'Facilitação',
          uiPrototyping: 'Prototipação UI',
          tester: 'Testes Automatizados'
        };
        return `• ${level >= 5 ? 'Proficiência avançada' : level >= 3 ? 'Sólido conhecimento' : 'Conhecimento básico'} em ${skillNames[skill] || skill}`;
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Card de Identificação */}
      <Card className="overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-start gap-8">
            <div className="relative">
              <img 
                src={employee.photo || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face`}
                alt={employee.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-muted"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h1>{employee.name}</h1>
                <p className="text-muted-foreground">
                  {employee.discProfile?.primaryType === 'C' ? 'Especialista em Qualidade e Conformidade' :
                   employee.discProfile?.primaryType === 'D' ? 'Líder Técnico e Orientado a Resultados' :
                   employee.discProfile?.primaryType === 'I' ? 'Facilitador e Comunicador' :
                   'Desenvolvedor Estável e Confiável'}
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">ID: </span>
                  <span>{employee.id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Tempo de Casa: </span>
                  <span>{employee.yearsAtCompany} anos</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Presencial: </span>
                  <Badge variant={employee.isAvailableOnSite ? "default" : "secondary"}>
                    {employee.isAvailableOnSite ? 'Sim' : 'Não'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Soft Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Perfil Comportamental (DISC)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {employee.discProfile && (
              <>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={discData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 10]} 
                        tick={false}
                      />
                      <Radar
                        name="DISC"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  <h4>Resumo Comportamental</h4>
                  <p className="text-sm text-muted-foreground">
                    {employee.discProfile.description}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Hard Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Competências Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={hardSkillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 6]} 
                    tick={false}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              <h4>Pontos Fortes</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {getTopSkills(employee.hardSkills).map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise da IA */}
      <Card>
        <CardHeader>
          <CardTitle>Análise da IA "Profiler"</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-6">
            <p className="leading-relaxed">
              {aiAnalysis}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Informações de Alocação */}
      <Card>
        <CardHeader>
          <CardTitle>Status de Alocação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Disponibilidade</label>
                <span className="text-sm">{employee.availability}%</span>
              </div>
              <Progress value={employee.availability} className="h-2" />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Trabalho Presencial</label>
              <div>
                <Badge variant={employee.isAvailableOnSite ? "default" : "secondary"}>
                  {employee.isAvailableOnSite ? '✓ Disponível' : '✗ Apenas Remoto'}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Valor/Hora</label>
              <div>
                <span className="text-lg">
                  {employee.hourlyRate ? `R$ ${employee.hourlyRate}` : 'Não definido'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}