'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredIndustries, moreIndustries } from './content';

const SWIPE_THRESHOLD = 48;
const CLICK_SLOP = 8;

export function IndustriesCarousel() {
  const count = featuredIndustries.length;
  const slides = [
    featuredIndustries[count - 1],
    ...featuredIndustries,
    featuredIndustries[0],
  ];
  const [index, setIndex] = useState(1);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [animate, setAnimate] = useState(true);
  const drag = useRef({ startX: 0, dx: 0 });
  const suppressClick = useRef(false);

  const active = index === 0 ? count - 1 : index === count + 1 ? 0 : index - 1;

  useEffect(() => {
    if (dragging) return;
    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((current) => current + 1);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [index, dragging]);

  useEffect(() => {
    if (animate) return;
    const frame = window.requestAnimationFrame(() => setAnimate(true));
    return () => window.cancelAnimationFrame(frame);
  }, [animate]);

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest('button')) return;
    drag.current = { startX: event.clientX, dx: 0 };
    suppressClick.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    const dx = event.clientX - drag.current.startX;
    drag.current.dx = dx;
    setOffset(dx);
  }

  function finishDrag() {
    if (!dragging) return;
    const dx = drag.current.dx;
    setDragging(false);
    setOffset(0);
    if (Math.abs(dx) > CLICK_SLOP) suppressClick.current = true;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    setAnimate(true);
    setIndex((current) => current + (dx < 0 ? 1 : -1));
  }

  function onClickCapture(event: React.MouseEvent) {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  }

  function onTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    if (index === 0) {
      setAnimate(false);
      setIndex(count);
    } else if (index === count + 1) {
      setAnimate(false);
      setIndex(1);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        className={`relative overflow-hidden rounded-xl select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onClickCapture={onClickCapture}
      >
        <div
          className="flex"
          onTransitionEnd={onTransitionEnd}
          style={{
            transform: `translateX(calc(-${index * 100}% + ${offset}px))`,
            transition: dragging || !animate ? 'none' : 'transform 550ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {slides.map((slide, slideIndex) => (
            <article key={`${slide.title}-${slideIndex}`} className="relative flex min-h-[28rem] w-full shrink-0">
              <Image
                src={slide.image}
                alt=""
                fill
                draggable={false}
                className="pointer-events-none object-cover"
                sizes="(min-width: 1024px) 1100px, 100vw"
                priority={slideIndex === 1}
              />
              <div className="relative z-10 flex w-full max-w-xl flex-col justify-center self-stretch bg-brand-700/80 p-8 pb-16 text-white md:w-[46%] md:p-10 md:pb-16">
                <h3 className="font-heading text-2xl font-semibold">{slide.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/95">{slide.body}</p>
                <Link
                  href={slide.href}
                  draggable={false}
                  className="mt-6 w-fit cursor-pointer text-sm font-semibold tracking-wide text-white uppercase no-underline"
                >
                  Learn More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="absolute bottom-8 left-8 z-10 flex gap-2 md:left-10" role="tablist" aria-label="Featured industries">
          {featuredIndustries.map((industry, dotIndex) => (
            <button
              key={industry.title}
              type="button"
              role="tab"
              aria-selected={dotIndex === active}
              aria-label={industry.title}
              className={`size-2.5 cursor-pointer rounded-full ${dotIndex === active ? 'bg-white' : 'bg-white/45'}`}
              onClick={() => {
                setAnimate(true);
                setIndex(dotIndex + 1);
              }}
            />
          ))}
        </div>
      </div>

      <ul className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
        {moreIndustries.map((industry) => (
          <li key={industry.title}>
            <Link href={industry.href} className="group relative block h-40 overflow-hidden rounded-xl no-underline">
              <Image src={industry.image} alt="" fill className="object-cover transition duration-700 ease-out group-hover:scale-105" sizes="280px" />
              <span className="absolute inset-0 bg-brand-700/55 transition group-hover:bg-brand-700/70" />
              <span className="relative flex h-full flex-col justify-end p-4 text-white">
                <span className="font-heading text-lg font-semibold">{industry.title}</span>
                <span className="mt-1 text-xs font-semibold tracking-wide uppercase">Learn More →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
