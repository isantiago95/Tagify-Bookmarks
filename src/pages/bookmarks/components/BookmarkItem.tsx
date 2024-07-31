import React, { useContext } from 'react';
import { BookmarkItemProps } from '../../../interfaces/BookmarkProps';
import useBookmarks from '../../../hooks/useBookmarks';
import BookmarkListItems from './BookmarkListItems';
import { faviconUrl } from '../../../constants';
import folderIcon from '../../../assets/images/carpeta.png';
import { AppContext } from '../../../context/AppContext';

const BookmarkFolderIcon = () => (
  <img src={folderIcon} alt="folder icon" className="w-4 h-4 invert" />
);

const calculateIndent = (level: number) => {
  return level * 15;
};

const BookmarkItem: React.FC<BookmarkItemProps> = ({
  treeItem,
  level = 0,
  onlyFolders,
}) => {
  const { dispatch } = useContext(AppContext);
  const { fetchBookmarks } = useBookmarks();

  const handleFolderClick = () => {
    dispatch({ type: 'SET_SELECTED_TREE', payload: treeItem });
    const childUl = document.getElementById(treeItem.id);
    if (childUl) {
      childUl.classList.toggle('hidden');
      childUl.classList.toggle('flex');
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
    // Render folders if onlyFolders is true
    if (onlyFolders) {
      return (
        <li key={treeItem.id} className="list-none">
          <span
            onClick={handleFolderClick}
            className="flex gap-2 items-center py-2 pr-2 cursor-pointer font-semibold text-base hover:font-bold"
            style={{ paddingLeft: `${calculateIndent(level)}px` }}
          >
            <BookmarkFolderIcon />
            {treeItem.title}
          </span>

          <ul id={treeItem.id} className="hidden flex-col">
            <BookmarkListItems
              bookmarkTree={treeItem?.children ?? []}
              level={level + 1}
              onlyFolders={onlyFolders}
            />

            <div
              style={{ paddingLeft: `${calculateIndent(level)}px` }}
              className="flex py-2 pr-2 cursor-pointer font-semibold text-base hover:font-bold"
              onClick={handleNewFolderClick}
            >
              + New Folder
            </div>
          </ul>
        </li>
      );
    }
  } else {
    // Render bookmarks if onlyFolders is false
    if (!onlyFolders) {
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
    }
  }

  // Return null if the conditions are not met
  return null;
};

export default BookmarkItem;
