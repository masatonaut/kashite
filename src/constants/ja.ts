export const JA = {
  // App
  APP_NAME: "KASHITE",
  APP_TAGLINE: "Lend it. Track it. Get it back.",
  APP_DESCRIPTION: "誰に何を貸した？を1画面で解決",

  // Header
  HEADER_TITLE: "KASHITE",

  // Empty state
  EMPTY_TITLE: "まだ何も貸してないよ",
  EMPTY_DESCRIPTION: "友達に貸したモノを記録しよう",
  EMPTY_CTA: "最初の貸し出しを記録",

  // Loan card
  LOAN_DAYS_AGO: "日前",
  LOAN_TODAY: "今日",
  LOAN_RETURNED: "返却済み",
  LOAN_SWIPE_HINT: "← スワイプで返却",

  // Add loan sheet
  ADD_TITLE: "貸し出しを記録",
  ADD_ITEM_LABEL: "何を貸した？",
  ADD_ITEM_PLACEHOLDER: "例: 本、傘、お金",
  ADD_BORROWER_LABEL: "誰に？",
  ADD_BORROWER_PLACEHOLDER: "例: 田中さん",
  ADD_MEMO_LABEL: "メモ（任意）",
  ADD_MEMO_PLACEHOLDER: "例: 来週返してくれる予定",
  ADD_DATE_LABEL: "貸した日",
  ADD_SUBMIT: "記録する",
  ADD_CANCEL: "キャンセル",

  // Share
  SHARE_TITLE: "返却リクエストを送信",
  SHARE_MESSAGE: "返してね！",
  SHARE_BUTTON: "シェア",
  SHARE_LINE: "LINEで送る",
  SHARE_X: "Xでシェア",
  SHARE_COPY: "リンクをコピー",
  SHARE_COPIED: "コピーしました！",

  // Returned section
  RETURNED_SECTION_TITLE: "返却済み",
  RETURNED_SHOW: "表示",
  RETURNED_HIDE: "隠す",

  // Settings
  SETTINGS_TITLE: "設定",
  SETTINGS_THEME: "テーマ",
  SETTINGS_THEME_LIGHT: "ライト",
  SETTINGS_THEME_DARK: "ダーク",
  SETTINGS_THEME_SYSTEM: "システム",

  // Upgrade
  UPGRADE_TITLE: "Proにアップグレード",
  UPGRADE_DESCRIPTION: "無制限に記録できます",
  UPGRADE_FREE_LIMIT: "無料プラン: 10件まで",
  UPGRADE_PRO_PRICE: "¥300/月",
  UPGRADE_CTA: "Proにする",

  // Errors
  ERROR_GENERIC: "エラーが発生しました",
  ERROR_NETWORK: "ネットワークエラー",
  ERROR_NOT_FOUND: "見つかりませんでした",
  ERROR_UNAUTHORIZED: "ログインが必要です",
  ERROR_RATE_LIMIT: "しばらく待ってから再試行してください",

  // Validation
  VALIDATION_ITEM_REQUIRED: "アイテム名を入力してください",
  VALIDATION_BORROWER_REQUIRED: "相手の名前を入力してください",
  VALIDATION_ITEM_TOO_LONG: "アイテム名は100文字以内",
  VALIDATION_BORROWER_TOO_LONG: "名前は50文字以内",
  VALIDATION_MEMO_TOO_LONG: "メモは500文字以内",

  // Confirmation
  CONFIRM_DELETE: "この記録を削除しますか？",
  CONFIRM_RETURN: "返却済みにしますか？",
  CONFIRM_YES: "はい",
  CONFIRM_NO: "いいえ",

  // Success
  SUCCESS_ADDED: "記録しました",
  SUCCESS_RETURNED: "返却済みにしました",
  SUCCESS_DELETED: "削除しました",
  SUCCESS_SHARED: "シェアしました",

  // Loading
  LOADING: "読み込み中...",

  // Footer / Legal
  TERMS: "利用規約",
  PRIVACY: "プライバシーポリシー",
  TOKUSHOHO: "特定商取引法に基づく表記",

  // Upgrade Modal
  UPGRADE_MODAL_TITLE: "もっと記録したい？",
  UPGRADE_MODAL_DESCRIPTION: "無料プランは{count}件まで。Proで無制限に。",
  UPGRADE_FEATURE_UNLIMITED: "無制限に記録できる",
  UPGRADE_FEATURE_SUPPORT: "優先サポート",
  UPGRADE_CTA_MONTHLY: "¥300/月で始める",
  UPGRADE_CTA_YEARLY: "¥2,400/年で始める",
  UPGRADE_YEARLY_BADGE: "2ヶ月お得！",

  // Pricing Page
  PRICING_TITLE: "料金プラン",
  PRICING_SUBTITLE: "シンプルな料金体系。いつでも解約可能。",
  PRICING_FREE_NAME: "Free",
  PRICING_FREE_DESC: "個人で使うならこれで十分",
  PRICING_PRO_NAME: "Pro",
  PRICING_PRO_DESC: "たくさん貸し借りする人向け",
  PRICING_FOREVER: " / ずっと無料",
  PRICING_PER_MONTH: " / 月",
  PRICING_YEARLY_OPTION: "または ¥2,400/年（2ヶ月お得）",
  PRICING_RECOMMENDED: "おすすめ",
  PRICING_CURRENT_PLAN: "現在のプラン",
  PRICING_FREE_BUTTON: "Freeプラン",
  PRICING_CTA_MONTHLY: "¥300/月で始める",
  PRICING_CTA_YEARLY: "¥2,400/年で始める",
  PRICING_MANAGE: "プランを管理",
  PRICING_FEATURE_LOANS_10: "10件まで記録",
  PRICING_FEATURE_UNLIMITED: "無制限に記録",
  PRICING_FEATURE_BASIC: "基本機能",
  PRICING_FEATURE_SHARE: "シェア機能",
  PRICING_FEATURE_PRIORITY_SUPPORT: "優先サポート",
  PRICING_FEATURE_EARLY_ACCESS: "新機能の早期アクセス",

  // FAQ
  PRICING_FAQ_TITLE: "よくある質問",
  FAQ_CANCEL_Q: "解約はいつでもできますか？",
  FAQ_CANCEL_A: "はい、いつでも解約できます。次の請求サイクルから停止されます。",
  FAQ_PAYMENT_Q: "どの支払い方法が使えますか？",
  FAQ_PAYMENT_A: "クレジットカード（Visa、Mastercard、JCB、American Express）でお支払いいただけます。",
  FAQ_DOWNGRADE_Q: "Proから無料プランに戻すとデータはどうなりますか？",
  FAQ_DOWNGRADE_A: "データは保持されます。ただし、11件以上の記録がある場合、新規追加ができなくなります。",
  FAQ_REFUND_Q: "返金はできますか？",
  FAQ_REFUND_A: "サブスクリプション開始から7日以内であれば、全額返金いたします。",
} as const;

export type JAKey = keyof typeof JA;
