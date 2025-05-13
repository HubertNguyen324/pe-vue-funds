document.addEventListener("DOMContentLoaded", () => {
  const trainingContentArea = document.getElementById("training-content-area");
  const tocList = document.getElementById("toc-list");
  const tocPlaceholderItem = document.querySelector(
    "#toc-list .toc-placeholder-item"
  );
  const tocToggleButton = document.getElementById("toc-toggle-button");
  const tocSidebar = document.getElementById("toc-sidebar");
  const tocOverlay = document.getElementById("toc-overlay");

  if (
    !trainingContentArea ||
    !tocList ||
    !tocToggleButton ||
    !tocSidebar ||
    !tocOverlay
  ) {
    console.error(
      "Error: Essential elements for TOC, content, or toggle functionality not found."
    );
    if (tocList.querySelector(".toc-placeholder-item")) {
      tocList.querySelector(".toc-placeholder-item").textContent =
        "Error initializing page components.";
    }
    return;
  }

  const defaultMarkdownFilePath = "training-content.md";
  let markdownFilePath =
    trainingContentArea.dataset.markdownSource || defaultMarkdownFilePath;

  if (markdownFilePath && !markdownFilePath.toLowerCase().endsWith(".md")) {
    console.warn(
      `Invalid or missing markdown file extension for: "${markdownFilePath}". Using default: "${defaultMarkdownFilePath}".`
    );
    markdownFilePath = defaultMarkdownFilePath;
  } else if (!markdownFilePath) {
    console.warn(
      `Markdown source attribute is empty. Using default: "${defaultMarkdownFilePath}".`
    );
    markdownFilePath = defaultMarkdownFilePath;
  }

  if (typeof marked !== "undefined") {
    marked.setOptions({
      renderer: new marked.Renderer(),
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
  } else {
    console.error("Marked.js library is not loaded.");
    trainingContentArea.innerHTML =
      '<p class="text-red-600 text-center p-4">Error: Markdown parser failed to load.</p>';
    if (tocList.querySelector(".toc-placeholder-item")) {
      tocList.querySelector(".toc-placeholder-item").textContent =
        "Content loading failed.";
    }
    return;
  }

  function toggleTOC() {
    const isOpen = document.body.classList.toggle("toc-open");
    tocToggleButton.setAttribute("aria-expanded", isOpen.toString());
    tocToggleButton.textContent = isOpen ? "✕" : "☰";
  }
  tocToggleButton.addEventListener("click", toggleTOC);
  tocOverlay.addEventListener("click", toggleTOC);
  tocList.addEventListener("click", (event) => {
    if (
      event.target.closest("a") &&
      document.body.classList.contains("toc-open")
    ) {
      toggleTOC();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      document.body.classList.contains("toc-open")
    ) {
      toggleTOC();
    }
  });

  async function loadMarkdownAndInitialize(mdPath) {
    const noscriptMdLink = document.getElementById("noscript-md-link");
    if (noscriptMdLink) {
      noscriptMdLink.href = mdPath;
      const filename = mdPath.substring(mdPath.lastIndexOf("/") + 1);
      noscriptMdLink.textContent = `raw ${filename} content directly`;
      noscriptMdLink.className =
        "font-medium text-amber-700 hover:text-amber-800 underline"; // Theme noscript link
    }

    try {
      const response = await fetch(mdPath);
      if (!response.ok)
        throw new Error(
          `Failed to fetch ${mdPath}: ${response.status} ${response.statusText}`
        );
      const markdownText = await response.text();
      const htmlContent = marked.parse(markdownText);
      trainingContentArea.innerHTML = htmlContent;

      generateTableOfContents();
      initializeInteractiveSolutions();
    } catch (error) {
      console.error(`Error loading or parsing markdown from ${mdPath}:`, error);
      trainingContentArea.innerHTML = `<p class="text-red-600 text-center p-4">Error loading training content. ${error.message}.</p>`;
      if (tocList.querySelector(".toc-placeholder-item")) {
        tocList.querySelector(".toc-placeholder-item").textContent =
          "Failed to load content for TOC.";
      }
    }
  }

  function initializeInteractiveSolutions() {
    const interactiveSolutionBlocks = trainingContentArea.querySelectorAll(
      ".vue-interactive-solution"
    );

    interactiveSolutionBlocks.forEach(async (block) => {
      const solutionId = block.dataset.solutionId;
      const vueAppScriptPath = block.dataset.vueAppScript;
      const vueAppMountPointId = `vue-app-${solutionId}`;

      if (!solutionId || !vueAppScriptPath) {
        console.warn(
          "Interactive block is missing data-solution-id or data-vue-app-script attribute.",
          block
        );
        block.innerHTML =
          '<p class="text-red-500 p-2">Configuration error for this interactive block.</p>';
        return;
      }

      const blockHeaderContent = document.createElement("div");
      blockHeaderContent.className = "mb-4";
      Array.from(block.children).forEach((child) => {
        if (child.tagName === "H3" || child.tagName === "P") {
          const clonedChild = child.cloneNode(true);
          if (clonedChild.tagName === "H3") {
            clonedChild.className = "text-xl font-semibold text-stone-800"; // Theme H3
          } else if (clonedChild.tagName === "P") {
            clonedChild.className = "text-stone-600 text-sm"; // Theme P
          }
          blockHeaderContent.appendChild(clonedChild);
        }
      });

      block.innerHTML = ""; // Clear original
      block.className =
        "vue-interactive-solution p-6 rounded-lg border border-stone-200 bg-stone-50 my-8 relative"; // Themed block, added relative for button positioning
      if (blockHeaderContent.hasChildNodes()) {
        block.appendChild(blockHeaderContent);
      }

      const tabsContainer = document.createElement("div");
      const tabNav = document.createElement("div");
      tabNav.className = "flex border-b border-stone-300 mb-4"; // Themed border

      const demoButton = document.createElement("button");
      demoButton.textContent = "Demo";
      demoButton.dataset.tabTarget = `demo-content-${solutionId}`;

      const sourceButton = document.createElement("button");
      sourceButton.textContent = "Source";
      sourceButton.dataset.tabTarget = `source-content-${solutionId}`;

      const baseTabButtonClasses = [
        "py-2",
        "px-4",
        "font-medium",
        "text-sm",
        "focus:outline-none",
        "transition-colors",
        "duration-150",
      ];
      const activeTabClasses = ["text-sky-600", "border-sky-600", "border-b-2"];
      const inactiveTabClasses = [
        "text-stone-500",
        "hover:text-sky-700",
        "border-transparent",
        "hover:border-stone-300",
      ];

      [demoButton, sourceButton].forEach((btn) =>
        btn.classList.add(...baseTabButtonClasses)
      );

      function setActiveTab(buttonToActivate) {
        [demoButton, sourceButton].forEach((btn) => {
          btn.classList.remove(...activeTabClasses);
          btn.classList.add(...inactiveTabClasses);
        });
        buttonToActivate.classList.add(...activeTabClasses);
        buttonToActivate.classList.remove(...inactiveTabClasses);
      }
      setActiveTab(demoButton);

      tabNav.appendChild(demoButton);
      tabNav.appendChild(sourceButton);

      const tabContentArea = document.createElement("div");
      const demoPane = document.createElement("div");
      demoPane.id = `demo-content-${solutionId}`;
      demoPane.className = "tab-pane";
      const solutionContainerDiv = document.createElement("div");
      solutionContainerDiv.id = vueAppMountPointId;
      demoPane.appendChild(solutionContainerDiv);

      const sourcePane = document.createElement("div");
      sourcePane.id = `source-content-${solutionId}`;
      sourcePane.className = "tab-pane hidden relative"; // Added relative for button positioning

      const copySourceButton = document.createElement("button");
      copySourceButton.textContent = "Copy Source";
      // Tailwind classes for the copy button
      copySourceButton.className =
        "absolute top-2 right-5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium py-1 px-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 transition-colors duration-150";

      const preTag = document.createElement("pre");
      preTag.className =
        "prose prose-sm max-w-none bg-stone-600 text-stone-200 p-4 rounded-md overflow-x-auto max-h-96 mt-0"; // mt-0 to prevent double margin with button
      const codeTag = document.createElement("code");
      codeTag.className = "language-javascript";
      codeTag.textContent = "Loading source code...";

      preTag.appendChild(codeTag);
      sourcePane.appendChild(copySourceButton); // Add button before pre tag for better layout
      sourcePane.appendChild(preTag);

      // Event listener for the copy button
      copySourceButton.addEventListener("click", () => {
        if (
          navigator.clipboard &&
          codeTag.textContent !== "Loading source code..." &&
          codeTag.textContent !== `Error loading source code: ...`
        ) {
          navigator.clipboard
            .writeText(codeTag.textContent)
            .then(() => {
              const originalText = copySourceButton.textContent;
              copySourceButton.textContent = "Copied!";
              copySourceButton.classList.add(
                "bg-emerald-500",
                "hover:bg-emerald-600"
              );
              copySourceButton.classList.remove(
                "bg-sky-500",
                "hover:bg-sky-600"
              );
              setTimeout(() => {
                copySourceButton.textContent = originalText;
                copySourceButton.classList.remove(
                  "bg-emerald-500",
                  "hover:bg-emerald-600"
                );
                copySourceButton.classList.add(
                  "bg-sky-500",
                  "hover:bg-sky-600"
                );
              }, 2000);
            })
            .catch((err) => {
              console.error("Failed to copy source code: ", err);
              copySourceButton.textContent = "Copy Failed";
              setTimeout(() => {
                copySourceButton.textContent = "Copy Source";
              }, 2000);
            });
        } else {
          console.warn("Clipboard API not available or no content to copy.");
        }
      });

      tabContentArea.appendChild(demoPane);
      tabContentArea.appendChild(sourcePane);
      tabsContainer.appendChild(tabNav);
      tabsContainer.appendChild(tabContentArea);
      block.appendChild(tabsContainer);

      [demoButton, sourceButton].forEach((button) => {
        button.addEventListener("click", () => {
          setActiveTab(button);
          [demoPane, sourcePane].forEach((pane) => {
            pane.classList.toggle(
              "hidden",
              pane.id !== button.dataset.tabTarget
            );
          });
        });
      });

      try {
        const sourceResponse = await fetch(vueAppScriptPath);
        if (!sourceResponse.ok)
          throw new Error(
            `Failed to fetch source: ${sourceResponse.statusText}`
          );
        const sourceText = await sourceResponse.text();
        codeTag.textContent = sourceText;
      } catch (err) {
        codeTag.textContent = `Error loading source code: ${err.message}`;
      }

      const script = document.createElement("script");
      script.src = vueAppScriptPath;
      script.type = "text/javascript";
      script.async = true;
      script.onload = () =>
        console.log(`Vue app script loaded: ${vueAppScriptPath}`);
      script.onerror = () => {
        const mountElement = document.getElementById(vueAppMountPointId);
        if (mountElement)
          mountElement.innerHTML = `<p class="text-red-500 p-2">Error loading interactive demo.</p>`;
      };
      document.head.appendChild(script);
    });
  }

  function generateTableOfContents() {
    const currentPlaceholder = tocList.querySelector(".toc-placeholder-item");
    if (currentPlaceholder) currentPlaceholder.remove();
    tocList.innerHTML = "";

    const headers = trainingContentArea.querySelectorAll("h1, h2, h3");
    let tocHasItems = false;

    headers.forEach((header, index) => {
      const text = header.textContent.trim();
      if (!text) return;
      let id = header.id;
      if (!id) {
        id = `header-${text
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "")}-${index}`;
        header.id = id;
      }

      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = text;
      link.className =
        "block py-1.5 px-2.5 rounded-md hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors duration-150 text-stone-600";

      if (header.tagName === "H1")
        link.classList.add("font-semibold", "text-stone-700");
      else if (header.tagName === "H2") link.classList.add("ml-3");
      else if (header.tagName === "H3") link.classList.add("ml-6", "text-sm");

      listItem.appendChild(link);
      tocList.appendChild(listItem);
      tocHasItems = true;
    });

    if (!tocHasItems) {
      tocList.innerHTML =
        '<li class="italic text-stone-500 p-2">No headers found for TOC.</li>';
    } else {
      setupScrollSpy();
    }
  }

  function setupScrollSpy() {
    const tocLinks = Array.from(tocList.querySelectorAll("a"));
    const headerElements = tocLinks
      .map((link) => {
        const targetId = link.getAttribute("href").substring(1);
        return document.getElementById(targetId);
      })
      .filter((el) => el !== null);

    if (headerElements.length === 0) return;

    const observerOptions = { rootMargin: "-10% 0px -50% 0px", threshold: 0 };
    let activeLink = null;
    const activeLinkBaseClasses = ["hover:bg-sky-100"];
    const activeLinkSpecificClasses = [
      "bg-sky-100",
      "text-sky-700",
      "font-semibold",
      "border-l-2",
      "border-sky-600",
      "pl-[calc(0.625rem-2px)]",
    ];

    const intersectionObserver = new IntersectionObserver((entries) => {
      let currentTopVisibleEntry = null;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (
            !currentTopVisibleEntry ||
            entry.boundingClientRect.top <
              currentTopVisibleEntry.boundingClientRect.top
          ) {
            currentTopVisibleEntry = entry;
          }
        }
      });

      tocLinks.forEach((link) => {
        link.classList.remove(...activeLinkSpecificClasses);
        link.classList.add(...["text-stone-600", "hover:bg-stone-100"]);
        if (link.parentElement.classList.contains("toc-h1"))
          link.classList.add("font-semibold", "text-stone-700");
        else if (link.parentElement.classList.contains("toc-h2"))
          link.classList.add("ml-3");
        else if (link.parentElement.classList.contains("toc-h3"))
          link.classList.add("ml-6", "text-sm");
      });
      activeLink = null;

      let targetEntry = currentTopVisibleEntry;
      if (!targetEntry) {
        targetEntry = entries.find((e) => e.isIntersecting);
      }

      if (targetEntry) {
        const id = targetEntry.target.id;
        const tocLink = tocList.querySelector(`a[href="#${id}"]`);
        if (tocLink) {
          tocLink.classList.remove(...["text-stone-600", "hover:bg-stone-100"]);
          tocLink.classList.add(
            ...activeLinkBaseClasses,
            ...activeLinkSpecificClasses
          );
          activeLink = tocLink;
        }
      }
    }, observerOptions);

    headerElements.forEach((header) => intersectionObserver.observe(header));

    if (window.location.hash) {
      const initialActiveLink = tocList.querySelector(
        `a[href="${window.location.hash}"]`
      );
      if (initialActiveLink) {
        initialActiveLink.classList.remove(
          ...["text-stone-600", "hover:bg-stone-100"]
        );
        initialActiveLink.classList.add(
          ...activeLinkBaseClasses,
          ...activeLinkSpecificClasses
        );
        activeLink = initialActiveLink;
      }
    } else if (headerElements.length > 0 && tocLinks.length > 0) {
      const firstHeaderRect = headerElements[0].getBoundingClientRect();
      if (
        firstHeaderRect.top >= 0 &&
        firstHeaderRect.top < window.innerHeight * 0.5
      ) {
        if (!activeLink) {
          tocLinks[0].classList.remove(
            ...["text-stone-600", "hover:bg-stone-100"]
          );
          tocLinks[0].classList.add(
            ...activeLinkBaseClasses,
            ...activeLinkSpecificClasses
          );
          activeLink = tocLinks[0];
        }
      }
    }
  }

  loadMarkdownAndInitialize(markdownFilePath);
});
