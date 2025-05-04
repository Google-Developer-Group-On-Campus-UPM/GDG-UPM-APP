import React from "react";
import Image from "next/image";
import { useState } from "react";
import "../../../styles/carousel.css";
import { EmblaOptionsType } from "embla-carousel";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./CarouselArrowButton";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  options?: EmblaOptionsType;
  slides: Array<{
    title: string;
    date: string;
    description: string;
    image: string;
    link: string;
    dark_bg: boolean;
  }>;
};

const Carousel: React.FC<PropType> = (props) => {
  const { options, slides } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla relative max-w-full xl:w-[1280px] mx-auto overflow-hidden ">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex gap-[95px] bg-white">
          {slides.map((event, index) => (
            <div className="embla__slide grid grid-col-1" key={index}>
              <Image
                src={event.image}
                alt={event.title}
                width="1280"
                height="720"
                className="object-contain w-full row-start-1 col-start-1 overflow-hidden cursor-pointer z-10 sm:z-0"
                onClick={() => {
                  if (window.innerWidth < 640)
                    window.location.href = event.link;
                }}
              />
              <div className="sm:p-8 row-start-1 col-start-1 flex items-end justify-end pb-5 sm:pl-[64px]">
                <div className="w-full h-fit flex gap-[32px]">
                  <a
                    href={event.link}
                    className="z-10 flex bg-white px-[48px] py-[12px] border border-gray-400 rounded-[100px]"
                  >
                    <p className="text-[14px]">Details</p>
                  </a>
                  <p className="w-full flex text-center items-center sm:text-left font-bold sm:text-[24px] z-10 sm:z-0">
                    {event.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__buttons">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      </div>

      <div className="embla__buttons">
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  );
};

export default Carousel;
