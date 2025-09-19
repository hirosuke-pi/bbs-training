"use client";

type ThreadPageProps = {
  renderHeader: () => React.ReactNode;
  renderNavigation: () => React.ReactNode;
  renderFooter: () => React.ReactNode;
  children: React.ReactNode;
};

export default function ThreadPageLayout({
  renderHeader,
  renderNavigation,
  renderFooter,
  children,
}: ThreadPageProps) {
  return (
    <div className="h-screen w-screen bg-neutral-100 text-neutral-900 flex flex-col overflow-hidden md:grid md:grid-rows-[48px_1fr_48px] md:grid-cols-[1fr_400px]">
      {/* ヘッダー: モバイル/PC 共通先頭 */}
      <header className="order-1 h-12 bg-teal-600 text-white flex items-center px-4 font-semibold text-sm md:text-base shadow md:row-start-1 md:col-span-full">
        {renderHeader()}
      </header>
      {/* モバイルでは非表示 / md以上で左メイン (スレッド可視領域) */}
      <div className="hidden md:block relative overflow-hidden md:row-start-2 md:col-start-1">
        {children}
      </div>
      {/* ナビゲーション+投稿リスト: モバイルでは中央可変領域（flex-1） */}
      <div className="order-2 flex-1 overflow-hidden md:row-start-2 md:row-span-2 md:col-start-2">
        {renderNavigation()}
      </div>
      {/* フッター: モバイルでは最後、md以上では左下 */}
      <footer className="order-3 md:order-none md:row-start-3 md:col-start-1">
        {renderFooter()}
      </footer>
    </div>
  );
}
