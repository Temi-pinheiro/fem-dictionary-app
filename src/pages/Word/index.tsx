import { useQuery } from '@tanstack/react-query';
import { Loader, SearchBar } from '../../components';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { getWord } from '../../queries';
import { Word } from '../../components/Word';

export const WordPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const { data: words, isLoading } = useQuery<WordData[], any>({
    queryKey: ['definition', keyword],
    queryFn: async () => getWord(keyword),
    enabled: Boolean(keyword),
    refetchOnMount: true,
    retry: 0,
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
        <title>
          {(words ? keyword.toUpperCase() : 'Dictionary') +
            ' | Temitope Pinheiro'}
        </title>
      </Helmet>
      <div className='py-6 md:py-10 px-6 md:px-0 w-full h-full overflow-y-clip'>
        <div className='flex flex-col md:flex-row w-full gap-y-8 md:justify-between'>
          <SearchBar
            keyword={keyword}
            setSearch={(v: string) => setSearchParams({ keyword: v })}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : !keyword || !words ? (
          <div className='flex flex-col items-center h-full mt-[132px]'>
            <h4 className='text-[64px]'>{!keyword ? '🔍' : '😕'}</h4>
            <span className='text-xl font-bold text-zinc-800 dark:text-white mt-11 text-center'>
              {!keyword ? 'Please search for a word' : 'No Definitions Found'}
            </span>
            <p className='text-lg text-[#757575] mt-6 text-center'>
              {!keyword
                ? 'Please search for what you need a definition for'
                : "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."}
            </p>
          </div>
        ) : (
          <div className='w-full h-full overflow-scroll'>
            {words?.map((word, index) => (
              <Word key={index} word={word} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
