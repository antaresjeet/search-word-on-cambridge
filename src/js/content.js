const CONTAINER_CLASS_NAME = 'search-tooltip-cambridge-container';
const CLASS_NAME = 'search-tooltip-cambridge';
const TOOLTIP_TEXT = 'Search on Cambridge';
const TOOLTIP_STYLE = `.search-tooltip-cambridge {
  --cambridge-tooltip-bg: #303030;
  --cambridge-tooltip-color: #fff;
  --cambridge-tooltip-bg-hover: #404040;
  position: fixed;
  padding: 0.3em 0.6em;
  background: var(--cambridge-tooltip-bg);
  cursor: pointer;
  border-radius: 0.5rem;
  z-index: 99999;
}
.search-tooltip-cambridge:hover, .search-tooltip-cambridge:hover::before {
  background: var(--cambridge-tooltip-bg-hover);
}

.search-tooltip-cambridge:not(.logo) {
  transform: translateY(-10px);
  font-size: 16px !important;
  color: var(--cambridge-tooltip-color);
}
.search-tooltip-cambridge:not(.logo)::before {
  position: absolute;
  content: "";
  height: 0.6em;
  width: 0.6em;
  bottom: -0.2em;
  left: 10%;
  transform: translateX(-50%) rotate(45deg);
  background: var(--cambridge-tooltip-bg);
  border-bottom-right-radius: 0.175rem;
}

.search-tooltip-cambridge.logo {
  border-radius: 50%;
  border-radius: 24px;
  border-bottom-left-radius: 0px;
}
.search-tooltip-cambridge.logo img {
  transform: rotate(6deg);
  margin-top: 3px;
  border-radius: 50%;
}

.search-tooltip-cambridge.logo.logo-text {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}
.search-tooltip-cambridge.logo.logo-text img {
  border-bottom-left-radius: 0px;
  margin-top: 0px;
}
.search-tooltip-cambridge.logo.logo-text span {
  color: #fff;
  font-size: 16px;
}`;
let selectedText = '';

const createTooltip = () => {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) {
    return;
  } // no selection, exit

  const storageAPI =
    typeof browser !== 'undefined' ? browser.storage : chrome.storage;

  storageAPI.sync.get(['windowType', 'tooltipType'], (result) => {
    const range = selection.getRangeAt(0);
    // the bounding rect of the first character of the selection
    const startRect = range.getClientRects()[0];

    const container = document.createElement('div');
    container.classList.add(CONTAINER_CLASS_NAME);
    const shadowRoot = container.attachShadow({ mode: 'open' });

    // Create a <style> element
    const style = document.createElement('style');
    style.textContent = TOOLTIP_STYLE;

    const tooltip = document.createElement('div');
    tooltip.classList.add(CLASS_NAME);

    setToolTipStyle(tooltip, result.tooltipType);

    tooltip.style.top = `${startRect.top - (result.tooltipType !== 'text' ? 46 : 32)}px`;
    tooltip.style.left = `${startRect.left}px`;

    tooltip.addEventListener('click', () => {
      onToolTipClick(result.windowType);
    });

    // Append the style and tooltip to the shadow root
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(tooltip);

    // Append the container (with shadow root) to the document body
    document.body.appendChild(container);
  });
};

const setToolTipStyle = (tooltip, tooltipType) => {
  if (tooltipType === 'text') {
    tooltip.innerText = TOOLTIP_TEXT;
  } else {
    const runtime =
      typeof browser !== 'undefined' ? browser.runtime : chrome.runtime;

    tooltip.classList.add('logo');

    const img = document.createElement('img');
    img.src = runtime.getURL('icons/icon128.png');
    img.alt = 'Logo';

    if (tooltipType === 'logo') {
      img.width = 24;
      img.height = 24;
      tooltip.appendChild(img);
    } else {
      img.width = 28;
      img.height = 28;
      tooltip.classList.add('logo-text');

      const span = document.createElement('span');
      span.innerText = TOOLTIP_TEXT;
      tooltip.appendChild(img);
      tooltip.appendChild(span);
    }
  }
};

const onToolTipClick = (windowType) => {
  if (selectedText) {
    const searchUrl = `https://dictionary.cambridge.org/dictionary/english/${selectedText}`;
    if (windowType === 'popup') {
      const width = 600;
      const height = window.innerHeight - 200;
      const left = (screen.width - width) / 2;
      const top = (screen.height - height) / 2;
      window.open(
        searchUrl,
        '',
        `width=${width},height=${height},top=${top},left=${left}`
      );
    } else {
      window.open(searchUrl, '_blank');
    }
    selectedText = '';
  }
  removeTooltip();
};

const removeTooltip = () => {
  const tooltip = document.querySelector(`.${CONTAINER_CLASS_NAME}`);
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

document.addEventListener('wheel', () => {
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
