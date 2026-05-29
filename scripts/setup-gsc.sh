#!/usr/bin/env bash
set -euo pipefail

echo "=== Google Search Console 验证设置 ==="
echo ""
echo "请按以下步骤操作："
echo "1. 打开 https://search.google.com/search-console"
echo "2. 点击「添加资源」→ 选择「网址前缀」"
echo "3. 输入：https://ai-image-checker.vercel.app"
echo "4. 选择「HTML 标记」验证方法"
echo "5. 复制验证代码（content=\"...\" 中的字符串）"
echo ""

read -p "请粘贴验证代码: " VERIFICATION_CODE

if [ -z "$VERIFICATION_CODE" ]; then
    echo "错误：验证代码不能为空"
    exit 1
fi

echo ""
echo "正在配置环境变量..."
echo "$VERIFICATION_CODE" | vercel env add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION production

echo ""
echo "正在重新构建和部署..."
NEXT_PUBLIC_SITE_URL=https://ai-image-checker.vercel.app NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="$VERIFICATION_CODE" vercel build --prod --yes

echo ""
echo "正在部署到 Vercel..."
vercel deploy --prebuilt --prod --yes

echo ""
echo "=== 部署完成 ==="
echo "请回到 Google Search Console 点击「验证」按钮"
echo ""
echo "验证成功后，请提交 Sitemap："
echo "1. 在 GSC 左侧菜单选择「站点地图」"
echo "2. 输入：sitemap.xml"
echo "3. 点击「提交」"
