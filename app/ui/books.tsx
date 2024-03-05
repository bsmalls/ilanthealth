import { Book, BookSearchResults } from '@/app/lib/definitions';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';

export default function BookCardsWrapper({
    results, 
    error, 
    isLoading
} : {
    results: BookSearchResults | null; 
    error: string | null; 
    isLoading: boolean;
}) {
    console.log(results?.totalItems)
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 px-10 py-6 gap-4">
            {error && <div>Error: {error}</div>}
            {isLoading &&<p>Loading...</p>}
            {!results && null}
            {results?.totalItems === 0 && <p>No results found.</p>}
            {results?.items?.length && (
                results.items.map((book:Book) => (
                    <BookCard key={book.id} book={book} />
                ))
            )}
        </div>
    );
}

function BookCard({
    book
}:{
    book:Book
}) {
    const { title, authors, imageLinks } = book.volumeInfo;
    
    const authorList: string = authors ? authors.join(', ') : 'Unknown Author';
    const imageLink: string = imageLinks && (imageLinks.smallThumbnail || imageLinks.thumbnail) || '';

    return (
        <div key={book.id} className="rounded-md bg-white p-4 w-full shadow-sm flex justify-end gap-4 flex-row-reverse">
            <div className="basis-2/3 flex flex-col">
                <h3 className="text-xl">{title}</h3>
                <p className={`${lusitana.className} my-2`}>
                    {`By: ${authorList}`}
                </p>
            </div>
            <div className="basis-1/3">
                <Image 
                    src={imageLink}
                    width={128}
                    height={195}
                    className=""
                    alt={`Cover image for ${title}`}
                />
            </div>
        </div>
    );
}