# Phase 0：初始工作区盘点

盘点日期：2026-11-22（北京时间）。本记录描述修改前的现场；最终变更和验证以 [交接记录](phase0-handoff.md) 为准。

## 结论

正式项目是已经可用的 Astro 7.4.13 Minimal 工程，入口只有 `/`，尚无论文、搜索、论坛或后端。无需重新创建项目、安装依赖或清理工作区。项目外的历史页面及密钥全部保留。

先完整遍历工作区的文件和目录元数据，再读取项目配置。未读取任何私钥内容，未对私钥计算哈希，未读取环境文件、修改 ACL 或连接生产服务器。只对公钥执行允许的 SHA-256 比较。

## 工作区范围

```text
F:\sever_experiment\
├── .ssh\                          受保护：2 个私钥、2 个公钥
├── aliyun_campus_ed25519.pub       0 字节；保留
├── index.html                     583 字节；历史部署页面，保留
└── shit-laboratory\               唯一正式项目和 Git 根目录
    ├── .git\
    ├── .astro\                    已生成的类型及本地状态
    ├── .vscode\
    │   ├── extensions.json
    │   └── launch.json
    ├── node_modules\              已有依赖；不重复安装
    ├── public\
    │   ├── favicon.ico
    │   └── favicon.svg
    ├── src\pages\index.astro
    ├── .gitignore
    ├── AGENTS.md
    ├── README.md
    ├── astro.config.mjs
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
```

初始元数据遍历共计 **967 个子目录、9,762 个文件**，不含工作区根目录本身；没有发现目录重解析点或第二个 Git 仓库。数量仅描述盘点时点，后续构建会增加生成文件。

| 分组 | 目录数 | 文件数 | 文件总字节 | 检查方式 |
| --- | ---: | ---: | ---: | --- |
| 工作区根文件与项目源码 | 5 | 14 | 167,132 | 全部列举；按需读取项目文本 |
| 项目 `.git` | 29 | 41 | 72,426 | 元数据遍历及 Git 命令；不批量输出内部文件 |
| 项目 `node_modules` | 930 | 9,700 | 171,641,805 | 元数据遍历；按需检查 Astro 包与 CLI |
| 项目 `.astro` | 2 | 3 | 334 | 元数据遍历 |
| 工作区 `.ssh` | 1 | 4 | 1,125 | 仅元数据；公钥仅比较哈希 |

工作区根目录和盘符根目录均未发现适用的上级 `AGENTS.md`。项目内部只有根 `AGENTS.md`，没有下级补充规则。

## 受保护及待判断文件

| 对象 | 观察 | 处理结论 |
| --- | --- | --- |
| `.ssh/aliyun_campus_ed25519` | 464 字节，私钥 | 不读取、不移动、不修改、不删除、不上传 |
| `.ssh/aliyun_campus_ed25519_v2` | 464 字节，私钥 | 同上 |
| `.ssh/aliyun_campus_ed25519.pub` | 97 字节，公钥 | 仅元数据和哈希比较，保持原样 |
| `.ssh/aliyun_campus_ed25519_v2.pub` | 100 字节，公钥 | 同上 |
| 根 `aliyun_campus_ed25519.pub` | 0 字节；与两个受保护公钥的 SHA-256 均不相同 | 无法确认为重复副本，必须保留 |
| 根 `index.html` | 583 字节 | 历史部署资产；不读取正文、不迁移、不删除 |

空公钥副本 SHA-256：`E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855`。

历史页面 SHA-256：`1FC75E5C84ECB2D8355ECAC209C7333DF1BEF0BE1FD8225E0EAFC097EA4CFA84`，用于结束时校验未改变。私钥只记录长度和修改时间供前后比较，不能据此声称验证了内容哈希。

## 项目文件职责与初始内容

| 文件 | 初始状态及用途 | Phase 0 处理原则 |
| --- | --- | --- |
| `package.json` | 名称 `shit-laboratory`、版本 `0.0.1`、ES modules；Node 要求 `>=22.23.4` | 保留全部现有脚本和依赖，只增加目录恢复命令 |
| `package-lock.json` | 已有 npm 锁文件，161,238 字节 | 不改锁文件、不安装第二套依赖 |
| `astro.config.mjs` | `defineConfig({})`，默认静态输出 | 明确静态输出与回环地址，防止意外对外监听 |
| `tsconfig.json` | 继承 `astro/tsconfigs/strict`，包含 `.astro/types.d.ts`，排除 `dist` | 原样保留 |
| `src/pages/index.astro` | `lang="en"`，标题与唯一 h1 为 `Astro`，引用两个 favicon | 保留原始最小入口；品牌首页留到 Phase 1 |
| `public/favicon.svg`、`favicon.ico` | Astro 示例图标，当前页面仍在引用 | 保留以避免断链；品牌替换留到 Phase 1 |
| `.vscode/extensions.json` | 推荐 Astro 官方扩展 | 保留 |
| `.vscode/launch.json` | 通过 `astro dev` 进行编辑器调试 | 保留；代理执行遵守后台启动规则 |
| `.gitignore` | 忽略 `dist`、`.astro`、`node_modules`、部分日志、`.env` 和 `.env.production` 等 | 补齐其他环境文件、密钥、凭证、备份及本地工具目录 |
| `AGENTS.md` | 规定后台启动开发服务器，以及六类 Astro 官方指南入口 | 先阅读再合并；完整保留旧规则并增加阶段、安全和验收流程 |
| `README.md` | Astro Minimal 模板说明，含目录、命令表和学习链接 | 保留有用说明，合并为项目说明；不再指导重复初始化 |

已有 npm 脚本：`dev: astro dev`、`build: astro build`、`preview: astro preview`、`astro: astro`。没有 `check`、`lint` 或 `test` 脚本。唯一直接依赖为 `astro: ^7.4.13`，本地实际安装 **7.4.13**；未安装 React 集成、数据库、认证或论坛服务。

## 运行环境差异

用户终端报告 Node 26.13.1、npm 11.20.0、Windows PowerShell 5.1；Git 为 2.47.1。Codex 工具默认进程实际使用 Node 24.22.3 和 PowerShell 7.6.9，且最初无法直接找到 npm。这属于执行环境差异，不能写成项目构建失败。

随后定位到已有的 `E:\Nodejs\node.exe` 和 `npm.cmd`，以及 Windows PowerShell 5.1 可执行文件。最终验证将显式使用现成工具，不安装 npm、不修改系统 PATH 或终端配置；实测版本和结果写入交接记录。

Astro 本地 CLI 已确认支持旧 `AGENTS.md` 指定的 `dev --background`、`dev stop/status/logs`。初始 `dev status` 报告 `http://localhost:4321` 的既有服务器；受限执行器访问回环地址返回 `EACCES`，因此当时未独立复现用户先前的 HTTP 200，也未停止该既有进程。

## Git 初始状态及远程只读观察

使用 `git status`、`branch -avv`、`remote -v`、`log`、`ls-files` 检查：

- Git 根目录：`F:/sever_experiment/shit-laboratory`；工作区总目录没有 `.git`。
- 本地分支：`master`，初始工作树干净，12 个已跟踪文件。
- 本地唯一提交及根提交：`cd21bc9eac6cf697f5efc0a3fcfa603f5c41a7de`，消息为 `"Initial commit from Astro"`。
- 初始没有配置任何远程地址，没有远程跟踪分支。
- 初始仅忽略 `.astro/` 和 `node_modules/`，没有发现待提交密钥路径。
- Git 起初因仓库所有者与执行身份不同而拒绝操作。后续每条命令使用 `git -c safe.directory=F:/sever_experiment/shit-laboratory ...`；没有修改全局信任配置、文件所有者或 ACL。

通过 GitHub 连接器只读核实 [远程仓库](https://github.com/BI-coder-1/sxu_shit)：默认分支为 `main`，观察到的 HEAD 为 `b951d3c57c0c7647f79ba943ee636a6a648f66a7`，消息 `Initial commit`，只有以下两个文件：

| 远程文件 | Git blob SHA | 内容与保留要求 |
| --- | --- | --- |
| `README.md` | `1af6c24ff35b5dabd0ce8da6ea54833ecf9721f8` | 原文标题 `sxu_shit`、说明“荒诞正经的论文研讨”；本地 README 记录原文 |
| `LICENSE` | `7dcc4efeee7112f4958746f9cd379ce8311fe0f5` | MIT License；计划逐字带入本地，不改版权文本 |

本地和远程初始化提交不同，不能直接推送或把分支改名当作历史同步。是否存在共同祖先应在取得远程对象后用 `merge-base` 实测；安全后续方案见交接记录。远程文件读取不是执行 `pull` 或修改远程仓库。

## Astro 7 规范核对

目录按 [Astro 项目结构](https://docs.astro.build/en/basics/project-structure/) 组织：路由留在 `src/pages`，可复用界面后续放入 `components` 与 `layouts`，原样复制的公开资源放入 `public`。

Phase 2 再实现 [内容集合](https://docs.astro.build/en/guides/content-collections/)：使用根于 `src` 的 `content.config.ts` 和构建期 loader；本阶段只建立内容目录，不实现 schema、查询或论文路由。此处记录的是计划，不能当作已完成的功能。
