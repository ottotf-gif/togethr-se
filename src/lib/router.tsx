import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Tiny pathname-based router. Avoids pulling in react-router for a two-page
 * site while still giving us proper history navigation, scroll restoration,
 * and a context-driven `navigate()` helper for use anywhere in the tree.
 */

interface RouterCtx {
  path: string;
  navigate: (to: string) => void;
}

const Ctx = createContext<RouterCtx>({ path: '/', navigate: () => {} });

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname
  );

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (to: string) => {
    if (to === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo({ top: 0 });
  };

  return <Ctx.Provider value={{ path, navigate }}>{children}</Ctx.Provider>;
}

export function useRouter() {
  return useContext(Ctx);
}

/**
 * Drop-in replacement for <a> that uses the router for in-app links and
 * lets external/anchor links pass through naturally.
 */
export function Link({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { navigate } = useRouter();
  const isInternal = to.startsWith('/');

  const handle = (e: React.MouseEvent) => {
    if (!isInternal) return;
    e.preventDefault();
    onClick?.();
    navigate(to);
  };

  return (
    <a href={to} onClick={handle} className={className}>
      {children}
    </a>
  );
}
