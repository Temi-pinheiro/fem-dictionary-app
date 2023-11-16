import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { colorTheme, fontTheme } from '../../providers/ThemeProvider';
import { SelectInput } from '../../components';
import { Toggle } from '../../components/Toggle';

export const Main = () => {
  const { toggleTheme, theme } = colorTheme();

  const { font, toggleFont } = fontTheme();
  return (
    <HelmetProvider>
      <div className='w-full h-full bg-white dark:bg-[#050505]'>
        <main className='h-full w-full max-w-[736px] mx-auto overflow-y-clip md:overflow-scroll'>
          <nav className='p-6 md:px-0 md:pt-[58px] bg-white dark:bg-[#050505] md:pb-8 bg-transparent flex w-full items-center justify-between'>
            <svg
              width='34'
              height='38'
              viewBox='0 0 34 38'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M0.25 33C0.25 33.4142 0.585786 33.75 1 33.75C1.41421 33.75 1.75 33.4142 1.75 33H0.25ZM2.17157 2.17157L1.64124 1.64124L1.64124 1.64124L2.17157 2.17157ZM32.6485 1.35147L32.1181 1.88175L32.1182 1.88186L32.6485 1.35147ZM32.25 28.428C32.25 28.8422 32.5858 29.178 33 29.178C33.4142 29.178 33.75 28.8422 33.75 28.428H32.25ZM5 28.25C4.58579 28.25 4.25 28.5858 4.25 29C4.25 29.4142 4.58579 29.75 5 29.75V28.25ZM33 29.75C33.4142 29.75 33.75 29.4142 33.75 29C33.75 28.5858 33.4142 28.25 33 28.25V29.75ZM5 36.25C4.58579 36.25 4.25 36.5858 4.25 37C4.25 37.4142 4.58579 37.75 5 37.75V36.25ZM33 37.75C33.4142 37.75 33.75 37.4142 33.75 37C33.75 36.5858 33.4142 36.25 33 36.25V37.75ZM1.75 33V5H0.25V33H1.75ZM1.75 5C1.75 4.13804 2.09241 3.3114 2.7019 2.7019L1.64124 1.64124C0.750449 2.53204 0.25 3.74022 0.25 5H1.75ZM2.7019 2.7019C3.3114 2.09241 4.13802 1.75 5 1.75V0.25C3.74018 0.25 2.53204 0.750451 1.64124 1.64124L2.7019 2.7019ZM5 1.75H31.8V0.25H5V1.75ZM31.8 1.75C31.9194 1.75 32.0338 1.79742 32.1181 1.88175L33.1789 0.821187C32.8132 0.455444 32.3172 0.25 31.8 0.25V1.75ZM32.1182 1.88186C32.2026 1.96621 32.25 2.08062 32.25 2.2H33.75C33.75 1.68286 33.5446 1.18683 33.1788 0.821081L32.1182 1.88186ZM32.25 2.2V28.428H33.75V2.2H32.25ZM5 29.75H33V28.25H5V29.75ZM5 37.75H33V36.25H5V37.75Z'
                fill='#757575'
              />
              <path
                d='M5 37C3.9391 37 2.92172 36.5786 2.17157 35.8284C1.42143 35.0783 1 34.0609 1 33C1 31.9391 1.42143 30.9217 2.17157 30.1716C2.92172 29.4214 3.9391 29 5 29'
                stroke='#757575'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M11 9H23'
                stroke='#757575'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
            <div className='flex items-center gap-x-4 md:gap-x-6'>
              <SelectInput
                options={[
                  { label: 'Serif', value: 'serif' },
                  { label: 'Sans serif', value: 'sans-serif' },

                  { label: 'Mono', value: 'mono' },
                ]}
                defaultValue={font}
                name='fontStyle'
                onChange={(e) => toggleFont(e.target.value)}
              />
              <svg
                width='1'
                height='32'
                viewBox='0 0 1 32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='1' height='32' fill='#E9E9E9' />
              </svg>

              <div className='flex items-center gap-x-3'>
                <Toggle effect={toggleTheme} isOn={theme == 'dark'} />
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 22 22'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='stroke-[#757575] dark:stroke-[#A445ED]'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M1 10.449C0.998458 12.8283 1.80169 15.1383 3.27914 17.0033C4.75659 18.8683 6.82139 20.1788 9.13799 20.7218C11.4545 21.2647 13.8866 21.0082 16.039 19.994C18.1912 18.9797 19.9373 17.2673 20.9931 15.1352C11.5442 15.1352 6.85799 10.4479 6.85799 1C5.09842 1.87311 3.61767 3.22033 2.58266 4.88981C1.54765 6.5593 0.999502 8.48469 1 10.449Z'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
            </div>
          </nav>
          <Outlet />
        </main>
      </div>
    </HelmetProvider>
  );
};
