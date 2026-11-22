# Phase 0 完整交接记录

日期：2026-11-22（北京时间）。范围：工作区治理、架构初始化与文档。**严格停止在 Phase 0**；没有开始首页设计或后续功能，没有安装依赖、推送 GitHub 或部署阿里云。

## 1. 原有文件盘点与判断

完整原状见 [初始盘点](phase0-inventory.md)。工作区初始共遍历 967 个子目录、9,762 个文件，包含已有依赖和 Git 内部文件；只发现一个 Git 仓库，根目录正确位于 `F:\sever_experiment\shit-laboratory`。

项目是 Astro 7.4.13 Minimal：只有 `/` 页面与两个图标，直接依赖只有 Astro，已有 `dev/build/preview/astro` 四个脚本，没有 `check/lint/test`。不需要重建 Astro、重新 clone、重复安装或删除示例才能完成本阶段。

项目外保持四个原始条目：`.ssh/`、历史 `index.html`、空的 `aliyun_campus_ed25519.pub` 和正式项目目录。没有将上级工作区加入 Git。

## 2. 已修改与新增文件，以及存在理由

共 **修改 5 个原有文件，新增 10 个文件，删除 0 个文件**。修改均可在现有 Git 历史基础上审阅，没有本地提交或暂存。

| 类型 | 文件 | 作用及本阶段处理 |
| --- | --- | --- |
| 修改 | `AGENTS.md` | 合并阶段边界、凭证保护、修改/检查/提交/交接流程；完整保留旧后台启动规则与官方文档链接 |
| 修改 | `README.md` | 项目入门入口；保留有用的 Astro 原模板说明，加入启动、结构与文档索引；记录远程原始两行介绍 |
| 修改 | `.gitignore` | 补齐环境文件、密钥、公钥、凭证目录、备份与缓存的排除规则，降低误提交风险 |
| 修改 | `astro.config.mjs` | 明确静态输出，并把开发与预览限制为 `127.0.0.1` |
| 修改 | `package.json` | 原有脚本与依赖不变，只增加 `setup:workspace` 目录恢复命令 |
| 新增 | `LICENSE` | 从远程已确认提交带入 MIT 原文，版权文本和文件字节与远程一致 |
| 新增 | `scripts/prepare-workspace.mjs` | 仅创建固定清单的目录，不删除、不写入已有文件；让 Git 检出后可恢复空目录 |
| 新增 | `docs/PRD.md` | 定义用户、第一版范围、非功能需求、论文格式和真实性标注，防止需求漂移 |
| 新增 | `docs/ARCHITECTURE.md` | 解释静态构建、目录、内容/布局分离及未来独立服务边界 |
| 新增 | `docs/ROADMAP.md` | 分配 Phase 0–5 任务、验收标准、依赖与待决策项，明确不能提前开发 |
| 新增 | `docs/DESIGN_SYSTEM.md` | 记录黑白粗野主义、色彩/字体/网格与无障碍规范；没有写视觉页面或 CSS |
| 新增 | `docs/DEPLOYMENT.md` | 解释本地使用、构建、dist 和未来 Ubuntu/Nginx 方法；仅文档，不执行服务器操作 |
| 新增 | `docs/decisions/0001-static-site-and-phase-boundaries.md` | ADR：记录为什么使用静态架构、推迟论坛和遵守阶段边界 |
| 新增 | `docs/reports/phase0-inventory.md` | 保存修改前的目录、配置、环境与 Git 事实 |
| 新增 | `docs/reports/phase0-handoff.md` | 本记录：交付清单、实际验证、安全同步与后续事项 |

`package-lock.json` 固定具体依赖，`tsconfig.json` 保留严格 TypeScript 配置；这两个重要文件均未修改。原始 `src/pages/index.astro`、两个 favicon、`.vscode` 两个文件也与初始 Git 版本逐字节一致。

本地 Git 元数据另有必要变化：配置 `origin`，fetch 远程 main 的对象和跟踪引用；没有修改提交历史。构建/开发产生的 `dist/`、`.astro/` 及依赖内部缓存均被忽略，不属于待提交源文件。

## 3. 实际工程结构

```text
shit-laboratory/
├── .git/                         原有唯一 Git 仓库
├── .gitignore                    已补齐安全排除规则
├── .vscode/                      原有编辑器配置
├── AGENTS.md
├── README.md
├── LICENSE
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── ROADMAP.md
│   ├── DESIGN_SYSTEM.md
│   ├── DEPLOYMENT.md
│   ├── decisions/
│   │   └── 0001-static-site-and-phase-boundaries.md
│   └── reports/
│       ├── phase0-inventory.md
│       └── phase0-handoff.md
├── src/
│   ├── components/               空；Phase 1 按真实功能拆分组件
│   ├── layouts/                  空；后续共享外壳与阅读布局
│   ├── pages/
│   │   └── index.astro           原始最小入口
│   ├── content/papers/           空；Phase 2 再写论文与集合
│   ├── styles/                   空；Phase 1 再写 CSS
│   ├── lib/                      空；按后续真实需求加入工具函数
│   └── types/                    空；按后续真实需求加入共用类型
├── public/
│   ├── favicon.ico               原有，当前入口仍引用
│   ├── favicon.svg               原有，当前入口仍引用
│   ├── images/                   空；公开图片
│   ├── icons/                    空；公开图标
│   └── papers/                   空；后续公开 PDF 附件
├── scripts/
│   └── prepare-workspace.mjs
├── node_modules/                 原有依赖，忽略
├── .astro/                       生成类型及本地状态，忽略
└── dist/                         构建产物，忽略
```

相对最初现场新增 14 个目录（包含中间父目录），其中 9 个末级目录目前为空。Git 不保存空目录；`npm run setup:workspace` 使用固定清单恢复它们，不需要大量 `.gitkeep`。脚本以自身位置定位项目根目录，可重复运行，不依赖当前终端所在位置。

## 4. 清理、保留与文件安全结果

本阶段没有删除、移动或重命名任何文件。两个 Astro 图标仍被入口引用，当前没有必要删除；品牌替换放在 Phase 1，替换时同时修改引用。原 README 的模板初始化命令及“删除本文件”提示已由实际项目说明替代，实用目录、命令和学习入口保留。

| 保留对象 | 原因与核验 |
| --- | --- |
| 工作区 `.ssh` 内全部 4 个文件 | 受保护。仅核对名称、长度、修改时间；这些元数据前后一致。不读取私钥、不对私钥计算哈希、不改 ACL |
| 工作区根 `index.html` | 历史部署资产，583 字节；前后 SHA-256 一致，未读取正文或迁移 |
| 工作区根 `aliyun_campus_ed25519.pub` | 0 字节，与 `.ssh` 内两份公钥均不相同，不能确认为重复副本；必须保留 |
| 原有 `.vscode`、锁文件、tsconfig、入口与图标 | 仍有用途；与本地原始提交逐字节一致 |
| 原有 `node_modules`、`.astro` | 可再生但无必要清理；复用现有安装，未创建第二套项目依赖或嵌套 Git |

历史页面与空公钥副本的前后哈希见盘点报告；这里只比较允许的对象，不把私钥内容或凭证写进日志。元数据一致不能被表述成私钥内容哈希验证。

## 5. Git 当前状态与远程差异

本节是 Phase 0 交付时快照，不代表未来同步后的状态。

| 项目 | 实际结果 |
| --- | --- |
| 项目根目录 | `F:/sever_experiment/shit-laboratory` |
| 当前本地分支与 HEAD | `master`；`cd21bc9eac6cf697f5efc0a3fcfa603f5c41a7de`，Astro 初始提交 |
| origin | `https://github.com/BI-coder-1/sxu_shit.git`，本阶段补充配置 |
| 远程默认分支与已 fetch 的 HEAD | `main`；`b951d3c57c0c7647f79ba943ee636a6a648f66a7` |
| 远程已有文件 | `README.md` 与 `LICENSE`，没有 Astro 工程源码 |
| 历史关系 | `git merge-base HEAD origin/main` 退出 1，无共同祖先；两边各有 1 个独有提交 |
| 当前工作树 | 5 个已跟踪文件修改、10 个新文件；没有暂存项；没有新本地提交 |
| 已执行的远程操作 | 连接器只读查看、Git fetch；没有 pull、merge、push 或远程写入 |

远程 LICENSE 的 blob 为 `7dcc4efeee7112f4958746f9cd379ce8311fe0f5`，本地 `git hash-object --no-filters LICENSE` 完全一致。本地 README 在开头保留原始 `sxu_shit` 和“荒诞正经的论文研讨”，远程 README 本身未修改。

Git 起初报告仓库所有者不一致。实际命令使用单次 `-c safe.directory=F:/sever_experiment/shit-laboratory`，没有修改全局信任、所有者或 ACL。普通受限 fetch 因已有本机代理无法连接而失败；随后获批的同一 fetch 成功，未更改代理设置。

### 建议的安全同步方案：先保留本地快照，再从远程 main 整合

**以下是待审阅、待后续明确执行的步骤，本阶段没有执行。** 目标是同时保留本地原始历史与远程 main 历史，不进行无关历史合并、不强推，不直接写远程 main。

1. 审阅当前 15 个变更文件及安全扫描；按明确清单暂存，在本地提交，然后创建 `safety/phase0-local` 保留完整工程。身份未配置时先由用户确认身份，不擅自设置姓名/邮箱。
2. 再次 fetch 并核对远程 main。若与上述快照不同，先重新检查 README、LICENSE 和新增远程文件；不能直接使用旧判断覆盖新改动。
3. 确认工作树干净后，在现有仓库中从 `origin/main` 建立 `chore/phase0-integration`。不要重新 clone，也不改名或覆盖现有本地 master。
4. 从安全快照按白名单导入已审阅工程文件；远程 LICENSE 留在原位。检查 README 保留远程原文，发现冲突或意外差异时停止并请用户确认。
5. 恢复空目录、构建、检查 staged diff 和安全规则，再提交整合分支。验证通过后，经用户明确同意，只推送该分支并以 PR 合入 main；不推送或强推 main。

PowerShell 5.1 可用下面的临时函数为每次 Git 操作限定本仓库信任，并在失败时停止。它不修改任何全局配置：

```powershell
function Invoke-RepoGit {
    & git -c 'safe.directory=F:/sever_experiment/shit-laboratory' @args
    if ($LASTEXITCODE -ne 0) { throw 'Git 命令失败，请停止并检查，不继续同步。' }
}
```

第一步的白名单暂存示意（先审阅，未执行）：

```powershell
Invoke-RepoGit add -- .gitignore AGENTS.md README.md astro.config.mjs package.json LICENSE docs scripts
Invoke-RepoGit diff --cached --check
Invoke-RepoGit diff --cached
# 人工审阅后再提交和保留快照
Invoke-RepoGit commit -m 'chore: establish phase 0 project foundation'
Invoke-RepoGit branch safety/phase0-local
Invoke-RepoGit fetch --no-tags origin main
```

再次检查远程后，第二步的整合示意（未执行）：

```powershell
Invoke-RepoGit switch --create chore/phase0-integration origin/main
Invoke-RepoGit restore --source safety/phase0-local --staged --worktree -- .gitignore .vscode AGENTS.md README.md astro.config.mjs package.json package-lock.json tsconfig.json src public scripts docs
npm.cmd run setup:workspace
npm.cmd run build
Invoke-RepoGit diff --cached --check
Invoke-RepoGit diff --cached
```

这会让后续整合提交以远程 main 为祖先；本地旧历史仍保留在 master 和安全分支中。导入白名单不包含 LICENSE，因此远程许可证继续保留。不要在有未保存改动时切分支，也不要在错误后自行使用 reset/clean 或强推修复。

## 6. 工程验证的实际结果

执行环境显式使用现有 Windows PowerShell **5.1.26100.9818**、`E:\Nodejs` 下 Node **26.13.1** 和 npm **11.20.0**，Git **2.47.1.windows.1**。Codex 默认 Node 24 / PowerShell 7 与用户终端不同，未把这种差异误报为项目错误，未修改系统 PATH 或工具安装。

| 检查 | 实际结果 |
| --- | --- |
| `npm.cmd run setup:workspace` | 退出 0，固定目录创建成功；重复执行只确保目录存在，不覆盖已有文件 |
| `npm.cmd run build` | **退出 0**；Astro 7.4.13，`output: static`、`mode: static`，1 个页面构建完成，Astro 报告耗时 289ms |
| 构建输出位置 | `F:\sever_experiment\shit-laboratory\dist\` |
| 产物文件 | `index.html` 313 字节、`favicon.svg` 749 字节、`favicon.ico` 655 字节；两个图标与源文件一致 |
| 产物目录 | `images/`、`icons/`、`papers/` 三个空目录由 public 复制，属预期；没有源码、文档、凭证或额外业务产物 |
| 开发启动 | 确认无既有开发实例后，运行 `npm run dev -- --background --port 4321`，只监听 `127.0.0.1:4321` |
| 开发路径 | `/`、`/favicon.svg`、`/favicon.ico` 全部 HTTP 200 |
| 构建预览 | `npm run preview -- --background --port 4322`，只监听 `127.0.0.1:4322`；三个正常路径均 200，不存在路径为 404 |
| 实例收尾 | 按本次实例身份停止开发与预览；两种 `status` 均报告没有运行实例，未停止他人服务 |
| `check/lint/test` | 原项目没有对应脚本；未伪造“通过”，未为 Phase 0 安装额外依赖 |
| `git diff --check` | 退出 0，无空白错误；Git 提示现有换行策略将来可能把 LF 转为 CRLF，本阶段未改全局行尾设置 |
| 配置与依赖 | 原有四个脚本全部保留、直接依赖完全一致、锁文件字节未变；未引入 React、数据库、认证或论坛依赖 |
| 忽略规则 | 16 个合成路径检查全部命中，包括 node_modules、dist、各类 .env、密钥/公钥及本地凭证；没有为测试创建这些敏感文件 |
| 候选文件安全扫描 | 检查全部 22 个已跟踪及未跟踪候选文件；21 个安全文本按规则扫描，1 个原有 ICO 按二进制跳过且字节未变；未命中密钥、Token 或凭证 URL |
| 规则与链接 | 旧 AGENTS 开发/文档规则完整保留；本地 Markdown 文件链接已检查，没有断链 |

受限执行器最初访问本机地址返回 EACCES；实际 HTTP 验证在获批的本机执行环境中完成。最早盘点时记录的用户开发实例在最终验证前已不存在，因此只在确认无实例后启动本次测试，不强制替换旧进程。

扫描是针对当前候选文件的规则检查，不能替代以后每次提交前的审阅。本阶段未进行正式浏览器视觉、性能、全量类型或生产环境测试；这些不能写作已通过。

## 7. 风险与待确认事项

- **Git 整合尚未执行。** 当前交付是本地可审阅工作树；远程没有本阶段文件。后续需确认同步方案及实际提交身份，再进行本地快照和远程分支整合。
- **根目录空公钥来源不明。** 虽然为空，但不等于已确认为重复公钥；保留，不建议直接清除。
- **品牌与内容仍未开发。** 页面标题和图标仍是 Astro 示例，这是 Phase 0 的刻意边界，不能当作已完成品牌首页。
- **产品决策留在相应阶段。** Phase 1 确认字体、页面骨架与双语范围；Phase 2 确认 URL、字段与文章授权；Phase 3 选搜索/PDF；Phase 4 确认域名、服务器、备案和发布授权；Phase 5 再评估论坛。
- **生产状态未核实。** 未连接服务器、未检查备案或改动旧站；部署文档仅为未来方案，不能当成实际部署或合规验收。

## 8. Phase 1 建议与本阶段停止点

收到新的 Phase 1 指令后，先阅读设计规范，落地少量 CSS 变量与基础排版，再按职责建立公共布局、导航、页脚和首页骨架；用手机宽度、长中文标题和键盘操作验证。品牌图标替换应连同引用一起完成。

Phase 1 继续不做论坛、数据库、认证或生产部署；论文集合与内容填充属于 Phase 2。当前不执行上述建议，停留在 Phase 0 的工程与文档交付。
