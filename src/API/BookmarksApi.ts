class BookmarksApi {
  private static instance: BookmarksApi | null = null;
  private bookmarksTree: chrome.bookmarks.BookmarkTreeNode[];
  private bookmarksResults: chrome.bookmarks.BookmarkTreeNode[];

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
  ): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
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
}

const bookmarksApi = BookmarksApi.getInstance();

export default bookmarksApi;
