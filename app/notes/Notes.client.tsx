"use client";

import { getNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import css from "./NotesPage.module.css";
import { useParams } from "next/navigation";

function NotesClient() {
  const [query, setQuery] = useState<string>("");
  //   const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const { page } = useParams<{ page: string }>();

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => getNotes(debouncedQuery, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log(data);

  useEffect(() => {
    if (isSuccess && data?.notes?.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data, isSuccess]);

  function handleQuery(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      {/* <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox setQuery={handleQuery} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              setPage={setPage}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
      </div>
      <main>
        {isLoading && <Loader />}
        {isError && <ErrorMessage error={error?.message} />}
        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main> */}
    </>
  );
}

export default NotesClient;
