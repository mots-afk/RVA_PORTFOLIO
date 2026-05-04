document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const menuDrawer = document.getElementById("siteMenu");
  const menuLinks = document.querySelectorAll(".menu-links a");
  const revealItems = document.querySelectorAll(".reveal");
  const filterButtons = document.querySelectorAll(".filter-button");
  const artCards = document.querySelectorAll(".art-card");
  const artFrames = document.querySelectorAll(".art-frame");
  const filterStatus = document.getElementById("filterStatus");
  let closeMenuTimer = null;

  const clearCloseMenuTimer = () => {
    if (closeMenuTimer === null) {
      return;
    }

    window.clearTimeout(closeMenuTimer);
    closeMenuTimer = null;
  };

  const closeMenu = () => {
    if (!menuDrawer || menuDrawer.hidden) {
      return;
    }

    clearCloseMenuTimer();
    menuDrawer.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    closeMenuTimer = window.setTimeout(() => {
      menuDrawer.hidden = true;
      menuToggle?.setAttribute("aria-expanded", "false");
      closeMenuTimer = null;
    }, 240);
  };

  const openMenu = () => {
    if (!menuDrawer) {
      return;
    }

    clearCloseMenuTimer();
    menuDrawer.hidden = false;
    document.body.classList.add("menu-open");

    window.requestAnimationFrame(() => {
      menuDrawer.classList.add("is-open");
      menuToggle?.setAttribute("aria-expanded", "true");
    });
  };

  menuToggle?.addEventListener("click", () => {
    if (!menuDrawer) {
      return;
    }

    if (menuDrawer.hidden) {
      openMenu();
      return;
    }

    closeMenu();
  });

  menuDrawer?.addEventListener("click", (event) => {
    if (event.target === menuDrawer) {
      closeMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  artFrames.forEach((frame) => {
    const setHovered = (value) => {
      frame.classList.toggle("is-hovered", value);
    };

    frame.addEventListener("mouseenter", () => setHovered(true));
    frame.addEventListener("mouseleave", () => setHovered(false));
    frame.addEventListener("pointerenter", () => setHovered(true));
    frame.addEventListener("pointerleave", () => setHovered(false));
    frame.addEventListener("focus", () => setHovered(true));
    frame.addEventListener("blur", () => setHovered(false));
    frame.addEventListener("pointerdown", () => setHovered(true));
    frame.addEventListener("pointerup", () => setHovered(false));
    frame.addEventListener("pointercancel", () => setHovered(false));
  });

  const applyFilter = (selectedFilter) => {
    let visibleCount = 0;

    filterButtons.forEach((item) => {
      const isActive = (item.dataset.filter || "all") === selectedFilter;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    artCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ");
      const shouldShow =
        selectedFilter === "all" || categories.includes(selectedFilter);

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (filterStatus) {
      const filterLabel =
        selectedFilter === "all" ? "all works" : `${selectedFilter} works`;
      filterStatus.textContent = `Showing ${visibleCount} ${filterLabel}`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter || "all");
    });
  });

  if (filterButtons.length > 0 && artCards.length > 0) {
    const activeFilter =
      document.querySelector(".filter-button.is-active")?.dataset.filter || "all";
    applyFilter(activeFilter);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -36px 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});
