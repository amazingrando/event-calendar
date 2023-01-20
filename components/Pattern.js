import { useEffect } from 'react';

const Pattern = () => {
  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    const blocks = document.querySelectorAll('.pattern .block');
    const blocksArray = Array.from(blocks);
    const randomNumberOfBlocks = Math.floor(Math.random() * 11);

    let i = 0;

    while (i <= randomNumberOfBlocks) {
      const randomBlock = randomIntFromInterval(2, blocksArray.length);
      blocksArray[randomBlock].classList.add('fill-leafyGreen-dark');
      i += 1;
    }
  }, []);

  return (
    <svg
      width="2160"
      height="30"
      viewBox="0 0 2160 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pattern"
    >
      <g clipPath="url(#clip0_406_341)">
        <rect width="2160" height="30" className="fill-leafyGreen" />
        <rect width="30" height="30" className="block duration-700" />
        <rect x="1080" width="30" height="30" className="block duration-700" />
        <rect x="540" width="30" height="30" className="block duration-700" />
        <rect x="1620" width="30" height="30" className="block duration-700" />
        <rect x="30" width="30" height="30" className="block duration-700" />
        <rect x="1110" width="30" height="30" className="block duration-700" />
        <rect x="570" width="30" height="30" className="block duration-700" />
        <rect x="1650" width="30" height="30" className="block duration-700" />
        <rect x="60" width="30" height="30" className="block duration-700" />
        <rect x="1140" width="30" height="30" className="block duration-700" />
        <rect x="600" width="30" height="30" className="block duration-700" />
        <rect x="1680" width="30" height="30" className="block duration-700" />
        <rect x="90" width="30" height="30" className="block duration-700" />
        <rect x="1170" width="30" height="30" className="block duration-700" />
        <rect x="630" width="30" height="30" className="block duration-700" />
        <rect x="1710" width="30" height="30" className="block duration-700" />
        <rect x="120" width="30" height="30" className="block duration-700" />
        <rect x="1200" width="30" height="30" className="block duration-700" />
        <rect x="660" width="30" height="30" className="block duration-700" />
        <rect x="1740" width="30" height="30" className="block duration-700" />
        <rect x="150" width="30" height="30" className="block duration-700" />
        <rect x="1230" width="30" height="30" className="block duration-700" />
        <rect x="690" width="30" height="30" className="block duration-700" />
        <rect x="1770" width="30" height="30" className="block duration-700" />
        <rect x="180" width="30" height="30" className="block duration-700" />
        <rect x="1260" width="30" height="30" className="block duration-700" />
        <rect x="720" width="30" height="30" className="block duration-700" />
        <rect x="1800" width="30" height="30" className="block duration-700" />
        <rect x="210" width="30" height="30" className="block duration-700" />
        <rect x="1290" width="30" height="30" className="block duration-700" />
        <rect x="750" width="30" height="30" className="block duration-700" />
        <rect x="1830" width="30" height="30" className="block duration-700" />
        <rect x="240" width="30" height="30" className="block duration-700" />
        <rect x="1320" width="30" height="30" className="block duration-700" />
        <rect x="780" width="30" height="30" className="block duration-700" />
        <rect x="1860" width="30" height="30" className="block duration-700" />
        <rect x="270" width="30" height="30" className="block duration-700" />
        <rect x="1350" width="30" height="30" className="block duration-700" />
        <rect x="810" width="30" height="30" className="block duration-700" />
        <rect x="1890" width="30" height="30" className="block duration-700" />
        <rect x="300" width="30" height="30" className="block duration-700" />
        <rect x="1380" width="30" height="30" className="block duration-700" />
        <rect x="840" width="30" height="30" className="block duration-700" />
        <rect x="1920" width="30" height="30" className="block duration-700" />
        <rect x="330" width="30" height="30" className="block duration-700" />
        <rect x="1410" width="30" height="30" className="block duration-700" />
        <rect x="870" width="30" height="30" className="block duration-700" />
        <rect x="1950" width="30" height="30" className="block duration-700" />
        <rect x="360" width="30" height="30" className="block duration-700" />
        <rect x="1440" width="30" height="30" className="block duration-700" />
        <rect x="900" width="30" height="30" className="block duration-700" />
        <rect x="1980" width="30" height="30" className="block duration-700" />
        <rect x="390" width="30" height="30" className="block duration-700" />
        <rect x="1470" width="30" height="30" className="block duration-700" />
        <rect x="930" width="30" height="30" className="block duration-700" />
        <rect x="2010" width="30" height="30" className="block duration-700" />
        <rect x="420" width="30" height="30" className="block duration-700" />
        <rect x="1500" width="30" height="30" className="block duration-700" />
        <rect x="960" width="30" height="30" className="block duration-700" />
        <rect x="2040" width="30" height="30" className="block duration-700" />
        <rect x="450" width="30" height="30" className="block duration-700" />
        <rect x="1530" width="30" height="30" className="block duration-700" />
        <rect x="990" width="30" height="30" className="block duration-700" />
        <rect x="2070" width="30" height="30" className="block duration-700" />
        <rect x="480" width="30" height="30" className="block duration-700" />
        <rect x="1560" width="30" height="30" className="block duration-700" />
        <rect x="1020" width="30" height="30" className="block duration-700" />
        <rect x="2100" width="30" height="30" className="block duration-700" />
        <rect x="510" width="30" height="30" className="block duration-700" />
        <rect x="1590" width="30" height="30" className="block duration-700" />
        <rect x="1050" width="30" height="30" className="block duration-700" />
        <rect x="2130" width="30" height="30" className="block duration-700" />
      </g>
      <defs>
        <clipPath id="clip0_406_341">
          <rect width="2160" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Pattern;
