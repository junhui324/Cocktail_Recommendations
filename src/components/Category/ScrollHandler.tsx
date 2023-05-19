import React, { useEffect, useState } from 'react';

function ScrollHandler() {
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  useEffect(() => {
    console.log(scrollHeight);
  }, [scrollHeight]);

  useEffect(() => {
    const updateScrollHeight = () => {
      setScrollHeight(document.documentElement.scrollHeight);
    };

    window.addEventListener('scroll', updateScrollHeight);

    return () => {
      window.removeEventListener('scroll', updateScrollHeight);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scroll-button">
      <button onClick={scrollToTop}>↑</button>
      <button onClick={scrollToBottom}>↓</button>
    </div>
  );
}

export default ScrollHandler;
