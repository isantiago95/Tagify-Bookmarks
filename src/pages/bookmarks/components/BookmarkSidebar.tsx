import BookmarkListItems from './BookmarkListItems';
import chromeLogo from '../../../assets/images/chrome-dark.png';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

const BookmarkSidebar = () => {
  const { state } = useContext(AppContext);

  return (
    <div>
      <div className="flex gap-4 justify-start items-center mb-10">
        <img src={chromeLogo} alt="chrome logo" className="w-8 invert" />
        <h1 className="text-2xl font-semibold">Bookmarks</h1>
      </div>

      <BookmarkListItems bookmarkTree={state.bookmarkTree} onlyFolders />
    </div>
  );
};

export default BookmarkSidebar;
