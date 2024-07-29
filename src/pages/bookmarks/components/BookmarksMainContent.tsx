import useBookmarks from '../../../hooks/useBookmarks';
import BookmarkListItems from './BookmarkListItems';

const BookmarksMainContent = () => {
  const { bookmarksResults, searchBookmark } = useBookmarks();

  return (
    <div className="flex flex-col gap-3">
      <input
        onChange={searchBookmark}
        type="text"
        placeholder="Search your bookmarks"
        className="w-full text-slate-100 p-3 bg-slate-950 rounded-full text-base mb-4"
      />

      <div>
        {bookmarksResults.length === 0 ? (
          <h3 className="text-slate-100 text-center text-2xl">
            No bookmarks found
          </h3>
        ) : (
          <BookmarkListItems bookmarkTree={bookmarksResults} />
        )}
      </div>
    </div>
  );
};

export default BookmarksMainContent;
