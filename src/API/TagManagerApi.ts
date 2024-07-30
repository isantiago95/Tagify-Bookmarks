/* eslint-disable no-async-promise-executor */

interface TagsProps {
  [tagName: string]: { bookmarks: string[] };
}
class TagManagerApi {
  private static instance: TagManagerApi;
  private tags: TagsProps;

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.init();
    this.tags = {};
  }

  // Static method to get the single instance of the class
  public static getInstance(): TagManagerApi {
    if (!TagManagerApi.instance) {
      TagManagerApi.instance = new TagManagerApi();
    }
    return TagManagerApi.instance;
  }

  private async init(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.get('tags', (data) => {
        this.tags = data.tags || {};
        resolve();
      });
    });
  }

  private async syncTags(): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ tags: this.tags }, () => {
        resolve();
      });
    });
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

  public async syncBookmarkToTags(
    tags: string[],
    bookmarkId: string
  ): Promise<TagsProps> {
    return new Promise(async (resolve) => {
      // Remove bookmarkId from tags not in the given array
      Object.keys(this.tags).forEach((tagName) => {
        if (!tags.includes(tagName)) {
          const index = this.tags[tagName].bookmarks.indexOf(bookmarkId);
          if (index > -1) {
            this.tags[tagName].bookmarks.splice(index, 1);
          }
        }
      });

      // Add bookmarkId to the given tags
      tags.forEach((tagName) => {
        if (!this.tags[tagName]) {
          this.tags[tagName] = { bookmarks: [] };
        }
        this.tags[tagName].bookmarks.push(bookmarkId);
        this.tags[tagName].bookmarks = [
          ...new Set(this.tags[tagName].bookmarks),
        ];
      });

      // Convert Sets back to arrays
      Object.keys(this.tags).forEach((tagName) => {
        this.tags[tagName].bookmarks = Array.from(this.tags[tagName].bookmarks);
      });

      await this.syncTags();
      resolve(this.tags);
    });
  }

  public async getTagsByBookmarkId(bookmarkId: string): Promise<string[]> {
    return new Promise((resolve) => {
      const tags = Object.keys(this.tags).filter((tag) =>
        this.tags[tag].bookmarks.includes(bookmarkId)
      );
      resolve(tags);
    });
  }

  // Method to get bookmarks by tag
  public getBookmarksByTag(tagName: string): string[] | undefined {
    return this.tags[tagName]?.bookmarks;
  }
}

const tagManager = TagManagerApi.getInstance();

export default tagManager;
