import React from 'react';
import { BookmarkItemProps } from '../../../interfaces/BookmarkProps';
import useBookmarks from '../../../hooks/useBookmarks';
import BookmarkListItems from './BookmarkListItems';
import { faviconUrl } from '../../../contants';

const BookmarkItem: React.FC<BookmarkItemProps> = ({ treeItem, level = 0 }) => {
  const { fetchBookmarks, calculateIndent } = useBookmarks();

  const handleFolderClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const childUl = document.getElementById(treeItem.id);
    const targetElement = e.target as HTMLElement;
    if (childUl) {
      childUl.classList.toggle('hidden');
      childUl.classList.toggle('flex');
      if (childUl.classList.contains('flex')) {
        targetElement.innerHTML = `📂 ${treeItem.title}`;
      } else {
        targetElement.innerHTML = `📁 ${treeItem.title}`;
      }
    }
  };

  const handleNewFolderClick = () => {
    const folderName = prompt('Enter folder name');
    if (folderName) {
      chrome.bookmarks.create(
        {
          parentId: treeItem.id,
          title: folderName,
        },
        fetchBookmarks
      );
    }
  };

  if (treeItem.children) {
    return (
      <li key={treeItem.id} className="list-none">
        <span
          onClick={handleFolderClick}
          className="flex py-2 pr-2 cursor-pointer font-semibold border-b text-base hover:font-bold"
          style={{ paddingLeft: `${calculateIndent(level)}px` }}
        >
          📁 {treeItem.title}
        </span>

        <ul id={treeItem.id} className="hidden flex-col">
          <BookmarkListItems
            bookmarkTree={treeItem?.children ?? []}
            level={level + 1}
          />

          <div
            style={{ paddingLeft: `${calculateIndent(level)}px` }}
            className="flex py-2 pr-2 cursor-pointer font-semibold border-b text-base hover:font-bold"
            onClick={handleNewFolderClick}
          >
            + New Folder
          </div>
        </ul>
      </li>
    );
  }

  return (
    <li key={treeItem.id} className="text-slate-100 text-base list-none">
      <a
        style={{ paddingLeft: `${calculateIndent(level)}px` }}
        href={treeItem.url}
        target="_blank"
        className="flex justify-start items-center gap-2"
      >
        <img
          src={`${faviconUrl}${treeItem.url}`}
          alt={`favicon of ${treeItem.title}`}
          className="w-4 h-4"
        />
        {treeItem.title}
      </a>
    </li>
  );
};

export default BookmarkItem;
