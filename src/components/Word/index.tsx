import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Word = ({
  word,
  count,
  total,
}: {
  word: WordData;
  count: number;
  total: number;
}) => {
  const audioRef = useRef<any>(null);
  const getPhonetic = () => {
    if (word.phonetic) return word.phonetic;
    const selected = word.phonetics.find((ph) => ph.text)!;
    return selected?.text || '';
  };
  const getPronounciation = () => {
    const selected = word.phonetics.find((ph) => ph.audio)!;
    return selected?.audio || '';
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };
  return (
    <div className='flex flex-col h-full pb-10 '>
      <div className='flex items-center justify-between w-full'>
        <div className='flex flex-col'>
          <h1 className='text-[#2D2D2D] dark:text-white text-[32px] md:text-[64px] font-bold'>
            {total > 1 ? `${count + 1}).` : null}
            {word.word}
          </h1>
          <span className='text-lg md:text-2xl text-[#A445ED]'>
            {getPhonetic()}
          </span>
        </div>
        {getPronounciation() ? (
          <div>
            <audio ref={audioRef} src={getPronounciation()}></audio>
            <button
              onClick={togglePlay}
              className='w-12 h-12 md:h-[75px] md:w-[75px] rounded-full grid place-items-center bg-opacity-25 hover:bg-opacity-100 transition-opacity duration-200 bg-[#A445ED]'
            >
              {' '}
              <svg
                width='21'
                height='21'
                viewBox='0 0 21 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0 0V21L21 10.5L0 0Z'
                  fill='white'
                />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
      <div className='flex flex-col mt-8 md:mt-12 gap-y-8 md:gap-y-10'>
        {word.meanings.map((meaning) => (
          <div>
            <h2 className='font-bold flex text-zinc-800 dark:text-white items-center justify-between gap-x-6'>
              {meaning.partOfSpeech}
              <svg
                width='630'
                height='1'
                viewBox='0 0 630 1'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='630' height='1' fill='#E9E9E9' />
              </svg>
            </h2>
            <section className='mt-8 md:10'>
              <h5 className='text-base md:text-xl text-neutral-500'>Meaning</h5>
              <ul className='mt-4 md:mt-7 flex flex-col gap-y-3 md:pl-[22px]'>
                {meaning.definitions.map((definition, index) => (
                  <li
                    className='text-[15px] md:text-lg flex items-start gap-x-5'
                    key={index}
                  >
                    <span className='w-[5px] h-[5px] bg-purple-600 rounded-full shrink-0 mt-[10px]'></span>
                    <div className=' flex flex-col gap-y-3 '>
                      <p className='text-zinc-800 dark:text-white'>
                        {definition.definition}
                      </p>{' '}
                      {definition.example ? (
                        <p className='text-neutral-500'>
                          "{definition.example}"
                        </p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              {meaning.synonyms?.length ? (
                <p className='mt-6 md:mt-10 md:text-xl flex items-start gap-x-6 md:gap-x-10'>
                  <span className=' text-neutral-500'>Synonyms</span>
                  <ul className='flex flex-wrap gap-x-3 gap-y-1'>
                    {meaning.synonyms.map((synonym, index) => (
                      <li key={index} className='font-bold text-[#A445ED]'>
                        <Link to={`/?keyword=${synonym}`}>{synonym}</Link>{' '}
                      </li>
                    ))}
                  </ul>
                </p>
              ) : null}
              {meaning.antonyms?.length ? (
                <p className='mt-6 md:mt-10 md:text-xl flex items-start gap-x-6 md:gap-x-10'>
                  <span className=' text-neutral-500'>Antonyms</span>
                  <ul className='flex h-full flex-wrap gap-x-3 gap-y-1'>
                    {meaning.antonyms.map((antonym, index) => (
                      <li key={index} className='font-bold text-[#A445ED]'>
                        <Link to={`/?keyword=${antonym}`}>{antonym}</Link>{' '}
                      </li>
                    ))}
                  </ul>
                </p>
              ) : null}
            </section>
          </div>
        ))}
      </div>
      {word.sourceUrls[0] ? (
        <footer className='mt-6 mb:mt-10 border-t flex flex-col pt-5 text-sm md:flex-row md:items-center gap-x-3'>
          <span className=' text-neutral-500 max-md:underline underline-offset-2'>
            Source
          </span>
          <div className='flex items-center w-full gap-x-3'>
            <a
              href={word.sourceUrls[0]}
              target='_blank'
              className='max-md:underline underline-offset-2 text-zinc-800 dark:text-white'
            >
              {word.sourceUrls[0]}
            </a>
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M6.09091 4.29545C6.50512 4.29545 6.84091 3.95967 6.84091 3.54545C6.84091 3.13124 6.50512 2.79545 6.09091 2.79545V4.29545ZM1.42603 3.97148L1.95635 4.50182L1.95637 4.50181L1.42603 3.97148ZM1.42603 12.574L1.95638 12.0437L1.95637 12.0436L1.42603 12.574ZM11.2045 7.90909C11.2045 7.49488 10.8688 7.15909 10.4545 7.15909C10.0403 7.15909 9.70455 7.49488 9.70455 7.90909H11.2045ZM4.83331 8.10603C4.54041 8.39893 4.54041 8.8738 4.83331 9.16669C5.1262 9.45959 5.60107 9.45959 5.89397 9.16669L4.83331 8.10603ZM13.1667 1.89397C13.4596 1.60107 13.4596 1.1262 13.1667 0.833306C12.8738 0.540413 12.3989 0.540413 12.106 0.833306L13.1667 1.89397ZM12.6364 2.11364C13.0506 2.11364 13.3864 1.77785 13.3864 1.36364C13.3864 0.949423 13.0506 0.613636 12.6364 0.613636V2.11364ZM9 0.613636C8.58579 0.613636 8.25 0.949423 8.25 1.36364C8.25 1.77785 8.58579 2.11364 9 2.11364V0.613636ZM13.3864 1.36364C13.3864 0.949423 13.0506 0.613636 12.6364 0.613636C12.2221 0.613636 11.8864 0.949423 11.8864 1.36364H13.3864ZM11.8864 5C11.8864 5.41421 12.2221 5.75 12.6364 5.75C13.0506 5.75 13.3864 5.41421 13.3864 5H11.8864ZM6.09091 2.79545H2.45455V4.29545H6.09091V2.79545ZM2.45455 2.79545C1.86987 2.79545 1.30913 3.02771 0.895692 3.44116L1.95637 4.50181C2.08849 4.36968 2.26769 4.29545 2.45455 4.29545V2.79545ZM0.895706 3.44115C0.482259 3.85458 0.25 4.41532 0.25 5H1.75C1.75 4.81314 1.82423 4.63394 1.95635 4.50182L0.895706 3.44115ZM0.25 5V11.5455H1.75V5H0.25ZM0.25 11.5455C0.25 12.1301 0.482269 12.6908 0.895685 13.1043L1.95637 12.0436C1.82422 11.9115 1.75 11.7323 1.75 11.5455H0.25ZM0.895678 13.1043C1.30913 13.5178 1.86988 13.75 2.45455 13.75V12.25C2.26768 12.25 2.08849 12.1758 1.95638 12.0437L0.895678 13.1043ZM2.45455 13.75H9V12.25H2.45455V13.75ZM9 13.75C9.58466 13.75 10.1454 13.5177 10.5588 13.1043L9.49818 12.0436C9.36603 12.1758 9.18683 12.25 9 12.25V13.75ZM10.5588 13.1043C10.9723 12.6908 11.2045 12.1301 11.2045 11.5455H9.70455C9.70455 11.7323 9.63033 11.9115 9.49818 12.0436L10.5588 13.1043ZM11.2045 11.5455V7.90909H9.70455V11.5455H11.2045ZM5.89397 9.16669L13.1667 1.89397L12.106 0.833306L4.83331 8.10603L5.89397 9.16669ZM12.6364 0.613636H9V2.11364H12.6364V0.613636ZM11.8864 1.36364V5H13.3864V1.36364H11.8864Z'
                fill='#757575'
              />
            </svg>
          </div>
        </footer>
      ) : null}
    </div>
  );
};
