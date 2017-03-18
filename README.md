# 計算ドリルジェネレータ for Google Document
Google Documentで計算ドリルを作るGAS

# セットアップ
1. 新規Google Documentを開いて、メニューバーの　[ツール]　>　[スクリプトエディタ]　と開く
1. メニューバーの　[ファイル]　>　[新規作成]　>　[スクリプトファイル] で `calc.gs` をつくり、 `calc.gs` の中身をコピペ
1. メニューバーの　[ファイル]　>　[新規作成]　>　[HTMLファイル] で `sidebar.html` をつくり、 `sidebar.html` の中身をコピペ
1. Google Documentに戻って再読込

# 実行
1. サイドバーでモード、生成したいページ数を入力して `作成` を実行（九九ならば1桁と1桁のかけ算）
1. しばらく待つ（実行時間はマシンスペック次第です。GASは結構遅いイメージ）
1. 印刷する
