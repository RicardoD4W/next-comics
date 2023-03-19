import Header from "@/components/Header";
import Image from "next/image";
import { readFile, readdir, stat } from "fs/promises";
import Link from "next/link";
import { basename } from "path";
import Layout from "@/components/Layout";

const Comic = ({
  id,
  img,
  alt,
  title,
  nextId,
  prevId,
  hasNext,
  hasPrevious,
}) => {
  return (
    <>
      <Layout>
        <main className="flex flex-col gap-5 my-5 mx-auto w-10/12">
          <h2 className="uppercase font-semibold text-center min-h-[50px] max-h-[50px]">
            {title}
          </h2>
          <picture className="flex flex-col justify-center items-center min-h-[600px] max-h-[600px] overflow-y-scroll">
            <Image width={300} height={200} src={img} alt={alt} />
            <p className="p-1">{alt}</p>
          </picture>

          <div className="flex justify-between ">
            {hasPrevious && (
              <Link href="/comic/[id]" as={`/comic/${prevId}`}>
                Previous
              </Link>
            )}

            {hasNext && (
              <Link href="/comic/[id]" as={`/comic/${nextId}`}>
                Next
              </Link>
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Comic;

export async function getStaticPaths({ locales }) {
  const files = await readdir("./comics");
  let paths = [];

  locales.forEach(locale => {
    const pathsForLocale = files.map(file =>{
      const id = basename(file , '.json')
      return { params: {id}, locale}
    })

    paths = [...paths, ...pathsForLocale]
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf8");
  const comic = JSON.parse(content);

  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrevious = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId,
    },
  };
}
