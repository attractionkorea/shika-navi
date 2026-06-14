# 歯科ナビ (SHIKA NAVI)

일본 일반인 대상 치과 미디어 블로그 — 정적 HTML 사이트 (빌드 불필요).
어트렉션(Attraction) 제작 · 총 25개 기사 (인플란트/지역/충치·치주/교정/심미/입니·브릿지/예방/구강외과/비용).

## 구성
- `index.html` — 홈
- `articles/*.html` — 기사 25개 (지역글 포함: 新宿/渋谷/銀座/池袋/横浜)
- `styles.css` / `sitemap.xml` / `robots.txt`
- `SEO_가이드.md` — 키워드 맵 & 운영 가이드 (배포 후 삭제하거나 비공개로)

> 빌드 과정 없는 순수 정적 사이트라, Vercel이 그대로 서빙합니다. `package.json` 불필요.

---

## 방법 A. GitHub → Vercel 임포트 (권장)

### 1) GitHub에 올리기
로컬에서 이 폴더로 이동 후:
```bash
git init
git add .
git commit -m "init: 歯科ナビ dental media blog"
```
GitHub CLI(`gh`)가 있으면 한 줄로 리포 생성+푸시:
```bash
gh repo create shika-navi --public --source=. --push
```
없으면 github.com에서 빈 리포(`shika-navi`)를 만든 뒤:
```bash
git remote add origin https://github.com/<your-id>/shika-navi.git
git branch -M main
git push -u origin main
```

### 2) Vercel에 연결
1. https://vercel.com → **Add New… → Project**
2. 방금 만든 `shika-navi` 리포 **Import**
3. **Framework Preset: Other**, Build Command 비움, **Output Directory: `./`** (루트 그대로)
4. **Deploy** → 끝. `https://shika-navi.vercel.app` 같은 URL이 바로 생성됩니다.

GitHub에 연결해두면 이후 `git push`만 해도 자동 재배포됩니다.

---

## 방법 B. Vercel CLI 즉시 배포 (GitHub 없이)

이 폴더에서:
```bash
npx vercel        # 첫 실행 시 로그인 안내(이메일/깃허브) → 질문 엔터로 진행
npx vercel --prod # 프로덕션 URL 발급
```

---

## 공개 전 치환 (중요)
- `SITE.base_url` (메타/sitemap의 `https://www.shika-navi.jp`) → **실제 도메인**으로 교체
- `SITE.supervisor` (`歯科医師 監修`) → **실재 감수 치과의사 성명·소속**으로 교체
  - 가짜 실명 감수표시는 일본 경표법·의료광고 규제 위반이라 일부러 비워뒀습니다.
- 위 값은 생성기(`content.py`)에서 바꾼 뒤 재생성하는 구조입니다. (정적 HTML만 손볼 경우 전 파일 일괄 치환)

도메인을 Vercel에 연결하면(Project → Settings → Domains) 무료로 커스텀 도메인+HTTPS가 적용됩니다.
