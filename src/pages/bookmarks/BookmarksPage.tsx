import BookmarkSidebar from './components/BookmarkSidebar';
import BookmarksMainContent from './components/BookmarksMainContent';

const Bookmarks = () => {
  return (
    <div className="w-screen h-screen flex flex-row text-slate-100 bg-slate-900">
      {/* Sidebar */}
      <div className="w-1/3 min-h-screen bg-slate-800 p-5">
        <BookmarkSidebar />
      </div>

      {/* Main Content */}
      <div className="w-2/3 min-h-screen flex flex-col justify-start p-5">
        <BookmarksMainContent />
      </div>
    </div>
  );
};

export default Bookmarks;
