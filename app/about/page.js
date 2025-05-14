export default function About() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <span className="flex w-full items-center p-2">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-auto w-40 mx-auto rounded-full"
                />
            </span>
            <h2 className="text-4xl font-bold">About Us</h2>
            <p className="p-4 mt-2">
                <span className="font-bold">Khunnos</span> is a web application designed to simplify how you manage events in your Google Calendar. With a clean, user-friendly interface, Khunnos allows you to quickly add, edit, or delete events using simple text commands—no need to dig through menus or navigate complex settings.
            </p>
            <p className="p-4">
                Whether you're at your desk or on the go, Khunnos keeps your schedule just a few clicks away. It's built for convenience, enabling you to stay on top of your calendar with minimal effort. The app is ideal for anyone looking to save time and stay organized without the hassle of traditional calendar tools.
            </p>
            <p className="p-4">
                With Khunnos, managing your time is easier, faster, and more intuitive than ever.
            </p>
        </div>
    );
}
