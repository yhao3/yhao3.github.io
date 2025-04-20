document.addEventListener('DOMContentLoaded', function () {
  const blockquotes = document.querySelectorAll('blockquote');

  blockquotes.forEach(function (blockquote) {
    const firstParagraph = blockquote.querySelector('p:first-child');
    if (!firstParagraph) return;

    const text = firstParagraph.innerHTML;
    const calloutMatch = text.match(/^\[!(\w+)\]/);

    if (calloutMatch) {
      const type = calloutMatch[1].toLowerCase();

      // Create callout elements
      const callout = document.createElement('div');
      callout.className = `callout callout-${type}`;

      const header = document.createElement('div');
      header.className = 'callout-header';
      header.textContent = type.toUpperCase();

      const content = document.createElement('div');
      content.className = 'callout-content';

      // Move content
      firstParagraph.innerHTML = text.replace(/^\[!(\w+)\]\s*/, '');
      if (firstParagraph.innerHTML.trim() === '') {
        firstParagraph.remove();
      }

      while (blockquote.firstChild) {
        content.appendChild(blockquote.firstChild);
      }

      // Assemble and replace
      callout.appendChild(header);
      callout.appendChild(content);
      blockquote.parentNode.replaceChild(callout, blockquote);
    }
  });
});
