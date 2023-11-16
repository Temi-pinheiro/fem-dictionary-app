import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader, SearchBar } from '../../components';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { getWord } from '../../queries';

export const WordPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const { data: word, isLoading } = useQuery<WordData[], any>({
    queryKey: ['definition', keyword],
    queryFn: async () => getWord(keyword),
    enabled: Boolean(keyword),
    refetchOnMount: true,
  });

  return (
    <>
      <Helmet>
        <link
          rel='icon'
          type='image/svg+xml'
          href='../../src/assets/favicon-32x32.png'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>{(word ? word : 'Dictionary') + ' | Temitope Pinheiro'}</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='py-10 px-12 md:p-20'>
          <div className='flex flex-col md:flex-row w-full gap-y-8 md:justify-between'>
            <SearchBar setSearch={setSearchParams} />
          </div>
        </div>
      )}
    </>
  );
};
