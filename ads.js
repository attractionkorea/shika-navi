/* =====================================================================
   歯科ナビ 広告（PR）バナー管理スクリプト
   ---------------------------------------------------------------------
   ■ このファイル1つで、サイト全体の広告バナーを一括管理します。
     掲載クリニックを追加・変更・削除するときは、下の CLINICS 配列だけを
     編集してください。ホーム・各記事に自動で反映されます。

   ■ 医療広告ガイドライン順守のための注意（必読）
     - 掲載は「広告（PR）」枠です。順位・優劣・推奨を示すものではありません。
     - 「No.1」「最安」「必ず治る」等の比較優良・誇大表現は使用しないこと。
     - クリニックの名称・所在地・診療分野・URL等は【プレースホルダー】です。
       提携契約・各院の掲載同意を得たうえで、正確な情報に置き換えてください。
     - url を設定すると、その院のバナーが自動でリンク（広告）として有効化されます。
       url が空のあいだは「リンク準備中」と表示され、クリックできません。
   ===================================================================== */
(function () {
  'use strict';

  var inArticle = /\/articles\//.test(location.pathname);
  var BASE = inArticle ? '../' : '';

  /* ===== 掲載クリニック（※すべてプレースホルダー）===== */
  var CLINICS = [
    {
      name: 'ワンデイ歯科',
      tag: '即日インプラント',
      area: 'ソウル市〇〇区（要記載）',
      desc: '最短1回の渡航に対応するプランをご案内。',
      img: 'one-day-implant.jpg',
      banner: 'oneday-banner.png', /* デザイン入稿バナー（あれば大型表示） */
      url: '', /* 例: 'https://example.com/' を設定するとリンクが有効化されます */
      line: '' /* LINEの遷移先（'https://lin.ee/...' 等）。空のあいだは準備中表示 */
    },
    {
      name: 'セラミック歯科',
      tag: '審美・セラミック',
      area: 'ソウル市〇〇区（要記載）',
      desc: 'セラミック・ラミネートなど短期完了メニュー。',
      img: 'korea-ceramic-treatment.jpg',
      url: '',
      line: ''
    },
    {
      name: 'プラン歯科 釜山店',
      tag: '審美・インプラント',
      area: '釜山市〇〇区（要記載）',
      desc: 'ラミネート・インプラントなどをご案内。',
      img: 'clinic-interior.jpg',
      banner: 'plan-dental-banner.png', /* デザイン入稿バナー（あれば大型表示） */
      url: '',
      line: ''
    }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
    });
  }

  /* LINE相談ボタン。line（遷移先URL）が未設定のあいだは「準備中」表示で
     クリック無効。URLを設定すると緑のLINEボタンが有効化されます。 */
  function lineCta(c) {
    if (c.line) {
      return '<a class="adb-line" href="' + esc(c.line) + '" target="_blank" ' +
        'rel="nofollow sponsored noopener"><span class="adb-line-ic" aria-hidden="true">LINE</span>' +
        '<span>で相談する</span></a>';
    }
    return '<span class="adb-line adb-line--soon" aria-disabled="true">' +
      '<span class="adb-line-ic" aria-hidden="true">LINE</span><span>で相談（準備中）</span></span>';
  }

  /* デザイン入稿バナー（banner指定あり）は、画像をそのまま見せる大型カードで表示。
     レール最上部にバナー＋LINE相談ボタンが並びます。 */
  function bannerCard(c) {
    var img = BASE + 'images/' + c.banner;
    return '<div class="adb-card adb-banner">' +
      '<span class="adb-banner-img"><img src="' + esc(img) + '" alt="' + esc(c.name) +
        '" loading="lazy" width="1080" height="720"></span>' +
      lineCta(c) + '</div>';
  }

  function clinicCard(c) {
    if (c.banner) return bannerCard(c);

    var img = BASE + 'images/' + c.img;
    var inner =
      '<span class="adb-thumb"><img src="' + esc(img) + '" alt="" loading="lazy" width="220" height="147"></span>' +
      '<span class="adb-body">' +
        '<span class="adb-tag">' + esc(c.tag) + '</span>' +
        '<b class="adb-name">' + esc(c.name) + '<span class="adb-tentative">（仮）</span></b>' +
        '<span class="adb-desc">' + esc(c.desc) + '</span>' +
        '<span class="adb-area">' + esc(c.area) + '</span>' +
      '</span>';

    if (c.url) {
      return '<a class="adb-card" href="' + esc(c.url) + '" target="_blank" ' +
        'rel="nofollow sponsored noopener">' + inner +
        '<span class="adb-cta">詳しく見る</span></a>';
    }
    return '<span class="adb-card adb-card--soon">' + inner + lineCta(c) + '</span>';
  }

  /* 本文・ホーム上部に置く全幅の特集バナー（広告PR）。
     banner指定のあるクリニック（ワンデイ歯科）を使用します。 */
  function featureBannerEl() {
    var c = null;
    for (var i = 0; i < CLINICS.length; i++) {
      if (CLINICS[i].banner) { c = CLINICS[i]; break; }
    }
    if (!c) return null;
    var img = BASE + 'images/' + c.banner;
    var el = document.createElement('aside');
    el.className = 'oneday-feature';
    el.setAttribute('role', 'complementary');
    el.setAttribute('aria-label', '広告');
    var media = c.line
      ? '<a class="adf-link" href="' + esc(c.line) + '" target="_blank" rel="nofollow sponsored noopener">' +
          '<img src="' + esc(img) + '" alt="' + esc(c.name) + '" loading="lazy" width="1080" height="720"></a>'
      : '<span class="adf-link"><img src="' + esc(img) + '" alt="' + esc(c.name) +
          '" loading="lazy" width="1080" height="720"></span>';
    el.innerHTML =
      '<div class="adf-head"><span class="adb-label">広告 PR</span>' +
        '<span class="adb-note">掲載は登録順です。順位・優劣を示すものではありません。' +
        '料金・治療内容は自由診療の目安です。最終的に公式サイト・カウンセリングでご確認ください。</span>' +
      '</div>' + media + lineCta(c);
    return el;
  }

  function buildBand(slot) {
    var head =
      '<div class="adb-head">' +
        '<span class="adb-label">広告 PR</span>' +
        '<span class="adb-note">掲載は登録順で、クリニックの優劣・順位を示すものではありません。' +
        '各院の情報は最終的に公式サイト・カウンセリングでご確認ください。</span>' +
      '</div>';
    var cards = CLINICS.map(clinicCard).join('');
    slot.className = 'ad-band';
    slot.setAttribute('role', 'complementary');
    slot.setAttribute('aria-label', '広告');
    slot.innerHTML = head + '<div class="adb-grid">' + cards + '</div>';
  }

  function buildRail(slot) {
    var head =
      '<div class="adr-head">' +
        '<span class="adb-label">広告 PR</span>' +
        '<span class="adb-note">掲載は登録順です。順位・優劣を示すものではありません。</span>' +
      '</div>';
    var cards = CLINICS.map(clinicCard).join('');
    var recruit =
      '<a class="adr-recruit" href="' + BASE + 'articles/partner-clinics.html">' +
        '<b>掲載クリニック募集中</b>' +
        '<span>この枠に貴院のご案内を掲載できます。</span>' +
      '</a>';
    slot.className = 'ad-rail';
    slot.setAttribute('role', 'complementary');
    slot.setAttribute('aria-label', '広告');
    slot.innerHTML = head + '<div class="adr-list">' + cards + recruit + '</div>';
  }

  /* レールがビューポートより高いと、上部固定では下端の広告が見切れる。
     その場合は「スクロールに連れて上がり、下端が画面内に入ったら固定」する
     スマートスティッキーに切り替える（CSS の sticky top を動的に調整）。 */
  function adjustRail(rail) {
    var TOP_GAP = 84;     /* ヘッダー下の余白＝通常時の固定位置 */
    var BOTTOM_GAP = 24;  /* 下端を画面の少し内側で止める余白 */
    if (getComputedStyle(rail).position !== 'sticky') {
      rail.style.top = '';   /* モバイル等で static のときは無効化 */
      return;
    }
    var vh = window.innerHeight;
    var rh = rail.offsetHeight;
    if (rh + TOP_GAP + BOTTOM_GAP <= vh) {
      rail.style.top = TOP_GAP + 'px';            /* 収まる：通常の上部固定 */
    } else {
      rail.style.top = (vh - rh - BOTTOM_GAP) + 'px'; /* 高い：下端固定で全体を閲覧可能に */
    }
  }

  function adjustAllRails() {
    document.querySelectorAll('.ad-rail').forEach(adjustRail);
  }

  function render() {
    /* 0) 特集バナー（広告PR）を本文・ホーム上部に挿入 */
    var fb = featureBannerEl();
    if (fb) {
      var fbHost = document.querySelector('.home-main') ||
                   document.querySelector('article.article');
      if (fbHost) fbHost.insertBefore(fb, fbHost.firstChild);
    }

    /* 1) 明示スロット（data-ad-slot を置いた場所）に描画 */
    document.querySelectorAll('[data-ad-slot]').forEach(buildBand);

    /* 1b) 右サイドの縦レール（data-ad-rail）に描画 */
    document.querySelectorAll('[data-ad-rail]').forEach(buildRail);

    /* 2) 記事ページは本文を2カラム化し、右側に縦レールを描画（ホームと同形）。
          ただし、すでに広告枠（.ad-grid）を持つページ
          （提携クリニック案内・ワンデイ治療ハブ）は二重掲載を避けてスキップ。 */
    if (inArticle && !document.querySelector('.ad-grid')) {
      var art = document.querySelector('article.article');
      if (art && art.parentNode && !document.querySelector('.article-layout')) {
        var layout = document.createElement('div');
        layout.className = 'article-layout';
        art.parentNode.insertBefore(layout, art);
        layout.appendChild(art);

        var aside = document.createElement('aside');
        aside.className = 'article-rail';
        aside.setAttribute('aria-label', '広告');
        var railSlot = document.createElement('div');
        aside.appendChild(railSlot);
        layout.appendChild(aside);

        buildRail(railSlot);
      }
    }

    /* 3) レール高さに応じて固定位置を調整（下端見切れ防止）。 */
    adjustAllRails();
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(adjustAllRails, 150);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
