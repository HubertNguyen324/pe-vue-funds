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
    if (tocPlaceholder) tocPlaceholder.textContent = "Content loading failed.";
    return;
  }

  function toggleTOC() {
    const isOpen = document.body.classList.toggle("toc-open");
    tocToggleButton.setAttribute("aria-expanded", isOpen.toString());
    tocToggleButton.textContent = isOpen ? "✕ Close" : "☰ Menu";
  }
  tocToggleButton.addEventListener("click", toggleTOC);
  tocOverlay.addEventListener("click", toggleTOC);
  tocList.addEventListener("click", (event) => {
    if (
      event.target.tagName === "A" &&
      document.body.classList.contains("toc-open")
    )
      toggleTOC();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("toc-open"))
      toggleTOC();
  });

  async function loadMarkdownAndInitialize(mdPath) {
    const noscriptMdLink = document.getElementById("noscript-md-link");
    if (noscriptMdLink) {
      noscriptMdLink.href = mdPath;
      const filename = mdPath.substring(mdPath.lastIndexOf("/") + 1);
      noscriptMdLink.textContent = `raw ${filename} content directly`;
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
      initializeInteractiveSolutions(); // This will now build tabs
    } catch (error) {
      console.error(`Error loading or parsing markdown from ${mdPath}:`, error);
      trainingContentArea.innerHTML = `<p class="text-red-600 text-center p-4">Error loading training content. ${error.message}.</p>`;
      if (tocPlaceholder)
        tocPlaceholder.textContent = "Failed to load content for TOC.";
    }
  }

  function initializeInteractiveSolutions() {
    const interactiveSolutionBlocks = trainingContentArea.querySelectorAll(
      ".vue-interactive-solution"
    );

    interactiveSolutionBlocks.forEach(async (block) => {
      // Make this async to handle fetching source code
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

      // Preserve original header/description content from the block
      const headerContent = document.createElement("div");
      headerContent.classList.add("vue-interactive-solution-header");
      // Move existing h3, p (etc.) into this headerContent div
      Array.from(block.children).forEach((child) => {
        if (child.tagName === "H3" || child.tagName === "P") {
          // Adjust if other elements are used for description
          headerContent.appendChild(child.cloneNode(true));
        }
      });

      // Clear the original block content and rebuild with tabs
      block.innerHTML = ""; // Clear original content
      if (headerContent.hasChildNodes()) {
        block.appendChild(headerContent); // Add back the preserved header
      }

      // Create Tab Structure
      const tabsContainer = document.createElement("div");
      tabsContainer.className = "solution-tabs";

      const tabNav = document.createElement("div");
      tabNav.className = "tab-navigation";

      const demoButton = document.createElement("button");
      demoButton.className = "tab-button active";
      demoButton.textContent = "Demo";
      demoButton.dataset.tabTarget = `demo-content-${solutionId}`;

      const sourceButton = document.createElement("button");
      sourceButton.className = "tab-button";
      sourceButton.textContent = "Source Code";
      sourceButton.dataset.tabTarget = `source-content-${solutionId}`;

      tabNav.appendChild(demoButton);
      tabNav.appendChild(sourceButton);

      const tabContentArea = document.createElement("div");
      tabContentArea.className = "tab-content-area";

      // Demo Pane
      const demoPane = document.createElement("div");
      demoPane.id = `demo-content-${solutionId}`;
      demoPane.className = "tab-pane active";
      // The original .solution-container div from markdown needs to be created here for the Vue app
      const solutionContainerDiv = document.createElement("div");
      solutionContainerDiv.className = "solution-container"; // Class from original markdown structure
      solutionContainerDiv.id = vueAppMountPointId; // Vue app mounts here
      // Add noscript fallback to the demo pane as well
      const noscriptDiv = document.createElement("noscript");
      const noscriptSolutionContent = document.createElement("div");
      noscriptSolutionContent.className =
        "solution-content noscript-solution p-3 bg-gray-50 border rounded-md";
      // Try to find original noscript content if it was defined in the markdown block
      // This part is tricky as the original block content is cleared.
      // For simplicity, a generic noscript message for the demo.
      noscriptSolutionContent.innerHTML = `<p><strong>Note:</strong> This interactive demo requires JavaScript.</p>`;
      noscriptDiv.appendChild(noscriptSolutionContent);
      solutionContainerDiv.appendChild(noscriptDiv);

      demoPane.appendChild(solutionContainerDiv);

      // Source Pane
      const sourcePane = document.createElement("div");
      sourcePane.id = `source-content-${solutionId}`;
      sourcePane.className = "tab-pane tab-pane-source";
      const preTag = document.createElement("pre");
      const codeTag = document.createElement("code");
      codeTag.className = "language-javascript"; // For syntax highlighters
      codeTag.textContent = "Loading source code...";
      preTag.appendChild(codeTag);
      sourcePane.appendChild(preTag);

      tabContentArea.appendChild(demoPane);
      tabContentArea.appendChild(sourcePane);

      tabsContainer.appendChild(tabNav);
      tabsContainer.appendChild(tabContentArea);
      block.appendChild(tabsContainer);

      // Tab switching logic
      const tabButtons = [demoButton, sourceButton];
      const tabPanes = [demoPane, sourcePane];

      tabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          tabButtons.forEach((btn) => btn.classList.remove("active"));
          tabPanes.forEach((pane) => pane.classList.remove("active"));

          button.classList.add("active");
          const targetPaneId = button.dataset.tabTarget;
          document.getElementById(targetPaneId)?.classList.add("active");
        });
      });

      // Fetch and display source code
      try {
        const sourceResponse = await fetch(vueAppScriptPath);
        if (!sourceResponse.ok)
          throw new Error(
            `Failed to fetch source: ${sourceResponse.statusText}`
          );
        const sourceText = await sourceResponse.text();
        codeTag.textContent = sourceText;
        // If using a syntax highlighter like Prism.js, you might need to re-trigger it here:
        // if (typeof Prism !== 'undefined') { Prism.highlightElement(codeTag); }
      } catch (err) {
        codeTag.textContent = `Error loading source code: ${err.message}`;
        console.error(`Failed to load source for ${vueAppScriptPath}:`, err);
      }

      // Load and mount the Vue app script for the demo tab
      const script = document.createElement("script");
      script.src = vueAppScriptPath;
      script.type = "text/javascript";
      script.async = true;
      script.onload = () =>
        console.log(
          `Vue app script loaded: ${vueAppScriptPath} for demo ${solutionId}`
        );
      script.onerror = () => {
        console.error(`Failed to load Vue app script: ${vueAppScriptPath}`);
        const mountElement = document.getElementById(vueAppMountPointId);
        if (mountElement)
          mountElement.innerHTML = `<p class="text-red-500">Error loading interactive demo.</p>`;
      };
      document.head.appendChild(script);
    });
  }

  function generateTableOfContents() {
    // ... (TOC generation logic remains the same)
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
    // ... (Scroll spy logic remains the same)
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

  loadMarkdownAndInitialize(markdownFilePath);
});
