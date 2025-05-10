document.addEventListener("DOMContentLoaded", () => {
  const trainingContentArea = document.getElementById("training-content-area");
  const tocList = document.getElementById("toc-list");
  const tocPlaceholder = document.querySelector("#toc-list .toc-placeholder");
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
    if (tocPlaceholder)
      tocPlaceholder.textContent = "Error initializing page components.";
    return;
  }

  // Determine the Markdown file path from the data attribute
  const defaultMarkdownFilePath = "training-content.md"; // Fallback if data attribute is missing or empty
  let markdownFilePath =
    trainingContentArea.dataset.markdownSource || defaultMarkdownFilePath;

  // Basic validation for the file path
  if (markdownFilePath && !markdownFilePath.toLowerCase().endsWith(".md")) {
    console.warn(
      `Invalid or missing markdown file extension for: "${markdownFilePath}". Using default: "${defaultMarkdownFilePath}".`
    );
    markdownFilePath = defaultMarkdownFilePath;
  } else if (!markdownFilePath) {
    // Handles case where attribute exists but is empty
    console.warn(
      `Markdown source attribute is empty. Using default: "${defaultMarkdownFilePath}".`
    );
    markdownFilePath = defaultMarkdownFilePath;
  }

  // Configure Marked.js
  if (typeof marked !== "undefined") {
    marked.setOptions({
      renderer: new marked.Renderer(),
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false, // IMPORTANT: Sanitize if source is untrusted.
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
  } else {
    console.error("Marked.js library is not loaded.");
    trainingContentArea.innerHTML =
      '<p class="text-red-600 text-center p-4">Error: Markdown parser failed to load.</p>';
    if (tocPlaceholder) tocPlaceholder.textContent = "Content loading failed.";
    return;
  }

  // --- TOC Toggle Functionality ---
  function toggleTOC() {
    const isOpen = document.body.classList.toggle("toc-open");
    tocToggleButton.setAttribute("aria-expanded", isOpen.toString());
    if (isOpen) {
      tocToggleButton.textContent = "✕ Close";
    } else {
      tocToggleButton.textContent = "☰ Menu";
    }
  }

  tocToggleButton.addEventListener("click", toggleTOC);
  tocOverlay.addEventListener("click", toggleTOC);

  tocList.addEventListener("click", (event) => {
    if (
      event.target.tagName === "A" &&
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

  // --- Load Markdown and Initialize Other Features ---
  /**
   * Loads markdown content from the specified file path, renders it,
   * and initializes related features like TOC and interactive solutions.
   * @param {string} mdPath - The path to the markdown file.
   */
  async function loadMarkdownAndInitialize(mdPath) {
    if (!mdPath) {
      // Should be caught by earlier check, but good to have
      console.error(
        "Error: Markdown file path not provided to loadMarkdownAndInitialize."
      );
      trainingContentArea.innerHTML = `<p class="text-red-600 text-center p-4">Error: Markdown file path missing.</p>`;
      if (tocPlaceholder) tocPlaceholder.textContent = "Configuration error.";
      return;
    }

    // Update the noscript fallback link dynamically
    const noscriptMdLink = document.getElementById("noscript-md-link");
    if (noscriptMdLink) {
      noscriptMdLink.href = mdPath;
      // Extract filename from path for display
      const filename = mdPath.substring(mdPath.lastIndexOf("/") + 1);
      noscriptMdLink.textContent = `raw ${filename} content directly`;
    }

    try {
      const response = await fetch(mdPath);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${mdPath}: ${response.status} ${response.statusText}`
        );
      }
      const markdownText = await response.text();
      const htmlContent = marked.parse(markdownText);
      trainingContentArea.innerHTML = htmlContent;

      generateTableOfContents();
      initializeInteractiveSolutions();
    } catch (error) {
      console.error(`Error loading or parsing markdown from ${mdPath}:`, error);
      trainingContentArea.innerHTML = `<p class="text-red-600 text-center p-4">Error loading training content from ${mdPath}. ${error.message}.</p>`;
      if (tocPlaceholder)
        tocPlaceholder.textContent = "Failed to load content for TOC.";
    }
  }

  function generateTableOfContents() {
    if (tocPlaceholder) tocPlaceholder.remove();
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
      listItem.className = `toc-${header.tagName.toLowerCase()}`;
      listItem.appendChild(link);
      tocList.appendChild(listItem);
      tocHasItems = true;
    });

    if (!tocHasItems) {
      tocList.innerHTML =
        '<li class="italic text-gray-500 p-2">No headers found for TOC.</li>';
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

    const observerOptions = {
      rootMargin: "-10% 0px -50% 0px",
      threshold: 0,
    };

    let activeLink = null;

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

      if (activeLink) {
        activeLink.classList.remove("active");
        activeLink = null;
      }

      if (currentTopVisibleEntry) {
        const id = currentTopVisibleEntry.target.id;
        const tocLink = tocList.querySelector(`a[href="#${id}"]`);
        if (tocLink) {
          tocLink.classList.add("active");
          activeLink = tocLink;
        }
      } else {
        const anyIntersecting = entries.find((e) => e.isIntersecting);
        if (anyIntersecting) {
          const id = anyIntersecting.target.id;
          const tocLink = tocList.querySelector(`a[href="#${id}"]`);
          if (tocLink) {
            tocLink.classList.add("active");
            activeLink = tocLink;
          }
        }
      }
    }, observerOptions);

    headerElements.forEach((header) => intersectionObserver.observe(header));

    if (window.location.hash) {
      const initialActiveLink = tocList.querySelector(
        `a[href="${window.location.hash}"]`
      );
      if (initialActiveLink) {
        initialActiveLink.classList.add("active");
        activeLink = initialActiveLink;
      }
    } else if (headerElements.length > 0 && tocLinks.length > 0) {
      const firstHeaderRect = headerElements[0].getBoundingClientRect();
      if (
        firstHeaderRect.top >= 0 &&
        firstHeaderRect.top < window.innerHeight * 0.5
      ) {
        if (!activeLink) {
          tocLinks[0].classList.add("active");
          activeLink = tocLinks[0];
        }
      }
    }
  }

  function initializeInteractiveSolutions() {
    const interactiveBlocks = trainingContentArea.querySelectorAll(
      ".vue-interactive-solution"
    );
    interactiveBlocks.forEach((block) => {
      const solutionId = block.dataset.solutionId;
      const vueAppScriptPath = block.dataset.vueAppScript;
      const mountPointId = `vue-app-${solutionId}`;

      console.log(`Solution ID: ${solutionId}`);
      console.log(`Vue App Script Path: ${vueAppScriptPath}`);

      if (!solutionId || !vueAppScriptPath) return;
      const mountElement = block.querySelector(`#${mountPointId}`);
      if (!mountElement) return;

      const script = document.createElement("script");
      script.src = vueAppScriptPath;
      script.type = "text/javascript";
      script.async = true;
      script.onload = () =>
        console.log(`Vue app script loaded: ${vueAppScriptPath}`);
      script.onerror = () => {
        console.error(`Failed to load Vue app script: ${vueAppScriptPath}`);
        mountElement.innerHTML = `<p class="text-red-500">Error loading interactive component.</p>`;
      };
      document.head.appendChild(script);
    });
  }

  // Call the main function with the determined Markdown file path
  loadMarkdownAndInitialize(markdownFilePath);
});
