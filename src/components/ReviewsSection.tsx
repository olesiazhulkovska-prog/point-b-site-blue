// @ts-nocheck
/* Секція «Що кажуть клієнти» — спільний компонент для головної та «Про компанію».
   Дані — з data/homeReviews.ts (одне джерело). Розмітка/класи/id без змін, щоб дизайн, анімації й адаптивність були ті самі. */
import { ReviewCard } from "./ReviewCard";
import { FadeInOnView } from "../shared/FadeInOnView";
import { HOME_REVIEWS } from "../data/homeReviews";

export const ReviewsSection = () => {
  const j = HOME_REVIEWS;
  return (
      <section
          id="reviews-section"
          className="theme-dark pb-sec relative z-30 py-20 sm:py-28 lg:py-40 text-[color:var(--ink)] overflow-hidden"
        >
          <div className="max-w-[1680px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
            <div className="mb-10 sm:mb-16 max-w-3xl pb-rv">
              <h2 className="pb-h2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[color:var(--ink)] font-namu uppercase sm:tracking-tight leading-[1.08]">
                <FadeInOnView>Що кажуть клієнти</FadeInOnView>
              </h2>
            </div>
            <div
              className={
                "max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:gap-4 max-md:-mx-5 max-md:px-5 max-md:scroll-px-5 max-md:pb-2 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              }
              style={{
                WebkitOverflowScrolling: "touch",
              }}
            >
              {Array.from({
                length: 3,
              }).map((A, U) => (
                <div
                  key={U}
                  className={
                    "max-md:snap-start max-md:shrink-0 max-md:w-[86%] flex [&>*]:w-full"
                  }
                >
                  <ReviewCard review={j[U]} />
                </div>
              ))}
            </div>
          </div>
        </section>
  );
};
