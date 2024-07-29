import React from 'react';
import { BookmarkBookmarkItemsProps } from '../../../interfaces/BookmarkProps';
import BookmarkItem from './BookmarkItem';

const BookmarkListItems: React.FC<BookmarkBookmarkItemsProps> = ({
  bookmarkTree,
  level = 0,
}) => {
  return (
    <>
      {bookmarkTree?.map((treeItem) => (
        <BookmarkItem key={treeItem.id} treeItem={treeItem} level={level} />
      ))}
    </>
  );
};

export default BookmarkListItems;
