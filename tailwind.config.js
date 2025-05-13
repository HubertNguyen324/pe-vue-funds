const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./**/*.html", // Scans all HTML files
    "./**/*.js", // Scans all JavaScript files
    "!./node_modules/**/*", // Excludes node_modules folder
  ],
  theme: {
    extend: {
      colors: {
        // Define our theme colors for easier reference if needed,
        // or just use stone/sky directly in utilities.
        // For this example, we'll mostly use stone/sky directly.
        "theme-bg": colors.stone["50"],
        "theme-text": colors.stone["700"],
        "theme-text-strong": colors.stone["800"],
        "theme-accent": colors.sky["600"],
        "theme-accent-hover": colors.sky["700"],
        "theme-border": colors.stone["300"],
        "theme-muted": colors.stone["500"],
      },
      fontFamily: {
        // Make 'Inter' the default sans-serif font
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        inter: ["Inter", "sans-serif"], // Utility class 'font-inter'
      },
      // Customize the @tailwindcss/typography plugin (prose)
      typography: ({ theme }) => ({
        DEFAULT: {
          // This targets the base 'prose' class
          css: {
            "--tw-prose-body": theme("colors.stone[700]"),
            "--tw-prose-headings": theme("colors.stone[800]"),
            "--tw-prose-lead": theme("colors.stone[600]"),
            "--tw-prose-links": theme("colors.sky[600]"),
            "--tw-prose-bold": theme("colors.stone[800]"),
            "--tw-prose-counters": theme("colors.stone[500]"),
            "--tw-prose-bullets": theme("colors.stone[400]"),
            "--tw-prose-hr": theme("colors.stone[200]"),
            "--tw-prose-quotes": theme("colors.stone[600]"),
            "--tw-prose-quote-borders": theme("colors.sky[300]"),
            "--tw-prose-captions": theme("colors.stone[500]"),
            "--tw-prose-code": theme("colors.stone[800]"), // Text color for inline code
            "--tw-prose-pre-code": theme("colors.stone[200]"), // Text color for code blocks
            "--tw-prose-pre-bg": theme("colors.stone[600]"), // Background for code blocks
            "--tw-prose-th-borders": theme("colors.stone[300]"),
            "--tw-prose-td-borders": theme("colors.stone[200]"),
            // Invert colors for dark mode if you add it later
            "--tw-prose-invert-body": theme("colors.stone[300]"),
            "--tw-prose-invert-headings": theme("colors.white"),
            "--tw-prose-invert-lead": theme("colors.stone[400]"),
            "--tw-prose-invert-links": theme("colors.sky[400]"),
            // ... and so on for other prose elements
            a: {
              textDecoration: "underline",
              textDecorationColor: theme("colors.sky[300]"),
              textUnderlineOffset: "2px",
              transition: "color 0.2s ease, text-decoration-color 0.2s ease",
              "&:hover": {
                color: theme("colors.sky[700]"),
                textDecorationColor: theme("colors.sky[500]"),
              },
            },
            // Adjust heading margins if needed for "not too big" feel
            h1: {
              fontSize: theme("fontSize.2xl"), // Example: make H1 smaller than prose default
              marginBottom: theme("spacing.4"),
            },
            h2: {
              fontSize: theme("fontSize.xl"),
              marginTop: theme("spacing.8"),
              marginBottom: theme("spacing.3"),
            },
            h3: {
              fontSize: theme("fontSize.lg"),
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.2"),
            },
            // Ensure blockquotes are styled nicely
            blockquote: {
              borderLeftColor: theme("colors.sky[400]"),
              // color: theme('colors.stone[600]'), // Already set by --tw-prose-quotes
            },
            // Ensure code blocks have appropriate padding and font size
            pre: {
              // color: theme('colors.stone[200]'), // Set by --tw-prose-pre-code
              // backgroundColor: theme('colors.stone[800]'), // Set by --tw-prose-pre-bg
              padding: theme("spacing.6"), // Increase padding for code blocks
              fontSize: theme("fontSize.sm"), // Slightly smaller font for code
            },
            code: {
              // For inline code
              // color: theme('colors.stone[800]'), // Set by --tw-prose-code
              backgroundColor: theme("colors.stone[200]"),
              padding: "0.2em 0.4em",
              borderRadius: theme("borderRadius.md"),
              fontWeight: "500",
            },
            "code::before": {
              // Remove default backticks for inline code
              content: '""',
            },
            "code::after": {
              // Remove default backticks for inline code
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // For styling markdown content with the 'prose' class
    require("@tailwindcss/forms"), // For basic styling of form elements
  ],
};
