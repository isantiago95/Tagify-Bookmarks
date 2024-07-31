import { useState, useRef, useEffect } from 'react';
import ContextMenu from '../pages/bookmarks/components/ContextMenu';

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

export interface ContextMenuRef {
  current: HTMLDivElement | null;
}

const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef<ContextMenuRef['current']>(null);

  const handleContextMenuClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const menuWidth = contextMenuRef.current?.offsetWidth || 230;
    const menuHeight = contextMenuRef.current?.offsetHeight || 150;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX;
    let y = event.clientY;

    // Check if there is enough space to the right
    if (event.clientX + menuWidth > viewportWidth) {
      x = event.clientX - menuWidth; // Open to the left
    }

    // Check if there is enough space below
    if (event.clientY + menuHeight > viewportHeight) {
      y = event.clientY - menuHeight; // Open above
    }

    setContextMenu({
      visible: true,
      x,
      y,
    });
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      contextMenuRef.current &&
      !contextMenuRef.current.contains(event.target as Node)
    ) {
      setContextMenu({ visible: false, x: 0, y: 0 });
    }
  };

  useEffect(() => {
    if (contextMenu.visible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu.visible]);

  return {
    contextMenu,
    contextMenuRef,
    handleContextMenuClick,
    ContextMenu: () => (
      <ContextMenu contextMenu={contextMenu} contextMenuRef={contextMenuRef} />
    ),
  };
};

export default useContextMenu;
