import { useEmblaCarousel } from "embla-carousel/react";
import { useState, useEffect, useCallback } from "react";
import PaginationButton from "./Pagination";
import { useCarouselStyle } from "./Carousel.style";

const PARALLAX_FACTOR = 0.6;
const Carousel = () => {
  const classes = useCarouselStyle();
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [parallaxValues, setParallaxValues] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla, setSelectedIndex]);

  const onScroll = useCallback(() => {
    if (!embla) return;

    const engine = embla.dangerouslyGetEngine();
    const scrollProgress = embla.scrollProgress();

    const styles = embla.scrollSnapList().map((scrollSnap, index) => {
      if (!embla.slidesInView().includes(index)) return 0;
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.getTarget();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget * (-1 / PARALLAX_FACTOR) * 100;
    });
    setParallaxValues(styles);
  }, [embla, setParallaxValues]);

  useEffect(() => {
    if (!embla) return;
    onScroll();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("scroll", onScroll);
    embla.on("resize", onScroll);
    embla.on("select", onSelect);
  }, [embla, onScroll, onSelect]);

  const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [
    embla,
  ]);

  return (
    <>
      <div className={classes.embla}>
        <div ref={viewportRef} className={classes.viewport}>
          <div className={classes.container}>
            {[0, 1, 2].map((index) => (
              <div key={index} className={classes.slide}>
                <div className={classes.slideInner}>
                  <div
                    className={classes.slideParallax}
                    style={{
                      transform: `translateX(${parallaxValues[index]}%)`,
                    }}
                  >
                    <img
                      alt="A cool cat."
                      className={classes.slideImg}
                      src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.dots}>
        {scrollSnaps.map((_, index) => (
          <PaginationButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  );
};

export default Carousel;
