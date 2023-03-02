export function Header({ name }) {
    return (
        <header
            className="sticky top-0 z-30 w-full px-2 py-4 text-[#FFFFFF] bg-[#007AC2] shadow-xl">
            <span className="mx-5">{name}</span>
        </header>
    );
}
