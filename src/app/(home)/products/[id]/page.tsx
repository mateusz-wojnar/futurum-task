import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div>
      <p>{id}</p>
    </div>
  );
};

export default Page;
