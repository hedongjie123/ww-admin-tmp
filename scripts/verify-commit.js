const msgPath = process.argv[2];
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim();
const commitRE =
  /^(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|release)(\(.+\))?:*.{1,50}/;
if (!commitRE.test(msg)) {
  console.error(`
        不合法的 commit 消息格式。
        feat:新功能
        fix:bug修复
        docs:文档修改
        style:样式修改
        refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
        perf: 更改代码，以提高性能
        test: 测试用例新增、修改
        workflow: 工作流相关文件修改
        build: 影响项目构建或依赖项修改
        ci: 持续集成相关文件修改
        chore: 其他修改（不在上述类型中的修改）
        release: 发布新版本
    `);

  process.exit(1);
}
