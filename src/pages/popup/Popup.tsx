import React from 'react';

const Popup = (): JSX.Element => {
  const [toggleOpen, setToggleOpen] = React.useState(false);

  const saveBookmarkPage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      chrome.bookmarks.create({
        parentId: '1',
        title: tab.title,
        url: tab.url,
      });
    });
    setToggleOpen(true);
  };

  const openBookmark = () => {
    chrome.tabs.create({ url: 'chrome://bookmarks/' });
    setToggleOpen(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center">
      <button
        className="px-3 py-2 bg-green-600 text-white rounded-md"
        onClick={saveBookmarkPage}
      >
        Save Bookmark
      </button>
      {toggleOpen && (
        <button
          onClick={openBookmark}
          className="px-3 py-2 bg-slate-600 text-white rounded-md"
        >
          Open bookmarks
        </button>
      )}
    </div>
  );
};

export default Popup;
