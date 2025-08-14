import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, User, TrendingUp, Bot, BarChart3 } from 'lucide-react';
import AIAssistantMode from './AIAssistantMode';
import ProfessionalMode from './ProfessionalMode';
import AssetOverview from './AssetOverview';

const TradingPlatform = () => {
  const [isBeginnerMode, setIsBeginnerMode] = useState(true);
  const [currentView, setCurrentView] = useState<'trading' | 'assets'>('trading');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">CryptoCanvas</h1>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              Beta
            </Badge>
          </div>

          <div className="flex items-center space-x-6">
            {/* Mode Toggle */}
            <div className="flex items-center space-x-3 bg-secondary rounded-lg p-2">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">新手模式</span>
              </div>
              <Switch 
                checked={!isBeginnerMode} 
                onCheckedChange={(checked) => setIsBeginnerMode(!checked)}
              />
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">专业模式</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-4">
              <Button 
                variant={currentView === 'trading' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentView('trading')}
              >
                交易
              </Button>
              <Button 
                variant={currentView === 'assets' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setCurrentView('assets')}
              >
                资产
              </Button>
            </nav>

            {/* User Controls */}
            <div className="flex items-center space-x-3">
              <div className="status-online"></div>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {currentView === 'trading' ? (
          isBeginnerMode ? <AIAssistantMode /> : <ProfessionalMode />
        ) : (
          <AssetOverview isBeginnerMode={isBeginnerMode} />
        )}
      </main>
    </div>
  );
};

export default TradingPlatform;