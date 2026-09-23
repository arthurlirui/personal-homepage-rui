# 📈 Quant Trading System

> 多策略 · 多核 · LLM 增强的 Binance 量化交易系统（现货 + USDⓈ-M 合约）

[![Python](https://img.shields.io/badge/Python-3.12+-blue?logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111+-00a393?logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Lightweight Charts](https://img.shields.io/badge/Lightweight%20Charts-5.x-FF4500)](https://github.com/tradingview/lightweight-charts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ 功能特性

- **🧮 八大策略并行**：VolumeSurge / GridTrading / MACD+RSI / MeanReversion / MomentumBreakout / LLMMartingale / LLMChaseReversal / **NewsSentiment (事件驱动)**，统一注册表 + 工厂模式。
- **📰 web_search 信息搜索模块**：RSS (CoinDesk/Cointelegraph/The Block/Decrypt/Bitcoinist) + Binance 公告 + NewsAPI/CryptoPanic + Reddit (PRAW) + X API v2 + 恐慌贪婪指数 + Whale Alert + CoinGlass 资金费率；APScheduler 定时调度 + URL 去重 + LLM/关键词双模情绪打分 + 突发新闻实时 WS 推送。
- **⚡ 多核交易引擎**：基于 `multiprocessing` + `shared_memory` 的无锁 RingBuffer (seqlock)，每个策略 pin 到独立物理核 (`os.sched_setaffinity`)，零拷贝行情广播；v0.3.0 起支持接入真实 Binance WS 行情（可切换合成随机游走）。
- **🧠 LLM 市场态势预测**：调用 OpenAI / DeepSeek 兼容接口对 K 线 + 技术指标做态势分析，输出方向 / 置信度 / 单边行情标志，并按权重融入策略信号；API 不可用时自动降级为统计预测。
- **🎯 参数优化器**：GridSearch 网格搜索 + Walk-Forward 滚动验证（防过拟合），多维加权评分 (Sharpe / Return / MaxDD)，参数稳定性分析 (变异系数)，样本外过拟合比指标。
- **📊 情绪融合**：非 LLM 策略信号经三因子融合 `final = (1-w_llm-w_news)*base + w_llm*llm + w_news*news`，权重通过 REST 实时可调。
- **📡 Binance 限流 + 深度数据**：按 endpoint 权重表 + 每分钟窗口限流 (默认 1080 权重)，429/418 指数退避 + `Retry-After` 尊重 + `X-MBX-USED-WEIGHT-1M` 头校准；新增 `@depth20@100ms` 流 + 本地 orderbook 维护 + REST `/api/v3/depth`。
- **📈 合约 & 杠杆交易**：Binance USDⓈ-M Futures，1×–125× 杠杆，逐仓 / 全仓切换，真实的 `positionSide` 传递（双向持仓模式），止损止盈一体化。
- **🔙 事件驱动回测**：输出 Sharpe / MaxDD / 胜率 / Profit Factor 等指标；信号词汇统一为 `{buy, sell, close_long, close_short, hold}`。
- **🖥️ React 交易终端**：深色 TradingView 风格设计系统，5 路由布局（交易 / 仪表盘 / 新闻 / 回测 / 设置），OrderBook 深度报价、NewsFeed 实时新闻流、SentimentPanel 情绪仪表盘、OptimizerPanel 参数优化、OrderTicket 手动下单、PositionTable 持仓表；react-router 代码分割 + recharts 可视化。
- **✅ 单元测试**：34 个 pytest 用例覆盖信号词汇、限流器、情绪打分、参数优化器、walk-forward 切片。
- **🔐 测试网优先**：默认连接 Binance 测试网，无需 API Key 即可启动（3 个 keyless 信息源开箱可用）。

---

## 🏗️ 架构

```
┌─────────────────────────────────────────────────────────────┐
│  Core 0  │  React Frontend (Lightweight Charts + Dashboard)  │
└─────────────────────────▲───────────────────────────────────┘
                          │ WebSocket / REST
┌─────────────────────────┴───────────────────────────────────┐
│  Core 1  │  FastAPI + Binance WS  ──►  SharedRingBuffer      │
└─────────────────────────▲───────────────────────────────────┘
                          │ zero-copy
       ┌──────────────────┼──────────────────┐
       ▼                  ▼                  ▼
┌────────────┐    ┌────────────┐    ┌────────────┐  Core 2..N-1
│ VolumeSurge│    │  Grid /    │    │ Momentum / │  策略进程集群
│  + LLM     │    │ MACD+RSI   │    │ MeanRev    │  (CPU pinned)
└─────┬──────┘    └─────┬──────┘    └─────┬──────┘
      └──────── mp.Queue (signals) ───────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Core N  │  Trade Executor + RiskManager → Binance Spot/Fut │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 快速开始

### 前置条件
- Python 3.12+ / Node.js 20+
- Linux（`os.sched_setaffinity` 仅 Linux；macOS/Windows 下多核引擎会跳过亲和性绑定，自动降级为普通多进程）
- Binance 测试网账户（可选）
- 至少一个 LLM API Key（可选，未配置时自动退化统计预测）
- 至少一个新闻源 API Key（可选，3 个源开箱即用）

### 后端

```bash
cd backend
python -m venv .venv && source .venv/bin/activate    # Windows: py -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt

# 配置（可选，复制后按需填写）
cp .env.example .env                                  # Windows: copy .env.example .env

# 启动 API
uvicorn app.main:app --reload --host 0.0.0.0 --port 8003
```

API 文档：http://localhost:8003/docs

### 前端

```bash
cd frontend
npm install
npm run dev   # http://localhost:5190 (Vite 代理 /api → :8003)
```

### 多核引擎（可选）

```bash
cd backend
python -m app.core.multicore.engine   # 启动 SharedMemory + 多进程策略集群
```

---

## 🧠 策略说明

| 策略 ID | 名称 | 适用市场 | 核心逻辑 |
|---|---|---|---|
| `volume_surge` | Volume Surge | spot / futures | 价格 + 成交量 + 量变率三因子 Z-Score 突破 |
| `grid` | Grid Trading | spot / futures | 区间网格挂单，震荡行情捕捉差价 |
| `macd_rsi` | MACD + RSI | spot / futures | MACD 金叉 + RSI 过滤，趋势确认 |
| `mean_reversion` | Mean Reversion | spot | 价格偏离均值 N×σ 反向入场 |
| `momentum` | Momentum Breakout | spot / futures | 突破近 N 周期高低点，顺势跟踪 |
| `llm_martingale` | LLM Martingale | spot / futures | LLM 预测方向 + 马丁格尔加仓 |
| `llm_chase_reversal` | LLM Chase Reversal | spot / futures | LLM 识别反转点追入 |
| `news_sentiment` | 新闻情绪 | spot / futures | 突发新闻事件驱动 + 趋势过滤 + 反向新闻提前离场 |

所有非 LLM 策略可接 `LLMStrategyIntegration` 进行三因子信号融合：
```
final_signal = (1 - w_llm - w_news) × base + w_llm × llm.strength + w_news × news.score
```
当 `confidence > boost_threshold` 时触发信号增强；权重通过 `PUT /api/v1/llm/integration/config` 实时调节。

---

## 📡 API 接口

### REST

| 方法 | 路径 | 说明 |
|---|---|---|
| `GET` | `/api/v1/status` | 系统状态 |
| `GET` | `/api/v1/strategies/types` | 可用策略元数据 |
| `GET\|POST` | `/api/v1/strategies` | 策略列表 / 创建 |
| `GET\|PUT\|DELETE` | `/api/v1/strategies/{id}` | 策略详情 / 更新 / 删除 |
| `POST` | `/api/v1/strategies/{id}/start\|stop` | 启停策略 |
| `GET` | `/api/v1/strategies/{id}/state` | 运行时状态 |
| `GET` | `/api/v1/market/ticker/{symbol}` | 实时报价 |
| `GET` | `/api/v1/market/klines/{symbol}` | K 线历史 |
| `GET` | `/api/v1/market/info` | 交易对元信息 |
| `POST` | `/api/v1/market/download` | 下载历史 K 线入库 |
| `GET` | `/api/v1/market/data[/stats]` | 本地数据查询 / 统计 |
| `POST\|GET\|DELETE` | `/api/v1/orders` | 下单 / 查询 / 撤单 |
| `GET` | `/api/v1/positions` | 当前持仓 |
| `GET` | `/api/v1/account` | 账户信息 |
| `GET\|PUT` | `/api/v1/risk[/config]` | 风控状态 / 配置 |
| `GET` | `/api/v1/trades` | 历史成交 |
| `POST` | `/api/v1/backtest/run` | 运行回测 |
| `GET` | `/api/v1/backtest/{id}` | 回测结果 |
| `GET` | `/api/v1/llm/prediction` | LLM 市场预测 |
| `GET\|PUT` | `/api/v1/llm/integration/config` | LLM 集成权重配置 |
| `GET` | `/api/v1/market/orderbook/{symbol}` | 深度报价 (REST) |
| `GET` | `/api/v1/market/rate-limit` | Binance 限流状态 |
| `GET` | `/api/v1/news` | 新闻列表 (分页 + 过滤) |
| `GET` | `/api/v1/news/sentiment/{symbol}` | symbol 聚合情绪 |
| `GET` | `/api/v1/news/sources/status` | 新闻源启用状态 |
| `POST` | `/api/v1/news/refresh` | 立即拉取所有新闻源 |
| `POST` | `/api/v1/strategies/{type}/optimize` | 参数网格搜索 |
| `POST` | `/api/v1/strategies/{type}/walk-forward` | Walk-Forward 滚动验证 |
| `GET` | `/api/v1/optimizer/results[/{id}]` | 优化结果列表 / 详情 |
| `GET` | `/health` | 健康检查 |

### WebSocket

| 路径 | 说明 |
|---|---|
| `/api/v1/ws/market/{symbol}` | 实时 K 线 + ticker + 深度 (depth) |
| `/api/v1/ws/signals` | 策略信号实时推送 |
| `/api/v1/ws/news` | 突发新闻实时推送 (importance ≥ 0.7) |

---

## 🖥️ 命令行接口 (CLI)

系统提供完整 CLI, **无需启动 API 服务** 即可直接调用核心引擎 (回测/优化/数据/策略 CRUD 均离线可用)。
基于 [typer](https://typer.tiangolo.com), 支持 table / JSON 两种输出。

### 安装与运行

```bash
# 方式 A: 仓库根目录直接运行 (无需安装, 自动定位 backend/)
py -3 quant-cli <command> [subcommand] [options]

# 方式 B: 以模块形式运行 (需在 backend/ 目录)
cd backend && python -m app.cli <command> [subcommand] [options]

# 方式 C: 安装 console_script (pip install -e . 后)
pip install -e .
quant-cli <command> [subcommand] [options]
```

### 全局选项

| 选项 | 环境变量 | 说明 |
|---|---|---|
| `-o, --output json\|table` | `QUANT_CLI_OUTPUT` | 输出格式 (默认 table) |
| `--no-color` | `NO_COLOR` | 禁用 ANSI 颜色 |
| `-v, --verbose` | | 详细日志 (含 SQL) |
| `--db-url URL` | | 覆盖数据库连接 |

> 全局选项须放在子命令**之前**: `quant-cli --output json strategy list-types`

### 命令总览

```
quant-cli system     status / config                  # 系统状态与配置
quant-cli strategy   list-types / list / create /     # 策略管理
                     show / delete / start / stop /
                     judge / state / logs / clear-logs
quant-cli market     ticker / klines / orderbook /    # 实时行情
                     info / rate-limit
quant-cli data       download / download-range /      # 历史数据
                     coverage / query / stats / delete
quant-cli backtest   run / list / show                # 回测引擎
quant-cli optimizer  optimize / walk-forward          # 参数优化
quant-cli trade      order / cancel / orders /        # 交易执行
                     positions / account / risk / risk-set
quant-cli news       list / sentiment / sources /     # 新闻情绪
                     refresh
quant-cli news llm   predict / config                 # LLM 预测
```

### 常用示例

```bash
# 系统状态
quant-cli system status

# 策略: 列出类型 / 创建 / 启停 (启停需 --server 指向运行中的 API)
quant-cli strategy list-types
quant-cli strategy create -t grid -s ETHUSDT --params '{"grid_levels":12}'
quant-cli strategy start <id> --server http://localhost:8003

# 回测: 直接调用引擎, 无需联网 (synthetic 合成数据兜底)
quant-cli backtest run -t momentum -s BTCUSDT --data-source synthetic --lookback-hours 24
quant-cli --output json backtest run -t volume_surge --json    # 完整 trades/equity

# 参数优化: 网格搜索 + Walk-Forward
quant-cli optimizer optimize volume_surge --grid '{"lookback":[10,20,30]}'
quant-cli optimizer walk-forward macd_rsi --grid '{"macd_fast":[12,24]}' --train 500 --test 100

# 数据: 下载历史 K 线并入库
quant-cli data download -s BTCUSDT -i 1m --limit 500
quant-cli data coverage -s BTCUSDT -i 1m        # 覆盖率与缺口
quant-cli data query -s BTCUSDT -i 1m -l 10     # 查询最近 10 根

# 交易: 下单 / 持仓 / 风控 (直连 Binance testnet)
quant-cli trade order -s BTCUSDT --side buy --qty 0.01
quant-cli trade positions
quant-cli trade risk

# 新闻与 LLM
quant-cli news list --symbol BTCUSDT --limit 10
quant-cli news llm predict -s BTCUSDT
```

### 运行态命令 (需 API 服务)

`start` / `stop` / `judge` / `state` 涉及运行中的策略实例 (WebSocket 订阅),
需通过 `--server http://localhost:8003` 转发给 FastAPI 服务:

```bash
uvicorn app.main:app --port 8003 &     # 启动 API
quant-cli strategy start <id> --server http://localhost:8003
quant-cli strategy judge <id> --server http://localhost:8003
quant-cli strategy state <id> --server http://localhost:8003
```

---

## 📁 项目结构

```
quant-trading/
├── backend/
│   ├── app/
│   │   ├── main.py                 # FastAPI 入口 + 所有路由 (56 个)
│   │   ├── config.py               # Pydantic Settings (含 web search / 多核开关)
│   │   ├── db.py / models/         # SQLAlchemy 异步 ORM (Strategy/Order/Kline/BacktestRun/NewsItem)
│   │   ├── cli/                    # 🖥️ 命令行接口 (typer, 无需启动 API)
│   │   │   ├── main.py             # 入口 + 命令组挂载
│   │   │   ├── context.py          # 异步运行/DB会话/输出格式化 (table|json)
│   │   │   ├── client.py           # HTTP 客户端 (--server 模式)
│   │   │   ├── system_cmd.py       # status / config
│   │   │   ├── strategy_cmd.py     # 策略 CRUD + 启停 + 判断 + 日志
│   │   │   ├── market_cmd.py       # 行情 + 历史数据
│   │   │   ├── backtest_cmd.py     # 回测 run/list/show
│   │   │   ├── optimizer_cmd.py    # GridSearch + Walk-Forward
│   │   │   ├── trade_cmd.py        # 下单/持仓/账户/风控
│   │   │   └── news_cmd.py         # 新闻 + LLM
│   │   └── core/
│   │       ├── exchange.py         # Binance WS/REST (kline + ticker + depth@100ms)
│   │       ├── exchange_rate_limiter.py  # 权重限流 + 429/418 退避 + 头校准
│   │       ├── backtest.py         # 事件驱动回测引擎
│   │       ├── strategies/         # 8 大策略 + 注册表 + NewsSentiment 事件驱动
│   │       ├── optimizer/          # GridSearch + Walk-Forward + 结果数据类
│   │       ├── websearch/          # 8 信息源 + 调度器 + 情绪打分 + 聚合器
│   │       ├── trading/            # executor / risk_manager / futures
│   │       ├── llm/                # LLM 预测器 + 特征提取 + 三因子集成层
│   │       └── multicore/          # MultiCoreEngine + SharedRingBuffer (真实行情接入)
│   ├── tests/                      # pytest 单元测试 (34 个)
│   ├── .env.example                # 全部环境变量样板
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── App.tsx                 # react-router 5 路由布局
│       ├── pages/                  # TradingTerminal / NewsPage / BacktestPage / SettingsPage
│       ├── components/             # Chart / Trading / Dashboard / News / ui
│       ├── hooks/                  # useWebSocket / useOrderBook / useNews
│       ├── store/                  # zustand marketStore (含 orderbook/news/sentiment/optimizer)
│       ├── styles/theme.ts         # TradingView 风格深色调色板
│       └── config.ts               # API/WS URL helper
├── agents/                         # 智能体集群任务卡 (A~E)
├── scripts/                        # 工具脚本
├── quant-cli                       # 🖥️ CLI 入口脚本 (py -3 quant-cli ...)
├── pyproject.toml                  # 包定义 + quant-cli console_script
├── AGENT_CLUSTER.md                # 智能体分工
├── ARCHITECTURE.md                 # 详细架构文档
└── README.md
```

---

## ⚙️ 配置（.env）

```env
# 基础
APP_ENV=development
LOG_LEVEL=INFO
DATABASE_URL=sqlite+aiosqlite:///./quant_trading.db

# Binance
BINANCE_TESTNET=true
BINANCE_API_KEY=
BINANCE_SECRET_KEY=
DEFAULT_SYMBOL=BTCUSDT
DEFAULT_TIMEFRAME=1m

# 风控
MAX_POSITION_SIZE=1.0
MAX_LEVERAGE=1

# 重连 / 健康检查
RECONNECT_MIN_DELAY=1.0
RECONNECT_MAX_DELAY=60.0
RECONNECT_BACKOFF=2.0
HEALTH_CHECK_INTERVAL=30

# 回测默认值
BACKTEST_INITIAL_CAPITAL=10000.0
BACKTEST_COMMISSION=0.001
DEFAULT_LOOKBACK=20
DEFAULT_ENTRY_THRESHOLD=2.0
DEFAULT_EXIT_THRESHOLD=0.5
DEFAULT_STOP_LOSS_PCT=2.0
DEFAULT_TAKE_PROFIT_PCT=5.0

# LLM 市场态势（可选）
LLM_API_URL=https://api.deepseek.com/v1/chat/completions
LLM_API_KEY=
LLM_MODEL=deepseek-chat
LLM_INTEGRATION_WEIGHT=0.3
NEWS_INTEGRATION_WEIGHT=0.2

# 多核引擎（可选）
USE_MULTICORE_ENGINE=false

# Web Search 信息源（可选, 不填则该源自动禁用）
NEWSAPI_KEY=
CRYPTOPANIC_KEY=
REDDIT_CLIENT_ID=
REDDIT_CLIENT_SECRET=
REDDIT_USER_AGENT=quant-trading/0.3
TWITTER_BEARER_TOKEN=
WHALE_ALERT_KEY=
```

> ⚠️ 实盘交易请显式 `BINANCE_TESTNET=false` 并填入 API Key；合约模式下务必先确认 `MAX_LEVERAGE` 与逐仓 / 全仓设置。
>
> 📰 至少 3 个信息源（RSS / Binance 公告 / 恐慌贪婪指数）无需任何 API Key 即可工作；其余源在对应 Key 配置后自动启用。

---

## 🧪 测试

```bash
cd backend
py -m pytest tests/ -v          # 34 个单元测试
```

覆盖：信号词汇统一、限流器权重/退避/头校准、关键词情绪打分、LLM 退化路径、GridSearch 评分排序、Walk-Forward 窗口切分、NewsSentimentStrategy 异常容错。

---

## 📄 License

MIT © Quant Trading Project
