import { useState, useEffect, RefObject } from "react";

/**
 * 이미지의 load 상태를 파악하는 커스텀 hook
 * @param ref load 상태를 파악하고자 하는 대상
 * @returns 이미지 load 상태
 */
export function useImgLoadStatus(ref: RefObject<HTMLImageElement>): boolean {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const updateStatus = (img: HTMLImageElement) => {
      const isLoaded = img.complete && img.naturalHeight !== 0;

      setIsImgLoaded(isLoaded);
    };

    ref.current.addEventListener(
      "load",
      () => updateStatus(ref.current as HTMLImageElement),
      { once: true }
    );
  }, [ref]);

  return isImgLoaded;
}
