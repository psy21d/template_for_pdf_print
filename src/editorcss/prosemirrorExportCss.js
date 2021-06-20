export const css = `
.ul,
.ol {
  padding: 0 1rem;
}

.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  line-height: 1.1;
}

.code {
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
}

.pre {
  background: #0D0D0D;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.img {
  max-width: 100%;
  height: auto;
}

.blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(13, 13, 13, 0.1);
}

.hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}

.page {
  width: 1200px;
  height: 1735px;
  outline: 2px solid #00cc00;
  padding: 25px;
}

.pagebreak {
  page-break-after: always;
}
`