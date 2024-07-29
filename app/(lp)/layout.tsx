import Image from 'next/image'
import Link from 'next/link'
import Discord from '../../assets/icons/discord.svg'

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <nav className="py-4 border-b border-solid sticky top-0 left-0 right-0 z-50 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-12 max-sm:gap-1">
            <Link href="https://discord.gg/nU8C3tue">
              <Image
                src="/logo.png"
                width={80}
                height={80}
                alt="EasyStore"
                className="max-sm:w-[100px]"
              />
            </Link>

            <ul className="flex items-center gap-8 max-sm:gap-4">
              <li>
                <Link
                  href="https://discord.gg/nU8C3tue"
                  target="_blank"
                  className="text-gray-50 hover:scale-95 hover:text-opacity-80 transition-all text-base max-sm:text-lg"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-gray-50 hover:scale-95 hover:text-opacity-80 transition-all text-base max-sm:text-lg"
                >
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>{children}</main>

      <Link
        href="https://discord.gg/nU8C3tue"
        target="_blank"
        className="fixed right-[20px] bottom-[20px] flex items-center justify-center bg-primary w-[60px] h-[60px] rounded-full hover:scale-95 transition-all max-sm:w-[75px] max-sm:h-[75px] z-[99999]"
      >
        <Image
          src={Discord}
          alt="Discord Icon"
          width={24}
          height={24}
          className="max-sm:w-[33px] max-sm:h-[33px]"
        />
      </Link>
    </section>
  )
}
