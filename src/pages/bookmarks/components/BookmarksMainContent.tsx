import BookmarkListItems from './BookmarkListItems';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import bookmarksApi from '../../../API/BookmarksApi';
import {
  BookmarkTreeNodeProps,
  ContextMenuOptions,
} from '../../../interfaces/BookmarkProps';

const options: ContextMenuOptions[] = [
  {
    name: 'Edit',
    type: 'item',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Edit clicked: ', bookmark);
    },
  },
  {
    name: 'Delete',
    type: 'item',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Delete clicked: ', bookmark);
    },
  },
  { type: 'separator' },
  {
    name: 'Cut',
    type: 'item',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Cut clicked: ', bookmark);
    },
  },
  {
    name: 'Copy',
    type: 'item',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Copy clicked: ', bookmark);
    },
  },
  { type: 'separator' },
  {
    name: 'Open in new tab',
    type: 'item',
    onClick: (bookmark: BookmarkTreeNodeProps) =>
      bookmarksApi.openInNewTab(bookmark?.url ?? ''),
  },
  {
    name: 'Open in new window',
    type: 'item',
    onClick: (bookmark: BookmarkTreeNodeProps) =>
      bookmarksApi.openInNewWindow(bookmark?.url ?? ''),
  },
  {
    name: 'Open in incognito window',
    type: 'item',
    onClick: (bookmark: BookmarkTreeNodeProps) =>
      bookmarksApi.openInIncognito(bookmark?.url ?? ''),
  },
];

const BookmarksMainContent = () => {
  const { state } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-3">
      <input
        // onChange={searchBookmark}
        type="text"
        placeholder="Search your bookmarks"
        className="w-full text-slate-100 p-3 bg-slate-950 rounded-full text-base mb-4"
      />

      <div className="flex justify-center">
        {state.selectedTree && (
          <BookmarkListItems
            bookmarkTree={state.selectedTree.children ?? []}
            contextMenuOptions={options}
          />
        )}
      </div>
    </div>
  );
};

export default BookmarksMainContent;
