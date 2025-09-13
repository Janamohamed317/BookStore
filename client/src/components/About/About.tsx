
function About() {
    return (
        <div className="flex justify-center items-center mb-8   ">
            <div className=" text-[#f5f5dc] rounded-2xl p-8 max-w-6xl shadow-md">
                <h1 className="text-3xl font-bold text-center mb-4">About Our Bookstore</h1>
                <p className="mb-4">
                    Welcome to <span className=" text-[#e2b895] font-semibold">Book Haven</span>,
                    your cozy online destination for stories, knowledge, and imagination.
                    We believe that books have the power to inspire, entertain, and transform lives.
                </p>
                <p className="mb-4">
                    Our mission is simple: to connect readers with the stories and authors
                    they love. Whether you’re searching for timeless classics, modern bestsellers,
                    or hidden literary gems, we’ve got something for everyone.
                </p>
                <p className="mb-4">
                    Beyond just books, we’re building a community of readers and authors.
                    From personalized recommendations to author highlights,
                    our goal is to make reading an experience worth sharing.
                </p>
            </div>
        </div>
    );
}

export default About;
