# 本地开发与未来静态部署

状态：Phase 0 文档。这里只说明方法；本阶段不连接阿里云、不安装服务器软件、不更改生产文件、域名、防火墙或安全组，也不开放公网端口。

## 本地环境与启动

在 Windows PowerShell 5.1 中，从正式项目根目录执行：

```powershell
Set-Location 'F:\sever_experiment\shit-laboratory'
node --version
npm.cmd --version
npm.cmd run setup:workspace
npm.cmd run astro -- dev status
```

已有开发实例时先核实并复用。需要新启动且没有占用时：

```powershell
npm.cmd run dev -- --background
npm.cmd run astro -- dev logs
```

默认访问 [本机入口](http://127.0.0.1:4321/)。后台模式不会占住终端；结束自己启动的实例时运行 `npm.cmd run astro -- dev stop`。不要用强制选项替换用户已启动的实例。

`astro.config.mjs` 把开发和预览限定在 `127.0.0.1`。不要传入裸 `--host`，它会扩大监听范围；不使用防火墙规则把开发服务器暴露出去。

已有 `node_modules/` 和锁文件，本阶段不需要重新安装。未来干净检出且获得相应操作授权后，用 `npm ci` 安装锁定依赖，再执行 `npm run setup:workspace` 恢复空目录；不要在工作区总目录安装。npm、Node 或 PowerShell 版本找不到时，先检查实际使用的现成工具路径，不擅自升级系统。

## 构建与产物检查

```powershell
npm.cmd run build
Get-ChildItem -LiteralPath 'dist' -Recurse -File
```

`npm run build` 执行已有 `astro build`，输出到项目内 `dist/`。当前最小站应有 `index.html`、`favicon.svg`、`favicon.ico`。后续页面增多时要核对每条实际路由和引用资源。

构建后检查：命令退出码是否为 0、输出目录是否正确、公开资源是否存在、产物中是否混入文档/源码/密钥。不要把“构建成功”写成“全部类型检查通过”：当前没有 `check`、`lint` 或 `test` 脚本，本阶段不安装额外检查依赖。

需要检查构建后的 HTTP 效果时，可使用独立本机端口预览：

```powershell
npm.cmd run preview -- --background --port 4322
npm.cmd run astro -- preview status
# 只在本机浏览 http://127.0.0.1:4322/
npm.cmd run astro -- preview stop
```

预览只在确认为自己启动的实例时停止。`preview` 是验证静态产物的本地工具，不是未来的生产服务器。实际 Phase 0 验证结果及执行环境差异见 [交接记录](reports/phase0-handoff.md)。

## 未来 Ubuntu + Nginx 的职责

Phase 4 获得授权后，先核对旧站和运维方式，再决定 Ubuntu/Nginx 的安装与配置。Windows 是源码开发环境；Ubuntu 服务器负责保管静态发布目录，Nginx 负责响应网页请求。无需把 `node_modules/` 或整个 Git 仓库传到生产服务器，也无需运行数据库。

建议每次发布使用新的版本目录，例如 `/srv/shit-lab/releases/<版本标识>/`；`/srv/shit-lab/current` 指向当前版本，Nginx 的 `root` 指向它。目录是未来规划的路径，不对应本阶段实际操作过的服务器。保留上一版本可快速回退，不覆盖或删除未知旧站。

以下是**仅在服务器回环地址提供受限测试的配置示意**，并未写入或加载到服务器：

```nginx
server {
    listen 127.0.0.1:8080;
    server_name _;
    root /srv/shit-lab/current;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ /\. {
        deny all;
    }
}
```

`root` 是公开文件所在位置，`index` 是目录请求的默认页面，`try_files` 按真实文件/目录查找，找不到返回 404。不会把错误的论文链接转成成功的首页。配置原理参见 [Nginx 官方入门文档](https://nginx.org/en/docs/beginners_guide.html)。

## Phase 4 发布与回退顺序（本阶段不执行）

1. 确认服务器、域名、备案状态、旧站路径、操作人和明确发布授权；备份旧站文件及配置，记录恢复方式。
2. 确认根路径或子路径部署，并填写需要的 `site`/`base`；本地构建及检查，记录对应 Git 版本。
3. 只把经过检查的 `dist/` 内容复制到新的发布目录；核对文件、权限和校验值，不上传密钥、环境文件、源码或依赖目录。
4. 在受限入口验证主页、论文、图片、PDF、404、中文文件名和缓存；失败时保持旧版本，不切换。
5. 需要改 Nginx 时，先运行配置检查 `sudo nginx -t`。检查通过后才在授权窗口切换当前版本并按需 reload；不在未知服务上直接重启。
6. 授权的正式公开访问还需正确域名、HTTPS、备案与安全组策略。带哈希资源可使用长缓存，HTML 应能及时更新；具体配置按实际产物确定。
7. 发布失败则把当前指向恢复到上一版本，并在需要时恢复已备份的配置，再检查入口。未经确认不删除旧版本或历史站点。

## SSH 与凭证安全

- 本工作区的 `.ssh` 及其中新旧密钥保持原样，不读取私钥、不复制进项目、不改 ACL。不要因连接报错随意覆盖密钥或关闭主机身份校验。
- 将来建立连接时，在用户确认服务器身份后核对主机指纹；使用已有安全认证方式，不把密码、私钥、Token、真实环境值或服务器登录信息写入源码、文档、终端输出或 Git。
- 静态前端无法保守秘密；公开目录以及最终网页中的任何配置都可被读取。未来 API 的服务端秘密必须留在独立服务。
- Git 通过本地项目单独管理，忽略规则与内容扫描同时使用；忽略文件不等于撤销已提交凭证。一旦发现已有泄漏，先停止传播并让所有者处置，不把凭证再次贴进报告。

## 中国内地备案前的测试边界

备案完成前只做本地、服务器回环地址或经授权的私有网络测试；需要远程查看时另行授权受控通道，不直接对公网提供网页服务。不能以裸 IP、临时域名或开放开发端口规避备案。

阿里云说明，未取得备案号的网站不能对外开通 Web 服务；接入阿里云中国内地节点也应核对备案接入状态。执行 Phase 4 时再次查阅 [阿里云备案期间访问说明](https://help.aliyun.com/zh/icp-filing/the-influence-of-the-record-during-the-site-visit)，以当时要求和具体情况为准。本阶段未判断用户现有服务器的备案状态。
