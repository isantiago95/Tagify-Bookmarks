import {
  ContextMenuRef,
  ContextMenuState,
} from '../../../hooks/useContextMenu';

interface ContextMenuProps {
  contextMenu: ContextMenuState;
  contextMenuRef: ContextMenuRef;
}

const options = [
  { name: 'Edit', onClick: () => console.log('Option Edit clicked') },
  { name: 'Delete', onClick: () => console.log('Option Delete clicked') },
  { name: 'separator' },
  { name: 'Cut', onClick: () => console.log('Option Cut clicked') },
  { name: 'Copy', onClick: () => console.log('Option Copy clicked') },
  { name: 'separator' },
  {
    name: 'Open in new tab',
    onClick: () => console.log('Option Open in new tab clicked'),
  },
  {
    name: 'Open in new window',
    onClick: () => console.log('Option Open in new window clicked'),
  },
  {
    name: 'Open in incognito window',
    onClick: () => console.log('Option Open in incognito window clicked'),
  },
];

const ContextMenu = ({ contextMenu, contextMenuRef }: ContextMenuProps) => {
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
              onClick={option.onClick}
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
