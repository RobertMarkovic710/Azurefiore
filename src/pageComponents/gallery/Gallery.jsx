import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Gallery.css";

const litterLoaders = import.meta.glob(
  "../../assets/gallery/litter/*.{jpg,jpeg,png,webp,avif}"
);

const parentLoaders = import.meta.glob(
  "../../assets/gallery/azurefiore_cats/*.{jpg,jpeg,png,webp,avif}"
);

const fileNameSorter = new Intl.Collator("hr", {
  numeric: true,
  sensitivity: "base",
});

async function loadImages(loaders, group, altPrefix) {
  const entries = Object.entries(loaders).sort(([firstPath], [secondPath]) =>
    fileNameSorter.compare(firstPath, secondPath)
  );

  return Promise.all(
    entries.map(async ([path, loadImage], index) => {
      const imageModule = await loadImage();

      return {
        id: `${group}-${path}`,
        src: imageModule.default ?? imageModule,
        alt: `${altPrefix} ${index + 1}`,
      };
    })
  );
}

function GalleryImage({ image, index, onOpen }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const cardShape =
    index % 5 === 0 ? "wide" : index % 3 === 0 ? "tall" : "standard";

  return (
    <button
      type="button"
      className={`gallery-card gallery-card--${cardShape} ${isLoaded ? "is-loaded" : ""
        }`}
      onClick={(event) => onOpen(index, event.currentTarget)}
      aria-label={`Otvori fotografiju: ${image.alt}`}
    >
      <span className="gallery-card-placeholder" aria-hidden="true" />

      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />

      <span className="gallery-card-shine" aria-hidden="true" />
    </button>
  );
}

function GalleryCollection({
  eyebrow,
  title,
  description,
  images,
  isLoading,
  onOpen,
}) {
  const scrollerRef = useRef(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const updateScrollControls = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollEnd = scroller.scrollWidth - scroller.clientWidth;

    setCanScrollBack(scroller.scrollLeft > 8);
    setCanScrollForward(scroller.scrollLeft < scrollEnd - 8);
  }, []);

  const scrollCollection = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * Math.max(scroller.clientWidth * 0.78, 320),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollControls();

    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(updateScrollControls);
      resizeObserver.observe(scroller);

      return () => resizeObserver.disconnect();
    }

    window.addEventListener("resize", updateScrollControls);
    return () => window.removeEventListener("resize", updateScrollControls);
  }, [images.length, isLoading, updateScrollControls]);

  return (
    <article className="gallery-collection">
      <div className="gallery-collection-header">
        <div>
          <span className="gallery-collection-eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div
          className="gallery-controls"
          aria-label={`Kontrole galerije: ${title}`}
        >
          <button
            type="button"
            onClick={() => scrollCollection(-1)}
            disabled={!canScrollBack}
            aria-label="Prikaži prethodne fotografije"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollCollection(1)}
            disabled={!canScrollForward}
            aria-label="Prikaži sljedeće fotografije"
          >
            →
          </button>
        </div>
      </div>

      <div className="gallery-viewport">
        <div
          ref={scrollerRef}
          className="gallery-scroller"
          onScroll={updateScrollControls}
          aria-busy={isLoading}
        >
          {isLoading
            ? Array.from({ length: 5 }, (_, index) => (
              <div
                className={`gallery-skeleton ${index === 0 ? "gallery-skeleton--wide" : ""
                  }`}
                key={index}
                aria-hidden="true"
              />
            ))
            : images.map((image, index) => (
              <GalleryImage
                image={image}
                index={index}
                onOpen={onOpen}
                key={image.id}
              />
            ))}
        </div>
      </div>

      <p className="gallery-swipe-hint">
        Povuci za pregled <span aria-hidden="true">↔</span>
      </p>
    </article>
  );
}

function GalleryLightbox({
  activeImage,
  hasMultipleImages,
  onClose,
  onPrevious,
  onNext,
  onTouchStart,
  onTouchEnd,
  closeButtonRef,
}) {
  if (!activeImage) return null;

  return createPortal(
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Uvećani prikaz fotografije"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="gallery-lightbox-close"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Zatvori galeriju"
      >
        ×
      </button>

      {hasMultipleImages && (
        <button
          type="button"
          className="gallery-lightbox-arrow gallery-lightbox-arrow--left"
          onClick={(event) => {
            event.stopPropagation();
            onPrevious();
          }}
          aria-label="Prethodna fotografija"
        >
          ←
        </button>
      )}

      <div
        className="gallery-lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        <img src={activeImage.src} alt={activeImage.alt} decoding="async" />
      </div>

      {hasMultipleImages && (
        <button
          type="button"
          className="gallery-lightbox-arrow gallery-lightbox-arrow--right"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Sljedeća fotografija"
        >
          →
        </button>
      )}
    </div>,
    document.body
  );
}

export default function Gallery() {
  const sectionRef = useRef(null);
  const touchStartX = useRef(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);
  const lockedScrollYRef = useRef(0);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [litter, setLitter] = useState([]);
  const [parents, setParents] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldLoad(true);
        observer.disconnect();
      },
      {
        rootMargin: "700px 0px",
        threshold: 0.01,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || hasLoaded) return undefined;

    let isCancelled = false;

    async function hydrateGallery() {
      setIsLoading(true);
      setLoadError(false);

      try {
        const [loadedLitter, loadedParents] = await Promise.all([
          loadImages(litterLoaders, "litter", "Azurefiore Ragdoll mačić"),
          loadImages(
            parentLoaders,
            "parents",
            "Azurefiore odrasla Ragdoll mačka"
          ),
        ]);

        if (isCancelled) return;

        setLitter(loadedLitter);
        setParents(loadedParents);
        setHasLoaded(true);
      } catch (error) {
        if (!isCancelled) {
          console.error("Galerija se nije mogla učitati:", error);
          setLoadError(true);
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    hydrateGallery();

    return () => {
      isCancelled = true;
    };
  }, [shouldLoad, hasLoaded, loadAttempt]);

  const activeImages = selected?.group === "litter" ? litter : parents;
  const activeImage = selected ? activeImages[selected.index] : null;
  const isModalOpen = Boolean(activeImage);

  const openImage = (group, index, triggerElement) => {
    lastTriggerRef.current = triggerElement;
    setSelected({ group, index });
  };

  const closeModal = useCallback(() => {
    setSelected(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setSelected((current) => {
      if (!current) return current;

      const images = current.group === "litter" ? litter : parents;
      if (!images.length) return current;

      return {
        ...current,
        index: current.index === 0 ? images.length - 1 : current.index - 1,
      };
    });
  }, [litter, parents]);

  const showNextImage = useCallback(() => {
    setSelected((current) => {
      if (!current) return current;

      const images = current.group === "litter" ? litter : parents;
      if (!images.length) return current;

      return {
        ...current,
        index: (current.index + 1) % images.length,
      };
    });
  }, [litter, parents]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const body = document.body;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    lockedScrollYRef.current = scrollY;

    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);

      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.left = previousStyles.left;
      body.style.right = previousStyles.right;
      body.style.width = previousStyles.width;
      body.style.overflow = previousStyles.overflow;
      body.style.paddingRight = previousStyles.paddingRight;

      const html = document.documentElement;
      const previousScrollBehavior = html.style.scrollBehavior;

      html.style.scrollBehavior = "auto";

      window.scrollTo(0, lockedScrollYRef.current);

      window.requestAnimationFrame(() => {
        html.style.scrollBehavior = previousScrollBehavior;
        lastTriggerRef.current?.focus({ preventScroll: true });
      });
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal, showNextImage, showPreviousImage]);

  useEffect(() => {
    if (!selected || activeImages.length < 2) return;

    const nextIndex = (selected.index + 1) % activeImages.length;
    const previousIndex =
      selected.index === 0 ? activeImages.length - 1 : selected.index - 1;

    [activeImages[nextIndex], activeImages[previousIndex]].forEach((image) => {
      const preload = new Image();
      preload.src = image.src;
    });
  }, [selected, activeImages]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 55 || activeImages.length < 2) return;

    if (distance > 0) showPreviousImage();
    else showNextImage();
  };

  return (
    <>
      <section className="gallery" id="gallery" ref={sectionRef}>
        <div
          className="gallery-background-orb gallery-background-orb--one"
          aria-hidden="true"
        />
        <div
          className="gallery-background-orb gallery-background-orb--two"
          aria-hidden="true"
        />

        <div className="gallery-container">
          <header className="gallery-header">
            <span className="gallery-eyebrow">Azurefiore kolekcija</span>

            <h2>
              Trenutci koji pokazuju <span>njihovu pravu narav.</span>
            </h2>

            <p>
              Upoznajte naše mačiće i njihove roditelje kroz pažljivo odabrane
              fotografije iz svakodnevnog života u uzgajivačnici.
            </p>
          </header>

          {loadError ? (
            <div className="gallery-error" role="status">
              <strong>Fotografije se trenutačno nisu uspjele učitati.</strong>
              <button
                type="button"
                onClick={() => {
                  setLoadError(false);
                  setHasLoaded(false);
                  setLoadAttempt((current) => current + 1);
                }}
              >
                Pokušaj ponovno
              </button>
            </div>
          ) : (
            <div className="gallery-collections">
              <GalleryCollection
                eyebrow="Najmlađi članovi"
                title="Naši mačići"
                description="Nježni, znatiželjni i od prvog dana naviknuti na blizinu ljudi."
                images={litter}
                isLoading={!hasLoaded || isLoading}
                onOpen={(index, triggerElement) =>
                  openImage("litter", index, triggerElement)
                }
              />

              <GalleryCollection
                eyebrow="Srce uzgoja"
                title="Gloria, Quinn Juliet i Gregorio"
                description="Roditelji naših mačića — stabilnog karaktera, raskošnog izgleda i provjerenog zdravlja."
                images={parents}
                isLoading={!hasLoaded || isLoading}
                onOpen={(index, triggerElement) =>
                  openImage("parents", index, triggerElement)
                }
              />
            </div>
          )}
        </div>
      </section>

      <GalleryLightbox
        activeImage={activeImage}
        hasMultipleImages={activeImages.length > 1}
        onClose={closeModal}
        onPrevious={showPreviousImage}
        onNext={showNextImage}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        closeButtonRef={closeButtonRef}
      />
    </>
  );
}
