"use client";

import { getNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import css from "./NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import Loader from "../loading";
import Error from "./error";

function NotesClient() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => getNotes(debouncedQuery, page),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

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

  // if (isLoading) return <Loader />;
  // if (isError || !data) return <Error error={error} />;

  return (
    <>
      <div className={css.app}>
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
        {isError && <Error error={error} />}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
    </>
  );
}

export default NotesClient;
