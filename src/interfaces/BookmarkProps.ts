export interface ContextMenuOptions {
  name?: string;
  type: 'item' | 'separator';
  onClick?: (bookmark: BookmarkTreeNodeProps) => void;
}

interface BookmarkLevelProps {
  level?: number;
  onlyFolders?: boolean;
  contextMenuOptions?: ContextMenuOptions[];
}

export interface BookmarkBookmarkItemsProps extends BookmarkLevelProps {
  bookmarkTree: chrome.bookmarks.BookmarkTreeNode[];
}

export interface BookmarkItemProps extends BookmarkLevelProps {
  treeItem: chrome.bookmarks.BookmarkTreeNode;
}

export interface CurrentTabProps {
  title?: string;
  url?: string;
  favIconUrl?: string;
}

export interface BookmarkTreeNodeProps
  extends chrome.bookmarks.BookmarkTreeNode {}

export interface ExtendedBookmarkTreeNode extends BookmarkTreeNodeProps {
  url?: string;
  favIconUrl?: string;
  [key: string]: unknown | string;
}
