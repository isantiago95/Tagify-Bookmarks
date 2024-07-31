import React from 'react';
import bookmarksApi from '../../../API/BookmarksApi';
import {
  ContextMenuRef,
  ContextMenuState,
} from '../../../hooks/useContextMenu';
import { BookmarkTreeNodeProps } from '../../../interfaces/BookmarkProps';

export interface ContextMenuProps {
  contextMenu: ContextMenuState;
  contextMenuRef: ContextMenuRef;
  bookmark: BookmarkTreeNodeProps;
}

const options = [
  {
    name: 'Edit',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Edit clicked: ', bookmark);
    },
  },
  {
    name: 'Delete',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Delete clicked: ', bookmark);
    },
  },
  { name: 'separator' },
  {
    name: 'Cut',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Cut clicked: ', bookmark);
    },
  },
  {
    name: 'Copy',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Copy clicked: ', bookmark);
    },
  },
  { name: 'separator' },
  {
    name: 'Open in new tab',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Open in new tab clicked: ', bookmark);
      bookmarksApi.openInNewTab(bookmark?.url ?? '');
    },
  },
  {
    name: 'Open in new window',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Open in new tab clicked: ', bookmark);
      bookmarksApi.openInNewWindow(bookmark?.url ?? '');
    },
  },
  {
    name: 'Open in incognito window',
    onClick: (bookmark: BookmarkTreeNodeProps) => {
      console.log('Option Open in new tab clicked: ', bookmark);
      bookmarksApi.openInIncognito(bookmark?.url ?? '');
    },
  },
];

const ContextMenu = ({
  contextMenu,
  contextMenuRef,
  bookmark,
}: ContextMenuProps) => {
  React.useEffect(() => {
    console.log(bookmark);
  }, []);

  return (
    <div
      ref={contextMenuRef}
      className="absolute bg-slate-800 shadow-md rounded-md "
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <ul>
        {options.map((option, idx) => {
          if (option.name === 'separator') {
            return (
              <li
                key={`${option.name}#${idx}`}
                className="h-0.5 bg-slate-700"
              />
            );
          }

          return (
            <li
              key={option.name}
              className="text-slate-100 py-2 px-6 cursor-pointer hover:bg-slate-700"
              onClick={() => option.onClick && option.onClick(bookmark)}
            >
              {option.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContextMenu;
