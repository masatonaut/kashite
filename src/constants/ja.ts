export const JA = {
  // App
  APP_NAME: "KASHITE",
  APP_TAGLINE: "Lend it. Track it. Get it back.",
  APP_DESCRIPTION: "誰に何を貸した？を1画面で解決",

  // Header
  HEADER_TITLE: "KASHITE",

  // Empty state
  EMPTY_TITLE: "まだ何も貸してないよ",
  EMPTY_SUBTITLE: "+ボタンで記録を始めよう",
  EMPTY_DESCRIPTION: "友達に貸したモノを記録しよう",
  EMPTY_CTA: "最初の貸し出しを記録",

  // Loan card
  DAYS_UNIT: "日",
  LOAN_DAYS_AGO: "日前",
  LOAN_TODAY: "今日",
  LOAN_RETURNED: "返却済み",
  LOAN_SWIPE_HINT: "← スワイプで返却",

  // Add loan sheet
  ADD_TITLE: "貸し出しを記録",
  ADD_ITEM_LABEL: "なにを貸した？",
  ADD_ITEM_PLACEHOLDER: "例: 本、傘、お金",
  ADD_BORROWER_LABEL: "誰に貸した？",
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
} as const;

export type JAKey = keyof typeof JA;
