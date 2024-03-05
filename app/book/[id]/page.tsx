"use client";

import useSWR from "swr";
import Image from "next/image";
import { bitter } from "@/app/ui/fonts";
import { fetcher } from "@/app/lib/fetcher";
import parse from "html-react-parser";

export default function Page({ params }: { params: { id: string } }) {
  const {
    data: result,
    isLoading,
    error,
  } = useSWR(`/${params.id}`, fetcher, {
    suspense: true,
    revalidateOnFocus: false,
  });

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;

  console.log(result);

  const { title, authors, imageLinks, description, subtitle } =
    result.volumeInfo;

  const authorList: string = authors ? authors.join(", ") : "Unknown Author";

  const imageLink: string =
    (imageLinks && (imageLinks.smallThumbnail || imageLinks.thumbnail)) || "";

  return (
    <div className="px-10 py-4">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="rounded-md bg-white p-4 w-full shadow-sm flex justify-end gap-4 md:gap-8 flex-col-reverse sm:flex-row-reverse">
          <div className="flex flex-col sm:basis-1/2 md:basis-2/3">
            <h1 className="text-3xl">{title}</h1>
            {subtitle && (
              <p className={`${bitter.className} italic`}>{subtitle}</p>
            )}
            <p
              className={`${bitter.className} my-2 text-lg`}
            >{`By: ${authorList}`}</p>
            {description && (
              <div className={`${bitter.className}`}>{parse(description)}</div>
            )}
          </div>
          <div className="sm:basis-1/2 md:basis-1/3">
            <Image
              src={`https://books.google.com/books/publisher/content/images/frontcover/${params.id}?fife=w384&source=gbs_api`}
              width={384}
              height={0}
              className="w-full h-auto"
              alt={`Cover image for ${title}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
