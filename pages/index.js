import Header from "@/components/Header";
import Head from "next/head";
import fs from "fs/promises";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useI18N } from "@/context/i18n";

export default function Home({ latestComics }) {
  const { t } = useI18N();

  return (
    <>
      <Layout>
        <main>
          <h2 className="text-center p-1 font-black text-3xl">{t('LATEST_COMICS')}</h2>
          <section className="grid md:grid-cols-2 grid-cols-1 gap-4 max-w-6xl mx-2 lg:mx-auto">
            {latestComics.map(({ value }) => {
              return (
                <div className="mb-5 mt-5">
                  <Link key={value.id} href={`/comic/${value.id}`}>
                    <h3 className="text-center font-bold text-sm">
                      {value.title}
                    </h3>
                    <Image
                      layout="responsive"
                      width={300}
                      height={200}
                      src={value.img}
                      alt={value.alt}
                    />
                  </Link>
                </div>
              );
            })}
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir("./comics");
  // console.log(files);
  const latestComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, "utf-8");
    return JSON.parse(content);
  });

  const latestComics = await Promise.allSettled(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
