import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Trash2, Plus } from 'lucide-react';
import { Demand, Employee } from '../types';

interface DemandFormProps {
  onSubmit: (demand: Partial<Demand>) => void;
}

interface RequiredSkill {
  skill: keyof Employee['hardSkills'];
  minimumLevel: number;
}

export function DemandForm({ onSubmit }: DemandFormProps) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<string>('');
  const [technicalComplexity, setTechnicalComplexity] = useState([3]);
  const [demandType, setDemandType] = useState<string>('');
  const [clientType, setClientType] = useState<string>('');
  const [requiredSkills, setRequiredSkills] = useState<RequiredSkill[]>([]);
  const [behavioralPriorities, setBehavioralPriorities] = useState<string[]>([]);

  const skillOptions = [
    { value: 'angular', label: 'Angular' },
    { value: 'flutterFlow', label: 'FlutterFlow' },
    { value: 'java', label: 'Java' },
    { value: 'node', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'analyst', label: 'Analista/Gerente' },
    { value: 'facilitator', label: 'Facilitador' },
    { value: 'uiPrototyping', label: 'Prototipação (UI)' },
    { value: 'tester', label: 'Tester' }
  ];

  const behavioralOptions = [
    { id: 'D', label: 'Foco em Resultados (D)', description: 'Pessoas orientadas para objetivos e tomada de decisão' },
    { id: 'I', label: 'Boa Comunicação (I)', description: 'Pessoas comunicativas e influenciadoras' },
    { id: 'S', label: 'Constância e Ritmo (S)', description: 'Pessoas estáveis e confiáveis' },
    { id: 'C', label: 'Atenção a Detalhes (C)', description: 'Pessoas precisas e analíticas' }
  ];

  const addSkill = () => {
    setRequiredSkills(prev => [...prev, { skill: 'java', minimumLevel: 3 }]);
  };

  const removeSkill = (index: number) => {
    setRequiredSkills(prev => prev.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof RequiredSkill, value: any) => {
    setRequiredSkills(prev => prev.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    ));
  };

  const handleBehavioralChange = (behaviorId: string, checked: boolean) => {
    setBehavioralPriorities(prev => 
      checked 
        ? [...prev, behaviorId]
        : prev.filter(id => id !== behaviorId)
    );
  };

  const handleSubmit = () => {
    const demand: Partial<Demand> = {
      projectName,
      description,
      deadline: deadline as any,
      technicalComplexity: technicalComplexity[0],
      demandType: demandType as any,
      clientType: clientType as any,
      requiredSkills: requiredSkills as any,
      behavioralPriorities: behavioralPriorities as any
    };
    onSubmit(demand);
  };

  const isFormValid = projectName && description && deadline && demandType && clientType;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1>Solicitar Montagem de Time</h1>
        <p className="text-muted-foreground">
          Descreva as necessidades do projeto para que nossa IA encontre o time ideal.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Demanda</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Nome do Projeto/Demanda *</Label>
              <Input 
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Ex: Sistema de Gestão Tributária"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Prazo Estimado *</Label>
              <Select value={deadline} onValueChange={setDeadline}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o prazo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgente (até 1 mês)</SelectItem>
                  <SelectItem value="short">Curto Prazo (1-3 meses)</SelectItem>
                  <SelectItem value="medium">Médio Prazo (3-6 meses)</SelectItem>
                  <SelectItem value="long">Longo Prazo (6+ meses)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição / Backlog *</Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Descreva o projeto, principais funcionalidades ou adicione link do Jira/Azure DevOps..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Grau de Complexidade Técnica</Label>
              <div className="space-y-3">
                <Slider
                  value={technicalComplexity}
                  onValueChange={setTechnicalComplexity}
                  max={5}
                  min={1}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Simples</span>
                  <span>{technicalComplexity[0]}/5</span>
                  <span>Complexo</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="demandType">Tipo de Demanda *</Label>
              <Select value={demandType} onValueChange={setDemandType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discovery">Descoberta/Criação</SelectItem>
                  <SelectItem value="maintenance">Manutenção</SelectItem>
                  <SelectItem value="correction">Correção</SelectItem>
                  <SelectItem value="evolution">Evolução</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="clientType">Tipo de Cliente *</Label>
              <Select value={clientType} onValueChange={setClientType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="internal">Produtor Interno</SelectItem>
                  <SelectItem value="government">Governo</SelectItem>
                  <SelectItem value="private">Iniciativa Privada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Habilidades Essenciais</CardTitle>
            <Button onClick={addSkill} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Habilidade
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredSkills.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Adicione as habilidades técnicas necessárias para o projeto
            </p>
          ) : (
            requiredSkills.map((skill, index) => (
              <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
                <div className="flex-1 space-y-2">
                  <Label>Habilidade</Label>
                  <Select 
                    value={skill.skill} 
                    onValueChange={(value) => updateSkill(index, 'skill', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {skillOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex-1 space-y-2">
                  <Label>Nível Mínimo</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[skill.minimumLevel]}
                      onValueChange={([value]) => updateSkill(index, 'minimumLevel', value)}
                      max={6}
                      min={1}
                      step={1}
                    />
                    <div className="text-xs text-center text-muted-foreground">
                      {skill.minimumLevel}/6
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => removeSkill(index)} 
                  variant="destructive" 
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Perfil Comportamental Desejado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {behavioralOptions.map(option => (
              <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                <Checkbox 
                  id={option.id}
                  checked={behavioralPriorities.includes(option.id)}
                  onCheckedChange={(checked) => handleBehavioralChange(option.id, checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor={option.id} className="text-sm">
                    {option.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          size="lg" 
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          Buscar Time Ideal
        </Button>
      </div>
    </div>
  );
}