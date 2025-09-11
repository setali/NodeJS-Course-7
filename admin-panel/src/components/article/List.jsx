import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import request from "../../tools/request";
import { Table } from "antd";
import { useState } from "react";
import { Link } from "react-router";
import { DeleteFilled, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

async function getArticles(page) {
  const { data } = await request("/api/article", { params: { page } });
  return data;
}

function useArticles(page) {
  return useQuery({
    queryKey: ["articles", page],
    queryFn: () => getArticles(page),
    initialData: { items: [], total: 0, page: 1, limit: 3 },
  });
}

export default function List() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useArticles(page);

  const { mutateAsync: removeArticle } = useMutation({
    mutationKey: ["remove-article"],
    mutationFn: (id) => request.delete(`/api/article/${id}`),
  });

  const COLUMNS = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "user",
      key: "user",
      render: (el) => el.username,
    },
    {
      dataIndex: "id",
      key: "action",
      render: (el) => (
        <div>
          <Link to={`/article/${el}`}>
            <EyeOutlined />
          </Link>
          <Popconfirm
            title="Delete the article"
            description="Are you sure"
            onConfirm={() => {
              removeArticle(el).then(refetch);
            }}
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Link to={"/article/add"}>Create Article</Link>

      <Table
        dataSource={data.items}
        loading={isLoading}
        columns={COLUMNS}
        rowKey={"id"}
        onChange={({ current }) => setPage(current)}
        pagination={{
          total: data.totals,
          current: data.page,
          pageSize: data.limit,
        }}
      />
    </div>
  );
}
