import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, DollarSign, TrendingUp, TrendingDown, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  tradingAction?: {
    type: 'buy' | 'sell';
    symbol: string;
    amount: number;
    price: number;
  };
}

const AIAssistantMode = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: '欢迎使用AI交易助手！我将帮助您进行加密货币交易。',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'ai',
      content: '您好！我是您的专属交易助手。我可以帮您查询价格、分析市场趋势、执行交易操作。请问今天想要了解什么呢？',
      timestamp: new Date(),
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { label: '查询BTC价格', action: 'price_btc' },
    { label: '买入ETH', action: 'buy_eth' },
    { label: '查看市场趋势', action: 'market_trend' },
    { label: '我的持仓', action: 'my_portfolio' },
  ];

  const assetSummary = {
    totalValue: 12580.50,
    dayChange: 245.80,
    dayChangePercent: 1.99,
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', amount: 0.25, value: 8750.00, change: 2.1 },
      { symbol: 'ETH', name: 'Ethereum', amount: 2.5, value: 3250.00, change: -0.8 },
      { symbol: 'USDT', name: 'Tether', amount: 580.50, value: 580.50, change: 0 },
    ]
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(content),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      '我已经为您查询了最新的市场数据。当前BTC价格为$35,000，相比昨日上涨了2.1%。根据技术分析，建议您可以考虑适量买入。',
      '基于您的投资组合分析，建议您适当增加ETH的持仓比例。当前ETH价格相对较低，具有较好的投资机会。',
      '市场整体呈现上涨趋势。建议您保持当前的投资策略，并密切关注市场动态。',
      '您的投资组合表现良好！今日收益为$245.80，收益率1.99%。建议继续持有并考虑定投策略。',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="fade-in">
              {message.type === 'system' && (
                <div className="chat-bubble-system">
                  {message.content}
                </div>
              )}
              
              {message.type === 'user' && (
                <div className="flex justify-end">
                  <div className="flex items-start space-x-3 max-w-md">
                    <div className="chat-bubble-user">
                      {message.content}
                    </div>
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                </div>
              )}
              
              {message.type === 'ai' && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="chat-bubble-ai">
                    {message.content}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="chat-bubble-ai">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                variant="outline"
                size="sm"
                onClick={() => sendMessage(action.label)}
                className="text-xs"
              >
                {action.label}
              </Button>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="请输入您的问题或交易指令..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputMessage);
                }
              }}
              className="flex-1"
            />
            <Button 
              onClick={() => sendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              className="btn-trade"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Asset Summary Sidebar */}
      <div className="w-80 bg-card border-l border-border p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">资产概览</h3>
          
          <Card className="trading-card space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                ${assetSummary.totalValue.toLocaleString()}
              </div>
              <div className={`flex items-center justify-center space-x-1 text-sm ${
                assetSummary.dayChange >= 0 ? 'price-positive' : 'price-negative'
              }`}>
                {assetSummary.dayChange >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>
                  ${Math.abs(assetSummary.dayChange)} ({Math.abs(assetSummary.dayChangePercent)}%)
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <h4 className="text-md font-medium mb-3">主要持仓</h4>
          <div className="space-y-3">
            {assetSummary.assets.map((asset) => (
              <Card key={asset.symbol} className="trading-card">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-foreground">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">{asset.amount}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${asset.value.toLocaleString()}</div>
                    <div className={`text-sm ${
                      asset.change > 0 ? 'price-positive' : 
                      asset.change < 0 ? 'price-negative' : 'price-neutral'
                    }`}>
                      {asset.change > 0 ? '+' : ''}{asset.change}%
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Button className="btn-buy w-full">
            <DollarSign className="w-4 h-4 mr-2" />
            快速买入
          </Button>
          <Button className="btn-sell w-full">
            <TrendingDown className="w-4 h-4 mr-2" />
            快速卖出
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantMode;