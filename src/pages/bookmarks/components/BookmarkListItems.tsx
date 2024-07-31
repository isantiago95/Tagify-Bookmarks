import React from 'react';
import { BookmarkBookmarkItemsProps } from '../../../interfaces/BookmarkProps';
import BookmarkItem from './BookmarkItem';

const BookmarkListItems: React.FC<BookmarkBookmarkItemsProps> = ({
  bookmarkTree,
  level = 0,
  onlyFolders = false,
  contextMenuOptions,
}) => {
  return (
    <ul
      className={`${onlyFolders ? '' : 'w-4/5 shadow-2xl border border-slate-800 rounded-lg'}`}
    >
      {bookmarkTree?.map((treeItem) => (
        <BookmarkItem
          key={treeItem.id}
          treeItem={treeItem}
          level={level}
          onlyFolders={onlyFolders}
          contextMenuOptions={contextMenuOptions}
        />
      ))}
    </ul>
  );
};

export default BookmarkListItems;
