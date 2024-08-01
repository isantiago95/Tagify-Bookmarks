import React from 'react';
import {
  ContextMenuRef,
  ContextMenuState,
} from '../../../hooks/useContextMenu';
import {
  BookmarkTreeNodeProps,
  ContextMenuOptions,
} from '../../../interfaces/BookmarkProps';

export interface ContextMenuProps {
  contextMenu: ContextMenuState;
  contextMenuRef: ContextMenuRef;
  bookmark: BookmarkTreeNodeProps;
  options: ContextMenuOptions[];
  onClick: () => void;
}

const ContextMenu = ({
  contextMenu,
  contextMenuRef,
  bookmark,
  options,
  onClick,
}: ContextMenuProps) => {
  React.useEffect(() => {
    console.log(options);
  }, [options]);

  const handleClick = (
    callback?: (bookmark: BookmarkTreeNodeProps) => void
  ) => {
    callback?.(bookmark);
    onClick();
  };

  return (
    <div
      ref={contextMenuRef}
      className="absolute bg-slate-800 shadow-md rounded-md"
      style={{ top: contextMenu.y, left: contextMenu.x }}
    >
      <ul>
        {options?.map((option, idx) => {
          if (option.type === 'separator') {
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
              onClick={() => handleClick(option.onClick)}
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
