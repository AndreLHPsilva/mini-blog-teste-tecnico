import { Icon } from "@iconify/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  const { data: session } = useSession();

  const activeAsPath = router.asPath;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-around items-center py-3 bg-gray-800 text-white">
        <Link href="/">
          <Icon
            icon="game-icons:secret-book"
            color="#e5e7eb"
            width={40}
            className="cursor-pointer transition-all hover:scale-95"
          />
        </Link>
        <nav>
          <ul className="flex gap-5">
            <li className="cursor-pointer transition-all duration-300 hover:scale-95">
              <Link
                href="/"
                className={`sm:text-base text-sm ${
                  activeAsPath == "/" && "border-b-2"
                }`}
              >
                Home
              </Link>
            </li>
            {!session && (
              <li className="cursor-pointer transition-all duration-300 hover:scale-95">
                <Link
                  href="/cadastrar"
                  className={`sm:text-base text-sm ${
                    activeAsPath.startsWith("/cadastrar") && "border-b-2"
                  }`}
                >
                  Cadastrar
                </Link>
              </li>
            )}
            <li className="cursor-pointer transition-all duration-300 hover:scale-95">
              {session ? (
                <span onClick={signOut}>Sair</span>
              ) : (
                <Link
                  href="/entrar"
                  className={`sm:text-base text-sm ${
                    activeAsPath.startsWith("/entrar") && "border-b-2"
                  }`}
                >
                  Entrar
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {children}

      <footer className="bg-gray-800 mt-20 py-10">
        <section className="w-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center text-gray-100 sm:text-base text-sm">
            <h2>© {new Date().getFullYear()}</h2>
            <span>Todos os direitos reservados</span>
          </div>
        </section>
      </footer>
    </div>
  );
}
