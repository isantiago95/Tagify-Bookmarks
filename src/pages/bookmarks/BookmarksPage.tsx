import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import BookmarkSidebar from './components/BookmarkSidebar';
import BookmarksMainContent from './components/BookmarksMainContent';
import Modal from './components/Modal';
import BookmarkForm from '../popup/components/BookmarkForm';

const Bookmarks = () => {
  const { state } = useContext(AppContext);

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

      {state.modalProps?.isOpen && state.selectedNode && (
        <Modal isOpen={state.modalProps?.isOpen}>
          <BookmarkForm currentTab={state.selectedNode} />
        </Modal>
      )}
    </div>
  );
};

export default Bookmarks;
