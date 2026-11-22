# SHIT LAB / 思想实验室

独立的实验性学术创作平台，用于发表非传统论文、思想实验、奇特研究和独立观点。

远程仓库原始介绍保留如下：

> sxu_shit
>
> 荒诞正经的论文研讨

当前仅完成 Phase 0 的工程治理，页面仍是原始 Astro 最小入口。第一版计划为无数据库、无登录的静态论文网站；论坛在 Phase 5 独立规划。视觉方向为互联网粗野主义，本阶段只写规范。

## 技术与现有基础

- Astro 7.4.13，版本由 `package-lock.json` 锁定；`package.json` 保留原有 `^7.4.13` 范围。
- TypeScript 严格配置与原生 CSS 的后续开发方向；未引入 React 或状态管理。
- Node 要求沿用 `>=22.23.4`；本机已有 Node 26.13.1 / npm 11.20.0。
- 保留本地 Astro Minimal 模板的目录说明、启动/构建命令和官方学习入口；不再重复执行项目初始化命令。

## 在 Windows PowerShell 中使用

所有命令都在正式项目根目录执行：

```powershell
Set-Location 'F:\sever_experiment\shit-laboratory'
npm.cmd run setup:workspace
npm.cmd run dev -- --background
npm.cmd run astro -- dev status
```

打开 [本机开发入口](http://127.0.0.1:4321/)。`--background` 让服务器在后台运行，符合原有 `AGENTS.md`；日志和停止命令：

```powershell
npm.cmd run astro -- dev logs
npm.cmd run astro -- dev stop
```

只停止自己启动的实例。若已存在用户的开发服务器，先检查状态并复用，不强制替换。项目将开发/预览绑定到 `127.0.0.1`，仅本机访问；不要添加裸 `--host`。

`npm.cmd` 与 `npm` 使用同一套 npm；在 PowerShell 下显式调用 `.cmd` 可避免 `npm.ps1` 的执行策略问题。Linux/macOS 使用普通 `npm`。

| 命令 | 用途 |
| --- | --- |
| `npm run setup:workspace` | 恢复约定的空目录，可重复执行，不删除文件 |
| `npm run dev -- --background` | 启动本机开发服务器 |
| `npm run build` | 将源码构建为 `dist/` 静态文件 |
| `npm run preview -- --background` | 在本机预览已经生成的 `dist/`；不是生产服务 |
| `npm run astro -- --help` | 查看 Astro CLI 帮助 |

现有工作区已经安装依赖，本阶段无需执行 `npm install`。未来在用户另行授权的干净检出中，第一次使用 `npm ci` 按锁文件安装，再执行 `setup:workspace`。不要在上级工作区运行 npm 安装，也不要创建嵌套项目。

## 项目结构及用途

```text
shit-laboratory/
├── docs/               产品、架构、设计、部署和路线图
│   ├── decisions/      重要架构决策及理由
│   └── reports/        初始盘点、验收和阶段交接证据
├── src/
│   ├── pages/          文件路径决定网页路由；现在只有 index.astro
│   ├── components/     后续按功能拆分的小块界面
│   ├── layouts/        后续共享页面外壳与论文布局
│   ├── content/papers/ 后续论文正文；不把文章写进页面组件
│   ├── styles/         后续原生 CSS
│   ├── lib/            后续纯工具函数与数据读取边界
│   └── types/          后续真正共用的类型；不重复生成的集合类型
├── public/
│   ├── images/         无需处理的公开图片
│   ├── icons/          后续公开图标
│   └── papers/         后续公开 PDF 等附件
├── scripts/            本地工程工具，不是后端服务
├── astro.config.mjs    静态输出和本机监听配置
├── tsconfig.json       TypeScript 严格规则
├── package.json        脚本与直接依赖清单
├── package-lock.json   可重复安装所用的具体依赖版本
├── .gitignore          阻止生成物、环境文件和凭证被误提交
├── AGENTS.md           人与代理共同遵守的工程规则
└── LICENSE             与远程一致的 MIT 许可证
```

空目录是架构位置预留，没有业务实现。Git 不保存空目录；新检出后运行 `setup:workspace` 恢复，不放置大量 `.gitkeep`。`src/content.config.ts`、论文路由和 CSS 均留到对应阶段。

## 文档入口

| 文档 | 为什么存在 |
| --- | --- |
| [PRD](docs/PRD.md) | 规定服务谁、第一版做什么以及内容真实性要求 |
| [架构](docs/ARCHITECTURE.md) | 规定代码、内容、静态构建与未来独立服务的边界 |
| [路线图](docs/ROADMAP.md) | 为 Phase 0–5 分配任务和完成标准 |
| [设计规范](docs/DESIGN_SYSTEM.md) | 约束粗野主义视觉，同时保证阅读与无障碍 |
| [开发与部署](docs/DEPLOYMENT.md) | 解释本地命令、构建产物和未来部署方法 |
| [决策 ADR-0001](docs/decisions/0001-static-site-and-phase-boundaries.md) | 记录选静态架构以及暂缓实现功能的理由 |
| [初始盘点](docs/reports/phase0-inventory.md) | 保留修改前的文件、环境和 Git 事实 |
| [Phase 0 交接](docs/reports/phase0-handoff.md) | 查看本阶段实际改动、检查结果与安全同步步骤 |

## Git 与安全

Git 根目录必须是本目录，不能把 `F:\sever_experiment` 整体上传。上级 `.ssh`、历史 `index.html` 及根目录公钥副本均受保护并保留。不要把任何实际凭证或环境值放进 `public/`、报告或提交。

远程仓库为 [BI-coder-1/sxu_shit](https://github.com/BI-coder-1/sxu_shit)，默认分支 `main`；本地初始分支为 `master`，两边初始化历史不同。不要直接 push、force push 或允许无关历史合并；先按交接报告制定的分支方案审阅。本阶段没有推送、部署或修改生产服务器。

远程原始 README 的两行文字已保留在本页开头；远程 LICENSE 原文保存在本地。论文和图片的具体授权还需逐篇声明，不能把仓库许可证当成第三方材料的授权。

## Astro 学习入口（保留原模板用途）

[官方文档](https://docs.astro.build) · [Astro 组件](https://docs.astro.build/en/basics/astro-components/) · [页面与路由](https://docs.astro.build/en/guides/routing/) · [Astro 社区](https://astro.build/chat)
