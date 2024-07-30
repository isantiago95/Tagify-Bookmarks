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

  public async create({
    parentId = '0',
    title,
    url,
  }: BookmarkTreeNodeProps): Promise<BookmarkTreeNodeProps> {
    return new Promise((resolve) => {
      chrome.bookmarks.create({ parentId, title, url }, resolve);
    });
  }

  public async update(
    id: string,
    { title, url }: chrome.bookmarks.BookmarkChangesArg
  ): Promise<BookmarkTreeNodeProps> {
    return new Promise((resolve) => {
      chrome.bookmarks.update(id, { title, url }, resolve);
    });
  }
}

const bookmarksApi = BookmarksApi.getInstance();

export default bookmarksApi;
