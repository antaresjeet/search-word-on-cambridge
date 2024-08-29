const CLASS_NAME = 'search-tooltip-cambridge';
const TOOLTIP_TEXT = 'Search on Cambridge';
let selectedText = '';

const createTooltip = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) {
    return;
  } // no selection, exit

  const range = selection.getRangeAt(0);
  // the bounding rect of the first character of the selection
  const startRect = range.getClientRects()[0];

  const tooltip = document.createElement('div');
  tooltip.classList.add(CLASS_NAME);
  tooltip.innerText = TOOLTIP_TEXT;

  tooltip.style.top = `${startRect.top - 32}px`;
  tooltip.style.left = `${startRect.left}px`;

  tooltip.addEventListener('click', () => {
    if (selectedText) {
      window.open(
        `https://dictionary.cambridge.org/dictionary/english/${selectedText}`,
        '_blank'
      );
      selectedText = '';
    }
    removeTooltip();
  });
  document.body.appendChild(tooltip);
};

const removeTooltip = () => {
  const tooltip = document.querySelector(`.${CLASS_NAME}`);
  tooltip && tooltip.remove();
};

document.addEventListener('selectionchange', () => {
  const text = window.getSelection().toString().trim();
  if (text) {
    selectedText = text;
    removeTooltip();
    createTooltip();
  }
});

document.addEventListener('scroll', () => {
  removeTooltip();
});

document.addEventListener('click', (event) => {
  if (
    event.target.className !== CLASS_NAME &&
    !window.getSelection().toString().trim()
  ) {
    removeTooltip();
  }
});
