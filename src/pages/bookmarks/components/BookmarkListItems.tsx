import React from 'react';
import { BookmarkBookmarkItemsProps } from '../../../interfaces/BookmarkProps';
import BookmarkItem from './BookmarkItem';

const BookmarkListItems: React.FC<BookmarkBookmarkItemsProps> = ({
  bookmarkTree,
  level = 0,
  onlyFolders = false,
}) => {
  return (
    <>
      {bookmarkTree?.map((treeItem) => (
        <BookmarkItem
          key={treeItem.id}
          treeItem={treeItem}
          level={level}
          onlyFolders={onlyFolders}
        />
      ))}
    </>
  );
};

export default BookmarkListItems;
