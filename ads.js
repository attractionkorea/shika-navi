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
      url: '' /* 例: 'https://example.com/' を設定するとリンクが有効化されます */
    },
    {
      name: 'セラミック歯科',
      tag: '審美・セラミック',
      area: 'ソウル市〇〇区（要記載）',
      desc: 'セラミック・ラミネートなど短期完了メニュー。',
      img: 'korea-ceramic-treatment.jpg',
      url: ''
    },
    {
      name: 'バノバギ',
      tag: '審美・総合',
      area: '（要記載）',
      desc: '審美・総合的な治療メニューをご案内。',
      img: 'clinic-interior.jpg',
      url: ''
    }
  ];

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m];
    });
  }

  function clinicCard(c) {
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
    return '<span class="adb-card adb-card--soon">' + inner +
      '<span class="adb-cta adb-cta--soon">リンク準備中</span></span>';
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

  function render() {
    /* 1) 明示スロット（data-ad-slot を置いた場所）に描画 */
    document.querySelectorAll('[data-ad-slot]').forEach(buildBand);

    /* 2) 記事本文には自動でバナーを1枠挿入。
          ただし、すでに広告枠（.ad-grid）を持つページ
          （提携クリニック案内・ワンデイ治療ハブ）は二重掲載を避けてスキップ。 */
    if (inArticle && !document.querySelector('.ad-grid')) {
      var art = document.querySelector('article.article');
      if (art && !art.querySelector('.ad-band')) {
        var slot = document.createElement('div');
        var cta = art.querySelector('.cta');
        if (cta && cta.parentNode === art) {
          art.insertBefore(slot, cta);
        } else {
          art.appendChild(slot);
        }
        buildBand(slot);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
