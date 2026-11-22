# 静态网站架构

状态：Phase 0。当前实现为一个最小静态路由、工程目录与文档；内容集合和业务组件仍是后续计划。

## 运行方式

Astro 在开发时提供本地服务器；构建时把页面和公开资源转换为静态文件。未来 Nginx 只负责把这些文件交给浏览器，服务器不需要运行论文数据库或 Node 应用。文章更新必须重新构建发布，不能像数据库后台一样即时写入。

```mermaid
flowchart LR
    A[本地源码与后续论文文件] --> B[Astro 静态构建]
    B --> C[dist 静态产物]
    C --> D[未来经授权发布到 Nginx]
    D --> E[读者浏览器]
    E -. 后续独立链接 .-> F[Phase 5 论坛服务]
```

虚线表示后续边界，不表示已创建论坛或已完成部署。

## 目录职责

| 路径 | 职责与约束 |
| --- | --- |
| `src/pages/` | 文件路由；当前 `index.astro` 对应 `/`。后续页面只负责组装布局与内容，不成为所有功能的单一大文件 |
| `src/components/` | 可复用 UI；Phase 1 按站点导航、排版等真实用途分组，Phase 2 再加论文组件；现在不建立空组件 |
| `src/layouts/` | 共享 HTML 外壳、元信息与页面结构；论文布局后续消费内容，不存放文章正文 |
| `src/content/papers/` | 后续 Markdown 正文与元数据，独立于页面布局 |
| `src/styles/` | 后续设计变量、基础样式和功能样式，使用原生 CSS |
| `src/lib/` | 后续纯工具函数、内容查询和外部服务读取边界；不存放凭证或虚构的 API 客户端 |
| `src/types/` | 后续跨模块共享类型；优先使用 Astro 自动推断的内容类型，避免重复维护 |
| `public/images/`、`public/icons/` | 直接复制到产物的公开资源；需要 Astro 处理的图片后续可放 `src` 内 |
| `public/papers/` | 后续已发布 PDF 等附件；里面的每个文件都可能被直接下载，不能放草稿或隐私材料 |
| `scripts/` | Node 本地工程工具。现有 `prepare-workspace.mjs` 只创建固定目录，不是服务器 |
| `docs/` | 产品、架构、路线图、设计和部署规范；不作为公开页面自动发布 |
| `docs/decisions/` | ADR：记录一个重要决策的原因和影响，避免只看到结果却不了解理由 |
| `docs/reports/` | 盘点和阶段交接；记录真实命令结果，不填虚构测试数据 |
| `dist/`、`.astro/`、`node_modules/` | 可再生构建产物、类型/本地状态、依赖；都由 Git 忽略 |

目录遵循 [Astro 官方项目结构](https://docs.astro.build/en/basics/project-structure/)。空目录由 `npm run setup:workspace` 恢复；不用 `.gitkeep` 或空模块来模拟实现。

## 关键配置文件

- `package.json`：保留原有四个 Astro 脚本及唯一直接依赖，只增加目录恢复脚本。
- `package-lock.json`：固定具体版本，用于干净检出的 `npm ci`；本阶段不改动。
- `astro.config.mjs`：显式 `output: 'static'`，开发/预览仅绑定 `127.0.0.1`；域名未知，暂不填 `site` 或部署适配器。
- `tsconfig.json`：沿用 `astro/tsconfigs/strict`。当前未添加业务 TypeScript 文件或额外类型检查依赖。
- `.gitignore`：排除生成物、环境文件、密钥和本地凭证；仍需检查已经跟踪的文件及每次准备提交的内容。
- `AGENTS.md`：协作、安全和阶段验收规则；原有 Astro 后台服务器与官方资料入口仍有效。

## 后续内容组织（Phase 2 再实现）

依照 [Astro 内容集合规范](https://docs.astro.build/en/guides/content-collections/)，计划在 `src/content.config.ts` 定义构建期 `papers` 集合，用 `astro/loaders` 的 `glob()` 读取 `src/content/papers/`。不要照搬旧版本的 `src/content/config.ts`、旧式 `type: 'content'` 或已移除的隐式集合方式。

字段契约见 [PRD](PRD.md)。Phase 2 通过 schema 验证字段、唯一 URL 与证据类型；具体使用 API 时再次核对本地版本。Astro 7 的 Zod 工具应从 `astro/zod` 导入，避免沿用已移除的旧导出。

计划让内容查询层负责筛选已发布文章，列表与详情共用这一规则；静态详情路由只从筛选后的集合生成。正文渲染与 PDF 附件分开；PDF 放公开目录后按站点 URL 引用，而非使用 Windows 文件路径。草稿不能出现在静态路由、搜索索引、公开附件或发布清单中。

Phase 0 不创建集合配置或类型占位。只有一页入口时，提前接入空集合会增加警告与维护成本，也超出授权范围。

## 构建和路径

```text
npm run build
    → 读取 astro.config.mjs 与源码
    → Astro 同步类型并编译页面
    → 后续阶段读取和校验论文集合
    → 生成 dist/index.html 等页面与公开资源
```

当前只有 `/`，构建应生成 `dist/index.html`，同时复制两个原有 favicon。`docs/`、`scripts/`、Git 元数据和密钥都不应进入产物。构建成功验证了编译与路径生成，不代替独立类型检查或浏览器阅读验收。

现阶段按域名根路径 `/` 设计；域名或子路径部署在 Phase 4 确定。若改用子路径，必须同步评估 `base`、资源 URL 和 Nginx 映射，不能只修改服务器目录。

## 未来 Nginx 部署

未来只把经过检查的 `dist/` 发布到独立版本目录，由 Nginx 的 `root` 指向当前版本。HTML 使用适当的重新验证策略，带内容哈希的资源再考虑长缓存。论文路由必须按生成的文件结构命中；不存在的 URL 返回 404，不把所有路径伪装成首页。

生产不需要保留 `node_modules`、源码或密钥，也不通过 `astro dev`/`preview` 提供公网服务。具体受限测试示意与发布/回退步骤见 [部署文档](DEPLOYMENT.md)。

## 未来 API 与论坛边界

- 论文网站继续可独立构建、访问和部署。论坛计划使用独立仓库、域名或子域名、部署流程、数据存储和运维责任；不嵌套第二个 Git 项目。
- 第一种接入方式优先是普通链接，论坛故障不得影响论文阅读。本阶段不放可点击的虚构论坛地址。
- 将来确有读取 API 的需求，再在 `src/lib/` 增加小型适配层和版本化数据契约；明确构建期读取还是浏览器读取、失败降级、CORS、超时和公开数据范围。
- 认证、写入权限、会话和数据保护属于独立服务。不得把服务端密钥放入网页包、`public/` 或任何公开前端配置；不预建登录、API 路由、数据库或代理。

决策依据见 [ADR-0001](decisions/0001-static-site-and-phase-boundaries.md)。
