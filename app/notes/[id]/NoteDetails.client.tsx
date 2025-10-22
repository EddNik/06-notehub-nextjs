"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import ErrorMessage from "./error";
import Loader from "@/app/loading";

function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (error || !data) return <ErrorMessage error={error} />;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{data.createdAt}</p>
      </div>
    </div>
  );
}

export default NoteDetailsClient;
