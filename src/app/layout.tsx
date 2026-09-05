import { APP_CONFIG } from "@/shared/data/constants";

export interface RootLayoutProps {
  children: unknown;
}

export function RootLayout({ children }: RootLayoutProps) {
  return {
    type: "html",
    props: {
      lang: "en",
      children: {
        header: {
          title: APP_CONFIG.name,
          company: APP_CONFIG.company,
        },
        main: children,
      },
    },
  };
}
