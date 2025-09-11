import React from "react";
import request from "../../tools/request";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

async function getArticle(id) {
  const { data } = await request("/api/article/" + id);
  return data;
}

function useArticle(id) {
  return useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticle(id),
    initialData: {},
  });
}

export default function Show() {
  const { id } = useParams();

  const { data, isLoading } = useArticle(id);

  if (isLoading) {
    return "Loading ...";
  }

  return (
    <div>
      <div>title: {data.title}</div>
      <div>author: {data.user?.username}</div>
      <img src={`${import.meta.env.VITE_BASE_URL}/${data.image}`} />
    </div>
  );
}
