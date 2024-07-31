import React, { useContext } from 'react';
import { BookmarkItemProps } from '../../../interfaces/BookmarkProps';
import BookmarkListItems from './BookmarkListItems';
import { faviconUrl } from '../../../constants';
import folderIcon from '../../../assets/images/carpeta.png';
import arrowIcon from '../../../assets/images/right-arrow.png';
import menuIcon from '../../../assets/images/menu.png';
import { AppContext } from '../../../context/AppContext';
import useContextMenu from '../../../hooks/useContextMenu';

const calculateIndent = (level: number): number => {
  return level * 15;
};

const BookmarkItem: React.FC<BookmarkItemProps> = ({
  treeItem,
  level = 0,
  onlyFolders,
}) => {
  const { state, dispatch } = useContext(AppContext);
  const { handleContextMenuClick, ContextMenu, contextMenu } = useContextMenu();

  const handleFolderClick = () => {
    dispatch({ type: 'SET_SELECTED_TREE', payload: treeItem });

    const childUl = document.getElementById(`children#${treeItem.id}`);

    // Toggle visibility of child elements
    childUl?.classList.toggle('hidden');
    childUl?.classList.toggle('flex');
  };

  // TODO: Implement this feature
  // const handleNewFolderClick = () => {
  //   const folderName = prompt('Enter folder name');
  //   if (folderName) {
  //     chrome.bookmarks.create(
  //       {
  //         parentId: treeItem.id,
  //         title: folderName,
  //       },
  //       fetchBookmarks
  //     );
  //   }
  // };

  if (treeItem.children) {
    // Render folders if onlyFolders is true
    if (onlyFolders) {
      const classes =
        state.selectedTree?.id === treeItem.id
          ? 'text-slate-800 bg-blue-light rounded-r-full'
          : 'hover:bg-gray-700 hover:rounded-r-full';

      const iconClasses =
        state.selectedTree?.id === treeItem.id ? '' : 'invert';

      const basePadding = 3; // base padding in rem
      const additionalPadding = 1; // additional padding per level in rem
      const paddingLeft =
        basePadding + (level > 1 ? (level - 1) * additionalPadding : 0);

      const style =
        level > 0 ? { paddingLeft: `${calculateIndent(paddingLeft)}px` } : {};

      return (
        <li key={`folder#${treeItem.id}`} className="list-none">
          <span
            onClick={handleFolderClick}
            className={`flex gap-2 items-center pl-5 py-2 cursor-pointer text-base ${classes}`}
            style={style}
          >
            {treeItem?.children.some(
              (child) => child?.children?.length ?? 0 > 0
            ) && (
              <img
                src={arrowIcon}
                alt="arrow icon"
                className={`w-2 h-2 ${iconClasses}`}
              />
            )}
            <img
              src={folderIcon}
              alt="folder icon"
              className={`w-4 h-4 ${iconClasses}`}
            />
            {treeItem.title}
          </span>

          <ul id={`children#${treeItem.id}`} className="hidden flex-col">
            <BookmarkListItems
              bookmarkTree={treeItem?.children ?? []}
              level={level + 1}
              onlyFolders={onlyFolders}
            />
          </ul>
        </li>
      );
    }
  } else {
    // Render bookmarks if onlyFolders is false
    if (!onlyFolders) {
      return (
        <li
          key={treeItem.id}
          className="flex justify-between items-center text-slate-100 text-base list-none px-4 py-3 border-y border-slate-800"
        >
          <div className="flex gap-3 items-center">
            <img
              src={`${faviconUrl}${treeItem.url}`}
              alt={`favicon of ${treeItem.title}`}
              className="w-4 h-4"
            />
            {treeItem.title}
          </div>
          <div>
            <img
              src={menuIcon}
              alt="menu"
              className="w-5 h-5 cursor-pointer"
              onClick={handleContextMenuClick}
            />
            {contextMenu?.visible && <ContextMenu />}
          </div>
        </li>
      );
    }
  }

  // Return null if the conditions are not met
  return null;
};

export default BookmarkItem;
