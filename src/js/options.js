document.addEventListener('DOMContentLoaded', () => {
  // use `browser` if available; otherwise, fallback to `chrome`
  const storageAPI =
    typeof browser !== 'undefined' ? browser.storage : chrome.storage;

  // function to save the selected options
  const saveOption = (key, value) => {
    const data = {};
    data[key] = value;
    storageAPI.sync.set(data);
  };

  // add event listeners to the radio buttons
  document.querySelectorAll('input[name="window-type"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      saveOption('windowType', event.target.value);
    });
  });

  document.querySelectorAll('input[name="tooltip-type"]').forEach((input) => {
    input.addEventListener('change', (event) => {
      saveOption('tooltipType', event.target.value);
    });
  });

  // load and set saved preferences when the popup is opened
  const loadOptions = () => {
    storageAPI.sync.get(['windowType', 'tooltipType'], (result) => {
      if (!result.windowType) {
        saveOption('windowType', 'popup');
        result.windowType = 'popup';
      }
      if (!result.tooltipType) {
        saveOption('tooltipType', 'text');
        result.tooltipType = 'text';
      }
      document.querySelector(
        `input[name="window-type"][value="${result.windowType}"]`
      ).checked = true;
      document.querySelector(
        `input[name="tooltip-type"][value="${result.tooltipType}"]`
      ).checked = true;
    });
  };

  // call loadOptions to set the previously saved preferences
  loadOptions();
});
