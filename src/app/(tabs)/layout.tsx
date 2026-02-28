import { BottomTabBar } from "@/components/common/bottom-tab-bar";

interface Props {
  children: React.ReactNode;
}

export default function TabsLayout({ children }: Props) {
  return (
    <div className="min-h-screen pb-16">
      {children}
      <BottomTabBar />
    </div>
  );
}
