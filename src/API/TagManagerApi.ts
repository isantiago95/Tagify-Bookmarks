class TagManagerApi {
  private static instance: TagManagerApi;
  private tags: { [tagName: string]: { bookmarkIds: number[] } };

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.tags = {};
  }

  // Static method to get the single instance of the class
  public static getInstance(): TagManagerApi {
    if (!TagManagerApi.instance) {
      TagManagerApi.instance = new TagManagerApi();
    }
    return TagManagerApi.instance;
  }

  public getTags(searchTerm?: string): Promise<string[]> {
    return new Promise((resolve) => {
      if (searchTerm) {
        resolve(
          Object.keys(this.tags).filter((tag) => tag.includes(searchTerm))
        );
      } else {
        resolve(Object.keys(this.tags));
      }
    });
  }

  // Method to add a bookmark ID to a tag
  public addBookmarkToTag(tagName: string, bookmarkId: number): void {
    if (!this.tags[tagName]) {
      this.tags[tagName] = { bookmarkIds: [] };
    }
    this.tags[tagName].bookmarkIds.push(bookmarkId);
  }

  // Method to get bookmarks by tag
  public getBookmarksByTag(tagName: string): number[] | undefined {
    return this.tags[tagName]?.bookmarkIds;
  }
}

const tagManager = TagManagerApi.getInstance();

export default tagManager;
