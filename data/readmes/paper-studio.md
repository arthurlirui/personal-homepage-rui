# 📄 Paper Studio — 高水平论文编写智能体集群

> 面向学术论文从 0 到投稿的全流程多智能体创作团队。
> 把一个研究想法推进成结构严谨、论证有力、符合顶会/顶刊标准的完整论文。
> 内置网络搜索（豆包 FeedCoop）与写作前系统性调研，沉淀可复用知识库。
> **Web 界面**：论文检索 + 论文 Wiki + 论文写作 + 每日简报，一键加入知识库并自动生成中文解读笔记。

## 适用场景

- 计算机科学 / AI / 系统 / 工程类论文（顶会、顶刊、预印本）
- 从研究想法到完整初稿
- 已有实验数据需要撰写论文
- 论文修改 / 大修 / 小修
- 审稿意见回复

---

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
# 开发：pip install -r requirements-dev.txt
```

依赖：`httpx>=0.27`、`pypdf>=4.0`、`beautifulsoup4>=4.12`。Python ≥ 3.12。
（豆包搜索走纯 HTTP，无需额外 SDK。）

### 2. 配置密钥

复制 `.env.example` 为 `.env` 并填入火山引擎 API key（LLM 与豆包搜索共用）：

```bash
cp .env.example .env
# 编辑 .env：
# VOLCENGINE_API_KEY=sk-...
# PAPERSTUDIO_SEARCH_PROVIDER=doubao
```

密钥只从环境变量 / `.env` 读取，绝不硬编码。`.env` 已在 `.gitignore` 中。

### 3. 创建项目并跑端到端流程

```bash
# 新建项目（在 projects/<项目名>/ 下生成骨架）
python bin/new_project.py 项目名

# 一键全流程：写作前调研 → 学术论文收集 → 综述 → 创新凝练 → 风格画像 → Gate 0..5
python -m paperstudio_engine.cli research 项目名 \
    --query "transformer efficiency" \
    --research                       # 启用写作前系统性调研
    --to-gate 5
```

---

## 统一 CLI（`paperstudio`）

所有功能收敛到单一命令 `paperstudio`（`pip install -e .` 后可用，或 `py -m paperstudio_engine.cli`）。
六大模块为一级命令：**search / analyze / template / write / proofread / export**。

```bash
pip install -e .          # 注册 paperstudio 命令
paperstudio --version
paperstudio selftest      # 装配校验（不调 LLM）
```

### 命令总览

```
paperstudio [-v|--verbose] [--version]
  search    论文知识搜索       学术源(DBLP/S2/Crossref/arXiv) + 可选网络搜索
  kb        本地知识库查询     list / show / stats / search
  analyze   论文分析           单篇 PDF/md 入库 / 深读(reviewrag) / 补全 KB 笔记
  template  论文模板加载       list / show / apply / scaffold
  write     论文写作           7-Gate：--gate N / --all / --from M --to N
  research  端到端             调研 -> collect/web -> synthesize -> innovate -> style -> Gate 0..N
  proofread 论文校对           审稿(--review) + 对照修订(--refs) + 风格度量(--style)
  export    论文导出           --format tex|pdf|docx|md
  batch     配置驱动批量       JSON 配置 + 断点续跑
  project   项目管理           new / list / info
  roles     角色列表
  selftest  装配校验
  literature / survey          透传子模块（向后兼容）
  list-roles / run / paperstudio  兼容别名（= roles / write / batch）
```

### 六大模块速查

```bash
# 论文知识搜索
paperstudio search "transformer efficiency" --max 20 --web --site arxiv
paperstudio search "attention" --sources dblp,arxiv -o results.json

# 论文分析
paperstudio analyze myproj --paper papers/x.pdf            # 单篇 PDF 抽取+分析入库
paperstudio analyze myproj --deep --query "rag" --keywords retrieval,generation  # 深读
paperstudio analyze myproj                                  # 补全 KB 缺失笔记

# 论文模板加载
paperstudio template list                                   # 列 13 个 md + 5 个 latex 模板
paperstudio template show neurips
paperstudio template scaffold new-proj --latex ieee         # 创建项目骨架
paperstudio template apply methodology myproj               # 把模板写入项目文件

# 论文写作（7-Gate）
paperstudio write myproj --gate 3                           # 单跑 Gate 3
paperstudio write myproj --from 0 --to 5                    # 跑区间
paperstudio write myproj --all --force                      # 全跑并覆盖

# 论文校对
paperstudio proofread myproj                                # 默认审稿人评审
paperstudio proofread myproj --review --refs --style        # 审稿 + 对照修订 + 风格度量
paperstudio proofread myproj/06_paper_draft_v2.md --out review.md

# 论文导出
paperstudio export myproj --format pdf --template ieee      # md -> latex -> pdf
paperstudio export myproj --format docx -o out/             # md -> docx
paperstudio export myproj --format tex --template neurips   # md -> latex
```

> 导出 `pdf`/`docx` 需系统装 pandoc + TeX Live，并 `pip install pypandoc`；缺失时优雅降级（提示安装，不崩溃）。
> `bin/build.py` / `bin/new_project.py` 为旧入口，功能已并入 `paperstudio export` / `paperstudio project new`。

---

## 架构概览

Paper Studio 包含两套并存的工作引擎 + 一个 Web 应用层，共享 `agents/*.md` 角色卡与 `templates/` 模板：

### Web 应用（`web/` + `frontend/`）

FastAPI 后端 + Next.js 14 前端，提供论文检索、论文 Wiki、论文写作、简报推送的图形界面。

**后端（`web/`）**：

| 路由 | 功能 |
|------|------|
| `/auth` | 用户注册 / 登录（Session+Cookie 鉴权，bcrypt+pepper） |
| `/search` | 多源即时检索（DBLP / S2 / arXiv）+ CCF 过滤 + Paper-Notes 解读链接 |
| `/wiki` | 论文 Wiki：列表 / 详情 / 加入 / 上传 PDF / 更新内容 / 删除 + SSE 进度 |
| `/briefings` | 每日简报：主题订阅 / 自动生成 / 论文列表 |
| `/papers` | 单篇论文查询 + 知识笔记 + RAG 相关论文 |
| `/write` | 写作项目：创建 / Gate 任务 + SSE 进度流 |
| `/export` | 论文导出（md / docx / tex / pdf） |
| `/charts` | 自然语言图表生成（ECharts） |
| `/push` | 推送渠道（Webhook / RSS / 知乎） |

**前端（`frontend/`）**：

- Next.js 14 App Router + React 18 + Tailwind + SWR
- 页面：论文简报 / 论文检索 / 论文 Wiki / 论文写作 / 推送渠道 / API 文档
- 组件：MarkdownView（GFM + KaTeX）、PaperSearchCard（含「加入 Wiki」+ Paper-Notes 解读链接）、AuthGuard
- API 代理：`next.config.js` rewrite `/api/*` → 后端

**启动 Web 服务**：

```bash
# 后端（FastAPI + uvicorn）
pip install -e ".[web]"
uvicorn web.app:app --reload --port 8000

# 前端（Next.js dev server）
cd frontend && npm install && npm run dev
# 访问 http://localhost:3000
```

### Legacy 多智能体管线（`main.py` + `orchestrator.py`）

5 阶段线性流程（Ideation → Discovery → Analysis → Synthesis → Review）。
每个 agent 继承 `agents.base.Agent`，LLM 经 `agents/llm_client.py` 调用。
配置走 `config/settings.yaml`（含 env 覆盖）。

### 现代引擎（`paperstudio_engine/`，推荐）

7-Gate 写作工作流 + 调研子系统：

| Gate | 名称 | 输出文件 | 模型档 |
|------|------|----------|--------|
| 0 | 选题契合 | `00_brief.md` | cheap |
| 1 | 文献定位 | `01_literature_review.md` | standard |
| 2 | 方法与实验 | `02_methodology.md` | standard |
| 3 | 初稿撰写 | `04_paper_draft_v1.md` | strong |
| 4 | 模拟审稿 | `05_review_comments.md` | strong |
| 5 | 修订定稿 | `06_paper_draft_v2.md` | strong |
| 6 | 交付准备 | `07_submission_checklist.md` | standard |

配置走 `paperstudio_engine/config.py`（仅环境变量 / `.env`，无硬编码密钥）。
LLM 客户端 `paperstudio_engine/llm.py` 针对 Volcengine Ark，带 429 指数退避 + 用量记账。

### 调研子系统（`paperstudio_engine/survey/`）

独立的论文深读与知识沉淀流程，完全可选——不运行时 Gate 工作流行为不变；
运行后产物自动注入 Gate 1/3 上下文。

- `collect` — 6 源学术搜索（DBLP / Semantic Scholar / Crossref / arXiv / DOAJ / Europe PMC）
  + CCF/CSRankings 过滤 + PDF 下载 + pypdf 抽取 + LLM 分析 + 入知识库
- `web_collect` — DuckDuckGo 站点搜索 + GitHub/知乎/arXiv 抓取 + 分析入库
- `search_provider` — **可插拔网络搜索 provider**（豆包 / DuckDuckGo / Mock）
- `research` — **写作前系统性调研**（多站点 + LLM 归纳 + references.bib）
- `reviewrag` — **论文综述 + RAG 化**（建索引 → 深读原文/开源代码 → 近期向量库 → LaTeX 综述 + BibTeX）
- `knowledge_base` — sha256 + title\|year + url 三键去重知识库
- `survey_writer` / `innovation` / `style_profile` — 跨论文综述 / 创新凝练 / 风格画像

---

## 论文 Wiki 模块

全局论文知识库：每篇论文经 PDF 抽取 + LLM 组织知识点，生成可重复查阅的 Wiki 笔记。与写作项目解耦，独立存放在 `wiki/` 目录。

### 功能入口

| 入口 | 说明 |
|------|------|
| **检索页「加入 Wiki」按钮** | 搜索结果卡片上一键加入，后台异步下载 PDF + 抽取 + LLM 分析 |
| **Wiki 页「上传 PDF」面板** | 手动上传 PDF 文件 + 填写元数据，跳过搜索直接分析入库 |
| **Wiki 详情页「更新内容」按钮** | 重新搜索最新元数据（venue/year/DOI/CCF）+ 重新下载分析 |

### 存储结构

```
wiki/
├── index.json              # KnowledgeBase 目录（{paper_id: KnowledgeEntry}）
├── notes/<paper_id>.md     # LLM 生成的知识笔记（knowledge_note.md 模板）
├── pdfs/<filename>.pdf     # PDF 副本
├── archive/<venue>/        # PDFArchive 原始归档
└── uploads/                # 上传的临时 PDF（分析后清理）
```

### 异步任务 + SSE 进度

加入/上传/更新均走异步任务（`tasks` 表，type='wiki'），前端通过 `EventSource` 监听 `/wiki/tasks/{task_id}/stream` 实时显示进度：

```
下载 PDF → 抽取文本 → LLM 分析知识点 → 完成
```

### API 端点

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/wiki` | 列表（支持 q 标题/作者搜索 + venue 过滤） |
| GET | `/wiki/{paper_id}` | 详情（元数据 + 知识笔记全文） |
| GET | `/wiki/{paper_id}/text` | PDF 抽取的原文 |
| POST | `/wiki/add` | 从搜索结果加入（JSON body） |
| POST | `/wiki/upload` | 上传 PDF 加入（multipart form） |
| POST | `/wiki/{paper_id}/refresh` | 更新内容（重新搜索 + 下载 + 分析） |
| DELETE | `/wiki/{paper_id}` | 删除条目 |
| GET | `/wiki/tasks/{task_id}/stream` | SSE 进度流 |

---

## PDF 下载强化策略

论文 PDF 下载采用 5 层回退链，最大化开放获取命中率：

```
① pdf_url / ee / doi 多候选 URL 轮试
   ├─ arXiv abs→pdf 归一化（arxiv.org/abs/xxx → arxiv.org/pdf/xxx）
   ├─ arXiv DOI 识别（doi.org/10.48550/arXiv.xxx → arxiv.org/pdf/xxx）
   └─ CVF openaccess html→pdf 转换
  ↓ 失败
② Unpaywall OA PDF 查询（按 DOI）
  ↓ 失败
③ Semantic Scholar openAccessPdf 查询（按 DOI）
  ↓ 失败
④ 会议开放获取渠道（CVF Open Access / Ke-Sen SIGGRAPH）
  ↓ 失败
⑤ arXiv 标题搜索预印本
  ↓ 失败 → 降级 abstract 分析
```

### 会议开放获取渠道（`literature/oa_sources.py`）

| 渠道 | 覆盖会议 | 机制 |
|------|---------|------|
| **CVF Open Access** | CVPR / ICCV / WACV (2013-2026) | 抓取会议索引页 HTML，解析标题→PDF 映射 |
| **Ke-Sen's page** | SIGGRAPH / SIGGRAPH Asia | 抓取 realtimerendering.com/kesen/ 作者预印本索引 |

> ECCV (Springer)、SIGGRAPH (ACM DL)、Eurographics 均为付费墙，通过 arXiv 预印本兜底。

### Paper-Notes 论文解读链接（`literature/paper_notes.py`）

集成 [zhaoyang97/Paper-Notes](https://github.com/zhaoyang97/Paper-Notes) 仓库的 23000+ 篇 AI 顶会论文中文解读：

- 从 `papernotes.org` 的 MkDocs 搜索索引（23892 条）构建 `{title → url}` 映射
- 搜索结果和 Wiki 条目自动附加「📖 解读」链接
- 覆盖会议：CVPR / ICCV / ECCV / ICLR / ICML / NeurIPS / AAAI / ACL (2024-2026)
- 模糊匹配策略：完全匹配 → 主标题匹配 → 包含关系，用 venue+year 过滤避免跨年份误匹配

---

## 网络搜索模块

### 豆包 FeedCoop 搜索 API

`paperstudio_engine/survey/search_provider.py` 实现了豆包搜索 provider：

- **端点**：`https://open.feedcoopapi.com/search_api/web_search`
- **认证**：`Authorization: Bearer {VOLCENGINE_API_KEY}`（与 LLM 共用 key）
- **请求体**：`{Query, SearchType:"web", Count, Filter:{NeedContent, NeedUrl, Sites}, NeedSummary:true}`
- **响应**：流式 NDJSON（逐行解析），结构未严格文档化，需多形态防御解析
- **站点过滤**：`Filter.Sites` 字段（如 `"arxiv.org"`）

参考实现：`D:\Code\story-studio\example\demo_websearch_by_apikey.py`。

### 可插拔 provider

| provider | name | 说明 |
|----------|------|------|
| `DoubaoSearchProvider` | `doubao` | 豆包 FeedCoop（默认）；缺 key 自动降级到 ddg |
| `DuckDuckGoProvider` | `ddg` | DuckDuckGo Lite HTML，无需 key，离线降级 |
| `MockSearchProvider` | `mock` | 恒返回空，测试 / 离线用 |

通过环境变量切换：

```bash
PAPERSTUDIO_SEARCH_PROVIDER=doubao   # 默认
PAPERSTUDIO_SEARCH_PROVIDER=ddg      # 无 key 降级
PAPERSTUDIO_SEARCH_PROVIDER=mock     # 测试
```

容错约定：任何 provider 异常返回空列表 + 警告日志，不阻塞主流程。

### 站点预设

写作前调研覆盖以下公开来源：

| 标签 | host | 抓正文 | 说明 |
|------|------|--------|------|
| `arxiv` | arxiv.org | ✓ | 预印本，抽 abstract |
| `ieee` | ieeexplore.ieee.org | ✗ | 付费墙，仅 snippet |
| `acm` | dl.acm.org | ✗ | 付费墙，仅 snippet |
| `zhihu` | zhihu.com | ✓ | 专栏文章，抽正文段 |
| `github` | github.com | ✓ | 仓库 README |

---

## 系统性调研流程（`paperstudio.survey research`）

写作前的广度调研，对一个研究方向跨 arXiv / IEEE / ACM / 知乎 / GitHub 系统性收集公开知识。

### 命令

```bash
# 分步：只跑写作前调研
python -m paperstudio_engine.cli survey research 项目名 \
    --query "transformer efficiency" \
    --sites arxiv,ieee,acm,zhihu,github \
    --max-per-site 8 \
    --provider doubao          # doubao|ddg|mock，默认从 config

# 端到端：调研 → 学术收集 → 综述 → 创新 → 风格 → Gate 0..5
python -m paperstudio_engine.cli research 项目名 \
    --query "..." \
    --research                 # 启用 systematic_research
    --research-sites arxiv,ieee,acm,zhihu,github
    --to-gate 5
```

### 流程

1. **多站点并发搜索**：豆包 provider 按 `Filter.Sites` 过滤，并发抓取
2. **URL 去重 + 站点分类**：复用 `parse_github_repo` / `parse_zhihu_article` / `parse_arxiv_id`
3. **抓正文**：
   - arxiv / github / zhihu → 复用 `web_collect._FETCHERS`
   - ieee / acm → 仅用搜索 snippet（付费墙，不抓正文）
4. **LLM 知识点提炼**：复用 `analyzer.ANALYZER_SYSTEM` + 知识笔记模板
5. **入知识库**：`KnowledgeBase.upsert`，`source_type="web"`，`web_kind` 按站点标记
6. **BibTeX 生成**：论文类来源（arxiv/ieee/acm）提取 DOI/arxiv id →
   复用 `literature.bibtex.generate_entry` → 写入 `references.bib`
7. **汇总综述**：strong 模型跨来源合成 `research_notes.md`
   （章节：调研背景 / 关键知识点归纳 / 技术路线对比 / 公开论文清单 /
   开源实现清单 / 社区讨论 / bib 引用 / 来源分布 / 研究空白）

### 产物

| 文件 | 说明 |
|------|------|
| `research_notes.md` | 跨来源调研综述，可被 Gate 1/3 直接复用 |
| `references.bib` | 论文类来源的 BibTeX 条目，`\cite{}` 即用 |
| `knowledge_base/` | 每来源一条 `KnowledgeEntry`，跨会话去重复用 |

Best-effort：单条抓取/分析失败记入 `failed`，不中断整体流程。

---

## 命令速查

> 下列 `python -m paperstudio_engine.cli ...` 调用等价于 `paperstudio ...`（如 `survey research` = `paperstudio survey research`）。推荐用统一命令 `paperstudio`。

### 调研子系统（`survey`）

```bash
# 写作前系统性调研（豆包搜索 + 多站点 + LLM 归纳）
python -m paperstudio_engine.cli survey research <项目> --query "..." --sites arxiv,ieee,acm,zhihu,github

# 论文综述 + RAG（建索引 → 深读 PDF/GitHub → 近期向量库 → LaTeX 综述）
python -m paperstudio_engine.cli survey reviewrag <项目> \
    --query "..." --keywords k1,k2 --year-since 2023 --ccf A,B --max-papers 30

# 学术论文收集（CCF-A/B + PDF 下载 + 分析入库）
python -m paperstudio_engine.cli survey collect <项目> --query "..." --max 20 --ccf A,B

# 网络来源抓取（DuckDuckGo + GitHub/知乎/arXiv 站点过滤）
python -m paperstudio_engine.cli survey webcollect <项目> --sites github,zhihu,arxiv

# 单次网络搜索（DuckDuckGo）
python -m paperstudio_engine.cli survey websearch "transformer" --site arxiv --max 5 --json

# 跨论文综述 / 创新凝练 / 风格画像
python -m paperstudio_engine.cli survey synthesize <项目>
python -m paperstudio_engine.cli survey innovate <项目> --rounds 3 --refs 5
python -m paperstudio_engine.cli survey style <项目> --refs 5

# 知识库查询
python -m paperstudio_engine.cli survey kb <项目> list
python -m paperstudio_engine.cli survey kb <项目> stats
python -m paperstudio_engine.cli survey kb <项目> show --paper-id <sha256前16位>

# 一键全流程：collect → [web_collect] → synthesize → innovate → style
python -m paperstudio_engine.cli survey run <项目> --query "..." --max 20 --ccf A,B
```

### 端到端（`research`）

```bash
# 调研 → 写作 Gate 0..5（默认）
python -m paperstudio_engine.cli research <项目> --query "..." \
    --research --research-sites arxiv,ieee,acm,zhihu,github \
    --web-sites github,zhihu,arxiv \
    --max 20 --ccf A,B --rounds 3 --refs 5 --to-gate 5
```

### 配置驱动批量生成（`paperstudio`，支持断点续跑）

用 JSON 配置文件描述一个或多个论文生成任务，加载后跑端到端流水线，并支持**中断后从断点继续**——每个任务在 `<workspace>/.paperstudio/state.json` 记录已完成阶段与 Gate，重跑时自动跳过已完成部分。

```bash
# 列出配置中的任务（不执行）
python -m paperstudio_engine.cli paperstudio config/tasks.example.json --list

# 跑配置里的全部任务（已完成的阶段自动跳过）
python -m paperstudio_engine.cli paperstudio config/tasks.example.json

# 只跑指定任务
python -m paperstudio_engine.cli paperstudio config/tasks.example.json --task self-rag

# 清空 checkpoint 强制重跑
python -m paperstudio_engine.cli paperstudio config/tasks.example.json --force
```

配置文件结构（见 `config/tasks.example.json`）：

```json
{
  "version": 1,
  "defaults": { "ccf": "A,B", "max": 20, "rounds": 3, "to_gate": 5 },
  "tasks": [
    {
      "name": "self-rag",
      "workspace": "projects/rag-knowledge-nlp",
      "query": "retrieval-augmented generation self-reflection",
      "topic": "Self-RAG for Knowledge-Intensive NLP",
      "to_gate": 5,
      "research": true,
      "research_sites": "arxiv,github,zhihu",
      "web_sites": "github"
    },
    {
      "name": "efficient-transformer",
      "workspace": "projects/efficient-transformer",
      "query": "efficient transformer attention",
      "to_gate": 3
    }
  ]
}
```

要点：
- `defaults` 字段为所有任务的回退值；任务字段非 null 时覆盖默认。
- 每个任务必须含 `name` + `workspace`（需先 `python bin/new_project.py <name>` 创建）。
- `ccf` / `web_sites` / `research_sites` / `areas` 用逗号分隔字符串。
- `query` 缺省时从 `00_brief.md` 的 `## 关键词` 段提取。
- 续跑粒度：阶段级（`research`/`collect`/`web_collect`/`synthesize`/`innovate`/`style`/`gates`），其中 `gates` 内部按 Gate 编号跟踪；`--force` 清空 checkpoint 重跑全流程。

### 引擎（`run` / `selftest`）

```bash
python -m paperstudio_engine.cli selftest                  # 装配校验（不调 LLM）
python -m paperstudio_engine.cli run --workspace <项目> --gate 1
python -m paperstudio_engine.cli run --workspace <项目> --all
python -m paperstudio_engine.cli list-roles
```

### 文献搜索（`literature`）

```bash
python -m paperstudio_engine.cli literature search "attention mechanism" --max 20
python -m paperstudio_engine.cli literature bibtex <paper-key>
```

---

## 团队角色

| 角色 | 职责 |
|------|------|
| `principal_investigator.md` | 课题负责人 — 方向决策、核心论点、质量把控 |
| `research_analyst.md` | 文献分析师 — 文献综述、研究空白、相关工作 |
| `thesis_architect.md` | 论文架构师 — 逻辑结构、论点链、章节组织 |
| `methodology_expert.md` | 方法论专家 — 实验设计、方法选择、理论框架 |
| `experiment_engineer.md` | 实验工程师 — 实验实现、数据采集、代码验证 |
| `statistical_analyst.md` | 统计分析 — 数据分析、统计检验、结果解读 |
| `writing_editor.md` | 写作编辑 — 学术写作、语言润色、格式规范 |
| `reviewer.md` | 审稿人 — 批判性评审、漏洞发现、改进建议 |
| `visualization_designer.md` | 可视化设计 — 图表、示意图、数据可视化 |
| `production_manager.md` | 制作统筹 — 进度跟踪、任务拆解、里程碑 |

## 推荐调度方式

由 Bara / 主控进行调度：

- **小问题**：直接让对应角色输出意见（如 "reviewer 审一下这段论证"）
- **中型任务**：用 `sessions_spawn` 并行召集 3~5 个角色评审
- **大型项目**：按阶段推进，所有产物落在 `projects/<项目名>/`

---

## 产物标准

一个合格项目至少应有：

- `00_brief.md` — 项目简报（研究问题、动机、核心贡献）
- `01_literature_review.md` — 文献综述与研究空白
- `02_methodology.md` — 方法论与技术方案
- `03_experiments.md` — 实验设计与结果
- `04_paper_draft_v1.md` — 论文初稿
- `05_review_comments.md` — 内部评审意见
- `06_paper_draft_v2.md` — 修改稿
- `07_submission_checklist.md` — 投稿检查清单
- `08_supplementary.md` — 附录 / 补充材料

调研产物（可选）：

- `research_notes.md` — 写作前系统性调研综述
- `references.bib` — BibTeX 引用库
- `knowledge_base/` — 去重知识库（index.json + notes/ + pdfs/）

---

## 配置参考

### 环境变量

| 变量 | 默认 | 说明 |
|------|------|------|
| `VOLCENGINE_API_KEY` | （必填） | 火山引擎 key，LLM 与豆包搜索共用 |
| `PAPERSTUDIO_BASE_URL` | `https://ark.cn-beijing.volces.com/api/coding/v3` | LLM base url |
| `PAPERSTUDIO_MODEL_CHEAP` | `ark-code-latest` | 便宜档模型 |
| `PAPERSTUDIO_MODEL_STD` | `ark-code-latest` | 标准档模型 |
| `PAPERSTUDIO_MODEL_STRONG` | `ark-code-latest` | 强档模型 |
| `PAPERSTUDIO_SEARCH_PROVIDER` | `doubao` | 搜索 provider：doubao/ddg/mock |
| `PAPERSTUDIO_SEARCH_API_KEY` | （空→回退 VOLCENGINE_API_KEY） | 搜索 API key |
| `PAPERSTUDIO_SEARCH_ENDPOINT` | （空→provider 默认） | 自定义搜索 endpoint |
| `S2_API_KEY` | （可选） | Semantic Scholar API key（提升速率限制） |
| `PAPERSTUDIO_WEB_HOST` | `127.0.0.1` | Web 服务监听地址 |
| `PAPERSTUDIO_WEB_PORT` | `8000` | Web 服务端口 |
| `PAPERSTUDIO_WEB_BASE_URL` | `http://localhost:8000` | Web base URL（CSRF 信任源） |
| `PAPERSTUDIO_DB_PATH` | `web/paperstudio.db` | SQLite 数据库路径 |
| `PAPERSTUDIO_WIKI_DIR` | `wiki/` | 论文 Wiki 存储目录 |
| `PAPERSTUDIO_BRIEFINGS_DIR` | `briefings/` | 简报存储目录 |
| `PAPERSTUDIO_SESSION_SECRET` | （随机） | Session 签名密钥（生产环境必须固定） |
| `PAPERSTUDIO_CSRF_TRUSTED_ORIGINS` | `localhost:3000` | CSRF 信任源（逗号分隔） |
| `PAPERSTUDIO_HTTPS_ONLY` | `0` | Cookie Secure 标志（生产 HTTPS 设 1） |

### `.env` 模板

见 `.env.example`。`.env` 已在 `.gitignore` 中，不会被提交。

---

## 原则

- **先有论点，后有论文** — 每篇论文必须有一个清晰的核心论点
- **论证链完整** — 每个 claim 必须有证据支撑
- **可复现** — 实验必须可复现，代码/数据可追溯
- **评审视角优先** — 写之前先想审稿人会问什么
- **宁短勿水** — 没有新内容的段落就是冗余
- **密钥只从环境变量取** — 绝不硬编码 API key 到代码或配置文件

---

## 项目结构

```
paper-studio/
├── README.md                         # 本文件
├── ARCHITECTURE.md / WORKFLOW.md     # 架构与工作流文档
├── .env.example                      # 环境变量模板
├── requirements.txt / -dev.txt       # 依赖
├── bin/new_project.py                # 项目骨架生成
├── agents/*.md                       # 10 个角色卡（PI/分析师/架构师...）
├── templates/                        # 输出模板（含 research_notes.md、knowledge_note.md、latex/）
├── paperstudio_engine/
│   ├── cli.py                        # 主 CLI
│   ├── config.py / llm.py / engine.py / research.py / roles.py
│   ├── literature/                   # 6 源学术搜索 + BibTeX + PDF 归档
│   │   ├── search.py                 # DBLP/S2/Crossref/arXiv/DOAJ/EuropePMC 搜索
│   │   ├── archive.py                # PDF 下载 + URL 归一化（arXiv/CVF/DOI）
│   │   ├── oa_sources.py             # 会议开放获取（CVF Open Access / Ke-Sen SIGGRAPH）
│   │   ├── paper_notes.py            # Paper-Notes 中文解读链接查找
│   │   └── models.py / venues.py / bibtex.py
│   └── survey/                       # 调研子系统
│       ├── search_provider.py        # 可插拔搜索 provider（豆包/DDG/Mock）
│       ├── research.py               # 写作前系统性调研
│       ├── collect.py / web_collect.py / web_search.py
│       ├── analyzer.py / knowledge_base.py / pdf_reader.py
│       ├── wiki.py                   # 论文 Wiki（下载+抽取+分析+落库+更新）
│       ├── survey_writer.py / innovation.py / style_profile.py
│       └── rag_index.py / reviewrag.py
├── web/                              # FastAPI Web 后端
│   ├── app.py                        # 应用入口 + 路由注册
│   ├── config.py / db.py / schemas.py / deps.py / tasks.py
│   ├── briefing.py / scheduler.py
│   └── routers/                      # auth / briefings / papers / search / wiki / write / export / charts / push
├── frontend/                         # Next.js 14 前端
│   ├── app/                          # App Router 页面（briefings / search / wiki / write / push / api-docs）
│   ├── components/                   # AuthGuard / PaperSearchCard / MarkdownView / PaperCard / ...
│   └── lib/                          # api.ts / auth.tsx / sse.ts / swr-keys.ts
├── wiki/                             # 全局论文 Wiki（index.json + notes/ + pdfs/ + archive/）
├── projects/                         # 项目工作空间（knowledge_base/ + papers/ + Gate 产物）
├── briefings/                        # 每日简报（date/topic/notes/）
└── tests/                            # pytest 测试
```
