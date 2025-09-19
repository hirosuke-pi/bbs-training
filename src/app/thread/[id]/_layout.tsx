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
    <div className="h-screen w-screen bg-neutral-100 text-neutral-900 grid grid-rows-[48px_1fr_48px] md:grid-cols-[1fr_400px] overflow-hidden">
      {/* ヘッダー (全幅) */}
      <header className="row-start-1 col-span-full h-12 bg-teal-600 text-white flex items-center px-4 font-semibold text-sm md:text-base shadow">
        {renderHeader()}
      </header>
      {/* 左メイン領域 */}
      <div className="row-start-2 col-start-1 hidden md:block relative">
        {children}
      </div>
      {/* 右: 投稿リスト + 入力フォーム (フッター行まで縦に伸長) */}
      <div className="row-start-2 row-span-2 md:col-start-2">
        {renderNavigation()}
      </div>
      {/* フッター (左側のみに配置) */}
      <footer className="row-start-3 col-start-1">{renderFooter()}</footer>
    </div>
  );
}
