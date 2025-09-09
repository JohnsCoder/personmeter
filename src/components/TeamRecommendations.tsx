import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Users, DollarSign, Target, RotateCcw, FileText, Save, Check } from 'lucide-react';
import { mockTeamRecommendation, mockEmployees } from '../data/mockData';
import { TeamRecommendation, Employee } from '../types';

interface TeamRecommendationsProps {
  projectName: string;
}

export function TeamRecommendations({ projectName }: TeamRecommendationsProps) {
  const [recommendation, setRecommendation] = useState<TeamRecommendation>(mockTeamRecommendation);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const replaceMember = (memberIndex: number, newEmployee: Employee) => {
    setRecommendation(prev => {
      const newMembers = [...prev.members];
      const currentMember = newMembers[memberIndex];
      
      // Add current employee to alternatives of the replacement
      const alternatives = currentMember.alternatives.filter(alt => alt.id !== newEmployee.id);
      alternatives.unshift(currentMember.employee);
      
      newMembers[memberIndex] = {
        ...currentMember,
        employee: newEmployee,
        individualAdherence: Math.floor(Math.random() * 10) + 85, // Random adherence 85-95%
        alternatives: alternatives
      };
      
      // Recalculate team stats
      const newCostPerHour = newMembers.reduce((sum, member) => sum + (member.employee.hourlyRate || 75), 0);
      const newAdherenceScore = Math.floor(newMembers.reduce((sum, member) => sum + member.individualAdherence, 0) / newMembers.length);
      
      return {
        ...prev,
        members: newMembers,
        estimatedCostPerHour: newCostPerHour,
        adherenceScore: newAdherenceScore
      };
    });
    
    // Close the flipped card
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      newSet.delete(memberIndex);
      return newSet;
    });
  };

  const getMemberHighlights = (employee: Employee) => {
    const topSkills = Object.entries(employee.hardSkills)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2);
    
    const behaviorMap = {
      'D': 'liderança técnica',
      'I': 'comunicação eficaz',
      'S': 'estabilidade e consistência',
      'C': 'qualidade e precisão'
    };
    
    return `Combinação de ${topSkills.map(([skill, level]) => `${skill} (${level}/6)`).join(' e ')} com perfil ${behaviorMap[employee.discProfile?.primaryType || 'S']}.`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1>Time Recomendado para: {projectName}</h1>
        <p className="text-muted-foreground">
          Nossa IA selecionou os profissionais mais adequados com base nos requisitos do projeto.
        </p>
      </div>

      {/* Painel de Resumo */}
      <Card>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tamanho do Time</p>
                <p className="text-2xl">{recommendation.teamSize} pessoas</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Custo/Hora Estimado</p>
                <p className="text-2xl">R$ {recommendation.estimatedCostPerHour}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pontuação de Aderência</p>
                <p className="text-2xl">{recommendation.adherenceScore}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Composição do Time */}
      <div className="space-y-6">
        <h2>Composição do Time Sugerido</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendation.members.map((member, index) => (
            <div key={member.employee.id} className="relative">
              {/* Card Principal */}
              <Card className={`transition-all duration-300 ${flippedCards.has(index) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <img 
                      src={member.employee.photo || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face`}
                      alt={member.employee.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-lg">{member.employee.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {member.employee.discProfile?.primaryType === 'C' ? 'QA Especialista' :
                         member.employee.discProfile?.primaryType === 'D' ? 'Tech Lead' :
                         member.employee.discProfile?.primaryType === 'I' ? 'Frontend Developer' :
                         'Backend Developer'}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">
                          Aderência: {member.individualAdherence}%
                        </Badge>
                        <Badge variant={member.employee.availability === 100 ? "default" : "secondary"}>
                          {member.employee.availability}% disponível
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm">
                      <strong>Destaques do Match:</strong> {member.matchHighlights}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Ver Perfil Completo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleCard(index)}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Trocar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Card de Alternativas */}
              <Card className={`absolute inset-0 transition-all duration-300 ${flippedCards.has(index) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Alternativas Disponíveis</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleCard(index)}
                    >
                      Voltar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {member.alternatives.slice(0, 2).map((alternative) => (
                    <div key={alternative.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img 
                        src={alternative.photo || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face`}
                        alt={alternative.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p>{alternative.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {getMemberHighlights(alternative)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs">Aderência: {Math.floor(Math.random() * 10) + 85}%</span>
                          <span className="text-xs">R$ {alternative.hourlyRate}/h</span>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => replaceMember(index, alternative)}
                      >
                        Selecionar
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t">
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Exportar Sugestão
          </Button>
          <Button variant="ghost">
            <Save className="w-4 h-4 mr-2" />
            Salvar como rascunho
          </Button>
        </div>
        
        <Button size="lg" className="bg-green-600 hover:bg-green-700">
          <Check className="w-4 h-4 mr-2" />
          Alocar este Time
        </Button>
      </div>
    </div>
  );
}