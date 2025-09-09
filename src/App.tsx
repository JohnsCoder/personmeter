import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { User, Users, PlusCircle, Target } from 'lucide-react';
import { ProfileForm } from './components/ProfileForm';
import { EmployeeDashboard } from './components/EmployeeDashboard';
import { DemandForm } from './components/DemandForm';
import { TeamRecommendations } from './components/TeamRecommendations';
import { Demand } from './types';

type Screen = 'menu' | 'profile' | 'dashboard' | 'demand' | 'recommendations';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [currentEmployeeId, setCurrentEmployeeId] = useState(1);
  const [currentProjectName, setCurrentProjectName] = useState('');

  const handleDemandSubmit = (demand: Partial<Demand>) => {
    setCurrentProjectName(demand.projectName || 'Projeto sem nome');
    setCurrentScreen('recommendations');
  };

  const menuItems = [
    {
      id: 'profile',
      title: 'Meu Perfil',
      description: 'Cadastrar e atualizar dados pessoais',
      icon: User,
      color: 'bg-blue-100 text-blue-600',
      audience: 'Colaborador, RH'
    },
    {
      id: 'dashboard',
      title: 'Dashboard do Colaborador', 
      description: 'Visão completa e analítica do perfil',
      icon: Target,
      color: 'bg-green-100 text-green-600',
      audience: 'Gestor, RH, Colaborador'
    },
    {
      id: 'demand',
      title: 'Abertura de Demanda',
      description: 'Solicitar montagem de time para projeto',
      icon: PlusCircle,
      color: 'bg-purple-100 text-purple-600',
      audience: 'Gestor de Projeto, Diretor, PO'
    },
    {
      id: 'recommendations',
      title: 'Recomendações de Time',
      description: 'Visualizar sugestões da IA Team Builder',
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
      audience: 'Gestor de Projeto'
    }
  ];

  if (currentScreen === 'profile') {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentScreen('menu')}
              className="mb-2"
            >
              ← Voltar ao Menu
            </Button>
          </div>
        </div>
        <ProfileForm employeeId={currentEmployeeId} />
      </div>
    );
  }

  if (currentScreen === 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentScreen('menu')}
              className="mb-2"
            >
              ← Voltar ao Menu
            </Button>
          </div>
        </div>
        <EmployeeDashboard employeeId={currentEmployeeId} />
      </div>
    );
  }

  if (currentScreen === 'demand') {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentScreen('menu')}
              className="mb-2"
            >
              ← Voltar ao Menu
            </Button>
          </div>
        </div>
        <DemandForm onSubmit={handleDemandSubmit} />
      </div>
    );
  }

  if (currentScreen === 'recommendations') {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b bg-card">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentScreen('menu')}
              className="mb-2"
            >
              ← Voltar ao Menu
            </Button>
          </div>
        </div>
        <TeamRecommendations projectName={currentProjectName} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl">Sistema de Gestão de Colaboradores</h1>
          <p className="text-xl text-muted-foreground">
            Plataforma inteligente para montagem de times e gestão de talentos
          </p>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-sm">
              Powered by AI Team Builder & Profiler
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={item.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20"
                onClick={() => setCurrentScreen(item.id as Screen)}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <h3 className="text-xl">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      <div className="pt-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.audience}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center pt-8 border-t">
          <h2 className="text-lg mb-4">Fluxos do Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="space-y-2">
              <h3 className="text-primary">Fluxo 1: O Colaborador e seu Perfil</h3>
              <p>• Tela 1: Cadastro/Atualização de Perfil</p>
              <p>• Tela 2: Dashboard com Análise da IA</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-primary">Fluxo 2: O Gestor e a Demanda</h3>
              <p>• Tela 3: Abertura de Nova Demanda</p>
              <p>• Tela 4: Recomendações do Team Builder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}