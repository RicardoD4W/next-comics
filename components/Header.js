import { useI18N } from "@/context/i18n";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

const Header = () => {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const { locale, locales } = useRouter()

  const { t } = useI18N();

  const getValue = () => searchRef.current?.value

  const handleChange = () => {
    const q = getValue();
    if (!q) return;
    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then(setResults);
  };

    const restOfLocales = locales.filter(l => l !== locale)
  

  return (
    <>
      <div className="bg-gray-800 max-h-[90px] min-h-[90px]">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium text-white p-2">Next.js</h1>
          <div className="flex">
            {
                restOfLocales.map(lan => <Link className="text-white p-3" href="/" locale={lan}>{lan}</Link>)
            }
          </div>
        </div>
        <nav className="">
          <ul className="flex justify-center gap-5 text-white">
            <li>
              <Link
                className="text-sm hover:text-lg hover:underline cursor-pointer hover:text-gray-400 transition-all"
                href="/"
              >
                {t('HOME')}
              </Link>
            </li>
            <li>
              <Link
                className="text-sm hover:text-lg hover:underline cursor-pointer hover:text-gray-400 transition-all"
                href="/About"
              >
                {t('ABOUT')}
              </Link>
            </li>
            <li className="relative">
              <input
                ref={searchRef}
                type="search"
                className="rounded-lg text-black border-gray-400 border border-1 "
                onChange={handleChange}
              />
              {Boolean(results.length) && (
                <div className="absolute top-8 left-0">
                  <ul className="">
                    <li>
                      <Link href={`/search?q=${getValue()}`}>
                        <p className=" text-sm text-black hover:bg-gray-100 bg-gray-300 font-bold">
                          {t('SEE')}
                          {results.length == 1
                            ? (t("RESULT"))
                            : ` ${results.length} ${t("RESULTS")}`}
                        </p>
                      </Link>
                    </li>

                    {results.map((result) => {
                      return (
                        <li key={result.id}>
                          <Link href={`/comic/${result.id}`}>
                            <p className=" text-sm text-black hover:bg-gray-100 bg-gray-300 font-semibold">
                              {result.title}
                            </p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
