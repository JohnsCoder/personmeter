import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { mockEmployees } from '../data/mockData';

interface ProfileFormProps {
  employeeId: number;
}

export function ProfileForm({ employeeId }: ProfileFormProps) {
  const [employee, setEmployee] = useState(mockEmployees.find(emp => emp.id === employeeId) || mockEmployees[0]);

  const updateHardSkill = (skill: keyof typeof employee.hardSkills, value: number) => {
    setEmployee(prev => ({
      ...prev,
      hardSkills: {
        ...prev.hardSkills,
        [skill]: value
      }
    }));
  };

  const skillCategories = {
    frontend: {
      title: 'Front-end',
      skills: [
        { key: 'angular' as const, label: 'Angular' },
        { key: 'flutterFlow' as const, label: 'FlutterFlow' }
      ]
    },
    backend: {
      title: 'Back-end',
      skills: [
        { key: 'java' as const, label: 'Java' },
        { key: 'node' as const, label: 'Node' },
        { key: 'python' as const, label: 'Python' }
      ]
    },
    management: {
      title: 'Gestão & Processos',
      skills: [
        { key: 'analyst' as const, label: 'Analista/Gerente' },
        { key: 'facilitator' as const, label: 'Facilitador' },
        { key: 'uiPrototyping' as const, label: 'Prototipação (UI)' },
        { key: 'tester' as const, label: 'Tester' }
      ]
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1>Meu Perfil - {employee.name}</h1>
        <p className="text-muted-foreground">
          Mantenha suas informações atualizadas para receber as melhores oportunidades de projetos.
        </p>
      </div>

      {/* Dados Gerais */}
      <Card>
        <CardHeader>
          <CardTitle>Dados Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input 
                id="name" 
                value={employee.name}
                onChange={(e) => setEmployee(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input id="id" value={employee.id.toString()} disabled />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Disponibilidade para trabalho presencial?</Label>
              <p className="text-sm text-muted-foreground">
                Indica se você pode trabalhar no escritório quando necessário
              </p>
            </div>
            <Switch 
              checked={employee.isAvailableOnSite}
              onCheckedChange={(checked) => setEmployee(prev => ({ ...prev, isAvailableOnSite: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Perfil Comportamental */}
      <Card>
        <CardHeader>
          <CardTitle>Perfil Comportamental</CardTitle>
        </CardHeader>
        <CardContent>
          {employee.discProfile ? (
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3>Seu Perfil: {employee.discProfile.primaryType} - {
                    employee.discProfile.primaryType === 'D' ? 'Dominante' :
                    employee.discProfile.primaryType === 'I' ? 'Influente' :
                    employee.discProfile.primaryType === 'S' ? 'Estável' : 'Conforme'
                  }</h3>
                  <p className="text-muted-foreground">{employee.discProfile.description}</p>
                </div>
              </div>
              <Button variant="outline">Ver Relatório Detalhado</Button>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="mb-4">Seu perfil comportamental nos ajuda a encontrar os projetos ideais para você.</p>
              <Button>Iniciar Teste DISC</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hard Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Minhas Hard Skills & Competências</CardTitle>
          <CardDescription>
            Avalie suas habilidades de 0 (sem conhecimento) a 6 (especialista)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {Object.entries(skillCategories).map(([categoryKey, category]) => (
            <div key={categoryKey} className="space-y-4">
              <h3>{category.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map(skill => (
                  <div key={skill.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{skill.label}</Label>
                      <span className="text-sm text-muted-foreground">
                        {employee.hardSkills[skill.key]}/6
                      </span>
                    </div>
                    <Slider
                      value={[employee.hardSkills[skill.key]]}
                      onValueChange={([value]) => updateHardSkill(skill.key, value)}
                      max={6}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
              {categoryKey !== 'management' && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="availability">Disponibilidade Atual (%)</Label>
              <Input 
                id="availability" 
                type="number" 
                value={employee.availability}
                onChange={(e) => setEmployee(prev => ({ ...prev, availability: parseInt(e.target.value) || 0 }))}
                max="100"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Valor Hora (se aplicável)</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <Input 
                  id="hourlyRate" 
                  type="number" 
                  className="pl-10"
                  value={employee.hourlyRate || ''}
                  onChange={(e) => setEmployee(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) || undefined }))}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="interests">Interesses Profissionais</Label>
            <p className="text-sm text-muted-foreground mb-2">
              Em que tipo de projeto ou tecnologia você gostaria de trabalhar?
            </p>
            <Textarea 
              id="interests"
              value={employee.professionalInterests}
              onChange={(e) => setEmployee(prev => ({ ...prev, professionalInterests: e.target.value }))}
              rows={4}
              placeholder="Descreva seus interesses profissionais, tecnologias que gostaria de aprender ou tipos de projeto que mais te motivam..."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button size="lg">Salvar Alterações</Button>
      </div>
    </div>
  );
}