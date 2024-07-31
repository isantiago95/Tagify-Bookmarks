import BookmarkSidebar from './components/BookmarkSidebar';
import BookmarksMainContent from './components/BookmarksMainContent';

const Bookmarks = () => {
  return (
    <div className="w-screen h-screen flex flex-row text-slate-100 bg-slate-900 overflow-auto">
      {/* Sidebar */}
      <div className="w-1/4 min-h-screen bg-slate-800 p-5 pl-0">
        <BookmarkSidebar />
      </div>

      {/* Main Content */}
      <div className="w-3/4 min-h-screen flex flex-col justify-start p-5">
        <BookmarksMainContent />
      </div>
    </div>
  );
};

export default Bookmarks;
