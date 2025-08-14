import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Eye, Plus } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Cell, AreaChart, Area, XAxis, YAxis, Pie } from 'recharts';

interface AssetOverviewProps {
  isBeginnerMode: boolean;
}

const AssetOverview = ({ isBeginnerMode }: AssetOverviewProps) => {
  const portfolio = {
    totalValue: 12580.50,
    availableBalance: 580.50,
    todayPnL: 245.80,
    todayPnLPercent: 1.99,
    assets: [
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        amount: 0.25,
        value: 8750.00,
        price: 35000.00,
        change24h: 2.1,
        allocation: 69.6
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        amount: 2.5,
        value: 3250.00,
        price: 1300.00,
        change24h: -0.8,
        allocation: 25.8
      },
      {
        symbol: 'USDT',
        name: 'Tether',
        amount: 580.50,
        value: 580.50,
        price: 1.00,
        change24h: 0,
        allocation: 4.6
      }
    ]
  };

  const pieChartData = portfolio.assets.map(asset => ({
    name: asset.symbol,
    value: asset.allocation,
    color: asset.symbol === 'BTC' ? '#F7931A' : 
           asset.symbol === 'ETH' ? '#627EEA' : 
           '#26A17B'
  }));

  const performanceData = [
    { date: '01/10', value: 11200 },
    { date: '01/11', value: 11650 },
    { date: '01/12', value: 11420 },
    { date: '01/13', value: 12100 },
    { date: '01/14', value: 12580 },
  ];

  if (isBeginnerMode) {
    return (
      <div className="p-6 space-y-6 bg-background min-h-[calc(100vh-80px)]">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Total Asset Value */}
          <Card className="trading-card text-center p-8">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-muted-foreground mb-2">总资产价值</h2>
                <div className="text-4xl font-bold text-foreground mb-2">
                  ${portfolio.totalValue.toLocaleString()}
                </div>
                <div className={`flex items-center justify-center space-x-2 text-lg ${
                  portfolio.todayPnL >= 0 ? 'price-positive' : 'price-negative'
                }`}>
                  {portfolio.todayPnL >= 0 ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span>
                    今日 {portfolio.todayPnL >= 0 ? '+' : ''}${portfolio.todayPnL} 
                    ({portfolio.todayPnL >= 0 ? '+' : ''}{portfolio.todayPnLPercent}%)
                  </span>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button className="btn-buy">
                  <Plus className="w-4 h-4 mr-2" />
                  买入
                </Button>
                <Button className="btn-sell">
                  <DollarSign className="w-4 h-4 mr-2" />
                  卖出
                </Button>
              </div>
            </div>
          </Card>

          {/* Asset Holdings */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {portfolio.assets.map((asset) => (
              <Card key={asset.symbol} className="trading-card hover-lift">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{asset.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                  <Badge variant={asset.change24h >= 0 ? 'default' : 'secondary'}>
                    {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">持有数量</span>
                    <span className="font-medium">{asset.amount} {asset.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">当前价格</span>
                    <span className="font-medium">${asset.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">总价值</span>
                    <span className="text-lg font-bold">${asset.value.toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Asset Allocation */}
          <Card className="trading-card">
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">资产分布</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                {portfolio.assets.map((asset, index) => (
                  <div key={asset.symbol} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: pieChartData[index].color }}
                      />
                      <span className="font-medium">{asset.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{asset.allocation}%</div>
                      <div className="text-sm text-muted-foreground">
                        ${asset.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Professional Mode
  return (
    <div className="grid grid-cols-12 gap-6 p-6 bg-background min-h-[calc(100vh-80px)]">
      {/* Summary Cards */}
      <div className="col-span-12 grid grid-cols-4 gap-4">
        <Card className="trading-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">总资产</p>
              <p className="text-xl font-bold">${portfolio.totalValue.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="trading-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">今日盈亏</p>
              <p className={`text-xl font-bold ${portfolio.todayPnL >= 0 ? 'price-positive' : 'price-negative'}`}>
                {portfolio.todayPnL >= 0 ? '+' : ''}${portfolio.todayPnL}
              </p>
            </div>
          </div>
        </Card>

        <Card className="trading-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Eye className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">可用余额</p>
              <p className="text-xl font-bold">${portfolio.availableBalance.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="trading-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary rounded-lg">
              <BarChart3 className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">持仓品种</p>
              <p className="text-xl font-bold">{portfolio.assets.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Portfolio Performance Chart */}
      <Card className="col-span-8 trading-card">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">资产走势</h3>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">7天</Badge>
            <Badge variant="outline">30天</Badge>
            <Badge variant="default">90天</Badge>
            <Badge variant="outline">1年</Badge>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Asset Allocation */}
      <Card className="col-span-4 trading-card">
        <h3 className="text-lg font-semibold mb-4">持仓分布</h3>
        
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          {portfolio.assets.map((asset, index) => (
            <div key={asset.symbol} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: pieChartData[index].color }}
                />
                <span>{asset.symbol}</span>
              </div>
              <span className="font-medium">{asset.allocation}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Holdings */}
      <div className="col-span-12">
        <Card className="trading-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">资产明细</h3>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              添加资产
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-sm text-muted-foreground">
                  <th className="text-left py-3">资产</th>
                  <th className="text-right py-3">持仓数量</th>
                  <th className="text-right py-3">当前价格</th>
                  <th className="text-right py-3">24h变化</th>
                  <th className="text-right py-3">持仓价值</th>
                  <th className="text-right py-3">分配比例</th>
                  <th className="text-right py-3">操作</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.assets.map((asset) => (
                  <tr key={asset.symbol} className="border-b border-border hover:bg-card-hover">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{asset.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-medium">{asset.symbol}</div>
                          <div className="text-sm text-muted-foreground">{asset.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4 font-medium">
                      {asset.amount} {asset.symbol}
                    </td>
                    <td className="text-right py-4 font-medium">
                      ${asset.price.toLocaleString()}
                    </td>
                    <td className={`text-right py-4 font-medium ${
                      asset.change24h >= 0 ? 'price-positive' : 'price-negative'
                    }`}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                    </td>
                    <td className="text-right py-4 font-bold">
                      ${asset.value.toLocaleString()}
                    </td>
                    <td className="text-right py-4">
                      {asset.allocation}%
                    </td>
                    <td className="text-right py-4">
                      <div className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          买入
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          卖出
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AssetOverview;