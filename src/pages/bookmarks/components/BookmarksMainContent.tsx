import BookmarkListItems from './BookmarkListItems';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../../context/AppContext';

const BookmarksMainContent = () => {
  const { state } = useContext(AppContext);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="flex flex-col gap-3">
      <input
        // onChange={searchBookmark}
        type="text"
        placeholder="Search your bookmarks"
        className="w-full text-slate-100 p-3 bg-slate-950 rounded-full text-base mb-4"
      />

      <div>
        {state.selectedTree && (
          <BookmarkListItems bookmarkTree={state.selectedTree.children ?? []} />
        )}
      </div>
    </div>
  );
};

export default BookmarksMainContent;
