# Google Search Console 验证完成指南

## 当前状态

✅ 基础设施已配置完成：
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` 环境变量已添加（当前为占位符）
- 验证 meta 标签已部署到生产环境
- 所有 SEO 元素已优化

## 完成验证的步骤

### 步骤 1：获取真实验证代码

1. 打开 [Google Search Console](https://search.google.com/search-console)
2. 点击「添加资源」→ 选择「网址前缀」
3. 输入：`https://ai-image-checker.vercel.app`
4. 选择「HTML 标记」验证方法
5. 复制 `content="..."` 中的字符串（例如：`abc123xyz456`）

### 步骤 2：更新环境变量

运行以下命令，将 `YOUR_VERIFICATION_CODE` 替换为你获取的真实代码：

```bash
echo "YOUR_VERIFICATION_CODE" | vercel env rm NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION production --yes
echo "YOUR_VERIFICATION_CODE" | vercel env add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION production
```

### 步骤 3：重新部署

```bash
NEXT_PUBLIC_SITE_URL=https://ai-image-checker.vercel.app \
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="YOUR_VERIFICATION_CODE" \
vercel build --prod --yes

vercel deploy --prebuilt --prod --yes
```

### 步骤 4：验证

1. 回到 Google Search Console
2. 点击「验证」按钮
3. 等待验证完成

### 步骤 5：提交 Sitemap

1. 在 Google Search Console 左侧菜单选择「站点地图」
2. 输入：`sitemap.xml`
3. 点击「提交」

## 验证成功后

- Google 将开始抓取和索引你的网站
- 你可以在「效果」报告中查看搜索表现
- 在「覆盖率」报告中查看索引状态
- 在「增强功能」中查看结构化数据状态

## 注意事项

- 验证代码是唯一的，每个域名一个
- 验证成功后不要删除环境变量，否则验证会失效
- Sitemap 提交后，Google 会在几天内开始抓取
