"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

interface TabItem {
  href: string;
  icon: string;
  iconActive: string;
  label: string;
}

const tabs: TabItem[] = [
  { href: "/", icon: "/images/tab_home.webp", iconActive: "/images/tab_home_hint.webp", label: "首页" },
  { href: "/filter", icon: "/images/tab_filter.webp", iconActive: "/images/tab_filter_hint.webp", label: "筛选" },
  { href: "/discover", icon: "/images/tab_discover.webp", iconActive: "/images/tab_discover_hint.webp", label: "发现" },
  { href: "/my", icon: "/images/tab_my.webp", iconActive: "/images/tab_my_hint.webp", label: "我的" },
];

export function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-tab-bar pb-safe">
      <div className="mx-auto flex h-14 max-w-lg items-stretch">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <button
              key={tab.href}
              onClick={() => router.push(tab.href)}
              className={clsx(
                "flex flex-1 flex-col items-center justify-center gap-[6px] pt-[6px]",
                active ? "text-secondary" : "text-text-tertiary",
              )}
            >
              <div className="relative h-6 w-6">
                {/* Inactive icon */}
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="absolute inset-0 transition-transform"
                  style={{
                    transform: active ? "scale(0)" : "scale(1)",
                    transitionDuration: active ? "100ms" : "280ms",
                    transitionTimingFunction: active
                      ? "ease-out"
                      : "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                />
                {/* Active icon */}
                <Image
                  src={tab.iconActive}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="absolute inset-0 transition-transform"
                  style={{
                    transform: active ? "scale(1)" : "scale(0)",
                    transitionDuration: active ? "280ms" : "100ms",
                    transitionTimingFunction: active
                      ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                      : "ease-out",
                  }}
                />
              </div>
              <span className="text-[11px] font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
