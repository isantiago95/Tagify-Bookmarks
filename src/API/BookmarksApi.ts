import {
  BookmarkTreeNodeProps,
  ExtendedBookmarkTreeNode,
} from '../interfaces/BookmarkProps';

class BookmarksApi {
  private static instance: BookmarksApi | null = null;
  private bookmarksTree: BookmarkTreeNodeProps[];
  private bookmarksResults: BookmarkTreeNodeProps[];

  private constructor() {
    this.bookmarksTree = [];
    this.bookmarksResults = [];
  }

  public static getInstance(): BookmarksApi {
    if (this.instance === null) {
      this.instance = new BookmarksApi();
    }
    return this.instance;
  }

  public getCurrentTab(): Promise<{
    title?: string;
    url?: string;
    favIconUrl?: string;
  }> {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const { title, url, favIconUrl } = tabs[0];
        resolve({ title, url, favIconUrl });
      });
    });
  }

  public async getBookmarksTree(
    searchTerm?: string
  ): Promise<BookmarkTreeNodeProps[]> {
    return new Promise((resolve) => {
      if (!searchTerm) {
        chrome.bookmarks.getTree((bookmarks) => {
          this.bookmarksTree = bookmarks[0].children ?? [];
          resolve(this.bookmarksTree);
        });
        return;
      }

      chrome.bookmarks.search(searchTerm, (results) => {
        this.bookmarksResults = results;
        resolve(this.bookmarksResults);
      });
      return;
    });
  }

  public async createOrUpdate(
    bookmark: ExtendedBookmarkTreeNode
  ): Promise<BookmarkTreeNodeProps> {
    const { id, ...rest } = bookmark;
    if (id) return await this.update(id, rest);

    return await this.create(bookmark);
  }

  public async create(
    bookmark: BookmarkTreeNodeProps
  ): Promise<BookmarkTreeNodeProps> {
    const { parentId, title, url } = bookmark;
    return new Promise((resolve) => {
      chrome.bookmarks.create({ parentId, title, url }, (bookmark) =>
        resolve(bookmark)
      );
    });
  }

  public async update(
    id: string,
    bookmark: chrome.bookmarks.BookmarkChangesArg
  ): Promise<BookmarkTreeNodeProps> {
    const { title, url } = bookmark;
    return new Promise((resolve) => {
      chrome.bookmarks.update(id, { title, url }, (bookmark) =>
        resolve(bookmark)
      );
    });
  }

  public async remove(id: string): Promise<void> {
    return new Promise((resolve) => {
      chrome.bookmarks.remove(id, resolve);
    });
  }

  public openInNewTab(url: string): void {
    chrome.tabs.create({ url });
  }

  public openInNewWindow(url: string): void {
    chrome.windows.create({ url });
  }

  public openInIncognito(url: string): void {
    chrome.windows.create({ url, incognito: true });
  }
}

const bookmarksApi = BookmarksApi.getInstance();

export default bookmarksApi;
