import React from 'react';
import bookmarksApi from '../API/BookmarksApi';

const useBookmarks = () => {
  const [bookmarkTree, setBookmarkTree] = React.useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const [bookmarksResults, setBookmarksResults] = React.useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  React.useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    const bookmarksTree = await bookmarksApi.getBookmarksTree();
    setBookmarkTree(bookmarksTree);
  };

  const searchBookmark = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const results = await bookmarksApi.getBookmarksTree(target.value);
    setBookmarksResults(results);
  };

  const calculateIndent = (level: number) => {
    return level * 15;
  };

  return {
    bookmarkTree,
    bookmarksResults,
    fetchBookmarks,
    searchBookmark,
    calculateIndent,
  };
};

export default useBookmarks;
