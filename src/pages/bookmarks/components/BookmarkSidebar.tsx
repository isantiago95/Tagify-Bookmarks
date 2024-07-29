import BookmarkListItems from './BookmarkListItems';
import chromeLogo from '../../../assets/images/chrome-dark.png';
import useBookmarks from '../../../hooks/useBookmarks';

const BookmarkSidebar = () => {
  const { bookmarkTree } = useBookmarks();

  return (
    <div>
      <div className="flex gap-4 justify-start items-center mb-10">
        <img src={chromeLogo} alt="chrome logo" className="w-10 invert" />
        <h1 className="text-2xl font-semibold">Bookmarks</h1>
      </div>

      <BookmarkListItems bookmarkTree={bookmarkTree} />
    </div>
  );
};

export default BookmarkSidebar;
