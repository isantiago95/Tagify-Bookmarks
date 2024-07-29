import React from 'react';
import Form from './components/Form';
import bookmarksApi from '../../API/BookmarksApi';
import { FormPopupFormProps } from '../../interfaces/BookmarkProps';

const Popup = (): JSX.Element => {
  const [currentTab, setCurrentTab] = React.useState<
    FormPopupFormProps['currentTab']
  >({
    title: '',
    url: '',
    favIconUrl: '',
  });

  const getInitialValues = async () => {
    const tab = await bookmarksApi.getCurrentTab();
    setCurrentTab(tab);
  };

  React.useEffect(() => {
    getInitialValues();
  }, []);

  // const [toggleOpen, setToggleOpen] = React.useState(false);

  // const saveBookmarkPage = () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     const tab = tabs[0];
  //     chrome.bookmarks.create({
  //       parentId: '1',
  //       title: tab.title,
  //       url: tab.url,
  //     });
  //   });
  //   setToggleOpen(true);
  // };

  // const openBookmark = () => {
  //   chrome.tabs.create({ url: 'chrome://bookmarks/' });
  //   setToggleOpen(false);
  // };

  return (
    <div className="flex gap-5 items-start justify-center text-slate-100 py-4shadow-lg rounded-lg p-4">
      <div className="rounded-xl bg-black p-4 mt-2 flex items-center justify-center">
        <img
          src={`${currentTab.favIconUrl}`}
          alt="logo"
          className="w-20 h-20 object-contain"
        />
      </div>

      <Form currentTab={currentTab} />
    </div>
  );
};

export default Popup;
