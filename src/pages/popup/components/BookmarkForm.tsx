import React from 'react';
import tagManager from '../../../API/TagManagerApi';
import useForm from '../../../hooks/useForm';
import bookmarksApi from '../../../API/BookmarksApi';
import {
  CurrentTabProps,
  ExtendedBookmarkTreeNode,
} from '../../../interfaces/BookmarkProps';

interface BookmarkFormProps {
  currentTab: CurrentTabProps;
}

const searchMethod = async (query: string): Promise<string[]> =>
  await tagManager.getTags(query);

const BookmarkForm = ({
  currentTab,
}: BookmarkFormProps | ExtendedBookmarkTreeNode) => {
  const {
    updateArray,
    handleChange,
    handleSubmit,
    loading,
    resetResults,
    resetValue,
    searchResults,
    values,
  } = useForm({
    initialValues: {
      ...(currentTab as ExtendedBookmarkTreeNode),
      searchTag: '',
    },
    searchMethod,
    onSubmit: async (values) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { tags, searchTag, ...rest } = values;

      const response = await bookmarksApi.createOrUpdate(rest);
      await tagManager.syncBookmarkToTags(tags as string[], response.id);

      window.close();
    },
  });

  const [focusedIndex, setFocusedIndex] = React.useState(-1);

  const saveSelectedTag = (
    e: React.KeyboardEvent<HTMLDivElement>,
    selected: string
  ) => {
    e.preventDefault();
    resetValue('searchTag');
    updateArray('tags', selected, 'add');
    resetResults();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const searchTag = (values.searchTag as string).trim();
    if (event.key === 'Tab' && searchTag) {
      saveSelectedTag(event, searchTag);
    } else if (event.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) =>
        prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === 'Enter' && focusedIndex >= 0) {
      saveSelectedTag(event, searchResults[focusedIndex]);
      setFocusedIndex(-1);
    }
  };

  const handleRemoveBookmark = async () => {
    await tagManager.removeBookmarkFromTags(values.id as string);
    await bookmarksApi.remove(values.id as string);
    window.close();
  };

  React.useEffect(() => {
    setFocusedIndex(-1); // Reset focus when search results change
  }, [searchResults]);

  return (
    <div className="flex flex-col gap-3 py-2">
      <h3 className="text-lg font-semibold">Edit Bookmark</h3>

      <form className="space-y-4 min-w-max" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-4 items-center">
          <label htmlFor="title" className="w-1/4">
            Name
          </label>
          <input
            name="title"
            type="text"
            placeholder="Bookmark Name"
            className="w-auto p-1 border border-gray-300 rounded text-slate-800 text-sm"
            value={values.title}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-between gap-4 items-center">
          <label htmlFor="searchTag" className="w-1/4">
            Tags
          </label>

          <div>
            <input
              name="searchTag"
              type="search"
              placeholder="Add tag"
              className="w-auto p-1 border border-gray-300 rounded text-slate-800 text-sm"
              value={values.searchTag as string}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {loading && <p className="text-sm mt-2">Loading...</p>}
            {(values.searchTag as string) && searchResults.length > 0 && (
              <div className="relative">
                <div className="absolute w-full bg-white border text-slate-800 border-gray-300 rounded mt-2 z-10">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-2 cursor-pointer hover:bg-gray-100 ${
                        index === focusedIndex ? 'bg-gray-300' : ''
                      }`}
                      onClick={() => {
                        updateArray('tags', result, 'add');
                        resetResults();
                      }}
                    >
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between flex-wrap-reverse gap-2 max-h-24 overflow-y-scroll scrollbar-thin">
          {(values.tags as string[])?.map((tag, index) => (
            <div
              className="bg-blue-light pl-3 pr-1 py-1 blue-dark rounded-full text-sm flex gap-2"
              key={index}
            >
              <span>{tag}</span>
              <input
                type="button"
                value="x"
                onClick={() => updateArray('tags', tag, 'remove')}
                className="cursor-pointer text-sm text-slate-100 bg-red-700 px-2 rounded-full"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 items-center">
          <button
            type="button"
            onClick={handleRemoveBookmark}
            className="w-24 px-3 py-2 rounded-full bg-blue-dark blue-light text-base"
          >
            Remove
          </button>
          <button
            type="submit"
            className="w-24 px-3 py-2 rounded-full bg-blue-light blue-dark text-base"
          >
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookmarkForm;
