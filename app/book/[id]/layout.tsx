import Header from '@/app/ui/header';

export default function Layout({children}: {children:React.ReactNode}) {
    return (
        <div className='flex flex-col'>
            <Header />
            {children}
        </div>
    );
}