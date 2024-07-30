import React from 'react';
import BookmarkForm from './components/BookmarkForm';
import bookmarksApi from '../../API/BookmarksApi';
import {
  CurrentTabProps,
  ExtendedBookmarkTreeNode,
} from '../../interfaces/BookmarkProps';

const Popup = (): JSX.Element => {
  const [currentTab, setCurrentTab] = React.useState<
    ExtendedBookmarkTreeNode | CurrentTabProps
  >({});

  const getInitialValues = async () => {
    const tab = await bookmarksApi.getCurrentTab();
    const [bookmarkNode] = await bookmarksApi.getBookmarksTree(tab.url);
    const bookmark = { ...tab, ...bookmarkNode };
    setCurrentTab(bookmark);
  };

  React.useEffect(() => {
    getInitialValues();
  }, []);

  return (
    <div className="flex gap-5 items-start justify-center text-slate-100 py-4shadow-lg rounded-lg p-4">
      <div className="rounded-xl bg-black p-4 mt-2 flex items-center justify-center">
        <img
          src={`${currentTab.favIconUrl}`}
          alt="logo"
          className="w-20 h-20 object-contain"
        />
      </div>

      {currentTab.url && <BookmarkForm currentTab={currentTab} />}
    </div>
  );
};

export default Popup;
