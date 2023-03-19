import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { search } from "@/services/search";
import Image from "next/image";
import Link from "next/link";

const Search = ({ query, results }) => {
  return (
    <>
      <Layout>
        <h1>Resultados para: <span className="font-bold">{query}</span></h1>
        {
            results.map( result => {
                return(
                    <Link href={`/comic/${result.id}`} key={result.id}>
                        <section className="flex bg-slate-300 hover:bg-slate-50 min-h-[35px]  max-h-[35px]">
                            <Image width='50' height='50' src={result.img} alt={result.alt} className='rounded-full'/>
                            <div>
                                <h2>{result.title}</h2>
                            </div>
                        </section>
                    </Link>
                )
            })
        }
      </Layout>
    </>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { results } = await search({query : q})

  return {
    props: {
      query: q,
      results
    },
  };
}
