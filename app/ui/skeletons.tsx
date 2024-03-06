export function BookSkeleton() {
  return (
    <div
      className={`rounded-md bg-white p-4 w-full shadow-sm flex justify-end gap-4 flex-row-reverse mb-2 sm:mb-0`}
    >
      <div className="sm:basis-2/3 flex grow flex-col">
        <div className="h-5 w-full mb-2 rounded-full bg-gray-300" />
        <div className="h-3 w-full mb-2 rounded-full bg-gray-200" />
        <div className="h-24 w-full rounded-md bg-gray-200" />
        <div className="flex flex-row justify-end mt-auto">
          <div className="rounded-full h-5 w-16 py-1 pl-4 pr-3 bg-[rgb(244,244,244)]" />
        </div>
      </div>
      <div className="min-w-[128px] sm:basis-1/3">
        <div className="w-[128px] h-[195px] bg-gray-300" />
      </div>
    </div>
  );
}

export function BooksSkeleton() {
  return (
    <>
      <div className="col-span-2 mb-2 h-5 w-24 rounded-full bg-gray-300 sm:mb-0" />
      <BookSkeleton />
      <BookSkeleton />
      <BookSkeleton />
      <BookSkeleton />
      <BookSkeleton />
      <BookSkeleton />
      <BookSkeleton />
      <BookSkeleton />
      <BookSkeleton />
      <BookSkeleton />
    </>
  );
}

export function BookDetailsSkeleton() {
  return (
    <div className="rounded-md bg-white p-4 w-full shadow-sm flex justify-end gap-4 md:gap-8 flex-col-reverse sm:flex-row-reverse">
      <div className="flex flex-col sm:basis-1/2 md:basis-2/3">
        <div className="h-5 w-full mb-2 rounded-full bg-gray-300" />
        <div className="h-3 w-full mb-2 rounded-full bg-gray-200" />
        <div className="h-3 w-full mb-2 rounded-full bg-gray-200" />
        <div className="h-48 w-full rounded-md bg-gray-200" />
      </div>
      <div className="sm:basis-1/2 md:basis-1/3 max-w-[384px] max-h-[500px]">
        <div className="w-full pt-[120%] bg-gray-300" />
      </div>
    </div>
  );
}
