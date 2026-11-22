# SHIT LAB / 思想实验室：工程协作规则

## 先确定阶段与范围

- 每次工作先阅读本文件、`README.md`、`docs/ROADMAP.md` 和最近的阶段交接报告，先检查 Git 状态，再修改文件。
- 当前授权仅为 **Phase 0：工作区治理、架构与文档**。到验收报告完成即停止。后续阶段必须有用户的新指令；路线图不是开发授权。
- 本阶段保留最小入口，不实现首页设计、论文集合、搜索、公式、PDF 功能、论坛、数据库、登录或 API 服务。
- 项目根目录固定为 `F:\sever_experiment\shit-laboratory`。不得重新初始化 Astro、重新 clone 覆盖、创建嵌套 Git 或第二套 `node_modules`。
- 优先 Astro、TypeScript 严格配置和原生 CSS。添加依赖前解释具体用途、成本和阶段归属；不为预留功能安装依赖。

## 文件与凭证保护

- 工作区上级 `.ssh` 中所有私钥、公钥均受保护。禁止读取私钥内容、对私钥计算哈希、输出密钥正文、修改、移动、删除、覆盖或上传密钥；禁止修改其 ACL。
- 不搜索密钥正文。对工作区根目录多余 `.pub` 只允许元数据与公钥哈希比较；只有确认完全一致才可在报告中建议删除，实际删除仍需用户明确授权。
- 工作区根目录历史 `index.html` 保留。项目外文件不纳入 Git，不改现有用户数据。
- 不读取、记录或提交实际环境变量值、密码、Token、服务器地址与登录凭证。不要输出完整环境、含认证信息的 URL 或凭证配置。`public/` 内容会公开，不能放敏感文件。
- 不运行 `git clean -fdx`、`git reset --hard`、递归强制删除工作区等破坏性命令。删除未跟踪文件、用户数据或进行不可逆大范围操作前，先列清单或备份并获得确认。
- 不擅自连接或修改生产服务器，不部署、不改防火墙、安全组、DNS，不开启公网监听。开发和预览只绑定回环地址。

## 修改、检查与提交流程

1. 只读盘点：确认项目根目录、分支、远程、已跟踪修改和未跟踪文件。保留用户已有改动；对已有规则和 README 做合并，不直接丢弃。
2. 说明本次目标和文件范围；在当前授权阶段内完成小而清晰的修改。内容、布局与工具函数按职责分开；没有实际用途时不制造空模块。
3. 运行与变更相称的检查：至少 `npm run build`；已有 `check`、`lint` 则运行。没有这些脚本时如实报告，不临时安装大批测试工具。
4. 检查构建产物、页面及引用资源路径；核对依赖、锁文件、文档链接、`git diff --check`。构建成功不等于完成所有类型、无障碍或浏览器测试。
5. 检查所有准备提交的已跟踪和未跟踪文件：先筛敏感路径，再只扫描安全文本，命中时只报告路径和规则，不能打印匹配到的凭证。`.gitignore` 不会自动移除历史已跟踪文件。
6. 提交前查看 `git diff` 与 `git diff --cached`，按明确文件清单暂存。用户允许本地提交时可提交；本阶段默认把结果留在工作树便于审阅，不自动推送。
7. 每阶段写 `docs/reports/phaseN-handoff.md`：原状、修改/新增/删除、保留疑问文件、验证命令与实际结果、Git 状态、风险、下一阶段建议，并向用户用中文报告。未验证的事项必须明确标注。

## Git 同步边界

- 只有项目自身是 Git 根目录。远程目标为 `https://github.com/BI-coder-1/sxu_shit.git`，远程默认分支 `main`；不上传整个上级工作区。
- 保护远程 README 与 LICENSE。先只读核对或 fetch，再比较历史；不直接覆盖远程 main、不 force push、不自动执行 `pull --allow-unrelated-histories`，不未经确认处理合并冲突。
- Git 若报告仓库所有权不一致，先确认是本项目；可以对该命令使用 `-c safe.directory=F:/sever_experiment/shit-laboratory`，不添加全局 `safe.directory=*`，不修改 ACL。
- 同步采用交接报告中的分支方案；用户确认前不推送、不创建远程提交或合并请求。

## Development（保留原有开发规则）

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
