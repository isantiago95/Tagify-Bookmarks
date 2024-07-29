interface BookmarkLevelProps {
  level?: number;
}

export interface BookmarkBookmarkItemsProps extends BookmarkLevelProps {
  bookmarkTree: chrome.bookmarks.BookmarkTreeNode[];
}

export interface BookmarkItemProps extends BookmarkLevelProps {
  treeItem: chrome.bookmarks.BookmarkTreeNode;
}

export interface FormPopupFormProps {
  currentTab: {
    title?: string;
    url?: string;
    favIconUrl?: string;
  };
}
