import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import '../../../styles/carousel.css'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './CarouselArrowButton'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'




type PropType = {
  options?: EmblaOptionsType
  slides: Array<{
    title: string
    date: string
    description: string
    image: string
    link: string
    dark_bg: boolean
  }>
}

const Carousel: React.FC<PropType> = (props) => {
  const { options, slides } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="embla relative max-w-full xl:w-[1280px] mx-auto overflow-hidden ">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container relative">
          {slides.map((event, index) => (
            <div className="embla__slide grid grid-col-1" key={index}>
              <Image 
                src={event.image} 
                alt={event.title} 
                width='1280' 
                height='720' 
                className="object-contain w-full row-start-1 col-start-1 overflow-hidden cursor-pointer z-10 sm:z-0"
                onClick={() => {
                  if (window.innerWidth < 640) window.location.href = event.link;
                }}
              />
              <div className="sm:pl-12 sm:pb-4 row-start-1 col-start-1 flex flex-grow-0 items-end">
                <Link href={event.link} className="flex-grow-0 hidden sm:inline">
                  <div className="p-4 pl-8 pr-8 bg-white rounded-3xl font-bold text-sm leading-5 relative z-10">Details</div>
                </Link>
                <h3 className="pb-2 sm:pl-8 w-full flex-grow-0 text-center sm:text-left font-bold sm:text-2xl inline z-10 sm:z-0">{event.title}</h3>
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
  )
}

export default Carousel
