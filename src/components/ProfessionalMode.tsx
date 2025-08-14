import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Activity, Eye, Clock } from 'lucide-react';

interface OrderBookEntry {
  price: number;
  amount: number;
  total: number;
}

interface Trade {
  price: number;
  amount: number;
  time: string;
  type: 'buy' | 'sell';
}

const ProfessionalMode = () => {
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('limit');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('35000');

  // Mock data
  const tradingPairs = [
    { symbol: 'BTC/USDT', price: 35000, change: 2.1 },
    { symbol: 'ETH/USDT', price: 1300, change: -0.8 },
    { symbol: 'BNB/USDT', price: 245, change: 1.5 },
  ];

  const orderBook = {
    asks: [
      { price: 35020, amount: 0.5, total: 17510 },
      { price: 35015, amount: 0.8, total: 28012 },
      { price: 35010, amount: 1.2, total: 42012 },
      { price: 35005, amount: 0.3, total: 10502 },
      { price: 35000, amount: 2.1, total: 73500 },
    ],
    bids: [
      { price: 34995, amount: 0.7, total: 24497 },
      { price: 34990, amount: 1.1, total: 38489 },
      { price: 34985, amount: 0.6, total: 20991 },
      { price: 34980, amount: 0.9, total: 31482 },
      { price: 34975, amount: 1.5, total: 52463 },
    ]
  };

  const recentTrades: Trade[] = [
    { price: 35000, amount: 0.02, time: '14:32:15', type: 'buy' },
    { price: 34998, amount: 0.15, time: '14:32:10', type: 'sell' },
    { price: 35002, amount: 0.08, time: '14:32:05', type: 'buy' },
    { price: 34999, amount: 0.25, time: '14:31:58', type: 'sell' },
    { price: 35001, amount: 0.12, time: '14:31:45', type: 'buy' },
  ];

  const openOrders = [
    { id: '1', pair: 'BTC/USDT', type: 'buy', amount: 0.1, price: 34500, status: 'open' },
    { id: '2', pair: 'ETH/USDT', type: 'sell', amount: 2.0, price: 1320, status: 'partial' },
  ];

  const positions = [
    { symbol: 'BTC', amount: 0.25, value: 8750, pnl: 125.50, pnlPercent: 1.45 },
    { symbol: 'ETH', amount: 2.5, value: 3250, pnl: -45.20, pnlPercent: -1.37 },
  ];

  return (
    <div className="grid grid-cols-12 h-[calc(100vh-80px)] gap-1 bg-background">
      {/* Trading Pair Selector */}
      <div className="col-span-12 bg-card border-b border-border p-4">
        <div className="flex items-center space-x-6">
          <Select value={selectedPair} onValueChange={setSelectedPair}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tradingPairs.map(pair => (
                <SelectItem key={pair.symbol} value={pair.symbol}>
                  <div className="flex items-center justify-between w-full">
                    <span>{pair.symbol}</span>
                    <span className={`ml-4 ${pair.change >= 0 ? 'price-positive' : 'price-negative'}`}>
                      ${pair.price.toLocaleString()} ({pair.change > 0 ? '+' : ''}{pair.change}%)
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold price-positive">
              $35,000.00
            </div>
            <Badge variant="secondary" className="price-positive">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.1%
            </Badge>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="col-span-8 bg-card border-r border-border">
        <div className="h-full flex items-center justify-center bg-chart-background">
          <div className="text-center text-muted-foreground">
            <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">交易图表</p>
            <p className="text-sm">K线图、技术指标和交易工具</p>
          </div>
        </div>
      </div>

      {/* Trading Panel */}
      <div className="col-span-4 bg-card p-6">
        <Tabs value={tradeType} onValueChange={(value: any) => setTradeType(value)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="buy" className="text-success">买入</TabsTrigger>
            <TabsTrigger value="sell" className="text-destructive">卖出</TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button 
                  variant={orderType === 'limit' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('limit')}
                  className="flex-1"
                >
                  限价单
                </Button>
                <Button 
                  variant={orderType === 'market' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('market')}
                  className="flex-1"
                >
                  市价单
                </Button>
              </div>

              {orderType === 'limit' && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">价格 (USDT)</label>
                  <Input 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">数量 (BTC)</label>
                <Input 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">25%</Button>
                <Button variant="outline" size="sm" className="flex-1">50%</Button>
                <Button variant="outline" size="sm" className="flex-1">75%</Button>
                <Button variant="outline" size="sm" className="flex-1">100%</Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">总额:</span>
                  <span className="font-medium">
                    {amount && price ? (parseFloat(amount) * parseFloat(price)).toLocaleString() : '0.00'} USDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">可用余额:</span>
                  <span className="font-medium">12,580.50 USDT</span>
                </div>
              </div>

              <Button className="btn-buy w-full hover-lift">
                买入 BTC
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button 
                  variant={orderType === 'limit' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('limit')}
                  className="flex-1"
                >
                  限价单
                </Button>
                <Button 
                  variant={orderType === 'market' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('market')}
                  className="flex-1"
                >
                  市价单
                </Button>
              </div>

              {orderType === 'limit' && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">价格 (USDT)</label>
                  <Input 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-muted-foreground">数量 (BTC)</label>
                <Input 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">25%</Button>
                <Button variant="outline" size="sm" className="flex-1">50%</Button>
                <Button variant="outline" size="sm" className="flex-1">75%</Button>
                <Button variant="outline" size="sm" className="flex-1">100%</Button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">总额:</span>
                  <span className="font-medium">
                    {amount && price ? (parseFloat(amount) * parseFloat(price)).toLocaleString() : '0.00'} USDT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">可用余额:</span>
                  <span className="font-medium">0.25 BTC</span>
                </div>
              </div>

              <Button className="btn-sell w-full hover-lift">
                卖出 BTC
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Book */}
      <div className="col-span-4 bg-card border-r border-border">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">订单簿</h3>
        </div>
        <div className="p-2">
          {/* Asks */}
          <div className="mb-2">
            <div className="text-xs text-muted-foreground grid grid-cols-3 px-2 mb-1">
              <span>价格</span>
              <span className="text-right">数量</span>
              <span className="text-right">总额</span>
            </div>
            {orderBook.asks.reverse().map((ask, i) => (
              <div key={i} className="text-xs grid grid-cols-3 px-2 py-0.5 hover:bg-card-hover cursor-pointer">
                <span className="price-negative">{ask.price.toLocaleString()}</span>
                <span className="text-right text-muted-foreground">{ask.amount}</span>
                <span className="text-right text-muted-foreground">{ask.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
          
          {/* Spread */}
          <div className="py-2 text-center text-sm font-medium border-y border-border">
            <span className="text-muted-foreground">价差: </span>
            <span className="text-foreground">15.00 (0.04%)</span>
          </div>

          {/* Bids */}
          <div className="mt-2">
            {orderBook.bids.map((bid, i) => (
              <div key={i} className="text-xs grid grid-cols-3 px-2 py-0.5 hover:bg-card-hover cursor-pointer">
                <span className="price-positive">{bid.price.toLocaleString()}</span>
                <span className="text-right text-muted-foreground">{bid.amount}</span>
                <span className="text-right text-muted-foreground">{bid.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="col-span-4 bg-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold">最近成交</h3>
        </div>
        <div className="p-2">
          <div className="text-xs text-muted-foreground grid grid-cols-3 px-2 mb-1">
            <span>价格</span>
            <span className="text-right">数量</span>
            <span className="text-right">时间</span>
          </div>
          {recentTrades.map((trade, i) => (
            <div key={i} className="text-xs grid grid-cols-3 px-2 py-0.5 hover:bg-card-hover">
              <span className={trade.type === 'buy' ? 'price-positive' : 'price-negative'}>
                {trade.price.toLocaleString()}
              </span>
              <span className="text-right text-muted-foreground">{trade.amount}</span>
              <span className="text-right text-muted-foreground">{trade.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Orders and Positions */}
      <div className="col-span-4 bg-card border-r border-border">
        <Tabs defaultValue="orders" className="h-full">
          <div className="p-4 border-b border-border">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="orders">当前委托</TabsTrigger>
              <TabsTrigger value="positions">持仓</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="orders" className="p-2 mt-0">
            {openOrders.length > 0 ? (
              <div className="space-y-2">
                {openOrders.map((order) => (
                  <Card key={order.id} className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant={order.type === 'buy' ? 'default' : 'secondary'} className="text-xs">
                          {order.type === 'buy' ? '买入' : '卖出'}
                        </Badge>
                        <span className="text-sm font-medium">{order.pair}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {order.status === 'open' ? '待成交' : '部分成交'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>数量:</span>
                        <span>{order.amount} {order.pair.split('/')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>价格:</span>
                        <span>${order.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                <div className="text-center">
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">暂无委托订单</p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="positions" className="p-2 mt-0">
            <div className="space-y-2">
              {positions.map((position) => (
                <Card key={position.symbol} className="p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{position.symbol}</span>
                    <div className={`text-sm font-medium ${
                      position.pnl >= 0 ? 'price-positive' : 'price-negative'
                    }`}>
                      {position.pnl >= 0 ? '+' : ''}${position.pnl}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>持仓:</span>
                      <span>{position.amount} {position.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>价值:</span>
                      <span>${position.value.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>收益率:</span>
                      <span className={position.pnl >= 0 ? 'price-positive' : 'price-negative'}>
                        {position.pnl >= 0 ? '+' : ''}{position.pnlPercent}%
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfessionalMode;